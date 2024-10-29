import { NavRoute } from "@/types";
import {
  Headset,
  LayoutDashboard,
  Shield,
  SquareUserRound,
} from "lucide-react";

export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const userRoutes: NavRoute[] = [
  {
    label: "Panel",
    href: "/",
    Icon: LayoutDashboard,
  },
  {
    label: "Portal de solicitudes",
    href: "/request-center",
    Icon: Headset,
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
    label: "Centro de solicitudes",
    href: "/request-center",
    Icon: Headset,
  },
  {
    label: "Gestón de roles",
    href: "/managing-roles",
    Icon: Shield,
  },
];

export const classes = [
  "Equipos",
  "Computadores y accesorios",
  "Elementos consumibles",
  "Muebles y enseres",
  "Electrodomésticos",
  "Herramientas",
];

export const subclasses = [
  "Impresora",
  "Portátil",
  "Cargador",
  "Cámara fotográfica",
  "Proyector",
  "Cable de poder",
  "UPS",
  "CPU",
  "Discos duros",
  "Mouse",
  "Teclado",
  "Pantalla",
  "Escritorio",
  "Silla",
  "Tableta",
  "Pad mouse",
  "Cable VGA",
  "Multitomas",
  "Tablero acrílico",
  "Equipos",
  "Mesa",
  "Audífonos",
  "Caneca basura personal",
  "Biblioteca",
  "Bandeja de papel",
  "Control remoto",
  "RAM",
  "Cafetera",
  "Estante",
  "Juego de destornilladores",
  "Cautín",
  "Baterías",
  "Multímetro",
];

export const locations = [
  "1er Piso administración",
  "2do Piso hall",
  "3er Piso desarrollo",
];
export const statuses = ["Bueno", "Malo", "Para reclamación"];

export const requestTypes = [
  "Cambio de Equipo",
  "Actualización de Hardware/Software",
  "Reparación",
  "Cambio de Ubicación",
  "Otro",
];

export const assignmentStatus = ["Bueno", "Malo", "Para reclamación", "Todos"];
export const requestStatus = ["Pendiente", "Aprobado", "Rechazado", "Todos"];
