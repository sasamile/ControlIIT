"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

interface SidebarRouteItemProps {
  label: string;
  href: string;
  Icon: LucideIcon;
}

export function NavRouteItem({ Icon, href, label }: SidebarRouteItemProps) {
  const pathname = usePathname();

  const isActive = (pathname === "/" && href === "/") || pathname === href;

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-3 mx-4 text-primary/70 transition-all hover:text-primary dark:text-primary/70 dark:hover:text-primary hover:bg-indigo-300/20 dark:hover:bg-indigo-300/20",
          isActive &&
            "text-white bg-blue-600 hover:text-white hover:bg-main dark:text-white dark:bg-main dark:hover:bg-main dark:hover:text-white font-semibold"
        )}
      >
        <Icon className="size-5" strokeWidth={isActive ? "2.25" : "2"} />
        <p className="text-[15px] font-medium">{label}</p>
      </Link>
    </SheetClose>
  );
}
