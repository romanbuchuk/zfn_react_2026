import { apiRequest } from '../../lib/apiClient.js';
import { env } from '../../lib/env.js';

const wait = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

let demoProjects = [
  {
    id: 'p-1',
    name: 'Atlas redesign',
    owner: 'Alex Morgan',
    status: 'active',
    progress: 72,
    dueDate: 'Oct 18, 2026',
  },
  {
    id: 'p-2',
    name: 'Mobile launch',
    owner: 'Jordan Lee',
    status: 'review',
    progress: 88,
    dueDate: 'Oct 22, 2026',
  },
  {
    id: 'p-3',
    name: 'Brand refresh',
    owner: 'Sam Rivera',
    status: 'active',
    progress: 46,
    dueDate: 'Nov 02, 2026',
  },
  {
    id: 'p-4',
    name: 'Customer portal',
    owner: 'Taylor Kim',
    status: 'planned',
    progress: 18,
    dueDate: 'Nov 14, 2026',
  },
  {
    id: 'p-5',
    name: 'Analytics v2',
    owner: 'Alex Morgan',
    status: 'review',
    progress: 95,
    dueDate: 'Oct 12, 2026',
  },
];

export async function listProjects({ signal } = {}) {
  if (env.apiBaseUrl) return apiRequest('/projects', { signal });
  await wait(250);
  if (signal?.aborted) throw new DOMException('Request aborted.', 'AbortError');
  return [...demoProjects];
}

export async function createProject(project) {
  if (env.apiBaseUrl) {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  await wait(180);
  const createdProject = {
    ...project,
    id: `p-${Date.now()}`,
    progress: 0,
    dueDate: 'Not scheduled',
  };
  demoProjects = [createdProject, ...demoProjects];
  return createdProject;
}
