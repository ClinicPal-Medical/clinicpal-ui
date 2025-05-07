/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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
import { DateRange } from "react-day-picker";

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
}

const RenderField = ({
  field,
  props,
  form,
}: {
  field: any;
  props: CustomFormFieldProps;
  form: any;
}) => {
  const { type, placeholder, icon, className, children, name } = props;
  const Icon = icon;
  const [date, setDate] = useState<DateRange | undefined>();

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
          <PopoverTrigger asChild className="bg-transparent">
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-between text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>{placeholder || "Pick a date"}</span>
              )}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      );
    default:
      return null;
  }
};

function CustomFormField(props: CustomFormFieldProps) {
  const { name, label, description, type, rules, form } = props;

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
