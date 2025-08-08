"use client"

import { useAuth } from "@/components/auth-context"
import { SectionCard } from "@/components/section-card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Palette, UserCircle } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [dark])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SectionCard title="Theme" icon={Palette} accent="violet">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="theme" className="font-medium">Dark mode</Label>
            <Switch id="theme" checked={dark} onCheckedChange={setDark} />
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-3 text-sm font-medium">Brand Colors</div>
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-[#3e30d9]" title="#3e30d9"></div>
              <div className="h-10 w-10 rounded-full bg-[#51b206]" title="#51b206"></div>
              <div className="h-10 w-10 rounded-full bg-slate-200" title="#f1f3f7"></div>
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Profile" icon={UserCircle} accent="slate">
        <div className="space-y-3 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Role</span>
            <span className="font-medium">{user?.role}</span>
          </div>
          <Button className="mt-2" variant="outline">
            Edit profile
          </Button>
        </div>
      </SectionCard>
    </div>
  )
}
