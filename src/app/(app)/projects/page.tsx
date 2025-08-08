"use client"

import { useRequireAuth } from "@/components/auth-context"
import { useState } from "react"
import Link from "next/link"
import { FolderKanban } from 'lucide-react'
import { StatusBadge } from "@/components/status-badge"
import { ExecutionStatusBadge } from "@/components/execution-status-badge"
import { SectionCard } from "@/components/section-card"
import { allProjects as initialProjects } from "@/lib/data"

export default function ProjectsPage() {
  useRequireAuth()
  const [projects, setProjects] = useState(initialProjects)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(value);
  }

  return (
    <SectionCard
      title="Approved Projects"
      description="View all ongoing and completed projects"
      icon={FolderKanban}
      accent="blue"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="p-2">Code</th>
              <th className="p-2">Project</th>
              <th className="p-2 text-right">Budget</th>
              <th className="p-2">Sales Status</th>
              <th className="p-2">Execution Status</th>
              <th className="p-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t hover:bg-slate-50">
                <td className="p-2 font-mono text-xs text-slate-500">{p.projectCode}</td>
                <td className="p-2">
                  <Link href={`/projects/${p.id}`} className="font-medium text-blue-600 hover:underline">
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{p.client}</div>
                </td>
                <td className="p-2 text-right font-mono">{formatCurrency(p.budget)}</td>
                <td className="p-2">
                  <StatusBadge status={p.salesStatus} />
                </td>
                <td className="p-2">
                  <ExecutionStatusBadge status={p.executionStatus} />
                </td>
                <td className="p-2">{p.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
