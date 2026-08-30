import React, { useState } from 'react';
import { NUTRITION_MACROS, PRE_POST_MEALS, FAD_DIET_MYTHS } from '../data/nutritionData';
import { Apple, Droplet, Flame, Calculator, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const NutritionSection = () => {
  // Calculator State
  const [weightKg, setWeightKg] = useState('70');
  const [goal, setGoal] = useState('maintain'); // 'maintain' | 'muscle' | 'fatloss'

  const numWeight = parseFloat(weightKg) || 70;

  // Multipliers
  let proteinMultiplier = 1.6;
  if (goal === 'muscle') proteinMultiplier = 1.8;
  if (goal === 'fatloss') proteinMultiplier = 2.0;

  const estimatedProtein = Math.round(numWeight * proteinMultiplier);
  const estimatedHydration = (numWeight * 0.035).toFixed(1); // 35ml per kg of bodyweight + workout sweat

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <Apple size={14} /> Section 8 of 11
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Nutrition & Hydration for Beginners
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Fuel your workouts with sustainable whole foods. No starvation diets, zero complicated counting — just simple, energizing nutrition to help your muscles recover and thrive.
          </p>
        </div>
      </div>

      {/* Interactive Protein & Hydration Estimator Calculator */}
      <div className="card card-glow-cyan" style={{ padding: '2rem', border: '1px solid rgba(6, 182, 212, 0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Calculator size={24} color="#06b6d4" />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Beginner Daily Nutrition Estimator</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Get your personalized daily protein & water target in 5 seconds</p>
          </div>
        </div>

        <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem' }}>
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
                style={{ fontSize: '1.1rem', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Your Primary Goal:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { id: 'maintain', label: 'Overall Fitness' },
                  { id: 'muscle', label: 'Build Muscle' },
                  { id: 'fatloss', label: 'Fat Loss' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`btn btn-sm ${goal === g.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid-2" style={{ gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', color: '#10b981' }}>
                <Apple size={28} />
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Daily Protein Target</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                {estimatedProtein}g
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>~{Math.round(estimatedProtein / 3)}g per main meal</div>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', color: '#06b6d4' }}>
                <Droplet size={28} />
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase' }}>Daily Water Target</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                {estimatedHydration}L
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>~4 to 5 standard water bottles</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Macro Pillars */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>The 3 Essential Food Groups</h2>
        <div className="grid-3">
          {NUTRITION_MACROS.map((macro, idx) => (
            <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>{macro.role}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>{macro.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600, marginBottom: '1rem' }}>{macro.tagline}</p>

                <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <strong>Great Sources:</strong>
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {macro.sources.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card-secondary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
                💡 <strong>Beginner Rule: </strong>{macro.beginnerTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre & Post Workout Fuel Ideas */}
      <div className="grid-2">
        <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#f59e0b' }}>Pre-Workout Energy Fuel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PRE_POST_MEALS.preWorkout.map((meal, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{meal.title}</strong>
                  <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>{meal.timing}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{meal.benefits}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10b981' }}>Post-Workout Muscle Recovery</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PRE_POST_MEALS.postWorkout.map((meal, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{meal.title}</strong>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{meal.timing}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{meal.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fad Diet Myths Debunked */}
      <div className="card" style={{ borderLeft: '4px solid #f43f5e' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#f43f5e' }}>Fad Diet Myths Debunked</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAD_DIET_MYTHS.map((m, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ color: '#f43f5e', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                MYTH: {m.myth}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                <strong style={{ color: '#10b981' }}>REALITY: </strong>{m.reality}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
