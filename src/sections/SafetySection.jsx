import React, { useState } from 'react';
import { SAFETY_DOS_AND_DONTS, WHEN_TO_STOP_SIGNS, FORM_TRAPS } from '../data/safetyData';
import { ShieldCheck, CheckCircle2, XCircle, AlertOctagon } from 'lucide-react';

export const SafetySection = () => {
  const [selectedTrap, setSelectedTrap] = useState(FORM_TRAPS[0].id);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <ShieldCheck size={13} /> Section 5 of 14 — Safety & Form Mastery
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Gym Safety & DOs / DON'Ts
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Weight training is exceptionally safe when executed with controlled technique. Learn the golden safety rules, how to recognize red flags, and how to fix common beginner traps.
          </p>
        </div>
      </div>

      {/* Red Flags / When to Stop Alert Bar */}
      <div className="card" style={{ border: '1px solid var(--border-card)', background: 'var(--bg-card-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <AlertOctagon size={22} color="#06B6D4" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>When to Stop: Physical Red Flags</h2>
        </div>

        <div className="grid-2">
          {WHEN_TO_STOP_SIGNS.map((sign, idx) => (
            <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>STOP IMMEDIATELY</span>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-main)' }}>{sign.title}</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{sign.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DOs and DON'Ts Dual Grid */}
      <div className="grid-2">
        {/* DOs Card */}
        <div className="card" style={{ borderTop: '3px solid #06B6D4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.15rem' }}>
            <CheckCircle2 size={20} color="#06B6D4" />
            <h3 style={{ fontSize: '1.2rem', color: '#06B6D4' }}>The Golden DOs</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SAFETY_DOS_AND_DONTS.dos.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.95rem 1.15rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>
                  ✓ {item.title}
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DON'Ts Card */}
        <div className="card" style={{ borderTop: '3px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.15rem' }}>
            <XCircle size={20} color="var(--text-muted)" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>The Golden DON'Ts</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SAFETY_DOS_AND_DONTS.donts.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.95rem 1.15rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>
                  ✗ {item.title}
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 Common Beginner Form Traps Explorer */}
      <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Interactive Form Lab</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>6 Common Beginner Form Traps & Fixes</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Select an exercise below to see the common mistake and how to correct it immediately.
          </p>
        </div>

        {/* Trap Buttons Selector */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {FORM_TRAPS.map((trap) => {
            const isSelected = selectedTrap === trap.id;
            return (
              <button
                key={trap.id}
                onClick={() => setSelectedTrap(trap.id)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}
              >
                {trap.exercise.split(' ')[0]}: {trap.trapName.split('(')[0]}
              </button>
            );
          })}
        </div>

        {/* Trap Comparison Card */}
        {FORM_TRAPS.filter(t => t.id === selectedTrap).map((trap) => (
          <div key={trap.id} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{trap.exercise}</h3>
                <div style={{ color: '#06B6D4', fontWeight: 600, fontSize: '0.9rem' }}>Trap: {trap.trapName}</div>
              </div>
              <span className="badge badge-neutral" style={{ padding: '0.25rem 0.65rem' }}>
                Risk Level: {trap.danger}
              </span>
            </div>

            <div className="grid-2" style={{ marginTop: '0.35rem' }}>
              <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.45rem' }}>
                  <XCircle size={18} color="var(--text-muted)" /> The Mistake (DON'T)
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{trap.wrongWay}</p>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#06B6D4', fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.45rem' }}>
                  <CheckCircle2 size={18} /> The Fix (DO)
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>{trap.rightWay}</p>
              </div>
            </div>

            {/* Mental Coaching Cue */}
            <div style={{ background: 'var(--bg-card-secondary)', border: '1px solid var(--border-card)', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontWeight: 700, color: '#06B6D4', fontSize: '0.82rem' }}>🧠 COACHING CUE:</span>
              <span style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text-main)' }}>"{trap.cue}"</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
