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
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-card)' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> Guided Onboarding Wizard
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          "I'm New — Where Do I Start?"
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          A 6-step guided roadmap to eliminate uncertainty and make you feel 100% prepared before you step onto the gym floor.
        </p>

        {/* Step Progress Bar */}
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          {GUIDED_WIZARD_STEPS.map((s, idx) => {
            const isDone = idx < currentStepIndex || (idx === currentStepIndex && wizardCompleted);
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={s.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '9999px',
                  background: isCurrent
                    ? '#10b981'
                    : isDone
                    ? 'rgba(16, 185, 129, 0.2)'
                    : 'var(--bg-card-secondary)',
                  color: isCurrent ? '#ffffff' : isDone ? '#10b981' : 'var(--text-muted)',
                  border: isCurrent ? '1px solid #10b981' : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
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
      <div className="card" style={{ padding: '2.5rem', position: 'relative' }}>
        {/* Step Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
            }}>
              <StepIcon size={28} />
            </div>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.25rem' }}>
                {step.tagline}
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800 }}>{step.title}</h2>
            </div>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Step {currentStepIndex + 1} of {GUIDED_WIZARD_STEPS.length}
          </div>
        </div>

        {/* Step Summary */}
        <div style={{
          background: 'var(--bg-card-secondary)',
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          fontSize: '1.05rem',
          color: 'var(--text-main)',
          borderLeft: '4px solid #10b981'
        }}>
          {step.summary}
        </div>

        {/* Bullet Points Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {step.points.map((pt, pIdx) => (
            <div
              key={pIdx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {pt.symbol || '✓'}
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{pt.title}</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Celebration State for Last Step */}
        {isLastStep && wizardCompleted && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
            border: '2px solid #10b981',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <Trophy size={48} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>You Are Ready for Day 1! 🎉</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              You now have the exact blueprint to conquer your first workout safely and with complete confidence.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigateTo('workout')} className="btn btn-primary">
                <Dumbbell size={18} /> View 20-Min Workout
              </button>
              <button onClick={() => navigateTo('checklist')} className="btn btn-secondary">
                <CheckCircle2 size={18} /> Open Gym Checklist
              </button>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="btn btn-secondary"
            style={{ opacity: currentStepIndex === 0 ? 0.4 : 1, cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ArrowLeft size={18} />
            <span>Previous Step</span>
          </button>

          <button
            onClick={handleNext}
            className="btn btn-primary btn-lg"
          >
            <span>{step.actionText}</span>
            {isLastStep ? <Trophy size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
