import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Scale } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="relative py-28 sm:py-36 bg-[#0c0806] text-[#ede2d8] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#d4a359]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4a359] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#d4a359]"></span>
            <span>The Science of Flavour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f4ece3] font-normal tracking-tight leading-tight mb-6">
            CRAFTED WITH PRECISION.
          </h2>
          <p className="text-base sm:text-lg text-[#b8aba0] font-light leading-relaxed">
            Every cup represents an uncompromising devotion to origin terroir, roasted in small batches and extracted under scientific equilibrium.
          </p>
        </motion.div>

        {/* 3 Editorial Craftsmanship Pillars with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-20 sm:mb-24">
          {[
            {
              num: '01. Single-Origin Sourcing',
              title: 'High-Altitude Volcanic Terroir',
              desc: 'Directly harvested from micro-lots located above 1,900 meters in Huila, Colombia and Yirgacheffe, Ethiopia where dense cherries mature slowly.',
              tag: '100% Direct-Trade Verified',
            },
            {
              num: '02. Intelligent Roasting',
              title: 'Convection Thermal Profiling',
              desc: 'Custom roasting curves tailored to each harvest lot to preserve delicate floral esters and aromatic lipid oils without astringent bitterness.',
              tag: 'Small-Batch 12kg Cast-Iron Drums',
            },
            {
              num: '03. Extraction Mastery',
              title: '9-Bar Saturated Stability',
              desc: 'Brewed with multi-boiler PID temperature control at 93.5°C and mineral-remineralized water at 140 TDS for silky lipid emulsification.',
              tag: 'Pre-Infusion Pressure Ramping',
            },
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between border-t border-white/10 pt-8 group transition-colors hover:border-[#d4a359]/50"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#d4a359] font-medium mb-4 block">
                  {pillar.num}
                </span>
                <h3 className="text-2xl font-serif text-[#f4ece3] font-normal mb-3 group-hover:text-[#d4a359] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#a8998d] font-light leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>
              <div className="text-xs text-[#d4a359]/90 tracking-wider">
                {pillar.tag}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Claim-to-Proof Adjacency Strip with Animated Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 bg-[#120c09] p-6 sm:p-12 rounded-xs shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-6"
            >
              <span className="text-3xl sm:text-4xl font-serif text-[#d4a359] tabular-nums block mb-1">
                92+
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-[#ede2d8] font-medium block mb-1">
                Q-Grader Cup Score
              </span>
              <span className="text-[11px] text-[#a8998d] font-light">
                Top 1% of global specialty lots
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="border-b sm:border-b-0 md:border-r border-white/10 pb-4 sm:pb-0 sm:pr-6"
            >
              <span className="text-3xl sm:text-4xl font-serif text-[#d4a359] tabular-nums block mb-1">
                18h
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-[#ede2d8] font-medium block mb-1">
                Slow Cold Extraction
              </span>
              <span className="text-[11px] text-[#a8998d] font-light">
                Zero thermal degradation
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="sm:border-r border-white/10 sm:pr-6"
            >
              <span className="text-3xl sm:text-4xl font-serif text-[#d4a359] tabular-nums block mb-1">
                100%
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-[#ede2d8] font-medium block mb-1">
                Direct Farm Partnered
              </span>
              <span className="text-[11px] text-[#a8998d] font-light">
                Paid 2.4x above fair-trade floor
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-3xl sm:text-4xl font-serif text-[#d4a359] tabular-nums block mb-1">
                9.0 Bar
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-[#ede2d8] font-medium block mb-1">
                Saturated Pressure
              </span>
              <span className="text-[11px] text-[#a8998d] font-light">
                Velvety micro-crema density
              </span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
