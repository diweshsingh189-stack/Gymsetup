import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0F172A',
          color: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily: 'var(--font-body, system-ui, sans-serif)'
        }}>
          <div style={{
            maxWidth: '540px',
            width: '100%',
            background: '#131E32',
            border: '1px solid #22324C',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'var(--shadow-modal)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: '#06B6D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <AlertTriangle size={24} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              The application encountered an unexpected issue. You can reload or reset the workspace state.
            </p>

            {this.state.error && (
              <pre style={{
                background: '#0A0F1D',
                border: '1px solid #1E293B',
                padding: '0.75rem',
                borderRadius: '8px',
                color: '#94A3B8',
                fontSize: '0.78rem',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '1.25rem',
                maxHeight: '120px'
              }}>
                {this.state.error.toString()}
              </pre>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                className="btn btn-primary"
                style={{ flex: '1 1 140px' }}
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleClearData}
                className="btn btn-secondary"
                style={{ flex: '1 1 140px' }}
              >
                <Trash2 size={15} />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
