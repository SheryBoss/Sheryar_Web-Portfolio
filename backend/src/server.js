import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

import { contactLimiter, chatLimiter } from './middleware/rateLimiter.js';
import { validateContactPayload } from './middleware/validation.js';
import { handleChatMessage } from './controllers/chatController.js';
import { handleContactSubmission } from './controllers/contactController.js';
import { initializeGeminiService } from './services/geminiService.js';
import { initializeVectorStore } from './services/vectorStoreService.js';
import { initializeEmailService } from './services/emailService.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Security Headers & CORS
app.use(helmet({
  contentSecurityPolicy: false, // Allow 3D canvas and local assets
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '50kb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    project: "Developer's Universe API",
    modules: {
      ragChatbot: 'ACTIVE',
      contactApi: 'ACTIVE',
      vectorStore: 'READY',
    },
    timestamp: new Date().toISOString(),
  });
});

// Module 4: RAG Chatbot Route with Rate Limiting
app.post('/api/chat', chatLimiter, handleChatMessage);

// Module 5: Secure Contact Route with Rate Limiting, Honeypot & Validation
app.post('/api/contact', contactLimiter, validateContactPayload, handleContactSubmission);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER UNHANDLED ERROR]:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

// Initialize Background Services & Start Server
async function startServer() {
  console.log('----------------------------------------------------');
  console.log("INITIALIZING DEVELOPER'S UNIVERSE API ENGINE");
  console.log('----------------------------------------------------');

  initializeGeminiService();
  await initializeVectorStore();
  initializeEmailService();

  app.listen(PORT, () => {
    console.log(`[SERVER] Developer's Universe backend listening on http://localhost:${PORT}`);
    console.log(`[API ROUTES]:`);
    console.log(`  - Health Check: GET  http://localhost:${PORT}/api/health`);
    console.log(`  - RAG Chatbot:  POST http://localhost:${PORT}/api/chat`);
    console.log(`  - Contact Form: POST http://localhost:${PORT}/api/contact`);
    console.log('----------------------------------------------------');
  });
}

startServer();
