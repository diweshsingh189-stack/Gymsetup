import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WARMUP_EXERCISES, COOLDOWN_EXERCISES } from '../data/warmupData';
import { Flame, MoonStar, Timer, Play } from 'lucide-react';

export const WarmupSection = () => {
  const { openTimer } = useApp();
  const [activeTab, setActiveTab] = useState('warmup');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <Flame size={13} /> Section 7 of 14 — Mobility & Injury Prevention
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Warm-up & Cool-down Routine
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Just 5 minutes of dynamic warm-up lubricates your joints and elevates strength output by up to 15%. Finish with 5 minutes of static stretches to switch your nervous system into recovery mode.
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('warmup')}
          className={`btn ${activeTab === 'warmup' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', fontSize: '0.84rem' }}
        >
          <Flame size={15} />
          <span>Pre-Workout Warm-up (5 Mins)</span>
        </button>

        <button
          onClick={() => setActiveTab('cooldown')}
          className={`btn ${activeTab === 'cooldown' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', fontSize: '0.84rem' }}
        >
          <MoonStar size={15} />
          <span>Post-Workout Cool-down (5 Mins)</span>
        </button>
      </div>

      {/* Warmup List */}
      {activeTab === 'warmup' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ background: 'var(--bg-card-secondary)', border: '1px solid var(--border-card)', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#06B6D4', marginBottom: '0.2rem' }}>Dynamic Warm-up Philosophy</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Move through active ranges of motion — avoid holding motionless stretches before heavy lifting.</p>
              </div>
              <button
                onClick={() => openTimer(60, 'Dynamic Movement Timer (60s)')}
                className="btn btn-primary btn-sm"
              >
                <Timer size={15} />
                <span>Launch 60s Interval Timer</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {WARMUP_EXERCISES.map((item) => (
              <div key={item.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                      {item.symbol || '🤸‍♂️'}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.name}</h4>
                      <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>Target: {item.target}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.74rem' }}>{item.duration}</span>
                    <button
                      onClick={() => openTimer(45, `${item.name} (45s)`)}
                      className="btn btn-secondary btn-icon"
                      title="Start 45s timer for this exercise"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Play size={13} color="#06B6D4" />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#06B6D4' }}>Execution: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.howTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooldown List */}
      {activeTab === 'cooldown' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ background: 'var(--bg-card-secondary)', border: '1px solid var(--border-card)', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#06B6D4', marginBottom: '0.2rem' }}>Static Stretch Philosophy</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Hold comfortable stretches for 30–60 seconds without bouncing to calm the nervous system.</p>
              </div>
              <button
                onClick={() => openTimer(45, 'Static Stretch Timer (45s)')}
                className="btn btn-primary btn-sm"
              >
                <Timer size={15} />
                <span>Launch 45s Stretch Timer</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {COOLDOWN_EXERCISES.map((item) => (
              <div key={item.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                      {item.symbol || '🧘'}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.name}</h4>
                      <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>Target: {item.target}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.74rem' }}>{item.duration}</span>
                    <button
                      onClick={() => openTimer(45, `${item.name} (45s)`)}
                      className="btn btn-secondary btn-icon"
                      title="Start 45s timer for this stretch"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Play size={13} color="#06B6D4" />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#06B6D4' }}>Execution: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.howTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
