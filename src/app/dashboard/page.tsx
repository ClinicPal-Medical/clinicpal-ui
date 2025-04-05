import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./AppSideBar/AppSidebar";
import SiteHeader from "./SiteHeader";
import DashboardContent from "./DashboardContent/DashboardContent";

function Dashboard() {
  return (
    <SidebarProvider>
      <div className="page">
        <AppSidebar />
        <SidebarInset className="gap-8">
          <SiteHeader />
          <DashboardContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
