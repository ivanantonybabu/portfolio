import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-20 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0066ff]">
            02 // Technical Skills & Stack
          </span>
        </div>
        <div className="mb-12">
          <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] max-w-3xl">
            From Silicon & Transceivers to Autonomous Algorithms
          </h2>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-500 hover:border-[#0066ff]/40 hover:bg-[var(--color-bg-surface)] flex flex-col justify-between"
            >
              {/* Radial gradient hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.18), transparent 70%)',
                }}
              />

              <div>
                <h3 className="relative z-10 mb-5 flex items-center gap-2 font-clash text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
                  <span className="text-[#0066ff] text-base">{cat.symbol}</span>
                  <span>{cat.title}</span>
                </h3>

                {/* Skill Pills */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[#0066ff] hover:text-[#0066ff] hover:bg-[#0066ff]/10 cursor-default select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom detail row */}
              <div className="relative z-10 mt-8 pt-4 border-t border-[var(--color-border)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--color-text-tertiary)]">
                <span>Domain {idx + 1}</span>
                <span className="text-[#0066ff] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Languages & Tools Banner */}
        <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0066ff]">
              Operating Systems & Languages
            </span>
            <div className="flex flex-wrap gap-2 pt-1 font-clash text-sm font-medium text-[var(--color-text-primary)]">
              <span>Linux (Ubuntu/Debian)</span>
              <span className="text-[#0066ff]">•</span>
              <span>Windows</span>
              <span className="text-[#0066ff]">•</span>
              <span>Python</span>
              <span className="text-[#0066ff]">•</span>
              <span>C++</span>
              <span className="text-[#0066ff]">•</span>
              <span>C</span>
              <span className="text-[#0066ff]">•</span>
              <span>Java</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0066ff]">
              Linguistic Proficiency
            </span>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[var(--color-text-secondary)]">
              <span>English (Professional)</span>
              <span className="text-[#0066ff]">•</span>
              <span>Malayalam (Bilingual / Native)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
