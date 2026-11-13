/**
 * Contact Form Sanitization and Verification Middleware (Module 5)
 */
export function validateContactPayload(req, res, next) {
  const { name, email, subject, message, _honey } = req.body || {};

  // 1. Honeypot check: If bot filled out the hidden field, drop silently with success
  if (_honey && _honey.trim().length > 0) {
    console.warn('[SECURITY] Bot trap triggered by honeypot field. Silently dropping payload.');
    return res.status(200).json({
      success: true,
      message: 'Transmission received.',
    });
  }

  // 2. Required fields presence check
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Your name or callsign is required.' });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Message payload cannot be empty.' });
  }

  // 3. Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Invalid email address format provided.' });
  }

  // 4. Length constraints
  if (name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({ success: false, message: 'Name must be between 2 and 100 characters.' });
  }

  if (message.trim().length < 5 || message.trim().length > 2500) {
    return res.status(400).json({ success: false, message: 'Message must be between 5 and 2500 characters.' });
  }

  // 5. Basic XSS tag stripping
  req.body.name = name.trim().replace(/<[^>]*>?/gm, '');
  req.body.email = email.trim().toLowerCase();
  req.body.subject = (subject || 'Developer Universe Inquiry').trim().replace(/<[^>]*>?/gm, '');
  req.body.message = message.trim().replace(/<[^>]*>?/gm, '');

  next();
}
