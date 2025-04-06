import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import React from "react";

function AppSidebarMenu({
  menuLabel,
  menuItems,
  className,
}: {
  menuLabel?: string;
  menuItems: Array<{
    title: string;
    icon?: LucideIcon;
    url: string;
  }>;
  className?: string;
}) {
  return (
    <SidebarGroup className={`${className}`}>
      {menuLabel && <SidebarGroupLabel>{menuLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default AppSidebarMenu;
