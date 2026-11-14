import React, { useState } from 'react';
import { Cpu, Box, Gamepad2, Code2, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

const CATEGORY_ICON_MAP = {
  Box: Box,
  Gamepad2: Gamepad2,
  Code2: Code2,
  Globe2: Globe2,
};

/**
 * SkillsSection - Interactive Skills Matrix with Category Filters & Icons
 */
export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories = activeTab === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>PORTFOLIO // TECHNICAL COMPETENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white">
          SKILLS & <span className="text-cyber-cyan glow-text-cyan">TECHNOLOGIES</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Integrated toolsets spanning 3D character pipelines, real-time graphics engines, software engineering, and AI retrieval systems.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'all'
                ? 'bg-cyber-cyan text-space-dark font-bold shadow-glow-cyan'
                : 'bg-space-card text-slate-300 border border-space-border hover:text-white'
            }`}
          >
            ALL DISCIPLINES
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === cat.id
                  ? 'bg-cyber-violet text-white font-bold shadow-glow-violet'
                  : 'bg-space-card text-slate-300 border border-space-border hover:text-white'
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.map((category) => {
          const CategoryIcon = CATEGORY_ICON_MAP[category.icon] || Cpu;

          return (
            <div
              key={category.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-space-border hover:border-cyber-cyan/40 transition-all duration-300 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-space-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl border"
                    style={{
                      backgroundColor: `${category.color}15`,
                      borderColor: `${category.color}40`,
                      color: category.color,
                    }}
                  >
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {category.skills.length} TOOLS
                </span>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium flex items-center gap-2">
                        <span>{skill.name}</span>
                        {skill.type === 'primary' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
                            CORE
                          </span>
                        )}
                      </span>
                      <span className="text-slate-400 text-[11px]">{skill.experience}</span>
                    </div>

                    {/* Proficiency Meter */}
                    <div className="w-full h-2 bg-space-void rounded-full overflow-hidden border border-space-border/40">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: category.color,
                          boxShadow: `0 0 10px ${category.color}80`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
