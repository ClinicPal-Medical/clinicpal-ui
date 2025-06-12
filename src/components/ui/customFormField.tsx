/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { E164Number } from "libphonenumber-js";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { CalendarIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { FormFieldTypes } from "@/lib/enums";
import { RegisterOptions } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { format } from "date-fns";

interface CustomFormFieldProps {
  type: FormFieldTypes;

  form?: any;
  rules?: RegisterOptions;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  datePickerMode?: "single" | "range";
  numberOfMonths?: number;
}

function CustomFormField(props: CustomFormFieldProps) {
  const { name, label, description, type, rules, form } = props;

  const RenderField = ({
    field,
    props,
    form,
  }: {
    field: any;
    props: CustomFormFieldProps;
    form: any;
  }) => {
    const { type, placeholder, icon, className, children, name, datePickerMode, numberOfMonths } =
      props;
    const Icon = icon;

    switch (type) {
      case FormFieldTypes.INPUT:
        return (
          <div
            className="flex bg-transparent items-center rounded-md border border-input aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            aria-invalid={form?.formState.errors[name] ? true : false}
          >
            {Icon && <Icon className="pl-2" />}
            <FormControl>
              <Input
                className={cn(
                  "border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  className,
                )}
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
            <Textarea
              {...field}
              placeholder={placeholder}
              className={cn(
                "focus-visible:border-input focus-visible:ring-0 focus-visible:ring-offset-0",
                className,
              )}
            />
          </FormControl>
        );
      case FormFieldTypes.SELECT:
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full focus-visible:border-input focus-visible:ring-0 focus-visible:ring-offset-0">
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
              aria-invalid={form?.formState.errors[name] ? true : false}
              className={cn(
                "mt-2 h-9 px-3 py-1 rounded-md text-sm border bg-transparent placeholder:text-muted-foreground border-input focus-visible:border-none",
                form?.formState.errors[name] &&
                  "border-destructive ring-destructive/20 dark:ring-destructive/40",
              )}
            />
          </FormControl>
        );
      case FormFieldTypes.DATEPICKER:
        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal")}>
                  {(() => {
                    const value = field.value;
                    if (value?.from) {
                      return value.to
                        ? `${format(value.from, "dd-MM-yyyy")} - ${format(value.to, "dd-MM-yyyy")}`
                        : format(value.from, "dd-MM-yyyy");
                    } else if (value instanceof Date) {
                      return format(value, "dd-MM-yyyy");
                    } else {
                      return <span>Pick a date</span>;
                    }
                  })()}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode={datePickerMode || "single"}
                numberOfMonths={numberOfMonths || 1}
                selected={field.value}
                onSelect={field.onChange}
                captionLayout="dropdown"
                fromDate={field.value?.fromDate}
                toDate={field.value?.toDate}
              />
            </PopoverContent>
          </Popover>
        );
      default:
        return null;
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel className="data-[error=true]:text-foreground">{label}</FormLabel>}
          <RenderField field={field} form={form} props={props} />
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
