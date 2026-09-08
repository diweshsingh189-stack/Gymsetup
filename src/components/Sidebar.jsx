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
  Info,
  Building2,
  MessageSquareHeart
} from 'lucide-react';

const NAV_ITEMS = [
  {
    category: 'Start Here',
    items: [
      { id: 'home', num: '01', label: 'Home Dashboard', icon: Home, badge: 'Home' },
      { id: 'guided-flow', num: '02', label: 'Guided Day-1 Flow', icon: Sparkles, badge: 'Wizard', highlight: true },
      { id: 'first-day', num: '03', label: 'First Day Guide', icon: Compass, badge: 'Prep' }
    ]
  },
  {
    category: 'Knowledge & Safety',
    items: [
      { id: 'roadmap', num: '04', label: 'Beginner Roadmap', icon: Milestone, badge: 'Weeks 1-4' },
      { id: 'safety', num: '05', label: 'Gym Safety & DOs/DON\'Ts', icon: ShieldCheck, badge: 'Crucial' },
      { id: 'equipment', num: '06', label: 'Equipment Guide', icon: Cpu, badge: '16+ Machines' },
      { id: 'warmup', num: '07', label: 'Warm-up & Mobility', icon: Flame, badge: 'Routines' }
    ]
  },
  {
    category: 'Workouts & Recovery',
    items: [
      { id: 'workout', num: '08', label: 'Beginner Workouts', icon: Dumbbell, badge: '4 Splits' },
      { id: 'nutrition', num: '09', label: 'Nutrition & Hydration', icon: Apple, badge: 'Fuel' },
      { id: 'recovery', num: '10', label: 'Sleep & Recovery', icon: MoonStar, badge: 'Rest' }
    ]
  },
  {
    category: 'Tracking & Community',
    items: [
      { id: 'tracker', num: '11', label: 'Workout Logger', icon: ClipboardList, badge: 'Logs' },
      { id: 'checklist', num: '12', label: 'Beginner Checklist', icon: CheckCircle2, badge: 'Checklist' },
      { id: 'gym-pricing', num: '13', label: 'Gyms & Pricing', icon: Building2, badge: 'Explore' },
      { id: 'feedback', num: '14', label: 'Feedback & Reviews', icon: MessageSquareHeart, badge: 'Reviews' }
    ]
  }
];

export const Sidebar = () => {
  const { currentTab, navigateTo, mobileMenuOpen, setMobileMenuOpen, checklist } = useApp();

  const completedChecks = Object.values(checklist).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecks / 20) * 100);

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
            background: 'rgba(11, 17, 32, 0.75)',
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
          maxWidth: '300px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-subtle)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform var(--transition-normal)',
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
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--primary-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Dumbbell size={18} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                Gym<span style={{ color: 'var(--primary-cyan)' }}>Setup</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Production Fitness Companion
              </div>
            </div>
          </div>
        </div>

        {/* User Readiness Card */}
        <div style={{ padding: '0.85rem 1rem 0.25rem 1rem' }}>
          <div style={{
            background: 'var(--bg-card-secondary)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary-cyan)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                READINESS SCORE
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, marginTop: '2px', color: 'var(--text-main)' }}>
                {completedChecks}/20 Tasks ({checklistPercent}%)
              </div>
            </div>
            <button
              onClick={() => handleNav('checklist')}
              style={{
                background: 'var(--primary-cyan)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Track
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav style={{ flex: 1, padding: '0.65rem 0.75rem' }}>
          {NAV_ITEMS.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '1.15rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.35rem 0.5rem',
                marginBottom: '0.25rem'
              }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-subtle)'
                }}>
                  {group.category}
                </span>
                <span style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#06B6D4',
                  opacity: 0.8
                }} />
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
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
                          padding: '0.5rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          background: isActive
                            ? 'rgba(6, 182, 212, 0.12)'
                            : item.highlight
                            ? 'rgba(6, 182, 212, 0.04)'
                            : 'transparent',
                          color: isActive
                            ? '#06B6D4'
                            : 'var(--text-main)',
                          borderLeft: isActive
                            ? '3px solid #06B6D4'
                            : '3px solid transparent',
                          borderTop: 'none',
                          borderRight: 'none',
                          borderBottom: 'none',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: isActive ? 'var(--primary-cyan)' : 'var(--bg-card-secondary)',
                              color: isActive ? '#ffffff' : 'var(--text-muted)',
                              minWidth: '18px',
                              textAlign: 'center',
                              flexShrink: 0
                            }}
                          >
                            {item.num}
                          </span>

                          <Icon
                            size={16}
                            color={isActive ? 'var(--primary-cyan)' : 'var(--text-muted)'}
                            style={{ flexShrink: 0 }}
                          />
                          <span style={{ fontSize: '0.84rem', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        </div>

                        {item.badge && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '9999px',
                              background: isActive ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-card-secondary)',
                              color: isActive ? '#06B6D4' : 'var(--text-subtle)',
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
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Info size={14} color="#06B6D4" />
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
