import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ClipboardList,
  Plus,
  Trash2,
  Calendar,
  Dumbbell,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Sparkles,
  RotateCcw,
  Timer,
  ChevronDown,
  ChevronUp,
  Zap,
  Volume2,
  Info,
  Layers,
  Award
} from 'lucide-react';
import { playSuccessChime, playClickBeep, playTimerComplete } from '../utils/soundEffects';

// 10 Essential Workout Tracking Points & Golden Principles
const TRACKING_10_POINTS = [
  {
    num: 1,
    symbol: '📈',
    title: 'Progressive Overload Protocol',
    category: 'Progression',
    summary: 'The #1 rule of muscle growth. Aim to add 1 rep or +1.25kg to 2.5kg each week.',
    detail: 'Never lift the exact same weight for the exact same reps forever. When you hit 12 clean reps on all 3 sets, increase the weight by the smallest available increment (1.25–2.5 kg) in your next session.'
  },
  {
    num: 2,
    symbol: '🎯',
    title: 'Form First Over Ego Weight',
    category: 'Injury Prevention',
    summary: 'Zero momentum, zero swinging. Only log reps performed with pristine control.',
    detail: 'A set done with bad form does not stimulate target muscle fibers and risks joints. Always log your reps at a controlled 2-second lowering tempo and 1-second pause.'
  },
  {
    num: 3,
    symbol: '⏱️',
    title: 'Rest Interval Consistency',
    category: 'Pacing',
    summary: 'Keep 60s for machine isolations and 90s for heavy compound movements.',
    detail: 'Use the built-in Rest Interval Timer! Resting too little (under 45s) drains your ATP energy, while resting too long (over 3 mins) cools down muscle temperature.'
  },
  {
    num: 4,
    symbol: '📝',
    title: 'Machine Seat & Pin Notations',
    category: 'Setup Efficiency',
    summary: 'Always note your seat hole # (e.g. hole #4) and backrest angle in your log notes.',
    detail: 'Gym machines differ in height and lever length. Writing down "Seat notch #3" ensures you get the exact joint biomechanics every session without guessing.'
  },
  {
    num: 5,
    symbol: '⚡',
    title: 'Warm-Up Sets vs Working Sets',
    category: 'Data Accuracy',
    summary: 'Only log your true Working Sets into your volume tracker, not 5kg warm-up sets.',
    detail: 'Do 1–2 light feeler sets with 40–50% weight to lubricate joints, but only record your full-effort sets (working sets) to keep your progressive overload history clean.'
  },
  {
    num: 6,
    symbol: '🧠',
    title: 'Mind-Muscle Connection & RPE Rating',
    category: 'Effort Metric',
    summary: 'Rate your Rate of Perceived Exertion (RPE 6 to 8) to gauge neuromuscular fatigue.',
    detail: 'RPE 6 = Easy warm-up; RPE 7 = 3 reps left in tank (Sweet spot for beginners); RPE 8 = 2 reps left in tank; RPE 9 = 1 rep in tank. Stay around RPE 7–8 for safe growth.'
  },
  {
    num: 7,
    symbol: '⚖️',
    title: 'Unilateral Weak-Side Matching',
    category: 'Symmetry',
    summary: 'Always begin dumbbell movements with your weaker side (e.g. non-dominant arm/leg).',
    detail: 'Match the reps of your dominant arm to whatever your weaker arm achieved. This balances muscle asymmetry and avoids developing uneven strength.'
  },
  {
    num: 8,
    symbol: '📊',
    title: 'Weekly Muscle Volume Targets',
    category: 'Volume Science',
    summary: 'Aim for 10–15 quality working sets per major muscle group each week.',
    detail: 'Track how many sets you complete for Chest, Back, and Legs across the week. Beginners grow fastest with 10–12 weekly sets per muscle group spaced over 3 days.'
  },
  {
    num: 9,
    symbol: '💧',
    title: 'Energy, Sleep & Hydration Context',
    category: 'Recovery Context',
    summary: 'Log why a session felt heavy (e.g. 5 hrs sleep, skipped meal, or low water).',
    detail: 'Strength fluctuates day-to-day. If weights felt heavy, check your notes: being just 2% dehydrated can reduce muscle strength by over 10%.'
  },
  {
    num: 10,
    symbol: '🛡️',
    title: 'DOMS Soreness vs Joint Pain Detection',
    category: 'Health & Safety',
    summary: 'Differentiate healthy delayed muscle soreness from sharp tendon/joint pain.',
    detail: 'Mild dull muscle soreness (DOMS) peaking 24–48h later is natural. Sharp, clicking, or pinching pain in knees, shoulders, or lower back means stop immediately and adjust form.'
  }
];

