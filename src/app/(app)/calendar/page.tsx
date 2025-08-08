"use client"

import { useRequireAuth } from "@/components/auth-context"
import { SectionCard } from "@/components/section-card"
import { allProjects, type Project } from "@/lib/data"
import { CalendarIcon } from 'lucide-react'
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PROJECT_COLORS = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-teal-500"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export default function CalendarPage() {
  useRequireAuth()
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const projectsByMonth = useMemo(() => {
    const monthlyProjects: Record<number, Project[]> = {};
    for (let month = 0; month < 12; month++) {
      monthlyProjects[month] = [];
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      for (const proj of allProjects) {
        const projStart = new Date(proj.startDate);
        const projEnd = new Date(proj.endDate);
        // Check if the project's date range overlaps with the current month's date range
        if (projStart <= monthEnd && projEnd >= monthStart) {
          monthlyProjects[month].push(proj);
        }
      }
    }
    return monthlyProjects;
  }, [currentYear]);

  return (
    <SectionCard
      title="Yearly Project Calendar"
      description={`Timeline for ${currentYear}`}
      icon={CalendarIcon}
      accent="violet"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentYear(y => y - 1)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentYear(y => y + 1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MONTH_NAMES.map((monthName, monthIndex) => {
          const daysInMonth = getDaysInMonth(currentYear, monthIndex);
          const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
          const projects = projectsByMonth[monthIndex] || [];

          return (
            <div key={monthName} className="rounded-lg border p-3">
              <h3 className="text-center font-semibold">{monthName}</h3>
              <div className="mt-2 grid grid-cols-7 text-center text-xs text-muted-foreground">
                {DAY_NAMES.map(day => <div key={day}>{day}</div>)}
              </div>
              <div className="mt-1 grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                  const date = day + 1;
                  const currentDate = new Date(currentYear, monthIndex, date);
                  const isToday = currentDate.toDateString() === new Date().toDateString();
                  return (
                    <div key={date} className={cn("relative h-8 text-center text-xs pt-1", isToday && "rounded-full bg-blue-100 font-bold text-blue-700")}>
                      {date}
                    </div>
                  )
                })}
              </div>
              <div className="mt-1 space-y-1">
                {projects.map((p, i) => (
                  <div key={p.id} className={cn("truncate rounded px-1.5 py-0.5 text-xs text-white", PROJECT_COLORS[i % PROJECT_COLORS.length])} title={p.name}>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
