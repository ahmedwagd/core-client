"use client";

import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import SkipToMain from "@/components/skip-to-main";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: This approach requires client-side rendering for cookie access
  const defaultOpen =
    typeof window !== "undefined"
      ? document.cookie.includes("sidebar:state=false")
        ? false
        : true
      : true;

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
