import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, FileText, Github, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mailto link
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <section id="contact" className="relative pt-20 pb-12 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
            07 // Get in Touch
          </span>
        </div>
        <div className="mb-8 h-[1px] w-full bg-[var(--color-border)]" />

        {/* Massive Headline */}
        <div className="mb-14 select-none">
          <div className="overflow-hidden">
            <h2 className="font-clash text-[clamp(2.6rem,7.5vw,7.5rem)] font-bold leading-[0.95] tracking-tighter text-[var(--color-text-primary)]">
              Let's build
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="font-clash text-[clamp(2.6rem,7.5vw,7.5rem)] font-bold leading-[0.95] tracking-tighter text-[var(--color-text-primary)]">
              something
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="font-clash text-[clamp(2.6rem,7.5vw,7.5rem)] font-light leading-[0.95] tracking-tighter text-[#38bdf8] drop-shadow-[0_0_40px_rgba(0,102,255,0.3)]">
              extraordinary
            </h2>
          </div>
        </div>

        {/* Split Grid: Direct Info & Working Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Info & Links */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="font-sans text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md">
                Whether you have an inquiry regarding robotics engineering, autonomous UAV architectures, SDR research, or potential collaborations — feel free to reach out.
              </p>

              {/* Direct Email Card */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all hover:border-[#38bdf8]/40">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] block mb-1">
                  Direct Inquiries
                </span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-clash text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] hover:text-[#38bdf8] transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8] transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 text-[#38bdf8]" />
                <span>Kochi, Kerala, India — 682022</span>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-tertiary)] block">
                Connect & Documents
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PERSONAL_INFO.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#38bdf8] px-4 py-2 font-mono text-xs font-medium text-[#0d1117] shadow-lg shadow-[#38bdf8]/25 hover:bg-[#7dd3fc] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] hover:text-white hover:border-[#38bdf8] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8">
            <h3 className="font-clash text-xl font-bold text-[var(--color-text-primary)] mb-6">
              Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[var(--color-text-tertiary)] mb-1.5 uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alan Turing"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 font-sans text-xs sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[var(--color-text-tertiary)] mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 font-sans text-xs sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[var(--color-text-tertiary)] mb-1.5 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Research Collaboration / Robotics Opportunity"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 font-sans text-xs sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[var(--color-text-tertiary)] mb-1.5 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Ivan, I came across your Visual-Inertial SLAM research..."
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 font-sans text-xs sm:text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#38bdf8] py-3.5 font-mono text-xs font-semibold text-[#0d1117] shadow-lg shadow-[#38bdf8]/25 hover:bg-[#7dd3fc] transition-all"
              >
                {isSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Email Client Triggered</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
