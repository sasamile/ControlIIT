import { Heading } from "@/components/common/heading";
import { currentRole } from "@/lib/auth-user";
import { RequestDialog } from "./components/request-dialog";
import { cn } from "@/lib/utils";
import { UserTable } from "./components/user-table";
import { AdminTable } from "./components/admin-table";

export default async function RequestCenterPage() {
  const role = await currentRole();
  const isAdmin = role === "ADMIN";

  const title =
    role === "ADMIN" ? "Gestión de solicitudes" : "Portal de solicitudes";
  const description =
    role === "ADMIN"
      ? "Administra y revisa las solicitudes de cambio de equipos y otras peticiones de los empleados de forma eficiente."
      : "Visualiza o crea las solicitudes que requieras.";

  return (
    <div className="sm:px-4 space-y-8">
      <div className="flex max-md:flex-col md:items-center justify-between md:gap-3 gap-5">
        <Heading title={title} description={description} />
        <div className={cn(isAdmin && "hidden")}>
          <RequestDialog />
        </div>
      </div>

      <div className={cn(isAdmin && "hidden")}>
        <UserTable />
      </div>

      <div className={cn(!isAdmin && "hidden")}>
        <AdminTable />
      </div>
    </div>
  );
}
