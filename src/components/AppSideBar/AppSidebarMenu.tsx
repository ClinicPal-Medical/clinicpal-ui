import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
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
  const pathname: string = usePathname();

  return (
    <SidebarGroup>
      {menuLabel && <SidebarGroupLabel>{menuLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu className={cn(className)}>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild className="min-h-[3rem]" isActive={pathname === item.url}>
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
