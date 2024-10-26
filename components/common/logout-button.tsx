"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { toast } from "sonner";

interface SignOutButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "ghost" | "default";
}

export function LogoutButton({
  children,
  className,
  variant,
}: SignOutButtonProps) {
  const handleClick = async () => {
    try {
      await logout();
    } catch {
      toast.error("Algo salió mal.", {
        description: "Ocurrió un problema el cierre de sesión.",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={cn(
        "rounded-lg px-3 py-2.5 text-primary/70 transition-all hover:text-primary dark:text-primary/70 dark:hover:text-primary hover:bg-gray-200/40 dark:hover:bg-gray-600/40",
        className
      )}
    >
      {children && children}
      Cerrar sesión
    </Button>
  );
}
