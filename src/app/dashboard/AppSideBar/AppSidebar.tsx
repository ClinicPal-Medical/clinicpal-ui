"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { CalendarPlus, HelpCircleIcon, Home, Plus, Search, User, Wrench } from "lucide-react";
import React from "react";
import UserManager from "./UserManager";
import CollapsibleSidebarMenu from "./CollapsibleSidebarMenu";
import AppSidebarMenu from "./AppSidebarMenu";

function AppSidebar() {
  const quickLinks = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "New Appointment",
      url: "#",
      icon: CalendarPlus,
    },
  ];

  const patientsMenuItems = [
    {
      title: "Search Patient",
      url: "#",
      icon: Search,
    },
    {
      title: "Add Patient",
      url: "#",
      icon: Plus,
    },
  ];

  const doctorsMenuItems = [
    {
      title: "Search Doctor",
      url: "#",
      icon: Search,
    },
    {
      title: "Add Doctor",
      url: "#",
      icon: Plus,
    },
  ];

  const appointmentsMenuItems = [
    {
      title: "Search Appointment",
      url: "#",
      icon: Search,
    },
    {
      title: "Add Appointment",
      url: "#",
      icon: Plus,
    },
  ];

  const inventoryMenuItems = [
    {
      title: "Search Inventory",
      url: "#",
      icon: Search,
    },
    {
      title: "Add Inventory",
      url: "#",
      icon: Plus,
    },
  ];

  const secondaryMenuItems = [
    {
      title: "Settings",
      url: "#",
      icon: Wrench,
    },
    {
      title: "Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ];

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: User,
  };

  return (
    <Sidebar>
      <SidebarHeader className="items-center m-4">
        <h1 className="text-3xl font-bold">ClinicPal</h1>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMenu menuLabel="Quick Links" menuItems={quickLinks} />
        <SidebarSeparator />
        <CollapsibleSidebarMenu menuLabel="Patients" menuItems={patientsMenuItems} />
        <CollapsibleSidebarMenu menuLabel="Doctors" menuItems={doctorsMenuItems} />
        <CollapsibleSidebarMenu menuLabel="Appointments" menuItems={appointmentsMenuItems} />
        <CollapsibleSidebarMenu menuLabel="Inventory" menuItems={inventoryMenuItems} />
        <SidebarSeparator />
        <AppSidebarMenu menuItems={secondaryMenuItems} className="mt-auto" />
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <UserManager user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
