"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { allProjects, type Project } from "@/lib/data"

const chartConfig = {
  count: {
    label: "Projects",
  },
  "on-track": {
    label: "On Track",
    color: "hsl(var(--chart-blue-2))",
  },
  "at-risk": {
    label: "At Risk",
    color: "hsl(var(--chart-blue-3))",
  },
  "delayed": {
    label: "Delayed",
    color: "hsl(var(--chart-blue-4))",
  },
  "completed": {
    label: "Completed",
    color: "hsl(var(--chart-blue-1))",
  },
}

export function ProjectHealthBarChart() {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      "On Track": 0,
      "At Risk": 0,
      "Delayed": 0,
      "Completed": 0,
    }

    for (const project of allProjects) {
      if (project.executionStatus && counts[project.executionStatus] !== undefined) {
        counts[project.executionStatus]++
      }
    }

    return Object.entries(counts).map(([status, count]) => ({
      status,
      count,
      fill: `var(--color-${status.toLowerCase().replace(" ", "-")})`,
    }))
  }, [])

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="status"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={1}
          width={80}
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" radius={5}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
