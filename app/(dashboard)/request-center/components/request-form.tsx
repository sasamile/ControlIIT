"use client";

import { createRequest, updateRequest } from "@/actions/requests";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { requestTypes } from "@/constants";
import { RequestSchema } from "@/schemas/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UserRequestColum } from "./user-columns";
import { useTransition } from "react";

interface RequestFormProps {
  initialData?: UserRequestColum;
  closeModal: () => void;
}

export function RequestForm({ initialData, closeModal }: RequestFormProps) {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RequestSchema>>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      requestType: initialData?.requestType || "",
      description: initialData?.description || "",
      reason: initialData?.reason || "",
    },
    mode: "onTouched",
  });

  const { isValid } = form.formState;

  async function onSubmitForm(values: z.infer<typeof RequestSchema>) {
    try {
      if (!initialData) {
        createRequestFunction(values);
      } else {
        updateRequestFunction(initialData.id, values);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Algo salió mal en el proceso.",
      });
    }
  }

  const createRequestFunction = (values: z.infer<typeof RequestSchema>) => {
    startTransition(async () => {
      try {
        const { error, success } = await createRequest(values);

        if (error) {
          toast.error("Algo salió mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          form.reset();
          closeModal();
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal en el proceso",
        });
      }
    });
  };

  const updateRequestFunction = (
    requestId: string,
    values: z.infer<typeof RequestSchema>
  ) => {
    startTransition(async () => {
      try {
        const { error, success } = await updateRequest(requestId, values);

        if (error) {
          toast.error("Algo salió mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          closeModal();
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal en el proceso",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="space-y-4 p-6"
      >
        <FormField
          control={form.control}
          name="requestType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Solicitud</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de solicitud" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {requestTypes.map((req) => (
                    <SelectItem key={req} value={req}>
                      {req}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción de la Solicitud</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe detalladamente tu solicitud"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón de la Solicitud</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explica por qué necesitas este cambio o solicitud"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="primary"
          type="submit"
          disabled={isLoading || !isValid}
          className="w-full"
        >
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          {!initialData ? "Enviar Solicitud" : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
}
