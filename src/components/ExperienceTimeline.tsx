import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'internship' | 'leadership'>('all');

  const filtered =
    activeTab === 'all'
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.type === activeTab);

  return (
    <section id="experience" className="relative py-20 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0066ff]">
            05 // Experience & Leadership
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] max-w-2xl">
            Engineering Roles & High-Impact Leadership
          </h2>

          {/* Tab Selector */}
          <div className="flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#0066ff] text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              All Roles ({EXPERIENCES.length})
            </button>
            <button
              onClick={() => setActiveTab('internship')}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                activeTab === 'internship'
                  ? 'bg-[#0066ff] text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                activeTab === 'leadership'
                  ? 'bg-[#0066ff] text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              Leadership
            </button>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-4 md:before:left-8 before:h-full before:w-0.5 before:bg-[var(--color-border)] before:pointer-events-none">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="relative flex items-start gap-4 md:gap-8 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg)] text-[#0066ff] group-hover:border-[#0066ff] group-hover:scale-110 transition-all">
                {item.type === 'internship' ? (
                  <Briefcase className="w-3.5 h-3.5" />
                ) : (
                  <Users className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-300 hover:border-[#0066ff]/40 hover:bg-[var(--color-bg-surface)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-clash text-lg md:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[#0066ff] transition-colors">
                        {item.role}
                      </h3>
                      {item.badge && (
                        <span className="rounded-full bg-[#0066ff]/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#0066ff] border border-[#0066ff]/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm text-[var(--color-text-primary)] font-medium">
                      {item.organization}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--color-text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0066ff]" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-2 border-t border-[var(--color-border)]/50 pt-3">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 font-sans text-xs md:text-sm text-[var(--color-text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066ff] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-tertiary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
