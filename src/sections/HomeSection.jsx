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
  Clock,
  Compass,
  Trophy,
  MessageSquareHeart,
  Search,
  Building2,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  Apple,
  MoonStar,
  ClipboardList
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

const SECTIONS_CATALOG = [
  { id: 'guided-flow', num: '02', title: 'Guided Day-1 Flow', icon: Sparkles, badge: 'Wizard', desc: '6-step interactive onboarding to walk you from home to your first workout.' },
  { id: 'first-day', num: '03', title: 'First Day Gym Guide', icon: Compass, badge: 'Step-by-Step', desc: 'Bag packing, locker rooms, anxiety conquer kit, and reception flow.' },
  { id: 'roadmap', num: '04', title: '4-Week Beginner Roadmap', icon: Calendar, badge: 'Milestones', desc: 'Week-by-week structured progression timeline with interactive tracking.' },
  { id: 'safety', num: '05', title: 'Safety & DOs / DON\'Ts', icon: ShieldCheck, badge: 'Crucial Rules', desc: 'Injury prevention, gym etiquette, re-racking rules, and emergency guidelines.' },
  { id: 'equipment', num: '06', title: 'Equipment & Machines', icon: Cpu, badge: '16+ Machines', desc: 'Seat height adjustments, pin settings, weight guides, and form tips.' },
  { id: 'warmup', num: '07', title: 'Warm-up & Cool-down', icon: Flame, badge: 'Mobility', desc: 'Dynamic mobility routines, cardio warm-ups, and static recovery stretches.' },
  { id: 'workout', num: '08', title: 'Beginner Workout Plans', icon: Dumbbell, badge: '4 Routines', desc: 'Tested 30–45 min splits (Full Body, Upper/Lower, PPL) with sets and reps.' },
  { id: 'nutrition', num: '09', title: 'Nutrition & Hydration', icon: Apple, badge: 'Fuel Science', desc: 'Macro calculations, pre/post workout meals, and supplement guidance.' },
  { id: 'recovery', num: '10', title: 'Sleep & Muscle Recovery', icon: MoonStar, badge: 'Rest Protocol', desc: 'Managing muscle soreness (DOMS), sleep hygiene, and active recovery days.' },
  { id: 'tracker', num: '11', title: 'Workout Tracker & Logger', icon: ClipboardList, badge: 'Logging', desc: 'Log exercises, track progressive overload, RPE ratings, and volume stats.' },
  { id: 'checklist', num: '12', title: 'Daily Beginner Checklist', icon: CheckCircle2, badge: '20 Tasks', desc: 'Interactive preparation checklist for gym bag, nutrition, and mindset.' },
  { id: 'gym-pricing', num: '13', title: 'Popular Gyms & Pricing', icon: Building2, badge: 'City Guides', desc: 'Cult.fit, Gold’s Gym, Anytime Fitness fees, photos, and comparison.' },
  { id: 'feedback', num: '14', title: 'Feedback & Member Reviews', icon: MessageSquareHeart, badge: 'Community', desc: 'Share your feedback, rate features, and read beginner testimonials.' }
];

