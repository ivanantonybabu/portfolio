import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Radio, Crosshair, Zap, Compass, ShieldCheck } from 'lucide-react';

export const DroneHeroVisual: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAirborne, setIsAirborne] = useState(true);
  const [altitude, setAltitude] = useState(14.6);
  const [heading, setHeading] = useState(42);
  const [speed, setSpeed] = useState(3.4);
  const [isLaunching, setIsLaunching] = useState(false);
  const [sonarPings, setSonarPings] = useState<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic telemetry drift
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setHeading((prev) => Math.floor(40 + Math.sin(Date.now() / 3000) * 8));
      setSpeed((prev) => +(3.2 + Math.cos(Date.now() / 2500) * 0.6).toFixed(1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Mouse interaction for Pitch / Roll tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePos({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Trigger Launch / Sonar Boost
  const handlePulseLaunch = () => {
    setIsLaunching(true);
    setAltitude((prev) => +(prev + 5.0).toFixed(1));
    setSonarPings((prev) => [...prev, Date.now()]);
    setTimeout(() => {
      setIsLaunching(false);
    }, 1200);
  };

  // Canvas background animation: LiDAR SLAM scanning point cloud + Propeller downwash
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let scanAngle = 0;

    // Generate static SLAM obstacle point cloud
    const points: { x: number; y: number; z: number; intensity: number }[] = [];
    for (let i = 0; i < 90; i++) {
      points.push({
        x: (Math.random() - 0.5) * 360,
        y: Math.random() * 180 + 100, // lower half
        z: Math.random() * 1.5 + 0.5,
        intensity: Math.random(),
      });
    }

    // Particles for rotor downwash
    const particles: { x: number; y: number; vy: number; vx: number; alpha: number }[] = [];

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 380);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 460);
      const cx = width / 2;
      const cy = height / 2 - 15;

      ctx.clearRect(0, 0, width, height);

      // 1. Perspective LiDAR Ground Grid
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridY = cy + 100;

      // Radial range rings
      for (let r = 50; r <= 180; r += 40) {
        ctx.beginPath();
        ctx.ellipse(cx, gridY, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs from center
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(cx, gridY);
        ctx.lineTo(cx + Math.cos(angle) * 190, gridY + Math.sin(angle) * 190 * 0.45);
        ctx.stroke();
      }
      ctx.restore();

      // 2. LiDAR Scanning Beam Sweep (Rotates 360 deg)
      scanAngle += 0.035;
      ctx.save();
      const sweepGradient = ctx.createRadialGradient(cx, gridY, 10, cx, gridY, 170);
      sweepGradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      sweepGradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.04)');
      sweepGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(cx, gridY);
      ctx.arc(cx, gridY, 170, scanAngle, scanAngle + 0.5);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();
      ctx.restore();

      // 3. SLAM Point Cloud returns
      ctx.save();
      points.forEach((p) => {
        const px = cx + p.x;
        const py = gridY + (p.y - 120) * 0.55;
        // Check if scan beam is near this point
        const dist = Math.hypot(p.x, (p.y - 120) * 0.55);
        const ptAngle = Math.atan2((p.y - 120) * 0.55, p.x);
        const angleDiff = Math.abs(((scanAngle - ptAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        const isHit = angleDiff < 0.4;

        ctx.fillStyle = isHit
          ? 'rgba(56, 189, 248, 0.9)'
          : `rgba(56, 189, 248, ${0.15 + p.intensity * 0.2})`;
        ctx.beginPath();
        ctx.arc(px, py, isHit ? 2.2 : 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (isHit) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      ctx.restore();

      // 4. Rotor downwash particles
      if (Math.random() < 0.6) {
        // 4 rotor hubs relative positions
        const hubs = [
          { x: cx - 65, y: cy - 45 },
          { x: cx + 65, y: cy - 45 },
          { x: cx - 65, y: cy + 45 },
          { x: cx + 65, y: cy + 45 },
        ];
        hubs.forEach((hub) => {
          particles.push({
            x: hub.x + (Math.random() - 0.5) * 20,
            y: hub.y + (Math.random() - 0.5) * 8,
            vy: Math.random() * 3 + 2,
            vx: (Math.random() - 0.5) * 1.5,
            alpha: 0.6,
          });
        });
      }

      ctx.save();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.x += p.vx;
        p.alpha -= 0.025;

        if (p.alpha <= 0 || p.y > height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.4})`;
        ctx.fillRect(p.x, p.y, 1.5, 3.5);
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  // Compute 3D drone tilt angles from mouse
  const rollDeg = mousePos.x * 16;
  const pitchDeg = -mousePos.y * 14;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-[430px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:border-[#38bdf8]/40 overflow-hidden select-none"
    >
      {/* Background canvas for LiDAR sweeps & particle downwash */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      />

      {/* Radial backlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.22), transparent 65%)',
        }}
      />

      {/* ── TOP HUD HEADER BAR ── */}
      <div className="relative z-20 flex items-center justify-between border-b border-[var(--color-border)]/70 pb-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38bdf8] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38bdf8]" />
          </span>
          <span className="font-semibold tracking-wider text-[#e6edf3]">AROHA-UAV // SLAM-01</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-2 py-0.5 text-[10px] text-[#38bdf8] uppercase tracking-wider">
            {isLaunching ? 'ALT-BURST' : 'AUTONOMOUS'}
          </span>
        </div>
      </div>

      {/* ── DRONE 3D FLIGHT STAGE ── */}
      <div className="relative z-10 flex h-[270px] sm:h-[290px] w-full items-center justify-center">
        {/* Pitch ladder / Artificial horizon reticle */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <div className="relative h-44 w-44 rounded-full border border-dashed border-[#38bdf8]/60">
            {/* Center crosshair */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#38bdf8]/40" />
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#38bdf8]/40" />
            {/* Degree ticks */}
            <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#38bdf8]">000°</span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#38bdf8]">090°</span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#38bdf8]">180°</span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#38bdf8]">270°</span>
          </div>
        </div>

        {/* Floating Quadcopter Drone Vector Assembly */}
        <motion.div
          animate={{
            y: isLaunching ? -35 : [0, -9, 0],
            rotateZ: rollDeg,
            rotateX: pitchDeg,
            scale: isLaunching ? 1.08 : 1,
          }}
          transition={{
            y: isLaunching
              ? { duration: 0.6, ease: 'easeOut' }
              : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
            rotateZ: { type: 'spring', stiffness: 120, damping: 14 },
            rotateX: { type: 'spring', stiffness: 120, damping: 14 },
            scale: { duration: 0.4 },
          }}
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        >
          {/* DRONE SVG AIRFRAME */}
          <svg
            className="h-56 w-56 sm:h-64 sm:w-64 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Downward LiDAR Scan Cone (emitted from gimbal camera) */}
            <polygon
              points="120,120 70,220 170,220"
              fill="url(#lidarBeamGrad)"
              opacity={isAirborne ? 0.35 : 0.1}
            />

            {/* DEFINITIONS */}
            <defs>
              <linearGradient id="lidarBeamGrad" x1="120" y1="120" x2="120" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a323d" />
                <stop offset="100%" stopColor="#14181f" />
              </linearGradient>

              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </radialGradient>
            </defs>

            {/* 4 Carbon Fiber Structural Arms (X-Configuration) */}
            {/* Front-Left Arm */}
            <line x1="120" y1="120" x2="55" y2="55" stroke="url(#armGrad)" strokeWidth="10" strokeLinecap="round" />
            <line x1="120" y1="120" x2="55" y2="55" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Front-Right Arm */}
            <line x1="120" y1="120" x2="185" y2="55" stroke="url(#armGrad)" strokeWidth="10" strokeLinecap="round" />
            <line x1="120" y1="120" x2="185" y2="55" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Rear-Left Arm */}
            <line x1="120" y1="120" x2="55" y2="185" stroke="url(#armGrad)" strokeWidth="10" strokeLinecap="round" />
            <line x1="120" y1="120" x2="55" y2="185" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Rear-Right Arm */}
            <line x1="120" y1="120" x2="185" y2="185" stroke="url(#armGrad)" strokeWidth="10" strokeLinecap="round" />
            <line x1="120" y1="120" x2="185" y2="185" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Central Fuselage Chassis */}
            <polygon
              points="120,80 152,98 152,142 120,160 88,142 88,98"
              fill="#161b22"
              stroke="#30363d"
              strokeWidth="2.5"
            />
            {/* Inner Avionics Bay Plate */}
            <polygon
              points="120,92 142,104 142,136 120,148 98,136 98,104"
              fill="#0d1117"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />

            {/* Front Heading Arrow / Orientation Chevron */}
            <polygon points="120,84 126,94 114,94" fill="#38bdf8" />

            {/* Central Status Core / IMU Heartbeat LED */}
            <circle cx="120" cy="120" r="10" fill="#1c2128" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="5" fill="#38bdf8" className="animate-pulse" />

            {/* ── MOTOR HUBS & HIGH-SPEED PROPELLERS ── */}

            {/* Front-Left Motor (55, 55) */}
            <g transform="translate(55, 55)">
              <circle cx="0" cy="0" r="14" fill="#161b22" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Green Nav LED (Front Left) */}
              <circle cx="0" cy="0" r="3.5" fill="#10b981" />
              {/* Spinning Propeller Blur Disc */}
              <circle cx="0" cy="0" r="28" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <g className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: isLaunching ? '0.2s' : '0.45s' }}>
                <ellipse cx="0" cy="0" rx="27" ry="4" fill="rgba(56, 189, 248, 0.35)" />
                <ellipse cx="0" cy="0" rx="4" ry="27" fill="rgba(56, 189, 248, 0.35)" />
              </g>
            </g>

            {/* Front-Right Motor (185, 55) */}
            <g transform="translate(185, 55)">
              <circle cx="0" cy="0" r="14" fill="#161b22" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Green Nav LED (Front Right) */}
              <circle cx="0" cy="0" r="3.5" fill="#10b981" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <g className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: isLaunching ? '0.18s' : '0.4s' }}>
                <ellipse cx="0" cy="0" rx="27" ry="4" fill="rgba(56, 189, 248, 0.35)" />
                <ellipse cx="0" cy="0" rx="4" ry="27" fill="rgba(56, 189, 248, 0.35)" />
              </g>
            </g>

            {/* Rear-Left Motor (55, 185) */}
            <g transform="translate(55, 185)">
              <circle cx="0" cy="0" r="14" fill="#161b22" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Red Nav LED (Rear Left) */}
              <circle cx="0" cy="0" r="3.5" fill="#ef4444" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <g className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: isLaunching ? '0.19s' : '0.42s' }}>
                <ellipse cx="0" cy="0" rx="27" ry="4" fill="rgba(56, 189, 248, 0.35)" />
                <ellipse cx="0" cy="0" rx="4" ry="27" fill="rgba(56, 189, 248, 0.35)" />
              </g>
            </g>

            {/* Rear-Right Motor (185, 185) */}
            <g transform="translate(185, 185)">
              <circle cx="0" cy="0" r="14" fill="#161b22" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Red Nav LED (Rear Right) */}
              <circle cx="0" cy="0" r="3.5" fill="#ef4444" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <g className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: isLaunching ? '0.2s' : '0.44s' }}>
                <ellipse cx="0" cy="0" rx="27" ry="4" fill="rgba(56, 189, 248, 0.35)" />
                <ellipse cx="0" cy="0" rx="4" ry="27" fill="rgba(56, 189, 248, 0.35)" />
              </g>
            </g>
          </svg>
        </motion.div>

        {/* Real-time Target Reticle box following mouse cursor */}
        <div
          className="pointer-events-none absolute h-12 w-12 rounded border border-[#38bdf8]/50 transition-all duration-100 ease-out"
          style={{
            transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 40}px)`,
          }}
        >
          <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-[#38bdf8]" />
          <div className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-[#38bdf8]" />
          <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-[#38bdf8]" />
          <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-[#38bdf8]" />
          <span className="absolute -top-4 left-0 font-mono text-[8px] text-[#38bdf8]">
            TRACK_TGT
          </span>
        </div>
      </div>

      {/* ── LIVE TELEMETRY GAUGES GRID ── */}
      <div className="relative z-20 grid grid-cols-3 gap-2 border-t border-[var(--color-border)]/70 pt-3 font-mono text-[10px]">
        {/* Alt & Speed */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/80 p-2">
          <span className="text-[#8b949e] uppercase block text-[9px]">Altitude</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-[#e6edf3] font-clash">{altitude}</span>
            <span className="text-[#38bdf8]">m</span>
          </div>
        </div>

        {/* Pitch & Roll */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/80 p-2">
          <span className="text-[#8b949e] uppercase block text-[9px]">Roll / Pitch</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xs font-semibold text-[#38bdf8]">
              {rollDeg > 0 ? `+${rollDeg.toFixed(0)}` : rollDeg.toFixed(0)}°
            </span>
            <span className="text-[#8b949e]">/</span>
            <span className="text-xs font-semibold text-[#e6edf3]">
              {pitchDeg > 0 ? `+${pitchDeg.toFixed(0)}` : pitchDeg.toFixed(0)}°
            </span>
          </div>
        </div>

        {/* Battery & Health */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/80 p-2">
          <span className="text-[#8b949e] uppercase block text-[9px]">Battery [6S]</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-emerald-400 font-clash">96%</span>
            <span className="text-[#8b949e]">22.8V</span>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE LAUNCH / SONAR BUTTON ── */}
      <div className="relative z-20 mt-3 flex items-center justify-between gap-3">
        <button
          onClick={handlePulseLaunch}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#38bdf8] py-2.5 px-3 font-mono text-xs font-semibold text-[#0d1117] shadow-lg shadow-[#38bdf8]/20 transition-all hover:bg-[#7dd3fc] active:scale-[0.98]"
        >
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>{isLaunching ? 'ALT-BOOST ACTIVE...' : 'LAUNCH THRUST / SCAN'}</span>
        </button>

        <div className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-3 py-2 font-mono text-[10px] text-[#8b949e]">
          <Crosshair className="h-3 w-3 text-[#38bdf8]" />
          <span>Move Mouse to Steer</span>
        </div>
      </div>

      {/* Corner Bracket Accents */}
      <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-[#38bdf8]/40" />
      <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-[#38bdf8]/40" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#38bdf8]/40" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#38bdf8]/40" />
    </div>
  );
};
