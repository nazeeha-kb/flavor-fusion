"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProfileChart = ({ data = [], loading = false, error = "" }) => {
  const hasData = Array.isArray(data) && data.some((item) => Number(item?.recipes) > 0);

  if (loading) {
    return (
      <article className="h-80 md:h-100 w-130 md:w-160 lg:w-250 border border-gray-300 my-20 p-4 rounded-xl bg-white flex items-center justify-center text-gray-500">
        Loading activity...
      </article>
    );
  }

  if (error) {
    return (
      <article className="h-80 md:h-100 w-130 md:w-160 lg:w-250 border border-gray-300 my-20 p-4 rounded-xl bg-white flex items-center justify-center text-red-500 text-center">
        {error}
      </article>
    );
  }

  if (!hasData) {
    return (
      <article className="h-80 md:h-100 w-130 md:w-160 lg:w-250 border border-gray-300 my-20 p-4 rounded-xl bg-white flex items-center justify-center text-gray-500 text-center">
        No recipe generations yet. Start creating recipes to see your activity here.
      </article>
    );
  }

  return (
    <article className="h-80 md:h-100 w-130 md:w-160 lg:w-250 border border-gray-300 my-20 p-4 rounded-xl bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
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
