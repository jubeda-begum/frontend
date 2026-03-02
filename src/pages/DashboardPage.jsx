import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout.jsx";
import { WellnessScoreCard } from "../components/WellnessScoreCard.jsx";
import { DashboardSummary } from "../components/DashboardSummary.jsx";
import { api } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/dashboard/summary");
        setData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // 🔹 Safe defaults
  const currentScore = data?.wellnessScore?.current ?? 0;
  const previousScore = data?.wellnessScore?.previous ?? 0;
  const reminders = data?.reminders ?? [];

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-[2fr,1.5fr]">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* Premium Wellness Card */}
          <WellnessScoreCard
            score={currentScore}
            previousScore={previousScore}
          />

          {/* Summary Cards */}
          <div className="transition duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
            <DashboardSummary
              daily={data?.daily}
              weekly={data?.weekly}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* 🔔 Reminder Center */}
          <Card className="rounded-2xl transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle>Reminder Center</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {reminders.length > 0 ? (
                reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3
                               text-amber-900 dark:border-amber-900/50
                               dark:bg-amber-950 dark:text-amber-100"
                  >
                    <p className="font-semibold">{rem.title}</p>
                    <p className="text-xs opacity-80">{rem.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-green-600 font-medium">
                  ✅ All habits are on track today. Keep it up!
                </p>
              )}
            </CardContent>
          </Card>

          {/* 🎯 Today Focus */}
          <Card className="rounded-2xl transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle>Today's Focus</CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Based on your recent activity, prioritise the lowest-performing
                area first. Small consistent actions compound into major
                improvements.
              </p>

              <ul className="list-disc pl-5 space-y-1">
                <li>Pick one habit you will absolutely complete today.</li>
                <li>Schedule the exact time you’ll do it.</li>
                <li>Mark it complete to protect your streak.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {loading && (
        <p className="mt-6 text-xs text-muted-foreground">
          Loading your dashboard…
        </p>
      )}
    </Layout>
  );
}