import React, { useState } from 'react';
import { X, MapPin, Clock, Calendar, Check, Users } from 'lucide-react';

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AtelierLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  notes: string;
}

const LOCATIONS: AtelierLocation[] = [
  {
    id: 'nyc',
    city: 'New York',
    name: 'SoHo Flagship & Roastery',
    address: '448 Broome Street, New York, NY 10013',
    hours: 'Mon – Fri: 07:00 – 18:00 · Sat – Sun: 08:00 – 19:00',
    notes: 'Brew bar, cupping lab, and seasonal pastry pairing.',
  },
  {
    id: 'london',
    city: 'London',
    name: 'Shoreditch Tasting Room',
    address: '28 Redchurch Street, Shoreditch, London E2 7DD',
    hours: 'Mon – Fri: 07:30 – 17:30 · Sat – Sun: 08:30 – 18:00',
    notes: 'Micro-roastery and signature espresso tasting flights.',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    name: 'Daikanyama Atelier',
    address: '1-14 Sarugakucho, Shibuya-ku, Tokyo 150-0033',
    hours: 'Daily: 08:00 – 19:00',
    notes: 'Minimalist siphon bar and single-origin reserve pours.',
  },
];

export const VisitModal: React.FC<VisitModalProps> = ({ isOpen, onClose }) => {
  const [selectedLoc, setSelectedLoc] = useState<string>('nyc');
  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-11-10');
  const [time, setTime] = useState<string>('10:30 AM');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentLoc = LOCATIONS.find((l) => l.id === selectedLoc) || LOCATIONS[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#140e0b] border border-white/10 rounded-sm overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="py-12 text-center animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-900/40 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-300">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f4ece3] font-normal mb-2">
              Tasting Reservation Confirmed
            </h3>
            <p className="text-sm text-[#b8aba0] max-w-md mx-auto mb-6 leading-relaxed">
              We look forward to welcoming you to our {currentLoc.name}. A confirmation has been sent to{' '}
              <span className="text-[#d4a359]">{email}</span>.
            </p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xs max-w-sm mx-auto text-xs text-left mb-8 space-y-1.5 text-[#ede2d8]">
              <div><strong className="text-white/60">Location:</strong> {currentLoc.name}</div>
              <div><strong className="text-white/60">Date & Time:</strong> {date} at {time}</div>
              <div><strong className="text-white/60">Party:</strong> {partySize} guests (Coffee Flight Tasting)</div>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-semibold bg-[#d4a359] text-[#0c0806] hover:bg-[#e4b771] rounded-sm transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#d4a359] font-medium mb-2">
              Atelier Destinations
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f4ece3] font-normal mb-6">
              VISIT OUR TASTING ROOMS
            </h3>

            {/* City Selector Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-4 mb-6">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
                    selectedLoc === loc.id
                      ? 'bg-[#d4a359] text-[#0c0806] font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {loc.city}
                </button>
              ))}
            </div>

            {/* Selected Location Info Card */}
            <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-xs mb-8 space-y-2 text-xs">
              <h4 className="text-base font-serif text-[#f4ece3] font-medium">{currentLoc.name}</h4>
              <p className="flex items-center gap-2 text-[#c8beb3]">
                <MapPin className="w-3.5 h-3.5 text-[#d4a359] shrink-0" />
                <span>{currentLoc.address}</span>
              </p>
              <p className="flex items-center gap-2 text-[#c8beb3]">
                <Clock className="w-3.5 h-3.5 text-[#d4a359] shrink-0" />
                <span>{currentLoc.hours}</span>
              </p>
              <p className="text-[11px] text-[#a8998d] italic pt-1 border-t border-white/5">
                {currentLoc.notes}
              </p>
            </div>

            {/* Table / Bar Reservation Form */}
            <form onSubmit={handleBooking} className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4a359] font-medium">
                Reserve an Espresso Tasting Table
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Elena Vance"
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs bg-black/40 border border-white/10 rounded-xs text-[#ede2d8] focus:border-[#d4a359] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs bg-black/40 border border-white/10 rounded-xs text-[#ede2d8] focus:border-[#d4a359] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs bg-black/40 border border-white/10 rounded-xs text-[#ede2d8] focus:border-[#d4a359] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1">
                    Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs bg-black/40 border border-white/10 rounded-xs text-[#ede2d8] focus:border-[#d4a359] focus:outline-none cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1">
                    Guests
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs bg-black/40 border border-white/10 rounded-xs text-[#ede2d8] focus:border-[#d4a359] focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 min-h-[48px] text-xs tracking-[0.2em] uppercase font-semibold bg-[#d4a359] text-[#0c0806] hover:bg-[#e4b771] active:scale-[0.98] rounded-sm transition-all cursor-pointer shadow-lg"
                >
                  Confirm Table Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
