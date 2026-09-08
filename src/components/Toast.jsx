import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        right: '24px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        background: isSuccess ? '#059669' : 'var(--bg-card)',
        color: '#ffffff',
        border: '1px solid #10b981',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {isSuccess ? <CheckCircle size={18} color="#ffffff" /> : <Info size={18} color="#10b981" />}
      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{toast.message}</span>
    </div>
  );
};
