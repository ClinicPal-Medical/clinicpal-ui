import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./AppSideBar/AppSidebar";
import SiteHeader from "./SiteHeader";

function Dashboard() {
  return (
    <SidebarProvider>
      <div className="page">
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
