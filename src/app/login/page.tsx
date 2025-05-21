"use client";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/ui/customFormField";
import { Form } from "@/components/ui/form";
import { FormFieldTypes } from "@/lib/enums";
import { User } from "@/lib/types";
import { useAppStore } from "@/zustand/AppStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "./actions";

export interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();
  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const user: User = await loginUser(data);
    setUser(user);
    router.push("/dashboard");
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
                  form={form}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  }}
                />
                <CustomFormField
                  type={FormFieldTypes.INPUT}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  form={form}
                  rules={{
                    required: "Password is required",
                  }}
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
