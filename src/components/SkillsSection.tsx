import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

/* ─── single skill pill ─────────────────────────────────────────── */
const SkillPill: React.FC<{ skill: string; highlight?: boolean }> = ({ skill, highlight }) => (
  <span
    className={`flex-shrink-0 rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 select-none cursor-default
      ${highlight
        ? 'border-[#38bdf8]/60 bg-[#38bdf8]/10 text-[#38bdf8]'
        : 'border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:border-[#38bdf8]/60 hover:text-[#38bdf8] hover:bg-[#38bdf8]/10'
      }`}
  >
    {skill}
  </span>
);

/* ─── category label chip ───────────────────────────────────────── */
const CategoryChip: React.FC<{ symbol: string; title: string }> = ({ symbol, title }) => (
  <span className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10 px-4 py-2 font-mono text-xs font-semibold text-[#38bdf8] select-none cursor-default">
    <span>{symbol}</span>
    <span>{title}</span>
  </span>
);

/* ─── section ───────────────────────────────────────────────────── */
export const SkillsSection: React.FC = () => {
  // Speeds alternated per row — different drift gives layered feel
  const rowSpeeds = [42, 36, 48, 34];
  // Odd rows go left, even rows go right
  const rowDirections: Array<'normal' | 'reverse'> = ['normal', 'reverse', 'normal', 'reverse'];

  return (
    <section id="skills" className="relative py-20 border-t border-[var(--color-border)] overflow-hidden">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="px-4 md:px-8 lg:px-12 mb-12"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
          02 // Technical Skills &amp; Stack
        </span>
        <h2 className="mt-4 font-clash text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] max-w-3xl">
          From Silicon &amp; Transceivers to Autonomous Algorithms
        </h2>
        <p className="mt-3 font-sans text-sm text-[var(--color-text-secondary)] max-w-xl">
          Hover any row to pause · each track scrolls at its own pace
        </p>
      </motion.div>

      {/* ── Marquee rows — one per skill category ── */}
      <div className="flex flex-col gap-4">
        {SKILL_CATEGORIES.map((cat, idx) => {
          // Build pill list: category chip first, then skills
          const items = cat.skills;
          const speed = rowSpeeds[idx] ?? 40;
          const direction = rowDirections[idx] ?? 'normal';

          return (
            <div key={idx} className="marquee-fade-left">
              <div className="overflow-hidden w-full">
                <div
                  className="flex gap-3 w-max"
                  style={{ animation: `marquee ${speed}s linear infinite ${direction}` }}
                  onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
                  onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
                >
                  {/* Triple repeat for seamless loop */}
                  {[0, 1, 2].map(copy => (
                    <React.Fragment key={copy}>
                      {/* Category label injected at start of each copy */}
                      <CategoryChip symbol={cat.symbol} title={cat.title} />
                      {/* Thin divider */}
                      <span className="flex-shrink-0 self-center h-4 w-px bg-[var(--color-border)]" />
                      {items.map((skill, sIdx) => (
                        <SkillPill key={`${copy}-${sIdx}`} skill={skill} highlight={sIdx === 0} />
                      ))}
                      {/* Gap between copies */}
                      <span className="flex-shrink-0 w-8" />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom info bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-4 md:mx-8 lg:mx-12 mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
            Languages &amp; Operating Systems
          </span>
          <div className="flex flex-wrap gap-2 pt-1 font-clash text-sm font-medium text-[var(--color-text-primary)]">
            <span>Python</span><span className="text-[#38bdf8]">•</span>
            <span>C++</span><span className="text-[#38bdf8]">•</span>
            <span>C</span><span className="text-[#38bdf8]">•</span>
            <span>Java</span><span className="text-[#38bdf8]">•</span>
            <span>Linux (Ubuntu/Debian)</span><span className="text-[#38bdf8]">•</span>
            <span>Windows</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
            Linguistic Proficiency
          </span>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[var(--color-text-secondary)]">
            <span>English (Professional)</span>
            <span className="text-[#38bdf8]">•</span>
            <span>Malayalam (Bilingual / Native)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
