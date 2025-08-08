"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

export type Role = "Admin" | "Director" | "Manager"
export type User = {
  email: string
  name?: string
  role: Role
}

type AuthContextType = {
  user: User | null
  hydrated: boolean
  login: (email: string, role?: Role) => { ok: boolean; message?: string }
  logout: () => void
  hasRole: (roles: Role | Role[]) => boolean
}

const AuthContext = React.createContext<AuthContextType | null>(null)
const STORAGE_KEY = "ra_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Hydrate synchronously so first render has the user if already logged in
  const [user, setUser] = React.useState<User | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as User
    } catch {}
    return null
  })
  // Track when we've mounted on the client
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => setHydrated(true), [])

  const login = React.useCallback((email: string, role: Role = "Manager") => {
    const allowDev = email.toLowerCase() === "tongthong@mfec.co.th"
    const isMFEC = email.toLowerCase().endsWith("@mfec.co.th")
    if (!isMFEC && !allowDev) {
      return { ok: false, message: "Only @mfec.co.th emails are allowed." }
    }
    const nextUser: User = {
      email,
      role: allowDev ? role : role ?? "Manager",
      name: email.split("@")[0],
    }
    // Set state first to avoid race with guards
    setUser(nextUser)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } catch {}
    return { ok: true }
  }, [])

  const logout = React.useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setUser(null)
  }, [])

  const hasRole = React.useCallback(
    (roles: Role | Role[]) => {
      if (!user) return false
      const list = Array.isArray(roles) ? roles : [roles]
      return list.includes(user.role)
    },
    [user]
  )

  const value = React.useMemo(
    () => ({ user, hydrated, login, logout, hasRole }),
    [user, hydrated, login, logout, hasRole]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function useRequireAuth(redirectTo = "/login") {
  const { user, hydrated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    // Wait until hydration completes to avoid false redirects
    if (!hydrated) return
    if (!user) {
      const next = `${redirectTo}?next=${encodeURIComponent(pathname || "/")}`
      router.replace(next)
    }
  }, [hydrated, user, router, pathname, redirectTo])

  // Return null until hydrated to let callers show a loader if needed
  return hydrated ? user : null
}
