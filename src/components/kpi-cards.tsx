"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

const accents = [
  "from-[#3F8CFF]/18 via-[#5F9DF7]/18 to-transparent",
  "from-[#51b206]/20 via-[#74d43a]/15 to-transparent",
  "from-[#a855f7]/18 via-[#d946ef]/12 to-transparent",
  "from-[#f59e0b]/20 via-[#f97316]/12 to-transparent",
]

export function KpiGrid({
  items,
}: {
  items: Array<{ title: string; value: string | number; delta?: string; color?: string }>
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((k, i) => (
        <Card
          key={i}
          className="group relative overflow-hidden border-0 bg-white/70 shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Dynamic gradient accent that gives a colorful, lively feel */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accents[i % accents.length]}`}
          />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm text-slate-600">{k.title}</CardTitle>
          </CardHeader>
          <CardContent className="relative flex items-end justify-between">
            <div className="text-3xl font-bold text-slate-900">{k.value}</div>
            {k.delta ? (
              <div
                className="rounded-full px-2 py-1 text-xs font-medium text-slate-800"
                style={{
                  background:
                    "linear-gradient(to right, rgba(107,126,154,0.25), rgba(90,109,140,0.25))",
                }}
              >
                {k.delta}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
