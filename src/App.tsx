import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicVideoSection } from './components/CinematicVideoSection';
import { MenuSection } from './components/MenuSection';
import { DrinkDetailModal } from './components/DrinkDetailModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { FinalBrandSection } from './components/FinalBrandSection';
import { VisitModal } from './components/VisitModal';
import { TastingTrayDrawer } from './components/TastingTrayDrawer';
import { Footer } from './components/Footer';
import { DrinkItem } from './types';

export default function App() {
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [tastingTray, setTastingTray] = useState<DrinkItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleTray = (drink: DrinkItem) => {
    if (tastingTray.some((item) => item.id === drink.id)) {
      setTastingTray((prev) => prev.filter((item) => item.id !== drink.id));
    } else {
      setTastingTray((prev) => [...prev, drink]);
      // Open drawer briefly to show feedback
      setIsTrayOpen(true);
    }
  };

  const handleRemoveFromTray = (id: string) => {
    setTastingTray((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearTray = () => {
    setTastingTray([]);
  };

  return (
    <div className="relative bg-[#0c0806] text-[#ede2d8] min-h-screen selection:bg-[#d4a359] selection:text-[#0c0806]">
      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenVisitModal={() => setIsVisitModalOpen(true)}
        onOpenTray={() => setIsTrayOpen(true)}
        trayCount={tastingTray.length}
      />

      {/* Main Feature: Scroll-Driven Cinematic Video Section */}
      <CinematicVideoSection onExploreMenu={handleExploreMenu} />

      {/* Craftsmanship & Terroir Section */}
      <CraftsmanshipSection />

      {/* Signature 4 Drinks Menu Section */}
      <MenuSection
        onSelectDrink={(drink) => setSelectedDrink(drink)}
        onAddToTray={handleToggleTray}
        trayItemIds={tastingTray.map((d) => d.id)}
      />

      {/* Final Closing Brand Section */}
      <FinalBrandSection
        onOpenVisitModal={() => setIsVisitModalOpen(true)}
        onExploreMenu={handleExploreMenu}
      />

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Drink Tasting Notes Modal */}
      <DrinkDetailModal
        drink={selectedDrink}
        onClose={() => setSelectedDrink(null)}
        onAddToTray={handleToggleTray}
        isInTray={selectedDrink ? tastingTray.some((d) => d.id === selectedDrink.id) : false}
      />

      {/* Interactive Tasting Flight Drawer */}
      <TastingTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={tastingTray}
        onRemoveItem={handleRemoveFromTray}
        onClearTray={handleClearTray}
      />

      {/* Atelier Locations & Table Reservation Modal */}
      <VisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </div>
  );
}
