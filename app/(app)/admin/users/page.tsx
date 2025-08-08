"use client"

import { useAuth, useRequireAuth, type Role } from "@/components/auth-context"
import { SectionCard } from "@/components/section-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { UserRoundCog } from 'lucide-react'
import { useState } from "react"

type Row = { id: string; email: string; role: Role }

const seed: Row[] = [
  { id: "u1", email: "somchai@mfec.co.th", role: "Manager" },
  { id: "u2", email: "arisa@mfec.co.th", role: "Manager" },
  { id: "u3", email: "director@mfec.co.th", role: "Director" },
  { id: "u4", email: "admin@mfec.co.th", role: "Admin" },
]

export default function UsersAdminPage() {
  const me = useRequireAuth()
  const { hasRole } = useAuth()
  const [rows, setRows] = useState<Row[]>(seed)

  // Handle the forbidden case first
  if (!hasRole("Admin")) {
    return (
      <SectionCard title="Forbidden" accent="slate">
        You do not have access to this page.
      </SectionCard>
    )
  }

  return (
    <SectionCard
      title="User Management"
      description="Set roles, reset passwords, and invite new users"
      icon={UserRoundCog}
      accent="slate"
      actions={<Button variant="outline">Invite user</Button>}
    >
      <div className="overflow-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 pr-2">Email</th>
              <th className="py-2 pr-2">Role</th>
              <th className="py-2 pr-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2 pr-2">{r.email}</td>
                <td className="py-2 pr-2">
                  <Select
                    value={r.role}
                    onValueChange={(v) =>
                      setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, role: v as Role } : x)))
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-2 pr-2">
                  <Button size="sm" variant="outline">
                    Reset password
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
