import React from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import SiteHeader from "@/components/SiteHeader";

function AppSidebarProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="page">
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default AppSidebarProvider;
