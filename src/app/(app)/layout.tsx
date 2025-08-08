"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Sidebar shell stays the same; main canvas now uses a light background and gradient.
  // Built with shadcn/ui Sidebar primitives for a composable, themed layout. [^1]
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* Make the entire content area (excluding sidebar) bright */}
      <SidebarInset className="bg-[#F6F9FC] dark:bg-background pt-2">
        {/* Optional soft light blooms for depth */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),rgba(255,255,255,0)_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),rgba(255,255,255,0)_60%)] blur-3xl" />
        </div>

        <AppHeader />
        {/* Full-width main canvas with a light gradient from white -> F6F9FC */}
        <main className="min-h-[calc(100dvh-4rem)] p-3 md:p-6 bg-gradient-to-b from-white to-[#F6F9FC]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
