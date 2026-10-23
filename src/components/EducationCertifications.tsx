import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, X, Eye } from 'lucide-react';
import { EDUCATION_LIST, CERTIFICATIONS, Certification } from '../data/portfolioData';

export const EducationCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="education" className="relative py-20 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
            06 // Academic Background & Certifications
          </span>
        </div>
        <div className="mb-12">
          <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Rigorous Dual-Degree & Industry Accreditations
          </h2>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {EDUCATION_LIST.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 transition-all duration-300 hover:border-[#38bdf8]/40 hover:bg-[var(--color-bg-surface)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                    {edu.period}
                  </span>
                </div>

                <h3 className="font-clash text-lg md:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[#38bdf8] transition-colors leading-tight">
                  {edu.institution}
                </h3>
                <p className="mt-2 font-mono text-xs text-[#38bdf8]">
                  {edu.degree}
                </p>

                <p className="mt-3 font-sans text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {edu.description}
                </p>

                {edu.courses && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]/50">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] block mb-2">
                      Key Subjects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.slice(0, 4).map((c, cIdx) => (
                        <span
                          key={cIdx}
                          className="rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-secondary)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Score Badge */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50 flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                  {edu.scoreType}
                </span>
                <span className="font-clash text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[#38bdf8] transition-colors">
                  {edu.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Sub-section */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
              Professional Accreditations
            </span>
            <span className="h-px flex-1 bg-[var(--color-border)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                onClick={() => cert.image && setSelectedCert(cert)}
                className={`group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-all duration-300 hover:border-[#38bdf8]/40 hover:bg-[var(--color-bg-surface)] flex flex-col justify-between ${
                  cert.image ? 'cursor-pointer' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">
                      {cert.year}
                    </span>
                    <span className="rounded-full bg-[#38bdf8]/10 px-2 py-0.5 font-mono text-[10px] text-[#38bdf8] border border-[#38bdf8]/20">
                      {cert.badge}
                    </span>
                  </div>

                  <h4 className="font-clash text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[#38bdf8] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-[var(--color-text-secondary)]">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--color-text-tertiary)]">
                  {cert.image ? (
                    <span className="text-[#38bdf8] flex items-center gap-1 group-hover:underline">
                      <Eye className="w-3 h-3" />
                      <span>View Credential</span>
                    </span>
                  ) : (
                    <span>Verified</span>
                  )}
                  <span className="text-[#38bdf8]">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && selectedCert.image && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-[var(--color-text-primary)]"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-clash text-xl font-bold mb-1">
                {selectedCert.title}
              </h3>
              <p className="font-mono text-xs text-[#38bdf8] mb-4">
                {selectedCert.issuer} • {selectedCert.year}
              </p>

              <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-black/40">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-xl bg-[#38bdf8] px-4 py-2 font-mono text-xs text-white"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
