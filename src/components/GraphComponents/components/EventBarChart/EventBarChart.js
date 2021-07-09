import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
];

export default function EventBarChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      {/* <p>Click each rectangle </p> */}
      <BarChart width={230} height={100} data={data}>
        <Bar dataKey="uv" onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className="font-bold text-gray-500 mt-5">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p>
    </div>
  );
}
