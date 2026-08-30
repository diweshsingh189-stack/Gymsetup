import React, { useState } from 'react';
import { SAFETY_DOS_AND_DONTS, WHEN_TO_STOP_SIGNS, FORM_TRAPS } from '../data/safetyData';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, AlertOctagon, HelpCircle } from 'lucide-react';

export const SafetySection = () => {
  const [selectedTrap, setSelectedTrap] = useState(FORM_TRAPS[0].id);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-rose" style={{ marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} /> Section 4 of 11 — Crucial
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Gym Safety & Form Mastery
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Lifting weights is one of the safest activities in the world when done with proper technique. Learn the golden safety rules, how to recognize red flags, and how to fix common form traps.
          </p>
        </div>
      </div>

      {/* Red Flags / When to Stop Alert Bar */}
      <div className="card" style={{ border: '1px solid rgba(244, 63, 94, 0.35)', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(19, 29, 49, 0.7) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <AlertOctagon size={24} color="#f43f5e" />
          <h2 style={{ fontSize: '1.35rem', color: '#f43f5e' }}>When to Stop: Physical Red Flags</h2>
        </div>

        <div className="grid-2">
          {WHEN_TO_STOP_SIGNS.map((sign, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-rose" style={{ fontSize: '0.75rem' }}>STOP IMMEDIATELY</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{sign.title}</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{sign.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DOs and DON'Ts Dual Grid */}
      <div className="grid-2">
        {/* DOs Card */}
        <div className="card" style={{ borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <CheckCircle size={22} color="#10b981" />
            <h3 style={{ fontSize: '1.3rem', color: '#10b981' }}>The Golden DOs</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SAFETY_DOS_AND_DONTS.dos.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                  ✓ {item.title}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DON'Ts Card */}
        <div className="card" style={{ borderTop: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <XCircle size={22} color="#f43f5e" />
            <h3 style={{ fontSize: '1.3rem', color: '#f43f5e' }}>The Golden DON'Ts</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SAFETY_DOS_AND_DONTS.donts.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', color: '#f43f5e' }}>
                  ✗ {item.title}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 Common Beginner Form Traps Explorer */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Interactive Form Lab</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>6 Common Beginner Form Traps & Fixes</h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
            Select an exercise below to see the common mistake and how to correct it immediately.
          </p>
        </div>

        {/* Trap Buttons Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {FORM_TRAPS.map((trap) => {
            const isSelected = selectedTrap === trap.id;
            return (
              <button
                key={trap.id}
                onClick={() => setSelectedTrap(trap.id)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '9999px', fontSize: '0.85rem' }}
              >
                {trap.exercise.split(' ')[0]}: {trap.trapName.split('(')[0]}
              </button>
            );
          })}
        </div>

        {/* Trap Comparison Card */}
        {FORM_TRAPS.filter(t => t.id === selectedTrap).map((trap) => (
          <div key={trap.id} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{trap.exercise}</h3>
                <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.95rem' }}>Trap: {trap.trapName}</div>
              </div>
              <span className="badge badge-rose" style={{ padding: '0.35rem 0.75rem' }}>
                Risk: {trap.danger}
              </span>
            </div>

            <div className="grid-2" style={{ marginTop: '0.5rem' }}>
              <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <XCircle size={20} /> The Mistake (DON'T)
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{trap.wrongWay}</p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={20} /> The Fix (DO)
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{trap.rightWay}</p>
              </div>
            </div>

            {/* Mental Coaching Cue */}
            <div style={{ background: 'var(--bg-card-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.875rem' }}>🧠 PRO CUE:</span>
              <span style={{ fontSize: '0.925rem', fontStyle: 'italic' }}>"{trap.cue}"</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
