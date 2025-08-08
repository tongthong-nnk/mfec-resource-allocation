"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileCheck2, FileWarning, Download, TestTube2 } from 'lucide-react'
import type { ProjectProposal } from "@/lib/data"
import { cn } from "@/lib/utils"

type ValidatedRow = {
data: any
isValid: boolean
errors: string[]
}

const REQUIRED_COLUMNS = ['projectCode', 'name', 'client', 'ownerTeam', 'salesStatus', 'budget', 'startDate', 'endDate'];
const STATUS_VALUES = ["100", "70", "50", "30", "low"];

export function ImportProjectsDialog({ onImport, existingProjects }: { onImport: (proposals: ProjectProposal[]) => void, existingProjects: ProjectProposal[] }) {
const [open, setOpen] = useState(false)
const [step, setStep] = useState<'upload' | 'preview'>('upload')
const [validatedRows, setValidatedRows] = useState<ValidatedRow[]>([])
const [fileName, setFileName] = useState<string>("")

const resetState = () => {
  setStep('upload')
  setValidatedRows([])
  setFileName("")
}

const handleFile = async (file: File) => {
  setFileName(file.name)
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = e.target?.result
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet)
    validateData(json)
  }
  reader.readAsArrayBuffer(file)
}

const handleMockImport = () => {
  const mockData = [
    { projectCode: "MOCK-001", name: "Mock Project Alpha", client: "Test Client A", ownerTeam: "Enterprise", salesStatus: "70", budget: 1500000, startDate: "2025-10-01", endDate: "2026-03-31" },
    { projectCode: "MOCK-002", name: "Mock Project Beta", client: "Test Client B", ownerTeam: "Finance", salesStatus: "100", budget: 3000000, startDate: "2025-11-01", endDate: "2026-05-31" },
    { projectCode: "MOCK-003", name: "Mock Project Gamma", client: "Test Client C", ownerTeam: "AI/ML", salesStatus: "50", budget: 800000, startDate: "2025-12-01", endDate: "2026-04-30" },
  ];
  setFileName("mock_import.xlsx");
  validateData(mockData);
}

const validateData = (rows: any[]) => {
  const existingCodes = new Set(existingProjects.map(p => p.projectCode));
  const newCodes = new Set();

  const validated = rows.map(row => {
    const errors: string[] = []
    for (const col of REQUIRED_COLUMNS) {
      if (row[col] === undefined || row[col] === null) {
        errors.push(`Missing field: ${col}`)
      }
    }
    if (row.salesStatus && !STATUS_VALUES.includes(String(row.salesStatus))) {
      errors.push(`Invalid salesStatus: "${row.salesStatus}"`)
    }
    if (row.budget && isNaN(Number(row.budget))) {
      errors.push(`Budget must be a number.`)
    }
    if (row.projectCode) {
      if (existingCodes.has(row.projectCode) || newCodes.has(row.projectCode)) {
        errors.push(`Project code "${row.projectCode}" already exists.`)
      } else {
        newCodes.add(row.projectCode);
      }
    }
    return { data: row, isValid: errors.length === 0, errors }
  })
  setValidatedRows(validated)
  setStep('preview')
}

const handleConfirmImport = () => {
  const validProposals: ProjectProposal[] = validatedRows
    .filter(row => row.isValid)
    .map(row => ({
      ...row.data,
      id: `prop-${Math.random().toString(36).slice(2, 9)}`,
      lifecycleStatus: 'Draft',
      budget: Number(row.data.budget),
    }))
  onImport(validProposals)
  setOpen(false)
  resetState()
}

const downloadTemplate = () => {
  const ws = XLSX.utils.json_to_sheet([
    { projectCode: "PROP-101", name: "Example Proposal", client: "Example Client", ownerTeam: "Finance", salesStatus: "70", budget: 2500000, startDate: "2025-01-01", endDate: "2025-06-30" }
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Proposals");
  XLSX.writeFile(wb, "proposal_template.xlsx");
}

const validCount = validatedRows.filter(r => r.isValid).length
const invalidCount = validatedRows.length - validCount

return (
  <Dialog open={open} onOpenChange={(isOpen) => {
    setOpen(isOpen)
    if (!isOpen) resetState()
  }}>
    <DialogTrigger asChild>
      <Button variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Import
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Import Project Proposals from Excel</DialogTitle>
      </DialogHeader>
      {step === 'upload' && (
        <div className="py-4">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
            <Upload className="h-12 w-12 text-slate-400" />
            <p className="mt-4 font-semibold">Drag & drop your Excel file here</p>
            <p className="text-sm text-muted-foreground">or</p>
            <div className="flex gap-2 mt-2">
              <Button asChild variant="outline" className="bg-transparent">
                <label htmlFor="file-upload">
                  Browse File
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".xlsx, .xls" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
                </label>
              </Button>
              <Button variant="secondary" onClick={handleMockImport}>
                <TestTube2 className="mr-2 h-4 w-4" />
                Simulate Valid File
              </Button>
            </div>
          </div>
          <Alert className="mt-4">
            <Download className="h-4 w-4" />
            <AlertTitle>Required Format</AlertTitle>
            <AlertDescription>
              Ensure your file has columns: {REQUIRED_COLUMNS.join(', ')}.
              <Button variant="link" className="p-0 h-auto ml-2" onClick={downloadTemplate}>Download Template</Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {step === 'preview' && (
        <div className="py-4">
          <Alert variant={invalidCount > 0 ? "destructive" : "default"}>
            {invalidCount > 0 ? <FileWarning className="h-4 w-4" /> : <FileCheck2 className="h-4 w-4" />}
            <AlertTitle>Validation Complete</AlertTitle>
            <AlertDescription>
              Found {validCount} valid proposal(s) and {invalidCount} row(s) with errors in <strong>{fileName}</strong>. Only valid proposals will be imported.
            </AlertDescription>
          </Alert>
          <div className="mt-4 h-96 overflow-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-100">
                <tr>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Code</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Budget</th>
                  <th className="p-2 text-left">Errors</th>
                </tr>
              </thead>
              <tbody>
                {validatedRows.map((row, i) => (
                  <tr key={i} className={cn("border-t", !row.isValid ? 'bg-red-50' : '')}>
                    <td className="p-2">
                      {row.isValid ? <Badge variant="default" className="bg-green-600">Valid</Badge> : <Badge variant="destructive">Invalid</Badge>}
                    </td>
                    <td className="p-2 font-mono text-xs">{row.data.projectCode}</td>
                    <td className="p-2">{row.data.name}</td>
                    <td className="p-2 font-mono text-xs">{Number(row.data.budget).toLocaleString()}</td>
                    <td className="p-2 text-red-600 text-xs">{row.errors.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={resetState}>Upload New File</Button>
            <Button onClick={handleConfirmImport} disabled={validCount === 0}>
              Import {validCount} Valid Proposal(s)
            </Button>
          </DialogFooter>
        </div>
      )}
    </DialogContent>
  </Dialog>
)
}
