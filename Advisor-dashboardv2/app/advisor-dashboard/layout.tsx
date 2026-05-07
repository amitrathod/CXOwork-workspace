import { DashboardShell } from "@/components/advisor-dashboard/DashboardShell";

export default function AdvisorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
