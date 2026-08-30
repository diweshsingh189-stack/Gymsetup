import React, { useState } from 'react';
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
    if (rightPanelCategory === 'All') return true;
    return ex.category.toLowerCase().includes(rightPanelCategory.toLowerCase());
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
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              <Cpu size={14} /> Section 6 of 13 — Complete Knowledge Hub
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Gym Equipment, Machines & Exercise Explorer
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Har machine aur exercise ki poori knowledge: seat height, pin adjustment, starting weight, aur form ka sahi tareeqa. Niche kisi bhi exercise par click karein ya Search use karein!
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

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {EQUIPMENT_CATEGORIES.map((cat) => {
            const isSelected = equipmentCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setEquipmentCategoryFilter(cat.id)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '9999px', fontSize: '0.85rem' }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Main Layout: Left Machine Cards + Right All Exercises Directory Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }} className="equipment-layout-grid">
        {/* Left Column: Primary Equipment Cards Grid */}
        <div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
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
        <div className="card card-glow-emerald" style={{ padding: '1.5rem', position: 'sticky', top: '90px', maxHeight: '82vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <BookOpen size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>All Exercises Directory</h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Click any exercise for complete step-by-step knowledge & starting weights:
          </p>

          {/* Mini Filter Pills for Directory */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'].map((cat) => (
              <button
                key={cat}
                onClick={() => setRightPanelCategory(cat)}
                className={`btn btn-sm ${rightPanelCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', whiteSpace: 'nowrap' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scrollable List of All Exercises */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '4px' }}>
            {filteredDirectory.map((ex) => (
              <div
                key={ex.id}
                onClick={() => handleSelectFromDirectory(ex)}
                className="card card-hover"
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  background: 'var(--bg-card-secondary)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px'
                }}
              >
                <span style={{ fontSize: '1.35rem', flexShrink: 0 }}>{ex.symbol}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '2px', color: 'var(--text-main)' }}>
                    {ex.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <span style={{ color: '#10b981', fontWeight: 600 }}>{ex.category}</span>
                    <span>•</span>
                    <span>{ex.startingWeight.split('|')[0].trim()}</span>
                  </div>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Machine Detail Modal */}
      {selectedMachine && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.78)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 160,
          padding: '1.25rem'
        }}>
          <div className="card card-glow-emerald animate-fade-in" style={{
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: '2.25rem',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedMachine(null)}
              className="btn btn-secondary btn-icon"
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '36px', height: '36px' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald">{selectedMachine.primaryMuscle}</span>
              <span className="badge badge-cyan">{selectedMachine.difficulty}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>{selectedMachine.symbol || '🏋️'}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{selectedMachine.name}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{selectedMachine.shortDesc}</p>

            {/* Starting Weight Recommendation */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                Recommended Starting Weight (शुरुआती वजन)
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                {selectedMachine.startingWeight}
              </div>
            </div>

            {/* Machine Adjustment / Seat Setup */}
            {selectedMachine.adjustment && (
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <strong style={{ color: '#06b6d4', fontSize: '0.85rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  ⚙️ Pin / Seat Height Setup:
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{selectedMachine.adjustment}</span>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Step-by-Step How to Use (करने का सही तरीका):</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {selectedMachine.steps?.map((stepText, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-card-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <span style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>{stepText}</span>
                </div>
              ))}
            </div>

            {/* Safety Tips */}
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f59e0b' }}>Crucial Safety Tips (सावधानियां):</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {selectedMachine.safetyTips?.map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <Shield size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              <button
                onClick={() => openTimer(60, `${selectedMachine.name} Rest Interval`)}
                className="btn btn-secondary"
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
              >
                <PlusCircle size={16} />
                <span>Log to Workout Tracker</span>
              </button>
            </div>
          </div>
        </div>
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
