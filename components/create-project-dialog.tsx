"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from 'lucide-react'
import type { ProjectProposal } from "@/lib/data"

export function CreateProjectDialog({ onCreate }: { onCreate: (p: ProjectProposal) => void }) {
  const [open, setOpen] = useState(false)
  const [projectCode, setProjectCode] = useState("")
  const [name, setName] = useState("")
  const [client, setClient] = useState("")
  const [team, setTeam] = useState("Enterprise")
  const [status, setStatus] = useState<ProjectProposal['salesStatus']>("70")
  const [budget, setBudget] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const submit = () => {
    onCreate({
      id: `prop-${Math.random().toString(36).slice(2, 9)}`,
      lifecycleStatus: "Draft",
      projectCode,
      name,
      client,
      ownerTeam: team,
      salesStatus: status,
      budget: Number(budget) || 0,
      startDate,
      endDate,
    })
    setOpen(false)
    // Reset form
    setProjectCode(""); setName(""); setClient(""); setBudget(""); setStartDate(""); setEndDate("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project Proposal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Project Code</Label>
              <Input value={projectCode} onChange={(e) => setProjectCode(e.target.value)} placeholder="PROP-0XX" />
            </div>
            <div className="grid gap-2">
              <Label>Project Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Client</Label>
              <Input value={client} onChange={(e) => setClient(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Budget (THB)</Label>
              <Input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Owning Team</Label>
              <Select value={team} onValueChange={(v) => setTeam(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Sales Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100% Won</SelectItem>
                  <SelectItem value="70">70% Likely</SelectItem>
                  <SelectItem value="50">50% Maybe</SelectItem>
                  <SelectItem value="30">30% Unlikely</SelectItem>
                  <SelectItem value="low">Low Chance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={submit}>
            Save Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
