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
    color: '#10b981',
    items: [
      { id: 'home', num: '01', label: '1. Home Dashboard', icon: Home, badge: 'Home' },
      { id: 'guided-flow', num: '02', label: '2. Guided Day-1 Flow', icon: Sparkles, badge: 'Wizard', highlight: true },
      { id: 'first-day', num: '03', label: '3. First Day Guide', icon: Compass, badge: 'Prep' }
    ]
  },
  {
    category: 'Knowledge & Safety',
    symbol: '🛡️',
    color: '#06b6d4',
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
    color: '#f59e0b',
    items: [
      { id: 'workout', num: '08', label: '8. Beginner Workouts', icon: Dumbbell, badge: '4 Routines' },
      { id: 'nutrition', num: '09', label: '9. Nutrition & Hydration', icon: Apple, badge: 'Fuel' },
      { id: 'recovery', num: '10', label: '10. Sleep & Recovery', icon: MoonStar, badge: 'Rest' }
    ]
  },
  {
    category: 'Tracking & Community',
    symbol: '📊',
    color: '#8b5cf6',
    items: [
      { id: 'tracker', num: '11', label: '11. Workout Tracker', icon: ClipboardList, badge: '10 Points' },
      { id: 'checklist', num: '12', label: '12. Beginner Checklist', icon: CheckCircle2, badge: 'Interactive' },
      { id: 'gym-pricing', num: '13', label: '13. Popular Gyms & Pricing', icon: Building2, badge: 'Prices & Photos', highlight: true },
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
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto'
        }}
      >
        {/* Sidebar Header with Gentle Moving/Floating Logo */}
        <div
          onClick={() => handleNav('home')}
          style={{
            padding: '1.4rem 1.25rem 1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Gentle Floating Animated Logo */}
            <div
              className="logo-floating"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Dumbbell size={21} strokeWidth={2.5} />
            </div>
            <div>
              <div className="logo-text-shimmer" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                Gym<span style={{ color: '#10b981' }}>Setup</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Beginner Fitness SaaS
              </div>
            </div>
          </div>
        </div>

        {/* Quick User Readiness Card */}
        <div style={{ padding: '1rem 1.25rem 0.5rem 1.25rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '0.875rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                DAILY READINESS
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '2px' }}>
                {completedChecks} / 20 Tasks Done
              </div>
            </div>
            <button
              onClick={() => handleNav('checklist')}
              style={{
                background: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Check
            </button>
          </div>
        </div>

        {/* Navigation Sections with Clear Numbers and Icons */}
        <nav style={{ flex: 1, padding: '0.75rem 0.85rem' }}>
          {NAV_ITEMS.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '1.25rem' }}>
              {/* Prominent, Dark & Crisp Category Header with Symbol */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.38rem 0.75rem',
                marginBottom: '0.45rem',
                borderRadius: '8px',
                background: 'var(--bg-card-secondary)',
                border: '1px solid var(--border-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{group.symbol}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-main)'
                  }}>
                    {group.category}
                  </span>
                </div>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: group.color,
                  boxShadow: `0 0 8px ${group.color}`
                }} />
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
                          padding: '0.58rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.12) 100%)'
                            : item.highlight
                            ? 'rgba(16, 185, 129, 0.08)'
                            : 'transparent',
                          color: isActive
                            ? '#10b981'
                            : item.highlight
                            ? '#10b981'
                            : 'var(--text-main)',
                          border: isActive
                            ? '1px solid rgba(16, 185, 129, 0.4)'
                            : item.highlight
                            ? '1px dashed rgba(16, 185, 129, 0.35)'
                            : '1px solid transparent',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          {/* Number Badge */}
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              padding: '0.12rem 0.35rem',
                              borderRadius: '5px',
                              background: isActive ? '#10b981' : 'var(--bg-card-secondary)',
                              color: isActive ? '#ffffff' : 'var(--text-muted)',
                              minWidth: '22px',
                              textAlign: 'center'
                            }}
                          >
                            {item.num}
                          </span>

                          <Icon
                            size={18}
                            color={isActive ? '#10b981' : item.highlight ? '#10b981' : 'var(--text-muted)'}
                            style={{ flexShrink: 0 }}
                          />
                          <span style={{ fontSize: '0.86rem', lineHeight: 1.3 }}>
                            {item.label}
                          </span>
                        </div>

                        {item.badge && (
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              padding: '0.125rem 0.45rem',
                              borderRadius: '9999px',
                              background: isActive ? '#10b981' : 'var(--bg-card-secondary)',
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
          <Info size={15} color="#10b981" />
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
