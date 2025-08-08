// --- TYPES ---
export type Member = {
  id: string
  name: string
  role: string
  email: string
  currentProject: string
  skills: string[]
  avatar: string
}

export type Team = {
  id: string
  name: string
  leadId: string
  memberIds: string[]
}

// Type for projects that are approved and visible to managers/directors
export type Project = {
  id: string
  projectCode: string
  name: string
  client: string
  ownerTeam: string
  salesStatus: "100" | "70" | "50" | "30" | "low"
  executionStatus?: "On Track" | "At Risk" | "Delayed" | "Completed"
  budget: number
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
  tags?: string[]
  assignedMemberIds: string[]
}

// New type for the project creation/approval workflow
export type ProjectProposal = {
  id: string
  lifecycleStatus: "Draft" | "Submitted" | "Approved" | "Rejected"
  projectCode: string
  name: string
  client: string
  ownerTeam: string
  salesStatus: "100" | "70" | "50" | "30" | "low"
  budget: number
  startDate: string
  endDate: string
}


// --- MOCK DATA ---
export const allMembers: Record<string, Member> = {
  "m1": { id: "m1", name: "Korn C.", role: "Finance Lead", email: "korn.c@mfec.co.th", currentProject: "Core Banking Upgrade", skills: ["Finance", "SAP", "Agile"], avatar: "/thoughtful-man-glasses.png" },
  "m2": { id: "m2", name: "Somchai T.", role: "Sr. Consultant", email: "somchai.t@mfec.co.th", currentProject: "Core Banking Upgrade", skills: ["Oracle", "SQL", "BI"], avatar: "/thai-man.png" },
  "m3": { id: "m3", name: "Kamonwan S.", role: "Jr. Consultant", email: "kamonwan.s@mfec.co.th", currentProject: "Internal Audit", skills: ["Excel", "Compliance"], avatar: "/thai-woman.png" },
  "m4": { id: "m4", name: "Arthit P.", role: "Enterprise Lead", email: "arthit.p@mfec.co.th", currentProject: "ERP Rollout", skills: ["Leadership", "Architecture"], avatar: "/professional-man.png" },
  "m5": { id: "m5", name: "Arisa W.", role: "Sr. Developer", email: "arisa.w@mfec.co.th", currentProject: "ERP Rollout", skills: ["Java", "Spring", "Microservices"], avatar: "/professional-woman-diverse.png" },
  "m6": { id: "m6", name: "Panadda N.", role: "QA Engineer", email: "panadda.n@mfec.co.th", currentProject: "ERP Rollout", skills: ["Selenium", "Jira", "Testing"], avatar: "/woman-with-headset.png" },
  "m7": { id: "m7", name: "Natcha R.", role: "AI/ML Lead", email: "natcha.r@mfec.co.th", currentProject: "eKYC POC", skills: ["Python", "TensorFlow", "MLOps"], avatar: "/woman-in-tech.png" },
  "m8": { id: "m8", name: "Preecha K.", role: "Data Scientist", email: "preecha.k@mfec.co.th", currentProject: "eKYC POC", skills: ["Pandas", "Scikit-learn", "NLP"], avatar: "/man-at-computer.png" },
}

export const allTeams: Team[] = [
  { id: "t1", name: "Finance", leadId: "m1", memberIds: ["m2", "m3"] },
  { id: "t2", name: "Enterprise", leadId: "m4", memberIds: ["m5", "m6"] },
  { id: "t3", name: "AI/ML", leadId: "m7", memberIds: ["m8"] },
  { id: "t4", name: "Mobility", leadId: "m5", memberIds: [] },
]

// The list of fully approved, ongoing projects
export const allProjects: Project[] = [
  { id: "p1", projectCode: "PROJ-001", name: "Core Banking Upgrade", client: "SCB", ownerTeam: "Finance", salesStatus: "100", executionStatus: "On Track", budget: 5000000, startDate: "2025-02-01", endDate: "2025-11-30", tags: ["Banking", "Core"], assignedMemberIds: ["m1", "m2"] },
  { id: "p2", projectCode: "PROJ-002", name: "ERP Rollout", client: "CP Group", ownerTeam: "Enterprise", salesStatus: "100", executionStatus: "At Risk", budget: 12000000, startDate: "2025-03-15", endDate: "2025-09-15", tags: ["ERP"], assignedMemberIds: ["m4", "m5", "m6"] },
  { id: "p3", projectCode: "PROJ-003", name: "eKYC POC", client: "Gov", ownerTeam: "AI/ML", salesStatus: "70", executionStatus: "Delayed", budget: 3000000, startDate: "2025-04-01", endDate: "2025-10-31", tags: ["AI", "GovTech"], assignedMemberIds: ["m7", "m8"] },
  { id: "p4", projectCode: "PROJ-004", name: "Retail App Revamp", client: "Central", ownerTeam: "Mobility", salesStatus: "100", executionStatus: "On Track", budget: 8000000, startDate: "2025-05-20", endDate: "2026-01-20", tags: ["Retail", "Mobile"], assignedMemberIds: ["m5"] },
  { id: "p5", projectCode: "PROJ-005", name: "Internal Audit Tool", client: "Internal", ownerTeam: "Finance", salesStatus: "100", executionStatus: "Completed", budget: 1500000, startDate: "2025-01-10", endDate: "2025-08-30", tags: ["Tooling"], assignedMemberIds: ["m3"] },
  { id: "p6", projectCode: "PROJ-006", name: "Logistics Platform", client: "Kerry Express", ownerTeam: "Enterprise", salesStatus: "70", executionStatus: "At Risk", budget: 6500000, startDate: "2025-06-01", endDate: "2025-12-31", tags: ["Logistics"], assignedMemberIds: ["m4", "m6"] },
  { id: "p7", projectCode: "PROJ-007", name: "Chatbot Integration", client: "AIS", ownerTeam: "AI/ML", salesStatus: "100", executionStatus: "Completed", budget: 2200000, startDate: "2025-02-15", endDate: "2025-07-15", tags: ["Chatbot", "AI"], assignedMemberIds: ["m8"] },
]

// The list of project proposals in various stages of the approval workflow
export const allProposals: ProjectProposal[] = [
    { id: "prop1", lifecycleStatus: "Draft", projectCode: "PROP-010", name: "New Mobile Banking App", client: "KTB", ownerTeam: "Finance", salesStatus: "70", budget: 7500000, startDate: "2026-01-01", endDate: "2026-12-31" },
    { id: "prop2", lifecycleStatus: "Submitted", projectCode: "PROP-011", name: "Cloud Migration Strategy", client: "AIS", ownerTeam: "Enterprise", salesStatus: "50", budget: 4000000, startDate: "2025-11-01", endDate: "2026-04-30" },
    { id: "prop3", lifecycleStatus: "Rejected", projectCode: "PROP-009", name: "Data Warehouse PoC", client: "TMB", ownerTeam: "AI/ML", salesStatus: "30", budget: 900000, startDate: "2025-09-01", endDate: "2025-12-01" },
]
