import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_EXERCISES_DIRECTORY } from '../data/allExercisesData';
import {
  Search,
  X,
  Dumbbell,
  Timer,
  ChevronRight,
  ArrowLeft,
  Flame,
  Shield,
  Layers,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { playClickBeep } from '../utils/soundEffects';

export const ExerciseSearchModal = ({ isOpen, onClose, initialQuery = '' }) => {
  const { openTimer, addWorkoutLog } = useApp();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(ALL_EXERCISES_DIRECTORY[0]);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'detail'

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMobileView('list');
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

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
    setMobileView('detail');
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
        background: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          width: 'min(960px, 96vw)',
          height: 'min(82vh, 680px)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden'
        }}
      >
        {/* Search Modal Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-card-secondary)'
        }}>
          {mobileView === 'detail' && (
            <button
              onClick={() => setMobileView('list')}
              className="btn btn-ghost btn-icon mobile-back-btn"
              style={{ display: 'none' }}
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#06B6D4' }} />
            <input
              type="text"
              autoFocus
              placeholder="Search exercise, muscle (chest, lats, quads, bicep), machine..."
              className="input-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '38px',
                paddingRight: '36px',
                height: '42px',
                fontSize: '0.92rem',
                borderRadius: 'var(--radius-md)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-icon"
            style={{ width: '38px', height: '38px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Pills Filter */}
        <div style={{
          padding: '0.65rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          background: 'var(--bg-app)',
          scrollbarWidth: 'none'
        }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.75rem',
                  whiteSpace: 'nowrap',
                  height: '30px'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2-Pane Content View */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
          {/* Left Pane: Exercise List */}
          <div
            className={`search-list-pane ${mobileView === 'detail' ? 'hide-mobile' : ''}`}
            style={{
              width: '42%',
              borderRight: '1px solid var(--border-subtle)',
              overflowY: 'auto',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.35rem 0.5rem', fontWeight: 600 }}>
              {filteredList.length} Exercises Available
            </div>

            {filteredList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                <Dumbbell size={32} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>No exercises found</div>
                <div style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>Try searching by muscle or machine name.</div>
              </div>
            ) : (
              filteredList.map((ex) => {
                const isSelected = selectedExercise?.id === ex.id;
                return (
                  <div
                    key={ex.id}
                    onClick={() => handleSelectExercise(ex)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                      border: isSelected ? '1px solid var(--primary-cyan-border)' : '1px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{ex.symbol}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.86rem',
                          fontWeight: 700,
                          color: isSelected ? '#06B6D4' : 'var(--text-main)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {ex.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span>{ex.muscleGroup}</span>
                          <span>•</span>
                          <span>{ex.equipmentType}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={15} color={isSelected ? '#06B6D4' : 'var(--text-subtle)'} />
                  </div>
                );
              })
            )}
          </div>

          {/* Right Pane: Exercise Detail */}
          <div
            className={`search-detail-pane ${mobileView === 'list' ? 'hide-mobile' : ''}`}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.15rem'
            }}
          >
            {selectedExercise ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                      <span className="badge badge-cyan">{selectedExercise.category}</span>
                      <span className="badge badge-neutral">{selectedExercise.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>{selectedExercise.symbol}</span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedExercise.name}</h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <button
                      onClick={() => handleQuickLog(selectedExercise)}
                      className="btn btn-primary btn-sm"
                    >
                      <PlusCircle size={15} />
                      <span>Log to Tracker</span>
                    </button>
                    <button
                      onClick={() => openTimer(60, `${selectedExercise.name} Rest`)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Timer size={15} color="#06B6D4" />
                      <span>Rest</span>
                    </button>
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-card-secondary)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}>
                  {selectedExercise.shortDesc}
                </div>

                {/* Quick Specs Grid */}
                <div className="grid-2">
                  <div style={{ background: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#06B6D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Starting Recommendation
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{selectedExercise.startingWeight}</div>
                  </div>
                  <div style={{ background: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#06B6D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Machine / Seat Setup
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{selectedExercise.seatSetup}</div>
                  </div>
                </div>

                {/* Execution Steps */}
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem', color: '#06B6D4' }}>
                    Step-by-Step Execution:
                  </h4>
                  <ol style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    {selectedExercise.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Safety & Form Tips */}
                <div style={{
                  background: 'var(--bg-card-secondary)',
                  borderLeft: '3px solid #06B6D4',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>Golden Form Cue:</div>
                  {selectedExercise.safetyTips}
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                Select an exercise to view full form guide.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .search-list-pane.hide-mobile {
            display: none !important;
          }
          .search-detail-pane.hide-mobile {
            display: none !important;
          }
          .search-list-pane {
            width: 100% !important;
            border-right: none !important;
          }
          .search-detail-pane {
            width: 100% !important;
          }
          .mobile-back-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
