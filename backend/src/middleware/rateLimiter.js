import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for Contact Transmissions (Module 5)
 * Prevents spam flooding: maximum 5 messages per 15 minutes per IP.
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many transmissions sent from this IP address. Please wait 15 minutes before sending another inquiry.',
  },
});

/**
 * Rate Limiter for RAG Chatbot Queries (Module 4)
 * Allows up to 60 queries per 15 minutes per IP.
 */
export const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    reply: 'Rate limit reached for AI queries. Please pause momentarily before sending additional prompts.',
  },
});
