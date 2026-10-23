import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

export const ProjectsSection: React.FC<{ onOpenPhotoGuidance?: () => void }> = ({
  onOpenPhotoGuidance,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Robotics & SLAM', 'Software-Defined Radio', 'Embedded & IoT'];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-20 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
            03 // Selected Engineering Projects
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] max-w-2xl">
            Real-World Hardware & Software Systems
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[#38bdf8] text-[#0d1117] font-semibold shadow-[0_0_18px_rgba(56,189,248,0.4)]'
                    : 'border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:border-[#38bdf8]/50 hover:text-[#38bdf8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredProjects.map((project, idx) => {
            const spanClass = project.bentoSpan || 'lg:col-span-2';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-500 hover:border-[#38bdf8]/50 hover:bg-[var(--color-bg-surface)] ${spanClass}`}
              >
                {/* Background Photo (when provided) */}
                {project.image && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt=""
                      className="w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elevated)] via-[var(--color-bg-elevated)]/60 to-transparent" />
                  </div>
                )}

                {/* Radial Glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(ellipse at 80% 80%, rgba(56, 189, 248, 0.12), transparent 70%)',
                  }}
                />

                <div>
                  {/* Top Bar: Category & Links */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-text-tertiary)]">•</span>
                      <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                        {project.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!project.image && project.photoPlaceholderNote && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenPhotoGuidance) onOpenPhotoGuidance();
                          }}
                          className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-[#888888] hover:text-white transition-colors"
                          title={project.photoPlaceholderNote}
                        >
                          <ImageIcon className="w-2.5 h-2.5 text-[#38bdf8]" />
                          <span className="hidden sm:inline">Photo Slot</span>
                        </button>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8] transition-colors"
                          aria-label="View on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-clash text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] group-hover:text-[#38bdf8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#38bdf8]/80">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 font-sans text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Bullet Highlights (if featured or large card) */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-[var(--color-border)]/50 pt-3">
                      {project.highlights.slice(0, 3).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 font-sans text-xs text-[var(--color-text-secondary)]">
                          <span className="text-[#38bdf8] mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Bar: Tags & View More Button */}
                <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-tertiary)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] self-center">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="font-mono text-xs text-[#38bdf8] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Modal Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 text-[var(--color-text-primary)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                  {selectedProject.category}
                </span>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">•</span>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                  {selectedProject.year}
                </span>
              </div>

              <h2 className="font-clash text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {selectedProject.title}
              </h2>
              <p className="mt-1 font-mono text-xs text-[#38bdf8]">
                {selectedProject.subtitle}
              </p>

              <p className="mt-6 font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Photo guide notice in modal */}
              {selectedProject.photoPlaceholderNote && (
                <div className="mt-4 rounded-xl border border-dashed border-[#38bdf8]/40 bg-[#38bdf8]/5 p-4 text-xs font-mono text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2 text-[#38bdf8] font-semibold mb-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>Photo Placeholder Notice</span>
                  </div>
                  <p>{selectedProject.photoPlaceholderNote}</p>
                </div>
              )}

              {/* Technical Highlights */}
              <div className="mt-6">
                <h4 className="font-clash text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                  Engineering Highlights & Metrics
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 font-mono text-xs text-[var(--color-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#38bdf8] px-5 py-2.5 font-mono text-xs font-medium text-[#0d1117] shadow-lg shadow-[#38bdf8]/30 hover:bg-[#7dd3fc] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-xl border border-[var(--color-border)] px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
