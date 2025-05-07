import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";
import { Button } from "@/components/ui/button";
import React from "react";

function Prescriptions() {
  return (
    <AppSidebarProvider>
      <div className="flex w-full h-full flex-col gap-8">
        <div className="w-[95%] mx-auto mt-8 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold font-stretch-105%">Prescriptions</p>
            <p className="font-extralight text-muted-foreground">
              Create and manage patient prescriptions
            </p>
          </div>
          <div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              + New Prescription
            </Button>
          </div>
        </div>
      </div>
    </AppSidebarProvider>
  );
}

export default Prescriptions;
