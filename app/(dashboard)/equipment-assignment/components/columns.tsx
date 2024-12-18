"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-actions";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/common/user-avatar";
import Image from "next/image";

export type AssignmentColum = {
  id: string;
  elementId: string;
  responsibleId: string;
  imagen: string;
  elementImage: string;
  responsable: string;
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
  cantidad: number;
};

export const columns: ColumnDef<AssignmentColum>[] = [
  {
    accessorKey: "imagen",
    header: "Imagen",
    cell: ({ row }) => {
      const imagen: string = row.getValue("imagen");

      return (
        <div className="flex items-center gap-3 py-4 ">
          <UserAvatar src={imagen} />
        </div>
      );
    },
  },
  {
    accessorKey: "responsable",
    header: "Responsable",
    cell: ({ row }) => {
      const responsable: string = row.getValue("responsable");

      return (
        <div className="flex items-center gap-3 min-w-[200px] py-4 ">
          <p className="text-muted-foreground text-sm">{responsable}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "elementImage",
    header: "Imagen ",
    cell: ({ row }) => {
      const image: string = row.getValue("elementImage");

      return (
        <div className="flex items-center gap-3 py-4">
          {image ? (
            <div className="relative w-[100px] h-[50px]">
              <Image
                src={image}
                fill
                className="object-contain rounded-2xl"
                alt="imagen del equipo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/fallback-image.png";
                }}
              />
            </div>
          ) : (
            <span className="text-muted-foreground italic">Sin imagen</span>
          )}
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
    accessorKey: "cantidad",
    header: "Cantidad asignada",
    cell: ({ row }) => {
      const cantidad: number = row.getValue("cantidad");

      return (
        <div className="min-w-[130px] pl-4">
          <Badge className="rounded-full size-8 items-center justify-center bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/20 hover:text-muted-foreground">
            {cantidad}
          </Badge>
        </div>
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
