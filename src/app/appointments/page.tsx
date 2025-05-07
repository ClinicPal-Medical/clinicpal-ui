"use client";

import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import CustomFormField from "@/components/ui/customFormField";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { FormFieldTypes } from "@/lib/enums";
import { TimelineItemType } from "@/lib/types";
import { ListFilter, RotateCcw, Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

interface AppointmentFormInputs {
  searchQuery: string;
  appointmentType: string;
  appointmentStatus: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

function Appointments() {
  const form = useForm<AppointmentFormInputs>({
    defaultValues: {
      searchQuery: "",
      appointmentType: "all",
      appointmentStatus: "all",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const timelineData: TimelineItemType[] = [
    {
      id: 1,
      title: "John Doe",
      description: "General Appointment",
      time: "04:00 PM",
    },
    {
      id: 2,
      title: "William Smith",
      description: "Lab Tests Appointment",
      time: "04:30 PM",
    },
    {
      id: 3,
      title: "Jane Doe",
      description: "General Appointment",
      time: "05:00 PM",
    },
    {
      id: 4,
      title: "Jane Doe",
      description: "General Appointment",
      time: "05:15 PM",
    },
    {
      id: 5,
      title: "Naveen Satanarachchi",
      description: "General Appointment",
      time: "05:30 PM",
    },
  ];

  return (
    <AppSidebarProvider>
      <div className="flex w-full h-full flex-col gap-8">
        <div className="w-[95%] mx-auto mt-8 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold font-stretch-105%">Appointments</p>
            <p className="font-extralight text-muted-foreground">Manage your appointments</p>
          </div>
          <div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              + New Appointment
            </Button>
          </div>
        </div>
        <div className="w-[95%] mx-auto">
          <Card>
            <div className="w-[95%] mx-auto flex gap-4">
              <Form {...form}>
                <CustomFormField
                  form={form}
                  placeholder="Search by patient or doctor name"
                  icon={Search}
                  type={FormFieldTypes.INPUT}
                  name="searchQuery"
                />
                <CustomFormField form={form} type={FormFieldTypes.DATEPICKER} name="dateRange" />
                <CustomFormField
                  form={form}
                  type={FormFieldTypes.SELECT}
                  placeholder="All Types"
                  name="appointmentType"
                >
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General Appointment</SelectItem>
                  <SelectItem value="labTests">Lab Tests</SelectItem>
                </CustomFormField>
                <CustomFormField
                  form={form}
                  type={FormFieldTypes.SELECT}
                  placeholder="All Status"
                  name="appointmentStatus"
                >
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </CustomFormField>
              </Form>
            </div>
            <div className="w-[95%] flex justify-end gap-4">
              <Button variant="ghost">
                <RotateCcw />
                Reset Filters
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ListFilter />
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
        <div className="w-[95%] mx-auto flex gap-4">
          <Card className="w-[75%] mx-auto"></Card>
          <Card className="flex-1 mx-auto">
            <CardHeader className="font-semibold text-xl">Today&apos;s Schedule</CardHeader>
            <Timeline className="w-fit mx-auto">
              {timelineData.map((item) => (
                <TimelineItem key={item.id}>
                  <TimelineHeader>
                    <TimelineTime>{item.time}</TimelineTime>
                  </TimelineHeader>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  {item.description && (
                    <TimelineDescription>{item.description}</TimelineDescription>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
        </div>
      </div>
    </AppSidebarProvider>
  );
}

export default Appointments;
