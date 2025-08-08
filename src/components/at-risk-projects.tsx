"use client"

import { SectionCard } from "@/components/section-card"
import { allProjects } from "@/lib/data"
import { AlertTriangle } from 'lucide-react'
import { StatusBadge } from "./status-badge"
import { Button } from "./ui/button"
import Link from "next/link"

export function AtRiskProjects() {
  const atRisk = allProjects.filter(p => p.executionStatus === "At Risk")

  return (
    <SectionCard
      title="At-Risk Projects"
      description="Projects requiring immediate attention"
      icon={AlertTriangle}
      accent="orange"
    >
      <div className="space-y-2">
        {atRisk.map(p => (
          <div key={p.id} className="flex items-center justify-between rounded-md border p-3 hover:bg-slate-50">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.client} - Team: {p.ownerTeam}</div>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge status={p.salesStatus} />
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link href={`/projects/${p.id}`}>
                  View
                </Link>
              </Button>
            </div>
          </div>
        ))}
        {atRisk.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No projects are currently at risk.
          </div>
        )}
      </div>
    </SectionCard>
  )
}
