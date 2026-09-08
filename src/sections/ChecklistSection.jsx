import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHECKLIST_PHASES } from '../data/checklistData';
import { CheckCircle2, RotateCcw, Package, Activity, MoonStar, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Package,
  Activity,
  CheckCircle2: MoonStar
};

export const ChecklistSection = () => {
  const { checklist, toggleChecklistItem, resetChecklist } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const totalItems = CHECKLIST_PHASES.reduce((acc, p) => acc + p.items.length, 0);
  const completedItems = Object.values(checklist).filter(Boolean).length;
  const overallPercentage = Math.round((completedItems / totalItems) * 100);

  const handleCheck = (id) => {
    toggleChecklistItem(id);
    if (!checklist[id] && completedItems + 1 === totalItems) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <CheckCircle2 size={13} /> Section 12 of 14 — Daily Preparation Checklist
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Daily Beginner Gym Checklist
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Never forget your lock, shoes, water, or cool-down routine again. Check items off as you prepare at home, train on the gym floor, and recover.
          </p>

          {/* Progress Box */}
          <div style={{ marginTop: '1.25rem', background: 'var(--bg-app)', padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Trophy size={16} color="#06B6D4" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Workout Readiness Score</span>
              </div>
              <span style={{ fontWeight: 800, color: '#06B6D4', fontSize: '1rem' }}>
                {completedItems} / {totalItems} Done ({overallPercentage}%)
              </span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'var(--border-card)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: `${overallPercentage}%`, height: '100%', background: '#06B6D4', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveFilter('all')}
            className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
          >
            All Phases ({totalItems})
          </button>
          {CHECKLIST_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActiveFilter(phase.id)}
              className={`btn btn-sm ${activeFilter === phase.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
            >
              {phase.name.split(' ')[0]} ({phase.items.length})
            </button>
          ))}
        </div>

        <button onClick={resetChecklist} className="btn btn-secondary btn-sm" style={{ color: 'var(--text-muted)' }}>
          <RotateCcw size={13} />
          <span>Reset Checklist</span>
        </button>
      </div>

      {/* Checklist Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {CHECKLIST_PHASES.filter(p => activeFilter === 'all' || p.id === activeFilter).map((phase) => {
          const PhaseIcon = ICON_MAP[phase.iconName] || Package;
          const phaseDoneCount = phase.items.filter(i => checklist[i.id]).length;

          return (
            <div key={phase.id} className="card" style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhaseIcon size={18} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: 'clamp(1.05rem, 3vw, 1.2rem)', fontWeight: 800 }}>{phase.name}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {phaseDoneCount} of {phase.items.length} items checked
                    </div>
                  </div>
                </div>

                <span className={`badge ${phaseDoneCount === phase.items.length ? 'badge-cyan' : 'badge-neutral'}`} style={{ flexShrink: 0 }}>
                  {phaseDoneCount === phase.items.length ? '✓ Completed' : `${phaseDoneCount}/${phase.items.length}`}
                </span>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {phase.items.map((item) => {
                  const isChecked = !!checklist[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCheck(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 0.95rem',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-app)',
                        border: `1px solid ${isChecked ? 'rgba(6, 182, 212, 0.3)' : 'var(--border-card)'}`,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        gap: '0.65rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isChecked ? 'var(--primary-cyan)' : 'transparent',
                          border: `2px solid ${isChecked ? 'var(--primary-cyan)' : 'var(--text-subtle)'}`,
                          color: '#ffffff',
                          flexShrink: 0
                        }}>
                          {isChecked && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>

                        <span style={{
                          fontSize: '0.88rem',
                          fontWeight: isChecked ? 600 : 500,
                          color: isChecked ? 'var(--text-main)' : 'var(--text-secondary)',
                          textDecoration: isChecked ? 'line-through' : 'none',
                          wordBreak: 'break-word',
                          lineHeight: 1.45
                        }}>
                          {item.label}
                        </span>
                      </div>

                      {item.essential && (
                        <span className="badge badge-cyan" style={{ fontSize: '0.66rem', flexShrink: 0 }}>
                          Essential
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
