import React, { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';

const MOTIVATIONAL_QUOTES = [
  { left: '🔥', text: 'Consistency beats motivation every single day. Just show up and give your best!', right: '🏆' },
  { left: '⚡', text: 'Every expert was once a beginner. Step in with confidence, lift with purpose!', right: '💪' },
  { left: '🌟', text: 'Your only competition is who you were yesterday. Keep building, champion!', right: '🚀' },
  { left: '🎯', text: 'Small daily disciplines repeated over time lead to monumental fitness transformations.', right: '🔥' },
  { left: '🛡️', text: 'Form first, ego never. Train smart, stay safe, and enjoy every rep!', right: '⚡' }
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

          {/* Right Column: Clean Physique Photo Frame */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                height: '460px',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img
                src="/hero_physique.jpg"
                alt="Gym Beginner Form and Muscular Definition"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 16%',
                  display: 'block'
                }}
              />

              {/* Gradient Vignette for Text Contrast */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(9, 13, 22, 0.85) 100%)'
              }} />

              {/* Top Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(15, 23, 42, 0.9)',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#10b981',
                fontSize: '0.72rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                zIndex: 3
              }}>
                <Flame size={13} color="#10b981" />
                <span>BICEPS • FOREARMS • SHOULDERS</span>
              </div>

              {/* Bottom Stat Card */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                right: '10px',
                background: 'rgba(15, 23, 42, 0.92)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '0.6rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 3
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    flexShrink: 0
                  }}>
                    <Dumbbell size={15} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Full Body Muscular Definition
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Delts, Biceps & Forearms
                    </div>
                  </div>
                </div>

                <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', flexShrink: 0 }}>
                  Form Mastery
                </span>
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
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06b6d4'
              }}>
                <Calendar size={22} />
              </div>
              <span className="badge badge-cyan">
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
              <div className="progress-bar-cyan" style={{ width: `${roadmapPercent}%` }}></div>
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
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b'
              }}>
                <Dumbbell size={22} />
              </div>
              <span className="badge badge-amber">
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

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600 }}>
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
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#06b6d4', marginBottom: '0.35rem' }}>
              2. Consistency Beats Intensity
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              An easy 25-minute workout 3 times a week beats a grueling 2-hour workout that leaves you unable to walk for 6 days.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f59e0b', marginBottom: '0.35rem' }}>
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
            { id: 'roadmap', title: 'Roadmap & Milestones', desc: 'Day 1 to Month 2+ path', icon: Calendar, color: '#06b6d4' },
            { id: 'safety', title: 'Safety & Form Traps', desc: 'DOs/DON\'Ts and red flags', icon: ShieldCheck, color: '#f43f5e' },
            { id: 'equipment', title: 'Equipment Explorer', desc: 'Pins, adjustments & how-tos', icon: Zap, color: '#8b5cf6' },
            { id: 'warmup', title: 'Warm-up & Cooldown', desc: 'Dynamic moves + rest timer', icon: Flame, color: '#f59e0b' },
            { id: 'workout', title: 'Beginner Workouts', desc: 'Full Body & 20-min express', icon: Dumbbell, color: '#10b981' },
            { id: 'nutrition', title: 'Simple Nutrition', desc: 'Macros & protein calculator', icon: Heart, color: '#06b6d4' },
            { id: 'recovery', title: 'Rest & Recovery', desc: 'DOMS survival & sleep guide', icon: Clock, color: '#8b5cf6' },
            { id: 'gym-pricing', title: 'Top Gyms & Pricing', desc: 'Cult.fit, Gold\'s, Anytime & fees', icon: Building2, color: '#10b981' },
            { id: 'feedback', title: 'Member Feedback', desc: 'Submit reviews, ratings & thoughts', icon: MessageSquareHeart, color: '#f43f5e' }
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
                  background: `${item.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
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
