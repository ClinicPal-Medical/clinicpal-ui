import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

function LoginCard() {
  return (
    <Card className="w-[380px] mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Hello Pal... 👋</CardTitle>
        <CardDescription>Login with your credentials</CardDescription>
      </CardHeader>
      <CardContent className="mt-5">
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
      </CardContent>
      <CardFooter className="mt-5 flex flex-col items-center gap-5">
        <Button className="w-full">Login</Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
