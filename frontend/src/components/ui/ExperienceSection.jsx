import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>MODULE 1 // EXPERIENCE & MILESTONES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white">
          EXPERIENCE & <span className="text-cyber-cyan glow-text-cyan">LAB WORK</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Applied development, lab initiatives, and 3D graphics research projects.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {EXPERIENCE_TIMELINE.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 sm:p-8 rounded-2xl border border-space-border hover:border-cyber-cyan/50 hover:shadow-glow-cyan transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-space-border/60 pb-3">
                <span className="text-cyber-cyan flex items-center gap-1.5 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-space-surface text-slate-300 border border-space-border/60 text-[10px]">
                  {item.type}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  {item.role}
                </h3>
                <div className="text-xs font-mono text-cyber-violet mt-0.5">
                  {item.organization}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-space-border/40 space-y-2">
              <div className="text-[10px] font-mono text-slate-400">TOOLS APPLIED:</div>
              <div className="flex flex-wrap gap-1.5">
                {item.skillsUsed.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-card text-cyber-cyan border border-cyber-cyan/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
