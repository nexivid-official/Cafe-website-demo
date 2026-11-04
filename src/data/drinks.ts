import { DrinkItem } from '../types';
import icedMacchiatoImg from '../assets/images/iced_caramel_macchiato_1793779763791.jpg';
import velvetFlatWhiteImg from '../assets/images/velvet_flat_white_1793779764106.jpg';
import coldBrewImg from '../assets/images/signature_cold_brew_1793779764499.jpg';
import mochaFrappeImg from '../assets/images/whipped_mocha_frappe_1793779764757.jpg';

export const SIGNATURE_DRINKS: DrinkItem[] = [
  {
    id: 'cascara-iced-macchiato',
    name: 'Cascara Iced Macchiato',
    category: 'Layered Espresso',
    price: '$7.50',
    description: 'Slow-cascading double ristretto over cold whole organic milk, finished with artisanal muscovado cane caramel.',
    image: icedMacchiatoImg,
    origin: 'Huila, Colombia & Sidama, Ethiopia',
    notes: ['Dark Honey', 'Brown Butter', 'Toasted Pecan'],
    roast: 'Medium Dark',
    servingTemp: 'Chilled / Over Hand-Carved Ice',
    intensity: 4,
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    category: 'Artisanal Steam',
    price: '$6.00',
    description: 'Silky micro-foam poured with precision rosette art into rich, sweet double ristretto with dense golden crema.',
    image: velvetFlatWhiteImg,
    origin: 'Antioquia, Colombia',
    notes: ['Golden Crema', 'Hazelnut Praline', 'Sweet Cocoa'],
    roast: 'Medium Roast',
    servingTemp: 'Warm 65°C / Faceted Glass',
    intensity: 3,
  },
  {
    id: 'single-origin-cold-brew',
    name: 'Single-Origin Reserve Cold Brew',
    category: 'Slow Immersion',
    price: '$6.50',
    description: 'Steeped for 18 hours at cellar temperature. Crystal clear, incredibly winey and sweet with zero astringency.',
    image: coldBrewImg,
    origin: 'Yirgacheffe, Ethiopia (Washed Grade 1)',
    notes: ['Bergamot Blossom', 'Candied Citrus', 'Black Tea'],
    roast: 'Light Nordic Roast',
    servingTemp: 'Ice Rock / Heavy Crystal Tumbler',
    intensity: 5,
  },
  {
    id: 'grand-cru-mocha-frappe',
    name: 'Grand Cru Mocha Frappé',
    category: 'Decadent Cold Blend',
    price: '$8.00',
    description: 'Valrhona 72% chocolate ganache whipped with fresh espresso, topped with Madagascar bourbon vanilla cream and cocoa shavings.',
    image: mochaFrappeImg,
    origin: 'Guatemala Antigua & Madagascar',
    notes: ['72% Valrhona Dark Ganache', 'Vanilla Bean', 'Espresso Crunch'],
    roast: 'Rich Espresso Roast',
    servingTemp: 'Blended Iced / Tall Bistro Glass',
    intensity: 4,
  },
];
