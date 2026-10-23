import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Mail, Phone, MapPin } from 'lucide-react';
import { ACADEMIC_REFERENCES } from '../data/portfolioData';

export const ReferencesSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
            Academic Endorsements
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <div className="mb-8">
          <h2 className="font-clash text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Academic References & Mentors
          </h2>
          <p className="mt-1 font-sans text-xs text-[var(--color-text-secondary)]">
            Distinguished faculty members supervising research and academic progress at CUSAT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACADEMIC_REFERENCES.map((ref, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-300 hover:border-[#38bdf8]/40 hover:bg-[var(--color-bg-surface)]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#38bdf8]/10 text-[#38bdf8] group-hover:scale-105 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-clash text-lg md:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[#38bdf8] transition-colors">
                    {ref.name}
                  </h3>
                  <p className="font-sans text-xs font-medium text-[var(--color-text-secondary)]">
                    {ref.title}
                  </p>
                  <p className="font-mono text-xs text-[#38bdf8]">
                    {ref.department}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--color-text-tertiary)]">
                    {ref.institution}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <a
                  href={`mailto:${ref.email}`}
                  className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[#38bdf8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{ref.email}</span>
                </a>

                <a
                  href={`tel:${ref.phone}`}
                  className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[#38bdf8] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{ref.phone}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
