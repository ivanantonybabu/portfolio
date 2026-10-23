import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Radio, Shield, GraduationCap, Sparkles, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, RELEVANT_COURSEWORK } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-[#38bdf8]" />,
      title: "Robotics & Visual SLAM",
      desc: "Specialized in real-time visual-inertial state estimation, sensor fusion, and 2D/3D occupancy mapping on low-power edge SBCs."
    },
    {
      icon: <Radio className="w-5 h-5 text-[#38bdf8]" />,
      title: "Software-Defined Radio",
      desc: "Architecting signal processing flowgraphs in GNU Radio, anti-jamming filters, and over-the-air acoustic & RF transceivers."
    },
    {
      icon: <Shield className="w-5 h-5 text-[#38bdf8]" />,
      title: "Autonomous UAV Avionics",
      desc: "Directing drone systems engineering at AROHA Drone Club; achieved World Rank 15 at ISDC and AIR 9 at SAE AeroTHON."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#38bdf8]" />,
      title: "Dual-Degree Academic Rigor",
      desc: "B.Tech in Electronics & Communication (CUSAT, 8.58 CGPA) alongside B.Sc in Data Science & Applications (IIT Madras, 8.33 CGPA)."
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#38bdf8]">
            01 // About Me
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {/* ── 2-COLUMN HERO EDITORIAL & PORTRAIT SHOWCASE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start mb-20">
          
          {/* Left Column: Ivan's 3D Interactive Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 mx-auto w-full max-w-[360px] lg:max-w-none"
          >
            <div
              className="relative"
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Backlight Glow */}
              <div
                className="absolute inset-[-10%] -z-10 opacity-50 blur-2xl transition-all duration-700 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(56, 189, 248, 0.35), rgba(0, 200, 255, 0.15), rgba(56, 189, 248, 0.35))',
                  borderRadius: '35%',
                }}
              />

              {/* 3D Tilted Card Container */}
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2.5 shadow-2xl transition-transform duration-150 ease-out hover:border-[#38bdf8]/50"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#141414]">
                  <img
                    src={PERSONAL_INFO.profilePhoto}
                    alt={PERSONAL_INFO.name}
                    className="h-full w-full object-cover object-center filter contrast-105 brightness-95 transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_70%,rgba(56,189,248,0.18),transparent_65%)]" />

                  {/* Badge on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-[#0d1117]/85 p-3 backdrop-blur-md">
                    <div>
                      <div className="font-clash text-sm font-semibold text-white">
                        {PERSONAL_INFO.name}
                      </div>
                      <div className="font-mono text-[11px] text-[#38bdf8] flex items-center gap-1.5 mt-0.5">
                        <Award className="h-3 w-3" />
                        <span>IIT Tirupati STAR-PNT Fellow</span>
                      </div>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#38bdf8]/20 text-[#38bdf8]">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Corner Tech Bracket Accent */}
                <div className="absolute top-4 right-4 h-6 w-6 pointer-events-none opacity-50">
                  <div className="absolute top-0 right-0 h-full w-px bg-[#38bdf8]" />
                  <div className="absolute top-0 right-0 h-px w-full bg-[#38bdf8]" />
                </div>
              </motion.div>
            </div>

            {/* Quick Specs Underneath Card */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                <span className="text-[#8b949e]">Education</span>
                <span className="text-[#e6edf3] font-medium text-right">B.Tech (CUSAT) + B.Sc (IITM)</span>
              </div>
              <div className="h-px bg-[var(--color-border)]/60" />
              <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                <span className="text-[#8b949e]">UAV Ranks</span>
                <span className="text-[#38bdf8] font-medium">World #15 (ISDC) • AIR 9</span>
              </div>
              <div className="h-px bg-[var(--color-border)]/60" />
              <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                <span className="text-[#8b949e]">Location</span>
                <span className="text-[#e6edf3] flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#38bdf8]" /> Kochi, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="font-clash text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-snug tracking-tight text-[var(--color-text-primary)] mb-6">
                I <span className="font-semibold text-[#38bdf8]">design</span>,{' '}
                <span className="font-semibold text-[#38bdf8]">build</span>, and{' '}
                <span className="font-semibold text-[#38bdf8]">deploy</span> intelligent systems that bridge low-level physical silicon with high-level autonomous intelligence.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  My engineering journey is driven by one core pursuit: making physical machines perceive, navigate, and communicate reliably in uncooperative real-world environments.
                </p>
                <p>
                  As a <span className="text-[#e6edf3] font-medium">STAR-PNT Fellow</span> at the <span className="text-[#38bdf8]">IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)</span>, I engineered an edge-computing multi-sensor fusion framework combining monocular camera odometry, 6-DoF inertial units, and Time-of-Flight (ToF) LiDAR on a single Raspberry Pi 5. The resulting system slashes trajectory drift by over 40% inside GPS-denied facilities — research presented at <span className="text-[#e6edf3] font-medium">ICTEST 2026</span>.
                </p>
                <p>
                  Simultaneously, leading drone avionics at <span className="text-[#e6edf3] font-medium">AROHA Drone Club</span> allowed me to direct flight controller architectures, autonomous payload deployment, and failsafe telemetry for competitive UAVs — earning <span className="text-[#38bdf8]">World Rank 15 at ISDC</span> and <span className="text-[#38bdf8]">AIR 9 at SAE AeroTHON</span>.
                </p>
              </div>

              {/* Core Strengths Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  'Visual-Inertial SLAM',
                  'Autonomous UAV Avionics',
                  'GNU Radio / SDR',
                  'Raspberry Pi 5 Edge AI',
                  'Verilog HDL & SoC',
                  'ROS & Gazebo Simulation',
                ].map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1 font-mono text-xs text-[#8b949e] hover:border-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[#38bdf8]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Quote / Philosophy Footer */}
            <div className="mt-8 rounded-2xl border-l-2 border-[#38bdf8] bg-[var(--color-bg-elevated)]/60 p-4 font-mono text-xs text-[var(--color-text-secondary)]">
              <span className="text-[#38bdf8] block mb-1 uppercase tracking-wider text-[10px]">
                Engineering Philosophy
              </span>
              "Software must understand the physical constraints of silicon, RF noise, and inertia; hardware is only as good as the state estimation algorithms that steer it."
            </div>
          </motion.div>
        </div>

        {/* ── HIGHLIGHT GRID (4 CARDS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-300 hover:border-[#38bdf8]/40 hover:bg-[var(--color-bg-surface)]"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-clash text-base font-semibold text-[var(--color-text-primary)] mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── RELEVANT COURSEWORK MATRIX ── */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border)]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
                Curriculum &amp; Foundation
              </span>
              <h3 className="font-clash text-lg font-semibold text-[var(--color-text-primary)] mt-1">
                Relevant Engineering Coursework
              </h3>
            </div>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
              CUSAT &amp; IIT Madras
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {RELEVANT_COURSEWORK.map((course, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:bg-[#38bdf8]/5"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
