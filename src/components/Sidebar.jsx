import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Sparkles,
  Compass,
  Milestone,
  ShieldCheck,
  Cpu,
  Flame,
  Dumbbell,
  Apple,
  MoonStar,
  ClipboardList,
  CheckCircle2,
  ChevronRight,
  Info,
  Building2,
  MessageSquareHeart
} from 'lucide-react';

const NAV_ITEMS = [
  {
    category: 'Start Here',
    symbol: '🚀',
    items: [
      { id: 'home', num: '01', label: '1. Home Dashboard', icon: Home, badge: 'Home' },
      { id: 'guided-flow', num: '02', label: '2. Guided Day-1 Flow', icon: Sparkles, badge: 'Wizard', highlight: true },
      { id: 'first-day', num: '03', label: '3. First Day Guide', icon: Compass, badge: 'Prep' }
    ]
  },
  {
    category: 'Knowledge & Safety',
    symbol: '🛡️',
    items: [
      { id: 'roadmap', num: '04', label: '4. Beginner Roadmap', icon: Milestone, badge: 'Milestones' },
      { id: 'safety', num: '05', label: '5. Gym Safety & DOs/DON\'Ts', icon: ShieldCheck, badge: 'Crucial' },
      { id: 'equipment', num: '06', label: '6. Equipment Guide', icon: Cpu, badge: '16+ Machines' },
      { id: 'warmup', num: '07', label: '7. Warm-up & Cool-down', icon: Flame, badge: 'Mobility' }
    ]
  },
  {
    category: 'Workouts & Recovery',
    symbol: '💪',
    items: [
      { id: 'workout', num: '08', label: '8. Beginner Workouts', icon: Dumbbell, badge: '4 Routines' },
      { id: 'nutrition', num: '09', label: '9. Nutrition & Hydration', icon: Apple, badge: 'Fuel' },
      { id: 'recovery', num: '10', label: '10. Sleep & Recovery', icon: MoonStar, badge: 'Rest' }
    ]
  },
  {
    category: 'Tracking & Community',
    symbol: '📊',
    items: [
      { id: 'tracker', num: '11', label: '11. Workout Tracker', icon: ClipboardList, badge: 'Tracker' },
      { id: 'checklist', num: '12', label: '12. Beginner Checklist', icon: CheckCircle2, badge: 'Checklist' },
      { id: 'gym-pricing', num: '13', label: '13. Popular Gyms & Pricing', icon: Building2, badge: 'Pricing', highlight: true },
      { id: 'feedback', num: '14', label: '14. Feedback & Reviews', icon: MessageSquareHeart, badge: 'Reviews' }
    ]
  }
];

export const Sidebar = () => {
  const { currentTab, navigateTo, mobileMenuOpen, setMobileMenuOpen, checklist, workoutLogs } = useApp();

  const completedChecks = Object.values(checklist).filter(Boolean).length;

  const handleNav = (tabId) => {
    navigateTo(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            zIndex: 45,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          width: 'min(var(--sidebar-width), 85vw)',
          maxWidth: '320px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-subtle)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.25s ease',
          overflowY: 'auto'
        }}
      >
        {/* Sidebar Header */}
        <div
          onClick={() => handleNav('home')}
          style={{
            padding: '1.25rem 1.25rem 1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#06B6D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Dumbbell size={20} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
                Gym<span style={{ color: '#06B6D4' }}>Setup</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Beginner Fitness Companion
              </div>
            </div>
          </div>
        </div>

        {/* Quick User Readiness Card */}
        <div style={{ padding: '0.85rem 1rem 0.35rem 1rem' }}>
          <div style={{
            background: 'var(--bg-card-secondary)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                DAILY READINESS
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, marginTop: '2px' }}>
                {completedChecks} / 20 Tasks Done
              </div>
            </div>
            <button
              onClick={() => handleNav('checklist')}
              style={{
                background: '#06B6D4',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.3rem 0.6rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Check
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav style={{ flex: 1, padding: '0.65rem 0.75rem' }}>
          {NAV_ITEMS.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.35rem 0.65rem',
                marginBottom: '0.35rem',
                borderRadius: '6px',
                background: 'var(--bg-card-secondary)',
                border: '1px solid var(--border-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>{group.symbol}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-main)'
                  }}>
                    {group.category}
                  </span>
                </div>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: '#06B6D4'
                }} />
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNav(item.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.52rem 0.65rem',
                          borderRadius: 'var(--radius-md)',
                          background: isActive
                            ? 'rgba(6, 182, 212, 0.12)'
                            : item.highlight
                            ? 'rgba(6, 182, 212, 0.05)'
                            : 'transparent',
                          color: isActive
                            ? '#06B6D4'
                            : item.highlight
                            ? '#06B6D4'
                            : 'var(--text-main)',
                          border: isActive
                            ? '1px solid rgba(6, 182, 212, 0.3)'
                            : '1px solid transparent',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: '0.66rem',
                              fontWeight: 700,
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: isActive ? '#06B6D4' : 'var(--bg-card-secondary)',
                              color: isActive ? '#ffffff' : 'var(--text-muted)',
                              minWidth: '20px',
                              textAlign: 'center',
                              flexShrink: 0
                            }}
                          >
                            {item.num}
                          </span>

                          <Icon
                            size={16}
                            color={isActive ? '#06B6D4' : 'var(--text-muted)'}
                            style={{ flexShrink: 0 }}
                          />
                          <span style={{ fontSize: '0.84rem', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        </div>

                        {item.badge && (
                          <span
                            style={{
                              fontSize: '0.66rem',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '9999px',
                              background: isActive ? '#06B6D4' : 'var(--bg-card-secondary)',
                              color: isActive ? '#ffffff' : 'var(--text-muted)',
                              fontWeight: 600,
                              flexShrink: 0
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Support */}
        <div style={{
          padding: '0.85rem 1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.775rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Info size={15} color="#06B6D4" />
          <span>Zero pressure. 100% Beginner safe.</span>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
