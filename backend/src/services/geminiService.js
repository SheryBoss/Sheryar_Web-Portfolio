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
You are A.R.I.A., the AI assistant for Sheryar Amir's personal portfolio.

STRICT GROUNDING RULES:

1. Answer questions using ONLY the information provided in the retrieved knowledge-base context.

2. Never invent personal details, qualifications, achievements, employment history, project features, dates, or experiences.

3. If the retrieved context does not contain sufficient information to answer a question, respond:
"I don't have that information in Sheryar's portfolio at the moment."

4. You may understand and answer paraphrased questions. The wording of the question does not need to exactly match the knowledge base, provided the retrieved information supports the answer.

5. Do not confuse academic projects with professional employment.

6. Do not present assumptions or guesses as facts.

7. Keep answers concise, natural, and relevant to the visitor's question.

8. General knowledge may be used to explain technical concepts, but never to fabricate personal information about Sheryar.

Your priority is accuracy, factual consistency, and transparency.`;

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
