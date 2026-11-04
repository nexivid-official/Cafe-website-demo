import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowDown, RotateCcw, Volume2, VolumeX, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CinematicStageId } from '../types';

interface CinematicVideoSectionProps {
  onExploreMenu: () => void;
}

interface StageConfig {
  id: CinematicStageId;
  num: string;
  label: string;
  shortLabel: string;
  startProgress: number;
  endProgress: number;
  startTime: number;
  endTime: number;
  headline: string;
  subtext: string;
  kicker: string;
}

const STAGES: StageConfig[] = [
  {
    id: 'bean-drop',
    num: '01',
    label: 'The Bean Drop',
    shortLabel: 'Drop',
    startProgress: 0.0,
    endProgress: 0.18,
    startTime: 0.0,
    endTime: 1.25,
    kicker: 'Origin & Raw Roasting',
    headline: 'MORE THAN JUST COFFEE.',
    subtext: 'An experience crafted around every cup.',
  },
  {
    id: 'perfect-pour',
    num: '02',
    label: 'The Perfect Pour',
    shortLabel: 'Pour',
    startProgress: 0.18,
    endProgress: 0.48,
    startTime: 1.25,
    endTime: 3.80,
    kicker: '9-Bar Precision Extraction',
    headline: 'PERFECTION IN EVERY POUR.',
    subtext: 'Liquid amber dancing beneath rising steam, forming dense velvety golden crema with notes of dark honey and roasted pecan.',
  },
  {
    id: 'collection',
    num: '03',
    label: 'The Collection',
    shortLabel: 'Drinks',
    startProgress: 0.48,
    endProgress: 0.78,
    startTime: 3.80,
    endTime: 6.80,
    kicker: 'Signature Formation',
    headline: 'FOUR SIGNATURE EXPERIENCES.',
    subtext: 'Different flavours. One passion for exceptional coffee.',
  },
  {
    id: 'final-reveal',
    num: '04',
    label: 'The Final Reveal',
    shortLabel: 'Reveal',
    startProgress: 0.78,
    endProgress: 1.0,
    startTime: 6.80,
    endTime: 9.92,
    kicker: 'The Finished Ensemble',
    headline: 'FIND YOUR PERFECT CUP.',
    subtext: 'From slow-infused cold extractions to silky steamed microfoam, each recipe is tuned to sublime equilibrium.',
  },
];

