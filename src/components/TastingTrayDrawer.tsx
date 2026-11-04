import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { DrinkItem } from '../types';

interface TastingTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: DrinkItem[];
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export const TastingTrayDrawer: React.FC<TastingTrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearTray,
}) => {
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const calculateTotal = () => {
    return items
      .reduce((sum, item) => {
        const val = parseFloat(item.price.replace('$', '')) || 0;
        return sum + val;
      }, 0)
      .toFixed(2);
  };

  const handleCompleteOrder = () => {
    setOrderSubmitted(true);
  };

  const handleReset = () => {
    setOrderSubmitted(false);
    onClearTray();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#130d0a] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4a359] font-medium">
                Tasting Flight
              </span>
              <span className="text-xs text-white/40">({items.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-white/60 hover:text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderSubmitted ? (
            <div className="py-16 text-center animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-900/40 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-[#f4ece3] font-normal mb-2">
                Flight Prepared for Service
              </h3>
              <p className="text-xs text-[#b8aba0] max-w-xs mx-auto mb-8 leading-relaxed">
                Your bespoke coffee tasting flight has been transmitted to our head barista. Your flight board will be arranged shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#d4a359] text-[#0c0806] font-semibold rounded-sm hover:bg-[#e4b771] transition-all cursor-pointer"
              >
                Start New Flight
              </button>
            </div>
          ) : (
            <div className="py-6 overflow-y-auto max-h-[60vh] space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 text-[#a8998d]">
                  <p className="text-sm font-light mb-2">Your tasting tray is empty.</p>
                  <p className="text-xs text-white/40">
                    Explore our signature creations and add drinks to curate your personalized flight.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xs group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xs object-cover bg-black/40"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif text-[#f4ece3] truncate font-normal">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#d4a359] tabular-nums font-medium">
                        {item.price}
                      </p>
                      <p className="text-[10px] text-white/40 truncate">{item.origin}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-white/40 hover:text-rose-400 transition-colors cursor-pointer active:scale-95"
                      title="Remove from flight"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!orderSubmitted && items.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#a8998d] uppercase tracking-wider text-xs">Total Flight</span>
              <span className="text-xl font-serif text-[#d4a359] tabular-nums font-semibold">
                ${calculateTotal()}
              </span>
            </div>

            <button
              onClick={handleCompleteOrder}
              className="w-full py-3.5 min-h-[48px] px-4 text-xs tracking-[0.2em] uppercase font-semibold bg-[#d4a359] text-[#0c0806] hover:bg-[#e4b771] active:scale-[0.98] transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Order Tasting Flight</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClearTray}
              className="w-full text-center text-[11px] uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            >
              Clear All Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
