import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Radio, Shield, GraduationCap, Award } from 'lucide-react';
import { PERSONAL_INFO, RELEVANT_COURSEWORK } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-[#0066ff]" />,
      title: "Robotics & Visual SLAM",
      desc: "Specialized in real-time visual-inertial state estimation, sensor fusion, and 2D/3D occupancy mapping on low-power edge SBCs."
    },
    {
      icon: <Radio className="w-5 h-5 text-[#0066ff]" />,
      title: "Software-Defined Radio",
      desc: "Architecting signal processing flowgraphs in GNU Radio, anti-jamming filters, and over-the-air acoustic & RF transceivers."
    },
    {
      icon: <Shield className="w-5 h-5 text-[#0066ff]" />,
      title: "Autonomous UAV Avionics",
      desc: "Directing drone systems engineering at AROHA Drone Club; achieved World Rank 15 at ISDC and AIR 9 at SAE AeroTHON."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#0066ff]" />,
      title: "Dual-Degree Academic Rigor",
      desc: "B.Tech in Electronics & Communication (CUSAT, 8.58 CGPA) alongside B.Sc in Data Science & Applications (IIT Madras, 8.33 CGPA)."
    }
  ];

  return (
    <section id="about" className="relative py-20 px-4 md:px-8 lg:px-12 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0066ff]">
            01 // About Me
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {/* Editorial Statement */}
        <div className="mb-14">
          <h2 className="font-clash text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug tracking-tight text-[var(--color-text-primary)] max-w-5xl">
            I <span className="font-semibold text-[#0066ff]">design</span>,{' '}
            <span className="font-semibold text-[#0066ff]">build</span>, and{' '}
            <span className="font-semibold text-[#0066ff]">deploy</span> intelligent systems that bridge low-level embedded hardware and high-level autonomous intelligence.{' '}
            From <span className="text-[var(--color-text-primary)] font-medium">Visual-Inertial SLAM</span> on Raspberry Pi 5 to{' '}
            <span className="text-[var(--color-text-primary)] font-medium">anti-jamming wireless modems</span> in GNU Radio — I turn theoretical mathematics into resilient machines that thrive in the physical world.
          </h2>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-300 hover:border-[#0066ff]/40 hover:bg-[var(--color-bg-surface)]"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-[#0066ff]/10 text-[#0066ff] group-hover:scale-110 transition-transform">
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

        {/* Relevant Coursework Matrix */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border)]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0066ff]">
                Curriculum & Foundation
              </span>
              <h3 className="font-clash text-lg font-semibold text-[var(--color-text-primary)] mt-1">
                Relevant Engineering Coursework
              </h3>
            </div>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
              CUSAT & IIT Madras
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {RELEVANT_COURSEWORK.map((course, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[#0066ff] hover:text-[#0066ff] hover:bg-[#0066ff]/5"
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
