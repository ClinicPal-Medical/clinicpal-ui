import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./AppSideBar/AppSidebar";

function Dashboard() {
  return (
    <SidebarProvider>
      <div className="page">
        <AppSidebar />
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
