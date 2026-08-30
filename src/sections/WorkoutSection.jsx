import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORKOUT_ROUTINES } from '../data/workoutsData';
import { Dumbbell, Clock, Flame, PlusCircle, CheckCircle2, ChevronRight, Sparkles, Timer } from 'lucide-react';

export const WorkoutSection = () => {
  const { addWorkoutLog, navigateTo, openTimer } = useApp();
  const [selectedRoutineId, setSelectedRoutineId] = useState(WORKOUT_ROUTINES[0].id);

  const currentRoutine = WORKOUT_ROUTINES.find(r => r.id === selectedRoutineId) || WORKOUT_ROUTINES[0];

  const handleLogExercise = (exercise) => {
    addWorkoutLog({
      exercise: exercise.name,
      category: exercise.muscle,
      weight: exercise.startingWeight.match(/\d+/)?.[0] || '20',
      unit: 'kg',
      sets: typeof exercise.sets === 'number' ? exercise.sets : 3,
      reps: exercise.reps.match(/\d+/)?.[0] ? parseInt(exercise.reps.match(/\d+/)[0]) : 10,
      rpe: 'Moderate (RPE 7)',
      notes: `${currentRoutine.title} — ${exercise.tip}`
    });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <Dumbbell size={14} /> Section 7 of 11
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Beginner Workout Planner
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Structured, proven workout routines designed specifically for the beginner nervous system. No 2-hour marathons — just clean, effective 30–45 minute plans with clear sets and reps.
          </p>
        </div>
      </div>

      {/* Routine Tabs Selector */}
      <div className="grid-4">
        {WORKOUT_ROUTINES.map((routine) => {
          const isSelected = selectedRoutineId === routine.id;
          return (
            <button
              key={routine.id}
              onClick={() => setSelectedRoutineId(routine.id)}
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
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                  {routine.tag}
                </span>
                <span style={{ fontSize: '1.25rem' }}>{routine.symbol || '🏋️'}</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{routine.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Clock size={13} />
                <span>{routine.duration}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Routine Detailed View */}
      <div className="card" style={{ padding: '2.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-cyan">{currentRoutine.frequency}</span>
              <span className="badge badge-amber">{currentRoutine.level}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.8rem' }}>{currentRoutine.symbol || '🏋️'}</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{currentRoutine.title}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>{currentRoutine.description}</p>
          </div>

          <button
            onClick={() => openTimer(75, 'Workout Rest Interval')}
            className="btn btn-secondary btn-sm"
          >
            <Timer size={16} color="#10b981" />
            <span>Open Rest Timer</span>
          </button>
        </div>

        {/* Goal Box */}
        <div style={{ background: 'var(--bg-card-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={20} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#10b981', fontSize: '0.85rem', textTransform: 'uppercase' }}>Workout Goal: </strong>
            <span style={{ fontSize: '0.925rem' }}>{currentRoutine.target}</span>
          </div>
        </div>

        {/* Exercises List */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Exercises in this Routine:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentRoutine.exercises.map((ex, idx) => (
            <div
              key={idx}
              className="card card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '260px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0
                }}>
                  {ex.symbol || '🏋️'}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{ex.name}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>{ex.symbol} {ex.muscle}</span>
                    <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{ex.sets} Sets × {ex.reps}</span>
                    <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>⏱️ Rest: {ex.rest}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    💡 <em>{ex.tip}</em>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => handleLogExercise(ex)}
                  className="btn btn-primary btn-sm"
                >
                  <PlusCircle size={15} />
                  <span>Log Set</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Shortcut */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Finished this session? Don't forget to track your weights in the Workout Tracker.
          </span>
          <button onClick={() => navigateTo('tracker')} className="btn btn-secondary">
            <span>View Full Tracker History</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
