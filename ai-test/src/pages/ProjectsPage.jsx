import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/PageHeader.jsx';
import { ProjectsPanel } from '../features/projects/ProjectsPanel.jsx';
import { CreateProjectForm } from '../features/projects/CreateProjectForm.jsx';
import styles from './ProjectsPage.module.css';

export function ProjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Keep track of your team's work, progress, and upcoming deadlines."
        action={
          <button
            className="button button--primary"
            type="button"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus size={17} aria-hidden="true" />
            New project
          </button>
        }
      />
      <section className={styles.card} aria-label="Projects list">
        <ProjectsPanel />
      </section>
      {isFormOpen && (
        <div className={styles.backdrop}>
          <section
            aria-labelledby="create-project-title"
            aria-modal="true"
            className={styles.dialog}
            role="dialog"
          >
            <div className={styles.dialogHeader}>
              <div>
                <h2 id="create-project-title">Create a project</h2>
                <p>Add a project to your workspace.</p>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close dialog"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
            </div>
            <CreateProjectForm onCreated={() => setIsFormOpen(false)} />
          </section>
        </div>
      )}
    </>
  );
}
