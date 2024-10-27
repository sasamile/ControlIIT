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
import { AssignmentSchema } from "@/schemas/assignment";
import { classes, locations, statuses, subclasses } from "@/constants";
import { User } from "@prisma/client";
import { UserAvatar } from "@/components/common/user-avatar";
import { createAssignment, updateAssignment } from "@/actions/assignment";
import { AssignmentColum } from "./columns";

type FormValues = z.infer<typeof AssignmentSchema>;

interface AssignmentFormProps {
  initialData?: AssignmentColum;
  closeDialog: () => void;
  users: User[];
}

export function AssignmentForm({
  initialData,
  users,
  closeDialog,
}: AssignmentFormProps) {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(AssignmentSchema),
    defaultValues: {
      responsibleId: initialData?.responsable.id || "",
      class: initialData?.clase || "",
      subclass: initialData?.subclase || "",
      element: initialData?.elemento || "",
      reference: initialData?.referencia || "",
      serial: initialData?.serial || "",
      brand: initialData?.marca || "",
      owner: initialData?.propietario || "",
      location: initialData?.ubicación || "",
      status: initialData?.estado || "",
      observations: initialData?.observaciones || "",
      availability: initialData?.disponibilidad || "",
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!initialData) {
        createAssignmentFunction(values);
      } else {
        updateAssignmentFunction(initialData.id, values);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Algo salió mal en el proceso",
      });
    }
  };

  const createAssignmentFunction = (values: FormValues) => {
    startTransition(async () => {
      try {
        const { error, success } = await createAssignment(values);

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

  const updateAssignmentFunction = (
    assignmentId: string,
    values: FormValues
  ) => {
    startTransition(async () => {
      try {
        const { error, success } = await updateAssignment(assignmentId, values);

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
          name="responsibleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsable *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar responsable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[250px]">
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-3">
                        <UserAvatar src={user.image!} />
                        <p>{user.name}</p>
                      </div>
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
          name="element"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elemento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propietario *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ubicación" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((lc) => (
                    <SelectItem key={lc} value={lc}>
                      {lc}
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
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
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
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponibilidad</FormLabel>
              <FormControl>
                <Input {...field} />
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
