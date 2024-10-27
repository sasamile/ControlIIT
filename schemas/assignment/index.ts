import { z } from "zod";

export const AssignmentSchema = z.object({
  responsibleId: z.string().min(1, "El responsable es requerido"),
  class: z.string().min(1, "La clase es requerida"),
  subclass: z.string().optional(),
  element: z.string().optional(),
  reference: z.string().optional(),
  serial: z.string().optional(),
  brand: z.string().optional(),
  owner: z.string().min(1, "El propietario es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  status: z.string().min(1, "El estado es requerido"),
  observations: z.string().optional(),
  availability: z.string().optional(),
});
