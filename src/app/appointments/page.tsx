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
import { AppointmentStatus, AppointmentTypes, FormFieldTypes } from "@/lib/enums";
import { formatDateTime, toLocalDate } from "@/lib/utils";
import { CircleX, ListFilter, Pencil, RotateCcw, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentForm from "./AppointmentForm";
import { AppointmentSummary } from "@/lib/types";
import { useAppStore } from "@/zustand/AppStore";

const appointmentsTableHeaders = ["Patient", "Doctor", "Date & Time", "Type", "Status"];

interface searchFiltersInputs {
  searchQuery: string;
  appointmentType: string;
  appointmentStatus: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

export interface AppointmentFormInputs {
  patient: string;
  doctor: string;
  type: AppointmentTypes;
  appointmentDate: string;
  appointmentTime: string;
}

interface AppointmentTableData {
  patient: string;
  doctor: string;
  appointmentDateTime: string;
  appointmentType: string;
  appointmentStatus: AppointmentStatus;
}

function Appointments() {
  const { createAppointment, getAppointments } = useAppStore();
  const [data, setData] = useState<AppointmentTableData[] | []>([]);
  const [displayData, setDisplayData] = useState<AppointmentTableData[] | []>([]);
  const [appointmentFormOpen, setAppointmentFormOpen] = useState<boolean>(false);

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
      type: AppointmentTypes.GENERAL,
      appointmentDate: undefined,
      appointmentTime: undefined,
    },
  });

  const { getValues, reset } = searchFiltersForm;

  const { handleSubmit: handleAppointmentFormSubmit, reset: resetAppointmentForm } =
    appointmentForm;

  const onAppointmentFormSubmit = async (data: AppointmentFormInputs) => {
    const { appointmentDate, appointmentTime, patient, doctor, type } = data;
    const formattedDateTime: string = formatDateTime(new Date(appointmentDate), appointmentTime);
    const payload = {
      patientId: patient,
      doctorId: doctor,
      appointmentType: type,
      appointmentDateTime: formattedDateTime,
      appointmentStatus: AppointmentStatus.SCHEDULED,
    };

    await createAppointment(payload);

    setAppointmentFormOpen(false);
    getAllAppointments();
  };

  const applyFilters = () => {
    const { searchQuery, appointmentStatus, appointmentType, dateRange } = getValues();

    const filteredData = data.filter((row) => {
      return (
        (searchQuery === "" ||
          row.patient.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          row.doctor.toLowerCase().startsWith(searchQuery.toLowerCase())) &&
        (appointmentType.toLowerCase().includes("all") ||
          row.appointmentType.toLowerCase().includes(appointmentType.toLowerCase())) &&
        (appointmentStatus.toLowerCase().includes("all") ||
          row.appointmentStatus.toLowerCase().includes(appointmentStatus.toLowerCase())) &&
        (dateRange == undefined ||
          dateRange.from == undefined ||
          toLocalDate(row.appointmentDateTime).getTime() === new Date(dateRange.from).getTime() ||
          (toLocalDate(row.appointmentDateTime) >= new Date(dateRange.from) &&
            toLocalDate(row.appointmentDateTime) <= new Date(dateRange.to)))
      );
    });

    setDisplayData(filteredData);
  };

  const resetFilters = () => {
    reset();
    setDisplayData(data);
  };

  const getAllAppointments = async () => {
    const response: [AppointmentSummary] | [] = await getAppointments();

    let extractedData = [];
    if (response.length > 0) {
      extractedData = response.map((appointment) => {
        return {
          patient: appointment.patient,
          doctor: appointment.doctor,
          appointmentDateTime: appointment.appointmentDateTime,
          appointmentType: appointment.appointmentType,
          appointmentStatus: appointment.appointmentStatus,
        };
      });

      setData(extractedData);
      setDisplayData(extractedData);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <AppSidebarProvider>
      <div className="flex w-full h-full flex-col gap-8">
        <div className="w-[95%] mx-auto mt-8 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold font-stretch-105%">Appointments</p>
            <p className="font-extralight text-muted-foreground">Manage your appointments</p>
          </div>
          <div>
            <Dialog open={appointmentFormOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setAppointmentFormOpen(true)}
                >
                  + New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-popover" showCloseButton={false}>
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
                    <Button
                      variant="secondary"
                      onClick={() => {
                        resetAppointmentForm();
                        setAppointmentFormOpen(false);
                      }}
                    >
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
                    {appointmentsTableHeaders.map((header, idx) => (
                      <TableHead key={idx}>{header}</TableHead>
                    ))}
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((row, rowIdx) => (
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
                  {displayData.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={appointmentsTableHeaders.length}
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
