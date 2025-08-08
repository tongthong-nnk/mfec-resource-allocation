"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, LogOut, UserCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-context"

export function AppHeader() {
  const { user, logout, hydrated } = useAuth()
  return (
    <header className="app-header">
      <div className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-slate-800/80 hover:text-slate-900" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-slate-800">Resource Allocation</span>
          <span className="text-slate-500">by MFEC</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="text-slate-700 hover:text-slate-900">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 rounded-full bg-white/70 px-3 py-1 ring-1 ring-white/60 backdrop-blur">
            <UserCircle2 className="h-5 w-5 text-slate-500" />
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-800">
                {hydrated ? (user?.name ?? "User") : "User"}
              </span>
              <span className="text-xs text-slate-500">
                {hydrated ? (user?.role ?? "-") : "-"}
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={logout} className="ml-1 bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
