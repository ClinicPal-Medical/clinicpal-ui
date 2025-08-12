import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

function DashboardChart() {
  const chartData = [
    { month: "January", scheduled: 186, cancelled: 80 },
    { month: "February", scheduled: 305, cancelled: 200 },
    { month: "March", scheduled: 237, cancelled: 120 },
    { month: "April", scheduled: 73, cancelled: 190 },
    { month: "May", scheduled: 209, cancelled: 130 },
    { month: "June", scheduled: 214, cancelled: 140 },
  ];

  const chartConfig = {
    scheduled: {
      label: "Scheduled",
      color: "#2563eb",
    },
    cancelled: {
      label: "Canceled",
      color: "#7f1d1d",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="scheduled" fill="var(--color-scheduled)" radius={4} />
        <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default DashboardChart;
