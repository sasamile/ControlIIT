"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@prisma/client";
import AdminActions from "./admin-actions";

export type AdminRequestColum = {
  id: string;
  employeeId: string;
  employee: string;
  requestType: string;
  description: string;
  reason: string;
  createdAt: string;
  status: RequestStatus;
};

export const adminColumns: ColumnDef<AdminRequestColum>[] = [
  {
    accessorKey: "employee",
    header: "Empleado",
    cell: ({ row }) => {
      const employee: string = row.getValue("employee");

      return (
        <p className="py-4 min-w-[200px] text-muted-foreground text-sm">
          {employee}
        </p>
      );
    },
  },
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
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center min-w-[80px]">
        <AdminActions requestData={row.original} />
      </div>
    ),
  },
];
