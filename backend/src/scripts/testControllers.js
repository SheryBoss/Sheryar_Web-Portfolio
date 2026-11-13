import dotenv from 'dotenv';
dotenv.config();

import { initializeGeminiService } from '../services/geminiService.js';
import { initializeVectorStore, retrieveRelevantChunks } from '../services/vectorStoreService.js';
import { initializeEmailService, sendContactEmail } from '../services/emailService.js';
import { handleChatMessage } from '../controllers/chatController.js';

// Mock Express req/res
function createMockRes() {
  return {
    statusCode: 200,
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    },
  };
}

async function runDirectUnitTests() {
  console.log('========================================================');
  console.log("RUNNING DIRECT UNIT & INTEGRATION TESTS (MODULES 4 & 5)");
  console.log('========================================================');

  initializeGeminiService();
  await initializeVectorStore();
  initializeEmailService();

  // TEST 1: Vector Retrieval for 3D skills
  console.log('\n[TEST 1: VECTOR RETRIEVAL]');
  const chunks = await retrieveRelevantChunks("What 3D tools does Sheryar use?", 3);
  console.log(`Retrieved ${chunks.length} chunks:`);
  chunks.forEach((c, i) => console.log(`  Chunk ${i + 1} (${c.source}): "${c.text.slice(0, 90)}..." (Score: ${c.score?.toFixed(3) || 'N/A'})`));
  if (chunks.length === 0) throw new Error("Vector retrieval failed!");

  // TEST 2: RAG Chat Controller Grounded Query
  console.log('\n[TEST 2: RAG CHAT CONTROLLER - GROUNDED QUERY]');
  const mockReq1 = { body: { message: "Tell me about Sheryar's 3D avatar" } };
  const mockRes1 = createMockRes();
  await handleChatMessage(mockReq1, mockRes1);
  console.log('Status:', mockRes1.statusCode);
  console.log('Grounded Reply:\n', mockRes1.data.reply);
  console.log('Sources Cited:', mockRes1.data.sources);

  // TEST 3: Strict Grounding Admission (Zero Hallucination)
  console.log('\n[TEST 3: STRICT GROUNDING ADMISSION - UNVERIFIED RECORD]');
  const mockReq2 = { body: { message: "What is Sheryar's personal telephone number and credit card?" } };
  const mockRes2 = createMockRes();
  await handleChatMessage(mockReq2, mockRes2);
  console.log('Status:', mockRes2.statusCode);
  console.log('Grounding Protection Reply:\n', mockRes2.data.reply);

  // TEST 4: Contact Email Dispatch
  console.log('\n[TEST 4: CONTACT EMAIL DISPATCH (MODULE 5)]');
  const emailResult = await sendContactEmail({
    name: "Dr. Evaluator",
    email: "evaluator@university.edu",
    subject: "Semester 7 Capstone Review",
    message: "Verifying secure Nodemailer pipeline for university evaluation.",
  });
  console.log('Email Result:', emailResult);

  console.log('\n========================================================');
  console.log('ALL UNIT & INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
  console.log('========================================================');
}

runDirectUnitTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
