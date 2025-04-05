import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export enum TrendTypes {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}

function DashboardCard({
  cardContent,
  className,
}: {
  cardContent: {
    title: string;
    description: string;
    cardIcon?: LucideIcon;
    trends?: { description: string; trend: TrendTypes };
    actionButton?: { text: string; icon?: LucideIcon };
  };
  className?: string;
}) {
  return (
    <Card className={cn("w-[80%] mx-auto md:w-[20%]", className)}>
      <CardHeader className="relative">
        <CardDescription className="text-foreground">{cardContent.description}</CardDescription>
        <CardTitle className="text-2xl font-semibold">{cardContent.title}</CardTitle>
        {cardContent.cardIcon && (
          <div className="absolute right-7 top-1.5 size-3">
            <cardContent.cardIcon />
          </div>
        )}
      </CardHeader>
      {(cardContent.trends || cardContent.actionButton) && (
        <CardFooter className="text-sm font-medium flex gap-3">
          {cardContent.trends?.description && (
            <p className="text-muted-foreground">{cardContent.trends?.description}</p>
          )}
          {cardContent.trends?.trend &&
            (cardContent.trends?.trend === TrendTypes.POSITIVE ? (
              <TrendingUp size={20} />
            ) : (
              <TrendingDown size={20} />
            ))}
          {cardContent.actionButton && (
            <Button className="w-full">
              {cardContent.actionButton.icon && <cardContent.actionButton.icon />}
              {cardContent.actionButton.text}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export default DashboardCard;
