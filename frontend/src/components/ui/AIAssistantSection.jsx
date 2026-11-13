import React, { useState } from 'react';
import { Bot, Send, Sparkles, BookOpen, ShieldCheck, Cpu, Database, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { FAQ_PROMPTS } from '../../data/portfolioData';

/**
 * AIAssistantSection - In-Page Interactive Showcase for A.R.I.A. (Module 4 RAG Assistant)
 */
export default function AIAssistantSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Greetings! I am A.R.I.A., Sheryar's portfolio intelligence assistant. In Phase 4, I will be wired to the live Gemini API and ChromaDB vector retrieval. Right now, you can test my grounded question-answering interface below!",
      sources: ['academic_profile.md', 'sheryar_cv.md'],
      time: 'ONLINE',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendPrompt = (promptText) => {
    const query = promptText || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let botReplyText = '';
    let sources = ['sheryar_cv.md'];
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('tool') || q.includes('gaming') || q.includes('animation') || q.includes('three.js')) {
      botReplyText = "According to verified portfolio documentation: Sheryar specializes in Blender 3D (character modeling, rigging, and real-time glTF export), Three.js and React Three Fiber (WebGL shaders, lighting, 3D math), game engines (Unity 3D, Unreal Engine), and core programming in C++, C#, and JavaScript.";
      sources = ['sheryar_cv.md', 'projects_knowledge.md'];
    } else if (q.includes('avatar') || q.includes('stage') || q.includes('3d') || q.includes('blender')) {
      botReplyText = "According to verified records: Sheryar's portfolio includes a dedicated 3D WebGL stage on the Hero section designed for his custom Blender avatar. The stage features multi-ring glowing platforms, interactive scan waves on click, and camera orbit controls.";
      sources = ['projects_knowledge.md'];
    } else if (q.includes('video') || q.includes('reel') || q.includes('trailer') || q.includes('after effects')) {
      botReplyText = "Verified documentation confirms: A 30-second promotional trailer is embedded in the Promotional Video section (promo-reel.mp4), showcasing the 3D WebGL universe, project architecture, and capstone features in an interactive sci-fi HUD player.";
      sources = ['projects_knowledge.md'];
    } else if (q.includes('university') || q.includes('degree') || q.includes('education') || q.includes('semester')) {
      botReplyText = "From Sheryar's academic profile: Sheryar is currently in his 7th Semester (final year) pursuing a Bachelor of Science in Computer Science (BSCS) with a formal specialization in Gaming & Animation.";
      sources = ['academic_profile.md'];
    } else if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      botReplyText = "You can contact Sheryar using the secure Contact Form at the bottom of this portfolio, which features input validation, honeypot spam defense, and Nodemailer integration.";
      sources = ['academic_profile.md'];
    } else {
      botReplyText = "I apologize, but this specific information is not mentioned in Sheryar's verified portfolio documentation. To preserve academic integrity, I do not hallucinate unverified records. Please reach out directly via the Contact form.";
      sources = ['strict_grounding_filter'];
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: botReplyText,
      sources,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <section id="ai-assistant" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
          <Bot className="w-3.5 h-3.5" />
          <span>PORTFOLIO // AI COMPANION (A.R.I.A.)</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white">
          AI <span className="text-cyber-cyan glow-text-cyan">ASSISTANT</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Retrieval-Augmented Generation (RAG) assistant answering questions strictly grounded in Sheryar's verified CV and project documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: RAG Architecture Specs */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-2xl border border-space-border space-y-5">
          <div className="border-b border-space-border/60 pb-3">
            <div className="text-xs font-mono text-cyber-cyan font-bold uppercase">
              RAG SYSTEM ARCHITECTURE
            </div>
            <h3 className="text-xl font-display font-bold text-white mt-1">
              Strict Grounding Protocol
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-semibold text-white">Google Gemini API</div>
                <p className="text-slate-300 font-sans mt-0.5">
                  High-dimensional text embeddings via <code>text-embedding-004</code> and contextual answer synthesis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-violet/10 text-cyber-violet border border-cyber-violet/30 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-semibold text-white">ChromaDB Vector Store</div>
                <p className="text-slate-300 font-sans mt-0.5">
                  Vector similarity search indexing CV and project markdown documentation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-semibold text-white">Zero-Hallucination Guardrail</div>
                <p className="text-slate-300 font-sans mt-0.5">
                  Strictly admits when facts are unavailable and always includes verified document citations.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-space-void border border-cyber-cyan/30 text-[11px] font-mono text-slate-300 space-y-1">
            <div className="text-cyber-cyan font-bold">STATUS: PHASE 2 PREVIEW</div>
            <p className="text-slate-400">
              Interactive terminal preview active. Full live Node.js Gemini RAG endpoint activates in Phase 4.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Preview */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-cyber-cyan/40 overflow-hidden shadow-glow-cyan flex flex-col h-[520px] scanlines">
          {/* Terminal Title Bar */}
          <div className="px-4 py-3 bg-space-card/90 border-b border-space-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="text-xs font-mono font-bold text-cyber-cyan">
                A.R.I.A. TERMINAL // RAG ACTIVE
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-surface text-slate-400 border border-space-border/50">
              GROUNDED MODE
            </span>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed font-sans ${
                    m.sender === 'user'
                      ? 'bg-cyber-violet text-white rounded-br-none shadow-glow-violet'
                      : 'bg-space-card/90 text-slate-200 border border-space-border rounded-bl-none'
                  }`}
                >
                  {m.text}

                  {m.sources && (
                    <div className="mt-2 pt-2 border-t border-space-border/50 flex items-center gap-1.5 flex-wrap">
                      <BookOpen className="w-3 h-3 text-cyber-cyan shrink-0" />
                      <span className="text-[9px] font-mono text-slate-400">Retrieved from:</span>
                      {m.sources.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-space-void text-cyber-cyan border border-cyber-cyan/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="px-3 py-2 bg-space-void/80 border-t border-space-border/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {FAQ_PROMPTS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(prompt)}
                className="text-[10px] font-mono whitespace-nowrap px-2.5 py-1 rounded-full bg-space-surface border border-space-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Prompt Input */}
          <div className="p-3 bg-space-dark border-t border-space-border/60 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder="Ask about Sheryar's skills, 3D avatar stage..."
              className="flex-1 px-3 py-2 rounded-xl bg-space-surface border border-space-border/80 focus:border-cyber-cyan focus:outline-none text-xs font-mono text-slate-100 placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSendPrompt()}
              className="p-2 rounded-xl bg-cyber-cyan text-space-dark hover:bg-cyan-300 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
