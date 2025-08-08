import * as React from "react"
import { cn } from "@/lib/utils"

type Accent = "blue" | "green" | "violet" | "orange" | "slate"

const styles: Record<
  Accent,
  {
    icon: string
    headerText?: string
    glow?: string
  }
> = {
  blue: {
    icon: "bg-blue-100 text-blue-700",
    headerText: "text-blue-900",
    glow: "from-blue-400/50",
  },
  green: {
    icon: "bg-green-100 text-green-700",
    headerText: "text-green-900",
    glow: "from-green-400/50",
  },
  violet: {
    icon: "bg-violet-100 text-violet-700",
    headerText: "text-violet-900",
    glow: "from-violet-400/50",
  },
  orange: {
    icon: "bg-orange-100 text-orange-700",
    headerText: "text-orange-900",
    glow: "from-orange-400/50",
  },
  slate: {
    icon: "bg-slate-200 text-slate-700",
    headerText: "text-slate-900",
    glow: "from-slate-400/50",
  },
}

export interface SectionCardProps {
  title: string
  description?: string
  icon?: React.ElementType
  actions?: React.ReactNode
  accent?: Accent
  className?: string
  children: React.ReactNode
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  actions,
  accent = "blue",
  className,
  children,
}: SectionCardProps) {
  const theme = styles[accent]
  return (
    <section
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Top glow on hover - added rounded-t-xl to match card's border radius */}
      <div
        className={cn(
          "pointer-events-none absolute -top-px left-0 right-0 h-20 w-full rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          "bg-gradient-to-b",
          theme.glow,
          "to-transparent"
        )}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b p-4">
        <div className="flex min-w-0 items-center gap-4">
          {Icon && (
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", theme.icon)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className={cn("truncate text-lg font-semibold", theme.headerText)}>{title}</h2>
            {description && <p className="truncate text-sm text-slate-500">{description}</p>}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {/* Body */}
      <div className="p-4">{children}</div>
    </section>
  )
}
