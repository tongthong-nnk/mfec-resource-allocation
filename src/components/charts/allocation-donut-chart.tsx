"use client"

import { useMemo } from "react"
import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { allProjects, allTeams } from "@/lib/data"

const teamColors: Record<string, string> = {
  Finance: "hsl(var(--chart-purple-1))",
  Enterprise: "hsl(var(--chart-purple-2))",
  "AI/ML": "hsl(var(--chart-purple-3))",
  Mobility: "hsl(var(--chart-purple-4))",
  Support: "hsl(var(--chart-purple-5))",
}

export function AllocationDonutChart() {
  const { chartData, chartConfig } = useMemo(() => {
    const projectCounts: Record<string, number> = {}
    allTeams.forEach(team => (projectCounts[team.name] = 0))

    allProjects.forEach(project => {
      if (projectCounts[project.ownerTeam] !== undefined) {
        projectCounts[project.ownerTeam]++
      }
    })

    const data = Object.entries(projectCounts)
      .map(([team, projects]) => ({
        team,
        projects,
        fill: teamColors[team] || "hsl(var(--muted))",
      }))
      .filter(d => d.projects > 0)

    const config = {
      projects: { label: "Projects" },
      ...Object.fromEntries(
        data.map(d => [
          d.team.toLowerCase().replace(/[/ ]/g, "-"),
          { label: d.team, color: d.fill },
        ])
      ),
    }

    return { chartData: data, chartConfig: config }
  }, [])

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="projects"
          nameKey="team"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="team" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
