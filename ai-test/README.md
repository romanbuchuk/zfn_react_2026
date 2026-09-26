# React starter

A self-contained React 19 + Vite application built with JavaScript, React Router, CSS Modules, TanStack Query, and accessible reusable UI patterns.

## Getting started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The projects pages use a small in-memory demo API by default, so the application works without a backend.

## Scripts

| Script                 | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server                             |
| `npm run build`        | Create a production build                                     |
| `npm run preview`      | Preview the production build                                  |
| `npm run lint`         | Run ESLint, including React Hooks and JSX accessibility rules |
| `npm run format:check` | Verify Prettier formatting                                    |
| `npm run cy:open`      | Open Cypress                                                  |
| `npm run test:e2e`     | Start Vite and run Cypress end-to-end tests                   |

The `prepare` script configures the repository Git hook path for `ai-test/.husky`; the pre-commit hook runs lint-staged on changed files.

## Structure

```text
src/
  components/       Shared app shell, tables, feedback, and UI
  context/          Cross-page theme state
  features/projects Project API, query hooks, and forms
  lib/              API client and query/environment configuration
  pages/            Route-level screens
  styles/           Global design tokens and accessibility defaults
cypress/e2e/        Browser-level regression and accessibility checks
```

## Connecting an API

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to an absolute API URL. With a URL configured, the projects feature uses `GET /projects` and `POST /projects`; without one, it uses the in-memory demo adapter. Replace `features/projects/projectApi.js` with the application's real endpoint and response types as the backend contract becomes available.

The environment variable is validated at startup. Do not place secrets in `VITE_` variables: Vite embeds them in client-side output.
