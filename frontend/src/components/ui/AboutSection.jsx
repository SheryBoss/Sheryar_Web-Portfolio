import React from 'react';
import { Box, Layers, Gamepad2, Cpu, Sparkles, Award, User, Code, Globe2, Phone, Mail, MapPin, Rocket, Compass, Heart, ArrowUpRight } from 'lucide-react';
import { SPECIALIZATION_PILLARS } from '../../data/portfolioData';
import { PLACEHOLDERS } from '../../data/placeholders';

const ICON_MAP = {
  Gamepad2: Gamepad2,
  Box: Box,
  Globe2: Globe2,
  Cpu: Cpu,
};

/**
 * AboutSection - About Sheryar Amir, NED Motivation, Startup Vision & Specialization
 */
export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet text-xs font-mono font-semibold">
          <User className="w-3.5 h-3.5" />
          <span>PORTFOLIO // BIOGRAPHY & CAREER VISION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-gaming font-bold uppercase tracking-tight text-white">
          ABOUT <span className="text-cyber-cyan glow-text-cyan">SHERYAR AMIR</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Game Developer & Computer Science Undergraduate at NED University specializing in Unreal Engine 5, Unity, 3D modeling in Blender, and 3D environment design.
        </p>
      </div>

      {/* Main Grid: Portrait Card + Specialization Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        {/* Left Column: Stylized Portrait Hologram Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group max-w-sm w-full">
            {/* Outer Glow Halo */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-blue opacity-50 blur-lg group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="relative rounded-2xl bg-space-card/90 border border-cyber-cyan/40 p-3.5 backdrop-blur-xl shadow-glow-cyan overflow-hidden scanlines">
              {/* Photo Viewport */}
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-space-void border border-space-border/60">
                <img
                  src="/images/sheryar.jpg"
                  alt="Sheryar Amir - Game Developer & Computer Science Specialist in Gaming & Animation"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Holographic HUD Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/95 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="text-xs font-mono font-bold text-cyber-cyan uppercase">
                    {PLACEHOLDERS.STUDENT_NAME} &bull; NEDUET
                  </div>
                  <div className="text-[11px] font-mono text-slate-300">
                    BSCS GAMING & ANIMATION &bull; CGPA 3.5
                  </div>
                </div>

                {/* Laser Scan Line */}
                <div className="absolute inset-x-0 h-1 bg-cyber-cyan/60 shadow-glow-cyan animate-pulse top-1/3 pointer-events-none" />
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center justify-between pt-3 px-1 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyber-cyan">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>CUSTOM 3D AVATAR LOADED</span>
                </span>
                <span>NEDUET 2023-2027</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, NED Admission Reason & Startup Goals */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-space-border space-y-5">
            <h3 className="text-xl sm:text-2xl font-gaming font-bold text-white uppercase flex items-center gap-2">
              <Award className="w-5 h-5 text-cyber-cyan" />
              <span>Architecting Virtual Worlds & Game Mechanics</span>
            </h3>
            
            <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
              I am currently a 4th-year student at <strong>NED University of Engineering & Technology (NEDUET)</strong> pursuing a Bachelor of Science in Computer Science with a formal specialization in <strong>Gaming & Animation</strong> (Batch 2023–2027, <strong>3.5 CGPA</strong>). I have strong foundations in core CS including Object-Oriented Programming (OOP), Database Management Systems (DBMS), and Data Structures & Algorithms (DSA).
            </p>

            {/* Why NED University Highlight Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-space-void/90 border border-sky-300 dark:border-cyber-cyan/30 space-y-1.5 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 text-xs font-gaming font-bold text-sky-700 dark:text-cyber-cyan uppercase tracking-wider">
                <Compass className="w-4 h-4 text-sky-600 dark:text-cyber-cyan" />
                <span>WHY NED UNIVERSITY?</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                I got admitted to NED University because of my deep thirst for knowledge about software development and creative designing, specifically in the field of gaming. This program allowed me to blend rigorous engineering with artistic 3D expression.
              </p>
            </div>

            {/* Future Startup Vision Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-space-void/90 border border-purple-300 dark:border-cyber-violet/30 space-y-1.5 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 text-xs font-gaming font-bold text-purple-700 dark:text-cyber-violet uppercase tracking-wider">
                <Rocket className="w-4 h-4 text-purple-600 dark:text-cyber-violet" />
                <span>FUTURE VISION & STARTUP ASPIRATIONS</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                My primary ambition after completing my degree is to build my own startup in <strong>Game Development</strong>, establishing an independent studio that designs mechanically rich indie games, physics simulations, and immersive 3D experiences.
              </p>
            </div>

            {/* Hobbies & Personal Interests */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-space-void/90 border border-emerald-300 dark:border-emerald-500/30 space-y-1.5 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 text-xs font-gaming font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>HOBBIES & PERSONAL INTERESTS</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                Reading, practicing 3D modelling and sculpting in Blender, swimming, playing table tennis, cricket, and chess.
              </p>
            </div>

            {/* Academic Matrix */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-space-border/60">
              <div>
                <div className="text-xs font-mono text-slate-400">ACADEMIC STANDING</div>
                <div className="text-sm font-mono font-semibold text-cyber-cyan">NEDUET &bull; 4th Year (CGPA 3.5)</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">COLLEGE (FSc)</div>
                <div className="text-sm font-mono font-semibold text-white">DJ Sindh Govt Science College (84%)</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">WHATSAPP / PHONE</div>
                <a href={PLACEHOLDERS.WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-mono font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                  <span>+923351810651</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">PRIMARY EMAIL</div>
                <a href={`mailto:${PLACEHOLDERS.EMAIL}`} className="text-sm font-mono font-semibold text-cyber-cyan hover:underline break-all">
                  {PLACEHOLDERS.EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Specialization Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SPECIALIZATION_PILLARS.map((pillar, idx) => {
          const IconComp = ICON_MAP[pillar.icon] || Box;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-space-border hover:border-cyber-cyan/50 hover:shadow-glow-cyan transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-semibold text-cyber-cyan uppercase tracking-wider">
                    {pillar.category}
                  </div>
                  <h4 className="text-base font-gaming font-bold text-white uppercase group-hover:text-cyber-cyan transition-colors">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-space-border/40 flex flex-wrap gap-1.5">
                {pillar.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-surface/80 text-slate-300 border border-space-border/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
