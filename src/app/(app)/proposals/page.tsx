"use client"

import { useState } from "react"
import { useRequireAuth, useAuth } from "@/components/auth-context"
import { SectionCard } from "@/components/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilePlus2, Check, X, Send } from 'lucide-react'
import { allProposals as initialProposals, allProjects, type ProjectProposal, type Project } from "@/lib/data"
import { ImportProjectsDialog } from "@/components/import-projects-dialog"
import { CreateProjectDialog } from "@/components/create-project-dialog"
import { cn } from "@/lib/utils"

const statusStyles: Record<ProjectProposal['lifecycleStatus'], string> = {
"Draft": "bg-slate-100 text-slate-800 border-slate-200",
"Submitted": "bg-yellow-100 text-yellow-800 border-yellow-200",
"Approved": "bg-green-100 text-green-800 border-green-200",
"Rejected": "bg-red-100 text-red-800 border-red-200",
}

export default function ProposalsPage() {
useRequireAuth()
const { hasRole } = useAuth()
const [proposals, setProposals] = useState<ProjectProposal[]>(initialProposals)
const [projects, setProjects] = useState<Project[]>(allProjects) // To simulate adding to the main list

const handleCreate = (newProposal: ProjectProposal) => {
  setProposals(prev => [...prev, newProposal])
}

const handleImport = (newProposals: ProjectProposal[]) => {
  setProposals(prev => [...prev, ...newProposals])
}

const updateProposalStatus = (id: string, status: ProjectProposal['lifecycleStatus']) => {
  setProposals(proposals.map(p => (p.id === id ? { ...p, lifecycleStatus: status } : p)))
}

const approveProposal = (proposal: ProjectProposal) => {
  updateProposalStatus(proposal.id, 'Approved')
  const newProject: Project = {
    ...proposal,
    salesStatus: proposal.salesStatus,
    executionStatus: 'On Track',
    assignedMemberIds: [],
    tags: [],
  }
  setProjects(prev => [...prev, newProject])
}

const formatCurrency = (value: number) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(value)

return (
  <SectionCard
    title="Project Proposals"
    description="Create, manage, and approve new project initiatives"
    icon={FilePlus2}
    accent="orange"
    actions={
      <div className="flex gap-2">
        <ImportProjectsDialog onImport={handleImport} existingProjects={proposals} />
        <CreateProjectDialog onCreate={handleCreate} />
      </div>
    }
  >
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="p-2">Project Name</th>
            <th className="p-2 text-right">Budget</th>
            <th className="p-2">Status</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map(p => {
              const isDraft = p.lifecycleStatus === "Draft"
              const canApproveOrReject = p.lifecycleStatus === "Submitted" && (hasRole("Admin") || hasRole("Director"))
              const isDone = p.lifecycleStatus === "Approved" || p.lifecycleStatus === "Rejected"

              return (
                <tr key={p.id} className="border-t">
                  <td className="p-2">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.client}</div>
                  </td>
                  <td className="p-2 text-right font-mono">{formatCurrency(p.budget)}</td>
                  <td className="p-2">
                    <Badge variant="outline" className={cn("font-normal", statusStyles[p.lifecycleStatus])}>
                      {p.lifecycleStatus}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center gap-2">
                      {isDraft && (
                        <Button size="sm" variant="outline" onClick={() => updateProposalStatus(p.id, "Submitted")}>
                          <Send className="mr-1 h-3 w-3" /> Submit
                        </Button>
                      )}
                      {canApproveOrReject && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 bg-transparent"
                            onClick={() => approveProposal(p)}
                          >
                            <Check className="mr-1 h-3 w-3" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                            onClick={() => updateProposalStatus(p.id, "Rejected")}
                          >
                            <X className="mr-1 h-3 w-3" /> Reject
                          </Button>
                        </>
                      )}
                      {isDone && <span className="text-xs text-muted-foreground">No actions</span>}
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  </SectionCard>
)
}
