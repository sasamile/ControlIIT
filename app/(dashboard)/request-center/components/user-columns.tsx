"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@prisma/client";

export type UserRequestColum = {
  id: string;
  requestType: string;
  description: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
};

export const userColumns: ColumnDef<UserRequestColum>[] = [
  {
    accessorKey: "requestType",
    header: "Tipo de solicitud",
    cell: ({ row }) => {
      const requestType: string = row.getValue("requestType");

      return (
        <p className="py-4 sm:min-w-[200px] min-w-[180px] text-muted-foreground text-sm">
          {requestType}
        </p>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description: string = row.getValue("description");

      return (
        <p className="py-4 sm:min-w-[250px] min-w-[300px] text-muted-foreground text-sm">
          {description}
        </p>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Razon de la solicitud",
    cell: ({ row }) => {
      const reason: string = row.getValue("reason");

      return (
        <p className="py-4 sm:min-w-[200px] min-w-[240px] text-muted-foreground text-sm">
          {reason}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status: RequestStatus = row.getValue("status");

      console.log(status);
      return (
        <div className="min-w-[130px]">
          <Badge
            variant={
              status === "Aprobado"
                ? "success"
                : status === "Rechazado"
                ? "destructive"
                : "warning"
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return (
        <p className="py-4 min-w-[100px] text-muted-foreground text-sm">
          {createdAt}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center min-w-[80px]">
        <CellAction requestData={row.original} />
      </div>
    ),
  },
];
