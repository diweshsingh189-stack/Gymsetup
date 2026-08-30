import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROADMAP_PHASES } from '../data/roadmapData';
import { Milestone, CheckCircle2, Circle, Sparkles, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

export const RoadmapSection = () => {
  const { roadmapMilestones, toggleRoadmapMilestone, navigateTo } = useApp();
  const [selectedPhase, setSelectedPhase] = useState('day-1');

  const totalMilestones = ROADMAP_PHASES.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = Object.values(roadmapMilestones).filter(Boolean).length;
  const overallPercent = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <Milestone size={14} /> Section 3 of 11
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Beginner Progression Roadmap
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            A structured path from your very first workout to building an unshakable fitness habit. Track your milestones and watch yourself evolve.
          </p>

          {/* Progress bar */}
          <div style={{ marginTop: '1.5rem', background: 'var(--bg-card-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600 }}>Overall Roadmap Completion</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>{completedMilestones} / {totalMilestones} Milestones ({overallPercent}%)</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-card)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${overallPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid-4">
        {ROADMAP_PHASES.map((phase) => {
          const isSelected = selectedPhase === phase.phaseId;
          const phaseDoneCount = phase.milestones.filter(m => roadmapMilestones[m.id]).length;
          const isPhaseFullyDone = phaseDoneCount === phase.milestones.length;

          return (
            <button
              key={phase.phaseId}
              onClick={() => setSelectedPhase(phase.phaseId)}
              className="card card-hover"
              style={{
                textAlign: 'left',
                border: isSelected ? '2px solid #10b981' : '1px solid var(--border-card)',
                background: isSelected ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)' : 'var(--bg-card)',
                padding: '1.25rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={`badge ${isSelected ? 'badge-emerald' : 'badge-cyan'}`} style={{ fontSize: '0.75rem' }}>
                  {phase.badge}
                </span>
                {isPhaseFullyDone && <CheckCircle2 size={16} color="#10b981" />}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{phase.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{phaseDoneCount} of {phase.milestones.length} Done</p>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Detail View */}
      {ROADMAP_PHASES.filter(p => p.phaseId === selectedPhase).map((phase) => (
        <div key={phase.phaseId} className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                {phase.badge} Deep Dive
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800 }}>{phase.title}</h2>
              <p style={{ fontSize: '1rem', color: '#10b981', fontWeight: 600, marginTop: '0.25rem' }}>
                Focus: {phase.focus}
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {phase.goalDescription}
          </div>

          {/* Milestones Checklist */}
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            Actionable Milestones for {phase.badge}:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {phase.milestones.map((m) => {
              const isChecked = !!roadmapMilestones[m.id];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleRoadmapMilestone(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                    border: `1px solid ${isChecked ? 'rgba(16, 185, 129, 0.35)' : 'var(--border-card)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isChecked ? '#10b981' : 'transparent',
                    border: `2px solid ${isChecked ? '#10b981' : 'var(--text-muted)'}`,
                    color: '#ffffff',
                    flexShrink: 0
                  }}>
                    {isChecked && <CheckCircle2 size={16} />}
                  </div>

                  <span style={{
                    fontSize: '0.95rem',
                    color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    flex: 1
                  }}>
                    {m.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Golden Rule banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Sparkles size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
                Key Mindset
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {phase.goldenRule}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
