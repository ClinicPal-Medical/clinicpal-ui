import React from "react";
import DashboardContent from "./DashboardContent/DashboardContent";
import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";

function Dashboard() {
  return (
    <AppSidebarProvider>
      <DashboardContent />
    </AppSidebarProvider>
  );
}

export default Dashboard;
