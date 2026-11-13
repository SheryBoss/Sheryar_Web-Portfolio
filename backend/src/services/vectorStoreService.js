import fs from 'fs';
import path from 'path';
import { ChromaClient } from 'chromadb';
import { generateEmbedding } from './geminiService.js';

let chromaClient = null;
let chromaCollection = null;
let isChromaConnected = false;

// Local fallback store path
const CACHE_DIR = path.resolve('backend/data/vector_cache');
const CACHE_FILE = path.join(CACHE_DIR, 'chunks_vectors.json');

/**
 * Initialize Vector Store (ChromaDB + Local Resilient Fallback)
 */
export async function initializeVectorStore() {
  const chromaUrl = process.env.CHROMA_SERVER_URL || 'http://localhost:8000';
  const collectionName = process.env.CHROMA_COLLECTION_NAME || 'sheryar_portfolio_rag';

  try {
    chromaClient = new ChromaClient({ path: chromaUrl });
    const heartbeat = await chromaClient.heartbeat();
    if (heartbeat) {
      chromaCollection = await chromaClient.getOrCreateCollection({ name: collectionName });
      isChromaConnected = true;
      console.log(`[CHROMA] Connected to live ChromaDB instance at ${chromaUrl}. Collection: ${collectionName}`);
    }
  } catch (err) {
    isChromaConnected = false;
    console.log(`[VECTOR STORE] ChromaDB server not running at ${chromaUrl}. Operating with embedded local vector store.`);
  }

  // Ensure local vector cache directory exists
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

/**
 * Store documents/chunks into Vector Database
 */
export async function insertChunks(chunks) {
  // 1. Try inserting into ChromaDB if available
  if (isChromaConnected && chromaCollection) {
    try {
      const ids = chunks.map((c) => c.id);
      const embeddings = chunks.map((c) => c.vector);
      const metadatas = chunks.map((c) => ({ source: c.source }));
      const documents = chunks.map((c) => c.text);

      await chromaCollection.upsert({
        ids,
        embeddings,
        metadatas,
        documents,
      });
      console.log(`[CHROMA] Upserted ${chunks.length} chunks into ChromaDB.`);
    } catch (err) {
      console.warn('[CHROMA] Upsert failed, saving to local cache:', err.message);
    }
  }

  // 2. Always persist into local JSON vector cache for zero-downtime resilience
  fs.writeFileSync(CACHE_FILE, JSON.stringify(chunks, null, 2), 'utf-8');
  console.log(`[VECTOR STORE] Saved ${chunks.length} vectorized chunks to local cache (${CACHE_FILE}).`);
}

/**
 * Retrieve most relevant chunks for a user query (Module 4)
 */
export async function retrieveRelevantChunks(query, topK = 3) {
  const queryVector = await generateEmbedding(query);

  // 1. If ChromaDB is connected, query it
  if (isChromaConnected && chromaCollection) {
    try {
      const results = await chromaCollection.query({
        queryEmbeddings: [queryVector],
        nResults: topK,
      });

      if (results && results.documents && results.documents[0] && results.documents[0].length > 0) {
        return results.documents[0].map((text, i) => ({
          text,
          source: results.metadatas[0][i]?.source || 'portfolio_docs',
          distance: results.distances ? results.distances[0][i] : 0,
        }));
      }
    } catch (err) {
      console.warn('[CHROMA] Query failed, falling back to local vector search:', err.message);
    }
  }

  // 2. Query Local Vector Cache via Cosine Similarity
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      const chunks = JSON.parse(raw);

      const scored = chunks.map((chunk) => {
        const similarity = cosineSimilarity(queryVector, chunk.vector);
        return {
          text: chunk.text,
          source: chunk.source,
          score: similarity,
        };
      });

      // Sort by descending similarity
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, topK);
    } catch (err) {
      console.error('[VECTOR STORE] Error reading local vector cache:', err);
    }
  }

  // Fallback if no cache exists yet
  return [
    {
      text: "Sheryar is a Computer Science undergraduate specializing in Gaming & Animation, proficient in Blender 3D, Three.js WebGL, and C#/C++ programming.",
      source: "academic_profile.md",
      score: 1.0,
    },
  ];
}

/**
 * Cosine Similarity Calculation between two normalized vectors
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
