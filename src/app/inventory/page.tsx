import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";
import { Button } from "@/components/ui/button";
import React from "react";

function Inventory() {
  return (
    <AppSidebarProvider>
      <div className="flex w-full h-full flex-col gap-8">
        <div className="w-[95%] mx-auto mt-8 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold font-stretch-105%">Inventory Management</p>
            <p className="font-extralight text-muted-foreground">
              Track and manage medical supplies
            </p>
          </div>
          <div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              + Add Item
            </Button>
          </div>
        </div>
      </div>
    </AppSidebarProvider>
  );
}

export default Inventory;
