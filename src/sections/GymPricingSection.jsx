import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useApp } from '../context/AppContext';
import { TOP_GYMS_DATA } from '../data/gymPricingData';
import {
  Building2,
  MapPin,
  IndianRupee,
  Star,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  Flame,
  Award,
  PhoneCall,
  Clock,
  Dumbbell,
  X
} from 'lucide-react';
import { playClickBeep } from '../utils/soundEffects';

export const GymPricingSection = () => {
  const { navigateTo } = useApp();
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGymModal, setSelectedGymModal] = useState(null);

  useEffect(() => {
    if (selectedGymModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span className="badge badge-emerald">
              <Building2 size={14} /> Section 13 of 14 — Gym Pricing & Locations
            </span>
            <span className="badge badge-cyan">
              <IndianRupee size={14} /> 2026 Verified Pricing
            </span>
            <span className="badge badge-amber">
              <Star size={14} /> Real Photos & Amenities
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Popular Gym Chains, Locations & Fee Comparison
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Cult.fit, Gold's Gym, Anytime Fitness, Snap Fitness samet Bharat ke sabse popular gym chains ki fees, photos, amenities aur shehar ki complete list.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#10b981' }} />
            <input
              type="text"
              placeholder="Search gym by name (e.g. Cult.fit, Gold's Gym) or city..."
              className="input-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '44px', height: '46px', fontSize: '0.95rem' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* City Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', marginRight: '0.25rem', letterSpacing: '0.04em' }}>
              FILTER CITY:
            </span>
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
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    padding: '0.35rem 0.85rem',
                    fontWeight: isSelected ? 800 : 500
                  }}
                >
                  <span>{c}</span>
                  <span style={{
                    fontSize: '0.68rem',
                    background: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-card)',
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    marginLeft: '4px'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span>
            Showing <strong>{filteredGyms.length}</strong> {selectedCity === 'All' ? 'gyms across India' : `gyms in ${selectedCity}`}
          </span>
          {selectedCity !== 'All' && (
            <button
              onClick={() => setSelectedCity('All')}
              style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
            >
              Show All Cities ↺
            </button>
          )}
        </div>
      </div>

      {/* Gym Cards Grid with Real Photos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {filteredGyms.map((gym) => (
          <div
            key={gym.id}
            className="card card-hover"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0',
              overflow: 'hidden',
              borderRadius: '20px',
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)'
            }}
          >
            {/* Gym Photo Container */}
            <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden' }}>
              <img
                src={gym.image}
                alt={gym.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.4s ease'
                }}
                className="gym-card-img"
              />
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(9, 13, 22, 0.85) 100%)'
              }} />

              {/* Brand Tag Badge */}
              <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '8px',
                    background: gym.badgeColor,
                    color: '#ffffff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {gym.brandTag}
                </span>
              </div>

              {/* Rating on Top Right */}
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.55rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: '#f59e0b',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span>{gym.rating}</span>
                </span>
              </div>

              {/* Gym Name & City at Bottom of Photo */}
              <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)', marginBottom: '2px' }}>
                  {gym.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#e2e8f0', fontSize: '0.82rem', fontWeight: 600 }}>
                  <MapPin size={14} color="#10b981" />
                  <span>{gym.place}</span>
                </div>
              </div>
            </div>

            {/* Gym Content Details */}
            <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '1.15rem' }}>
              <div>
                {/* Price Highlight Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(6, 182, 212, 0.08) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      APPROX. MONTHLY FEE
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '1px' }}>
                      {gym.approxPrice}
                    </div>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Verified</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                  {gym.intro}
                </p>

                {/* Best For */}
                <div style={{ background: 'var(--bg-card-secondary)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  <strong style={{ color: '#06b6d4' }}>🎯 Best For: </strong>
                  <span>{gym.bestFor}</span>
                </div>

                {/* Key Amenities */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    KEY AMENITIES:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {gym.amenities.slice(0, 3).map((am, amIdx) => (
                      <span
                        key={amIdx}
                        style={{
                          fontSize: '0.74rem',
                          background: 'var(--bg-card-secondary)',
                          border: '1px solid var(--border-card)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          color: 'var(--text-main)'
                        }}
                      >
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Full Amenities Button */}
              <button
                onClick={() => {
                  setSelectedGymModal(gym);
                  playClickBeep();
                }}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '10px', fontSize: '0.88rem' }}
              >
                <span>View Full Details & Photo Gallery</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Comparison Quick Table */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Award size={22} color="#10b981" />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Quick Comparison Table (जिम, शहर और फीस सारांश)</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-card-secondary)', borderBottom: '2px solid var(--border-card)' }}>
                <th style={{ padding: '1rem', fontWeight: 800 }}>🏋️ Gym Chain</th>
                <th style={{ padding: '1rem', fontWeight: 800 }}>📍 Key Place</th>
                <th style={{ padding: '1rem', fontWeight: 800 }}>💰 Approx. Price</th>
                <th style={{ padding: '1rem', fontWeight: 800 }}>⭐ Rating</th>
                <th style={{ padding: '1rem', fontWeight: 800 }}>🎯 Best Known For</th>
              </tr>
            </thead>
            <tbody>
              {TOP_GYMS_DATA.map((gym, idx) => (
                <tr
                  key={gym.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                  }}
                >
                  <td style={{ padding: '0.95rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img src={gym.image} alt={gym.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                    <strong>{gym.name}</strong>
                  </td>
                  <td style={{ padding: '0.95rem 1rem', color: 'var(--text-muted)' }}>{gym.place}</td>
                  <td style={{ padding: '0.95rem 1rem', fontWeight: 700, color: '#10b981' }}>{gym.approxPrice}</td>
                  <td style={{ padding: '0.95rem 1rem' }}>
                    <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>⭐ {gym.rating}</span>
                  </td>
                  <td style={{ padding: '0.95rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{gym.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Body Portal Modal: Always 100% Centered on Viewport regardless of page scroll */}
      {selectedGymModal && ReactDOM.createPortal(
        <div
          onClick={() => setSelectedGymModal(null)}
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
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            boxSizing: 'border-box'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '2rem',
              position: 'relative',
              background: '#0f172a',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
              margin: 'auto'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedGymModal(null)}
              className="btn btn-secondary btn-icon"
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '38px', height: '38px', borderRadius: '12px', zIndex: 10 }}
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Header: Title & Badges Centered */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem', paddingRight: '2rem', paddingLeft: '2rem' }}>
              <div style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '8px',
                    background: selectedGymModal.badgeColor,
                    color: '#ffffff'
                  }}
                >
                  {selectedGymModal.brandTag}
                </span>
                <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                  ⭐ {selectedGymModal.rating} ({selectedGymModal.reviewsCount})
                </span>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#f8fafc', marginBottom: '4px' }}>
                {selectedGymModal.name}
              </h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.92rem' }}>
                <MapPin size={16} />
                <span>{selectedGymModal.place}</span>
              </div>
            </div>

            {/* Centered High-Res Gym Photo */}
            <div style={{
              width: '100%',
              height: '260px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative'
            }}>
              <img
                src={selectedGymModal.image}
                alt={selectedGymModal.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
            </div>

            {/* Price & Overview */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                  MONTHLY MEMBERSHIP FEE
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
                  {selectedGymModal.approxPrice}
                </div>
              </div>
              <span className="badge badge-emerald">Verified Branch</span>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {selectedGymModal.intro}
            </p>

            {/* Amenities List */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f8fafc' }}>
                <CheckCircle2 size={18} color="#10b981" />
                All Facilities & Member Amenities:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedGymModal.amenities.map((am, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.9rem',
                      color: '#f8fafc',
                      background: '#1a243b',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0 }} />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setSelectedGymModal(null);
                  navigateTo('first-day');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                <span>Read First Day Prep</span>
              </button>

              <button
                onClick={() => setSelectedGymModal(null)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>Done / Close Window</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
