import React from 'react';
import { useApp } from '../context/AppContext';
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

  // Metrics
  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecklistCount / 20) * 100);

  const completedRoadmapCount = Object.values(roadmapMilestones).filter(Boolean).length;
  const roadmapPercent = Math.round((completedRoadmapCount / 20) * 100);

  const totalLogs = workoutLogs.length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner with Modern Gradient & Trending Bodybuilding Image */}
      <div
        className="card card-glow-emerald gradient-hero-bg"
        style={{
          padding: '2.75rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          background: 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.18) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.14) 0%, transparent 45%), var(--bg-card)'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.85fr)',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="hero-banner-grid">
          {/* Left Column: Text & CTAs */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald">
                <Sparkles size={14} /> Startup-Quality Gym Companion
              </span>
              <span className="badge badge-cyan">
                Zero Intimidation Guarantee
              </span>
              {wizardCompleted && (
                <span className="badge badge-amber">
                  <Trophy size={14} /> Beginner Certified
                </span>
              )}
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              lineHeight: 1.15
            }}>
              Welcome to the Gym. <br />
              <span className="gradient-text-emerald">We Made Day 1 Effortless.</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              marginBottom: '1.75rem',
              lineHeight: 1.6
            }}>
              No body-shaming, no complex jargon, and no confusing equipment. GymSetup is your step-by-step pocket coach from packing your bag to mastering safe, confident workouts.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                onClick={() => navigateTo('guided-flow')}
                className="btn btn-primary btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}
              >
                <Sparkles size={20} />
                <span>Start My Gym Journey</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigateTo('first-day')}
                className="btn btn-secondary btn-lg"
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
                background: 'rgba(11, 17, 32, 0.75)',
                border: '1.5px solid rgba(16, 185, 129, 0.45)',
                borderRadius: '16px',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
                gap: '0.75rem',
                minWidth: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
                <Search size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Search any gym machine, dumbbell exercise, or stretch...
                </span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', flexShrink: 0 }}>
                🔍 All Exercises
              </span>
            </div>
          </div>

          {/* Right Column: Trending Full Physique (Biceps, Forearms & Shoulders) Image Frame */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              className="hero-physique-blink"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                height: '520px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid rgba(16, 185, 129, 0.55)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Ultra-HD Shredded Bodybuilder Physique Image */}
              <img
                src="/hero_physique.jpg"
                alt="Aesthetic Bodybuilder Physique - Biceps, Forearms and Shoulders"
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
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 65%, rgba(9, 13, 22, 0.9) 100%)'
              }} />

              {/* Top Trending Badge - Positioned clearly CENTERED above the head */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid rgba(245, 158, 11, 0.6)',
                color: '#f59e0b',
                fontSize: '0.75rem',
                fontWeight: 800,
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap',
                zIndex: 3
              }}>
                <Flame size={14} fill="#f59e0b" color="#f59e0b" />
                <span>BICEPS • FOREARMS • SHOULDERS</span>
              </div>

              {/* Bottom Stat Card Floating Pill - Positioned lower down so entire torso/chest/arms are visible */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                right: '10px',
                background: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(16, 185, 129, 0.45)',
                borderRadius: '14px',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
                zIndex: 3
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    flexShrink: 0
                  }}>
                    <Dumbbell size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Full Body Muscular Definition
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Delts, Biceps & Vascular Forearms
                    </div>
                  </div>
                </div>

                <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', flexShrink: 0 }}>
                  🔥 Peak Form
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
            height: 380px !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
