"use client";
import { ClientProvider } from "@/lib/mock-context";
import { TopNav } from "./TopNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900" style={{ colorScheme: "light" }}>
        <TopNav />
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </ClientProvider>
  );
}
