import { retrieveRelevantChunks } from '../services/vectorStoreService.js';
import { generateGroundedResponse } from '../services/geminiService.js';

/**
 * RAG Chatbot Controller (Module 4)
 * Strictly grounds answers in retrieved document evidence.
 */
export async function handleChatMessage(req, res) {
  try {
    const { message } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const trimmedQuery = message.trim();
    console.log(`[RAG QUERY RECEIVED]: "${trimmedQuery}"`);

    // 1. Vector Search: Retrieve top 3 relevant chunks
    const relevantChunks = await retrieveRelevantChunks(trimmedQuery, 3);

    // 2. Generation: Ground answer strictly in evidence
    const groundedReply = await generateGroundedResponse(trimmedQuery, relevantChunks);

    // 3. Extract unique source citations for academic transparency
    const sources = [...new Set(relevantChunks.map((c) => c.source))];

    return res.status(200).json({
      reply: groundedReply,
      sources,
      retrievedChunksCount: relevantChunks.length,
    });
  } catch (err) {
    console.error('[CHAT CONTROLLER ERROR]:', err);
    return res.status(500).json({
      error: 'An internal error occurred during RAG synthesis.',
      reply: "I encountered an error processing your query. Please try asking again.",
    });
  }
}
