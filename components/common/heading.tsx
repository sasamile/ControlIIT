"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  description: string;
  buttonHref?: string;
  counter?: number;
  showButton?: boolean;
  buttonLabel?: string;
}

export function Heading({
  title,
  description,
  buttonHref,
  showButton = true,
  buttonLabel,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex max-sm:flex-col sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-[16px] text-muted-foreground">{description}</p>
      </div>
      {showButton && buttonHref && (
        <Button onClick={() => router.push(buttonHref)}>
          <Plus className="size-4 mr-2" />
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
