import { Component } from 'react';
import { CircleAlert, RotateCcw } from 'lucide-react';
import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className={styles.container}>
        <CircleAlert aria-hidden="true" size={28} />
        <h1>Something went wrong</h1>
        <p>The page hit an unexpected error. Try reloading to continue.</p>
        <button
          className="button button--primary"
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Reload page
        </button>
      </main>
    );
  }
}
