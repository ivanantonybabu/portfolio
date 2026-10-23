import React, { useEffect, useState } from 'react';

export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[101] h-[2px] w-full pointer-events-none">
      <div
        className="h-full origin-left bg-[#38bdf8] transition-transform duration-75 ease-out shadow-[0_0_10px_#38bdf8]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};
