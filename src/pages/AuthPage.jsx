import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';

export function AuthPage({ mode }) {
  const isLogin = mode === 'login';
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 px-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row">
        <div className="max-w-md space-y-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Build habits that actually stick.
          </h1>
          <p className="text-sm text-muted-foreground">
            Track fitness, sleep, hydration, and mindfulness in one place. Get a Wellness Score and
            gentle nudges when your consistency drops.
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Visual streaks and weekly summaries</li>
            <li>• Wellness score across life areas</li>
            <li>• Mood tracking and data export</li>
          </ul>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? 'Welcome back' : 'Create your account'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input
                    name="name"
                    placeholder="Alex"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Please wait…' : isLogin ? 'Log in' : 'Sign up'}
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => navigate(isLogin ? '/register' : '/login')}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

