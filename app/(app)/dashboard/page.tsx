"use client"

import { useRequireAuth } from "@/components/auth-context"
import { KpiGrid } from "@/components/kpi-cards"
import { ResourceTimeline } from "@/components/resource-timeline"
import { SectionCard } from "@/components/section-card"
import { AllocationDonutChart } from "@/components/charts/allocation-donut-chart"
import { ProjectHealthBarChart } from "@/components/charts/project-health-bar-chart"
import { AtRiskProjects } from "@/components/at-risk-projects"
import { Activity, PieChart, BarChartHorizontal } from 'lucide-react'

export default function DashboardPage() {
  useRequireAuth()

  const kpis = [
    { title: "Total Projects", value: 148, delta: "+7% MoM" },
    { title: "Active Projects", value: 63, delta: "+4% MoM" },
    { title: "Team Availability", value: "73%", delta: "+2% MoM" },
    { title: "On-track (SLA)", value: "92%", delta: "+1% MoM" },
  ]

  const today = new Date()
  const horizonEnd = new Date()
  horizonEnd.setDate(today.getDate() + 13)

  const assignments = [
    { id: "a1", person: "Somchai T.", project: "Core Banking Upgrade", start: toISO(today, 0), end: toISO(today, 4), color: "#3F8CFF" },
    { id: "a2", person: "Arisa W.", project: "ERP Rollout", start: toISO(today, 2), end: toISO(today, 8), color: "#51b206" },
    { id: "a3", person: "Preecha K.", project: "eKYC POC", start: toISO(today, 6), end: toISO(today, 12), color: "#f59e0b" },
  ]

  return (
    <div className="space-y-6">
      <KpiGrid items={kpis} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <SectionCard
          title="Project Health"
          description="Status of all approved projects"
          icon={BarChartHorizontal}
          accent="blue"
          className="xl:col-span-2"
        >
          <ProjectHealthBarChart />
        </SectionCard>

        <SectionCard
          title="Resource Allocation"
          description="Projects per team"
          icon={PieChart}
          accent="violet"
          className="xl:col-span-1"
        >
          <AllocationDonutChart />
        </SectionCard>

        <SectionCard
          title="Resource Usage (next 14 days)"
          description="Who is working on what and when"
          icon={Activity}
          accent="green"
          className="xl:col-span-3"
        >
          <ResourceTimeline assignments={assignments} start={today} end={horizonEnd} />
        </SectionCard>

        <div className="xl:col-span-3">
          <AtRiskProjects />
        </div>
      </div>
    </div>
  )
}

function toISO(base: Date, addDays: number) {
  const d = new Date(base)
  d.setDate(d.getDate() + addDays)
  return d.toISOString().slice(0, 10)
}
