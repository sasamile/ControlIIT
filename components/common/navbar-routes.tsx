"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { adminRoutes, userRoutes } from "@/constants";
import { NavRoute } from "@/types";
import { UserRole } from "@prisma/client";

interface NavbarRoutesProps {
  role: UserRole;
}

export function NavbarRoutes({ role }: NavbarRoutesProps) {
  const pathname = usePathname();

  const isAdmin = role === "ADMIN";

  const routes = (routes: NavRoute[]) => {
    return (
      <div
        className={cn(
          "max-md-plus:hidden flex-1 flex items-center justify-center gap-3 mx-5"
        )}
      >
        {routes.map(({ label, href }) => {
          const isActive =
            (pathname === "/" && href === "/") || pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-primary/70 transition-all hover:text-primary dark:text-primary/70 dark:hover:text-primary",
                isActive &&
                  "text-primary hover:text-primary dark:text-primary dark:bg-main dark:hover:bg-main dark:hover:text-primary font-semibold"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {isAdmin && routes(adminRoutes)}
      {!isAdmin && routes(userRoutes)}
    </>
  );
}
