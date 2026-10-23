import React, { useRef } from 'react';

interface MarqueeTrackProps {
  children: React.ReactNode;
  speed?: number;       // seconds for one full pass (lower = faster)
  reverse?: boolean;    // slide right-to-left or left-to-right
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal marquee / ticker.
 * Duplicates children so the loop is seamless.
 */
export const MarqueeTrack: React.FC<MarqueeTrackProps> = ({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="overflow-hidden w-full"
      style={
        {
          '--marquee-duration': `${speed}s`,
          '--marquee-direction': reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      <div
        ref={trackRef}
        className={`marquee-track flex gap-6 w-max ${pauseOnHover ? 'group/marquee' : ''}`}
        style={{
          animation: `marquee var(--marquee-duration) linear infinite var(--marquee-direction)`,
        }}
      >
        {/* Original set */}
        <div className="flex gap-6 flex-shrink-0">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-6 flex-shrink-0" aria-hidden>
          {children}
        </div>
        {/* Third copy ensures no flash on very wide screens */}
        <div className="flex gap-6 flex-shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
