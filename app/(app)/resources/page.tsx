"use client"

import { useRequireAuth } from "@/components/auth-context"
import { ResourceTimeline } from "@/components/resource-timeline"
import { SectionCard } from "@/components/section-card"
import { CalendarDays } from 'lucide-react'
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourcesPage() {
  useRequireAuth()

  const [team, setTeam] = useState<string>("All")

  const today = new Date()
  const end = new Date()
  end.setDate(today.getDate() + 13)

  const assignments = [
    { id: "a1", person: "Somchai T.", project: "Core Banking Upgrade", start: toISO(today, 0), end: toISO(today, 6), color: "#3e30d9" },
    { id: "a2", person: "Arisa W.", project: "ERP Rollout", start: toISO(today, 2), end: toISO(today, 9), color: "#51b206" },
    { id: "a3", person: "Sasithorn P.", project: "Retail App Revamp", start: toISO(today, 3), end: toISO(today, 5), color: "#f59e0b" },
  ]

  return (
    <div className="space-y-4">
      <SectionCard
        title="Resource Timeline"
        description="Visualize assignments by team and time range"
        icon={CalendarDays}
        accent="green"
        actions={
          <div className="flex items-center gap-2">
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="AI/ML">AI/ML</SelectItem>
                <SelectItem value="Mobility">Mobility</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      >
        <ResourceTimeline assignments={assignments} start={today} end={end} />
      </SectionCard>
    </div>
  )
}

function toISO(base: Date, addDays: number) {
  const d = new Date(base)
  d.setDate(d.getDate() + addDays)
  return d.toISOString().slice(0, 10)
}
