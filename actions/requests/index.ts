"use server";

import { currentRole, currentUser } from "@/lib/auth-user";
import { RepairRequestEmail } from "@/lib/brevo";
import { db } from "@/lib/db";
import { RequestSchema } from "@/schemas/request";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createRequest(values: z.infer<typeof RequestSchema>) {
  try {
    const loggedUser = await currentUser();
    const result = RequestSchema.safeParse(values);
    if (!loggedUser) {
      return { error: "Acción no permitida." };
    }

    if (result.error) {
      return { error: "Valores inválidos." };
    }
    const { description, reason, requestType } = result.data;

    await db.request.create({
      data: {
        description,
        reason,
        requestType,
        user: {
          connect: {
            id: loggedUser.id,
          },
        },
      },
    });

    const users = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    });


    if (requestType === "Reparación" && users.length > 0) {
      users.map(
        async (user) =>
          await RepairRequestEmail(user.email!, loggedUser.name!, description)
      );
    }

    revalidatePath("/request-center");
    return { success: "Solicitud enviada." };
  } catch (error) {
    console.log(error);
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function updateRequest(
  requestId: string,
  values: z.infer<typeof RequestSchema>
) {
  const result = RequestSchema.safeParse(values);

  if (result.error) {
    return { error: "Valores inválidos." };
  }

  if (!requestId) {
    return { error: "ID de la solicitud requerido." };
  }

  try {
    const loggedUser = await currentUser();

    const { description, reason, requestType } = result.data;

    await db.request.update({
      where: {
        id: requestId,
        userId: loggedUser?.id,
      },
      data: {
        description,
        reason,
        requestType,
      },
    });

    revalidatePath("/request-center");
    return { success: "Solicitud actualizada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function deleteRequest(id: string) {
  if (!id) {
    return { error: "ID de la solicitud requerido." };
  }
  try {
    await db.request.delete({
      where: { id },
    });

    revalidatePath("/request-center");
    return { success: "Solicitud eliminada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function getAllRequest() {
  try {
    return await db.request.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    return [];
  }
}

export async function approveRequest(id: string) {
  const role = await currentRole();

  if (role !== "ADMIN") {
    return { error: "Acción no permitida." };
  }

  if (!id) {
    return { error: "ID de la solicitud requerido." };
  }

  try {
    await db.request.update({
      where: { id },
      data: {
        status: "Aprobado",
      },
    });

    revalidatePath("/request-center");
    return { success: "Solicitud Actualizada." };
  } catch (error) {
    return { error: "Algo salio mal en el proceso." };
  }
}

export async function rejectRequest(id: string) {
  const role = await currentRole();

  if (role !== "ADMIN") {
    return { error: "Acción no permitida." };
  }

  if (!id) {
    return { error: "ID de la solicitud requerido." };
  }

  try {
    await db.request.update({
      where: { id },
      data: {
        status: "Rechazado",
      },
    });

    revalidatePath("/request-center");
    return { success: "Solicitud Actualizada." };
  } catch (error) {
    return { error: "Algo salio mal en el proceso." };
  }
}

export async function markAsPending(id: string) {
  const role = await currentRole();

  if (role !== "ADMIN") {
    return { error: "Acción no permitida." };
  }

  if (!id) {
    return { error: "ID de la solicitud requerido." };
  }

  try {
    await db.request.update({
      where: { id },
      data: {
        status: "Pendiente",
      },
    });

    revalidatePath("/request-center");
    return { success: "Solicitud Actualizada." };
  } catch (error) {
    return { error: "Algo salio mal en el proceso." };
  }
}
