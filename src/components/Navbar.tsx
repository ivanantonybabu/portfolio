import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenPhotoGuidance: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenPhotoGuidance,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#publications' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-4 py-5 md:px-8 lg:px-10 mix-blend-difference select-none">
        {/* Brand Logo */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 font-clash text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
          aria-label="Scroll to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/40 bg-white/10 text-sm font-bold tracking-tight">
            IB
          </span>
          <span className="hidden sm:inline-block font-sans text-xs tracking-[0.2em] uppercase text-white/90">
            {PERSONAL_INFO.name}
          </span>
        </button>

        {/* Desktop Quick Nav & Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Quick command search pill */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs text-white/80 transition-colors hover:border-white/40 hover:text-white"
            title="Press ⌘K or Ctrl+K for quick actions"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/60 border border-white/30 rounded px-1">
              ⌘K
            </span>
          </button>

          {/* Photo Guide Pill */}
          <button
            onClick={onOpenPhotoGuidance}
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs text-white/80 transition-colors hover:border-white/40 hover:text-white"
            title="View photo placement guidance"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]"></span>
            <span className="text-[11px] font-mono">Photos Info</span>
          </button>

          {/* Resume Quick Link */}
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs text-white/90 transition-colors hover:border-white/50 hover:text-white"
          >
            <FileText className="w-3.5 h-3.5 text-[#0066ff]" />
            <span className="hidden md:inline text-xs font-mono uppercase tracking-wider">CV</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-white/40"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="h-4 w-4 text-white transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <span className="hidden h-4 w-[1px] md:block bg-white/30" />

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex flex-col gap-[6px] p-2 focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-7 bg-white transition-transform duration-300 origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 ml-auto bg-white transition-transform duration-300 origin-center"
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[120] flex flex-col justify-between bg-[#0a0a0a] px-6 py-6 md:px-16 md:py-12 text-white"
          >
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-white/10 text-xs font-bold font-clash">
                  IB
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#888888]">
                  NAVIGATION
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[#999999] hover:text-white hover:border-white/40 transition-colors"
              >
                <span>Close</span>
                <span className="text-white">✕</span>
              </button>
            </div>

            <nav className="flex flex-col gap-4 md:gap-6 my-auto">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="group flex items-baseline gap-4 text-left font-clash text-4xl font-semibold text-[#f5f5f5] transition-colors hover:text-[#0066ff] md:text-6xl lg:text-7xl"
                  >
                    <span className="font-mono text-xs text-[#666666] group-hover:text-[#0066ff] transition-colors">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-[#222222] pt-6 gap-4">
              <div className="flex flex-wrap gap-6 font-mono text-xs text-[#999999]">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="font-mono text-xs text-[#666666]">
                Kochi, Kerala, India — IST
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
