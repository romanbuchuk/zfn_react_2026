import { AlertCircle, LoaderCircle, RotateCcw } from 'lucide-react';
import styles from './QueryState.module.css';

export function QueryState({ isLoading, isError, error, onRetry }) {
  if (isLoading) {
    return (
      <div className={styles.state} role="status">
        <LoaderCircle className={styles.spinner} size={21} aria-hidden="true" />
        <span>Loading projects…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${styles.state} ${styles.error}`} role="alert">
        <AlertCircle size={21} aria-hidden="true" />
        <div>
          <strong>We couldn’t load your projects.</strong>
          <p>{error?.message || 'Check your connection and try again.'}</p>
          {onRetry && (
            <button className="button button--secondary" onClick={onRetry}>
              <RotateCcw size={15} aria-hidden="true" />
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
