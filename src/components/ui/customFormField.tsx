/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { E164Number } from "libphonenumber-js";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { FormFieldTypes } from "@/lib/enums";
import { RegisterOptions } from "react-hook-form";

interface CustomFormFieldProps {
  type: FormFieldTypes;

  control: any;
  rules?: RegisterOptions;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const { type, placeholder, icon, className, children, name } = props;
  const Icon = icon;

  switch (type) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex bg-transparent items-center rounded-md border border-input">
          {Icon && <Icon className="pl-2" />}
          <FormControl>
            <Input
              className={cn("border-0 focus-visible:ring-0 focus-visible:ring-offset-0", className)}
              {...field}
              placeholder={placeholder}
              type={name === "password" || name === "confirmPassword" ? "password" : "text"}
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea {...field} placeholder={placeholder} />
        </FormControl>
      );
    case FormFieldTypes.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="w-fit">{children}</SelectContent>
        </Select>
      );
    case FormFieldTypes.PHONEINPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="LK"
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            placeholder={placeholder}
            className="mt-2 h-9 px-3 py-1 rounded-md text-sm border bg-transparent placeholder:text-muted-foreground border-input focus-visible:border-none"
          />
        </FormControl>
      );
    case FormFieldTypes.DATEPICKER:
      return <Input {...field} type="date" placeholder={placeholder} />;
    default:
      return null;
  }
};

function CustomFormField(props: CustomFormFieldProps) {
  const { control, name, label, description, type, rules } = props;

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} props={props} />
          {(type === FormFieldTypes.PHONEINPUT || description) && (
            <FormDescription className="text-xs">
              {description ? description : "Format: 70 123 4567"}
            </FormDescription>
          )}
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
