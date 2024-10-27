import { DataTable } from "@/components/common/data-table";
import { Heading } from "@/components/common/heading";
import { currentRole, currentUser } from "@/lib/auth-user";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { columns, UserColum } from "./components/columns";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { es } from "date-fns/locale";

export default async function ManagingRolesPage() {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    redirect("/");
  }

  const loggedUser = await currentUser();

  const users = await db.user.findMany({
    where: {
      id: {
        not: loggedUser?.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers: UserColum[] = users.map((user) => ({
    id: user.id,
    image: user.image!,
    name: user.name!,
    email: user.email!,
    phone: user.phone!,
    role: user.role!,
    createdAt: format(user.createdAt, "MMM do, yyyy", { locale: es })!,
  }));

  return (
    <div className="sm:px-4 space-y-8">
      <Heading
        title={`Miembros (${users.length})`}
        description="Reasigna roles a los miembros del sistema"
      />
      <DataTable searchKey="name" searchPlaceholder="Filtra por nombre..." columns={columns} data={formattedUsers} />
    </div>
  );
}
