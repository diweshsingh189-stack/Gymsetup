import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_DATA } from '../data/equipmentData';
import { ALL_EXERCISES_DIRECTORY } from '../data/allExercisesData';
import {
  Cpu,
  Search,
  Sliders,
  ChevronRight,
  Shield,
  Layers,
  Dumbbell,
  Flame,
  CheckCircle2,
  X,
  PlusCircle,
  HelpCircle,
  Sparkles,
  Timer,
  BookOpen,
  ListFilter
} from 'lucide-react';
import { playClickBeep } from '../utils/soundEffects';

export const EquipmentSection = () => {
  const {
    navigateTo,
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
    // Open in modal
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '750px' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="badge badge-emerald">
                <Cpu size={14} /> Section 6 of 14 — Complete Knowledge Hub
              </span>
              <span className="badge badge-cyan">
                <Flame size={14} /> 16 Complete Gym Machines
              </span>
              <span className="badge badge-amber">
                <BookOpen size={14} /> 25+ Exercise Directory
              </span>
            </div>

            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Gym Equipment, Machines & Exercise Explorer
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Total <strong>16 gym machines</strong> aur <strong>25+ exercises</strong> ki complete knowledge: seat height, pin adjustment, starting weight, aur step-by-step form ka sahi tareeqa!
            </p>
          </div>

          <button
            onClick={() => openSearchModal()}
            className="btn btn-primary btn-lg"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}
          >
            <Search size={18} />
            <span>🔍 Live Knowledge Search</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#10b981' }} />
          <input
            type="text"
            placeholder="Search by machine name (e.g. Chest Press, Lat Pulldown, Leg Press, Dumbbells) or target muscle..."
            className="input-control"
            value={equipmentSearchQuery}
            onChange={(e) => setEquipmentSearchQuery(e.target.value)}
            style={{ paddingLeft: '44px', height: '48px', fontSize: '0.95rem' }}
          />
          {equipmentSearchQuery && (
            <button
              onClick={() => setEquipmentSearchQuery('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Pills with Live Dynamic Count Badges */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.38rem 0.85rem',
                  fontWeight: isSelected ? 800 : 500
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    background: isSelected ? 'rgba(255,255,255,0.28)' : 'var(--bg-card)',
                    border: isSelected ? 'none' : '1px solid var(--border-card)',
                    padding: '1px 7px',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    color: isSelected ? '#ffffff' : '#10b981'
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
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 370px', gap: '1.5rem', alignItems: 'start' }} className="equipment-layout-grid">
        {/* Left Column: Primary Equipment Cards Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} color="#10b981" />
              <span>Gym Machines & Stations</span>
            </h2>
            <span className="badge badge-emerald" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
              Showing {filteredEquipment.length} of {EQUIPMENT_DATA.length} Machines
            </span>
          </div>

          {filteredEquipment.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <Cpu size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No equipment matches "{equipmentSearchQuery}"</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Try clearing the search or switching categories.</p>
              <button onClick={() => { setEquipmentSearchQuery(''); setEquipmentCategoryFilter('all'); }} className="btn btn-secondary btn-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
              {filteredEquipment.map((item) => (
                <div
                  key={item.id}
                  className="card card-hover"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                        {item.difficulty}
                      </span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                        {item.primaryMuscle}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>{item.symbol || '🏋️'}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{item.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {item.shortDesc}
                    </p>

                    <div style={{ background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.825rem' }}>
                      <strong style={{ color: '#10b981' }}>Pin/Seat Setup: </strong>
                      <span>{item.adjustment}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => setSelectedMachine(item)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <span>How to Use & Form</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      onClick={() => handleQuickLog(item)}
                      className="btn btn-secondary btn-sm"
                      title="Quick Log to Workout Tracker"
                    >
                      <PlusCircle size={15} color="#10b981" />
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
          className="card card-glow-emerald"
          style={{
            padding: '1.25rem',
            position: 'sticky',
            top: '90px',
            maxHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>All Exercises Directory</h3>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
              {filteredDirectory.length} items
            </span>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Click any exercise for complete step-by-step setup, starting weights & form:
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
                borderRadius: '8px',
                background: 'var(--bg-app)'
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

          {/* Mini Filter Pills for Directory (Wrapped chips, no scrollbar hiding text) */}
          <div
            style={{
              display: 'flex',
              gap: '0.35rem',
              flexWrap: 'wrap'
            }}
          >
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
                    fontSize: '0.72rem',
                    padding: '0.22rem 0.55rem',
                    borderRadius: '9999px',
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
              gap: '0.5rem',
              paddingRight: '4px',
              minHeight: '200px'
            }}
          >
            {filteredDirectory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No exercises found in directory.
              </div>
            ) : (
              filteredDirectory.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleSelectFromDirectory(ex)}
                  className="card-hover"
                  style={{
                    padding: '0.75rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    background: 'var(--bg-card-secondary)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '12px',
                    flexShrink: 0,
                    minWidth: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>{ex.symbol}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: 'var(--text-main)',
                        marginBottom: '3px',
                        wordBreak: 'break-word'
                      }}
                    >
                      {ex.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{ex.category}</span>
                      <span>•</span>
                      <span>{ex.startingWeight.split('|')[0].trim()}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Machine Detail Modal - Direct Body Portal for 100% Viewport Centering */}
      {selectedMachine && ReactDOM.createPortal(
        <div
          onClick={() => setSelectedMachine(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '0.75rem',
            boxSizing: 'border-box'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-in"
            style={{
              maxWidth: '680px',
              width: 'min(680px, 94vw)',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              padding: 0,
              overflow: 'hidden',
              background: 'var(--bg-card)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
              margin: 'auto'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'var(--bg-sidebar)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexShrink: 0
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-emerald">{selectedMachine.primaryMuscle}</span>
                  <span className="badge badge-cyan">{selectedMachine.difficulty}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{selectedMachine.symbol || '🏋️'}</span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedMachine.name}</h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedMachine(null)}
                className="btn btn-secondary btn-icon"
                style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: '50%' }}
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div
              style={{
                padding: '1.5rem 1.75rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                flex: 1
              }}
            >
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {selectedMachine.shortDesc}
              </p>

              {/* Starting Weight Recommendation */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                  Recommended Starting Weight (शुरुआती वजन)
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedMachine.startingWeight}
                </div>
              </div>

              {/* Machine Adjustment / Seat Setup */}
              {selectedMachine.adjustment && (
                <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: '#06b6d4', fontSize: '0.85rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    ⚙️ Pin / Seat Height Setup:
                  </strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{selectedMachine.adjustment}</span>
                </div>
              )}

              {/* Step-by-Step Instructions */}
              {selectedMachine.steps && selectedMachine.steps.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    Step-by-Step How to Use (करने का सही तरीका):
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {selectedMachine.steps.map((stepText, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.88rem' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
                          {idx + 1}
                        </div>
                        <span style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>{stepText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Tips */}
              {selectedMachine.safetyTips && selectedMachine.safetyTips.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f59e0b' }}>
                    Crucial Safety Tips (सावधानियां):
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedMachine.safetyTips.map((tip, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        <Shield size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer (Sticky Bottom) */}
            <div
              style={{
                padding: '1rem 1.75rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-sidebar)',
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexShrink: 0,
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => openTimer(60, `${selectedMachine.name} Rest Interval`)}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                <Timer size={16} color="#10b981" />
                <span>Rest Timer (60s)</span>
              </button>

              <button
                onClick={() => {
                  handleQuickLog(selectedMachine);
                  setSelectedMachine(null);
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                <PlusCircle size={16} />
                <span>Log to Workout Tracker</span>
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
