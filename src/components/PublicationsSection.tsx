import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { PUBLICATION, INVITED_TALK } from '../data/portfolioData';

export const PublicationsSection: React.FC<{ onOpenPhotoGuidance?: () => void }> = ({
  onOpenPhotoGuidance,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const citationText = `Ivan Antony Babu, "A Low-Cost ToF LiDAR-Assisted Visual–Inertial SLAM System Using Multi-Sensor Fusion for Indoor Localization on Raspberry Pi 5," International Conference on Trends in Engineering Systems and Technologies (ICTEST), Kochi, India, 2026.`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <section id="publications" className="relative py-20 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0066ff]">
            04 // Research & Publications
          </span>
        </div>
        <div className="mb-12">
          <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Conference Proceedings & Keynotes
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Selected Conference Paper Card (2 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-500 hover:border-[#0066ff]/50 hover:bg-[var(--color-bg-surface)] flex flex-col justify-between"
          >
            {/* Conference Photo Banner — shown at top of card when image is available */}
            {PUBLICATION.image && (
              <div className="absolute top-0 left-0 right-0 h-36 overflow-hidden rounded-t-3xl pointer-events-none">
                <img
                  src={PUBLICATION.image}
                  alt="Conference presentation"
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-bg-elevated)]" />
              </div>
            )}

            {/* Top Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.15), transparent 70%)',
              }}
            />

            <div className={PUBLICATION.image ? 'pt-28 relative' : 'relative'}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0066ff]/15 px-3 py-1 font-mono text-xs font-semibold text-[#0066ff] border border-[#0066ff]/30">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Conference Paper</span>
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                    Presented • 2026
                  </span>
                </div>

                {!PUBLICATION.image && PUBLICATION.photoPlaceholderNote && (
                  <button
                    onClick={onOpenPhotoGuidance}
                    className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-[#888888] hover:text-white"
                  >
                    <ImageIcon className="w-3 h-3 text-[#0066ff]" />
                    <span>Photo Slot</span>
                  </button>
                )}
              </div>

              {/* Title */}
              <h3 className="font-clash text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] leading-snug group-hover:text-[#0066ff] transition-colors">
                {PUBLICATION.title}
              </h3>

              {/* Author & Venue */}
              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                <span className="font-semibold text-[var(--color-text-primary)] underline decoration-[#0066ff]">
                  {PUBLICATION.authors}
                </span>
                <span>•</span>
                <span className="text-[#0066ff] font-medium">{PUBLICATION.venue}</span>
                <span>•</span>
                <span>{PUBLICATION.location}</span>
              </div>

              {/* Abstract */}
              <div className="mt-5 rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg)]/60 p-4 md:p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#0066ff] block mb-2">
                  Abstract Overview
                </span>
                <p className="font-sans text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {PUBLICATION.abstract}
                </p>
              </div>

              {/* Keywords */}
              <div className="mt-5 flex flex-wrap gap-2">
                {PUBLICATION.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-tertiary)]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white hover:border-[#0066ff] transition-colors"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Citation Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Citation (BibTeX/APA)</span>
                  </>
                )}
              </button>

              <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                ICTEST 2026 Proceedings
              </span>
            </div>
          </motion.div>

          {/* Invited Talk Card (1 Col) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-500 hover:border-[#0066ff]/50 hover:bg-[var(--color-bg-surface)] flex flex-col justify-between"
          >
            {/* Top Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.15), transparent 70%)',
              }}
            />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0066ff]/15 px-3 py-1 font-mono text-xs font-semibold text-[#0066ff] border border-[#0066ff]/30">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Invited Keynote</span>
                </span>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                  {INVITED_TALK.year}
                </span>
              </div>

              <h3 className="font-clash text-xl font-bold tracking-tight text-[var(--color-text-primary)] leading-snug group-hover:text-[#0066ff] transition-colors">
                "{INVITED_TALK.title}"
              </h3>

              <div className="mt-4 space-y-2 font-sans text-xs text-[var(--color-text-secondary)]">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#0066ff] block">
                    Host Organization
                  </span>
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {INVITED_TALK.host}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-[#0066ff] block">
                    Joint Collaboration
                  </span>
                  <span>{INVITED_TALK.collaborators}</span>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-[10px] uppercase text-[#0066ff] block">
                    Talk Core Focus
                  </span>
                  <p className="leading-relaxed text-[var(--color-text-secondary)]">
                    {INVITED_TALK.topic}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--color-border)]/50 flex items-center justify-between text-xs font-mono text-[var(--color-text-tertiary)]">
              <span>IEEE Joint Chapter</span>
              <span className="text-[#0066ff]">Speaker</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
