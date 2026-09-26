import { useState } from 'react';
import { useCreateProject } from './useProjects.js';
import styles from './CreateProjectForm.module.css';

export function CreateProjectForm({ onCreated }) {
  const mutation = useCreateProject();
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate(
      { name: name.trim(), owner: owner.trim(), status: 'active' },
      {
        onSuccess: () => {
          setName('');
          setOwner('');
          onCreated?.();
        },
      },
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label>
          <span>Project name</span>
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Website refresh"
            required
            maxLength={80}
          />
        </label>
        <label>
          <span>Project owner</span>
          <input
            name="owner"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            placeholder="e.g. Alex Morgan"
            required
            maxLength={60}
          />
        </label>
      </div>
      {mutation.isError && (
        <p className={styles.error} role="alert">
          {mutation.error.message ||
            'The project could not be created. Try again.'}
        </p>
      )}
      <div className={styles.actions}>
        <button
          className="button button--secondary"
          type="button"
          onClick={onCreated}
        >
          Cancel
        </button>
        <button
          className="button button--primary"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating…' : 'Create project'}
        </button>
      </div>
    </form>
  );
}
