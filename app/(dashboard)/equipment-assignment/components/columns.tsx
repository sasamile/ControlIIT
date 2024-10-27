"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { UserAvatar } from "@/components/common/user-avatar";

export type AssignmentColum = {
  id: string;
  responsable: User;
  clase: string;
  subclase: string;
  elemento: string;
  referencia: string;
  serial: string;
  marca: string;
  propietario: string;
  ubicación: string;
  estado: string;
  observaciones: string;
  disponibilidad: string;
};

export const columns: ColumnDef<AssignmentColum>[] = [
  {
    accessorKey: "responsable",
    header: "Responsable",
    cell: ({ row }) => {
      const responsable: User = row.getValue("responsable");

      return (
        <div className="flex items-center gap-3 min-w-[200px] py-4 ">
          <UserAvatar src={responsable.image!} />
          <p className="text-muted-foreground text-sm">{responsable.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "clase",
    header: "Clase",
    cell: ({ row }) => {
      const clase: string = row.getValue("clase");

      return <p className="py-4 min-w-[130px] text-sm">{clase}</p>;
    },
  },
  {
    accessorKey: "subclase",
    header: "Subclase",
    cell: ({ row }) => {
      const subclase: string = row.getValue("subclase");

      return (
        <p className="py-4 min-w-[130px] text-sm">
          {subclase ? (
            subclase
          ) : (
            <span className="text-muted-foreground  italic">
              No proporcionada
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "elemento",
    header: "Elemento",
    cell: ({ row }) => {
      const elemento: string = row.getValue("elemento");

      return (
        <p className="py-4 min-w-[130px] text-sm">
          {elemento ? (
            elemento
          ) : (
            <span className="text-muted-foreground  italic">
              No proporcionado
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "referencia",
    header: "Referencia",
    cell: ({ row }) => {
      const referencia: string = row.getValue("referencia");

      return (
        <p className="py-4 min-w-[130px] text-sm">
          {referencia ? (
            referencia
          ) : (
            <span className="text-muted-foreground  italic">
              No proporcionada
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "serial",
    header: "Serial",
    cell: ({ row }) => {
      const serial: string = row.getValue("serial");

      return (
        <p className="py-4 min-w-[130px] text-sm">
          {serial ? (
            serial
          ) : (
            <span className="text-muted-foreground  italic">
              No proporcionado
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "marca",
    header: "Marca",
    cell: ({ row }) => {
      const marca: string = row.getValue("marca");

      return (
        <p className="py-4 min-w-[130px] text-sm">
          {marca ? (
            marca
          ) : (
            <span className="text-muted-foreground  italic">
              No proporcionada
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "propietario",
    header: "Propietario",
  },
  {
    accessorKey: "ubicación",
    header: "Ubicación",
    cell: ({ row }) => {
      const ubicación: string = row.getValue("ubicación");

      return <p className="py-4 min-w-[130px] text-sm">{ubicación}</p>;
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado: string = row.getValue("estado");

      return (
        <div className="min-w-[130px]">
          <Badge
            variant={
              estado === "Bueno"
                ? "success"
                : estado === "Malo"
                ? "destructive"
                : "primary"
            }
          >
            {estado}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "observaciones",
    header: "Observaciones",
    cell: ({ row }) => {
      const observaciones: string = row.getValue("observaciones");

      return (
        <p className="py-4 min-w-[200px] text-sm">
          {observaciones ? (
            observaciones
          ) : (
            <span className="text-muted-foreground italic">
              No proporcionada
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "disponibilidad",
    header: "Disponibilidad",
    cell: ({ row }) => {
      const disponibilidad: string = row.getValue("disponibilidad");

      return (
        <p className="py-4 min-w-[180px] text-sm">
          {disponibilidad ? (
            disponibilidad
          ) : (
            <span className="text-muted-foreground italic">
              No proporcionada
            </span>
          )}
        </p>
      );
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => (
      <div className="text-center min-w-[80px]">
        <CellAction assignmentData={row.original} />
      </div>
    ),
  },
];
