"use client";

import AppSidebarProvider from "@/components/AppSideBar/AppSidebarProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomFormField from "@/components/ui/customFormField";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CircleX, ListFilter, Pencil, RotateCcw, Search } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentForm from "./AppointmentForm";

interface AppointmentsTableData {
  headers: string[];
  rows: {
    patient: string;
    doctor: string;
    date: string;
    type: string;
    status: string;
  }[];
}

const tableData: AppointmentsTableData = {
  headers: ["Patient", "Doctor", "Date", "Type", "Status"],
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
    {
      patient: "Charlie Brown",
      doctor: "Dr. Green",
      date: "2025-05-03",
      type: "General Appointment",
      status: "Cancelled",
    },
  ],
};

interface searchFiltersInputs {
  searchQuery: string;
  appointmentType: string;
  appointmentStatus: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

interface AppointmentFormInputs {
  patient: string;
  doctor: string;
  type: string;
  appointmentDate: Date;
}

function Appointments() {
  const [data, setData] = useState(tableData);

  const searchFiltersForm = useForm<searchFiltersInputs>({
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

  const appointmentForm = useForm<AppointmentFormInputs>({
    defaultValues: {
      patient: "",
      doctor: "",
      type: "general",
      appointmentDate: undefined,
    },
  });

  const { getValues, reset } = searchFiltersForm;

  const { handleSubmit: handleAppointmentFormSubmit, reset: resetAppointmentForm } =
    appointmentForm;

  const onAppointmentFormSubmit = (data: AppointmentFormInputs) => {
    console.log(data);
  };

  const applyFilters = () => {
    const { searchQuery, appointmentStatus, appointmentType, dateRange } = getValues();

    const filteredData = tableData.rows.filter((row) => {
      return (
        (searchQuery === "" ||
          row.patient.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          row.doctor.toLowerCase().split(". ")[1].startsWith(searchQuery.toLowerCase())) &&
        (appointmentType.toLowerCase().includes("all") ||
          row.type.toLowerCase().includes(appointmentType.toLowerCase())) &&
        (appointmentStatus.toLowerCase().includes("all") ||
          row.status.toLowerCase().includes(appointmentStatus.toLowerCase())) &&
        (dateRange == undefined ||
          dateRange.from == undefined ||
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  + New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold font-stretch-105%">
                    New Appointment
                  </DialogTitle>
                  <DialogDescription className="font-extralight text-muted-foreground">
                    Create a new appointment
                  </DialogDescription>
                </DialogHeader>
                <AppointmentForm form={appointmentForm} className="my-5" />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary" onClick={() => resetAppointmentForm()}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="default"
                    onClick={handleAppointmentFormSubmit(onAppointmentFormSubmit)}
                  >
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-[95%] mx-auto">
          <Card>
            <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-4">
              <Form {...searchFiltersForm}>
                <CustomFormField
                  form={searchFiltersForm}
                  placeholder="Search by patient or doctor name"
                  icon={Search}
                  type={FormFieldTypes.INPUT}
                  name="searchQuery"
                />
                <CustomFormField
                  form={searchFiltersForm}
                  type={FormFieldTypes.DATEPICKER}
                  datePickerMode="range"
                  numberOfMonths={2}
                  name="dateRange"
                />
                <CustomFormField
                  form={searchFiltersForm}
                  type={FormFieldTypes.SELECT}
                  placeholder="All Types"
                  name="appointmentType"
                >
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General Appointment</SelectItem>
                  <SelectItem value="lab">Lab Test</SelectItem>
                </CustomFormField>
                <CustomFormField
                  form={searchFiltersForm}
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
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rows.map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                      {Object.values(row).map((cell, cellIdx) => (
                        <TableCell key={cellIdx}>{cell}</TableCell>
                      ))}
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon">
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/30"
                        >
                          <CircleX />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.rows.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={data.headers.length}
                        className="text-center text-muted-foreground"
                      >
                        No results found
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
