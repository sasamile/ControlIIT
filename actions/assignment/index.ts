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
      reference,
      serial,
      owner,
      location,
      status,
      observations,
      availability,
      quantity,
      elementId,
    } = result.data;

    // Verificar si hay suficiente cantidad disponible en el inventario
    const inventoryItem = await db.inventory.findUnique({
      where: { id: elementId },
    });

    if (!inventoryItem) {
      return { error: "Elemento de inventario no encontrado." };
    }

    if (inventoryItem.availableQuantity < quantity) {
      return { error: "Cantidad insuficiente en el inventario." };
    }

    const response = await db.assignment.create({
      data: {
        reference,
        serial,
        owner,
        location,
        status,
        details: observations,
        availability,
        quantity,
        user: {
          connect: {
            id: responsibleId,
          },
        },
        inventory: {
          connect: {
            id: elementId,
          },
        },
      },
    });

    if (response.id) {
      await db.inventory.update({
        where: { id: elementId },
        data: {
          availableQuantity: {
            decrement: quantity,
          },
        },
      });
    }

    revalidatePath("/equipment-assignment");
    revalidatePath("/inventory");
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
      quantity,
      elementId,
      responsibleId,
      reference,
      serial,
      owner,
      location,
      status,
      observations,
      availability,
    } = result.data;

    const existingAssignment = await db.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!existingAssignment) {
      return { error: "Asignación no encontrada." };
    }

    // Obtener el elemento de inventario relacionado
    const inventoryItem = await db.inventory.findUnique({
      where: { id: elementId },
    });

    if (!inventoryItem) {
      return { error: "Elemento de inventario no encontrado." };
    }

    // Verificar la cantidad disponible y calcular el ajuste necesario
    const currentAssignedQuantity = existingAssignment.quantity;
    const difference = quantity - currentAssignedQuantity;

    if (difference > 0 && inventoryItem.availableQuantity < difference) {
      return {
        error: `No se puede asignar esa cantidad. Quedan ${inventoryItem.availableQuantity} equipos disponibles.`,
      };
    }

    const response = await db.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        reference,
        serial,
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
        inventory: {
          connect: {
            id: elementId,
          },
        },
      },
    });

    if (response.id) {
      // Actualizar el inventario según la diferencia
      await db.inventory.update({
        where: { id: elementId },
        data: {
          availableQuantity: {
            increment: -difference, // Resta si se asignan más, suma si se reducen
          },
        },
      });
    }

    revalidatePath("/equipment-assignment");
    return { success: "Asignación actualizada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function deleteAssignment(id: string, elementId: string) {
  const loggedUser = await currentUser();

  if (loggedUser?.role !== "ADMIN") {
    return { error: "No tiene acceso a este proceso." };
  }

  if (!id) {
    return { error: "ID de la asignación requerido." };
  }

  if (!elementId) {
    return { error: "ID del elemento requerido." };
  }

  try {
    const result = await db.assignment.delete({
      where: { id },
    });

    if (result.id) {
      await db.inventory.update({
        where: { id: elementId },
        data: {
          availableQuantity: {
            increment: result.quantity,
          },
        },
      });
    }

    revalidatePath("/equipment-assignment");
    revalidatePath("/inventory");
    return { success: "Asignación eliminada." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}
