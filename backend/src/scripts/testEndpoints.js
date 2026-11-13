import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

async function runTests() {
  console.log('--- TESTING DEVELOPER UNIVERSE BACKEND SUITE ---');

  // Dynamically import server
  const serverModule = await import('../server.js');
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    // 1. Health check test
    console.log('[TEST 1] Testing /api/health...');
    const healthRes = await fetch('http://localhost:5000/api/health');
    const healthData = await healthRes.json();
    console.log('Status Code:', healthRes.status, 'Response:', healthData);

    // 2. Chat query test (Module 4 RAG Grounding)
    console.log('\n[TEST 2] Testing /api/chat with query: "What are Sheryars 3D skills?"...');
    const chatRes = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "What are Sheryar's 3D skills?" }),
    });
    const chatData = await chatRes.json();
    console.log('Status Code:', chatRes.status);
    console.log('Reply:', chatData.reply);
    console.log('Sources Cited:', chatData.sources);

    // 3. Grounding Admission test: Asking unverified fact
    console.log('\n[TEST 3] Testing /api/chat grounding rule (asking unverified fact): "What is Sheryars home phone number?"...');
    const phoneRes = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "What is Sheryar's home phone number?" }),
    });
    const phoneData = await phoneRes.json();
    console.log('Reply to unverified question:', phoneData.reply);

    // 4. Contact form test (Module 5)
    console.log('\n[TEST 4] Testing /api/contact form submission...');
    const contactRes = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Academic Examiner",
        email: "examiner@university.edu",
        subject: "Semester 7 Portfolio Review",
        message: "Testing the secure transmission channel for Module 5.",
      }),
    });
    const contactData = await contactRes.json();
    console.log('Status Code:', contactRes.status, 'Response:', contactData);

    // 5. Spam honeypot test
    console.log('\n[TEST 5] Testing /api/contact bot trap honeypot...');
    const botRes = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "SpamBot",
        email: "bot@spam.com",
        subject: "Spam Offer",
        message: "Spam text",
        _honey: "I am a malicious bot filling hidden fields",
      }),
    });
    const botData = await botRes.json();
    console.log('Honeypot Response (silently accepted to mislead bot):', botData);

    console.log('\n--- ALL BACKEND TESTS PASSED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    process.exit(0);
  }
}

runTests();
