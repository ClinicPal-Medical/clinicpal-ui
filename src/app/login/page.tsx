"use client";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/ui/customFormField";
import { Form } from "@/components/ui/form";
import { FormFieldTypes } from "@/lib/enums";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };
  return (
    <div className="page bg-muted">
      <div className="bg-card text-card-foreground rounded-xl border flex w-[70%] h-[80%] m-auto gap-4 shadow-sm">
        <Image
          className="hidden md:block max-w-[50%] h-auto w-auto object-cover rounded-l-xl"
          src="/landing_image.jpg"
          alt="landing_page_image"
          width={600}
          height={600}
          priority
        />
        <div className="flex flex-col flex-1 m-auto h-[60%] w-[90%] justify-evenly px-6 gap-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Hello Pal... 👋</h3>
            <p className="text-muted-foreground text-sm">Login with your credentials</p>
          </div>
          <div className="mt-5 overflow-x-scroll">
            <Form {...form}>
              <form className="flex flex-col space-y-6 w-full">
                <CustomFormField
                  type={FormFieldTypes.INPUT}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  control={form.control}
                />
                <CustomFormField
                  type={FormFieldTypes.INPUT}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  control={form.control}
                />
              </form>
            </Form>
          </div>
          <div className="mt-5 flex flex-col items-center gap-5">
            <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
              Login
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
