import React, { useEffect, useState } from "react";

export function WellnessScoreCard({ score = 0, previousScore = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const incrementTime = 20;
    const step = Math.ceil(score / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        start = score;
        clearInterval(timer);
      }
      setAnimatedScore(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [score]);

  const difference = score - previousScore;

  return (
    <div
      className={`rounded-2xl p-6 text-white shadow-lg
      bg-gradient-to-r from-emerald-500 to-blue-500
      transition duration-300 hover:shadow-2xl hover:-translate-y-1
      ${score > 80 ? "shadow-emerald-400/50 shadow-xl" : ""}`}
    >
      <h2 className="text-lg font-semibold opacity-90">
        Wellness Score
      </h2>

      <p
        className="font-bold mt-2 tracking-tight transition-all duration-300 ease-out"
        style={{ fontSize: `${Math.max(3, Math.min(7, 3 + (score / 100) * 4))}rem`, lineHeight: 1 }}
      >
        {animatedScore}
      </p>

      <p className="text-sm mt-2 opacity-90">
        {difference >= 0 ? "+" : ""}
        {difference} vs last period
      </p>

      <p className="text-xs mt-3 opacity-80">
        0 = low, 100 = excellent
      </p>
    </div>
  );
}