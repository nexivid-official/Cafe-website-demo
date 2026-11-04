import React from 'react';
import { X, Check, Droplets, Flame, Thermometer, Sparkles, Plus } from 'lucide-react';
import { DrinkItem } from '../types';

interface DrinkDetailModalProps {
  drink: DrinkItem | null;
  onClose: () => void;
  onAddToTray: (drink: DrinkItem) => void;
  isInTray: boolean;
}

export const DrinkDetailModal: React.FC<DrinkDetailModalProps> = ({
  drink,
  onClose,
  onAddToTray,
  isInTray,
}) => {
  if (!drink) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#140e0b] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (>= 44px hitbox) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-white/70 hover:text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Visual */}
        <div className="relative w-full md:w-1/2 aspect-4/3 md:aspect-auto min-h-[260px] md:min-h-[420px] bg-[#0c0806]">
          <img
            src={drink.image}
            alt={drink.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-transparent to-transparent md:hidden" />
        </div>

        {/* Right: Tasting & Origin Profile */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4a359] mb-2 font-medium">
              <span>{drink.category}</span>
              <span className="text-white/20">·</span>
              <span>{drink.servingTemp}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#f4ece3] font-normal tracking-tight mb-2">
              {drink.name}
            </h3>

            <p className="text-xl font-serif text-[#d4a359] tabular-nums mb-4">
              {drink.price}
            </p>

            <p className="text-sm text-[#c8beb3] font-light leading-relaxed mb-6">
              {drink.description}
            </p>

            {/* Tasting Notes */}
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 block mb-2 font-medium">
                Sensory Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {drink.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs text-[#ede2d8] bg-white/5 border border-white/10 px-3 py-1 rounded-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#a8998d]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>Bean Terroir</span>
                </span>
                <span className="text-[#f4ece3] font-medium">{drink.origin}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>Roast Profile</span>
                </span>
                <span className="text-[#f4ece3] font-medium">{drink.roast}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Thermometer className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>Extraction Intensity</span>
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-2.5 h-2.5 rounded-full ${
                        level <= drink.intensity ? 'bg-[#d4a359]' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => onAddToTray(drink)}
              className={`w-full py-3.5 min-h-[48px] px-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                isInTray
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60'
                  : 'bg-[#d4a359] text-[#0c0806] hover:bg-[#e4b771]'
              }`}
            >
              {isInTray ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Tasting Flight</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Tasting Flight</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
