import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";

export function HabitList({ habits, onLogToday, onDelete }) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Card className="mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Your Habits
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No habits yet. Start by adding one above.
          </p>
        )}

        {habits.map((habit) => {
          const goalValue = habit.goal_value ?? habit.goalValue ?? 1;
          const goalType = habit.goal_type ?? habit.goalType ?? "daily";
          const streak = habit.streak ?? 0;

          return (
            <div
              key={habit.id}
              className="flex flex-col justify-between rounded-xl 
                         border border-border p-4 
                         bg-background hover:shadow-xl 
                         transition duration-300"
            >
              {/* Habit Info */}
              <div>
                <p className="text-lg font-semibold">
                  {habit.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {habit.category}
                </p>

                <p className="text-sm mt-2 text-muted-foreground">
                  🎯 Goal: {goalValue} {habit.unit} ({goalType})
                </p>

                <p className="text-sm mt-2 font-semibold text-orange-500">
                  🔥 {streak} Day Streak
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    onLogToday({
                      habitId: habit.id,
                      date: today,
                      value: goalValue,
                      completed: true,
                    })
                  }
                >
                  Mark Done
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onDelete(habit.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}