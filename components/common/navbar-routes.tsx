"use client";

import { usePathname } from "next/navigation";

import { useCurrentRole } from "@/hooks/use-current-role";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { adminRoutes, userRoutes } from "@/constants";
import { NavRoute } from "@/types";

export function NavbarRoutes() {
  const pathname = usePathname();
  const userRole = useCurrentRole();

  const isAdmin = userRole === "ADMIN";

  const routes = (routes: NavRoute[]) => {
    return (
      <div className={cn("max-md:hidden flex-1 flex items-center justify-center gap-3 mx-5")}>
        {routes.map(({ label, href }) => {
          const isActive =
            (pathname === "/" && href === "/") || pathname === href;

          return (
            <Link
              href={href}
              className={cn(
                "text-primary/70 transition-all hover:text-primary dark:text-primary/70 dark:hover:text-primary",
                isActive &&
                  "text-primary hover:text-white hover:bg-main dark:text-primary dark:bg-main dark:hover:bg-main dark:hover:text-white font-semibold"
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
