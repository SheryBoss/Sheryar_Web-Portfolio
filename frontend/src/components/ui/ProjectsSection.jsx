import React, { useState } from 'react';
import { Sparkles, ExternalLink, Github, Layers, Box, Gamepad2, X, CheckCircle2, Play, Image as ImageIcon, Video, ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_FILTER_TABS } from '../../data/portfolioData';
import { PLACEHOLDERS } from '../../data/placeholders';

/**
 * ProjectsSection - Interactive Real Projects Showcase with Screenshots & Video Support
 */
export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageMap, setActiveImageMap] = useState({});
  const [modalVideoMode, setModalVideoMode] = useState(false);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const handleToggleImage = (e, projectId, imgPath) => {
    e.stopPropagation();
    setActiveImageMap((prev) => ({
      ...prev,
      [projectId]: imgPath,
    }));
  };

  const openProjectModal = (project, startWithVideo = false) => {
    setSelectedProject(project);
    setModalVideoMode(startWithVideo && project.hasVideo);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>PORTFOLIO // VERIFIED PROJECT VAULT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-gaming font-bold uppercase tracking-tight text-white">
          FEATURED <span className="text-cyber-cyan glow-text-cyan">PROJECTS & CREATIONS</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          Interactive showcase of Sheryar Amir's real games in Unreal Engine 5 & Unity, AR/VR experiences, Blender 3D sculpts, and full-stack software systems.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          {PROJECT_FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-gaming font-semibold transition-all ${
                activeFilter === tab.id
                  ? 'bg-cyber-cyan text-space-dark font-bold shadow-glow-cyan'
                  : 'bg-space-card text-slate-300 border border-space-border hover:text-white hover:border-cyber-cyan/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const currentImg = activeImageMap[project.id] || project.image;

          return (
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-space-border hover:border-cyber-cyan/60 hover:shadow-glow-cyan transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              onClick={() => openProjectModal(project, false)}
            >
              {/* Visual Screenshot Banner */}
              <div className="relative h-56 sm:h-64 bg-space-void border-b border-space-border/60 overflow-hidden">
                <img
                  src={currentImg}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback visual if image fails to render
                    e.currentTarget.style.display = 'none';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-black/60 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-space-dark/85 text-cyber-cyan border border-cyber-cyan/40 backdrop-blur-md font-semibold">
                    {project.categoryLabel}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {project.watermark && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                        {project.watermark}
                      </span>
                    )}
                    {project.featured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-violet/30 text-cyber-violet border border-cyber-violet/50 backdrop-blur-md font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>FEATURED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Overlay Controls (Toggle view & video badge) */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                  {/* Screenshot toggles if secondary image exists */}
                  {project.secondaryImage ? (
                    <div className="flex items-center gap-1.5 bg-space-dark/90 p-1 rounded-lg border border-space-border backdrop-blur-md">
                      <button
                        onClick={(e) => handleToggleImage(e, project.id, project.image)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          currentImg === project.image
                            ? 'bg-cyber-cyan text-space-dark font-bold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Gameplay
                      </button>
                      <button
                        onClick={(e) => handleToggleImage(e, project.id, project.secondaryImage)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          currentImg === project.secondaryImage
                            ? 'bg-cyber-cyan text-space-dark font-bold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Main Menu
                      </button>
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-dark/80 text-slate-300 border border-space-border backdrop-blur-sm">
                      {project.engine}
                    </div>
                  )}

                  {project.hasVideo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectModal(project, true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyber-violet/80 hover:bg-cyber-violet text-white text-[10px] font-mono font-bold flex items-center gap-1 border border-cyber-violet/50 shadow-glow-subtle transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>WATCH VIDEO</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-gaming font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Tags & Action Bar */}
                <div className="space-y-4 pt-4 border-t border-space-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-surface text-slate-300 border border-space-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectModal(project, false);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-gaming font-bold text-space-dark bg-cyber-cyan hover:bg-cyan-300 transition-colors text-center tracking-wider"
                    >
                      VIEW ARCHITECTURE & DETAILS
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-space-surface border border-space-border hover:border-cyber-cyan text-slate-300 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail & Video Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-space-dark border border-cyber-cyan/50 rounded-2xl overflow-hidden shadow-glow-cyan p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-space-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-cyber-cyan uppercase font-semibold">
                    {selectedProject.categoryLabel} // {selectedProject.engine}
                  </span>
                  {selectedProject.watermark && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {selectedProject.watermark}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-gaming font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Viewer in Modal (Video or Screenshot) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalVideoMode(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                      !modalVideoMode
                        ? 'bg-cyber-cyan text-space-dark font-bold'
                        : 'bg-space-card text-slate-300 hover:text-white border border-space-border'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>SCREENSHOTS</span>
                  </button>

                  {selectedProject.hasVideo && (
                    <button
                      onClick={() => setModalVideoMode(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        modalVideoMode
                          ? 'bg-cyber-violet text-white font-bold shadow-glow-subtle'
                          : 'bg-space-card text-slate-300 hover:text-white border border-space-border'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>GAMEPLAY VIDEO</span>
                    </button>
                  )}
                </div>

                {selectedProject.secondaryImage && !modalVideoMode && (
                  <div className="text-xs font-mono text-slate-400">
                    Switch:
                    <button
                      onClick={() => handleToggleImage({ stopPropagation: () => {} }, selectedProject.id, selectedProject.image)}
                      className="ml-1 text-cyber-cyan hover:underline"
                    >
                      View 1
                    </button>
                    {' | '}
                    <button
                      onClick={() => handleToggleImage({ stopPropagation: () => {} }, selectedProject.id, selectedProject.secondaryImage)}
                      className="text-cyber-cyan hover:underline"
                    >
                      View 2
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-xl overflow-hidden border border-space-border bg-space-void h-72 sm:h-80 flex items-center justify-center relative">
                {modalVideoMode && selectedProject.videoUrl ? (
                  <video
                    src={selectedProject.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                ) : (
                  <img
                    src={activeImageMap[selectedProject.id] || selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {selectedProject.summary}
            </p>

            {/* Technical Highlights */}
            <div className="space-y-3">
              <div className="text-xs font-gaming font-bold text-cyber-violet uppercase tracking-wider">
                // TECHNICAL ARCHITECTURE & GAMEPLAY MECHANICS
              </div>
              <div className="space-y-2">
                {selectedProject.details.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2 pt-2 border-t border-space-border/40">
              <div className="text-xs font-mono text-slate-400">TECHNOLOGIES & ASSET PIPELINE:</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-space-card text-cyber-cyan border border-cyber-cyan/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-space-border/60">
              <div className="flex items-center gap-2">
                <a
                  href={PLACEHOLDERS.WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-gaming font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors flex items-center gap-1.5"
                >
                  <span>💬</span>
                  <span>CHAT ABOUT THIS ON WHATSAPP</span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white"
                >
                  CLOSE
                </button>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-gaming font-bold text-space-dark bg-cyber-cyan hover:bg-cyan-300 flex items-center gap-2 tracking-wider"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
