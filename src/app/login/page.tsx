import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

function LoginPage() {
  return (
    <div className="page bg-muted">
      <div className="bg-card text-card-foreground rounded-xl border flex w-[70%] h-[80%] m-auto gap-4 shadow-sm">
        <Image
          className="hidden md:block max-w-[50%] h-full object-cover rounded-l-xl"
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
          <div className="mt-5">
            <form className="flex flex-col space-y-3 w-full">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email"></Input>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-muted-foreground text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input type="password"></Input>
              </div>
            </form>
          </div>
          <div className="mt-5 flex flex-col items-center gap-5">
            <Button className="w-full">Login</Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
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
