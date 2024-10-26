"use client";

import { cn } from "@/lib/utils";
import { useCurrentRole } from "@/hooks/use-current-role";
import { NavRouteItem } from "./sidebar-route-item";
import { adminRoutes, userRoutes } from "@/constants";

interface NavRoutesProps {
  className?: string;
}

export function NavRoutes({ className }: NavRoutesProps) {
  const userRole = useCurrentRole();

  const isAdmin = userRole === "ADMIN";

  return (
    <div className={cn("space-y-1.5", className)}>
      {isAdmin &&
        adminRoutes.map(({ label, href, Icon }) => (
          <NavRouteItem key={href} label={label} href={href} Icon={Icon} />
        ))}
      {!isAdmin &&
        userRoutes.map(({ label, href, Icon }) => (
          <NavRouteItem key={href} label={label} href={href} Icon={Icon} />
        ))}
    </div>
  );
}