// 10 Quick-Add Popular Workout Presets for Instant 1-Click Logging
const QUICK_PRESETS = [
  { symbol: '🏋️‍♂️', name: 'Seated Chest Press Machine', category: 'Chest (Push)', weight: '20', unit: 'kg', sets: 3, reps: 10, rpe: 'Moderate (RPE 7)', notes: 'Seat at mid-chest notch. Smooth 2s return.' },
  { symbol: '🚣‍♂️', name: 'Lat Pulldown (Overhand)', category: 'Back (Pull)', weight: '25', unit: 'kg', sets: 3, reps: 10, rpe: 'Moderate (RPE 7)', notes: 'Thigh pads locked, pulled to collarbone.' },
  { symbol: '🦵', name: 'Seated Leg Press', category: 'Legs (Quads/Glutes)', weight: '40', unit: 'kg', sets: 3, reps: 12, rpe: 'Moderate (RPE 7)', notes: 'Knees aligned with toes, no top locking.' },
  { symbol: '🏋️‍♀️', name: 'Dumbbell Goblet Squats', category: 'Legs (Quads/Glutes)', weight: '8', unit: 'kg', sets: 3, reps: 10, rpe: 'Moderate (RPE 7)', notes: 'Held vertically at chest, upright torso.' },
  { symbol: '🥥', name: 'Dumbbell Overhead Shoulder Press', category: 'Shoulders', weight: '6', unit: 'kg', sets: 3, reps: 10, rpe: 'Hard (RPE 8)', notes: 'Braced core, elbows 45° inward.' },
  { symbol: '🚣', name: 'Seated Cable Row (Neutral Grip)', category: 'Back (Pull)', weight: '20', unit: 'kg', sets: 3, reps: 12, rpe: 'Moderate (RPE 7)', notes: '1-sec squeeze on shoulder blades.' },
  { symbol: '💪', name: 'Dumbbell Bicep Curls', category: 'Arms (Biceps/Triceps)', weight: '6', unit: 'kg', sets: 3, reps: 12, rpe: 'Moderate (RPE 7)', notes: 'Elbows pinned to sides, controlled lowering.' },
  { symbol: '⚡', name: 'Cable Tricep Pushdown (Rope)', category: 'Arms (Biceps/Triceps)', weight: '15', unit: 'kg', sets: 3, reps: 12, rpe: 'Moderate (RPE 7)', notes: 'Spread rope apart at bottom.' },
  { symbol: '🦵', name: 'Seated Hamstring Leg Curl', category: 'Legs (Quads/Glutes)', weight: '25', unit: 'kg', sets: 3, reps: 10, rpe: 'Easy (RPE 6)', notes: 'Smooth controlled knee flexion.' },
  { symbol: '🧘', name: 'Forearm Plank Core Hold', category: 'Core / Abs', weight: '0', unit: 'kg', sets: 3, reps: 30, rpe: 'Hard (RPE 8)', notes: '30s hold per set with braced abs & glutes.' }
];

