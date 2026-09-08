import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Timer as TimerIcon } from 'lucide-react';

import {
  playTimerTick,
  playWarningTick,
  playTimerComplete,
  speakVoiceCue
} from '../utils/soundEffects';

export const TimerModal = () => {
  const { isTimerOpen, closeTimer, timerInitialSeconds, timerTitle } = useApp();

  const [totalSeconds, setTotalSeconds] = useState(timerInitialSeconds || 60);
  const [timeLeft, setTimeLeft] = useState(timerInitialSeconds || 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Sync initial seconds when opened
  useEffect(() => {
    if (isTimerOpen) {
      setTotalSeconds(timerInitialSeconds || 60);
      setTimeLeft(timerInitialSeconds || 60);
      setIsRunning(true);
      if (soundEnabled) {
        playTimerTick();
      }
    } else {
      setIsRunning(false);
    }
  }, [isTimerOpen, timerInitialSeconds]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            if (soundEnabled) {
              playWarningTick(prev - 1);
            }
          } else if (prev === 1) {
            if (soundEnabled) {
              playTimerComplete();
            }
            if (voiceEnabled) {
              speakVoiceCue('Rest time complete! Ready for your next set.');
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, soundEnabled, voiceEnabled]);

  if (!isTimerOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * (timeLeft / (totalSeconds || 1)));

  const setPreset = (sec) => {
    setTotalSeconds(sec);
    setTimeLeft(sec);
    setIsRunning(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(11, 17, 32, 0.85)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="card" style={{
        maxWidth: '420px',
        width: 'min(420px, 94vw)',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow-modal)'
      }}>
        {/* Close Button */}
        <button
          onClick={closeTimer}
          className="btn btn-secondary btn-icon"
          style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px' }}
        >
          <X size={17} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
          <TimerIcon size={18} color="var(--primary-cyan)" />
          <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
            Rest Interval Pacer
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          {timerTitle || 'Workout Rest Interval'}
        </h3>

        {/* Circular Countdown Progress */}
        <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 1.5rem auto' }}>
          <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="var(--border-subtle)"
              strokeWidth="7"
              fill="none"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="var(--primary-cyan)"
              strokeWidth="7"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: timeLeft === 0 ? 'var(--primary-cyan)' : 'var(--text-main)'
            }}>
              {formattedTime}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {timeLeft === 0 ? 'SET READY!' : isRunning ? 'RESTING...' : 'PAUSED'}
            </span>
          </div>
        </div>

        {/* Quick Duration Presets */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {[30, 60, 90, 120, 180].map((sec) => (
            <button
              key={sec}
              onClick={() => setPreset(sec)}
              className={`btn btn-sm ${totalSeconds === sec ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
            >
              {sec < 60 ? `${sec}s` : `${sec / 60}m`}
            </button>
          ))}
        </div>

        {/* Main Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            onClick={() => setTimeLeft(totalSeconds)}
            className="btn btn-secondary btn-icon"
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn btn-primary"
            style={{ width: '130px', height: '42px', fontSize: '0.92rem' }}
          >
            {isRunning ? (
              <>
                <Pause size={17} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={17} />
                <span>Start</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-secondary btn-icon"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {soundEnabled ? <Volume2 size={18} color="#06B6D4" /> : <VolumeX size={18} color="var(--text-subtle)" />}
          </button>
        </div>

        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          Tip: 60s for isolation machines, 90s–120s for squats & presses.
        </div>
      </div>
    </div>
  );
};
