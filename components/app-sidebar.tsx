"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, FolderKanban, CalendarDays, Users2, Settings, UserRoundCog, Calendar, FilePlus2 } from 'lucide-react'
import { useAuth } from "./auth-context"

type Item = {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

const baseNav: Item[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Proposals", url: "/proposals", icon: FilePlus2 },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Resources", url: "/resources", icon: CalendarDays },
  { title: "Teams", url: "/teams", icon: Users2 },
]
const adminNav: Item[] = [{ title: "User Management", url: "/admin/users", icon: UserRoundCog }]
const footerNav: Item[] = [{ title: "Settings", url: "/settings", icon: Settings }]

export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user } = useAuth()
  const items = React.useMemo(
    () => [...baseNav, ...(user?.role === "Admin" ? adminNav : []), ...footerNav],
    [user?.role]
  )

  const isActive = (url: string) => pathname?.startsWith(url)

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="text-white"
      {...props}
    >
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center justify-center">
          <Image src="/mfec-logo.png" alt="MFEC Logo" width={120} height={30} />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="text-slate-200 hover:bg-white/10 hover:text-white data-[active=true]:bg-blue-900/60 data-[active=true]:text-white"
                    tooltip={item.title}
                  >
                    <Link href={item.url} className="group flex items-center">
                      <item.icon className="opacity-95" />
                      <span className="opacity-95">{item.title}</span>
                      <span
                        data-active={isActive(item.url)}
                        className="ml-auto hidden h-5 w-1 rounded-full bg-white opacity-0 transition group-data-[active=true]/menu-button:opacity-100 md:block"
                      />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
