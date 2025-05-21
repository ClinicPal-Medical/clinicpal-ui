"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  HelpCircleIcon,
  Home,
  NotebookPen,
  Receipt,
  Tablets,
  UsersRound,
  Wrench,
} from "lucide-react";
import React from "react";
import UserManager from "./UserManager";
import AppSidebarMenu from "./AppSidebarMenu";
import Logo from "@/app/Logo";
import { useAppStore } from "@/zustand/AppStore";

function AppSidebar() {
  const quickLinks = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Appointments",
      url: "/appointments",
      icon: CalendarDays,
    },
    {
      title: "Patients",
      url: "/patients",
      icon: UsersRound,
    },
    {
      title: "Prescriptions",
      url: "/prescriptions",
      icon: NotebookPen,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: Tablets,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: Receipt,
    },
  ];

  const secondaryMenuItems = [
    {
      title: "Settings",
      url: "/settings",
      icon: Wrench,
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircleIcon,
    },
  ];

  const userInState = useAppStore((state) => state.user);

  const user = {
    name: `${userInState?.firstName} ${userInState?.lastName}`,
    email: userInState?.email,
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="items-center m-4">
        <Logo width="3em" />
        <h1 className="text-3xl font-bold">ClinicPal</h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <AppSidebarMenu menuItems={quickLinks} />
        <SidebarSeparator className="mt-auto" />
        <AppSidebarMenu menuItems={secondaryMenuItems} />
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <UserManager user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
