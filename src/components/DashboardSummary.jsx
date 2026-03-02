import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";

export function DashboardSummary({ daily, weekly }) {
  const dailyCompletion = daily
    ? Math.round(daily.completionRate * 100)
    : 0;

  const weeklyCompletion = weekly
    ? Math.round(weekly.averageCompletion * 100)
    : 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Today Card */}
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Today
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">

          <p className="text-sm">
            Completed habits:{" "}
            <span className="font-semibold">
              {daily?.completedCount || 0} / {daily?.totalHabits || 0}
            </span>
          </p>

          <p className="text-sm">
            Completion rate:{" "}
            <span className="font-semibold">
              {dailyCompletion}%
            </span>
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${dailyCompletion}%` }}
            />
          </div>

        </CardContent>
      </Card>

      {/* Weekly Card */}
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            This Week
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">

          <p className="text-sm">
            Days tracked:{" "}
            <span className="font-semibold">
              {weekly?.daysTracked || 0} / 7
            </span>
          </p>

          <p className="text-sm">
            Avg completion:{" "}
            <span className="font-semibold">
              {weeklyCompletion}%
            </span>
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${weeklyCompletion}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Aim for at least 70% weekly completion to keep a strong streak.
          </p>

        </CardContent>
      </Card>

    </div>
  );
}