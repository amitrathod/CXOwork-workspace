/**
 * Layout for the native client dashboard.
 *
 * Wraps every /dashboard/* route in DashboardShell — sidebar, mobile
 * topbar, email-verify banner, persona/auth gating, ClientProvider.
 * Replaces the iframe-mount that used to live in app/dashboard/page.tsx.
 */

import { DashboardShell } from "@/components/client-dashboard/DashboardShell";

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
