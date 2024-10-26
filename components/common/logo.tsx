import * as React from "react";
import { SVGProps } from "react";
import { cn } from "@/lib/utils";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
      >
        <path
          fill={fill}
          fillRule="evenodd"
          d="M10 0c5.523 0 10 4.477 10 10V0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10c5.523 0 10 4.477 10 10a9.968 9.968 0 0 1-2.892 7.033l-.037.038-.033.033A9.968 9.968 0 0 1 30 40a9.968 9.968 0 0 1-7.137-2.995A9.968 9.968 0 0 1 20 30c0 5.523-4.477 10-10 10S0 35.523 0 30V20h10C4.477 20 0 15.523 0 10S4.477 0 10 0Zm8 10a8 8 0 0 1-8 8V2a8 8 0 0 1 8 8Zm20 20a8 8 0 1 0-16 0h16ZM2 22v8a8 8 0 1 0 16 0v-8H2Zm20-4V2h8a8 8 0 1 1 0 16h-8Z"
          className="ccustom"
          clipRule="evenodd"
        />
      </svg>
      <span
        className={cn(
          "text-[16px] font-medium tracking-wider text-primary",
          dinamicTextColor && "dark:text-primary text-primary-foreground"
        )}
      >
        CONTROLIIIT
      </span>
    </div>
  );
}
