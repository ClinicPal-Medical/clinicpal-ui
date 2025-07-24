/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { FormField, FormItem, FormLabel } from "./form";

interface AutocompleteProps {
  form?: any;
  name: string;
  placeholder?: string;
  label?: string;
  options?: any[];
  onValueChange?: (value: string) => void;
}

function Autocomplete({
  form,
  name,
  label,
  placeholder,
  onValueChange,
  options,
}: AutocompleteProps) {
  const [input, setInput] = useState("");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="relative">
            {label && <FormLabel className="data-[error=true]:text-foreground">{label}</FormLabel>}
            <Command className="rounded-lg border shadow-md md:min-w-[450px]">
              <CommandInput
                placeholder={placeholder || "Type a command or search..."}
                value={input}
                onValueChange={(value) => {
                  setInput(value);
                  field.onChange(value);
                  if (onValueChange) {
                    onValueChange(value);
                  }
                }}
              />
              {options && options.length > 0 && (
                <CommandList className="absolute z-50 top-15 w-full bg-popover border border-accent rounded-md shadow-lg">
                  <CommandGroup>
                    {options.map((option, index) => {
                      return (
                        <CommandItem
                          key={index}
                          className="cursor-pointer"
                          value={option?.suggestionText}
                          onSelect={() => {
                            field.onChange(option?.id);
                            setInput(option?.suggestionText);
                            if (onValueChange) {
                              onValueChange("");
                            }
                          }}
                        >
                          <span>{option?.suggestionText}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
          </FormItem>
        );
      }}
    />
  );
}

export default Autocomplete;
