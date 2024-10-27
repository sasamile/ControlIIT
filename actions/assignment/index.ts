"use server";

import { currentUser } from "@/lib/auth-user";
import { db } from "@/lib/db";
import { AssignmentSchema } from "@/schemas/assignment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createAssignment(
  values: z.infer<typeof AssignmentSchema>
) {
  const loggedUser = await currentUser();
  const result = AssignmentSchema.safeParse(values);

  if (result.error) {
    return { error: "Valores inválidos." };
  }

  if (loggedUser?.role !== "ADMIN") {
    return { error: "No tiene acceso a este proceso." };
  }

  try {
    const {
      responsibleId,
      class: assignmentClass,
      subclass,
      element,
      reference,
      serial,
      brand,
      owner,
      location,
      status,
      observations,
      availability,
    } = result.data;

    await db.assignment.create({
      data: {
        class: assignmentClass,
        subclass,
        element,
        reference,
        serial,
        brand,
        owner,
        location,
        status,
        details: observations,
        availability,
        user: {
          connect: {
            id: responsibleId,
          },
        },
      },
    });

    revalidatePath("/equipment-assignment");
    return { success: "Asignación creada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function updateAssignment(
  assignmentId: string,
  values: z.infer<typeof AssignmentSchema>
) {
  const loggedUser = await currentUser();
  const result = AssignmentSchema.safeParse(values);

  if (result.error) {
    return { error: "Valores inválidos." };
  }

  if (loggedUser?.role !== "ADMIN") {
    return { error: "No tiene acceso a este proceso." };
  }

  if (!assignmentId) {
    return { error: "ID de la asignación requerido." };
  }

  try {
    const {
      responsibleId,
      class: assignmentClass,
      subclass,
      element,
      reference,
      serial,
      brand,
      owner,
      location,
      status,
      observations,
      availability,
    } = result.data;

    await db.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        class: assignmentClass,
        subclass,
        element,
        reference,
        serial,
        brand,
        owner,
        location,
        status,
        details: observations,
        availability,
        user: {
          connect: {
            id: responsibleId,
          },
        },
      },
    });

    revalidatePath("/equipment-assignment");
    return { success: "Asignación actualizada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function deleteAssignment(id: string) {
  const loggedUser = await currentUser();

  if (loggedUser?.role !== "ADMIN") {
    return { error: "No tiene acceso a este proceso." };
  }

  if (!id) {
    return { error: "ID de la asignación requerido." };
  }
  try {
    await db.assignment.delete({
      where: { id },
    });

    revalidatePath("/equipment-assignment");
    return { success: "Asignación eliminada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}
