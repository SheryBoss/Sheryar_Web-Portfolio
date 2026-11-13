import { sendContactEmail } from '../services/emailService.js';

/**
 * Contact Transmission Controller (Module 5)
 */
export async function handleContactSubmission(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    const result = await sendContactEmail({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: 'Transmission successfully received and dispatched.',
      details: result,
    });
  } catch (err) {
    console.error('[CONTACT CONTROLLER ERROR]:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to route transmission at this time. Please try again later.',
    });
  }
}
