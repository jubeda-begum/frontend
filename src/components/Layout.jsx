import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { Button } from './ui/button.jsx';
import { Switch } from './ui/switch.jsx';

export function Layout({ children }) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', end: true },
    { name: 'Habits', path: '/habits', icon: '✓', end: false },
    { name: 'Analytics', path: '/analytics', icon: '📈', end: false },
    { name: 'Mood', path: '/mood', icon: '💭', end: false },
  ];

  const linkBase =
    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200';

  const activeClass = 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20';
  const inactiveClass = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100';

  const NavContent = () => (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}
        >
          <span className="text-lg">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/80 to-emerald-50/50 dark:from-slate-950 dark:via-[#0a0f12] dark:to-[#0f1a1c] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/20 backdrop-blur-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="HealthyHabits" className="h-10 w-10 rounded-xl shadow-sm" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">HealthyHabits</span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Tracker</span>
            </div>
          </div>
          <NavContent />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="flex items-center justify-between md:justify-end border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md p-4 sticky top-0 z-20">

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" className="p-2 mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
            </Button>
            <img src="/logo.png" alt="HealthyHabits" className="h-8 w-8 rounded-lg shadow-sm" />
            <span className="font-bold text-slate-900 dark:text-white lg:hidden">HealthyHabits</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
              <Switch checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
            {/* Mobile only Dark mode switch to save header space */}
            <div className="sm:hidden flex items-center">
              <Switch checked={theme === 'dark'} onChange={toggleTheme} />
            </div>

            <Button variant="outline" className="border-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[73px] left-0 right-0 bottom-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg z-10 p-4 flex flex-col">
            <NavContent />
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-5xl h-full pb-10">
            {children}
          </div>
          <footer className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
            Wellness insights are for awareness only and not a medical diagnosis.
          </footer>
        </main>
      </div>
    </div>
  );
}

