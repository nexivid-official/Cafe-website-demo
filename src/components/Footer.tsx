import React, { useState } from 'react';
import { Instagram, Twitter, Youtube, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#070504] border-t border-white/10 text-[#a8998d] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h3 className="text-xl font-serif tracking-[0.25em] text-[#f4ece3] uppercase font-medium mb-4">
              Atelier Coffee
            </h3>
            <p className="text-xs text-[#b8aba0] font-light leading-relaxed max-w-sm mb-6">
              A cinematic celebration of single-origin beans, precision roasting and artisanal extraction. Every drop is crafted with intent.
            </p>

            {/* Social Media Placeholders */}
            <div className="flex items-center gap-4 text-white/50">
              <a
                href="#social-instagram"
                onClick={(e) => e.preventDefault()}
                className="p-2 hover:text-[#d4a359] hover:bg-white/5 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social-x"
                onClick={(e) => e.preventDefault()}
                className="p-2 hover:text-[#d4a359] hover:bg-white/5 rounded-full transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social-youtube"
                onClick={(e) => e.preventDefault()}
                className="p-2 hover:text-[#d4a359] hover:bg-white/5 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#ede2d8] font-medium mb-4">
              Experience
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a8998d]">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Cinematic Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('craftsmanship')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terroir & Extraction
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Signature Four Drinks
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Atelier Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#ede2d8] font-medium mb-4">
              The Atelier Journal
            </h4>
            <p className="text-xs text-[#b8aba0] font-light leading-relaxed mb-4">
              Invitations to seasonal cuppings, harvest releases, and private roastery reservations.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xs text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been added to the guestbook.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xs text-[#ede2d8] focus:border-[#d4a359] focus:outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d4a359] text-[#0c0806] hover:bg-[#e4b771] rounded-xs text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Legal and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#786b61] gap-4">
          <p>© {new Date().getFullYear()} Atelier Coffee Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Direct-Trade Specialty Certified</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Roastery Network</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
