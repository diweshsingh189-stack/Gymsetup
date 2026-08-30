import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Dumbbell,
  Sun,
  Moon,
  Timer,
  Menu,
  X,
  Search,
  Sparkles,
  CheckSquare
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentTab,
    navigateTo,
    theme,
    toggleTheme,
    mobileMenuOpen,
    setMobileMenuOpen,
    openTimer,
    checklist,
    workoutLogs,
    openSearchModal
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    openSearchModal(searchValue);
    setSearchValue('');
  };

  // Calculate simple stats
  const totalCompletedChecks = Object.values(checklist).filter(Boolean).length;
  const totalWorkouts = workoutLogs.length;

  return (
    <header className="navbar-container" style={{
      height: 'var(--navbar-height)',
      background: 'var(--bg-sidebar)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.75rem',
      backdropFilter: 'blur(12px)'
    }}>
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          className="btn btn-secondary btn-icon mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div
          onClick={() => navigateTo('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
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
              color: '#fff'
            }}
          >
            <Dumbbell size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="logo-text-shimmer" style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-main)'
              }}>
                Gym<span style={{ color: '#10b981' }}>Setup</span>
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                Beginner Edition
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'none' }} className="brand-sub">
              Your Safe Day 1 Companion
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Interactive Quick Search with Explorer Trigger (Desktop Only) */}
      <div style={{ flex: 1, maxWidth: '380px', margin: '0 1rem', display: 'none', minWidth: 0 }} className="nav-search-bar">
        <div
          onClick={() => openSearchModal()}
          style={{
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            minWidth: 0
          }}
        >
          <Search size={16} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#10b981'
          }} />
          <div
            className="input-control"
            style={{
              paddingLeft: '38px',
              paddingRight: '68px',
              height: '38px',
              fontSize: '0.82rem',
              borderRadius: '9999px',
              background: 'var(--bg-app)',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-card)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            Search machines, exercises, workouts...
          </div>
          <span style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.68rem',
            background: 'var(--bg-card-secondary)',
            border: '1px solid var(--border-card)',
            padding: '2px 6px',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            fontWeight: 700
          }}>
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Right: Quick Action Tools */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        {/* Mobile Search Button (Phone & Tablet) */}
        <button
          onClick={() => openSearchModal()}
          className="btn btn-secondary btn-icon mobile-search-btn"
          title="Search All Machines & Exercises"
          aria-label="Search"
          style={{ display: 'none' }}
        >
          <Search size={18} color="#10b981" />
        </button>

        {/* Onboarding Quick Jump */}
        <button
          onClick={() => navigateTo('guided-flow')}
          className="btn btn-outline-emerald btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '9999px', fontSize: '0.8rem' }}
        >
          <Sparkles size={14} />
          <span className="desktop-only-text">I'm New: Start Here</span>
        </button>

        {/* Built-in Timer Button */}
        <button
          onClick={() => openTimer(60, 'Gym Rest Timer')}
          className="btn btn-secondary btn-icon"
          title="Open Rest / Interval Timer"
          aria-label="Open Timer"
        >
          <Timer size={18} color="#10b981" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-icon"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#64748b" />}
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .nav-search-bar {
            display: none !important;
          }
          .mobile-search-btn {
            display: flex !important;
          }
          .brand-sub {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .nav-search-bar {
            display: block !important;
          }
          .mobile-search-btn {
            display: none !important;
          }
          .brand-sub {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .desktop-only-text {
            display: none !important;
          }
          .navbar-container {
            padding: 0 1rem !important;
          }
        }
      `}</style>
    </header>
  );
};
