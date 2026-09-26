import {
  Activity,
  ArrowUpRight,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  Layers3,
} from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/useTheme.js';
import styles from './AppShell.module.css';

const navigation = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Projects', icon: Layers3 },
  { to: '/activity', label: 'Activity', icon: Activity },
];

const pageTitles = {
  '/': 'Overview',
  '/projects': 'Projects',
  '/activity': 'Activity',
};

export function AppShell() {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? 'Page not found';

  return (
    <div className={`${styles.shell} ${collapsed ? styles.collapsed : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside className={styles.sidebar} aria-label="Main navigation">
        <NavLink className={styles.brand} to="/" aria-label="Northstar home">
          <span className={styles.brandMark}>N</span>
          <span className={styles.brandName}>northstar</span>
        </NavLink>
        <p className={styles.navLabel}>Workspace</p>
        <nav className={styles.navigation}>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              aria-label={label}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.workspaceCard}>
            <div className={styles.avatar}>NS</div>
            <div className={styles.workspaceDetails}>
              <strong>Northstar Studio</strong>
              <span>Starter workspace</span>
            </div>
            <ArrowUpRight size={15} aria-hidden="true" />
          </div>
        </div>
      </aside>

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <div className={styles.topbarStart}>
            <button
              className="icon-button"
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <PanelLeftOpen size={18} aria-hidden="true" />
              ) : (
                <PanelLeftClose size={18} aria-hidden="true" />
              )}
            </button>
            <span className={styles.breadcrumb}>Workspace</span>
            <span className={styles.breadcrumbDivider}>/</span>
            <span className={styles.currentPage}>{title}</span>
          </div>
          <div className={styles.topbarEnd}>
            <span className={styles.status}>
              <span />
              All systems normal
            </span>
            <button
              className="icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title="Toggle color theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} aria-hidden="true" />
              ) : (
                <Moon size={18} aria-hidden="true" />
              )}
            </button>
            <div className={styles.profileAvatar} aria-label="Alex Morgan">
              AM
            </div>
          </div>
        </header>
        <main id="main-content" className={styles.content} tabIndex="-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
