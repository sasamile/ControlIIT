import { NavRoute } from "@/types";
import { LayoutDashboard, Shield, SquareUserRound } from "lucide-react";

export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const userRoutes: NavRoute[] = [
  {
    label: "Panel",
    href: "/",
    Icon: LayoutDashboard,
  },
];

export const adminRoutes: NavRoute[] = [
  {
    label: "Panel",
    href: "/",
    Icon: LayoutDashboard,
  },
  {
    label: "Asignación de equipos",
    href: "/equipment-assignment",
    Icon: SquareUserRound,
  },
  {
    label: "Gestón de roles",
    href: "/managing-roles",
    Icon: Shield,
  },
];
