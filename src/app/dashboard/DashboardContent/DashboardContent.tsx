"use client";

import React from "react";
import DashboardCard, { TrendTypes } from "./DashboardCard";
import { CalendarArrowDown, CalendarCheck, Eye, HandCoins } from "lucide-react";
import DashboardChart from "./DashboardChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DashboardTable from "./DashboardTable";
import { getCurrentDate } from "@/lib/utils";

function DashboardContent() {
  const scheduledAppointments = {
    title: "12",
    description: "Scheduled Appointments",
    cardIcon: CalendarCheck,
    trends: {
      description: "Down 3% this month",
      trend: TrendTypes.NEGATIVE,
    },
  };

  const pendingAppointments = {
    title: "4",
    description: "Pending Appointments",
    cardIcon: CalendarArrowDown,
    actionButton: {
      text: "Review",
      icon: Eye,
    },
  };

  const totalRevenue = {
    title: "LKR 5000.00",
    description: "Total Revenue",
    cardIcon: HandCoins,
    trends: {
      description: "Up 3% this month",
      trend: TrendTypes.POSITIVE,
    },
  };

  return (
    <div className="flex flex-1 w-full justify-evenly items-center flex-col gap-4">
      <div className="w-[87%] flex flex-col items-baseline">
        <p className="text-4xl font-stretch-105%">Today at a Glance</p>
        <p className="font-extralight text-muted-foreground">{getCurrentDate()}</p>
      </div>
      <div className="flex w-full justify-evenly flex-col gap-4 md:flex-row">
        <DashboardCard cardContent={scheduledAppointments} />
        <DashboardCard cardContent={pendingAppointments} />
        <DashboardCard cardContent={totalRevenue} />
      </div>
      <div className="flex w-[95%] justify-evenly flex-col gap-4 md:flex-row">
        <Card className="flex flex-1 lg:px-6">
          <CardHeader>Total Appointments</CardHeader>
          <CardContent className="pt-4 sm:px-6 sm:pt-6 flex-1">
            <DashboardChart />
          </CardContent>
        </Card>
        <Card className="flex md:w-[55%]">
          <CardHeader>Upcomming Appointments</CardHeader>
          <CardContent>
            <DashboardTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardContent;
