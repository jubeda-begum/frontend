import React from "react";

const HabitCard = ({ habit, onComplete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 
                    rounded-2xl shadow-md p-5 
                    hover:shadow-xl transition-all duration-300">

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {habit.name}
        </h3>

        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {habit.category}
        </span>
      </div>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        🎯 Target: {habit.target} ({habit.frequency})
      </p>

      <p className="mt-2 text-orange-500 font-semibold">
        🔥 {habit.streak || 0} Day Streak
      </p>

      <button
        onClick={() => onComplete(habit.id)}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 
                   text-white py-2 rounded-lg transition"
      >
        Mark as Completed
      </button>
    </div>
  );
};

export default HabitCard;