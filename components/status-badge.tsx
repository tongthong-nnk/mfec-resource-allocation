"use client"

import { Badge } from "@/components/ui/badge"

const map: Record<
  string,
  { label: string; className: string }
> = {
  "100": { label: "100% Win", className: "bg-emerald-600 text-white" },
  "70": { label: "70% Likely", className: "bg-blue-600 text-white" },
  "50": { label: "50% Maybe", className: "bg-amber-500 text-black" },
  "30": { label: "30% Unlikely", className: "bg-orange-500 text-white" },
  low: { label: "Low", className: "bg-red-600 text-white" },
}

export function StatusBadge({ status }: { status: keyof typeof map }) {
  const s = map[status]
  // If status is invalid or not found, return null to prevent crashing.
  if (!s) {
    return null
  }
  return <Badge className={s.className}>{s.label}</Badge>
}
