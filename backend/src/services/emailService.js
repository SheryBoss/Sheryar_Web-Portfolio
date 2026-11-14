import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

let transporter = null;

export function initializeEmailService() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true';

  const isConfigured = user && pass && !user.includes('your_email') && !pass.includes('your_app');

  if (isConfigured) {
    try {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      console.log(`[EMAIL] Nodemailer SMTP transporter initialized (${host}:${port}).`);
    } catch (err) {
      console.warn('[EMAIL] Failed to configure SMTP transporter:', err.message);
      transporter = null;
    }
  } else {
    console.log('[EMAIL] Running in Test/Simulated Mode (SMTP credentials not yet configured).');
  }
}

/**
 * Dispatch Contact Inquiry Email (Module 5)
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || 'sheryaramir576@gmail.com';
  const timestamp = new Date().toISOString();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #030712; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #00f0ff;">
      <h2 style="color: #00f0ff; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">
        Developer's Universe - New Contact Transmission
      </h2>
      <p><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #38bdf8;">${email}</a>)</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <hr style="border-color: #1e293b;" />
      <div style="background-color: #0b0f24; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-top: 16px;">
        <p style="white-space: pre-wrap; margin: 0; color: #e2e8f0;">${message}</p>
      </div>
      <p style="font-size: 11px; color: #94a3b8; margin-top: 24px;">
        Dispatched securely from Developer's Universe Portfolio (Module 5 Verification).
      </p>
    </div>
  `;

  // If live transporter is active, send real email
  if (transporter) {
    const info = await transporter.sendMail({
      from: `"Developer's Universe" <${process.env.SMTP_USER}>`,
      to: receiver,
      replyTo: email,
      subject: `[Dev Universe Transmission] ${subject} - from ${name}`,
      text: `From: ${name} (${email})\nSubject: ${subject}\nDate: ${timestamp}\n\nMessage:\n${message}`,
      html: htmlContent,
    });
    return { success: true, messageId: info.messageId, mode: 'smtp_live' };
  }

  // Simulated / Test Mode: Persist to test log for examiners to verify
  const logDir = path.resolve('backend/data');
  fs.mkdirSync(logDir, { recursive: true });
  const logFile = path.join(logDir, 'contact_transmissions_test.log');

  const logEntry = `\n[${timestamp}] FROM: ${name} <${email}> | SUBJECT: ${subject}\nMESSAGE:\n${message}\n------------------------------------------------------------\n`;
  fs.appendFileSync(logFile, logEntry);

  console.log(`[EMAIL TEST DISPATCH] Successfully received and logged transmission from ${name} (${email}).`);
  return { success: true, mode: 'test_simulation_logged', logFile };
}
