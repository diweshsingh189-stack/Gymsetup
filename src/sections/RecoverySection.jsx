import React from 'react';
import { useApp } from '../context/AppContext';
import { MoonStar, Bed, Heart, ArrowRight, Zap } from 'lucide-react';

export const RecoverySection = () => {
  const { navigateTo } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <MoonStar size={13} /> Section 10 of 14 — Sleep & Recovery Science
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Recovery, Sleep & Rest Days
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Muscles don't grow during workouts in the gym — they grow when you rest, sleep, and nourish them. Master recovery strategies and manage muscle soreness like an athlete.
          </p>
        </div>
      </div>

      {/* The DOMS Survival Kit */}
      <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-cyan-tint)', color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>Understanding DOMS (Delayed Onset Muscle Soreness)</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>Why do legs and arms feel sore 24–48 hours after Day 1?</p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: 'var(--primary-cyan)', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 800 }}>What is DOMS?</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Lifting weights creates microscopic, harmless tears in muscle fibers. Your body repairs them during rest to make them stronger.
            </p>
          </div>

          <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: 'var(--primary-cyan)', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 800 }}>Peak Soreness Window</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Soreness peaks around 36 to 48 hours after your session. It gradually subsides as your body adapts over 2–3 weeks.
            </p>
          </div>

          <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: 'var(--primary-cyan)', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 800 }}>How to Relieve DOMS</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              A brisk 20-minute walk, warm shower or Epsom salt bath, and drinking 3L of water dramatically accelerate blood flow and relief.
            </p>
          </div>
        </div>
      </div>

      {/* Sleep: The Ultimate Anabolic State */}
      <div className="grid-2">
        <div className="card" style={{ borderTop: '3px solid var(--primary-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bed size={22} color="var(--primary-cyan)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Sleep Hygiene Blueprint</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { title: '7.5 – 8.5 Hours of Sleep', desc: 'Over 95% of growth hormone release and muscle tissue protein synthesis occurs during deep restorative sleep.' },
              { title: 'Cool, Dark Room (18–20°C)', desc: 'Lower ambient temperature accelerates sleep onset and increases restorative REM cycles.' },
              { title: 'No Screens 45 Mins Before Bed', desc: 'Blue light from phones suppresses melatonin. Read or listen to calming audio instead.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: 'var(--primary-cyan)', fontSize: '1.02rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>{item.title}</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Rest Day Ideas */}
        <div className="card" style={{ borderTop: '3px solid var(--primary-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Heart size={22} color="var(--primary-cyan)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>What to Do on Rest Days</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { title: 'Low-Intensity Outdoor Walking', desc: 'Aim for 6,000–8,000 steps in natural daylight to stimulate blood circulation without taxing muscles.' },
              { title: '10-Minute Gentle Mobility', desc: 'Work on hip openers, hamstring mobility, and thoracic spine extensions.' },
              { title: 'Nutrition & Hydration Consistency', desc: 'Keep protein and water intake high even on non-training recovery days.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: 'var(--primary-cyan)', fontSize: '1.02rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>{item.title}</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <h4 style={{ fontSize: '1.02rem', fontWeight: 700 }}>Ready to track your workouts?</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Keep track of your sets, weights, and rest intervals.</p>
        </div>
        <button onClick={() => navigateTo('tracker')} className="btn btn-primary btn-sm">
          <span>Go to Workout Tracker</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
