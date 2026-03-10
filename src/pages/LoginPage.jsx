import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';

export function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.message?.includes('Network') ? 'Cannot reach server. Is the backend running?' : 'Something went wrong');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/30 px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          ← Back to home
        </Link>
        <Card className="border-slate-200/80 shadow-xl dark:border-slate-800">
          <CardHeader className="space-y-1 pb-4">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-transparent text-white">
              <img src="/logo.png" alt="HealthyHabits" className="h-12 w-12 rounded-xl shadow-sm" />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your email and password to sign in.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="h-11"
                />
              </div>
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
                  {error}
                </div>
              )}
              <Button type="submit" className="h-11 w-full" disabled={loading}>
                {loading ? 'Signing in…' : 'Log in'}
              </Button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
