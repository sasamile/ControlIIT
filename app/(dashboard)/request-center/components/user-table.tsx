import { format } from "date-fns";
import { es } from "date-fns/locale";

import { currentUser } from "@/lib/auth-user";
import { db } from "@/lib/db";
import { userColumns, UserRequestColum } from "./user-columns";
import { DataTable } from "@/components/common/data-table";
import { requestStatus } from "@/constants";

export async function UserTable() {
  const loggedUser = await currentUser();

  const requests = await db.request.findMany({
    where: { userId: loggedUser?.id! },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedRequests: UserRequestColum[] = requests.map((req) => ({
    id: req.id,
    requestType: req.requestType,
    description: req.description,
    reason: req.reason,
    status: req.status,
    createdAt: format(req.createdAt, "MMM do, yyyy", { locale: es })!,
  }));

  return (
    <DataTable
      searchKey="title"
      searchPlaceholder="Filtrar por título..."
      columns={userColumns}
      data={formattedRequests}
      showFilterSelect
      filterColumnName="status"
      filterDefault="Todos"
      filters={requestStatus}
    />
  );
}
