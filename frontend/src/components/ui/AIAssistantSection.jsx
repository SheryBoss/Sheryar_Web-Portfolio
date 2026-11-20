import React, { useState } from 'react';
import { Bot, Send, Sparkles, BookOpen, ShieldCheck, Cpu, Database, CheckCircle2, CornerDownLeft, Loader2 } from 'lucide-react';
import { FAQ_PROMPTS } from '../../data/portfolioData';
import { findBestKnowledgeAnswer } from '../../data/knowledgeBase';

/**
 * AIAssistantSection - Dedicated In-Page Terminal for A.R.I.A.
 * Autonomous Retrieval & Intelligence Assistant (Module 4 RAG Grounded System)
 */
export default function AIAssistantSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Greetings! I am A.R.I.A. (Autonomous Retrieval & Intelligence Assistant), Sheryar Amir's portfolio intelligence companion. I am grounded directly in Sheryar's verified CV, README.md, and projects knowledge base. Ask me anything about Sheryar's background, skills, games, 3D art, education, or contact info!",
      sources: ['README.md', 'sheryar_cv.md'],
      time: 'ONLINE',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async (promptText) => {
    const query = promptText || input;
    if (!query.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // 1. First try live backend RAG endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply,
          sources: data.sources || ['README.md', 'sheryar_cv.md'],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Fallback to local knowledge engine');
      }
    } catch (err) {
      // 2. High-Fidelity Grounded Knowledge Base Fallback from README.md
      const groundedAnswer = findBestKnowledgeAnswer(query.trim()) ||
        "I apologize, but this specific information is not mentioned in Sheryar's verified portfolio documentation. To preserve academic integrity, I do not hallucinate unverified records. Please feel free to reach out directly to Sheryar on WhatsApp (+923351810651) or email (sheryaramir576@gmail.com)!";

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: groundedAnswer,
        sources: ['README.md (Verified Knowledge Base)'],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
          <Bot className="w-3.5 h-3.5" />
          <span>MODULE 4 // GROUNDED RAG AI COMPANION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-gaming font-bold uppercase tracking-tight text-white">
          A.R.I.A. <span className="text-cyber-cyan glow-text-cyan">INTELLIGENCE TERMINAL</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          <strong>Autonomous Retrieval & Intelligence Assistant</strong>: Grounded strictly in Sheryar's verified CV, README documentation, and project archives with zero hallucinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: RAG Architecture Specs */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-2xl border border-space-border space-y-5">
          <div className="border-b border-space-border/60 pb-3">
            <div className="text-xs font-mono text-cyber-cyan font-bold uppercase">
              RAG ARCHITECTURE SPECIFICATION
            </div>
            <h3 className="text-xl font-gaming font-bold text-white mt-1">
              Strict Evidence Grounding
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="font-gaming font-semibold text-white">Google Gemini API Engine</div>
                <p className="text-slate-300 font-sans mt-0.5">
                  Semantic embeddings via <code>text-embedding-004</code> and contextual answer synthesis via <code>gemini-1.5-flash</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-violet/10 text-cyber-violet border border-cyber-violet/30 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="font-gaming font-semibold text-white">ChromaDB & Local Vector Cache</div>
                <p className="text-slate-300 font-sans mt-0.5">
                  High-dimensional similarity search indexing Sheryar's official README.md, CV, and project documentation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-gaming font-semibold text-white">Zero-Hallucination Guardrail</div>
                <p className="text-slate-300 font-sans mt-0.5">
                  Strictly answers from verified documentation and admits when information is unavailable.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-space-void border border-emerald-500/40 text-[11px] font-mono text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: ONLINE // RAG SYSTEM ACTIVE</span>
            </div>
            <p className="text-slate-400">
              Live grounded question-answering operational. Connected to official README database & vector store.
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
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-surface text-emerald-400 border border-emerald-500/40">
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
                      : 'bg-white dark:bg-space-card/90 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-space-border rounded-bl-none shadow-sm dark:shadow-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-space-border/50 flex items-center gap-1.5 flex-wrap">
                      <BookOpen className="w-3 h-3 text-sky-600 dark:text-cyber-cyan shrink-0" />
                      <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">Retrieved from:</span>
                      {m.sources.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-100 dark:bg-space-void text-sky-800 dark:text-cyber-cyan border border-sky-300 dark:border-cyber-cyan/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-sky-700 dark:text-cyber-cyan p-2 bg-slate-100 dark:bg-space-card/60 rounded-xl border border-slate-300 dark:border-space-border/50 max-w-[70%]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Querying knowledge base...</span>
              </div>
            )}
          </div>

          {/* Preset Suggested Questions */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-space-void/80 border-t border-slate-200 dark:border-space-border/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {FAQ_PROMPTS.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendPrompt(prompt)}
                className="text-[10px] font-mono whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-space-surface border border-slate-300 dark:border-space-border text-slate-700 dark:text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors shadow-sm dark:shadow-none"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50 dark:bg-space-dark border-t border-slate-200 dark:border-space-border/60 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder="Ask about Sheryar's skills, games, 3D art..."
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-space-surface border border-slate-300 dark:border-space-border/80 focus:border-cyber-cyan focus:outline-none text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none"
            />
            <button
              onClick={() => handleSendPrompt()}
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-cyber-cyan text-space-dark hover:bg-cyan-300 disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
