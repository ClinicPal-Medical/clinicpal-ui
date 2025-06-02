"use client";

import CustomFormField from "@/components/ui/customFormField";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { FormFieldTypes } from "@/lib/enums";
import { cn } from "@/lib/utils";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AppointmentForm({ form, className }: { form: any; className?: string }) {
  return (
    <div className={cn(className)}>
      <Form {...form}>
        <form className="flex flex-col space-y-6 w-full">
          <CustomFormField
            type={FormFieldTypes.INPUT}
            name="patient"
            label="Patient Name"
            placeholder="Start typing patient's name"
            form={form}
            rules={{
              required: "Patient is required",
            }}
          />
          <CustomFormField
            type={FormFieldTypes.INPUT}
            name="doctor"
            label="Doctor Name"
            placeholder="Start typing doctor's name"
            form={form}
            rules={{
              required: "Doctor is required",
            }}
          ></CustomFormField>
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
            <SelectItem value="general">General Appointment</SelectItem>
            <SelectItem value="lab">Lab Test</SelectItem>
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
        </form>
      </Form>
    </div>
  );
}

export default AppointmentForm;
