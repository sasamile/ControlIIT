import * as React from "react";
import { SVGProps } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  fill?: string;
  dinamicTextColor?: boolean;
  props?: SVGProps<SVGSVGElement>;
}

export function Logo({
  className,
  fill = "#007DFC",
  dinamicTextColor = false,
  props,
}: LogoProps) {
  return (
    <div className={cn("select-none flex items-center gap-2", className)}>
      <Image src={"/Logo1.png"} alt="Logo" width={300} height={100} />
    </div>
  );
}
