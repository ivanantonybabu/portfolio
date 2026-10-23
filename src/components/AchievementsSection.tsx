import React from 'react';
import { motion } from 'framer-motion';
import { Award, Image as ImageIcon } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

/* ─── single card ─────────────────────────────────────────────── */
interface AchievementCardProps {
  item: (typeof ACHIEVEMENTS)[number];
  onOpenPhotoGuidance?: () => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ item, onOpenPhotoGuidance }) => (
  <div
    className="group relative flex h-[220px] w-[280px] sm:w-[310px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-500 hover:border-[#0066ff]/50 hover:bg-[var(--color-bg-surface)] cursor-default"
  >
    {/* Background Photo */}
    {item.image && (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elevated)] via-[var(--color-bg-elevated)]/70 to-transparent" />
      </div>
    )}

    {/* Radial glow on hover */}
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: 'radial-gradient(350px circle at 50% 30%, rgba(0,102,255,0.14), transparent)' }}
    />

    {/* Award icon watermark (hidden when photo present) */}
    {!item.image && (
      <div className="absolute top-5 right-5 text-white/5 group-hover:text-[#0066ff]/20 transition-colors duration-500">
        <Award className="w-14 h-14 stroke-1" />
      </div>
    )}

    {/* Photo slot badge */}
    {!item.image && item.photoPlaceholderNote && (
      <button
        onClick={onOpenPhotoGuidance}
        className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[9px] text-[#888] backdrop-blur hover:text-white transition-colors"
        title={item.photoPlaceholderNote}
      >
        <ImageIcon className="w-2.5 h-2.5 text-[#0066ff]" />
        <span>Photo Slot</span>
      </button>
    )}

    {/* Metric */}
    <span className="relative z-10 font-clash text-3xl sm:text-4xl font-bold leading-none text-[var(--color-text-primary)] transition-colors duration-400 group-hover:text-[#0066ff]">
      {item.metric}
    </span>

    {/* Title & org */}
    <div className="relative z-10 mt-2.5">
      <span className="block font-clash text-sm font-semibold text-[var(--color-text-primary)]">
        {item.label}
      </span>
      <span className="mt-0.5 block font-mono text-xs text-[#0066ff]">
        {item.organization}
      </span>
      <p className="mt-1 font-sans text-[11px] text-[var(--color-text-tertiary)] line-clamp-2 leading-relaxed">
        {item.description}
      </p>
    </div>

    {/* Corner bracket accent */}
    <div className="absolute right-5 top-5 h-7 w-7 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
      <div className="absolute right-0 top-0 h-full w-px bg-[#0066ff]/40" />
      <div className="absolute right-0 top-0 h-px w-full bg-[#0066ff]/40" />
    </div>
  </div>
);

/* ─── section ──────────────────────────────────────────────────── */
export const AchievementsSection: React.FC<{ onOpenPhotoGuidance?: () => void }> = ({
  onOpenPhotoGuidance,
}) => {
  // Split into two rows for the two-row marquee look
  const row1 = ACHIEVEMENTS.slice(0, Math.ceil(ACHIEVEMENTS.length / 2));
  const row2 = ACHIEVEMENTS.slice(Math.ceil(ACHIEVEMENTS.length / 2));

  return (
    <section className="relative py-14 overflow-hidden border-t border-[var(--color-border)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-4 md:px-8 lg:px-12 mb-10"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0066ff]">
            Key Milestones &amp; Honours
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <h2 className="mt-4 font-clash text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Recognized for Engineering Excellence
        </h2>
      </motion.div>

      {/* ── Row 1 — slides left ── */}
      <div className="mb-5 marquee-fade-left">
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-5 w-max"
            style={{ animation: 'marquee 38s linear infinite normal' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...row1, ...row1, ...row1].map((item, i) => (
              <AchievementCard key={`r1-${i}`} item={item} onOpenPhotoGuidance={onOpenPhotoGuidance} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2 — slides right (reverse) ── */}
      {row2.length > 0 && (
        <div className="marquee-fade-left">
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-5 w-max"
              style={{ animation: 'marquee 32s linear infinite reverse' }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...row2, ...row2, ...row2].map((item, i) => (
                <AchievementCard key={`r2-${i}`} item={item} onOpenPhotoGuidance={onOpenPhotoGuidance} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
