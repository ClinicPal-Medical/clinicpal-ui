import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function LoginCard() {
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>LogIn</CardTitle>
        <CardDescription>Hello Pal... 👋</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-2 w-full">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email"></Input>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password"></Input>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Login</Button>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
