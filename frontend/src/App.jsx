import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import UniverseCanvas from './components/3d/UniverseCanvas';
import Navbar from './components/ui/Navbar';
import HeroSection from './components/ui/HeroSection';
import AboutSection from './components/ui/AboutSection';
import SkillsSection from './components/ui/SkillsSection';
import ProjectsSection from './components/ui/ProjectsSection';
import EducationExperienceSection from './components/ui/EducationExperienceSection';
import PromotionalVideoSection from './components/ui/PromotionalVideoSection';
import AIAssistantSection from './components/ui/AIAssistantSection';
import ContactSection from './components/ui/ContactSection';
import ChatbotHUD from './components/ui/ChatbotHUD';
import { PLACEHOLDERS } from './data/placeholders';
import { ArrowUp, Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);

  // Framer Motion Scroll Progress Bar (0% to 100%)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-space-dark text-slate-100 selection:bg-cyber-cyan selection:text-space-dark overflow-x-hidden font-sans">
      {/* 1. TOP READING & SCROLL PROGRESS BAR (Inspired by Syed Saad Azeem's portfolio) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyber-cyan via-sky-400 to-cyber-violet z-50 origin-left shadow-glow-cyan"
        style={{ scaleX }}
      />

      {/* 2. BACKGROUND 3D CANVAS WITH AVATAR & GLOWING PLATFORM */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <UniverseCanvas />
      </div>

      {/* 3. FOREGROUND INTERACTIVE CONTENT LAYER */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        {/* Responsive HUD Navigation Bar */}
        <div className="pointer-events-auto">
          <Navbar />
        </div>

        {/* Complete Website Layout (All 8 Evaluation Sections with Scroll Reveals) */}
        <main className="flex-1 space-y-16 sm:space-y-24">
          {/* Section 1: Home */}
          <HeroSection />

          <div className="pointer-events-auto space-y-20 sm:space-y-28">
            {/* Section 2: About Me */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <AboutSection />
            </motion.div>

            {/* Section 3: Skills */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SkillsSection />
            </motion.div>

            {/* Section 4: Projects */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <ProjectsSection />
            </motion.div>

            {/* Section 5: Education & Experience */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <EducationExperienceSection />
            </motion.div>

            {/* Section 6: Promotional Video */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <PromotionalVideoSection />
            </motion.div>

            {/* Section 7: AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <AIAssistantSection />
            </motion.div>

            {/* Section 8: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <ContactSection />
            </motion.div>
          </div>
        </main>

        {/* Futuristic Glassmorphic Footer */}
        <footer className="pointer-events-auto border-t border-space-border/60 bg-space-dark/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-gaming font-bold text-white tracking-wider">
                <span className="text-cyber-cyan font-mono">DEVELOPER'S UNIVERSE</span>
                <span className="text-slate-500">|</span>
                <span>{PLACEHOLDERS.STUDENT_NAME}</span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Design and Development of an Interactive 3D Web Portfolio &bull; Semester 7 Capstone
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-space-card border border-space-border/60">
                REACT 18 + THREE.JS
              </span>
              <span className="px-2.5 py-1 rounded bg-space-card border border-space-border/60">
                3D AVATAR ACTIVE
              </span>
              <span className="px-2.5 py-1 rounded bg-space-card border border-space-border/60">
                H.264 VIDEO ACTIVE
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-space-card hover:bg-space-surface border border-space-border hover:border-cyber-cyan text-slate-300 hover:text-white transition-all shadow-glow-subtle flex items-center gap-2 text-xs font-mono"
              title="Return to Orbit / Top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyber-cyan" />
            </button>
          </div>
        </footer>

        {/* 4. FLOATING AI CHATBOT WIDGET (Like Syed Saad Azeem's portfolio) */}
        <div className="pointer-events-auto">
          <ChatbotHUD
            isOpen={floatingChatOpen}
            onClose={() => setFloatingChatOpen(false)}
          />

          {!floatingChatOpen && (
            <button
              onClick={() => setFloatingChatOpen(true)}
              className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-space-dark font-gaming font-bold text-xs tracking-wider shadow-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
              title="Chat with AI Assistant (A.R.I.A.)"
            >
              <div className="relative">
                <Bot className="w-4 h-4 text-space-dark" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-ping" />
              </div>
              <span>💬 CHAT WITH AI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
