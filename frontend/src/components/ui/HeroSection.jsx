import React from 'react';
import { ArrowDown, Play, Bot, Sparkles, Box, ShieldCheck, Gamepad2 } from 'lucide-react';
import { PLACEHOLDERS } from '../../data/placeholders';

/**
 * HeroSection - Cinematic Viewport for Sheryar Amir's Developer Universe
 */
export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      {/* Main Title & Hero Messaging (Framed cleanly to give stage to 3D Avatar) */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold pointer-events-auto">
              <span>NEDUET &bull; BSCS GAMING & ANIMATION &bull; CGPA 3.5</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-gaming font-extrabold tracking-tight uppercase leading-none">
              <span className="block text-white">DEVELOPER'S</span>
              <span className="block bg-gradient-to-r from-cyber-cyan via-sky-300 to-cyber-violet bg-clip-text text-transparent glow-text-cyan">
                UNIVERSE
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-gaming text-cyber-blue font-semibold pt-1 tracking-wide">
              {PLACEHOLDERS.STUDENT_NAME} &bull;{' '}
              <span className="text-slate-300 font-sans font-normal text-base">
                {PLACEHOLDERS.TITLE}
              </span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl bg-space-dark/75 backdrop-blur-md p-4 rounded-xl border border-space-border/60">
            Welcome to my interactive digital portfolio. Explore my games in Unreal Engine 5 & Unity (ShipBrawl, Dungeon Escape, Defenders), Blender 3D art, promotional video trailer, and grounded portfolio AI companion.
          </p>

          {/* Interactive Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-gaming font-bold text-space-dark bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyan-300 hover:to-sky-300 shadow-glow-cyan hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-space-dark" />
              <span>EXPLORE PROJECTS</span>
            </button>

            <button
              onClick={() => scrollTo('promotional-video')}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-gaming font-semibold text-slate-200 bg-space-card hover:bg-space-surface border border-cyber-violet/50 hover:border-cyber-violet hover:shadow-glow-violet transition-all flex items-center gap-2 group"
            >
              <Play className="w-4 h-4 text-cyber-violet fill-cyber-violet/30 group-hover:scale-110 transition-transform" />
              <span>WATCH VIDEO REEL</span>
            </button>

            <a
              href={PLACEHOLDERS.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-gaming font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2"
            >
              <span>💬</span>
              <span>WHATSAPP CHAT</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto border-t border-space-border/40 pt-4">
        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            <span>CUSTOM 3D AVATAR LOADED</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-violet"></span>
            <span>UNREAL ENGINE 5 &bull; UNITY &bull; BLENDER</span>
          </div>
        </div>

        <button
          onClick={() => scrollTo('about')}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyber-cyan transition-colors group"
        >
          <span>EXPLORE PORTFOLIO</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-cyber-cyan" />
        </button>
      </div>
    </section>
  );
}
