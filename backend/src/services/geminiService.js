import { GoogleGenerativeAI } from '@google/generative-ai';
import { findBestKnowledgeAnswer } from './knowledgeBase.js';

let genAI = null;
let embeddingModel = null;
let chatModel = null;

export function initializeGeminiService() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && !apiKey.includes('your_gemini_api_key')) {
    try {
      genAI = new GoogleGenerativeAI(apiKey);
      embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
      chatModel = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.2, // Low temperature for factual grounding
          topP: 0.8,
          maxOutputTokens: 600,
        },
      });
      console.log('[GEMINI] Gemini API client initialized (gemini-1.5-flash + text-embedding-004).');
    } catch (err) {
      console.warn('[GEMINI] Failed to initialize Gemini client:', err.message);
      genAI = null;
    }
  } else {
    console.log('[GEMINI] Running with local grounded knowledge fallback (GEMINI_API_KEY not configured yet).');
  }
}

/**
 * Generate vector embedding for a text chunk using Gemini text-embedding-004
 */
export async function generateEmbedding(text) {
  if (embeddingModel) {
    try {
      const result = await embeddingModel.embedContent(text);
      return result.embedding.values;
    } catch (err) {
      console.warn('[EMBEDDING] Gemini API error, falling back to local hash vector:', err.message);
    }
  }

  // Resilient deterministic vector fallback (384 dimensions)
  return createLocalDeterministicVector(text, 384);
}

/**
 * Generate grounded answer strictly based on retrieved context
 */
export async function generateGroundedResponse(query, retrievedChunks) {
  const contextText = retrievedChunks
    .map((c, i) => `--- [DOCUMENT ${i + 1}: ${c.source}] ---\n${c.text}`)
    .join('\n\n');

  if (chatModel) {
    try {
      const prompt = `
You are A.R.I.A., the autonomous AI portfolio assistant for Sheryar Amir, a Computer Science student specializing in Gaming & Animation at NEDUET.

CRITICAL ACADEMIC GROUNDING RULES:
1. You must answer the user's inquiry STRICTLY and ONLY using the verified RETRIEVED CONTEXT from README.md below.
2. Verified facts present in the documents (such as Sheryar's email sheryaramir576@gmail.com, WhatsApp +923351810651, college DJ Sindh Govt Science College 84%, NED admission rationale, future startup plans, hobbies including chess, table tennis, swimming, cricket, reading, and Blender art, and projects like ShipBrawl, Dungeon Escape, Defenders, and AR/VR lab) ARE authorized to share directly.
3. If the user asks for unverified or speculative information not mentioned in the context (e.g. professional studio employment), state clearly according to the knowledge base:
   "This portfolio knowledge base describes Sheryar's academic and personal projects. It does not currently confirm professional studio employment."
4. If asked something completely unrecorded, state:
   "I apologize, but this information is not mentioned in Sheryar's verified portfolio documentation. You can reach out directly via WhatsApp (+923351810651) or email (sheryaramir576@gmail.com)."
5. Keep the tone friendly, clear, natural, and helpful.

RETRIEVED CONTEXT:
${contextText}

USER QUESTION:
${query}

GROUNDED ANSWER:`;

      const result = await chatModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn('[GEMINI CHAT] Error generating response:', err.message);
    }
  }

  // Flexible local grounded answer synthesis based on README.md
  return synthesizeOfflineAnswer(query, retrievedChunks);
}

/**
 * Local Deterministic Bag-of-Words Vector Representation
 * Creates a normalized vector based on term frequency and character n-grams.
 */
function createLocalDeterministicVector(text, dimensions = 384) {
  const vector = new Array(dimensions).fill(0);
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

  words.forEach((word) => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % dimensions;
    vector[index] += 1;
  });

  // Normalize to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vector.map((v) => v / magnitude);
}

/**
 * Intelligent Grounded Synthesizer based on README.md Knowledge Base
 */
function synthesizeOfflineAnswer(query, chunks) {
  // 1. Try flexible pattern & fuzzy scoring against README.md knowledge base
  const kbAnswer = findBestKnowledgeAnswer(query);
  if (kbAnswer) {
    return kbAnswer;
  }

  // 2. Check top retrieved chunk from vector search
  if (chunks && chunks.length > 0) {
    const top = chunks[0];
    if (top.text && top.text.length > 40) {
      return `According to Sheryar's portfolio documentation in ${top.source}:\n\n${top.text}\n\nIf you have any other questions, feel free to contact Sheryar on WhatsApp (+923351810651) or email (sheryaramir576@gmail.com).`;
    }
  }

  // 3. Truthful fallback
  return "I apologize, but this specific information is not mentioned in Sheryar's verified portfolio documentation. To preserve academic integrity, I do not hallucinate unverified records. Please feel free to reach out directly to Sheryar on WhatsApp (+923351810651) or email (sheryaramir576@gmail.com)!";
}
