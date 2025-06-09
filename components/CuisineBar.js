"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CuisineBar = () => {
  const data = [
    { cuisine: "Breakfast", count: 14 },
    { cuisine: "Lunch", count: 9 },
    { cuisine: "Dinner", count: 8 },
    { cuisine: "Dessert", count: 7 },
    { cuisine: "Refreshment", count: 5 },
    { cuisine: "Other", count: 4 },
  ];

  return (
    <div className="bg-white border-1 border-gray-300 ;lg:pb-18 md:pb-14 pb-16 pr-8 my-6 rounded-3xl lg:w-[60vw] w-full">
      <div style={{ width: "100%", height: 300 }}>
        <h2 className="text-xl font-semibold m-6">Your generated recipes</h2>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="cuisine" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4CAF50" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CuisineBar;
