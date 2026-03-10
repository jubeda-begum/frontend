import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Switch } from '../components/ui/switch.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 dark:from-slate-950 dark:via-[#0a0f12] dark:to-[#0f1a1c]">
      {/* Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="HealthyHabits" className="h-10 w-10 rounded-xl shadow-sm" />
            <span className="text-lg font-semibold tracking-tight">HealthyHabits</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
              <Switch checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Build habits that actually{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              stick
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Track fitness, sleep, hydration, and mindfulness in one place. Get a Wellness Score and
            gentle nudges when your consistency drops.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="w-full min-w-[200px] text-base">
                Start free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full min-w-[200px] text-base">
                Log in
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Habit tracking',
              desc: 'Create habits across fitness, nutrition, hydration, mindfulness, and sleep.',
              icon: '✓'
            },
            {
              title: 'Wellness score',
              desc: 'See your holistic wellness score and get reminders when it drops.',
              icon: '📊'
            },
            {
              title: 'Streaks & analytics',
              desc: 'Visual charts, streaks, and insights to stay motivated.',
              icon: '📈'
            },
            {
              title: 'Mood journal',
              desc: 'Log your mood and see how habits influence your well-being.',
              icon: '💭'
            }
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
            >
              <span className="text-2xl text-slate-800 dark:text-emerald-400">{f.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200/80 py-6 dark:border-slate-800">
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Wellness insights are for awareness only and not a medical diagnosis.
        </p>
      </footer>
    </div>
  );
}
