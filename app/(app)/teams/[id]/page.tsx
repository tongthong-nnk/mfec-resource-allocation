"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { useRequireAuth } from "@/components/auth-context"
import { SectionCard } from "@/components/section-card"
import { StatusBadge } from "@/components/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { allTeams, allProjects, allMembers } from "@/lib/data"
import { Users2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TeamDetailPage() {
  useRequireAuth()
  const params = useParams<{ id: string }>()
  const team = allTeams.find(t => t.id === params.id)

  if (!team) {
    notFound()
  }

  const projectsForTeam = allProjects.filter(p => p.ownerTeam === team.name)
  const teamMemberIds = [team.leadId, ...team.memberIds]

  return (
    <div className="space-y-6">
      <SectionCard
        title={`${team.name} Team`}
        description={`Overview of projects and members`}
        icon={Users2}
        accent="green"
      >
        <div className="space-y-4">
          {projectsForTeam.map(project => {
            const membersOnProject = project.assignedMemberIds
              .filter(memberId => teamMemberIds.includes(memberId))
              .map(memberId => allMembers[memberId])

            return (
              <div key={project.id} className="rounded-lg border p-4 transition-shadow hover:shadow-sm">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={project.salesStatus} />
                    <Button asChild size="sm" variant="outline" className="bg-transparent">
                      <Link href={`/projects/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium text-slate-600">Team Members on this Project</h4>
                  <div className="mt-2 flex items-center gap-2">
                    <TooltipProvider>
                      {membersOnProject.map(member => (
                        <Tooltip key={member.id}>
                          <TooltipTrigger asChild>
                            <Avatar className="h-9 w-9 cursor-pointer">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{member.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            )
          })}
          {projectsForTeam.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              This team has no active projects.
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  )
}
