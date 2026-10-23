import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC<{ onOpenCommandPalette: () => void }> = ({ onOpenCommandPalette }) => {
  const [istTime, setIstTime] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Real-time IST clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Portrait tilt on mouse move
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handlePortraitMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-visible flex flex-col justify-between pt-24 pb-8 px-4 md:px-8 lg:px-12">
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 70% 40%, rgba(56, 189, 248, 0.08), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-center gap-12 lg:gap-8">
          {/* Left Column: Monumental Kinetic Typography */}
          <div className="flex flex-col">
            {/* Top Sub-tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
                Portfolio // 2026
              </span>
              <span className="h-px w-12 bg-[#38bdf8]/40"></span>
              <span className="hidden sm:inline font-mono text-[11px] text-[#888888]">
                Robotics • Embedded • SDR
              </span>
            </motion.div>

            {/* Giant Name Typography with character animation */}
            <div className="flex flex-col select-none py-1">
              {/* Line 1: IVAN */}
              <div className="overflow-hidden py-1">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-clash text-[clamp(2.8rem,8vw,7.2rem)] font-bold tracking-tighter text-[var(--color-text-primary)] leading-[0.95]"
                >
                  IVAN
                </motion.h1>
              </div>

              {/* Line 2: ANTONY + Subtitle */}
              <div className="overflow-hidden py-1 flex flex-wrap items-baseline gap-4 md:gap-6">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-clash text-[clamp(2.8rem,8vw,7.2rem)] font-bold tracking-tighter text-[var(--color-text-primary)] leading-[0.95]"
                >
                  ANTONY
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hidden md:inline-block font-sans text-xs sm:text-sm font-medium tracking-wider text-[#888888] uppercase translate-y-[-0.2em]"
                >
                  — Robotics & Embedded Engineer
                </motion.span>
              </div>

              {/* Line 3: BABU in Electric Blue */}
              <div className="overflow-hidden py-1">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="font-clash text-[clamp(2.8rem,8vw,7.2rem)] font-light tracking-tighter text-[#38bdf8] leading-[0.95] drop-shadow-[0_0_35px_rgba(0,102,255,0.25)]"
                >
                  BABU
                </motion.h1>
              </div>
            </div>

            {/* Word Stagger Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 md:mt-8 max-w-2xl font-sans text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed"
            >
              Designing and implementing hardware-software systems across{' '}
              <span className="text-[var(--color-text-primary)] font-medium underline decoration-[#38bdf8]/40 underline-offset-4">
                Visual-Inertial SLAM
              </span>
              ,{' '}
              <span className="text-[var(--color-text-primary)] font-medium underline decoration-[#38bdf8]/40 underline-offset-4">
                Autonomous UAVs
              </span>
              , and{' '}
              <span className="text-[var(--color-text-primary)] font-medium underline decoration-[#38bdf8]/40 underline-offset-4">
                Software-Defined Radio
              </span>
              . Dual-degree engineer from CUSAT & IIT Madras.
            </motion.div>

            {/* Meta Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-5 md:gap-8"
            >
              {/* Location */}
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                <MapPin className="h-3.5 w-3.5 text-[#38bdf8]" />
                <span>Kochi, Kerala, India</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span>Open for Research & Roles</span>
              </div>

              {/* Live IST Clock */}
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                <Clock className="h-3.5 w-3.5 text-[#888888]" />
                <span className="tabular-nums">{istTime || '19:59'} IST</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Tilt Portrait Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
              style={{ perspective: 1000 }}
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
            >
              {/* Conic Glow Backing */}
              <div
                className="absolute inset-[-15%] -z-10 opacity-60 blur-3xl transition-all duration-700 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(56, 189, 248, 0.4), rgba(0, 200, 255, 0.15), rgba(70, 0, 255, 0.25), rgba(56, 189, 248, 0.4))',
                  borderRadius: '35%',
                }}
              />

              {/* 3D Tilted Card Container */}
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2 shadow-2xl transition-transform duration-150 ease-out"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[3/4] w-64 sm:w-72 md:w-80 overflow-hidden rounded-2xl bg-[#141414]">
                  <img
                    src={PERSONAL_INFO.profilePhoto}
                    alt={PERSONAL_INFO.name}
                    className="h-full w-full object-cover object-center filter contrast-105 brightness-95 transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      // Fallback if image path has issue
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_70%,rgba(0,102,255,0.18),transparent_65%)]" />

                  {/* Bottom badge on photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
                    <div>
                      <div className="font-clash text-xs font-semibold text-white">
                        {PERSONAL_INFO.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#38bdf8]">
                        IIT Tirupati STAR-PNT Fellow
                      </div>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#38bdf8]/20 text-[#38bdf8]">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Subtle corner tech accent */}
                <div className="absolute top-4 right-4 h-6 w-6 pointer-events-none opacity-40">
                  <div className="absolute top-0 right-0 h-full w-px bg-[#38bdf8]" />
                  <div className="absolute top-0 right-0 h-px w-full bg-[#38bdf8]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 flex items-end justify-between pt-10"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]">
          CUSAT • IIT MADRAS
        </span>

        {/* Scroll down trigger */}
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-2 focus:outline-none"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-tertiary)] group-hover:text-[#38bdf8] transition-colors">
            Scroll
          </span>
          <div className="relative h-10 w-[1px] overflow-hidden bg-[var(--color-border)]">
            <motion.div
              className="absolute inset-0 origin-top bg-[#38bdf8]"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </button>

        {/* ⌘K trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-secondary)]">
            ⌘K
          </kbd>
          <span>Quick actions</span>
        </button>
      </motion.div>
    </section>
  );
};
