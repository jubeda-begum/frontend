import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { api } from '../services/api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/analytics');
        setData(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load analytics');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[200px] items-center justify-center text-slate-500">
          Loading analytics…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Habit Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground">Total habits tracked</p>
              <p className="text-2xl font-semibold">{data?.totals?.habits || 0}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Overall completion rate</p>
              <p className="text-2xl font-semibold">
                {data ? Math.round((data.totals.completionRate || 0) * 100) : 0}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Best streak</p>
              <p className="text-2xl font-semibold">{data?.totals?.bestStreak || 0} days</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly completion trend</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={Array.isArray(data?.weeklyTrend) ? data.weeklyTrend : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" />
                  <YAxis tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Line type="monotone" dataKey="completion" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category performance</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Array.isArray(data?.byCategory) ? data.byCategory : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="category" />
                  <YAxis tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="completion" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Best &amp; worst performing habits</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <p className="font-medium mb-1">Best habits</p>
              {data?.best?.length ? (
                <ul className="space-y-1">
                  {data.best.map((h) => (
                    <li key={h.id} className="flex justify-between">
                      <span>{h.name}</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        {Math.round(h.completion * 100)}%
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-xs">Not enough data yet.</p>
              )}
            </div>
            <div>
              <p className="font-medium mb-1">Habits that need attention</p>
              {data?.worst?.length ? (
                <ul className="space-y-1">
                  {data.worst.map((h) => (
                    <li key={h.id} className="flex justify-between">
                      <span>{h.name}</span>
                      <span className="text-xs text-destructive">
                        {Math.round(h.completion * 100)}%
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-xs">No low-performing habits yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

