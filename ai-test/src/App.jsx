import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell.jsx';
import { ActivityPage } from './pages/ActivityPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ProjectsPage } from './pages/ProjectsPage.jsx';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
