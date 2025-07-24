"use client";

import Autocomplete from "@/components/ui/autocomplete";
import CustomFormField from "@/components/ui/customFormField";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { AppointmentTypes, FormFieldTypes } from "@/lib/enums";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormInputs } from "./page";
import { predictiveSearch } from "@/zustand/actions/appointmentActions";
import { Patient, User } from "@/lib/types";

function AppointmentForm({
  form,
  className,
}: {
  form: UseFormReturn<AppointmentFormInputs>;
  className?: string;
}) {
  const [patientOptions, setPatientOptions] = useState<Patient[]>([]);
  const [doctorOptions, setDoctorOptions] = useState<User[]>([]);

  const patientPredictiveSearch = async (query: string) => {
    if (query.length > 2) {
      const searchResults = await predictiveSearch(query, "patient");
      setPatientOptions(searchResults);
    } else {
      setPatientOptions([]);
    }
  };

  const doctorPredictiveSearch = async (query: string) => {
    if (query.length > 2) {
      const searchResults = await predictiveSearch(query, "doctor");
      setDoctorOptions(searchResults);
    } else {
      setDoctorOptions([]);
    }
  };

  return (
    <div className={cn(className)}>
      <Form {...form}>
        <form className="flex flex-col space-y-6 w-full">
          <Autocomplete
            form={form}
            name="patient"
            label="Patient Name"
            placeholder="Search patient"
            onValueChange={patientPredictiveSearch}
            options={patientOptions}
          />
          <Autocomplete
            form={form}
            name="doctor"
            label="Doctor Name"
            placeholder="Search doctor"
            onValueChange={doctorPredictiveSearch}
            options={doctorOptions}
          />
          <CustomFormField
            type={FormFieldTypes.SELECT}
            name="type"
            label="Appointment Type"
            placeholder="Enter appointment type"
            form={form}
            rules={{
              required: "Appointment Type is required",
            }}
          >
            <SelectItem value={AppointmentTypes.GENERAL}>General Appointment</SelectItem>
            <SelectItem value={AppointmentTypes.LAB_TEST}>Lab Test</SelectItem>
          </CustomFormField>
          <CustomFormField
            form={form}
            type={FormFieldTypes.DATEPICKER}
            name="appointmentDate"
            label="Appointment Date"
            rules={{
              required: "Appointment Date is required",
            }}
          />
          <CustomFormField
            form={form}
            type={FormFieldTypes.TIMEPICKER}
            name="appointmentTime"
            label="Appointment Time"
            rules={{
              required: "Appointment Time is required",
            }}
          />
        </form>
      </Form>
    </div>
  );
}

export default AppointmentForm;
