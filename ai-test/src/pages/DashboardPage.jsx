import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCheck,
  CircleDashed,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.jsx';
import { ProjectTable } from '../components/ProjectTable.jsx';
import { QueryState } from '../components/QueryState.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { useProjects } from '../features/projects/useProjects.js';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const query = useProjects();
  const projects = query.data ?? [];
  const activeCount = projects.filter(
    (project) => project.status === 'active',
  ).length;
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <>
      <PageHeader
        eyebrow={today}
        title="Good morning, Alex"
        description="Here’s what’s happening across your workspace today."
      />

      <section className={styles.stats} aria-label="Workspace summary">
        <StatCard
          label="Active projects"
          value={query.isLoading ? '—' : activeCount}
          change="+2.4%"
          icon={BriefcaseBusiness}
        />
        <StatCard
          label="Tasks completed"
          value="128"
          change="+12.8%"
          icon={CheckCheck}
        />
        <StatCard
          label="Team members"
          value="12"
          change="+1 this month"
          icon={UsersRound}
        />
        <StatCard
          label="Hours tracked"
          value="284.5"
          change="-3.2%"
          direction="down"
          icon={CircleDashed}
        />
      </section>

      <section
        className={styles.projectsCard}
        aria-labelledby="projects-heading"
      >
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="projects-heading">Your projects</h2>
            <p>A quick look at what your team is working on.</p>
          </div>
          <Link className="text-link" to="/projects">
            View all <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        {query.isLoading || query.isError ? (
          <QueryState
            isLoading={query.isLoading}
            isError={query.isError}
            error={query.error}
            onRetry={() => query.refetch()}
          />
        ) : (
          <ProjectTable projects={projects.slice(0, 4)} compact />
        )}
      </section>
    </>
  );
}
