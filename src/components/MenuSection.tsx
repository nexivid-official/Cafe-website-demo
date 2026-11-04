import React, { useState } from 'react';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DrinkItem } from '../types';
import { SIGNATURE_DRINKS } from '../data/drinks';

interface MenuSectionProps {
  onSelectDrink: (drink: DrinkItem) => void;
  onAddToTray: (drink: DrinkItem) => void;
  trayItemIds: string[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDrink,
  onAddToTray,
  trayItemIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDrinks = SIGNATURE_DRINKS.filter((drink) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'hot') return drink.category.toLowerCase().includes('steam') || drink.category.toLowerCase().includes('warm');
    if (activeCategory === 'cold') return drink.category.toLowerCase().includes('iced') || drink.category.toLowerCase().includes('cold');
    return true;
  });

  return (
    <section id="menu" className="relative py-28 sm:py-36 bg-[#0e0a08] border-t border-white/5 overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d4a359]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Section Header with Scroll-Reveal Motion */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4a359] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#d4a359]"></span>
            <span>Atelier Collection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f4ece3] font-normal tracking-tight leading-tight mb-6">
            SIGNATURE DRINKS
          </h2>

          <p className="text-base sm:text-lg text-[#b8aba0] font-light leading-relaxed">
            Four bespoke creations crafted from micro-lot single origins, precision roasted and balanced with intentional texture.
          </p>
        </motion.div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-2 mb-12 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 min-h-[44px] text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-xs cursor-pointer whitespace-nowrap flex items-center justify-center ${
              activeCategory === 'all'
                ? 'text-[#0c0806] bg-[#d4a359] font-semibold shadow-sm'
                : 'text-[#c8beb3] hover:text-white hover:bg-white/5'
            }`}
          >
            All Signature (4)
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('cold')}
            className={`px-4 py-2.5 min-h-[44px] text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-xs cursor-pointer whitespace-nowrap flex items-center justify-center ${
              activeCategory === 'cold'
                ? 'text-[#0c0806] bg-[#d4a359] font-semibold shadow-sm'
                : 'text-[#c8beb3] hover:text-white hover:bg-white/5'
            }`}
          >
            Cold & Iced (3)
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('hot')}
            className={`px-4 py-2.5 min-h-[44px] text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-xs cursor-pointer whitespace-nowrap flex items-center justify-center ${
              activeCategory === 'hot'
                ? 'text-[#0c0806] bg-[#d4a359] font-semibold shadow-sm'
                : 'text-[#c8beb3] hover:text-white hover:bg-white/5'
            }`}
          >
            Artisanal Steamed (1)
          </motion.button>
        </div>

        {/* Drink Product Cards Grid with Staggered Entrance Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDrinks.map((drink, index) => {
              const isInTray = trayItemIds.includes(drink.id);

              return (
                <motion.div
                  key={drink.id}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6 }}
                  onClick={() => onSelectDrink(drink)}
                  className="group relative flex flex-col justify-between bg-[#150f0c] border border-white/5 rounded-xs overflow-hidden transition-all duration-300 hover:border-[#d4a359]/40 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
                >
                  {/* Product Imagery */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#0a0705]">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150f0c] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    
                    {/* Quick View Button on Image */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white/90 hover:text-white hover:bg-black/90 flex items-center justify-center shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#d4a359] mb-2 font-medium">
                        <span>{drink.category}</span>
                        <span className="text-[#ede2d8] font-serif text-sm font-semibold tabular-nums">
                          {drink.price}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-[#f4ece3] font-normal tracking-tight group-hover:text-[#d4a359] transition-colors mb-2.5">
                        {drink.name}
                      </h3>

                      <p className="text-xs text-[#a8998d] font-light leading-relaxed mb-4 line-clamp-3">
                        {drink.description}
                      </p>

                      {/* Tasting Notes inline */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {drink.notes.slice(0, 2).map((note) => (
                          <span
                            key={note}
                            className="text-[10px] text-[#c8beb3] bg-white/5 border border-white/5 px-2 py-0.5 rounded-xs tracking-wider"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom Action */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
                        Tasting Profile →
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToTray(drink);
                        }}
                        className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xs transition-all cursor-pointer ${
                          isInTray
                            ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/5 text-[#d4a359] hover:bg-[#d4a359] hover:text-[#0c0806]'
                        }`}
                        title={isInTray ? 'In Tasting Flight' : 'Add to Tasting Flight'}
                      >
                        {isInTray ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
