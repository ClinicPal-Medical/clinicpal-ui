import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col w-fit", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<HTMLDivElement, React.LiHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col gap-1 mb-8 w-fit p-3 rounded-md bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TimelineItem.displayName = "TimelineItem";

const TimelineHeader = React.forwardRef<HTMLDivElement, React.LiHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 before:absolute before:bg-slate-300 before:px-px before:h-full before:translate-y-11 before:-translate-x-15 group-last:before:hidden after:absolute after:box-content after:h-5 after:w-5 after:rounded-full after:border-6 after:border-primary-foreground/95 after:bg-slate-500 after:-translate-x-19 after:translate-y-3 group-first:after:bg-primary",
        className,
      )}
      {...props}
    />
  ),
);
TimelineHeader.displayName = "TimelineHeader";

const TimelineTime = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn("font-semibold text-xs text-primary", className)} {...props}>
    {children}
  </p>
));
TimelineTime.displayName = "TimelineTitle";

const TimelineTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn("font-bold", className)} {...props}>
    {children}
  </p>
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />
));
TimelineDescription.displayName = "TimelineDescription";

export { Timeline, TimelineItem, TimelineTime, TimelineHeader, TimelineTitle, TimelineDescription };
