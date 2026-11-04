import React, { useState, useEffect } from 'react';
import { Menu, X, CupSoda } from 'lucide-react';

interface NavbarProps {
  onOpenVisitModal: () => void;
  onOpenTray: () => void;
  trayCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVisitModal,
  onOpenTray,
  trayCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0806]/95 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3.5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-base sm:text-xl font-serif tracking-[0.2em] sm:tracking-[0.25em] text-[#f4ece3] hover:text-[#d4a359] transition-colors whitespace-nowrap shrink-0 font-medium uppercase"
          >
            Atelier Coffee
          </a>

          {/* Zone 2: 4 single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium text-[#c8beb3]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('craftsmanship')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Our Coffee
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              About Us
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {trayCount > 0 && (
              <button
                onClick={onOpenTray}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[44px] text-xs tracking-wider uppercase text-[#d4a359] bg-[#d4a359]/10 border border-[#d4a359]/30 rounded-xs hover:bg-[#d4a359]/20 transition-all active:scale-95"
                title="View Tasting Flight"
              >
                <CupSoda className="w-4 h-4" />
                <span className="text-[11px] font-semibold">{trayCount}</span>
              </button>
            )}

            <button
              onClick={onOpenVisitModal}
              className="px-3.5 sm:px-5 py-2 min-h-[44px] text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold text-[#0c0806] bg-[#d4a359] hover:bg-[#e4b771] active:scale-[0.98] transition-all rounded-xs whitespace-nowrap shrink-0 flex items-center justify-center shadow-sm"
            >
              Visit Us
            </button>

            {/* Mobile Hamburger (>= 44px hitbox) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#ede2d8] hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0806]/95 backdrop-blur-xl pt-24 px-8 pb-12 flex flex-col justify-between md:hidden animate-fadeIn">
          <div className="flex flex-col gap-6 text-sm tracking-[0.25em] uppercase font-medium">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left py-3 border-b border-white/5 text-[#d4a359]"
            >
              01. Home
            </button>
            <button
              onClick={() => scrollToSection('craftsmanship')}
              className="text-left py-3 border-b border-white/5 text-[#ede2d8] hover:text-white"
            >
              02. Our Coffee
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-left py-3 border-b border-white/5 text-[#ede2d8] hover:text-white"
            >
              03. Signature Menu
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-3 border-b border-white/5 text-[#ede2d8] hover:text-white"
            >
              04. About Atelier
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            {trayCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTray();
                }}
                className="w-full py-3 text-xs tracking-widest uppercase border border-[#d4a359]/40 text-[#d4a359] text-center rounded-sm"
              >
                View Tasting Flight ({trayCount})
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisitModal();
              }}
              className="w-full py-3 text-xs tracking-widest uppercase font-semibold bg-[#d4a359] text-[#0c0806] text-center rounded-sm"
            >
              Visit Our Ateliers
            </button>
          </div>
        </div>
      )}
    </>
  );
};
