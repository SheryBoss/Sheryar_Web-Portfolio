import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { initializeGeminiService, generateEmbedding } from '../services/geminiService.js';
import { initializeVectorStore, insertChunks } from '../services/vectorStoreService.js';

async function ingestAllDocuments() {
  console.log('====================================================');
  console.log('STARTING RAG DOCUMENT INGESTION PIPELINE (MODULE 4)');
  console.log('====================================================');

  initializeGeminiService();
  await initializeVectorStore();

  const docsDir = path.resolve('backend/data/docs');
  if (!fs.existsSync(docsDir)) {
    console.error(`Error: Documents directory ${docsDir} does not exist.`);
    process.exit(1);
  }

  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md') || f.endsWith('.txt'));
  console.log(`Found ${files.length} knowledge documents in ${docsDir}:`, files);

  const allChunks = [];
  let chunkIdCounter = 1;

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Split document into semantic paragraphs/sections by double newlines or markdown headers
    const rawParagraphs = content.split(/\n\s*#{1,3}\s+/).filter(Boolean);

    for (let p of rawParagraphs) {
      p = p.trim();
      if (p.length < 30) continue; // Skip trivial fragments

      console.log(`Vectorizing chunk #${chunkIdCounter} from [${file}] (${p.length} chars)...`);
      const vector = await generateEmbedding(p);

      allChunks.push({
        id: `chunk_${chunkIdCounter++}`,
        source: file,
        text: p,
        vector,
      });
    }
  }

  console.log(`Total vectorized chunks created: ${allChunks.length}`);
  await insertChunks(allChunks);

  console.log('====================================================');
  console.log('INGESTION COMPLETE: Vector store is primed for RAG.');
  console.log('====================================================');
}

ingestAllDocuments().catch((err) => {
  console.error('Fatal ingestion error:', err);
  process.exit(1);
});
