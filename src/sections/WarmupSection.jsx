import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WARMUP_EXERCISES, COOLDOWN_EXERCISES } from '../data/warmupData';
import { Flame, MoonStar, Timer, Play, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const WarmupSection = () => {
  const { openTimer } = useApp();
  const [activeTab, setActiveTab] = useState('warmup');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
            <Flame size={14} /> Section 6 of 11
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Warm-up & Cool-down Routine
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Just 5 minutes of dynamic warm-up lubricates your joints and boosts strength output by up to 15%. Finish with 5 minutes of static stretches to switch your nervous system into recovery mode.
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('warmup')}
          className={`btn ${activeTab === 'warmup' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: '9999px', fontSize: '0.9rem' }}
        >
          <Flame size={16} />
          <span>Pre-Workout Dynamic Warm-up (5 Mins)</span>
        </button>

        <button
          onClick={() => setActiveTab('cooldown')}
          className={`btn ${activeTab === 'cooldown' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: '9999px', fontSize: '0.9rem' }}
        >
          <MoonStar size={16} />
          <span>Post-Workout Static Cool-down (5 Mins)</span>
        </button>
      </div>

      {/* Warmup List */}
      {activeTab === 'warmup' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(19, 29, 49, 0.6) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#f59e0b', marginBottom: '0.25rem' }}>Dynamic Warm-up Philosophy</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Move through active ranges of motion — avoid holding motionless stretches before lifting.</p>
              </div>
              <button
                onClick={() => openTimer(60, 'Dynamic Movement Timer (60s)')}
                className="btn btn-primary btn-sm"
              >
                <Timer size={16} />
                <span>Launch 60s Interval Timer</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {WARMUP_EXERCISES.map((item, idx) => (
              <div key={item.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                      {item.symbol || '🤸‍♂️'}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{item.name}</h4>
                      <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Target: {item.target}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-cyan">{item.duration}</span>
                    <button
                      onClick={() => openTimer(45, `${item.name} (45s)`)}
                      className="btn btn-secondary btn-icon"
                      title="Start 45s timer for this exercise"
                      style={{ width: '34px', height: '34px' }}
                    >
                      <Play size={14} color="#10b981" />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                  <strong>How to perform: </strong>
                  <span style={{ color: 'var(--text-muted)' }}>{item.howTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooldown List */}
      {activeTab === 'cooldown' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(19, 29, 49, 0.6) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#8b5cf6', marginBottom: '0.25rem' }}>Static Stretch Philosophy</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hold comfortable stretches for 30–60 seconds without bouncing to release muscle tension.</p>
              </div>
              <button
                onClick={() => openTimer(45, 'Static Stretch Timer (45s)')}
                className="btn btn-primary btn-sm"
              >
                <Timer size={16} />
                <span>Launch 45s Stretch Timer</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {COOLDOWN_EXERCISES.map((item, idx) => (
              <div key={item.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                      {item.symbol || '🧘'}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{item.name}</h4>
                      <span className="badge badge-violet" style={{ fontSize: '0.7rem' }}>Target: {item.target}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-cyan">{item.duration}</span>
                    <button
                      onClick={() => openTimer(45, `${item.name} (45s)`)}
                      className="btn btn-secondary btn-icon"
                      title="Start 45s timer for this stretch"
                      style={{ width: '34px', height: '34px' }}
                    >
                      <Play size={14} color="#8b5cf6" />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                  <strong>How to perform: </strong>
                  <span style={{ color: 'var(--text-muted)' }}>{item.howTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
