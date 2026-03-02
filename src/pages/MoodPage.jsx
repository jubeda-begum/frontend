import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { api } from "../services/api";

const MOODS = [
  { value: 1, label: "Very low", emoji: "😞", color: "bg-red-500" },
  { value: 2, label: "Low", emoji: "😕", color: "bg-orange-400" },
  { value: 3, label: "OK", emoji: "😐", color: "bg-yellow-400" },
  { value: 4, label: "Good", emoji: "🙂", color: "bg-green-400" },
  { value: 5, label: "Great", emoji: "😄", color: "bg-emerald-500" }
];

export function MoodPage() {
  const [selected, setSelected] = useState(3);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchHistory = async () => {
    setError("");
    try {
      const res = await api.get("/moods");
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load mood history");
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/moods", { mood: selected, note });
      setNote("");
      setSuccess("Mood saved successfully ✨");
      await fetchHistory();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save mood");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-[1.3fr,1.7fr]">

        {/* Alerts */}
        {error && (
          <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="md:col-span-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
            {success}
          </div>
        )}

        {/* Mood Selector Card */}
        <Card className="rounded-2xl shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-1
                         bg-gradient-to-br from-indigo-50 to-blue-50
                         dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">

            {/* Emoji Mood Selector */}
            <div className="flex flex-wrap gap-3">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setSelected(m.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm
                    transition duration-300 hover:scale-105
                    ${
                      selected === m.value
                        ? `${m.color} text-white shadow-lg`
                        : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Reflection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Reflection (optional)
              </label>
              <Input
                placeholder="What influenced your mood today?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="rounded-xl focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500
                         hover:scale-105 transition duration-300 shadow-md"
            >
              {loading ? "Saving…" : "Save Mood"}
            </Button>

            <p className="text-xs text-muted-foreground">
              Over time, you’ll see how consistent habits influence your mental well-being.
            </p>
          </CardContent>
        </Card>

        {/* Mood History Card */}
        <Card className="rounded-2xl shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Recent Mood Log</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {history.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Log your mood for a few days to see patterns.
              </p>
            )}

            {history.map((entry) => {
              const moodObj = MOODS.find((m) => m.value === entry.mood);

              return (
                <div
                  key={entry.id || `${entry.date}-${entry.mood}`}
                  className="flex items-center justify-between p-3 rounded-xl
                             bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {entry.date
                        ? new Date(entry.date).toLocaleDateString()
                        : "—"}
                    </p>
                    {entry.note && (
                      <p className="text-sm mt-1">{entry.note}</p>
                    )}
                  </div>

                  <span className="text-lg">
                    {moodObj?.emoji ?? "🙂"}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
}