import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data"

const statusStyles: Record<NonNullable<Project['executionStatus']>, string> = {
"On Track": "bg-blue-100 text-blue-800 border-blue-200",
"At Risk": "bg-yellow-100 text-yellow-800 border-yellow-200",
"Delayed": "bg-red-100 text-red-800 border-red-200",
"Completed": "bg-green-100 text-green-800 border-green-200",
}

export function ExecutionStatusBadge({ status }: { status?: Project['executionStatus'] }) {
if (!status) {
  return <span className="text-xs text-muted-foreground">-</span>
}
return (
  <Badge variant="outline" className={cn("font-normal", statusStyles[status])}>
    {status}
  </Badge>
)
}
