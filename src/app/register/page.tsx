"use client";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/ui/customFormField";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { FormFieldTypes } from "@/lib/enums";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  contact: string;
  address: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const form = useForm<RegisterFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      contact: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data: RegisterFormInputs) =>
    console.log(data);

  return (
    <div className="page bg-muted">
      <div className="bg-card text-card-foreground rounded-xl border flex w-[70%] h-[90%] m-auto gap-4 shadow-sm">
        <Image
          className="hidden md:block max-w-[50%] w-auto h-auto object-cover rounded-l-xl"
          src="/landing_image.jpg"
          alt="landing_page_image"
          width={600}
          height={600}
          priority
        />
        <div className="flex flex-col flex-1 m-auto h-[95%] w-[90%] justify-evenly px-6 gap-5">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Create Account</h3>
            <p className="text-muted-foreground text-sm">Fill in your details to register</p>
          </div>
          <div className="mt-5 overflow-x-scroll">
            <Form {...form}>
              <form className="flex flex-col space-y-6 w-full">
                <div className="flex flex-col xl:flex-row gap-6">
                  <CustomFormField
                    type={FormFieldTypes.INPUT}
                    name="firstName"
                    control={form.control}
                    label="First Name"
                    placeholder="Enter your first name"
                    rules={{
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters long",
                      },
                    }}
                  />
                  <CustomFormField
                    type={FormFieldTypes.INPUT}
                    name="lastName"
                    control={form.control}
                    label="Last Name"
                    placeholder="Enter your last name"
                    rules={{
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters long",
                      },
                    }}
                  />
                </div>
                <CustomFormField
                  type={FormFieldTypes.INPUT}
                  name="email"
                  control={form.control}
                  label="Email"
                  placeholder="Enter your email address"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  }}
                />
                <CustomFormField
                  type={FormFieldTypes.PHONEINPUT}
                  name="contact"
                  control={form.control}
                  label="Contact Number"
                  placeholder="70 123 4567"
                  rules={{
                    required: "Contact number is required",
                    pattern: {
                      value: /^(?:\+94|0)?7\d{8}$/,
                      message: "Invalid contact number",
                    },
                  }}
                />
                <CustomFormField
                  type={FormFieldTypes.TEXTAREA}
                  name="address"
                  control={form.control}
                  label="Address"
                  placeholder="10, Main Street, Colombo"
                  rules={{
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 characters long",
                    },
                  }}
                />
                <CustomFormField
                  type={FormFieldTypes.SELECT}
                  name="role"
                  control={form.control}
                  label="Role"
                  placeholder="Select your role"
                  rules={{
                    required: "Role is required",
                  }}
                >
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </CustomFormField>
                <div className="flex flex-col xl:flex-row gap-6">
                  <CustomFormField
                    type={FormFieldTypes.INPUT}
                    name="password"
                    control={form.control}
                    label="Password"
                    placeholder="Enter a password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    }}
                  />
                  <CustomFormField
                    type={FormFieldTypes.INPUT}
                    name="confirmPassword"
                    control={form.control}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) => {
                        if (value !== form.getValues("password")) {
                          return "Passwords do not match";
                        }
                      },
                    }}
                  />
                </div>
              </form>
            </Form>
          </div>
          <div className="mt-5 flex flex-col items-center gap-5">
            <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
              Create Account
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
