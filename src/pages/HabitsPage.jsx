import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout.jsx";
import { HabitForm } from "../components/HabitForm.jsx";
import { HabitList } from "../components/HabitList.jsx";
import { api } from "../services/api";

export function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formKey, setFormKey] = useState(0);

  const today = new Date().toISOString().slice(0, 10);

  // ===============================
  // 🔹 FETCH HABITS
  // ===============================
  const fetchHabits = async () => {
    try {
      const res = await api.get("/habits");
      setHabits(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load habits");
      setHabits([]);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // ===============================
  // 🔹 AUTO CLEAR SUCCESS MESSAGE
  // ===============================
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // ===============================
  // 🔹 ASK NOTIFICATION PERMISSION (ONCE)
  // ===============================
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ===============================
  // 🔹 CREATE HABIT
  // ===============================
  const handleCreate = async (payload) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/habits", payload);
      setSuccess("Habit created successfully! 🎉");
      setFormKey((k) => k + 1);
      await fetchHabits();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔥 LOG TODAY (STREAK + SUCCESS NOTIFICATION)
  // ===============================
  const handleLogToday = async (log) => {
    setError("");
    try {
      await api.post("/habits/logs", log);
      setSuccess("Habit completed! 🔥");

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("HealthyHabit", {
          body: "Great job! You completed your habit today! 🔥",
        });
      }

      await fetchHabits();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to log habit");
    }
  };

  // ===============================
  // 🔹 DELETE HABIT
  // ===============================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/habits/${id}`);
      setSuccess("Habit deleted successfully");
      await fetchHabits();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete habit");
    }
  };

  // ===============================
  // 🔔 SMART REMINDER AT 8:00 PM
  // ===============================
  useEffect(() => {
    if (!("Notification" in window)) return;

    const checkReminders = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // 🔔 Change this time if needed
      if (hour === 20 && minute === 0) {
        habits.forEach((habit) => {
          const completedToday = habit.logs?.some(
            (log) => log.date === today && log.completed
          );

          if (!completedToday && Notification.permission === "granted") {
            new Notification("HealthyHabit Reminder ⏰", {
              body: `Don't forget to complete: ${habit.name}`,
            });
          }
        });
      }
    };

    const interval = setInterval(checkReminders, 60000);

    return () => clearInterval(interval);
  }, [habits, today]);

  // ===============================
  // 🔹 UI
  // ===============================
  return (
    <Layout>
      <div className="space-y-4">

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
            {success}
          </div>
        )}

        {/* Habit Form */}
        <HabitForm
          key={formKey}
          onSubmit={handleCreate}
          loading={loading}
        />

        {/* Habit List */}
        <HabitList
          habits={habits}
          onLogToday={handleLogToday}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
}