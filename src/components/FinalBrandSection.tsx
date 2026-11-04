import React from 'react';
import { ArrowRight, Coffee, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalBrandSectionProps {
  onOpenVisitModal: () => void;
  onExploreMenu: () => void;
}

export const FinalBrandSection: React.FC<FinalBrandSectionProps> = ({
  onOpenVisitModal,
  onExploreMenu,
}) => {
  return (
    <section id="about" className="relative py-32 sm:py-44 bg-[#0a0705] text-[#ede2d8] border-t border-white/5 overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a359]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        
        {/* Animated Monogram emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 15 }}
          className="w-12 h-12 border border-[#d4a359]/30 rounded-full flex items-center justify-center mx-auto mb-8 text-[#d4a359] shadow-inner cursor-default"
        >
          <Coffee className="w-5 h-5 stroke-[1.5]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.3em] text-[#d4a359] font-medium mb-4"
        >
          The Atelier Philosophy
        </motion.p>

        {/* Mandatory exact headline with subtle upward entrance */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#f7efe6] font-normal tracking-tight leading-[1.08] mb-8 max-w-3xl mx-auto"
        >
          GOOD COFFEE. GREAT MOMENTS.
        </motion.h2>

        {/* Mandatory exact supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-[#c8beb3] font-light max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Discover a collection of carefully crafted coffee experiences, made to turn everyday moments into something special.
        </motion.p>

        {/* Interactive CTA buttons with micro-interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenVisitModal}
            className="w-full sm:w-auto px-9 py-4 text-xs tracking-[0.22em] uppercase font-semibold text-[#0c0806] bg-[#d4a359] hover:bg-[#e4b771] transition-all rounded-sm shadow-xl shadow-black/60 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>VISIT US</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[#ede2d8] border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all rounded-sm flex items-center justify-center cursor-pointer"
          >
            Explore Menu
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
