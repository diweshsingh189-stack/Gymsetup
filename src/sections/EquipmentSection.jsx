import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_DATA } from '../data/equipmentData';
import { ALL_EXERCISES_DIRECTORY } from '../data/allExercisesData';
import {
  Cpu,
  Search,
  ChevronRight,
  Shield,
  Flame,
  X,
  PlusCircle,
  Timer,
  BookOpen
} from 'lucide-react';
import { playClickBeep } from '../utils/soundEffects';

export const EquipmentSection = () => {
  const {
    equipmentSearchQuery,
    setEquipmentSearchQuery,
    equipmentCategoryFilter,
    setEquipmentCategoryFilter,
    addWorkoutLog,
    openTimer,
    openSearchModal
  } = useApp();

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [rightPanelCategory, setRightPanelCategory] = useState('All');
  const [directorySearchQuery, setDirectorySearchQuery] = useState('');

  // Lock body scroll and allow ESC key when modal is open
  useEffect(() => {
    if (selectedMachine) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedMachine(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMachine]);

  // Filter machines based on category and query
  const filteredEquipment = EQUIPMENT_DATA.filter((item) => {
    const matchesCategory = equipmentCategoryFilter === 'all' || item.category === equipmentCategoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) ||
      item.primaryMuscle.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(equipmentSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter right side all exercises directory
  const filteredDirectory = ALL_EXERCISES_DIRECTORY.filter((ex) => {
    const matchesCat = rightPanelCategory === 'All' || ex.category.toLowerCase().includes(rightPanelCategory.toLowerCase());
    const query = directorySearchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      ex.name.toLowerCase().includes(query) ||
      ex.category.toLowerCase().includes(query) ||
      ex.muscleGroup.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const handleQuickLog = (machine) => {
    addWorkoutLog({
      symbol: machine.symbol || '🏋️',
      exercise: machine.name,
      category: machine.primaryMuscle || machine.category,
      weight: machine.startingWeight.match(/\d+/)?.[0] || '20',
      unit: 'kg',
      sets: 3,
      reps: 10,
      rpe: 'Moderate (RPE 7)',
      notes: `Learned from Equipment Guide. Starting weight: ${machine.startingWeight}`
    });
  };

  const handleSelectFromDirectory = (ex) => {
    setSelectedMachine({
      name: ex.name,
      symbol: ex.symbol,
      primaryMuscle: ex.muscleGroup,
      difficulty: ex.difficulty,
      shortDesc: ex.shortDesc,
      startingWeight: ex.startingWeight,
      adjustment: ex.seatSetup,
      steps: ex.steps,
      safetyTips: ex.safetyTips
    });
    playClickBeep();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ maxWidth: '750px' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
              <span className="badge badge-cyan">
                <Cpu size={13} /> Section 6 of 14 — Equipment Masterclass
              </span>
              <span className="badge badge-neutral">
                <Flame size={13} /> 16 Full Gym Machines
              </span>
              <span className="badge badge-neutral">
                <BookOpen size={13} /> 25+ Exercise Directory
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
              Gym Equipment, Machines & Exercise Explorer
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
              Complete guide for <strong>16 gym machines</strong> and <strong>25+ exercises</strong>: pin setup, seat height adjustment, starting weight guidelines, and clean execution cues.
            </p>
          </div>

          <button
            onClick={() => openSearchModal()}
            className="btn btn-primary btn-lg"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Search size={16} />
            <span>Search All Exercises</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#06B6D4' }} />
          <input
            type="text"
            placeholder="Search by machine name (e.g. Chest Press, Lat Pulldown, Leg Press) or target muscle..."
            className="input-control"
            value={equipmentSearchQuery}
            onChange={(e) => setEquipmentSearchQuery(e.target.value)}
            style={{ paddingLeft: '38px', height: '44px', fontSize: '0.92rem' }}
          />
          {equipmentSearchQuery && (
            <button
              onClick={() => setEquipmentSearchQuery('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills with Count Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {EQUIPMENT_CATEGORIES.map((cat) => {
            const isSelected = equipmentCategoryFilter === cat.id;
            const count = cat.id === 'all'
              ? EQUIPMENT_DATA.length
              : EQUIPMENT_DATA.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setEquipmentCategoryFilter(cat.id);
                  playClickBeep();
                }}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.75rem',
                  fontWeight: isSelected ? 700 : 500
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-card)',
                    border: isSelected ? 'none' : '1px solid var(--border-card)',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 800,
                    color: isSelected ? '#ffffff' : 'var(--primary-cyan)'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Main Layout: Left Machine Cards + Right All Exercises Directory Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '1.25rem', alignItems: 'start' }} className="equipment-layout-grid">
        {/* Left Column: Primary Equipment Cards Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Cpu size={18} color="#06B6D4" />
              <span>Gym Machines & Stations</span>
            </h2>
            <span className="badge badge-cyan" style={{ fontSize: '0.74rem' }}>
              {filteredEquipment.length} of {EQUIPMENT_DATA.length} Machines
            </span>
          </div>

          {filteredEquipment.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
              <Cpu size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>No equipment matches "{equipmentSearchQuery}"</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.86rem' }}>Try clearing search filters or selecting another category.</p>
              <button onClick={() => { setEquipmentSearchQuery(''); setEquipmentCategoryFilter('all'); }} className="btn btn-secondary btn-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
              {filteredEquipment.map((item) => (
                <div
                  key={item.id}
                  className="card card-hover"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                        {item.difficulty}
                      </span>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                        {item.primaryMuscle}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.symbol || '🏋️'}</span>
                      <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>{item.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                      {item.shortDesc}
                    </p>

                    <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.75rem 0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.8rem' }}>
                      <strong style={{ color: '#06B6D4' }}>Pin/Seat Setup: </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{item.adjustment}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <button
                      onClick={() => setSelectedMachine(item)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <span>Form Guide</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      onClick={() => handleQuickLog(item)}
                      className="btn btn-secondary btn-sm"
                      title="Quick Log to Workout Tracker"
                    >
                      <PlusCircle size={15} color="#06B6D4" />
                      <span>Log</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: All Exercises Quick Directory Panel */}
        <div
          className="card"
          style={{
            padding: '1.15rem',
            position: 'sticky',
            top: '80px',
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <BookOpen size={18} color="#06B6D4" />
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800 }}>Exercise Directory</h3>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
              {filteredDirectory.length} items
            </span>
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Quick lookup for exercises with setup instructions & starting weights:
          </p>

          {/* Directory Quick Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter directory (e.g. chest, row, squat)..."
              value={directorySearchQuery}
              onChange={(e) => setDirectorySearchQuery(e.target.value)}
              className="input-control"
              style={{
                paddingLeft: '32px',
                height: '36px',
                fontSize: '0.8rem',
                borderRadius: '8px'
              }}
            />
            {directorySearchQuery && (
              <button
                onClick={() => setDirectorySearchQuery('')}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mini Filter Pills for Directory */}
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'].map((cat) => {
              const isSelected = rightPanelCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setRightPanelCategory(cat);
                    playClickBeep();
                  }}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    height: '26px',
                    fontWeight: isSelected ? 700 : 500
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Scrollable List of All Exercises */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              paddingRight: '2px',
              minHeight: '200px'
            }}
          >
            {filteredDirectory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                No exercises found in directory.
              </div>
            ) : (
              filteredDirectory.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleSelectFromDirectory(ex)}
                  className="card-hover"
                  style={{
                    padding: '0.65rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    cursor: 'pointer',
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-sm)',
                    flexShrink: 0,
                    minWidth: 0,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{ex.symbol}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: 'var(--text-main)',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {ex.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <span style={{ color: '#06B6D4', fontWeight: 600 }}>{ex.category}</span>
                      <span>•</span>
                      <span>{ex.startingWeight.split('|')[0].trim()}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Machine Detail Modal */}
      {selectedMachine && ReactDOM.createPortal(
        <div
          onClick={() => setSelectedMachine(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 17, 32, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-in card"
            style={{
              maxWidth: '660px',
              width: 'min(660px, 94vw)',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-lg)',
              padding: 0,
              overflow: 'hidden',
              background: 'var(--bg-card)',
              boxShadow: 'var(--shadow-modal)'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'var(--bg-card-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexShrink: 0
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-cyan">{selectedMachine.primaryMuscle}</span>
                  <span className="badge badge-neutral">{selectedMachine.difficulty}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{selectedMachine.symbol || '🏋️'}</span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedMachine.name}</h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedMachine(null)}
                className="btn btn-secondary btn-icon"
                style={{ width: '36px', height: '36px', flexShrink: 0 }}
                title="Close (Esc)"
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.15rem',
                flex: 1
              }}
            >
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                {selectedMachine.shortDesc}
              </p>

              {/* Starting Weight Recommendation */}
              <div
                style={{
                  background: 'var(--bg-app)',
                  border: '1px solid var(--primary-cyan-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1.15rem'
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-cyan)', textTransform: 'uppercase' }}>
                  Recommended Starting Weight
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedMachine.startingWeight}
                </div>
              </div>

              {/* Machine Adjustment / Seat Setup */}
              {selectedMachine.adjustment && (
                <div style={{ background: 'var(--bg-card-secondary)', border: '1px solid var(--border-card)', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--primary-cyan)', fontSize: '0.82rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                    ⚙️ Pin / Seat Height Setup:
                  </strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{selectedMachine.adjustment}</span>
                </div>
              )}

              {/* Step-by-Step Instructions */}
              {selectedMachine.steps && selectedMachine.steps.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-main)' }}>
                    Step-by-Step Execution:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedMachine.steps.map((stepText, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.65rem', background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--primary-cyan-tint)', color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }}>
                          {idx + 1}
                        </div>
                        <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{stepText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Tips */}
              {selectedMachine.safetyTips && selectedMachine.safetyTips.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-main)' }}>
                    Safety Tips & Form Cues:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {selectedMachine.safetyTips.map((tip, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                        <Shield size={15} color="#06B6D4" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '0.85rem 1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-card-secondary)',
                display: 'flex',
                gap: '0.65rem',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexShrink: 0,
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => openTimer(60, `${selectedMachine.name} Rest Interval`)}
                className="btn btn-secondary btn-sm"
              >
                <Timer size={15} color="#06B6D4" />
                <span>Rest Timer (60s)</span>
              </button>

              <button
                onClick={() => {
                  handleQuickLog(selectedMachine);
                  setSelectedMachine(null);
                }}
                className="btn btn-primary btn-sm"
              >
                <PlusCircle size={15} />
                <span>Log to Tracker</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @media (max-width: 1024px) {
          .equipment-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
