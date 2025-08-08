"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { useAuth, type Role } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShieldCheck, LogIn } from 'lucide-react'

export default function LoginPage() {
  const { login, user, hydrated } = useAuth()
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get("next") || "/dashboard"

  const [email, setEmail] = useState("tongthong@mfec.co.th")
  const [role, setRole] = useState<Role>("Manager")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (hydrated && user) {
      router.replace(next)
    }
  }, [hydrated, user, next, router])

  const handleMicrosoft = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/microsoft", { method: "POST" })
      const data = await res.json()
      setMessage(data.message ?? "Microsoft SSO is not configured in preview.")
    } catch {
      setMessage("Microsoft SSO is not configured in preview.")
    } finally {
      setLoading(false)
    }
  }

  const handleDevLogin = () => {
    const { ok, message } = login(email, role)
    if (!ok) {
      setMessage(message ?? "Login failed.")
      return
    }
    router.replace(next)
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-slate-700 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-lg animate-pulse-glow">
      <div className="flex justify-center">
        <Image src="/mfec-logo.png" alt="MFEC Logo" width={200} height={50} priority />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">Resource Allocation</h1>
        <p className="text-slate-300">Sign in to access your dashboard</p>
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200" size="lg" onClick={handleMicrosoft} disabled={loading}>
          <ShieldCheck className="mr-2 h-5 w-5" />
          Sign in with Microsoft
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-800/50 px-2 text-slate-400 backdrop-blur-lg">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-300">Email (for Dev Preview)</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mfec.co.th" className="bg-slate-700/50 text-white border-slate-600 focus:ring-white" />
          </div>
          <div className="grid gap-2">
            <Label className="text-slate-300">Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="bg-slate-700/50 text-white border-slate-600">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 text-white border-slate-700">
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Director">Director</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {message && <p className="text-sm text-red-400">{message}</p>}
          <Button className="w-full bg-white hover:bg-gray-100 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-200" onClick={handleDevLogin}>
            <LogIn className="mr-2 h-4 w-4" />
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
