import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, CheckCircle, FileCode, X, Sparkles } from 'lucide-react';

interface PhotoGuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGuidanceModal: React.FC<PhotoGuidanceModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const photoSlots = [
    {
      slotName: 'Hero 3D Portrait',
      currentStatus: 'Active',
      location: 'public/profile.jpg',
      aspectRatio: '3:4 or 4:5 (e.g. 800x1066px)',
      description:
        'Currently displaying your profile photo downloaded from your existing website repository. To update it, replace public/profile.jpg with your latest high-resolution professional portrait.',
    },
    {
      slotName: 'AROHA Drone Club (ISDC & AeroTHON)',
      currentStatus: 'Placeholder Ready',
      location: 'Achievements & Leadership cards',
      aspectRatio: '16:9 or 4:3 landscape',
      description:
        'Recommended: Add a photo of the AROHA drone team, drone in flight, or competition trophy from ISDC 2026 / SAE AeroTHON 2025.',
    },
    {
      slotName: 'Indoor Mapping & VI-SLAM Hardware Setup',
      currentStatus: 'Placeholder Ready',
      location: 'Featured Project Card',
      aspectRatio: '16:9 landscape',
      description:
        'Recommended: Photo of the Raspberry Pi 5 mounted with the monocular camera, IMU, and ToF LiDAR sensor, or an RViz / 2D occupancy grid mapping screenshot.',
    },
    {
      slotName: 'Software-Defined Radio Lab Setup',
      currentStatus: 'Placeholder Ready',
      location: 'SDR Anti-Jamming Project Card',
      aspectRatio: '16:9 landscape',
      description:
        'Recommended: Photo of the Ettus USRP B210 transceiver with RF antennas or a screenshot of the GNU Radio Companion FFT / spectrum waterfall.',
    },
    {
      slotName: 'Certificates (AWS & VLSI SoC)',
      currentStatus: 'Active',
      location: 'public/aws-certificate.jpg & public/vlsi.png',
      aspectRatio: 'Landscape certificates',
      description:
        'Both your AWS Python and Maven Silicon VLSI SoC certificates have been downloaded and linked with interactive modal previews.',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[350] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8 text-[var(--color-text-primary)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0066ff]/20 text-[#0066ff]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-clash text-lg md:text-xl font-bold">
                Photo & Media Customization Guide
              </h3>
              <p className="font-mono text-xs text-[var(--color-text-tertiary)]">
                Overview of image placeholders and recommended additions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guidance Text */}
        <p className="font-sans text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
          As requested in your prompt, all photo slots have been cleanly prepared without fake or unverified imagery. Below is the exact inventory of media slots, current status, and where to drop your files:
        </p>

        {/* Slots List */}
        <div className="space-y-4">
          {photoSlots.map((slot, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/80 p-4 transition-colors hover:border-[#0066ff]/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-clash text-sm font-semibold text-[var(--color-text-primary)]">
                  {slot.slotName}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                    slot.currentStatus === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[#0066ff]/10 text-[#0066ff] border border-[#0066ff]/20'
                  }`}
                >
                  {slot.currentStatus}
                </span>
              </div>

              <p className="font-sans text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {slot.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--color-border)]/40 font-mono text-[11px] text-[var(--color-text-tertiary)]">
                <span>Location: <code className="text-[#0066ff]">{slot.location}</code></span>
                <span>Aspect: {slot.aspectRatio}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#0066ff] px-5 py-2 font-mono text-xs font-medium text-white shadow-lg shadow-[#0066ff]/25 hover:bg-[#0052cc]"
          >
            Got it, Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