export const TrackerSection = () => {
  const { workoutLogs, addWorkoutLog, deleteWorkoutLog, clearAllWorkoutLogs, openTimer } = useApp();

  // Form State
  const [showLogForm, setShowLogForm] = useState(false);
  const [exerciseSymbol, setExerciseSymbol] = useState('🏋️');
  const [exerciseName, setExerciseName] = useState('');
  const [muscleCategory, setMuscleCategory] = useState('Chest (Push)');
  const [weight, setWeight] = useState('20');
  const [unit, setUnit] = useState('kg');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [rpe, setRpe] = useState('Moderate (RPE 7)');
  const [notes, setNotes] = useState('');

  // Expandable 10 Points State
  const [showAllPoints, setShowAllPoints] = useState(true);
  const [expandedPointIndex, setExpandedPointIndex] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickAdd = (preset) => {
    addWorkoutLog({
      symbol: preset.symbol,
      exercise: preset.name,
      category: preset.category,
      weight: preset.weight,
      unit: preset.unit,
      sets: preset.sets,
      reps: preset.reps,
      rpe: preset.rpe,
      notes: preset.notes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    addWorkoutLog({
      symbol: exerciseSymbol,
      exercise: exerciseName.trim(),
      category: muscleCategory,
      weight: weight.trim() || '0',
      unit,
      sets: parseInt(sets) || 3,
      reps: parseInt(reps) || 10,
      rpe,
      notes: notes.trim()
    });

    // Reset Form
    setExerciseName('');
    setNotes('');
    setShowLogForm(false);
  };

  const filteredLogs = workoutLogs.filter(log =>
    log.exercise.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.category && log.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (log.notes && log.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalSetsLogged = workoutLogs.reduce((sum, l) => sum + (parseInt(l.sets) || 0), 0);
  const totalRepsLogged = workoutLogs.reduce((sum, l) => sum + ((parseInt(l.sets) || 0) * (parseInt(l.reps) || 0)), 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span className="badge badge-emerald">
              <ClipboardList size={14} /> Section 10 of 11 — Persistent Storage
            </span>
            <span className="badge badge-cyan">
              <Volume2 size={14} /> Sound Enabled & Audio Feedback 🔊
            </span>
            <span className="badge badge-amber">
              <Zap size={14} /> 10 Tracking Principles & Presets
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Beginner Workout Tracker & 10 Golden Points
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            What gets measured gets improved! Log your exercises, sets, reps, and machine seat notes. Includes 10 golden tracking rules and 10 one-click quick exercise presets.
          </p>
        </div>
      </div>

      {/* 10 Essential Workout Tracking Points Section */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Award size={22} color="#10b981" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>10 Golden Workout Tracking Points</h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Master these 10 scientific principles to maximize muscle growth and avoid rookie training mistakes.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAllPoints(!showAllPoints);
              playClickBeep();
            }}
            className="btn btn-secondary btn-sm"
          >
            {showAllPoints ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{showAllPoints ? 'Collapse 10 Points' : 'Show All 10 Points'}</span>
          </button>
        </div>

        {showAllPoints && (
          <div className="grid-2 animate-fade-in" style={{ gap: '1rem' }}>
            {TRACKING_10_POINTS.map((pt, idx) => {
              const isExpanded = expandedPointIndex === idx;
              return (
                <div
                  key={pt.num}
                  onClick={() => {
                    setExpandedPointIndex(isExpanded ? null : idx);
                    playClickBeep();
                  }}
                  className="card card-hover"
                  style={{
                    padding: '1.25rem',
                    background: isExpanded ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.06) 100%)' : 'var(--bg-card-secondary)',
                    border: isExpanded ? '1px solid #10b981' : '1px solid var(--border-card)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}>
                      {pt.symbol}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>POINT {pt.num}</span>
                          <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>{pt.category}</span>
                        </div>
                        {isExpanded ? <ChevronUp size={15} color="#10b981" /> : <ChevronDown size={15} color="var(--text-muted)" />}
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        {pt.title}
                      </h4>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {pt.summary}
                      </p>

                      {isExpanded && (
                        <div className="animate-fade-in" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)', fontSize: '0.825rem', color: 'var(--text-main)', background: 'rgba(0,0,0,0.15)', padding: '0.6rem 0.75rem', borderRadius: '8px' }}>
                          💡 <strong>Actionable Tip: </strong>{pt.detail}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 10 Quick-Add Popular Exercises Toolbar */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} color="#06b6d4" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>10 Quick-Add Exercise Presets (1-Click Log)</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click any exercise below to instantly log it to your tracker history with verified starting weights & sound confirmation!
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 155px), 1fr))', gap: '0.75rem' }}>
          {QUICK_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAdd(p)}
              className="card card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                textAlign: 'left',
                border: '1px solid var(--border-card)',
                background: 'var(--bg-card-secondary)',
                cursor: 'pointer'
              }}
              title={`Quick log ${p.name} (${p.weight}${p.unit}, ${p.sets}x${p.reps})`}
            >
              <span style={{ fontSize: '1.4rem' }}>{p.symbol}</span>
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                  + Quick Log ({p.weight}kg • {p.sets}x{p.reps})
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid-3">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Exercises Logged</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Dumbbell size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>{workoutLogs.length}</div>
          <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginTop: '0.25rem' }}>✓ Saved locally in browser</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Sets Completed</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>{totalSetsLogged}</div>
          <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600, marginTop: '0.25rem' }}>Great cumulative training volume!</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Repetitions</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>{totalRepsLogged}</div>
          <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600, marginTop: '0.25rem' }}>Consistent muscle stimulus</div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="card" style={{ padding: '1.25rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 'min(100%, 200px)', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search logged exercises, notes..."
            className="input-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => openTimer(60, 'Workout Rest Interval')}
            className="btn btn-secondary btn-sm"
          >
            <Timer size={15} color="#10b981" />
            <span>Rest Timer ⏱️</span>
          </button>

          {workoutLogs.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your workout history?')) {
                  clearAllWorkoutLogs();
                }
              }}
              className="btn btn-secondary btn-sm"
              style={{ color: '#f43f5e' }}
            >
              <RotateCcw size={14} /> Clear All
            </button>
          )}

          <button
            onClick={() => {
              setShowLogForm(!showLogForm);
              playClickBeep();
            }}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>{showLogForm ? 'Close Form' : '+ Custom Entry'}</span>
          </button>
        </div>
      </div>

      {/* Log Exercise Form */}
      {showLogForm && (
        <form onSubmit={handleSubmit} className="card card-glow-emerald animate-fade-in" style={{ padding: '2rem', border: '1px solid #10b981' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#10b981' }}>
            Log a Custom Workout Entry
          </h3>

          <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Exercise Symbol
              </label>
              <select
                className="input-control"
                value={exerciseSymbol}
                onChange={(e) => setExerciseSymbol(e.target.value)}
              >
                <option value="🏋️‍♂️">🏋️‍♂️ Chest / Push</option>
                <option value="🚣‍♂️">🚣‍♂️ Back / Pull</option>
                <option value="🦵">🦵 Legs / Lower Body</option>
                <option value="🥥">🥥 Shoulders</option>
                <option value="💪">💪 Arms / Biceps / Triceps</option>
                <option value="🧘">🧘 Core / Abs</option>
                <option value="🏃‍♂️">🏃‍♂️ Cardio / Conditioning</option>
                <option value="🤸‍♀️">🤸‍♀️ Mobility / Stretch</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Exercise Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Seated Chest Press, Incline Dumbbell Row..."
                className="input-control"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Muscle Group / Category
              </label>
              <select
                className="input-control"
                value={muscleCategory}
                onChange={(e) => setMuscleCategory(e.target.value)}
              >
                <option value="Chest (Push)">🏋️ Chest (Push)</option>
                <option value="Back (Pull)">🚣 Back (Pull)</option>
                <option value="Legs (Quads/Glutes)">🦵 Legs (Quads/Glutes)</option>
                <option value="Shoulders">🥥 Shoulders</option>
                <option value="Arms (Biceps/Triceps)">💪 Arms (Biceps/Triceps)</option>
                <option value="Core / Abs">🧘 Core / Abs</option>
                <option value="Cardio / Conditioning">🏃 Cardio / Conditioning</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Weight ({unit})
              </label>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <input
                  type="number"
                  step="0.5"
                  className="input-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setUnit(unit === 'kg' ? 'lbs' : 'kg')}
                  className="btn btn-secondary btn-sm"
                  style={{ minWidth: '46px' }}
                >
                  {unit}
                </button>
              </div>
            </div>
          </div>

          <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Sets Completed
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="input-control"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Reps per Set
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="input-control"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Effort / RPE
              </label>
              <select
                className="input-control"
                value={rpe}
                onChange={(e) => setRpe(e.target.value)}
              >
                <option value="Very Light (RPE 5)">Very Light (RPE 5)</option>
                <option value="Easy (RPE 6)">Easy (RPE 6)</option>
                <option value="Moderate (RPE 7)">Moderate (RPE 7)</option>
                <option value="Hard (RPE 8)">Hard (RPE 8)</option>
                <option value="Very Hard (RPE 9)">Very Hard (RPE 9)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Personal Notes & Machine Settings (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Seat notch #4, pin #5, felt strong on chest stretch..."
              className="input-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowLogForm(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Save Entry 💾</span>
            </button>
          </div>
        </form>
      )}

      {/* Workout Logs List */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-card-secondary)', borderBottom: '1px solid var(--border-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🏋️</span>
            <span>Workout History Table ({filteredLogs.length} Entries)</span>
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click trash icon to remove any entry
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <ClipboardList size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No workout entries found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Click any quick-add preset above or use "+ Custom Exercise Entry" to log a workout.
            </p>
            <button onClick={() => setShowLogForm(true)} className="btn btn-primary btn-sm">
              <Plus size={16} /> Log First Workout
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-card-secondary)', borderBottom: '1px solid var(--border-card)' }}>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Symbol & Exercise</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Weight</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Sets × Reps</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Effort (RPE)</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Notes / Machine Setup</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>Date</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 700, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-card)', transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.3rem' }}>{log.symbol || '🏋️'}</span>
                        <span>{log.exercise}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                        {log.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#10b981' }}>
                      {log.weight} {log.unit || 'kg'}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>
                      {log.sets} sets × {log.reps} reps
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                      {log.rpe}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.825rem', maxWidth: '240px' }}>
                      {log.notes || '—'}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.825rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} />
                        <span>{log.date}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                      <button
                        onClick={() => deleteWorkoutLog(log.id)}
                        className="btn btn-secondary btn-icon"
                        title="Delete entry"
                        style={{ width: '32px', height: '32px', margin: '0 auto', color: '#f43f5e' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
