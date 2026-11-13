import React from 'react';
import { GraduationCap, Briefcase, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { EDUCATION_TIMELINE, EXPERIENCE_TIMELINE } from '../../data/portfolioData';

/**
 * EducationExperienceSection - Cohesive Academic & Professional Milestones Section
 */
export default function EducationExperienceSection() {
  return (
    <section id="education-experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet text-xs font-mono font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>PORTFOLIO // QUALIFICATIONS & MILESTONES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white">
          EDUCATION & <span className="text-cyber-cyan glow-text-cyan">EXPERIENCE</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Rigorous academic foundations combined with applied game engine scripting, 3D character pipelines, and software engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Education Roadmap */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-space-border/60">
            <GraduationCap className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
              Academic Roadmap
            </h3>
          </div>

          <div className="relative border-l-2 border-cyber-cyan/30 pl-6 sm:pl-8 space-y-8">
            {EDUCATION_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Galactic Node Indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-space-dark border-2 border-cyber-cyan flex items-center justify-center group-hover:scale-125 transition-transform shadow-glow-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                </div>

                <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-space-border group-hover:border-cyber-cyan/40 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-border/50 pb-2.5">
                    <span className="text-xs font-mono font-bold text-cyber-cyan flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.year}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-violet/20 text-cyber-violet border border-cyber-violet/40">
                      {item.currentStatus}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                      {item.degree}
                    </h4>
                    <div className="text-xs font-mono text-slate-300 mt-0.5">
                      {item.institution}
                    </div>
                    <div className="text-xs font-mono text-cyber-violet mt-0.5">
                      {item.specialization} &bull; CGPA: {item.cgpa}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-space-border/40">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyber-cyan font-mono">&rsaquo;</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Experience & Lab Milestones */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-space-border/60">
            <Briefcase className="w-5 h-5 text-cyber-violet" />
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
              Development Milestones
            </h3>
          </div>

          <div className="relative border-l-2 border-cyber-violet/30 pl-6 sm:pl-8 space-y-8">
            {EXPERIENCE_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Galactic Node Indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-space-dark border-2 border-cyber-violet flex items-center justify-center group-hover:scale-125 transition-transform shadow-glow-violet">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet" />
                </div>

                <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-space-border group-hover:border-cyber-violet/40 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-border/50 pb-2.5">
                    <span className="text-xs font-mono font-bold text-cyber-violet flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-surface text-slate-300 border border-space-border/60">
                      {item.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-display font-bold text-white group-hover:text-cyber-violet transition-colors">
                      {item.role}
                    </h4>
                    <div className="text-xs font-mono text-cyber-cyan mt-0.5">
                      {item.organization}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-space-border/40 flex flex-wrap gap-1.5">
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
        </div>
      </div>
    </section>
  );
}
