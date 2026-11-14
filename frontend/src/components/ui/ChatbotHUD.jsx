import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, User, ShieldCheck, CornerDownLeft, Loader2, BookOpen } from 'lucide-react';
import { FAQ_PROMPTS } from '../../data/portfolioData';
import { findBestKnowledgeAnswer } from '../../data/knowledgeBase';

/**
 * ChatbotHUD - RAG Autonomous AI Companion (A.R.I.A.)
 * Strictly answers from verified portfolio documentation with evidence citations.
 */
export default function ChatbotHUD({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Greetings! I am A.R.I.A., Sheryar's portfolio intelligence assistant. I answer questions strictly based on Sheryar's verified CV, 3D graphics projects, and university coursework. How may I assist your evaluation?",
      sources: ['academic_profile.md', 'sheryar_cv.md', 'personal_faq.md'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        const botReply = {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply,
          sources: data.sources || ['verified_portfolio_docs'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error(data.error || 'Server returned an error');
      }
    } catch (err) {
      // Offline/Local Grounded Knowledge Fallback Response from README.md
      const groundedText = findBestKnowledgeAnswer(textToSend) || generateOfflineGroundedResponse(textToSend);
      const botFallback = {
        id: Date.now() + 1,
        sender: 'bot',
        text: groundedText,
        sources: ['README.md (Verified Knowledge Base)'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botFallback]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * High-Fidelity Client-Side Fallback Engine
   */
  function generateOfflineGroundedResponse(query) {
    const q = query.toLowerCase();

    // 1. Email Address
    if (q.includes('email') || q.includes('e-mail') || q.includes('mail address')) {
      return "Sheryar Amir's verified email address is: sheryaramir576@gmail.com. You can reach him directly via the contact form or send an email from your preferred client.";
    }

    // 2. WhatsApp & Phone
    if (q.includes('whatsapp') || q.includes('phone') || q.includes('mobile') || q.includes('call') || q.includes('number')) {
      return "Sheryar Amir's direct phone and WhatsApp number is: +923351810651. You can start a direct chat on WhatsApp via https://wa.me/923351810651.";
    }

    // 3. College / School / Intermediate
    if (q.includes('college') || q.includes('intermediate') || q.includes('fsc') || q.includes('dj sindh') || q.includes('high school')) {
      return "Sheryar Amir completed his Intermediate (FSc Pre-Engineering) from DJ Sindh Govt Science College, Karachi (2021–2023), achieving an 84.0% grade with distinction in mathematics and physics.";
    }

    // 4. Why Admitted to NED University
    if (
      q.includes('why') && (q.includes('ned') || q.includes('admit') || q.includes('university') || q.includes('join')) ||
      q.includes('reason for admission') || q.includes('thirst')
    ) {
      return "Sheryar got admitted to NED University of Engineering & Technology (NEDUET) because of his deep thirst for knowledge about software development and creative designing, specifically in the field of gaming. He chose the specialized BSCS Gaming & Animation track to master both computer science fundamentals (OOP, DBMS, DSA) and game engineering.";
    }

    // 5. Future Plans / Startup / Career Vision
    if (
      q.includes('future') || q.includes('plan') || q.includes('startup') ||
      q.includes('goal') || q.includes('after degree') || q.includes('career') || q.includes('vision')
    ) {
      return "Sheryar's future plan is to build his own startup in Game Development after completing his BSCS degree at NEDUET. He aims to establish an indie game studio crafting immersive gameplay, physics simulations, and innovative 3D titles.";
    }

    // 6. Hobbies & Interests
    if (q.includes('hobby') || q.includes('hobbies') || q.includes('interest') || q.includes('free time') || q.includes('leisure') || q.includes('like to do')) {
      return "Sheryar's hobbies and interests include:\n• 3D character modeling and sculpting in Blender\n• Game development and mechanics prototyping in Unreal Engine 5 & Unity\n• Environment design and volumetric lighting\n• Exploring AI RAG systems, agents, and automation workflows\n• Tutoring students worldwide in mathematics, physics, and computer science.";
    }

    // 7. Master Shifu / AR/VR Project
    if (q.includes('shifu') || q.includes('master shifu') || q.includes('harass') || q.includes('ar/vr') || q.includes('vr project') || q.includes('virtual reality')) {
      return "Harassing Master Shifu is Sheryar's AR/VR course final project at NED University (Seat: GA_09) built in Unity 3D with the XR Interaction Toolkit. Players use VR motion controllers with laser pointers to playfully interact with and harass Master Shifu while he meditates peacefully under a sacred tree by the water.";
    }

    // 8. ShipBrawl Game in UE5
    if (q.includes('shipbrawl') || (q.includes('ship') && q.includes('game')) || (q.includes('unreal') && q.includes('ocean'))) {
      return "ShipBrawl is an Unreal Engine 5 naval combat game developed by Sheryar featuring realistic real-time ocean water simulation, dynamic buoyancy physics calculations for floating vessels, responsive helm steering, and broadside cannon warfare against enemy ships.";
    }

    // 9. Dungeon Escape / 2D Stealth Game
    if (q.includes('dungeon') || q.includes('dungeon escape') || (q.includes('stealth') && q.includes('game')) || q.includes('sandfox')) {
      return "Dungeon Escape is a 2D stealth infiltration game developed in Unity 3D by Sheryar, inspired by 'Siege of the Sandfox'. Players sneak through torchlit stone dungeon corridors, hide behind hay bales, avoid enemy vision cones, and solve keycard doors to escape.";
    }

    // 10. Base Defenders / GameJam
    if (q.includes('base defender') || q.includes('defenders') || q.includes('gamejam') || (q.includes('tank') && q.includes('turret'))) {
      return "Base Defenders is a top-down tactical grid defense game developed by Sheryar during a competitive GameJam in Unity 3D. It features tile-based turret placement, armored enemy tank waves, projectile mechanics, and real-time win/loss tracking.";
    }

    // 11. Blender 3D Projects (Monster & Chick)
    if (q.includes('monster') || q.includes('chick') || (q.includes('blender') && (q.includes('project') || q.includes('model')))) {
      return "Sheryar's 3D Blender projects include:\n1. Low-Poly Monster Scene: A dramatic night street scene where a giant red-eyed low-poly monster confronts a character under dual lamppost lighting.\n2. Stylized Chick Model: A vibrant, cute round yellow chick with clean subdivision topology and game-ready texturing.";
    }

    // 12. University & Academic Standing
    if (q.includes('gpa') || q.includes('cgpa') || q.includes('batch') || q.includes('university') || q.includes('neduet') || q.includes('degree')) {
      return "Sheryar Amir is a 4th-year student at NED University of Engineering & Technology (NEDUET), Batch 2023–2027, pursuing a BS in Computer Science specializing in Gaming & Animation with a 3.5 / 4.00 CGPA.";
    }

    // 13. General Skills & Tools
    if (q.includes('skill') || q.includes('tool') || q.includes('tech') || q.includes('engine') || q.includes('program')) {
      return "Sheryar Amir's verified technical skills encompass:\n• Game Dev: Unreal Engine 5, Unity 3D, C++, C#, XR Interaction Toolkit\n• 3D Modeling: Blender 3D, Character Sculpting, Environment Design, glTF/GLB\n• Web & Backend: React 18, Three.js / R3F, Node.js, Express, Django, PostgreSQL\n• AI & Automation: Retrieval-Augmented Generation (RAG), Gemini API, ChromaDB.";
    }

    // 14. 3D Avatar
    if (q.includes('avatar') || q.includes('model') || q.includes('character') || q.includes('wave')) {
      return "Sheryar developed an interactive 3D character avatar (avatar.glb) placed in the Hero section of this portfolio. When clicked, it raises its arm, waves hello, plays a cyber audio chime, and displays a friendly greeting bubble.";
    }

    return "I apologize, but this specific information is not mentioned in Sheryar's verified portfolio documentation. To preserve academic integrity, I do not hallucinate unverified records. Please feel free to reach out directly to Sheryar on WhatsApp (+923351810651) or email (sheryaramir576@gmail.com)!";
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-[92vw] sm:max-w-md animate-fade-in pointer-events-auto">
      <div className="bg-space-dark/95 border border-cyber-cyan/50 rounded-2xl shadow-glow-cyan overflow-hidden backdrop-blur-xl flex flex-col h-[560px] scanlines">
        {/* HUD Header */}
        <div className="px-4 py-3 bg-space-card/90 border-b border-space-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan">
              <Bot className="w-4 h-4" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-cyber-cyan flex items-center gap-2">
                <span>A.R.I.A. // RAG AGENT</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  GROUNDED
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                GEMINI AI &bull; CHROMADB VECTOR STORE
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed font-sans ${
                  msg.sender === 'user'
                    ? 'bg-cyber-violet text-white rounded-br-none shadow-glow-violet'
                    : 'bg-space-card/90 text-slate-200 border border-space-border rounded-bl-none'
                }`}
              >
                {msg.text}

                {/* Grounding Source Citation Badges for Academic Examiners */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-space-border/50 flex items-center gap-1.5 flex-wrap">
                    <BookOpen className="w-3 h-3 text-cyber-cyan shrink-0" />
                    <span className="text-[9px] font-mono text-slate-400">Retrieved from:</span>
                    {msg.sources.map((src, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-space-void text-cyber-cyan border border-cyber-cyan/30"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan p-2 bg-space-card/60 rounded-xl border border-space-border/50 max-w-[70%]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Querying Gemini & Vector Store...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-3 py-2 bg-space-void/80 border-t border-space-border/40 overflow-x-auto flex gap-1.5 no-scrollbar">
          {FAQ_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[10px] font-mono whitespace-nowrap px-2.5 py-1 rounded-full bg-space-surface border border-space-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Prompt Input Area */}
        <div className="p-3 bg-space-dark border-t border-space-border/60 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Sheryar's skills, why NED, startup..."
            className="flex-1 px-3 py-2 rounded-xl bg-space-surface border border-space-border/80 focus:border-cyber-cyan focus:outline-none text-xs font-mono text-slate-100 placeholder:text-slate-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2 rounded-xl bg-cyber-cyan text-space-dark hover:bg-cyan-300 disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
