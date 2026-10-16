import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ProgressBar } from './components/ProgressBar';
import { Navbar } from './components/Navbar';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AchievementsSection } from './components/AchievementsSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationCertifications } from './components/EducationCertifications';
import { ReferencesSection } from './components/ReferencesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { PhotoGuidanceModal } from './components/PhotoGuidanceModal';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // Default dark mode matching reference site
  });
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPhotoGuidanceOpen, setIsPhotoGuidanceOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (!loading && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [loading]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={`relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-colors duration-300`}>
      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom mix-blend-difference cursor */}
      <CustomCursor />

      {/* Top scroll progress indicator */}
      <ProgressBar />

      {/* Fixed Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenPhotoGuidance={() => setIsPhotoGuidanceOpen(true)}
      />

      {/* Interactive SLAM / RF wave canvas backdrop */}
      <BackgroundCanvas isDark={isDark} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <AboutSection />
        <AchievementsSection onOpenPhotoGuidance={() => setIsPhotoGuidanceOpen(true)} />
        <SkillsSection />
        <ProjectsSection onOpenPhotoGuidance={() => setIsPhotoGuidanceOpen(true)} />
        <PublicationsSection onOpenPhotoGuidance={() => setIsPhotoGuidanceOpen(true)} />
        <ExperienceTimeline />
        <EducationCertifications />
        <ReferencesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette (⌘K) Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenPhotoGuidance={() => setIsPhotoGuidanceOpen(true)}
      />

      {/* Photo guidance modal explaining every slot */}
      <PhotoGuidanceModal
        isOpen={isPhotoGuidanceOpen}
        onClose={() => setIsPhotoGuidanceOpen(false)}
      />
    </div>
  );
};

export default App;
