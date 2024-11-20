"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/common/user-avatar";

export type InventoryElementColum = {
  id: string;
  elemento: string;
  clase: string;
  subclase: string;
  marca: string;
  cantidad: number;
  disponible: number;
};

export const columns: ColumnDef<InventoryElementColum>[] = [
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
    accessorKey: "cantidad",
    header: "Cantidad total",
    cell: ({ row }) => {
      const cantidad: number = row.getValue("cantidad");

      return <p className="py-4 min-w-[80px] text-sm pl-4">{cantidad}</p>;
    },
  },
  {
    accessorKey: "disponible",
    header: "Cantidad disponible",
    cell: ({ row }) => {
      const disponible: number = row.getValue("disponible");

      return <p className="py-4 min-w-[80px] text-sm pl-4">{disponible}</p>;
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => (
      <div className="text-center min-w-[80px]">
        <CellAction inventoryElementData={row.original} />
      </div>
    ),
  },
];
