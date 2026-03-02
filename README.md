# HealthyHabits Tracker – Frontend

HealthyHabits Tracker is a responsive React app that helps users build and maintain healthy routines across fitness, nutrition, hydration, mindfulness, and sleep. It visualises streaks, completion rates, and an overall wellness score.

## Tech Stack

- **React + Vite**
- **Tailwind CSS**
- **ShadCN-style UI components** (custom `ui/` components)
- **React Router**
- **Axios** for API communication
- **Recharts** for analytics charts

## Folder Structure

```text
src/
  components/
    ui/         # Reusable ShadCN-style primitives (button, card, input, etc.)
    Layout.jsx
    HabitForm.jsx
    HabitList.jsx
    WellnessScoreCard.jsx
    DashboardSummary.jsx
  pages/
    AuthPage.jsx
    DashboardPage.jsx
    HabitsPage.jsx
    AnalyticsPage.jsx
    MoodPage.jsx
  context/
    AuthContext.jsx
    ThemeContext.jsx
  services/
    api.js      # Axios instance
  App.jsx
  main.jsx
  index.css
```

## Features

- **User auth** (register + login) with JWT
- **Habit management** (create, list, delete)
- **Quick logging** (mark habit as completed for today)
- **Wellness score** card with visual feedback when score drops
- **Dashboard summaries** (daily + weekly)
- **Analytics dashboard**:
  - Weekly completion trend (line chart)
  - Category performance (bar chart)
  - Best & worst performing habits
- **Mood tracking** with recent history
- **Dark mode** toggle and fully responsive layout

## Environment

Create a `.env` file in `frontend/`:

```bash
VITE_API_URL=http://localhost:5000/api
```

For production, point `VITE_API_URL` to your deployed backend on Render.

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Deployment (Netlify)

1. Push this frontend folder to a **separate GitHub repo**.
2. On Netlify:
   - New site from Git
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set `VITE_API_URL` environment variable on Netlify to your Render backend URL (e.g. `https://your-api.onrender.com/api`).

