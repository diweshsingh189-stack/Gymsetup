import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useApp } from '../context/AppContext';
import { TOP_GYMS_DATA } from '../data/gymPricingData';
import {
  Building2,
  MapPin,
  IndianRupee,
  Star,
  Search,
  Award,
  X
} from 'lucide-react';
import { playClickBeep } from '../utils/soundEffects';

export const GymPricingSection = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGymModal, setSelectedGymModal] = useState(null);

  useEffect(() => {
    if (selectedGymModal) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedGymModal(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedGymModal]);

  const cities = ['All', 'Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

  const filteredGyms = TOP_GYMS_DATA.filter((gym) => {
    const matchesCity = selectedCity === 'All' || gym.primaryCity.toLowerCase() === selectedCity.toLowerCase() || gym.place.toLowerCase().includes(selectedCity.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      gym.name.toLowerCase().includes(query) ||
      gym.place.toLowerCase().includes(query) ||
      gym.primaryCity.toLowerCase().includes(query) ||
      gym.bestFor.toLowerCase().includes(query) ||
      gym.approxPrice.toLowerCase().includes(query);

    return matchesCity && matchesQuery;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
            <span className="badge badge-cyan">
              <Building2 size={13} /> Section 13 of 14 — Gym Pricing & Locations
            </span>
            <span className="badge badge-neutral">
              <IndianRupee size={13} /> 2026 Verified Pricing
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Popular Gym Chains, Locations & Fee Comparison
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Cult.fit, Gold's Gym, Anytime Fitness, Snap Fitness and top gym chains comparison: fees, locations, amenities, and photo galleries across major Indian cities.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: 'min(100%, 220px)' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#06B6D4' }} />
            <input
              type="text"
              placeholder="Search gym by name (e.g. Cult.fit, Gold's Gym) or city..."
              className="input-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px', height: '42px', fontSize: '0.9rem' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* City Filter Pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {cities.map((c) => {
              const isSelected = selectedCity === c;
              const count = c === 'All' ? TOP_GYMS_DATA.length : TOP_GYMS_DATA.filter(g => g.primaryCity === c).length;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedCity(c);
                    playClickBeep();
                  }}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    padding: '0.25rem 0.7rem',
                    fontWeight: isSelected ? 700 : 500
                  }}
                >
                  <span>{c}</span>
                  <span style={{
                    fontSize: '0.66rem',
                    background: isSelected ? 'rgba(15, 23, 42, 0.25)' : 'var(--bg-card)',
                    padding: '1px 5px',
                    borderRadius: 'var(--radius-full)',
                    marginLeft: '3px'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>
            Showing <strong>{filteredGyms.length}</strong> {selectedCity === 'All' ? 'gyms across India' : `gyms in ${selectedCity}`}
          </span>
          {selectedCity !== 'All' && (
            <button
              onClick={() => setSelectedCity('All')}
              style={{ background: 'none', border: 'none', color: '#06B6D4', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem' }}
            >
              Show All Cities ↺
            </button>
          )}
        </div>
      </div>

      {/* Gym Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
        {filteredGyms.map((gym) => (
          <div
            key={gym.id}
            className="card card-hover"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)'
            }}
          >
            {/* Gym Photo */}
            <div style={{ position: 'relative', height: '190px', width: '100%', overflow: 'hidden' }}>
              <img
                src={gym.image}
                alt={gym.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.88) 100%)'
              }} />

              {/* Brand Tag Badge */}
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    background: 'var(--primary-cyan)',
                    color: '#ffffff',
                    letterSpacing: '0.02em'
                  }}
                >
                  {gym.brandTag}
                </span>
              </div>

              {/* Rating Top Right */}
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#06B6D4',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}>
                  <Star size={12} fill="#06B6D4" color="#06B6D4" />
                  <span>{gym.rating}</span>
                </span>
              </div>

              {/* Gym Name & Place */}
              <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', marginBottom: '2px' }}>
                  {gym.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e2e8f0', fontSize: '0.78rem', fontWeight: 600 }}>
                  <MapPin size={13} color="#06B6D4" />
                  <span>{gym.place}</span>
                </div>
              </div>
            </div>

            {/* Gym Details */}
            <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                {/* Price Banner */}
                <div style={{
                  background: 'var(--bg-app)',
                  border: '1px solid var(--primary-cyan-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--primary-cyan)', textTransform: 'uppercase' }}>
                      APPROX. MONTHLY FEE
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '1px' }}>
                      {gym.approxPrice}
                    </div>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.66rem' }}>Verified</span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.65rem' }}>
                  {gym.intro}
                </p>

                {/* Best For */}
                <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.55rem 0.75rem', borderRadius: '8px', fontSize: '0.76rem', marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#06B6D4' }}>🎯 Best For: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{gym.bestFor}</span>
                </div>

                {/* Key Amenities */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {gym.amenities.slice(0, 3).map((am, amIdx) => (
                    <span
                      key={amIdx}
                      style={{
                        fontSize: '0.7rem',
                        background: 'var(--bg-app)',
                        border: '1px solid var(--border-card)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedGymModal(gym);
                  playClickBeep();
                }}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
              >
                <span>View Full Details & Photo Gallery</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Quick Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award size={20} color="#06B6D4" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Quick Comparison Table</h3>
        </div>

        <div className="desktop-pricing-table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-card-secondary)', borderBottom: '1px solid var(--border-card)' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Gym Chain</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Key Place</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Approx. Price</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Rating</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Best Known For</th>
              </tr>
            </thead>
            <tbody>
              {TOP_GYMS_DATA.map((gym) => (
                <tr
                  key={gym.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {gym.name}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                    {gym.place}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#06B6D4' }}>
                    {gym.approxPrice}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      ★ {gym.rating}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                    {gym.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gym Photo Modal */}
      {selectedGymModal && ReactDOM.createPortal(
        <div
          onClick={() => setSelectedGymModal(null)}
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
              maxWidth: '640px',
              width: 'min(640px, 94vw)',
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
            {/* Modal Photo */}
            <div style={{ position: 'relative', height: '220px', width: '100%' }}>
              <img
                src={selectedGymModal.image}
                alt={selectedGymModal.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedGymModal(null)}
                className="btn btn-secondary btn-icon"
                style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', background: 'rgba(15, 23, 42, 0.85)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Details */}
            <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedGymModal.name}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} color="#06B6D4" />
                    <span>{selectedGymModal.place}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06B6D4' }}>{selectedGymModal.approxPrice}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Plan</div>
                </div>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {selectedGymModal.intro}
              </p>

              {/* All Amenities */}
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.45rem', color: '#06B6D4' }}>Included Amenities:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                  {selectedGymModal.amenities.map((am, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      ✓ {am}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
