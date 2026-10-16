import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-8 pb-12 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)] select-none">
      <div className="mx-auto max-w-6xl">
        {/* Kinetic Back to Top Row */}
        <div className="mb-10 flex items-end justify-between">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group text-left focus:outline-none"
          >
            <span className="block font-clash text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tighter text-[var(--color-text-primary)] transition-colors duration-500 group-hover:text-[#0066ff]">
              Back to top
            </span>
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group mb-2 hidden md:block focus:outline-none"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] transition-all duration-500 group-hover:border-[#0066ff] group-hover:bg-[#0066ff]/10">
              <ArrowUp className="h-5 w-5 text-[var(--color-text-secondary)] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#0066ff]" />
            </div>
          </button>
        </div>

        <div className="h-[1px] w-full bg-[var(--color-border)] mb-8" />

        {/* Footer Meta Details */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-xs text-[var(--color-text-tertiary)]">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="tabular-nums">{istTime} IST</span>
            <span>•</span>
            <span>Kochi, Kerala, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