export const HomeSection = () => {
  const {
    navigateTo,
    checklist,
    workoutLogs,
    roadmapMilestones,
    wizardCompleted,
    openSearchModal
  } = useApp();

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    if (isDragging || isFlipping) return;
    const timer = setInterval(() => {
      turnPage('next');
    }, 2800);
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
    }, 450);
  };

  const nextHeroSlide = (e) => {
    if (e) e.stopPropagation();
    turnPage('next');
  };

  const prevHeroSlide = (e) => {
    if (e) e.stopPropagation();
    turnPage('prev');
  };

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
    if (diff < 120 && diff > -260) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      turnPage('next');
    } else if (dragOffset > 50) {
      turnPage('prev');
    } else {
      setDragOffset(0);
    }
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    playClickBeep();
  };

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecklistCount / 20) * 100);

  const completedRoadmapCount = Object.values(roadmapMilestones).filter(Boolean).length;
  const roadmapPercent = Math.round((completedRoadmapCount / 20) * 100);

  const totalLogs = workoutLogs.length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Motivational Daily Fuel Ribbon */}
      <div
        onClick={nextQuote}
        className="card card-hover"
        style={{
          background: 'var(--bg-card-secondary)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          cursor: 'pointer'
        }}
        title="Click to shuffle daily fitness motivation"
      >
        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
          {MOTIVATIONAL_QUOTES[quoteIndex].left}
        </span>
        <span style={{
          fontSize: '0.88rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          lineHeight: 1.45,
          textAlign: 'center',
          minWidth: 0
        }}>
          "{MOTIVATIONAL_QUOTES[quoteIndex].text}"
        </span>
        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
          {MOTIVATIONAL_QUOTES[quoteIndex].right}
        </span>
      </div>

      {/* Hero Banner with Clean Navy & Cyan Aesthetics */}
      <div
        className="card card-glow-cyan"
        style={{
          padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-card)'
        }}
      >
        <div className="hero-banner-grid">
          {/* Left Column: Text & CTAs */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan">
                <Sparkles size={13} /> Day 1 Gym Companion
              </span>
              <span className="badge badge-neutral">
                Beginner Friendly
              </span>
              {wizardCompleted && (
                <span className="badge badge-cyan">
                  <Trophy size={13} /> Certified Ready
                </span>
              )}
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem',
              lineHeight: 1.2
            }}>
              Master Your First Day at the Gym with <br />
              <span style={{ color: '#06B6D4' }}>Zero Guesswork & Full Confidence.</span>
            </h1>

            <p style={{
              fontSize: '0.98rem',
              color: 'var(--text-muted)',
              marginBottom: '1.35rem',
              lineHeight: 1.6
            }}>
              No intimidating jargon, no confusion over machines. GymSetup gives you the complete blueprint — from packing your bag and adjusting seat pins to logging your first confident workout.
            </p>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem', width: '100%' }}>
              <button
                onClick={() => navigateTo('guided-flow')}
                className="btn btn-primary btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: '1 1 190px' }}
              >
                <Sparkles size={17} />
                <span>Start Guided Journey</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => navigateTo('first-day')}
                className="btn btn-secondary btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: '1 1 170px' }}
              >
                <Compass size={17} />
                <span>First Day Guide</span>
              </button>
            </div>

            {/* Interactive Live Search Trigger Bar in Hero */}
            <div
              onClick={() => openSearchModal()}
              style={{
                cursor: 'pointer',
                background: 'var(--bg-card-secondary)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)',
                gap: '0.65rem',
                minWidth: 0,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
                <Search size={16} color="#06B6D4" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Search any gym machine, exercise, or routine...
                </span>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem', padding: '0.12rem 0.5rem', flexShrink: 0 }}>
                Explore 🔍
              </span>
            </div>
          </div>

          {/* Right Column: 3D Visual Carousel */}
          <div className="hero-photo-wrapper">
            <div
              className="book-perspective hero-photo-card"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              style={{
                boxShadow: isDragging ? '0 12px 30px rgba(0,0,0,0.5)' : 'var(--shadow-md)',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              {/* Underneath Next Slide */}
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

              {/* Active Turning Page */}
              {(() => {
                const currentSlide = HERO_SLIDES[heroSlideIndex];
                
                let rotateY = 0;
                let transition = 'none';

                if (isDragging) {
                  const dragPercent = Math.max(-1, Math.min(0.5, dragOffset / 260));
                  rotateY = dragPercent * 180;
                } else if (isFlipping) {
                  rotateY = flipDirection === 'next' ? -180 : 180;
                  transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.4, 1)';
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
                      willChange: 'transform'
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
                        backgroundColor: 'var(--bg-card)'
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
                    </div>

                    {/* Back Face of Page */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'var(--bg-app)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        color: 'var(--text-muted)',
                        overflow: 'hidden'
                      }}
                    >
                      <Dumbbell size={32} color="var(--primary-cyan)" style={{ opacity: 0.6, marginBottom: '0.4rem' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#06B6D4', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.05) 40%, rgba(15, 23, 42, 0.92) 100%)',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              />

              {/* Top Dynamic Muscle Badge & Page Number */}
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
                    padding: '0.22rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#06B6D4',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '75%'
                  }}
                >
                  <Flame size={12} color="#06B6D4" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {HERO_SLIDES[heroSlideIndex].topBadge}
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-card)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    color: '#94A3B8',
                    fontSize: '0.64rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {heroSlideIndex + 1}/6
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={prevHeroSlide}
                aria-label="Previous Slide"
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '48%',
                  transform: 'translateY(-50%)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid var(--border-card)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 7
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={nextHeroSlide}
                aria-label="Next Slide"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '48%',
                  transform: 'translateY(-50%)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid var(--border-card)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 7
                }}
              >
                <ChevronRight size={16} />
              </button>

              {/* Bottom Slide Metadata */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(15, 23, 42, 0.94)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.55rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  zIndex: 7,
                  backdropFilter: 'blur(8px)',
                  minWidth: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        background: 'rgba(6, 182, 212, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#06B6D4',
                        flexShrink: 0
                      }}
                    >
                      {React.createElement(HERO_SLIDES[heroSlideIndex].icon, { size: 14 })}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {HERO_SLIDES[heroSlideIndex].title}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: '#06B6D4', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {HERO_SLIDES[heroSlideIndex].subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-cyan" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem', flexShrink: 0 }}>
                    {HERO_SLIDES[heroSlideIndex].tag}
                  </span>
                </div>

                {/* Indicator Dots */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
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
                        aria-label={`Slide ${dotIdx + 1}`}
                        style={{
                          height: '4px',
                          width: isDotActive ? '16px' : '4px',
                          borderRadius: '9999px',
                          background: isDotActive ? '#06B6D4' : 'rgba(255, 255, 255, 0.25)',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
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
        {/* Checklist Metric */}
        <div
          onClick={() => navigateTo('checklist')}
          className="card card-hover"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(6, 182, 212, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06B6D4'
              }}>
                <CheckCircle2 size={20} />
              </div>
              <span className="badge badge-cyan">
                {checklistPercent}% Done
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Daily Preparation
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              {completedChecklistCount} of 20 checklist items completed.
            </p>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#06B6D4', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>Review Checklist</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Roadmap Metric */}
        <div
          onClick={() => navigateTo('roadmap')}
          className="card card-hover"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(6, 182, 212, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06B6D4'
              }}>
                <Calendar size={20} />
              </div>
              <span className="badge badge-cyan">
                {roadmapPercent}% Milestone
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              4-Week Roadmap
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              {completedRoadmapCount} of 20 progression milestones checked.
            </p>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#06B6D4', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>View 4-Week Plan</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Workout Logger Metric */}
        <div
          onClick={() => navigateTo('tracker')}
          className="card card-hover"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(6, 182, 212, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06B6D4'
              }}>
                <ClipboardList size={20} />
              </div>
              <span className="badge badge-cyan">
                {totalLogs} Logged Sets
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Workout Logger
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Track weights, reps, and RPE for progressive overload.
            </p>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#06B6D4', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>Open Tracker</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Sections Catalog Directory Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              All 14 Modules & Knowledge Centers
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Everything a beginner needs to know, organized step-by-step.
            </p>
          </div>
        </div>

        <div className="grid-3">
          {SECTIONS_CATALOG.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => navigateTo(sec.id)}
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--bg-card-secondary)',
                      border: '1px solid var(--border-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#06B6D4'
                    }}>
                      <Icon size={18} />
                    </div>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {sec.badge}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#06B6D4' }}>{sec.num}.</span>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700 }}>{sec.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {sec.desc}
                  </p>
                </div>

                <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#06B6D4', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span>Open Section</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
