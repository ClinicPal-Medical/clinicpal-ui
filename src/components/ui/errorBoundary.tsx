"use client";

import { useAppStore } from "@/zustand/AppStore";
import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";

function ErrorBoundary() {
  const { errors, setErrors } = useAppStore();
  const pathname = usePathname();

  useEffect(() => {
    setErrors([]);
  }, [pathname, setErrors]);

  return (
    <>
      {errors && errors.length > 0 && (
        <div className="absolute top-10 left-0 right-0 mx-auto grid w-full max-w-xl items-start gap-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error Occured</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm">
                {errors.map((error, index) => (
                  <li
                    key={index}
                    className="text-destructive-foreground"
                  >{`${error.error}(${error.status}): ${error.description}`}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}

export default ErrorBoundary;
