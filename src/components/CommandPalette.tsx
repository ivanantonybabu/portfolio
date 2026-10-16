import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Copy,
  Check,
  FileText,
  Github,
  Linkedin,
  Sun,
  Moon,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPhotoGuidance: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  onOpenPhotoGuidance,
}) => {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setSearch('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (selector: string) => {
    onClose();
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  interface CommandItem {
    label: string;
    action: () => void;
    tag: string;
    icon?: React.ReactNode;
  }

  interface CommandCategory {
    category: string;
    items: CommandItem[];
  }

  const actions: CommandCategory[] = [
    {
      category: 'Navigation',
      items: [
        { label: 'Jump to Hero / Top', action: () => navigateTo('#hero'), tag: 'Nav' },
        { label: 'About & Core Disciplines', action: () => navigateTo('#about'), tag: 'Nav' },
        { label: 'Technical Skills Matrix', action: () => navigateTo('#skills'), tag: 'Nav' },
        { label: 'Selected Engineering Projects', action: () => navigateTo('#projects'), tag: 'Nav' },
        { label: 'Research & ICTEST Publication', action: () => navigateTo('#publications'), tag: 'Nav' },
        { label: 'Experience & Leadership Roles', action: () => navigateTo('#experience'), tag: 'Nav' },
        { label: 'Education & Certifications', action: () => navigateTo('#education'), tag: 'Nav' },
        { label: 'Contact & Transmit Message', action: () => navigateTo('#contact'), tag: 'Nav' },
      ],
    },
    {
      category: 'Quick Actions',
      items: [
        {
          label: 'Copy Email Address',
          action: () => copyText(PERSONAL_INFO.email, 'email'),
          tag: copied === 'email' ? 'Copied!' : 'Action',
          icon: copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />,
        },
        {
          label: 'Copy Phone Number',
          action: () => copyText(PERSONAL_INFO.phone, 'phone'),
          tag: copied === 'phone' ? 'Copied!' : 'Action',
          icon: copied === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />,
        },
        {
          label: 'Download Curriculum Vitae (PDF)',
          action: () => {
            window.open(PERSONAL_INFO.resumePath, '_blank');
            onClose();
          },
          tag: 'PDF',
          icon: <FileText className="w-4 h-4 text-[#0066ff]" />,
        },
        {
          label: 'Toggle Visual Theme (Light/Dark)',
          action: () => {
            onToggleTheme();
          },
          tag: isDark ? 'Light' : 'Dark',
          icon: isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
        },
        {
          label: 'Photos & Customization Guidance',
          action: () => {
            onClose();
            onOpenPhotoGuidance();
          },
          tag: 'Info',
          icon: <ImageIcon className="w-4 h-4 text-[#0066ff]" />,
        },
      ],
    },
    {
      category: 'External Links',
      items: [
        {
          label: 'GitHub Profile (@Nightsky2004)',
          action: () => {
            window.open(PERSONAL_INFO.github, '_blank');
            onClose();
          },
          tag: 'External',
          icon: <Github className="w-4 h-4" />,
        },
        {
          label: 'LinkedIn Profile',
          action: () => {
            window.open(PERSONAL_INFO.linkedin, '_blank');
            onClose();
          },
          tag: 'External',
          icon: <Linkedin className="w-4 h-4 text-[#0066ff]" />,
        },
      ],
    },
  ];

  const filteredActions = actions
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-md"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-2xl text-[var(--color-text-primary)]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4">
          <Search className="h-5 w-5 text-[#0066ff]" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent font-sans text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-tertiary)] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-[var(--color-text-tertiary)]">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] px-3 py-1 block">
                  {group.category}
                </span>
                {group.items.map((item, iIdx) => (
                  <button
                    key={iIdx}
                    onClick={item.action}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left font-sans text-xs sm:text-sm text-[var(--color-text-primary)] hover:bg-[#0066ff]/10 hover:text-[#0066ff] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <span className="text-[var(--color-text-secondary)] group-hover:text-[#0066ff]">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] group-hover:text-[#0066ff]">
                        {item.tag}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Palette Footer */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-bg)]/50 px-5 py-2.5 font-mono text-[11px] text-[var(--color-text-tertiary)]">
          <span>Navigate with mouse or keyboard</span>
          <span>[ESC] to dismiss</span>
        </div>
      </motion.div>
    </div>
  );
};
