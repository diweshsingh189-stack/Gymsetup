import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORKOUT_ROUTINES } from '../data/workoutsData';
import { Dumbbell, Clock, PlusCircle, ChevronRight, Sparkles, Timer } from 'lucide-react';

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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <Dumbbell size={13} /> Section 8 of 14 — Beginner Routines
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Beginner Workout Planner
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Structured workout routines designed specifically for the beginner nervous system. Clean, effective 30–45 minute plans with clear sets, reps, and rest intervals.
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
                border: isSelected ? '1px solid #06B6D4' : '1px solid var(--border-card)',
                background: isSelected ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-card)',
                padding: '1.15rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {routine.tag}
                </span>
                <span style={{ fontSize: '1.2rem' }}>{routine.symbol || '🏋️'}</span>
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.2rem' }}>{routine.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                <Clock size={12} />
                <span>{routine.duration}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Routine Detailed View */}
      <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-neutral">{currentRoutine.frequency}</span>
              <span className="badge badge-neutral">{currentRoutine.level}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>{currentRoutine.symbol || '🏋️'}</span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>{currentRoutine.title}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{currentRoutine.description}</p>
          </div>

          <button
            onClick={() => openTimer(75, 'Workout Rest Interval')}
            className="btn btn-secondary btn-sm"
          >
            <Timer size={15} color="#06B6D4" />
            <span>Open Rest Timer</span>
          </button>
        </div>

        {/* Goal Box */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Sparkles size={18} color="#06B6D4" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#06B6D4', fontSize: '0.8rem', textTransform: 'uppercase' }}>Workout Focus: </strong>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{currentRoutine.target}</span>
          </div>
        </div>

        {/* Exercises List */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.85rem' }}>Exercises in this Routine:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {currentRoutine.exercises.map((ex, idx) => (
            <div
              key={idx}
              className="card card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.15rem 1.25rem',
                flexWrap: 'wrap',
                gap: '0.85rem',
                background: 'var(--bg-app)',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flex: 1, minWidth: 'min(100%, 240px)' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(6, 182, 212, 0.12)',
                  color: '#06B6D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>
                  {ex.symbol || '🏋️'}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 700 }}>{ex.name}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{ex.symbol} {ex.muscle}</span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{ex.sets} Sets × {ex.reps}</span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>⏱️ Rest: {ex.rest}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    💡 <em>{ex.tip}</em>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.15rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.85rem' }}>
          <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Finished this session? View and edit all logged sets in the Workout Logger.
          </span>
          <button onClick={() => navigateTo('tracker')} className="btn btn-secondary btn-sm">
            <span>View Tracker History</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
