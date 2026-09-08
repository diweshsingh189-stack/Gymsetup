import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { playClickBeep } from '../utils/soundEffects';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Dumbbell,
  CheckCircle2,
  Calendar,
  Zap,
  Heart,
  Smile,
  Clock,
  Compass,
  Trophy,
  MessageSquareHeart,
  Search,
  Building2,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const MOTIVATIONAL_QUOTES = [
  { left: '🔥', text: 'Consistency beats motivation every single day. Just show up and give your best!', right: '🏆' },
  { left: '⚡', text: 'Every expert was once a beginner. Step in with confidence, lift with purpose!', right: '💪' },
  { left: '🌟', text: 'Your only competition is who you were yesterday. Keep building, champion!', right: '🚀' },
  { left: '🎯', text: 'Small daily disciplines repeated over time lead to monumental fitness transformations.', right: '🔥' },
  { left: '🛡️', text: 'Form first, ego never. Train smart, stay safe, and enjoy every rep!', right: '⚡' }
];

const HERO_SLIDES = [
  {
    id: 1,
    image: '/hero_physique.jpg',
    topBadge: 'BICEPS • FOREARMS • SHOULDERS',
    title: 'Full Body Muscular Definition',
    subtitle: 'Delts, Biceps & Forearms',
    tag: 'Form Mastery',
    icon: Dumbbell
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    topBadge: 'CHEST • TRICEPS • PUSH DAY',
    title: 'Chest & Incline Power',
    subtitle: 'Dumbbell Press, Flyes & Pushups',
    tag: 'Upper Body',
    icon: Flame
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    topBadge: 'LATS • RHOMBOIDS • PULL DAY',
    title: 'Back Width & V-Taper Shape',
    subtitle: 'Lat Pulldowns, Rows & Deadlifts',
    tag: 'Core & Posture',
    icon: Zap
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    topBadge: 'QUADS • HAMSTRINGS • LEG DAY',
    title: 'Leg Strength & Quad Power',
    subtitle: 'Squats, Leg Press & Lunges',
    tag: 'Lower Body',
    icon: TrendingUp
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    topBadge: 'DELTOIDS • TRAPS • OVERHEAD',
    title: 'Boulder Shoulders & Traps',
    subtitle: 'Overhead Press & Lateral Raises',
    tag: 'Strength',
    icon: Award
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    topBadge: 'CARDIO • ENDURANCE • HIIT',
    title: 'Athletic Stamina & Conditioning',
    subtitle: 'Battle Ropes, Sprints & Mobility',
    tag: 'Conditioning',
    icon: Heart
  }
];

