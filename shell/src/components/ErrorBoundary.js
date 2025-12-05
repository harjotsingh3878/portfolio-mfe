import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Micro Frontend Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>⚠️ Something went wrong</h2>
          <p>A micro frontend failed to load. Please try refreshing the page.</p>
          <details style={{ marginTop: '1rem', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer' }}>Error Details</summary>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
