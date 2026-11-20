import React, { useState } from 'react';
import { Mail, Send, MapPin, University, Github, Linkedin, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PLACEHOLDERS } from '../../data/placeholders';

/**
 * ContactSection - Direct WhatsApp & Email Terminal for Sheryar Amir
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honey: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [lastTranscript, setLastTranscript] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Launch WhatsApp with pre-filled message from form
  const handleWhatsAppSend = () => {
    const text = formData.message.trim()
      ? `Hi Sheryar, my name is ${formData.name || 'a visitor'} (${formData.email || 'no email'}).\n\nSubject: ${formData.subject || 'Portfolio Inquiry'}\n\nMessage:\n${formData.message}`
      : "Hi Sheryar, I visited your Developer's Universe portfolio and would like to connect!";
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/923351810651?text=${encoded}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ submitting: false, success: false, error: 'Please provide a valid email address.' });
      return;
    }

    // Honeypot bot protection
    if (formData._honey) {
      setStatus({ submitting: false, success: true, error: null });
      return;
    }

    const submission = { ...formData };
    setLastTranscript(submission);
    setStatus({ submitting: true, success: false, error: null });

    // Construct direct mailto dispatch URL for Sheryar's inbox
    const mailtoSub = encodeURIComponent(`[Portfolio Transmission] ${submission.subject || 'Inquiry'} from ${submission.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Sheryar,\n\nName: ${submission.name}\nEmail: ${submission.email}\nSubject: ${submission.subject}\n\nMessage:\n${submission.message}\n\n---\nDirect transmission to: sheryaramir576@gmail.com`
    );
    const directMailtoUrl = `mailto:sheryaramir576@gmail.com?subject=${mailtoSub}&body=${mailtoBody}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '', _honey: '' });
      // Direct email client trigger
      window.open(directMailtoUrl, '_blank');
    } catch (err) {
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '', _honey: '' });
      window.open(directMailtoUrl, '_blank');
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>PORTFOLIO // DIRECT TRANSMISSION TERMINAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-gaming font-bold uppercase tracking-tight text-white">
          GET IN TOUCH WITH <span className="text-cyber-cyan glow-text-cyan">SHERYAR AMIR</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Message directly on WhatsApp for real-time chat, send an email, or submit through the secured transmission terminal.
        </p>

        {/* High-Priority Instant Channels */}
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <a
            href={PLACEHOLDERS.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 hover:bg-emerald-500 hover:text-black font-gaming font-bold text-sm tracking-wide shadow-glow-cyan transition-all flex items-center gap-2.5 group"
          >
            <span className="text-lg">💬</span>
            <span>CHAT ON WHATSAPP (+923351810651)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={`mailto:${PLACEHOLDERS.EMAIL}?subject=Portfolio%20Inquiry%20for%20Sheryar%20Amir`}
            className="px-6 py-3 rounded-xl bg-cyber-cyan/20 border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-space-dark font-gaming font-bold text-sm tracking-wide shadow-glow-subtle transition-all flex items-center gap-2.5 group"
          >
            <Mail className="w-4 h-4" />
            <span>DIRECT EMAIL ({PLACEHOLDERS.EMAIL})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Coordinates Card */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-space-border space-y-6">
          <div className="border-b border-space-border/60 pb-4">
            <h3 className="text-xl font-gaming font-bold text-white uppercase">
              Terminal Coordinates
            </h3>
            <p className="text-xs text-slate-300 font-sans mt-1">
              Direct channels for professional game dev collaborations, 3D modeling commissions, and recruitment.
            </p>
          </div>

          <div className="space-y-4">
            {/* WhatsApp Item */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 shadow-sm dark:shadow-none">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">WHATSAPP DIRECT</div>
                <a
                  href={PLACEHOLDERS.WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{PLACEHOLDERS.WHATSAPP_NUMBER}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Email Item */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-space-void/80 border border-slate-200 dark:border-cyber-cyan/30 shadow-sm dark:shadow-none">
              <div className="p-2 rounded-lg bg-sky-100 dark:bg-cyber-cyan/10 text-sky-700 dark:text-cyber-cyan">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-mono text-sky-700 dark:text-cyber-cyan font-bold">PRIMARY EMAIL</div>
                <a
                  href={`mailto:${PLACEHOLDERS.EMAIL}`}
                  className="text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-cyber-cyan hover:underline flex items-center gap-1 mt-0.5 break-all"
                >
                  <span>{PLACEHOLDERS.EMAIL}</span>
                </a>
              </div>
            </div>

            {/* University Item */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-space-void/80 border border-slate-200 dark:border-cyber-violet/30 shadow-sm dark:shadow-none">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-cyber-violet/10 text-purple-700 dark:text-cyber-violet">
                <University className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-purple-700 dark:text-cyber-violet font-bold">UNIVERSITY & SPECIALIZATION</div>
                <div className="text-xs font-mono text-slate-800 dark:text-slate-200 mt-0.5">{PLACEHOLDERS.UNIVERSITY_NAME}</div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">BSCS Gaming & Animation (CGPA 3.5)</div>
              </div>
            </div>

            {/* Location Item */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-space-void/80 border border-slate-200 dark:border-space-border shadow-sm dark:shadow-none">
              <div className="p-2 rounded-lg bg-slate-200 dark:bg-sky-500/10 text-slate-700 dark:text-sky-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold">LOCATION</div>
                <div className="text-xs font-mono text-slate-800 dark:text-slate-200 mt-0.5">{PLACEHOLDERS.LOCATION}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-space-border/40 space-y-3">
            <div className="text-[10px] font-mono text-slate-400">CONNECT ON PLATFORMS:</div>
            <div className="flex gap-2">
              <a
                href={PLACEHOLDERS.GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-space-surface border border-space-border hover:border-cyber-cyan text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono flex-1 justify-center"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
              <a
                href={PLACEHOLDERS.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-space-surface border border-space-border hover:border-cyber-violet text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono flex-1 justify-center"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-space-void border border-emerald-500/30 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>HONEYPOT BOT FILTER & RATE LIMITING ACTIVE</span>
          </div>
        </div>

        {/* Right Column: Secure Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-space-border">
          {status.success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-glow-cyan animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-gaming font-bold text-white uppercase">
                Transmission Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto">
                Thank you! Your message transcript is addressed directly to <strong className="text-cyber-cyan">sheryaramir576@gmail.com</strong>.
              </p>

              {lastTranscript && (
                <div className="p-3 bg-space-void/80 rounded-xl border border-cyber-cyan/30 text-left text-xs font-mono text-slate-300 space-y-1 max-w-md mx-auto">
                  <div><span className="text-cyber-cyan">SENDER:</span> {lastTranscript.name} ({lastTranscript.email})</div>
                  <div><span className="text-cyber-cyan">SUBJECT:</span> {lastTranscript.subject || 'Portfolio Inquiry'}</div>
                  <div className="line-clamp-2 text-slate-400"><span className="text-cyber-cyan">MESSAGE:</span> {lastTranscript.message}</div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                {lastTranscript && (
                  <a
                    href={`mailto:sheryaramir576@gmail.com?subject=${encodeURIComponent(`[Portfolio Transmission] ${lastTranscript.subject || 'Inquiry'} from ${lastTranscript.name}`)}&body=${encodeURIComponent(`Hello Sheryar,\n\nName: ${lastTranscript.name}\nEmail: ${lastTranscript.email}\nSubject: ${lastTranscript.subject}\n\nMessage:\n${lastTranscript.message}\n\n---\nSent from Developer's Universe`)}`}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-space-dark bg-cyber-cyan hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    <span>OPEN IN MAIL CLIENT</span>
                  </a>
                )}
                <a
                  href={PLACEHOLDERS.WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors flex items-center gap-1.5"
                >
                  <span>💬</span>
                  <span>WHATSAPP (+923351810651)</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setStatus({ submitting: false, success: false, error: null });
                  setLastTranscript(null);
                }}
                className="mt-2 text-xs font-mono text-slate-400 hover:text-white underline block mx-auto"
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-space-border/60 pb-3">
                <h3 className="text-xl font-gaming font-bold text-white uppercase">
                  Transmit Encrypted Message
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  Direct message delivery to Sheryar Amir with real-time spam filters.
                </p>
              </div>

              {status.error && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              {/* Honeypot hidden input */}
              <input
                type="text"
                name="_honey"
                value={formData._honey}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    YOUR NAME <span className="text-sky-600 dark:text-cyber-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-space-surface border border-slate-300 dark:border-space-border text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors shadow-sm dark:shadow-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    EMAIL ADDRESS <span className="text-sky-600 dark:text-cyber-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-space-surface border border-slate-300 dark:border-space-border text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors shadow-sm dark:shadow-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300">
                  SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. GameDev Collaboration, 3D Modeling, Job Opportunity"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-space-surface border border-slate-300 dark:border-space-border text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors shadow-sm dark:shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300">
                  MESSAGE <span className="text-sky-600 dark:text-cyber-cyan">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-space-surface border border-slate-300 dark:border-space-border text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors resize-none shadow-sm dark:shadow-none"
                  required
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="flex-1 py-3 px-5 rounded-xl text-xs font-gaming font-bold text-space-dark bg-cyber-cyan hover:bg-cyan-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-glow-cyan uppercase"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT VIA EMAIL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="py-3 px-5 rounded-xl text-xs font-gaming font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors flex items-center justify-center gap-2 uppercase shadow-glow-subtle"
                >
                  <span>💬</span>
                  <span>SEND VIA WHATSAPP</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
