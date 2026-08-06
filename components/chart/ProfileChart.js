"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const activityData = [
  { day: "Mon", recipes: 2 },
  { day: "Tue", recipes: 5 },
  { day: "Wed", recipes: 0 },
  { day: "Thu", recipes: 7 },
  { day: "Fri", recipes: 0 },
  { day: "Sat", recipes: 0 },
  { day: "Sun", recipes: 6 },
];

const ProfileChart = () => {
  return (
    <article className="h-80 md:h-100 w-130 md:w-160 lg:w-250 border border-gray-300 my-20 p-4 rounded-xl bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={activityData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="recipes"
            stroke="#16a34a"
            fill="#16a34a"
          />

        </AreaChart>
      </ResponsiveContainer>
    </article>
  );
};

export default ProfileChart;
