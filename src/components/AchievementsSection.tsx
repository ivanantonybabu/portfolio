import React from 'react';
import { motion } from 'framer-motion';
import { Award, Image as ImageIcon } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const AchievementsSection: React.FC<{ onOpenPhotoGuidance?: () => void }> = ({
  onOpenPhotoGuidance,
}) => {
  return (
    <section className="relative py-12 overflow-hidden border-t border-[var(--color-border)]">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 mb-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0066ff]">
            Key Milestones & Honours
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-clash text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Recognized for Engineering Excellence
          </h2>
          <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
            Scroll horizontally to view all →
          </span>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="overflow-x-auto no-scrollbar pb-6 px-4 md:px-8 lg:px-12 flex gap-6 md:gap-8">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="group relative flex h-[240px] w-[280px] sm:w-[320px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-500 hover:border-[#0066ff]/40 hover:bg-[var(--color-bg-surface)]"
          >
            {/* Radial glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at 50% 25%, rgba(0, 102, 255, 0.12), transparent)',
              }}
            />

            {/* Subtle tech background grid/icon */}
            <div className="absolute top-6 right-6 text-white/5 group-hover:text-[#0066ff]/20 transition-colors">
              <Award className="w-16 h-16 stroke-1" />
            </div>

            {/* Photo slot badge if placeholder available */}
            {item.photoPlaceholderNote && (
              <button
                onClick={onOpenPhotoGuidance}
                className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[9px] text-[#888888] backdrop-blur hover:text-white transition-colors"
                title={item.photoPlaceholderNote}
              >
                <ImageIcon className="w-2.5 h-2.5 text-[#0066ff]" />
                <span>Photo Slot</span>
              </button>
            )}

            {/* Metric Value */}
            <span className="relative z-10 font-clash text-3xl sm:text-4xl font-bold leading-none text-[var(--color-text-primary)] transition-colors duration-500 group-hover:text-[#0066ff]">
              {item.metric}
            </span>

            {/* Title & Organization */}
            <div className="relative z-10 mt-3">
              <span className="block font-clash text-sm md:text-base font-semibold text-[var(--color-text-primary)]">
                {item.label}
              </span>
              <span className="mt-1 block font-mono text-xs text-[#0066ff]">
                {item.organization}
              </span>
              <p className="mt-1.5 font-sans text-xs text-[var(--color-text-tertiary)] line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Corner Tech Bracket Accent */}
            <div className="absolute right-6 top-6 h-8 w-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
              <div className="absolute right-0 top-0 h-full w-px bg-[#0066ff]/40" />
              <div className="absolute right-0 top-0 h-px w-full bg-[#0066ff]/40" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
