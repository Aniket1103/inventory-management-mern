import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Analytics.css";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group B", value: 300 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#6B26A3", "#FF8042", "#8F5365", "#818228"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Analytics({ userState, inventoryState }) {
  const inventoryData = inventoryState.value;
  let map = {}
  const [chartInp, setChartInp] = useState([]);

  // const chartInp = []
  useEffect(() => {
    inventoryData.forEach(({category, quantity}) => {
      if(map[category]) map[category] += quantity;
      else map[category] = quantity;
    })
    const temp = [];
    Object.keys(map).forEach(key => temp.push({name : key, value : map[key]}))
    setChartInp(temp);
    console.log(chartInp);
  }, [])

  return (
    <div className="chart-container">
      <h1>Analytics</h1>
      <p>
        {
          `
          The inventory management application offers you a diverse range of items across ${chartInp.length} main categories: Electronics, Furniture, and Appliances. With a total of ${inventoryData.length} items, your inventory includes high-performance laptops, ergonomic office chairs, smart refrigerators, and more. The pie chart visually presents the distribution of your items, allowing you to quickly grasp the proportion of each category in your inventory. This insightful chart helps you make informed decisions for effective stock management and identifies trends in your inventory preferences.
          `
        }
      </p>
      <PieChart width={400} height={400}>
        <Pie
          data={chartInp}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
        >
          {chartInp.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