export const HomeSection = () => {
  const {
    navigateTo,
    checklist,
    workoutLogs,
    roadmapMilestones,
    wizardCompleted,
    openTimer,
    openSearchModal
  } = useApp();

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' or 'prev'
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Auto turn pages continuously and briskly like a notebook ("juldi move kro & pura ulet jai")
  useEffect(() => {
    if (isDragging || isFlipping) return;
    const timer = setInterval(() => {
      turnPage('next');
    }, 2200);
    return () => clearInterval(timer);
  }, [heroSlideIndex, isDragging, isFlipping]);

  const turnPage = (direction = 'next') => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipDirection(direction);
    playClickBeep();

    setTimeout(() => {
      setHeroSlideIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % HERO_SLIDES.length;
        } else {
          return (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
        }
      });
      setIsFlipping(false);
      setDragOffset(0);
    }, 480);
  };

  const nextHeroSlide = (e) => {
    if (e) e.stopPropagation();
    turnPage('next');
  };

  const prevHeroSlide = (e) => {
    if (e) e.stopPropagation();
    turnPage('prev');
  };

  // Hand Drag & Touch Handlers (Physical Page Turn with Hand)
  const handleTouchStart = (e) => {
    if (isFlipping) return;
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isFlipping) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    // Limit drag to reasonable range
    if (diff < 120 && diff > -260) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      // User swiped/turned page to the left (next page)
      turnPage('next');
    } else if (dragOffset > 50) {
      // User swiped/turned page to the right (previous page)
      turnPage('prev');
    } else {
      setDragOffset(0);
    }
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    playClickBeep();
  };

  // Metrics
  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecklistCount / 20) * 100);

  const completedRoadmapCount = Object.values(roadmapMilestones).filter(Boolean).length;
  const roadmapPercent = Math.round((completedRoadmapCount / 20) * 100);

  const totalLogs = workoutLogs.length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Motivational Daily Fuel Ribbon - Clean, Minimalist, 2-Color */}
      <div
        onClick={nextQuote}
        className="card card-hover"
        style={{
          background: 'var(--bg-card-secondary)',
          border: '1px solid var(--border-card)',
          borderRadius: '14px',
          padding: '0.65rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
        title="Click to shuffle daily fitness motivation"
      >
        <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>
          {MOTIVATIONAL_QUOTES[quoteIndex].left}
        </span>
        <span style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          lineHeight: 1.45,
          textAlign: 'center',
          minWidth: 0,
          wordBreak: 'break-word'
        }}>
          "{MOTIVATIONAL_QUOTES[quoteIndex].text}"
        </span>
        <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>
          {MOTIVATIONAL_QUOTES[quoteIndex].right}
        </span>
      </div>

      {/* Hero Banner with Clean Natural Aesthetics */}
      <div
        className="card"
        style={{
          padding: '2.25rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          border: '1px solid var(--border-card)',
          background: 'var(--bg-card)'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.85fr)',
          gap: '2rem',
          alignItems: 'center'
        }} className="hero-banner-grid">
          {/* Left Column: Text & CTAs */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald">
                <Sparkles size={13} /> Day 1 Gym Companion
              </span>
              <span className="badge badge-neutral">
                Beginner Friendly
              </span>
              {wizardCompleted && (
                <span className="badge badge-emerald">
                  <Trophy size={13} /> Certified
                </span>
              )}
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Welcome to the Gym. <br />
              <span style={{ color: '#10b981' }}>We Made Day 1 Effortless.</span>
            </h1>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
              lineHeight: 1.6
            }}>
              No body-shaming, no complex jargon, and no confusing equipment. GymSetup is your step-by-step pocket coach from packing your bag to mastering safe, confident workouts.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <button
                onClick={() => navigateTo('guided-flow')}
                className="btn btn-primary btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', flex: '1 1 200px' }}
              >
                <Sparkles size={18} />
                <span>Start My Gym Journey</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigateTo('first-day')}
                className="btn btn-secondary btn-lg"
                style={{ flex: '1 1 180px' }}
              >
                <Compass size={18} />
                <span>First Day Step-by-Step</span>
              </button>
            </div>

            {/* Interactive Live Search Trigger Bar in Hero */}
            <div
              onClick={() => openSearchModal()}
              style={{
                cursor: 'pointer',
                background: 'var(--bg-card-secondary)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'border-color 0.15s ease',
                gap: '0.65rem',
                minWidth: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
                <Search size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Search any gym machine, exercise, or stretch...
                </span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', flexShrink: 0 }}>
                🔍 Search
              </span>
            </div>
          </div>

          {/* Right Column: 3D Notebook Page-Turn Effect */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div
              className="book-perspective"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                height: 'clamp(360px, 72vw, 440px)',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid var(--border-card)',
                boxShadow: isDragging ? '0 12px 30px rgba(0,0,0,0.5)' : 'var(--shadow-md)',
                backgroundColor: '#090d16',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                touchAction: 'pan-y'
              }}
            >
              {/* Underneath Next Slide (Revealed when current page turns) */}
              {(() => {
                const nextIdx = flipDirection === 'next' 
                  ? (heroSlideIndex + 1) % HERO_SLIDES.length 
                  : (heroSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
                const nextSlide = HERO_SLIDES[nextIdx];
                return (
                  <div
                    key={`under-${nextSlide.id}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1
                    }}
                  >
                    <img
                      src={nextSlide.image}
                      alt={nextSlide.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        display: 'block'
                      }}
                    />
                  </div>
                );
              })()}

              {/* Active Turning Page: Complete 180-degree Page Turn */}
              {(() => {
                const currentSlide = HERO_SLIDES[heroSlideIndex];
                
                // Dynamic 3D rotation: Full 180-degree page flip
                let rotateY = 0;
                let transition = 'none';

                if (isDragging) {
                  const dragPercent = Math.max(-1, Math.min(0.5, dragOffset / 260));
                  rotateY = dragPercent * 180;
                } else if (isFlipping) {
                  rotateY = flipDirection === 'next' ? -180 : 180;
                  transition = 'transform 0.48s cubic-bezier(0.25, 1, 0.4, 1)';
                }

                return (
                  <div
                    key={`active-${currentSlide.id}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 3,
                      transformOrigin: 'left center',
                      transform: `rotateY(${rotateY}deg)`,
                      transformStyle: 'preserve-3d',
                      transition: transition,
                      willChange: 'transform',
                      boxShadow: isDragging || isFlipping ? '-10px 0 30px rgba(0,0,0,0.8)' : 'none'
                    }}
                  >
                    {/* Front Face of Page */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        overflow: 'hidden',
                        backgroundColor: '#090d16'
                      }}
                    >
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        loading="eager"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 20%',
                          display: 'block',
                          pointerEvents: 'none'
                        }}
                      />

                      {/* Paper Curl & Crease Dynamic Shadow */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 20%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0.65) 100%)',
                          opacity: isDragging ? Math.min(1, Math.abs(dragOffset / 140)) : (isFlipping ? 0.9 : 0),
                          transition: isDragging ? 'none' : 'opacity 0.48s ease',
                          pointerEvents: 'none'
                        }}
                      />
                    </div>

                    {/* Back Face of Page (Visible during 180deg turn) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #090d16 0%, #131d31 50%, #0f172a 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        color: 'rgba(255,255,255,0.4)',
                        overflow: 'hidden'
                      }}
                    >
                      <Dumbbell size={36} color="#10b981" style={{ opacity: 0.6, marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        GymSetup Guide
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Gradient Vignette for UI Text Contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(9, 13, 22, 0.45) 0%, rgba(9, 13, 22, 0.05) 35%, rgba(9, 13, 22, 0.94) 100%)',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              />

              {/* Top Dynamic Muscle Badge & Page Number (Clean, No-Cut Layout) */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.35rem',
                  zIndex: 6,
                  pointerEvents: 'none',
                  minWidth: 0
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: 'rgba(15, 23, 42, 0.92)',
                    padding: '0.25rem 0.55rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#10b981',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '75%',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                  }}
                >
                  <Flame size={12} color="#10b981" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {HERO_SLIDES[heroSlideIndex].topBadge}
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-card)',
                    padding: '0.22rem 0.5rem',
                    borderRadius: '9999px',
                    color: '#94a3b8',
                    fontSize: '0.64rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {heroSlideIndex + 1}/6
                </div>
              </div>

              {/* Left / Right Carousel Navigation Buttons */}
              <button
                type="button"
                onClick={prevHeroSlide}
                aria-label="Previous Page"
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '48%',
                  transform: 'translateY(-50%)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.82)',
                  border: '1px solid var(--border-card)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 7,
                  transition: 'background 0.2s ease, color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#10b981';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.82)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={nextHeroSlide}
                aria-label="Next Page"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '48%',
                  transform: 'translateY(-50%)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.82)',
                  border: '1px solid var(--border-card)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 7,
                  transition: 'background 0.2s ease, color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#10b981';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.82)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <ChevronRight size={16} />
              </button>

              {/* Bottom Card: Slide Metadata & Dots */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(15, 23, 42, 0.94)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  padding: '0.55rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  zIndex: 7,
                  backdropFilter: 'blur(8px)',
                  minWidth: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10b981',
                        flexShrink: 0
                      }}
                    >
                      {React.createElement(HERO_SLIDES[heroSlideIndex].icon, { size: 14 })}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {HERO_SLIDES[heroSlideIndex].title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.66rem',
                          color: '#10b981',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {HERO_SLIDES[heroSlideIndex].subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className="badge badge-emerald"
                    style={{ fontSize: '0.62rem', padding: '0.12rem 0.4rem', flexShrink: 0 }}
                  >
                    {HERO_SLIDES[heroSlideIndex].tag}
                  </span>
                </div>

                {/* 6 Dots / Indicator Bars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', paddingTop: '1px' }}>
                  {HERO_SLIDES.map((_, dotIdx) => {
                    const isDotActive = dotIdx === heroSlideIndex;
                    return (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroSlideIndex(dotIdx);
                        }}
                        aria-label={`Page ${dotIdx + 1}`}
                        style={{
                          height: '4px',
                          width: isDotActive ? '18px' : '5px',
                          borderRadius: '9999px',
                          background: isDotActive ? '#10b981' : 'rgba(255, 255, 255, 0.25)',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics / Dashboard Status */}
      <div className="grid-3">
        {/* Checklist Card */}
        <div
          onClick={() => navigateTo('checklist')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981'
              }}>
                <CheckCircle2 size={22} />
              </div>
              <span className="badge badge-emerald">
                {checklistPercent}% Ready
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Daily Gym Checklist
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {completedChecklistCount} of 20 items checked for before, during & after your session.
            </p>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <div className="progress-container">
              <div className="progress-bar-emerald" style={{ width: `${checklistPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Roadmap Card */}
        <div
          onClick={() => navigateTo('roadmap')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981'
              }}>
                <Calendar size={22} />
              </div>
              <span className="badge badge-neutral">
                {completedRoadmapCount} Completed
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Beginner Roadmap
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              From Day 1 "Just Show Up" to Month 2+ autonomous progressive habit.
            </p>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <div className="progress-container">
              <div className="progress-bar-emerald" style={{ width: `${roadmapPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Workout Tracker Card */}
        <div
          onClick={() => navigateTo('tracker')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981'
              }}>
                <Dumbbell size={22} />
              </div>
              <span className="badge badge-neutral">
                {totalLogs} Entries
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Workout History
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Logged safely in your browser storage. Track weight, sets, and personal records.
            </p>
          </div>

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>Open Tracker</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Quick 3-Pillar Confidence Primer */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={24} color="#10b981" />
          The Beginner's 3 Golden Rules for Day 1
        </h2>

        <div className="grid-3">
          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#10b981', marginBottom: '0.35rem' }}>
              1. Nobody Is Watching You
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              99% of people in the gym are hyper-focused on their own reps, music, and fatigue. You are in safe company.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#10b981', marginBottom: '0.35rem' }}>
              2. Consistency Beats Intensity
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              An easy 25-minute workout 3 times a week beats a grueling 2-hour workout that leaves you unable to walk for 6 days.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#10b981', marginBottom: '0.35rem' }}>
              3. Machines Are Your Best Friend
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Fixed-track pin machines guide your movement with zero chance of dropping weights. Perfect for your first 30 days!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launchpad to All Sections */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Explore GymSetup Hubs</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Direct access to the beginner pillars</p>
          </div>
        </div>

        <div className="grid-4">
          {[
            { id: 'first-day', title: 'First Day Guide', desc: 'Before, during & after breakdown', icon: Compass, color: '#10b981' },
            { id: 'roadmap', title: 'Roadmap & Milestones', desc: 'Day 1 to Month 2+ path', icon: Calendar, color: '#10b981' },
            { id: 'safety', title: 'Safety & Form Traps', desc: 'DOs/DON\'Ts and red flags', icon: ShieldCheck, color: '#10b981' },
            { id: 'equipment', title: 'Equipment Explorer', desc: 'Pins, adjustments & how-tos', icon: Zap, color: '#10b981' },
            { id: 'warmup', title: 'Warm-up & Cooldown', desc: 'Dynamic moves + rest timer', icon: Flame, color: '#10b981' },
            { id: 'workout', title: 'Beginner Workouts', desc: 'Full Body & 20-min express', icon: Dumbbell, color: '#10b981' },
            { id: 'nutrition', title: 'Simple Nutrition', desc: 'Macros & protein calculator', icon: Heart, color: '#10b981' },
            { id: 'recovery', title: 'Rest & Recovery', desc: 'DOMS survival & sleep guide', icon: Clock, color: '#10b981' },
            { id: 'gym-pricing', title: 'Top Gyms & Pricing', desc: 'Cult.fit, Gold\'s, Anytime & fees', icon: Building2, color: '#10b981' },
            { id: 'feedback', title: 'Member Feedback', desc: 'Submit reviews, ratings & thoughts', icon: MessageSquareHeart, color: '#10b981' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="card card-hover"
                style={{ cursor: 'pointer', padding: '1.35rem' }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                  marginBottom: '1rem'
                }}>
                  <Icon size={20} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-banner-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
        @media (max-width: 640px) {
          .hero-physique-blink {
            height: 360px !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 420px) {
          .hero-physique-blink {
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
};
