import { env } from './env.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest(path, options = {}) {
  if (!env.apiBaseUrl) {
    throw new Error('A VITE_API_BASE_URL is required to make API requests.');
  }

  const response = await fetch(new URL(path, `${env.apiBaseUrl}/`), {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      `The request failed with status ${response.status}.`,
      response.status,
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