export const CinematicVideoSection: React.FC<CinematicVideoSectionProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const isDraggingScrubberRef = useRef(false);

  // Detect Mobile Viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Map normalized scroll progress [0, 1] to video timeline [0, 9.92]
  const calculateVideoTime = useCallback((progress: number) => {
    if (progress <= 0.18) {
      const p = Math.max(0, progress / 0.18);
      return p * 1.25;
    } else if (progress <= 0.48) {
      const p = (progress - 0.18) / (0.48 - 0.18);
      return 1.25 + p * (3.80 - 1.25);
    } else if (progress <= 0.78) {
      const p = (progress - 0.48) / (0.78 - 0.48);
      return 3.80 + p * (6.80 - 3.80);
    } else {
      const p = Math.min(1, (progress - 0.78) / (1.0 - 0.78));
      return 6.80 + p * (9.92 - 6.80);
    }
  }, []);

  // Handle Initial Intro Bean Drop on Page Load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let introAnimationId: number;

    const playIntroSequence = async () => {
      try {
        video.currentTime = 0;
        await video.play();

        const checkTime = () => {
          if (!videoRef.current) return;
          if (videoRef.current.currentTime >= 1.25) {
            videoRef.current.pause();
            videoRef.current.currentTime = 1.25;
            setIsIntroPlaying(false);
          } else {
            introAnimationId = requestAnimationFrame(checkTime);
          }
        };
        introAnimationId = requestAnimationFrame(checkTime);
      } catch (err) {
        console.warn('Autoplay restricted by browser, holding initial frame at 1.25s', err);
        video.currentTime = 1.25;
        setIsIntroPlaying(false);
      }
    };

    if (isVideoLoaded) {
      playIntroSequence();
    }

    return () => {
      if (introAnimationId) cancelAnimationFrame(introAnimationId);
    };
  }, [isVideoLoaded]);

  // Replay Intro Drop
  const handleReplayIntro = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsIntroPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    video.currentTime = 0;
    video.play().then(() => {
      const check = () => {
        if (!videoRef.current) return;
        if (videoRef.current.currentTime >= 1.25) {
          videoRef.current.pause();
          videoRef.current.currentTime = 1.25;
          setIsIntroPlaying(false);
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    }).catch(() => {
      setIsIntroPlaying(false);
    });
  };

  // Main Scroll Listener & High-Performance RAF Loop
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onSeeking = () => { isSeekingRef.current = true; };
      const onSeeked = () => { isSeekingRef.current = false; };
      video.addEventListener('seeking', onSeeking);
      video.addEventListener('seeked', onSeeked);
    }

    const updateScrollProgress = () => {
      if (!containerRef.current || isDraggingScrubberRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);

      // Determine active stage
      let stageIdx = 0;
      if (clampedProgress < 0.18) stageIdx = 0;
      else if (clampedProgress < 0.48) stageIdx = 1;
      else if (clampedProgress < 0.78) stageIdx = 2;
      else stageIdx = 3;

      setCurrentStageIndex(stageIdx);

      // Cancel intro if user starts scrolling
      if (clampedProgress > 0.02 && isIntroPlaying) {
        setIsIntroPlaying(false);
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }

      targetTimeRef.current = calculateVideoTime(clampedProgress);
    };

    // Smooth render loop with seek-guard to prevent decoder queue buildup on mobile
    const renderLoop = () => {
      const v = videoRef.current;
      if (v && !isIntroPlaying && v.readyState >= 2) {
        const target = targetTimeRef.current;
        const current = v.currentTime;
        const delta = target - current;

        // Apply if delta is meaningful and browser isn't locked in seek
        if (Math.abs(delta) > 0.02 && !isSeekingRef.current) {
          // On mobile, use faster step for responsive touch reaction
          const stepFactor = isMobile ? 0.35 : 0.25;
          const nextTime = current + delta * stepFactor;
          v.currentTime = Math.max(0, Math.min(v.duration || 9.96, nextTime));
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    rafIdRef.current = requestAnimationFrame(renderLoop);

    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [calculateVideoTime, isIntroPlaying, isMobile]);

  // Jump to specific stage
  const jumpToStage = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
    const stage = STAGES[index];
    const targetP = (stage.startProgress + stage.endProgress) / 2;
    const targetScrollY = containerTop + targetP * totalDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Direct Touch Scrubber on Mobile/Desktop Progress Bar
  const handleScrubberInteract = (clientX: number) => {
    if (!progressBarRef.current || !containerRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const rawRatio = (clientX - rect.left) / rect.width;
    const ratio = Math.max(0, Math.min(1, rawRatio));

    const containerTop = containerRef.current.offsetTop;
    const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + ratio * totalDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingScrubberRef.current = true;
    handleScrubberInteract(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingScrubberRef.current) {
      handleScrubberInteract(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDraggingScrubberRef.current = false;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0c0806] touch-pan-y"
      // Mobile has adjusted scroll height (330vh) to prevent thumb fatigue while preserving cinematic pacing
      style={{ height: isMobile ? '330vh' : '480vh' }}
    >
      {/* Sticky Viewport Container: 100dvh for zero mobile address bar jump */}
      <div className="sticky top-0 h-[100dvh] min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-between bg-[#070504]">
        
        {/* Video Canvas Layer */}
        {/* Mobile: Anchored towards top under navbar with object-contain so ALL FOUR DRINKS REMAIN 100% VISIBLE */}
        {/* Desktop: Full-bleed object-cover cinematic view */}
        <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-start md:justify-center overflow-hidden">
          <div className="relative w-full pt-[5.75rem] pb-2 sm:pt-0 sm:pb-0 h-[43dvh] sm:h-full flex items-center justify-center">
            <video
              ref={videoRef}
              className={`w-full select-none pointer-events-none transition-all duration-300 ${
                isMobile
                  ? 'h-full max-h-[38dvh] object-contain sm:max-h-none sm:h-full sm:object-cover'
                  : 'h-full object-cover'
              }`}
              playsInline
              webkit-playsinline="true"
              muted={isMuted}
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              onLoadedData={() => setIsVideoLoaded(true)}
            >
              <source src="/assets/aistudio/coffee_scrub_optimized.mp4" type="video/mp4" />
              <source src="/assets/aistudio/Luxury_coffee_commercial_animati__ee8072d4_1080p__1__91db0951.mp4" type="video/mp4" />
            </video>

            {/* Seamless Dark Edge Blends so Video Melds Into Canvas */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070504] via-transparent to-[#070504] opacity-80 sm:opacity-50" />
            <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#070504]/20 to-[#070504]/90" />
          </div>
        </div>

        {/* Content Overlay Layout:
            On Mobile: Text is positioned strictly BELOW the 43dvh video zone, so text NEVER overlaps the animation!
            On Desktop: Balanced full-screen editorial layout with ample negative space */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-12 flex flex-col justify-between h-full pt-16 sm:pt-28 pb-3 sm:pb-12 pointer-events-none">
          
          {/* Top Bar Status / Kicker - High-contrast backdrop pill on mobile so it is 100% clearly visible */}
          <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-[#a8998d] h-9 sm:h-10">
            <div className="flex items-center gap-2 sm:gap-3 bg-black/75 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-3 py-1 sm:px-0 sm:py-0 rounded-full border border-white/10 sm:border-none shadow-sm">
              <span className="text-[#d4a359] font-serif italic text-xs sm:text-base font-semibold">Atelier 01</span>
              <span className="text-white/30">/</span>
              <span className="text-[10px] sm:text-xs text-[#ede2d8] font-medium tracking-widest">Cinematic Extraction</span>
            </div>
            
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-4 bg-black/75 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-2 py-0.5 sm:px-0 sm:py-0 rounded-full border border-white/10 sm:border-none">
              <button
                onClick={handleReplayIntro}
                className="min-h-[36px] sm:min-h-[40px] px-2 flex items-center justify-center gap-1 text-white/80 hover:text-white transition-colors text-[10px] sm:text-[11px] uppercase tracking-widest cursor-pointer active:scale-95"
                aria-label="Replay Bean Drop introduction"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4a359]" />
                <span className="hidden sm:inline">Intro Drop</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="min-h-[36px] sm:min-h-[40px] px-2 flex items-center justify-center gap-1 text-white/80 hover:text-white transition-colors text-[10px] sm:text-[11px] uppercase tracking-widest cursor-pointer active:scale-95"
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a359]" />}
              </button>
            </div>
          </div>

          {/* Dynamic Narrative Text:
              On Mobile: sits cleanly in the space BELOW the video, guaranteed zero overlap with the animation! */}
          <div className="mt-auto sm:my-auto pt-2 pb-2 sm:py-8 transition-all duration-500 z-20">
            {/* Stage 1: The Bean Drop */}
            {currentStageIndex === 0 && (
              <div className="max-w-2xl bg-black/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-xs border border-white/5 sm:border-none animate-fadeIn">
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d4a359] mb-1 sm:mb-4 font-medium flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-[#d4a359]"></span>
                  {STAGES[0].kicker}
                </p>
                <h1 className="text-2xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#f7efe6] font-normal leading-[1.1] mb-1 sm:mb-6">
                  MORE THAN JUST COFFEE.
                </h1>
                <p className="text-xs sm:text-base md:text-lg text-[#c8beb3] font-light max-w-xl leading-relaxed">
                  An experience crafted around every cup.
                </p>
              </div>
            )}

            {/* Stage 2: The Perfect Pour */}
            {currentStageIndex === 1 && (
              <div className="max-w-2xl bg-black/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-xs border border-white/5 sm:border-none animate-fadeIn">
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d4a359] mb-1 sm:mb-4 font-medium flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-[#d4a359]"></span>
                  {STAGES[1].kicker}
                </p>
                <h2 className="text-2xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#f7efe6] font-normal leading-[1.1] mb-1 sm:mb-6">
                  PERFECTION IN EVERY POUR.
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-[#c8beb3] font-light max-w-xl leading-relaxed">
                  Liquid amber dancing beneath rising steam, forming dense velvety golden crema with notes of dark honey and roasted pecan.
                </p>
              </div>
            )}

            {/* Stage 3: The Collection */}
            {currentStageIndex === 2 && (
              <div className="max-w-2xl bg-black/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-xs border border-white/5 sm:border-none animate-fadeIn">
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d4a359] mb-1 sm:mb-4 font-medium flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-[#d4a359]"></span>
                  {STAGES[2].kicker}
                </p>
                <h2 className="text-xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#f7efe6] font-normal leading-[1.1] mb-1 sm:mb-6">
                  FOUR SIGNATURE EXPERIENCES.
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-[#c8beb3] font-light max-w-xl leading-relaxed mb-2 sm:mb-6">
                  Different flavours. One passion for exceptional coffee.
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] sm:text-xs uppercase tracking-[0.16em] text-[#d4a359]/90 font-medium">
                  <span>Iced Macchiato</span>
                  <span className="text-white/20">·</span>
                  <span>Velvet Flat White</span>
                  <span className="text-white/20">·</span>
                  <span>Reserve Cold Brew</span>
                  <span className="text-white/20">·</span>
                  <span>Mocha Frappé</span>
                </div>
              </div>
            )}

            {/* Stage 4: The Final Reveal */}
            {currentStageIndex === 3 && (
              <div className="max-w-2xl bg-black/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-xs border border-white/5 sm:border-none animate-fadeIn pointer-events-auto">
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d4a359] mb-1 sm:mb-4 font-medium flex items-center gap-1.5 sm:gap-2">
                  <span className="w-4 sm:w-6 h-[1px] bg-[#d4a359]"></span>
                  {STAGES[3].kicker}
                </p>
                <h2 className="text-xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#f7efe6] font-normal leading-[1.1] mb-1 sm:mb-6">
                  FIND YOUR PERFECT CUP.
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-[#c8beb3] font-light max-w-xl leading-relaxed mb-3 sm:mb-8">
                  From slow-infused cold extractions to silky steamed microfoam, each recipe is tuned to sublime equilibrium.
                </p>
                
                <div>
                  <button
                    onClick={onExploreMenu}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3.5 min-h-[44px] text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-[#0c0806] bg-[#d4a359] hover:bg-[#e4b771] active:scale-[0.98] transition-all rounded-sm shadow-xl shadow-black/50 group cursor-pointer"
                  >
                    <span>EXPLORE OUR MENU</span>
                    <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls & Mobile Touch Scrubber */}
          <div className="flex flex-col gap-3">
            
            <div className="flex items-center justify-between gap-4">
              {/* Subtle Scroll Cue */}
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c8beb3]/70 font-light">
                <div className="w-4 h-7 sm:w-5 sm:h-9 border border-white/20 rounded-full flex items-start justify-center p-1">
                  <div className="w-1 h-1.5 bg-[#d4a359] rounded-full animate-bounce" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[10px] sm:text-xs font-medium">Scroll to scrub</span>
                  <span className="text-[9px] text-white/40 hidden sm:inline">Timeline synchronized</span>
                </div>
              </div>

              {/* Touch-Friendly Stage Switcher (All buttons >= 44px touch targets on mobile) */}
              <div className="pointer-events-auto flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-sm border border-white/10">
                {STAGES.map((stg, idx) => (
                  <button
                    key={stg.id}
                    onClick={() => jumpToStage(idx)}
                    className={`min-h-[40px] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs tracking-wider uppercase transition-all rounded-xs cursor-pointer flex items-center gap-1 active:scale-95 ${
                      currentStageIndex === idx
                        ? 'bg-[#d4a359] text-[#0c0806] font-semibold shadow-xs'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                    title={stg.label}
                  >
                    <span className="opacity-70 text-[10px]">{stg.num}</span>
                    <span className="hidden sm:inline">{stg.label}</span>
                    <span className="sm:hidden">{stg.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Touch Scrubber Bar */}
            <div
              ref={progressBarRef}
              onClick={(e) => handleScrubberInteract(e.clientX)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="pointer-events-auto relative w-full h-4 sm:h-3 flex items-center cursor-pointer group py-1"
              title="Touch or click to scrub through commercial"
            >
              <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#b8783d] via-[#d4a359] to-[#f4ece3] transition-all duration-75 ease-out"
                  style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
                />
              </div>

              {/* Thumb Scrubber Indicator for Touch Feedback */}
              <div
                className="absolute w-3.5 h-3.5 bg-[#d4a359] border border-white/60 rounded-full shadow-md -translate-x-1/2 pointer-events-none transition-transform group-hover:scale-125"
                style={{ left: `${(scrollProgress * 100).toFixed(1)}%` }}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
