import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0E1B] p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl filter" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-500/20 blur-3xl filter" />
      </div>
      {children}
    </div>
  )
}
