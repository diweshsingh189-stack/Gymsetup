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
  Command
} from 'lucide-react';

export const Navbar = () => {
  const {
    navigateTo,
    theme,
    toggleTheme,
    mobileMenuOpen,
    setMobileMenuOpen,
    openTimer,
    openSearchModal
  } = useApp();

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
      boxShadow: 'var(--shadow-xs)'
    }}>
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <button
          className="btn btn-secondary btn-icon mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <div
          onClick={() => navigateTo('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--primary-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(6, 182, 212, 0.25)'
            }}
          >
            <Dumbbell size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-main)',
                whiteSpace: 'nowrap'
              }}>
                Gym<span style={{ color: 'var(--primary-cyan)' }}>Setup</span>
              </span>
              <span className="badge badge-cyan nav-badge-edition" style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}>
                Beginner Hub
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Interactive Quick Search with Explorer Trigger (Desktop Only) */}
      <div style={{ flex: 1, maxWidth: '380px', margin: '0 1.25rem', display: 'none', minWidth: 0 }} className="nav-search-bar">
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
          <Search size={15} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#06B6D4'
          }} />
          <div
            className="input-control nav-search-input"
            style={{
              paddingLeft: '36px',
              paddingRight: '60px',
              height: '38px',
              fontSize: '0.84rem',
              borderRadius: '9999px',
              background: 'var(--bg-input)',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-card)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              userSelect: 'none'
            }}
          >
            Search machines, exercises, routines...
          </div>
          <div
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'var(--bg-card-secondary)',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <Command size={10} /> K
          </div>
        </div>
      </div>

      {/* Right: Quick Action Tools */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
        {/* Mobile Search Button (Phone & Tablet) */}
        <button
          onClick={() => openSearchModal()}
          className="btn btn-secondary btn-icon mobile-search-btn"
          title="Search All Machines & Exercises"
          aria-label="Search"
          style={{ display: 'none' }}
        >
          <Search size={17} color="#06B6D4" />
        </button>

        {/* Onboarding Quick Jump */}
        <button
          onClick={() => navigateTo('guided-flow')}
          className="btn btn-outline-cyan btn-sm nav-start-btn"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderRadius: '9999px', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
        >
          <Sparkles size={13} />
          <span>Start Here</span>
        </button>

        {/* Built-in Rest Timer Button */}
        <button
          onClick={() => openTimer(60, 'Gym Rest Timer')}
          className="btn btn-secondary btn-icon"
          title="Open Rest Timer"
          aria-label="Open Timer"
        >
          <Timer size={17} color="#06B6D4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-icon"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} color="#06B6D4" /> : <Moon size={17} color="#64748B" />}
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
        }
        @media (min-width: 1025px) {
          .nav-search-bar {
            display: block !important;
          }
          .mobile-search-btn {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .nav-start-btn {
            display: none !important;
          }
          .nav-badge-edition {
            display: none !important;
          }
          .navbar-container {
            padding: 0 0.85rem !important;
          }
          .btn-icon {
            width: 36px !important;
            height: 36px !important;
          }
        }
        @media (max-width: 380px) {
          .navbar-container {
            padding: 0 0.5rem !important;
          }
          .btn-icon {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>
    </header>
  );
};
