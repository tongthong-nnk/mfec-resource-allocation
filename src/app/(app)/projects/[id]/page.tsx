"use client"

import { useRequireAuth } from "@/components/auth-context"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

const sample = {
  id: "p2",
  name: "ERP Rollout",
  client: "CP Group",
  status: "100" as const,
  deadline: "2025-09-15",
  description: "Implement ERP across 5 business units with phased rollouts.",
  team: [{ name: "Somchai T." }, { name: "Arisa W." }, { name: "Preecha K." }],
}

export default function ProjectDetailsPage() {
  useRequireAuth()
  const params = useParams<{ id: string }>()
  const [name, setName] = useState(sample.name)
  const [client, setClient] = useState(sample.client)
  const [deadline, setDeadline] = useState(sample.deadline)
  const [desc, setDesc] = useState(sample.description)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">{name}</h1>
          <StatusBadge status={sample.status} />
        </div>
        <Link href="/projects">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Project Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Client</Label>
                <Input value={client} onChange={(e) => setClient(e.target.value)} />
              </div>
              <div>
                <Label>Deadline</Label>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={5} />
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#3e30d9] hover:bg-[#3429bd]">Save Changes</Button>
              <Button variant="outline">Add Comment</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sample.team.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-md border p-2">
                <span>{m.name}</span>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
