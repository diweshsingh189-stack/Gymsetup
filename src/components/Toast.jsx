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
        bottom: '24px',
        right: '24px',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        background: isSuccess
          ? 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)'
          : isError
          ? '#881337'
          : '#1e293b',
        color: '#ffffff',
        border: `1px solid ${isSuccess ? '#10b981' : isError ? '#f43f5e' : '#38bdf8'}`,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(16, 185, 129, 0.3)',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {isSuccess && <CheckCircle size={18} color="#34d399" />}
      {isError && <AlertCircle size={18} color="#fb7185" />}
      {!isSuccess && !isError && <Info size={18} color="#38bdf8" />}
      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{toast.message}</span>
    </div>
  );
};
