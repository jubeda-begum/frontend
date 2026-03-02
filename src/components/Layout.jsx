import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { Button } from './ui/button.jsx';
import { Switch } from './ui/switch.jsx';

export function Layout({ children }) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-primary/10 p-2 text-primary font-bold">HH</span>
            <div>
              <p className="text-base font-semibold">HealthyHabits Tracker</p>
              <p className="text-xs text-muted-foreground">
                Build consistent habits for better wellness
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{theme === 'light' ? 'Light' : 'Dark'} mode</span>
              <Switch checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 px-4 pb-3">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/habits"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`
            }
          >
            Habits
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/mood"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`
            }
          >
            Mood
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4">{children}</main>
      <footer className="border-t border-border py-3 text-center text-xs text-muted-foreground">
        Wellness insights are for awareness only and not a medical diagnosis.
      </footer>
    </div>
  );
}

