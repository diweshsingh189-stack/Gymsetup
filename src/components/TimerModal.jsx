import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Flame } from 'lucide-react';

import {
  playTimerTick,
  playWarningTick,
  playTimerComplete,
  playSuccessChime,
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

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * (timeLeft / totalSeconds));

  const setPreset = (sec) => {
    setTotalSeconds(sec);
    setTimeLeft(sec);
    setIsRunning(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="card card-glow-emerald" style={{
        maxWidth: '440px',
        width: '100%',
        background: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={closeTimer}
          className="btn btn-secondary btn-icon"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '36px', height: '36px' }}
        >
          <X size={18} />
        </button>

        {/* Title & Sound toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Flame size={20} color="#10b981" />
          <h3 style={{ fontSize: '1.25rem' }}>{timerTitle}</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Catch your breath & let your nervous system recover
        </p>

        {/* Circular Progress Display */}
        <div style={{ position: 'relative', width: '190px', height: '190px', margin: '0 auto 1.5rem auto' }}>
          <svg width="190" height="190" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background Track */}
            <circle
              cx="95"
              cy="95"
              r={radius}
              stroke="var(--border-card)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="95"
              cy="95"
              r={radius}
              stroke="#10b981"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

          {/* Time text centered */}
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
              color: timeLeft === 0 ? '#10b981' : 'var(--text-main)'
            }}>
              {timeLeft === 0 ? 'Done!' : formattedTime}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isRunning ? 'Counting down...' : timeLeft === 0 ? 'Ready for next set!' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn btn-primary"
            style={{ minWidth: '120px' }}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            onClick={() => {
              setTimeLeft(totalSeconds);
              setIsRunning(false);
            }}
            className="btn btn-secondary btn-icon"
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playSuccessChime();
            }}
            className="btn btn-secondary btn-icon"
            title={soundEnabled ? 'Mute Audio Cues' : 'Unmute Audio Cues'}
          >
            {soundEnabled ? <Volume2 size={18} color="#10b981" /> : <VolumeX size={18} color="#64748b" />}
          </button>
        </div>

        {/* Audio Test & Voice Cue Row */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.78rem' }}>
          <button
            type="button"
            onClick={() => {
              playTimerComplete();
              if (voiceEnabled) speakVoiceCue('Audio test complete. Rest timer ready!');
            }}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            🔊 Test Sound
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => {
                setVoiceEnabled(e.target.checked);
                if (e.target.checked) speakVoiceCue('Voice guidance enabled');
              }}
              style={{ accentColor: '#10b981' }}
            />
            <span>Voice Cues 🗣️</span>
          </label>
        </div>

        {/* Quick Interval Presets */}
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
            QUICK PRESETS:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: '30s (Warmup)', val: 30 },
              { label: '60s (Standard)', val: 60 },
              { label: '90s (Compound)', val: 90 },
              { label: '120s (Heavy)', val: 120 }
            ].map(p => (
              <button
                key={p.val}
                onClick={() => {
                  setPreset(p.val);
                  if (soundEnabled) playTimerTick();
                }}
                className={`btn btn-sm ${totalSeconds === p.val ? 'btn-outline-emerald' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem' }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
