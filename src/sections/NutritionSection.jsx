import React, { useState } from 'react';
import { NUTRITION_MACROS, PRE_POST_MEALS, FAD_DIET_MYTHS } from '../data/nutritionData';
import { Apple, Droplet, Calculator } from 'lucide-react';

export const NutritionSection = () => {
  // Calculator State
  const [weightKg, setWeightKg] = useState('70');
  const [goal, setGoal] = useState('maintain');

  const numWeight = parseFloat(weightKg) || 70;

  // Multipliers
  let proteinMultiplier = 1.6;
  if (goal === 'muscle') proteinMultiplier = 1.8;
  if (goal === 'fatloss') proteinMultiplier = 2.0;

  const estimatedProtein = Math.round(numWeight * proteinMultiplier);
  const estimatedHydration = (numWeight * 0.035).toFixed(1);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <Apple size={13} /> Section 9 of 14 — Nutrition & Fuel Science
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Nutrition & Hydration for Beginners
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Fuel your workouts with sustainable whole foods. No crash starvation diets, zero complex calculations — just simple, energizing nutrition to build muscle and recover quickly.
          </p>
        </div>
      </div>

      {/* Interactive Protein & Hydration Estimator Calculator */}
      <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Beginner Daily Nutrition Estimator</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Get your personalized daily protein & water target in 5 seconds</p>
          </div>
        </div>

        <div className="grid-2" style={{ alignItems: 'center', gap: '1.5rem' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                Your Body Weight (kg):
              </label>
              <input
                type="number"
                min="35"
                max="200"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="input-control"
                placeholder="70"
                style={{ fontSize: '1.05rem', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                Your Primary Fitness Goal:
              </label>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'maintain', label: 'Overall Fitness' },
                  { id: 'muscle', label: 'Build Muscle' },
                  { id: 'fatloss', label: 'Fat Loss' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`btn btn-sm ${goal === g.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, minWidth: 'min(100%, 80px)', fontSize: '0.78rem' }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid-2" style={{ gap: '0.85rem' }}>
            <div style={{ background: 'var(--primary-cyan-tint)', border: '1px solid var(--primary-cyan-border)', padding: '1.15rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem', color: 'var(--primary-cyan)' }}>
                <Apple size={24} />
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-cyan)', textTransform: 'uppercase' }}>Daily Protein Target</div>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.15rem 0' }}>
                {estimatedProtein}g
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>~{Math.round(estimatedProtein / 3)}g per main meal</div>
            </div>

            <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '1.15rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem', color: 'var(--primary-cyan)' }}>
                <Droplet size={24} />
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-cyan)', textTransform: 'uppercase' }}>Daily Water Target</div>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.15rem 0' }}>
                {estimatedHydration}L
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>~4 to 5 standard water bottles</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Macro Pillars */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem' }}>The 3 Essential Food Groups</h2>
        <div className="grid-3">
          {NUTRITION_MACROS.map((macro, idx) => (
            <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '0.45rem' }}>{macro.role}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>{macro.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--primary-cyan)', fontWeight: 600, marginBottom: '0.85rem' }}>{macro.tagline}</p>

                <div style={{ fontSize: '0.85rem', marginBottom: '0.85rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Recommended Sources:</strong>
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.15rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.84rem' }}>
                    {macro.sources.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                💡 <strong>Beginner Rule: </strong>{macro.beginnerTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre & Post Workout Fuel Ideas */}
      <div className="grid-2">
        <div className="card" style={{ borderTop: '3px solid var(--primary-cyan)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem', color: 'var(--primary-cyan)' }}>Pre-Workout Energy Fuel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {PRE_POST_MEALS.preWorkout.map((meal, idx) => (
              <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{meal.title}</strong>
                  <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>{meal.timing}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{meal.benefits}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderTop: '3px solid var(--primary-cyan)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem', color: 'var(--primary-cyan)' }}>Post-Workout Muscle Recovery</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {PRE_POST_MEALS.postWorkout.map((meal, idx) => (
              <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{meal.title}</strong>
                  <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>{meal.timing}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{meal.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fad Diet Myths Debunked */}
      <div className="card" style={{ borderLeft: '3px solid var(--primary-cyan)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.85rem', color: 'var(--text-main)' }}>Fad Diet Myths Debunked</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAD_DIET_MYTHS.map((m, idx) => (
            <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                MYTH: {m.myth}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--primary-cyan)' }}>REALITY: </strong>{m.reality}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
