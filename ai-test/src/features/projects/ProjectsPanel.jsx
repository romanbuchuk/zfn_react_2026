import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { QueryState } from '../../components/QueryState.jsx';
import { ProjectTable } from '../../components/ProjectTable.jsx';
import { useProjects } from './useProjects.js';
import styles from './ProjectsPanel.module.css';

const PAGE_SIZE = 4;

export function ProjectsPanel({ compact = false }) {
  const query = useProjects();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(0);

  const filteredProjects = useMemo(() => {
    const projects = query.data ?? [];
    const normalizedSearch = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.owner.toLowerCase().includes(normalizedSearch);
      return matchesSearch && (status === 'all' || project.status === status);
    });
  }, [query.data, search, status]);

  const visibleProjects = compact
    ? filteredProjects.slice(0, 4)
    : filteredProjects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.ceil(filteredProjects.length / PAGE_SIZE);

  return (
    <>
      {!compact && (
        <div className={styles.toolbar}>
          <label className={styles.search}>
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects or owners…"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(0);
              }}
            />
          </label>
          <label className={styles.filter}>
            <span className="sr-only">Filter projects by status</span>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(0);
              }}
            >
              <option value="all">All statuses</option>
              <option value="active">In progress</option>
              <option value="review">In review</option>
              <option value="planned">Planned</option>
            </select>
          </label>
        </div>
      )}
      {query.isLoading || query.isError ? (
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          error={query.error}
          onRetry={() => query.refetch()}
        />
      ) : (
        <>
          <ProjectTable projects={visibleProjects} compact={compact} />
          {!compact && (
            <div className={styles.pagination}>
              <span>
                Showing{' '}
                {filteredProjects.length === 0 ? 0 : page * PAGE_SIZE + 1}–
                {Math.min((page + 1) * PAGE_SIZE, filteredProjects.length)} of{' '}
                {filteredProjects.length} projects
              </span>
              <div>
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={() => setPage((current) => Math.max(0, current - 1))}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(pageCount - 1, current + 1))
                  }
                  disabled={page + 1 >= pageCount}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
