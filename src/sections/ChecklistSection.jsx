import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHECKLIST_PHASES } from '../data/checklistData';
import { CheckCircle2, Circle, RotateCcw, Package, Activity, MoonStar, Sparkles, Trophy } from 'lucide-react';
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <CheckCircle2 size={14} /> Section 11 of 11 — Interactive
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Beginner Gym Checklist
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Never forget your lock, shoes, water, or cool-down routine again. Check items off as you prepare, train, and recover.
          </p>

          {/* Progress Box */}
          <div style={{ marginTop: '1.5rem', background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={18} color="#f59e0b" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Workout Readiness Score</span>
              </div>
              <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>
                {completedItems} / {totalItems} Done ({overallPercentage}%)
              </span>
            </div>

            <div style={{ width: '100%', height: '10px', background: 'var(--border-card)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${overallPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveFilter('all')}
            className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '9999px' }}
          >
            All Phases ({totalItems})
          </button>
          {CHECKLIST_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActiveFilter(phase.id)}
              className={`btn btn-sm ${activeFilter === phase.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '9999px' }}
            >
              {phase.name.split(' ')[0]} ({phase.items.length})
            </button>
          ))}
        </div>

        <button onClick={resetChecklist} className="btn btn-secondary btn-sm" style={{ color: '#f43f5e' }}>
          <RotateCcw size={14} />
          <span>Reset Checklist</span>
        </button>
      </div>

      {/* Checklist Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {CHECKLIST_PHASES.filter(p => activeFilter === 'all' || p.id === activeFilter).map((phase) => {
          const PhaseIcon = ICON_MAP[phase.iconName] || Package;
          const phaseDoneCount = phase.items.filter(i => checklist[i.id]).length;

          return (
            <div key={phase.id} className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhaseIcon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{phase.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {phaseDoneCount} of {phase.items.length} items checked
                    </div>
                  </div>
                </div>

                <span className={`badge ${phaseDoneCount === phase.items.length ? 'badge-emerald' : 'badge-cyan'}`}>
                  {phaseDoneCount === phase.items.length ? '✓ Phase Complete' : `${phaseDoneCount}/${phase.items.length}`}
                </span>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
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
                        padding: '0.9rem 1.15rem',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card-secondary)',
                        border: `1px solid ${isChecked ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isChecked ? '#10b981' : 'transparent',
                          border: `2px solid ${isChecked ? '#10b981' : 'var(--text-muted)'}`,
                          color: '#fff',
                          flexShrink: 0
                        }}>
                          {isChecked && <CheckCircle2 size={15} />}
                        </div>

                        <span style={{
                          fontSize: '0.925rem',
                          fontWeight: isChecked ? 600 : 500,
                          color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}>
                          {item.label}
                        </span>
                      </div>

                      {item.essential && (
                        <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>
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
