import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./ResponseChart.css";

const ResponseChart = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState("This year");

  // Sample data points for the chart
  const data = [
    { time: "+4hr", thisYear: 15, lastYear: 12 },
    { time: "+8hr", thisYear: 18, lastYear: 16 },
    { time: "+12hr", thisYear: 22, lastYear: 19 },
    { time: "+24hr", thisYear: 28, lastYear: 24 },
    { time: "+1 Day", thisYear: 26, lastYear: 23 },
    { time: "+4 Day", thisYear: 25, lastYear: 22 },
    { time: "+12 Day", thisYear: 29, lastYear: 26 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='tooltip-label'>{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className='tooltip-value'
              style={{ color: entry.color }}
            >
              {entry.name === "thisYear"
                ? "This year"
                : "Last year"}
              : {entry.value}K
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxisTick = (value) => `${value}K`;

  return (
    <div className='response-chart'>
      <div className='chart-header'>
        <div className='chart-title-section'>
          <h3 className='chart-title'>
            Average Response Chart
          </h3>
          <div className='chart-subtitle'>
            <span className='subtitle-item'>
              Total Page
            </span>
            <span className='subtitle-separator'>•</span>
            <span className='subtitle-item'>
              Operating Status
            </span>
          </div>
        </div>
        <div className='chart-controls'>
          <button
            className={`period-btn ${
              selectedPeriod === "This year" ? "active" : ""
            }`}
            onClick={() => setSelectedPeriod("This year")}
          >
            • This year
          </button>
          <button
            className={`period-btn ${
              selectedPeriod === "Last year" ? "active" : ""
            }`}
            onClick={() => setSelectedPeriod("Last year")}
          >
            • Last year
          </button>
        </div>
      </div>

      <div className='chart-container'>
        <ResponsiveContainer
          width='100%'
          height={280}
        >
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray='none'
              stroke='#f3f4f6'
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey='time'
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickFormatter={formatYAxisTick}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type='monotone'
              dataKey='thisYear'
              stroke='#8b5cf6'
              strokeWidth={3}
              dot={{
                fill: "#8b5cf6",
                strokeWidth: 0,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: "#8b5cf6",
                strokeWidth: 2,
                fill: "#fff",
              }}
              filter='drop-shadow(0 2px 4px rgba(139, 92, 246, 0.2))'
            />
            <Line
              type='monotone'
              dataKey='lastYear'
              stroke='#d1d5db'
              strokeWidth={2}
              strokeDasharray='5 5'
              dot={{
                fill: "#9ca3af",
                strokeWidth: 0,
                r: 3,
              }}
              activeDot={{
                r: 5,
                stroke: "#9ca3af",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseChart;
