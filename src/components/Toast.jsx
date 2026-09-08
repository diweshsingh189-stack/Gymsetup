import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        right: '20px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.75rem 1.15rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-card)',
        color: 'var(--text-main)',
        border: '1px solid var(--primary-cyan)',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} color="var(--primary-cyan)" style={{ flexShrink: 0 }} />
      ) : (
        <Info size={18} color="var(--primary-cyan)" style={{ flexShrink: 0 }} />
      )}
      <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>{toast.message}</span>
    </div>
  );
};
