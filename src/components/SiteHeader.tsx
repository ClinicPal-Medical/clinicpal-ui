"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { capitalize } from "lodash";

function SiteHeader() {
  const pathname: string = usePathname();
  const paths: string[] = pathname.split("/").filter((path) => path.length > 0);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear w-full">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        {paths && (
          <Breadcrumb>
            <BreadcrumbList>
              {paths.length === 1 && paths[0] === "dashboard" ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
              {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                if (path !== "dashboard") {
                  if (index + 1 === paths.length) {
                    return (
                      <BreadcrumbItem key={index}>
                        <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
                      </BreadcrumbItem>
                    );
                  }
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={href}>{capitalize(path)}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </React.Fragment>
                  );
                }
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </header>
  );
}

export default SiteHeader;
