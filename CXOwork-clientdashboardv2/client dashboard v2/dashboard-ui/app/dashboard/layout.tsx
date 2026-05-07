import { DashboardShell } from "@/components/client-dashboard/DashboardShell";
export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
