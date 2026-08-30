import React from 'react';
import { useApp } from '../context/AppContext';
import { MoonStar, Bed, Heart, Flame, ShieldCheck, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export const RecoverySection = () => {
  const { navigateTo } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-violet" style={{ marginBottom: '0.75rem' }}>
            <MoonStar size={14} /> Section 9 of 11
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Recovery, Sleep & Rest Days
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Muscles don't grow while you are working out in the gym — they grow while you rest, sleep, and eat. Learn how to recover quickly and manage muscle soreness like a pro.
          </p>
        </div>
      </div>

      {/* The DOMS Survival Kit */}
      <div className="card card-glow-cyan" style={{ border: '1px solid rgba(6, 182, 212, 0.35)', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Zap size={24} color="#06b6d4" />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Understanding DOMS (Delayed Onset Muscle Soreness)</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Why do my legs feel like jelly 24–48 hours after Day 1?</p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1rem', marginTop: '1rem' }}>
          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: '#06b6d4', fontSize: '1rem', marginBottom: '0.35rem' }}>What is DOMS?</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Lifting weights causes microscopic, harmless tears in muscle fibers. Your body repairs them to become stronger and thicker.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: '#10b981', fontSize: '1rem', marginBottom: '0.35rem' }}>The Peak Soreness Window</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Soreness peaks around 36 to 48 hours after your session. It gradually subsides as your body adapts over 2–3 weeks.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: '#f59e0b', fontSize: '1rem', marginBottom: '0.35rem' }}>How to Relieve DOMS</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              A brisk 20-minute walk, warm shower or Epsom salt bath, and drinking 3L of water dramatically speed up blood flow and relief.
            </p>
          </div>
        </div>
      </div>

      {/* Sleep: The Ultimate Anabolic State */}
      <div className="grid-2">
        <div className="card" style={{ borderTop: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bed size={22} color="#8b5cf6" />
            <h3 style={{ fontSize: '1.25rem' }}>Sleep Hygiene Blueprint</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            {[
              { title: '7.5 – 8.5 Hours of Sleep', desc: 'Over 95% of human growth hormone (HGH) release and muscle tissue protein synthesis occurs during deep sleep.' },
              { title: 'Cool, Dark Bedroom (18–20°C)', desc: 'Lower room temperature accelerates sleep onset and increases restorative REM cycles.' },
              { title: 'No Screens 45 Mins Before Bed', desc: 'Blue light from phones suppresses melatonin. Read a physical book or listen to calming audio instead.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: '#8b5cf6' }}>{item.title}</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Rest Day Ideas */}
        <div className="card" style={{ borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Heart size={22} color="#10b981" />
            <h3 style={{ fontSize: '1.25rem' }}>What to Do on Rest Days</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            {[
              { title: 'Low-Intensity Outdoor Walking', desc: 'Aim for 6,000–8,000 steps in natural daylight to stimulate lymphatic drainage without taxing muscles.' },
              { title: '10-Minute Gentle Yoga / Mobility', desc: 'Work on hip openers, hamstring mobility, and thoracic spine extensions.' },
              { title: 'Proper Nutrition Consistency', desc: 'Keep protein and water intake high even on days you do not go to the gym.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: '#10b981' }}>{item.title}</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Ready to track your rest and sessions?</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Keep track of your workout volume to avoid overtraining.</p>
        </div>
        <button onClick={() => navigateTo('tracker')} className="btn btn-primary">
          <span>Go to Workout Tracker</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
