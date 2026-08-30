import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_EXERCISES_DIRECTORY } from '../data/allExercisesData';
import {
  Search,
  X,
  Dumbbell,
  Shield,
  Clock,
  PlusCircle,
  Timer,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Flame,
  Info,
  BookOpen
} from 'lucide-react';
import { playSuccessChime, playClickBeep } from '../utils/soundEffects';

export const ExerciseSearchModal = ({ isOpen, onClose, initialQuery = '' }) => {
  const { openTimer, addWorkoutLog } = useApp();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(ALL_EXERCISES_DIRECTORY[0]);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    'All',
    'Chest (Push)',
    'Back (Pull)',
    'Legs (Lower Body)',
    'Shoulders',
    'Arms (Biceps/Triceps)',
    'Core / Abs',
    'Cardio / Conditioning'
  ];

  // Filtered exercises based on search query and category
  const filteredList = ALL_EXERCISES_DIRECTORY.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase()) || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      item.name.toLowerCase().includes(query) ||
      item.muscleGroup.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.equipmentType.toLowerCase().includes(query) ||
      item.shortDesc.toLowerCase().includes(query) ||
      item.seatSetup.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    playClickBeep();
  };

  const handleQuickLog = (exercise) => {
    addWorkoutLog({
      symbol: exercise.symbol,
      exercise: exercise.name,
      category: exercise.category,
      weight: exercise.startingWeight.match(/\d+/)?.[0] || '20',
      unit: 'kg',
      sets: 3,
      reps: 10,
      rpe: 'Moderate (RPE 7)',
      notes: `Knowledge Explorer: ${exercise.seatSetup}`
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1280px',
          width: '96vw',
          maxHeight: '90vh',
          height: '860px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          padding: '0',
          overflow: 'hidden',
          background: 'var(--bg-sidebar)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75)'
        }}
      >
        {/* Top Header Search Bar */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexShrink: 0
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={22} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#10b981' }} />
            <input
              type="text"
              autoFocus
              placeholder="Search all machines & exercises (e.g. Chest Press, Lat Pulldown, Squats, Biceps, Delts)..."
              className="input-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '52px',
                paddingRight: '40px',
                height: '48px',
                fontSize: '1.05rem',
                borderRadius: '14px',
                background: 'var(--bg-input)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="btn btn-secondary btn-icon"
            style={{ width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0 }}
            title="Close Search (Esc)"
          >
            <X size={22} />
          </button>
        </div>

        {/* Categories Bar */}
        <div style={{
          padding: '0.85rem 1.75rem',
          background: 'var(--bg-card-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', whiteSpace: 'nowrap', marginRight: '0.4rem', letterSpacing: '0.04em' }}>
            CATEGORIES:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  playClickBeep();
                }}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  fontSize: '0.82rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  fontWeight: isSelected ? 700 : 500
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2-Column Body Content: Left Search Results (440px) + Right Full Details Panel */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '440px 1fr', overflow: 'hidden', minHeight: 0 }} className="search-modal-grid">
          {/* Left Column: All Exercises & Matching Search Results List */}
          <div style={{
            borderRight: '1px solid var(--border-subtle)',
            background: 'var(--bg-app)',
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 0.25rem 0.5rem 0.25rem',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '0.25rem',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <BookOpen size={14} color="#10b981" />
                EXERCISE DIRECTORY ({filteredList.length})
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                Click to explore
              </span>
            </div>

            {filteredList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
                <Search size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>No exercises found</p>
                <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>Try searching by muscle name like "chest" or "bicep".</p>
              </div>
            ) : (
              filteredList.map((item) => {
                const isSelected = selectedExercise?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectExercise(item)}
                    style={{
                      flexShrink: 0,
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 182, 212, 0.14) 100%)'
                        : 'var(--bg-card)',
                      border: isSelected ? '1.5px solid #10b981' : '1px solid var(--border-card)',
                      boxShadow: isSelected ? '0 4px 18px rgba(16, 185, 129, 0.25)' : 'none',
                      transition: 'all 0.15s ease',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Emoji Symbol Box */}
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(16, 185, 129, 0.28)' : 'var(--bg-card-secondary)',
                      border: isSelected ? '1px solid #10b981' : '1px solid var(--border-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.45rem',
                      flexShrink: 0
                    }}>
                      {item.symbol}
                    </div>

                    {/* Exercise Name (Full Uncut Text) */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: isSelected ? '#10b981' : 'var(--text-main)',
                        marginBottom: '3px'
                      }}>
                        {item.name}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <span style={{ color: '#10b981', fontWeight: 600 }}>{item.category}</span>
                        <span>•</span>
                        <span style={{ color: '#06b6d4' }}>{item.equipmentType}</span>
                      </div>
                    </div>

                    <ChevronRight size={18} color={isSelected ? '#10b981' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Full Complete Details & Step-by-Step Knowledge */}
          {selectedExercise ? (
            <div style={{ overflowY: 'auto', padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-sidebar)' }}>
              {/* Exercise Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.15rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.18) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    flexShrink: 0
                  }}>
                    {selectedExercise.symbol}
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{selectedExercise.category}</span>
                      <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>{selectedExercise.equipmentType}</span>
                      <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>{selectedExercise.difficulty}</span>
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{selectedExercise.name}</h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>{selectedExercise.shortDesc}</p>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openTimer(60, `${selectedExercise.name} Rest Timer`)}
                    className="btn btn-secondary"
                  >
                    <Timer size={16} color="#10b981" />
                    <span>Rest Timer (60s)</span>
                  </button>

                  <button
                    onClick={() => handleQuickLog(selectedExercise)}
                    className="btn btn-primary"
                  >
                    <PlusCircle size={16} />
                    <span>Log to Tracker</span>
                  </button>
                </div>
              </div>

              {/* Starting Weight & Muscle Target Banner */}
              <div className="grid-2" style={{ gap: '1.25rem' }}>
                <div style={{ background: 'var(--bg-card-secondary)', padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    🎯 PRIMARY TARGET MUSCLE
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>
                    {selectedExercise.muscleGroup}
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(6, 182, 212, 0.09) 100%)', padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    ⚖️ RECOMMENDED STARTING WEIGHT
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>
                    {selectedExercise.startingWeight}
                  </div>
                </div>
              </div>

              {/* Machine Seat & Pin Setup */}
              <div style={{ background: 'rgba(6, 182, 212, 0.09)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '1.35rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#06b6d4', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={19} /> Machine / Seat & Pin Setup (सीट व पिन सेटिंग):
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {selectedExercise.seatSetup}
                </p>
              </div>

              {/* Step-by-Step Execution Guide */}
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} color="#10b981" /> How to Perform with Perfect Form (सही तरीका):
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedExercise.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        background: 'var(--bg-card)',
                        padding: '0.95rem 1.15rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-card)',
                        fontSize: '0.93rem'
                      }}
                    >
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#10b981',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        flexShrink: 0,
                        marginTop: '1px'
                      }}>
                        {sIdx + 1}
                      </div>
                      <span style={{ color: 'var(--text-main)', lineHeight: 1.55 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Rules & Common Mistakes */}
              <div className="grid-2" style={{ gap: '1.25rem' }}>
                <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.25)', padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f43f5e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Shield size={17} /> Safety DOs & DON'Ts:
                  </h5>
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.35rem', lineHeight: 1.5 }}>
                    {selectedExercise.safetyTips.map((st, stIdx) => (
                      <li key={stIdx}>{st}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <AlertTriangle size={17} /> Common Rookie Mistakes:
                  </h5>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                    {selectedExercise.commonMistakes}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Select an exercise from the left list to view complete step-by-step details.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .search-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
