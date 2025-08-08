"use client"

import { useRequireAuth } from "@/components/auth-context"
import { SectionCard } from "@/components/section-card"
import { Users2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { allTeams, allMembers } from "@/lib/data"
import { ArrowRight } from 'lucide-react'

export default function TeamsPage() {
  useRequireAuth()

  return (
    <SectionCard
      title="Teams"
      description="Browse teams and view member details"
      icon={Users2}
      accent="green"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {allTeams.map((team) => {
          const lead = allMembers[team.leadId]
          const memberCount = team.memberIds.length + 1 // +1 for the lead
          return (
            <Link href={`/teams/${team.id}`} key={team.id} className="group block">
              <div className="h-full rounded-lg border bg-slate-50/50 p-4 transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">{team.name}</h3>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">{memberCount} members</p>
                <div className="mt-4">
                  <div className="text-xs font-semibold text-slate-500">TEAM LEAD</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={lead.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{lead.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </SectionCard>
  )
}
