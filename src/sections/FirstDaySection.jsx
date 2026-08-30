import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Clock,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Package,
  HeartHandshake,
  ArrowRight,
  ShieldAlert,
  Dumbbell
} from 'lucide-react';

export const FirstDaySection = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('before');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '750px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Compass size={14} /> Section 2 of 11
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            First Day Gym Guide
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            The complete blueprint for your very first hour at the gym. What to do before leaving home, exactly how to navigate the reception & locker room, and how to finish your first session feeling energized.
          </p>
        </div>
      </div>

      {/* 3-Phase Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { id: 'before', label: '1. Before Leaving Home (Prep)', icon: Package },
          { id: 'during', label: '2. During Gym Session (Execution)', icon: Dumbbell },
          { id: 'after', label: '3. After Finishing (Recovery)', icon: CheckCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '9999px', fontSize: '0.9rem' }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Before Gym */}
      {activeTab === 'before' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} /> What to Pack in Your Gym Bag
            </h3>
            <div className="grid-2">
              <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10b981' }}>Must-Haves:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Clean pair of athletic sneakers</strong> (keep outdoors mud off the gym floor)</li>
                  <li><strong>Water bottle (750ml - 1L)</strong> to sip between sets</li>
                  <li><strong>Small sweat towel</strong> to wipe equipment and personal sweat</li>
                  <li><strong>Padlock or combination lock</strong> for the locker room lockers</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#06b6d4' }}>Comfort Boosters:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Headphones / Earbuds</strong> (listening to favorite music cuts anxiety by 70%)</li>
                  <li><strong>Pre-workout snack</strong> (1 banana or 2 dates 45 mins before)</li>
                  <li><strong>Comfortable breathable clothes</strong> (cotton/polyester t-shirt & gym shorts)</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => navigateTo('checklist')} className="btn btn-outline-emerald btn-sm">
                Open Interactive Checklist <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={20} /> Gym Anxiety Conquer Kit
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Feeling nervous on Day 1 is completely natural. Remember:
            </p>
            <div className="grid-3">
              <div style={{ background: 'var(--bg-card-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>The "Spotlight Effect" Illusion</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Psychological studies prove people think everyone is watching them, when in reality everyone is looking at themselves.
                </p>
              </div>
              <div style={{ background: 'var(--bg-card-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Staff is There to Help</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Never hesitate to ask front-desk staff: "Can you show me where the water refill station is?" They love helping beginners.
                </p>
              </div>
              <div style={{ background: 'var(--bg-card-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Your Goal is Just 25 Mins</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  You don't need a 2-hour workout. 20-25 minutes is an absolute home run for your first session.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: During Gym */}
      {activeTab === 'during' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: '#10b981' }}>
              Step-by-Step Gym Floor Protocol
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  step: 'Step 1: Check In & Locker Room',
                  desc: 'Scan your barcode/app at the front gate. Head into the locker room, find an open locker, store your bag and jacket, and lock it with your padlock.'
                },
                {
                  step: 'Step 2: Head to the Cardio Area First',
                  desc: 'Cardio machines (treadmills, stationary bikes) are elevated and overlook the gym. Walking for 5-8 minutes lets you scan the room layout comfortably without anyone watching.'
                },
                {
                  step: 'Step 3: Try 2 Pin-Selectorized Machines',
                  desc: 'Choose the Seated Chest Press and Lat Pulldown. Adjust the seat so handles align with your chest, select a light pin (15-20kg), and perform 2 sets of 10 smooth reps.'
                },
                {
                  step: 'Step 4: Wipe Down & Re-Rack',
                  desc: 'Grab a paper towel and disinfectant spray from the wall station, wipe down the seat and handles where you sat, and throw the paper towel in the bin.'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.step}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigateTo('equipment')} className="btn btn-primary btn-sm">
                View Machine Guide <ArrowRight size={14} />
              </button>
              <button onClick={() => navigateTo('workout')} className="btn btn-secondary btn-sm">
                View 20-Min Intro Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: After Gym */}
      {activeTab === 'after' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: '#8b5cf6' }}>
              Post-Workout Routine (The Next 2 Hours)
            </h3>

            <div className="grid-2">
              <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10b981' }}>Hydrate & Refuel</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Drink 500ml of fresh water. Have a balanced meal with protein and complex carbs (like eggs on toast, chicken rice bowl, or Greek yogurt) to feed your recovering muscles.
                </p>
              </div>

              <div style={{ background: 'var(--bg-card-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#06b6d4' }}>Log Your First Session</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Open the GymSetup Workout Tracker and log the exercises you tried today. Seeing your first logged workout builds instant habit momentum!
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => navigateTo('tracker')} className="btn btn-primary">
                Log First Session in Tracker <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
