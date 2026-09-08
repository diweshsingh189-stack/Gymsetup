import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Package,
  HeartHandshake,
  ArrowRight,
  Dumbbell
} from 'lucide-react';

export const FirstDaySection = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('before');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.65rem' }}>
            <Compass size={13} /> Section 3 of 14 — Step-by-Step Day 1 Protocol
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            First Day Gym Guide
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            The complete blueprint for your very first hour at the gym: what to pack before leaving home, exactly how to navigate reception and locker rooms, and how to conquer anxiety.
          </p>
        </div>
      </div>

      {/* 3-Phase Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { id: 'before', label: '1. Before Leaving Home (Prep)', icon: Package },
          { id: 'during', label: '2. During Gym Session (Execution)', icon: Dumbbell },
          { id: 'after', label: '3. After Finishing (Recovery)', icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.84rem',
                padding: '0.45rem 1rem'
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>      {/* Tab 1: Before Gym */}
      {activeTab === 'before' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={19} color="var(--primary-cyan)" /> What to Pack in Your Gym Bag
            </h3>
            <div className="grid-2">
              <div style={{ background: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-cyan)' }}>Must-Haves:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.15rem', fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li><strong>Clean pair of athletic sneakers</strong> (keep outdoors mud off the gym floor)</li>
                  <li><strong>Water bottle (750ml - 1L)</strong> to sip between sets</li>
                  <li><strong>Small sweat towel</strong> to wipe equipment and personal sweat</li>
                  <li><strong>Padlock or combination lock</strong> for locker room storage</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-cyan)' }}>Comfort Boosters:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.15rem', fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li><strong>Headphones / Earbuds</strong> (listening to favorite music cuts anxiety by 70%)</li>
                  <li><strong>Pre-workout snack</strong> (1 banana or 2 dates 45 mins before)</li>
                  <li><strong>Comfortable breathable clothes</strong> (cotton/polyester t-shirt & gym shorts)</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => navigateTo('checklist')} className="btn btn-outline-cyan btn-sm">
                Open Interactive Checklist <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '3px solid var(--primary-cyan)' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={19} color="var(--primary-cyan)" /> Gym Anxiety Conquer Kit
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Feeling nervous on Day 1 is completely natural. Remember these 3 facts:
            </p>
            <div className="grid-3">
              <div style={{ background: 'var(--bg-app)', padding: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>The "Spotlight Effect" Illusion</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Psychological studies prove people think everyone is watching them, when in reality everyone is focused on their own workout.
                </p>
              </div>
              <div style={{ background: 'var(--bg-app)', padding: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Staff is There to Help</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Never hesitate to ask front-desk staff: "Can you show me where the water refill station is?" They are paid to assist you.
                </p>
              </div>
              <div style={{ background: 'var(--bg-app)', padding: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Your Goal is Just 25 Mins</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  You don't need a 2-hour workout. 20-25 minutes is an absolute victory for your first gym session.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: During Gym */}
      {activeTab === 'during' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Step-by-Step Gym Floor Protocol
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                {
                  step: 'Step 1: Check In & Locker Room',
                  desc: 'Scan your barcode or member app at the front gate. Head into the locker room, find an open locker, store your bag, and lock it with your padlock.'
                },
                {
                  step: 'Step 2: Head to the Cardio Area First',
                  desc: 'Cardio machines (treadmills, stationary bikes) overlook the main gym floor. Walking for 5-8 minutes lets you scan the room layout comfortably.'
                },
                {
                  step: 'Step 3: Try 2 Pin-Selectorized Machines',
                  desc: 'Choose the Seated Chest Press and Lat Pulldown. Adjust the seat height so handles align with your chest, select a light pin (15-20kg), and perform 2 sets of 10 smooth reps.'
                },
                {
                  step: 'Step 4: Wipe Down & Re-Rack',
                  desc: 'Grab a paper towel and disinfectant spray from the sanitization station, wipe down the seat and handles where you sat, and dispose of the towel in the bin.'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.85rem', background: 'var(--bg-app)', padding: '1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary-cyan-tint)', color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '0.85rem' }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.96rem', fontWeight: 700, marginBottom: '0.2rem', color: 'var(--text-main)' }}>{item.step}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
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
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Post-Workout Routine (The Next 2 Hours)
            </h3>

            <div className="grid-2">
              <div style={{ background: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--primary-cyan)' }}>Hydrate & Refuel</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Drink 500ml of fresh water. Have a balanced meal with protein and complex carbs (like eggs on toast, chicken rice bowl, or Greek yogurt) to feed your recovering muscles.
                </p>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--primary-cyan)' }}>Log Your First Session</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Open the GymSetup Workout Tracker and record the exercises you completed today. Logging your first session builds instant habit momentum.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem' }}>
              <button onClick={() => navigateTo('tracker')} className="btn btn-primary">
                Log First Session in Tracker <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
