"use server";

import { currentUser } from "@/lib/auth-user";
import { db } from "@/lib/db";
import { InventoryElementSchema } from "@/schemas/assignment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createInventoryElement(
  data: z.infer<typeof InventoryElementSchema>
) {
  const result = InventoryElementSchema.safeParse(data);

  if (result.error) {
    return { error: "Valores inválidos." };
  }

  try {
    const loggedUser = await currentUser();

    if (loggedUser?.role !== "ADMIN") {
      return { error: "No tiene acceso a este proceso." };
    }

    const {
      element,
      class: elementClass,
      totalQuantity,
      brand,
      subclass,
    } = result.data;

    // Validar si ya existe un registro con el mismo elemento y marca
    const existingElement = await db.inventory.findFirst({
      where: {
        element,
        brand,
      },
    });

    if (existingElement) {
      return { error: "Ya existe un registro con este elemento y marca." };
    }

    await db.inventory.create({
      data: {
        availableQuantity: totalQuantity,
        totalQuantity: totalQuantity,
        class: elementClass,
        element,
        brand,
        subclass,
      },
    });

    revalidatePath("/inventory");
    return { success: "Elemento creado." };
  } catch {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function getInventoryElements() {
  try {
    const elements = await db.inventory.findMany();

    return elements;
  } catch {
    return [];
  }
}

export async function deleteInventoryElement(id: string) {
  const loggedUser = await currentUser();

  if (loggedUser?.role !== "ADMIN") {
    return { error: "No tiene acceso a este proceso." };
  }

  if (!id) {
    return { error: "ID del elemento requerido." };
  }
  try {
    await db.inventory.delete({
      where: { id },
    });

    revalidatePath("/inventory");
    return { success: "Elemento eliminado." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}

export async function updateInventoryElement(
  elementId: string,
  values: z.infer<typeof InventoryElementSchema>
) {
  const loggedUser = await currentUser();
  const result = InventoryElementSchema.safeParse(values);

  if (result.error) {
    return { error: "Valores inválidos." };
  }

  if (loggedUser?.role !== "ADMIN") {
    return { error: "No tiene acceso a este proceso." };
  }

  if (!elementId) {
    return { error: "ID del elemento requerido." };
  }

  try {
    const {
      class: elementClass,
      element,
      totalQuantity,
      brand,
      subclass,
    } = result.data;

    const existingElement = await db.inventory.findUnique({
      where: {
        id: elementId,
      },
    });

    const quantityOfNewItems = totalQuantity - existingElement?.totalQuantity!;
    const newAvailableQuantity =
      existingElement?.availableQuantity! + quantityOfNewItems;

    await db.inventory.update({
      where: {
        id: elementId,
      },
      data: {
        availableQuantity: newAvailableQuantity,
        totalQuantity: totalQuantity,
        class: elementClass,
        element,
        brand,
        subclass,
      },
    });

    revalidatePath("/inventory");
    return { success: "Elemento actualizado." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}
