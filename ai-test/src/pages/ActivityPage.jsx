import {
  Activity,
  Check,
  FileText,
  MessageCircle,
  UserPlus,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader.jsx';
import styles from './ActivityPage.module.css';

const activityItems = [
  {
    icon: Check,
    title: 'Jordan Lee completed a task',
    detail: 'Final review · Mobile launch',
    time: '12 minutes ago',
  },
  {
    icon: MessageCircle,
    title: 'Sam Rivera left a comment',
    detail: '“The updated flow looks great.” · Brand refresh',
    time: '48 minutes ago',
  },
  {
    icon: FileText,
    title: 'Alex Morgan updated a project',
    detail: 'Changed the target date · Atlas redesign',
    time: '2 hours ago',
  },
  {
    icon: UserPlus,
    title: 'Taylor Kim joined the workspace',
    detail: 'Added by Alex Morgan',
    time: 'Yesterday at 4:32 PM',
  },
];

export function ActivityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Activity"
        description="Recent updates from your projects and team."
      />
      <section className={styles.card} aria-labelledby="recent-activity">
        <h2 id="recent-activity">
          <Activity size={17} aria-hidden="true" /> Recent activity
        </h2>
        <ol className={styles.timeline}>
          {activityItems.map(({ icon: Icon, title, detail, time }) => (
            <li key={title} className={styles.item}>
              <span className={styles.icon}>
                <Icon size={16} aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
              <time>{time}</time>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
