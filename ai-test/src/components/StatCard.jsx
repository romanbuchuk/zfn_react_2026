import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import styles from './StatCard.module.css';

export function StatCard({
  label,
  value,
  change,
  direction = 'up',
  icon: Icon,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span>{label}</span>
        <span className={styles.icon}>
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <strong className={styles.value}>{value}</strong>
      <div className={styles.cardFooter}>
        <span
          className={`${styles.change} ${direction === 'down' ? styles.down : ''}`}
        >
          {direction === 'down' ? (
            <ArrowDownRight size={15} aria-hidden="true" />
          ) : (
            <ArrowUpRight size={15} aria-hidden="true" />
          )}
          {change}
        </span>
        <span>vs. last month</span>
      </div>
    </article>
  );
}
