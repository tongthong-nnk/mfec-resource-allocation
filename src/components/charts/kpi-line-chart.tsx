"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", capacity: 68, utilization: 54 },
  { month: "Feb", capacity: 70, utilization: 58 },
  { month: "Mar", capacity: 72, utilization: 61 },
  { month: "Apr", capacity: 73, utilization: 63 },
  { month: "May", capacity: 74, utilization: 66 },
  { month: "Jun", capacity: 75, utilization: 69 },
]

export function KpiLineChart() {
  return (
    <ChartContainer
      className="h-[300px] w-full"
      config={{
        capacity: { label: "Capacity", color: "#3e30d9" },
        utilization: { label: "Utilization", color: "#51b206" },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 16, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis unit="%" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="capacity" stroke="var(--color-capacity)" strokeWidth={2} dot={false} name="Capacity" />
          <Line type="monotone" dataKey="utilization" stroke="var(--color-utilization)" strokeWidth={2} dot={false} name="Utilization" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
