"use client";

import { cn } from "@/lib/utils";
import { NavRouteItem } from "./sidebar-route-item";
import { adminRoutes, userRoutes } from "@/constants";
import { UserRole } from "@prisma/client";

interface SidebarRoutesProps {
  className?: string;
  role: UserRole;
}

export function SidebarRoutes({ className, role }: SidebarRoutesProps) {
  const isAdmin = role === "ADMIN";

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
