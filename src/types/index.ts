export interface DrinkItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  origin: string;
  notes: string[];
  roast: string;
  servingTemp: string;
  intensity: number; // 1-5
}

export type CinematicStageId = 'bean-drop' | 'perfect-pour' | 'collection' | 'final-reveal';

export interface CinematicStageInfo {
  id: CinematicStageId;
  index: number;
  label: string;
  startTime: number;
  endTime: number;
  progressStart: number;
  progressEnd: number;
  headline: string;
  subtext: string;
}
