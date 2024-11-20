"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { InventoryElementSchema } from "@/schemas/assignment";
import { classes, locations, statuses, subclasses } from "@/constants";
import { User } from "@prisma/client";
import { UserAvatar } from "@/components/common/user-avatar";
// import { createAssignment, updateAssignment } from "@/actions/assignment";
import { InventoryElementColum } from "./columns";
import {
  createInventoryElement,
  updateInventoryElement,
} from "@/actions/inventory";

type FormValues = z.infer<typeof InventoryElementSchema>;

interface AssignmentFormProps {
  initialData?: InventoryElementColum;
  closeDialog: () => void;
}

export function InventoryForm({
  initialData,
  closeDialog,
}: AssignmentFormProps) {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(InventoryElementSchema),
    defaultValues: {
      class: initialData?.clase || "",
      subclass: initialData?.subclase || "",
      element: initialData?.elemento || "",
      brand: initialData?.marca || "",
      totalQuantity: initialData?.cantidad || 0,
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!initialData) {
        createInventoryElementFunction(values);
      } else {
        updateInventoryElementFunction(initialData.id, values);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Algo salió mal en el proceso",
      });
    }
  };

  const createInventoryElementFunction = (values: FormValues) => {
    startTransition(async () => {
      try {
        const { error, success } = await createInventoryElement(values);

        if (error) {
          toast.error("Algo salió mal", {
            description: error,
          });
        }

        if (success) {
          closeDialog();
          toast.success("Proceso completado", {
            description: success,
          });
          form.reset();
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal en el proceso",
        });
      }
    });
  };

  const updateInventoryElementFunction = (
    elementId: string,
    values: FormValues
  ) => {
    startTransition(async () => {
      try {
        const { error, success } = await updateInventoryElement(
          elementId,
          values
        );

        if (error) {
          toast.error("Algo salió mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          closeDialog();
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
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-6 pb-6"
      >
        <FormField
          control={form.control}
          name="element"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clase *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar clase" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
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
          name="subclass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subclase</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar subclase" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-[250px]">
                  {subclasses.map((sc) => (
                    <SelectItem key={sc} value={sc}>
                      {sc}
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
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad Total</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value === 0 ? "" : field.value} // Mostrar vacío si es 0
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : Number(value)); // Manejar vacío
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading || !isValid}
          variant="primary"
          type="submit"
        >
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          {!initialData ? "Guardar Asignación" : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
}
