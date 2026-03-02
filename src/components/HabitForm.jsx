import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Input } from './ui/input.jsx';
import { Select } from './ui/select.jsx';
import { Button } from './ui/button.jsx';

const CATEGORIES = ['Fitness', 'Nutrition', 'Hydration', 'Mindfulness', 'Sleep', 'Other'];

export function HabitForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Fitness',
    goalType: 'daily',
    goalValue: 1,
    unit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      goalValue: Number(form.goalValue) || 1
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Habit</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Habit name</label>
            <Input
              name="name"
              placeholder="Drink water"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <Select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Goal type</label>
            <Select name="goalType" value={form.goalType} onChange={handleChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Goal value</label>
            <Input
              type="number"
              min="1"
              name="goalValue"
              value={form.goalValue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">Unit</label>
            <Input
              name="unit"
              placeholder="glasses, minutes, sessions..."
              value={form.unit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Habit'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

