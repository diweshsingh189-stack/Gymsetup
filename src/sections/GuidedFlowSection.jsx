import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUIDED_WIZARD_STEPS } from '../data/guidedStepsData';
import {
  ShieldCheck,
  Flame,
  Layers,
  Dumbbell,
  Apple,
  Trophy,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  Flame,
  Layers,
  Dumbbell,
  Apple,
  Trophy
};

export const GuidedFlowSection = () => {
  const { navigateTo, completeWizard, wizardCompleted } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = GUIDED_WIZARD_STEPS[currentStepIndex];
  const StepIcon = ICON_MAP[step.icon] || Sparkles;
  const isLastStep = currentStepIndex === GUIDED_WIZARD_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeWizard();
    } else {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '1.75rem 1.25rem', textAlign: 'center', background: 'var(--bg-card)' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '0.65rem' }}>
          <Sparkles size={14} /> Guided Onboarding Wizard
        </span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, marginBottom: '0.45rem' }}>
          "I'm New — Where Do I Start?"
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.55 }}>
          A 6-step guided roadmap to eliminate uncertainty and make you feel 100% prepared before you step onto the gym floor.
        </p>

        {/* Step Progress Bar */}
        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {GUIDED_WIZARD_STEPS.map((s, idx) => {
            const isDone = idx < currentStepIndex || (idx === currentStepIndex && wizardCompleted);
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={s.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '9999px',
                  background: isCurrent
                    ? '#FF3B30'
                    : isDone
                    ? 'rgba(255, 59, 48, 0.2)'
                    : 'var(--bg-card-secondary)',
                  color: isCurrent ? '#ffffff' : isDone ? '#FF3B30' : 'var(--text-muted)',
                  border: isCurrent ? '1px solid #FF3B30' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  transition: 'all 0.2s'
                }}
              >
                <span>{s.stepNumber}</span>
                <span className="step-label-text" style={{ display: isCurrent ? 'inline' : 'none' }}>
                  {s.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Content Card */}
      <div className="card" style={{ padding: '1.75rem 1.25rem', position: 'relative' }}>
        {/* Step Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: '#FF3B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              flexShrink: 0
            }}>
              <StepIcon size={24} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.2rem', fontSize: '0.7rem' }}>
                {step.tagline}
              </span>
              <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.55rem)', fontWeight: 800, wordBreak: 'break-word' }}>{step.title}</h2>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, flexShrink: 0 }}>
            Step {currentStepIndex + 1} of {GUIDED_WIZARD_STEPS.length}
          </div>
        </div>

        {/* Step Summary */}
        <div style={{
          background: 'var(--bg-card-secondary)',
          padding: '1rem 1.15rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.94rem',
          color: 'var(--text-main)',
          borderLeft: '4px solid #FF3B30',
          lineHeight: 1.55
        }}>
          {step.summary}
        </div>

        {/* Bullet Points Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
          {step.points.map((pt, pIdx) => (
            <div
              key={pIdx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 59, 48, 0.15)',
                color: '#FF3B30',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                {pt.symbol || '✓'}
              </div>
              <div style={{ minWidth: 0 }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.2rem' }}>{pt.title}</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Celebration State for Last Step */}
        {isLastStep && wizardCompleted && (
          <div style={{
            background: 'rgba(255, 59, 48, 0.1)',
            border: '2px solid #FF3B30',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem 1rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <Trophy size={42} color="#FF3B30" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>You Are Ready for Day 1! 🎉</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', maxWidth: '500px', margin: '0 auto 1.25rem auto' }}>
              You now have the exact blueprint to conquer your first workout safely and with complete confidence.
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigateTo('workout')} className="btn btn-primary" style={{ flex: '1 1 160px' }}>
                <Dumbbell size={16} /> View 20-Min Workout
              </button>
              <button onClick={() => navigateTo('checklist')} className="btn btn-secondary" style={{ flex: '1 1 160px' }}>
                <CheckCircle2 size={16} /> Open Gym Checklist
              </button>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="btn btn-secondary"
            style={{ flex: '1 1 120px', opacity: currentStepIndex === 0 ? 0.4 : 1, cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ flex: '1.5 1 160px' }}
          >
            <span>{step.actionText}</span>
            {isLastStep ? <Trophy size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
