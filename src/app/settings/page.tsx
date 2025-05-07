import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

function Settings() {
  const menuItems = [{ title: "Profile" }, { title: "Account" }, { title: "Notifications" }];
  return (
    <AppSidebarProvider>
      <div className="flex gap-4 m-4 h-full">
        <div className="w-[15%] h-full flex items-center p-8">
          <ul className="flex flex-col gap-6 w-full items-start h-full">
            {menuItems.map((menuItem, index) => {
              return (
                <React.Fragment key={index}>
                  <li className="text-muted-foreground">{menuItem.title}</li>
                  {menuItems.length !== index + 1 && <Separator />}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <Card className="h-full flex flex-1"></Card>
      </div>
    </AppSidebarProvider>
  );
}

export default Settings;
