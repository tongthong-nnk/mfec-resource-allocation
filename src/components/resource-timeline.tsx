"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Assignment = {
  id: string
  person: string
  project: string
  start: string // YYYY-MM-DD
  end: string   // YYYY-MM-DD
  color?: string
}

const daysInRange = (start: Date, end: Date) => {
  const out: Date[] = []
  const d = new Date(start)
  while (d <= end) {
    out.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

function formatDay(d: Date) {
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function ResourceTimeline({
  title = "Resource Usage (next 14 days)",
  assignments,
  start,
  end,
}: {
  title?: string
  assignments: Assignment[]
  start: Date
  end: Date
}) {
  const allDays = daysInRange(start, end)
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid" style={{ gridTemplateColumns: `220px repeat(${allDays.length}, 1fr)` }}>
            <div />
            {allDays.map((d) => (
              <div key={d.toISOString()} className="border-b py-1 text-center text-xs text-muted-foreground">
                {formatDay(d)}
              </div>
            ))}
          </div>
          {/* Rows */}
          {assignments.map((a) => {
            const s = new Date(a.start)
            const e = new Date(a.end)
            const startIdx = allDays.findIndex((d) => d.toDateString() === s.toDateString())
            const endIdx = allDays.findIndex((d) => d.toDateString() === e.toDateString())
            const span = endIdx >= startIdx ? endIdx - startIdx + 1 : 1
            return (
              <div key={a.id} className="grid items-center" style={{ gridTemplateColumns: `220px repeat(${allDays.length}, 1fr)` }}>
                <div className="truncate border-b py-2 pr-2 text-sm">
                  <div className="font-medium">{a.person}</div>
                  <div className="text-xs text-muted-foreground">{a.project}</div>
                </div>
                {allDays.map((_, idx) => {
                  const isBarStart = idx === startIdx
                  const inBar = idx >= startIdx && idx < startIdx + span
                  return (
                    <div key={idx} className="border-b h-8 relative">
                      {isBarStart ? (
                        <div
                          className="absolute left-0 top-1/2 h-6 -translate-y-1/2 rounded-md text-xs text-white flex items-center px-2 shadow"
                          style={{
                            width: `calc(${span} * 100% + ${(span - 1) * 1}px)`,
                            backgroundColor: a.color ?? "hsl(142, 76%, 36%)",
                          }}
                          title={`${a.person} on ${a.project}`}
                        >
                          <span className="truncate">{a.project}</span>
                        </div>
                      ) : inBar ? null : null}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
