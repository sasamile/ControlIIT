import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { Heading } from "@/components/common/heading";
import { currentRole } from "@/lib/auth-user";
import { db } from "@/lib/db";
import { AssignmentDialog } from "./components/assignment-dialog";
import { DataTable } from "@/components/common/data-table";
import { AssignmentColum, columns } from "./components/columns";
import { assignmentStatus } from "@/constants";

export default async function EquipmentAssignmentPage() {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    redirect("/");
  }

  const equipments = await db.assignment.findMany({
    include: {
      user: true,
    },
  });

  const formattedAssignments: AssignmentColum[] = equipments.map(
    (assignment) => ({
      id: assignment.id,
      responsibleId: assignment.userId!,
      imagen: assignment.user.image!,
      responsable: assignment.user.name!,
      clase: assignment.class,
      subclase: assignment.subclass!,
      elemento: assignment.element!,
      referencia: assignment.reference!,
      serial: assignment.serial!,
      marca: assignment.brand!,
      propietario: assignment.owner!,
      ubicación: assignment.location!,
      estado: assignment.status!,
      observaciones: assignment.details!,
      disponibilidad: assignment.availability!,
    })
  );

  return (
    <div className="sm:px-4 space-y-8">
      <div className="flex max-md:flex-col md:items-center justify-between md:gap-3 gap-5">
        <Heading
          title={`Asignación de equipos`}
          description="Gestiona y visualiza las asignaciones de equipos en tu organización."
        />
        <AssignmentDialog />
      </div>
      <DataTable
        searchKey="responsable"
        searchPlaceholder="Filtra por nombre de responsable..."
        showVisibility
        columns={columns}
        data={formattedAssignments}
        showFilterSelect
        filterColumnName="estado"
        filterDefault="Todos"
        filters={assignmentStatus}
      />
    </div>
  );
}
