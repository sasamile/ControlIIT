import { DataTable } from "@/components/common/data-table";
import { Heading } from "@/components/common/heading";
import { currentRole } from "@/lib/auth-user";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { InventoryDialog } from "./components/inventory-dialog";
import { db } from "@/lib/db";
import { columns, InventoryElementColum } from "./components/columns";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

export default async function Inventory() {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    redirect("/");
  }

  const inventory = await db.inventory.findMany();

  const formattedInventoryElements: InventoryElementColum[] = inventory.map(
    (item) => ({
      id: item.id,
      elemento: item.element!,
      clase: item.class,
      subclase: item.subclass!,
      marca: item.brand!,
      cantidad: item.totalQuantity,
      disponible: item.availableQuantity,
    })
  );

  const ReportPage = dynamic(
    () => import("../reportes/components/report-page"),
    {
      ssr: false, // Important: disable server-side rendering for this component
    }
  );

  return (
    <div className="sm:px-4 space-y-8">
      <div className="flex max-md:flex-col md:items-center justify-between md:gap-3 gap-5">
        <Heading
          title={`Inventario de equipos`}
          description="Administra y controla la disponibilidad de equipos de forma eficiente."
        />
        <div className="w-fit space-x-3 flex justify-center items-center">
          <ReportPage inventory={inventory} />
          <InventoryDialog />
        </div>
      </div>

      <DataTable
        searchKey="elemento"
        searchPlaceholder="Filtra por nombre del elemento..."
        showVisibility
        columns={columns}
        data={formattedInventoryElements}
        // showFilterSelect
        // filterColumnName="estado"
        // filterDefault="Todos"
        // filters={assignmentStatus}
      />
    </div>
  );
}
