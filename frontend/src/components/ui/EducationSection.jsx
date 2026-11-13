import React from 'react';
import { GraduationCap, BookOpen, Calendar, Award } from 'lucide-react';
import { EDUCATION_TIMELINE } from '../../data/portfolioData';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet text-xs font-mono font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>MODULE 1 // ACADEMIC ROADMAP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white">
          EDUCATION & <span className="text-cyber-cyan glow-text-cyan">QUALIFICATIONS</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Formal academic training in computer science, software engineering principles, and computer graphics theory.
        </p>
      </div>

      {/* Galactic Timeline Track */}
      <div className="max-w-4xl mx-auto relative border-l-2 border-cyber-cyan/30 pl-6 sm:pl-10 space-y-12">
        {EDUCATION_TIMELINE.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Pulsing Galactic Node on Timeline */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-space-dark border-2 border-cyber-cyan flex items-center justify-center group-hover:scale-125 transition-transform shadow-glow-cyan">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-space-border group-hover:border-cyber-cyan/50 transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-border/60 pb-3">
                <span className="text-xs font-mono font-bold text-cyber-cyan flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year}</span>
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyber-violet/20 text-cyber-violet border border-cyber-violet/40">
                  {item.currentStatus}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                  {item.degree}
                </h3>
                <div className="text-sm font-mono text-slate-300 mt-1">
                  {item.institution}
                </div>
                <div className="text-xs font-mono text-cyber-violet mt-0.5">
                  {item.specialization} &bull; CGPA: {item.cgpa}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-space-border/40">
                <div className="text-xs font-mono text-slate-400">ACADEMIC HIGHLIGHTS:</div>
                <ul className="space-y-1.5">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyber-cyan font-mono">&rsaquo;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
