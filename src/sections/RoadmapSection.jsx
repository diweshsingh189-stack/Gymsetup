import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROADMAP_PHASES } from '../data/roadmapData';
import { Milestone, CheckCircle2, Sparkles, Trophy, ArrowRight } from 'lucide-react';

export const RoadmapSection = () => {
  const { roadmapMilestones, toggleRoadmapMilestone, navigateTo } = useApp();
  const [selectedPhase, setSelectedPhase] = useState('day-1');

  const totalMilestones = ROADMAP_PHASES.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = Object.values(roadmapMilestones).filter(Boolean).length;
  const overallPercent = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <Milestone size={13} /> Section 4 of 14 — 4-Week Progression Roadmap
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Beginner Progression Roadmap
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            A structured path from your very first workout to building an unbreakable fitness habit. Check off each milestone as you progress.
          </p>

          {/* Progress bar */}
          <div style={{ marginTop: '1.25rem', background: 'var(--bg-app)', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.84rem' }}>
              <span style={{ fontWeight: 600 }}>Overall Roadmap Completion</span>
              <span style={{ fontWeight: 700, color: '#06B6D4' }}>{completedMilestones} / {totalMilestones} Milestones ({overallPercent}%)</span>
            </div>
            <div style={{ width: '100%', height: '7px', background: 'var(--border-card)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: `${overallPercent}%`, height: '100%', background: '#06B6D4', transition: 'width 0.3s' }} />
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
                border: isSelected ? '1px solid #06B6D4' : '1px solid var(--border-card)',
                background: isSelected ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-card)',
                padding: '1.15rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <span className={`badge ${isSelected ? 'badge-cyan' : 'badge-neutral'}`} style={{ fontSize: '0.72rem' }}>
                  {phase.badge}
                </span>
                {isPhaseFullyDone && <CheckCircle2 size={15} color="#06B6D4" />}
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.2rem' }}>{phase.title}</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{phaseDoneCount} of {phase.milestones.length} Done</p>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Detail View */}
      {ROADMAP_PHASES.filter(p => p.phaseId === selectedPhase).map((phase) => (
        <div key={phase.phaseId} className="card" style={{ padding: '1.75rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
                {phase.badge} Milestones
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>{phase.title}</h2>
              <p style={{ fontSize: '0.9rem', color: '#06B6D4', fontWeight: 600, marginTop: '0.2rem' }}>
                Focus: {phase.focus}
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-app)', padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.55 }}>
            {phase.goalDescription}
          </div>

          {/* Milestones Checklist */}
          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.85rem' }}>
            Actionable Milestones for {phase.badge}:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
            {phase.milestones.map((m) => {
              const isChecked = !!roadmapMilestones[m.id];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleRoadmapMilestone(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isChecked ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-app)',
                    border: `1px solid ${isChecked ? 'rgba(6, 182, 212, 0.35)' : 'var(--border-card)'}`,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isChecked ? 'var(--primary-cyan)' : 'transparent',
                    border: `2px solid ${isChecked ? 'var(--primary-cyan)' : 'var(--text-subtle)'}`,
                    color: '#ffffff',
                    flexShrink: 0
                  }}>
                    {isChecked && <CheckCircle2 size={15} strokeWidth={3} />}
                  </div>

                  <span style={{
                    fontSize: '0.88rem',
                    color: isChecked ? 'var(--text-main)' : 'var(--text-secondary)',
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
            background: 'var(--bg-card-secondary)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <Sparkles size={20} color="#06B6D4" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#06B6D4', textTransform: 'uppercase' }}>
                Key Mindset
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {phase.goldenRule}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
