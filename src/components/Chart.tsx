import type React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { daily } from "../utils/mocks/stocks";
import { transformStockData } from "../utils/transform-data";

const Chart: React.FC = () => {
  const chartData = transformStockData(daily);
  return (
    <div className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={450}
          data={chartData.timeSeries}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={"#14b8a6"} stopOpacity={0.8} />
              <stop offset="95%" stopColor={"#14b8a6"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={["open", "close"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff" }}
            labelStyle={{ color: "#0284c7" }}
          />
          <Area
            type="monotone"
            dataKey="open"
            stroke="#0d9488"
            fill="url(#chartColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
