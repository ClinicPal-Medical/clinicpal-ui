"use client";

import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { useAppStore } from "@/zustand/AppStore";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Spinner() {
  const isLoading = useAppStore((state) => state.isLoading);

  return (
    <Dialog open={isLoading}>
      <DialogContent className="flex items-center justify-center border-none bg-transparent shadow-none [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <div className="m-auto w-full flex flex-col items-center space-y-6">
          <Loader2 className="h-20 w-20 text-primary animate-spin" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
