"use client";

import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomFormField from "@/components/ui/customFormField";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormFieldTypes } from "@/lib/enums";
import { toLocalDate } from "@/lib/utils";
import {
  CircleX,
  EllipsisVertical,
  Eye,
  ListFilter,
  Pencil,
  RotateCcw,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const tableData = {
  headers: ["Patient", "Doctor", "Date", "Type", "Status", "Actions"],
  rows: [
    {
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "2025-05-01",
      type: "General Appointment",
      status: "Scheduled",
    },
    {
      patient: "Jane Doe",
      doctor: "Dr. Brown",
      date: "2025-05-02",
      type: "Lab Test",
      status: "Pending",
    },
    {
      patient: "Alice Johnson",
      doctor: "Dr. Green",
      date: "2025-05-03",
      type: "General Appointment",
      status: "Cancelled",
    },
    {
      patient: "Bob Smith",
      doctor: "Dr. White",
      date: "2025-05-04",
      type: "Lab Test",
      status: "Scheduled",
    },
  ],
};

interface AppointmentFormInputs {
  searchQuery: string;
  appointmentType: string;
  appointmentStatus: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

function Appointments() {
  const [data, setData] = useState(tableData);

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

  const { getValues, reset } = form;

  const applyFilters = () => {
    const { searchQuery, appointmentStatus, appointmentType, dateRange } = getValues();

    const filteredData = tableData.rows.filter((row) => {
      return (
        row.patient.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
        (appointmentType.toLowerCase().includes("all") ||
          row.type.toLowerCase().includes(appointmentType.toLowerCase())) &&
        (appointmentStatus.toLowerCase().includes("all") ||
          row.status.toLowerCase().includes(appointmentStatus.toLowerCase())) &&
        (dateRange == undefined ||
          toLocalDate(row.date).getTime() === new Date(dateRange.from).getTime() ||
          (toLocalDate(row.date) >= new Date(dateRange.from) &&
            toLocalDate(row.date) <= new Date(dateRange.to)))
      );
    });

    setData((prevData) => ({
      ...prevData,
      rows: filteredData,
    }));
  };

  const resetFilters = () => {
    reset();
    setData(tableData);
  };

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
            <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-4">
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
                  <SelectItem value="lab">Lab Test</SelectItem>
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
              <Button variant="ghost" onClick={resetFilters}>
                <RotateCcw />
                Reset Filters
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={applyFilters}
              >
                <ListFilter />
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
        <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-4">
          <Card className="md:w-[75%] w-full mx-auto">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow data-role="header">
                    {data.headers.map((header, idx) => (
                      <TableHead key={idx}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rows.map((row, idx) => (
                    <TableRow key={idx} data-role="data">
                      <TableCell>{row.patient}</TableCell>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"}>
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom">
                            <DropdownMenuGroup className="flex flex-col gap-2">
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Pencil />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer" variant="destructive">
                                <CircleX />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.rows.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={data.headers.length}
                        className="text-center text-muted-foreground"
                      >
                        No appointments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="md:flex-1 w-full mx-auto">
            <CardHeader className="font-semibold text-xl">Today&apos;s Schedule</CardHeader>
          </Card>
        </div>
      </div>
    </AppSidebarProvider>
  );
}

export default Appointments;
