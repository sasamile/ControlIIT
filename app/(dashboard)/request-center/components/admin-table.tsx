import { format } from "date-fns";
import { es } from "date-fns/locale";

import { DataTable } from "@/components/common/data-table";
import { requestStatus } from "@/constants";
import { AdminRequestColum, adminColumns } from "./admin-columns";
import { getAllRequest } from "@/actions/requests";

export async function AdminTable() {
  const requests = await getAllRequest();

  const formattedRequests: AdminRequestColum[] = requests.map((req) => ({
    id: req.id,
    employeeId: req.userId,
    employee: req.user?.name!,
    requestType: req.requestType,
    description: req.description,
    reason: req.reason,
    createdAt: format(req.createdAt, "MMM do, yyyy", { locale: es })!,
    status: req.status,
  }));

  return (
    <DataTable
      searchKey="employee"
      searchPlaceholder="Filtrar por nombre del empleado..."
      columns={adminColumns}
      data={formattedRequests}
      showFilterSelect
      filterColumnName="status"
      filterDefault="Todos"
      filters={requestStatus}
    />
  );
}
