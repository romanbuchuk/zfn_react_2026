import { ArrowDown } from 'lucide-react';
import styles from './ProjectTable.module.css';

const statusLabels = {
  active: 'In progress',
  review: 'In review',
  planned: 'Planned',
};

export function ProjectTable({ projects, compact = false }) {
  if (!projects.length) {
    return (
      <div className={styles.empty}>
        <strong>No projects match your filters.</strong>
        <span>Try changing your search or create a new project.</span>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">
              Project <ArrowDown size={13} aria-hidden="true" />
            </th>
            <th scope="col">Status</th>
            <th scope="col">Owner</th>
            <th scope="col">Progress</th>
            {!compact && <th scope="col">Due date</th>}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <span className={styles.project}>
                  <span className={styles.projectMark}>
                    {project.name.slice(0, 1)}
                  </span>
                  <span className={styles.projectName}>{project.name}</span>
                </span>
              </td>
              <td>
                <span className={`${styles.status} ${styles[project.status]}`}>
                  <span />
                  {statusLabels[project.status] ?? project.status}
                </span>
              </td>
              <td>
                <span className={styles.owner}>
                  <span className={styles.ownerAvatar}>
                    {initials(project.owner)}
                  </span>
                  {project.owner}
                </span>
              </td>
              <td>
                <div className={styles.progressCell}>
                  <span>{project.progress}%</span>
                  <div
                    className={styles.progressTrack}
                    role="progressbar"
                    aria-label={`${project.name} completion`}
                    aria-valuenow={project.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </td>
              {!compact && (
                <td className={styles.dueDate}>{project.dueDate}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
