import { z } from "zod";

export const RequestSchema = z.object({
  requestType: z.string({
    message: "Tipo solicitud requerida.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  reason: z.string().min(10, {
    message: "La razón debe tener al menos 10 caracteres.",
  }),
});
