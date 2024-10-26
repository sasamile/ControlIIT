"use client";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { UserRole } from "@prisma/client";
import { MouseEvent, useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserColum } from "./columns";
import { Button } from "@/components/ui/button";
import { changeRole } from "@/actions/user";

interface ChangeRoleFormProps {
  user: UserColum;
  onClose: () => void;
}

export default function ChangeRoleForm({ user, onClose }: ChangeRoleFormProps) {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedRole === user.role) {
      toast.error("No se realizaron cambios", {
        description: "El rol seleccionado es el mismo que el actual.",
      });
      return;
    }

    startTransition(async () => {
      console.log(selectedRole);
      try {
        const { error, success } = await changeRole(
          user.id,
          selectedRole as UserRole
        );

        if (error) {
          toast.error("Error", {
            description: error,
          });
        }

        if (success) {
          toast.success("Rol actualizado", {
            description: `El rol de ${user.name} ha sido actualizado a ${
              selectedRole === "ADMIN" ? "Administrador" : "Usuario"
            }.`,
          });
        }

        onClose();
      } catch {
        toast("Error", {
          description:
            "No se pudo actualizar el rol. Por favor, intenta de nuevo.",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Select defaultValue={user.role} onValueChange={setSelectedRole}>
        <SelectTrigger className="h-14 rounded-xl pl-4">
          <SelectValue placeholder="Selecciona el tipo de usuario" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USER">Usuario</SelectItem>
          <SelectItem value="ADMIN">Administrador</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button
          variant="primary"
          onClick={handleSubmit}
          className="w-full rounded-lg"
          disabled={isSubmitting || selectedRole === user.role}
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin mr-2" />}
          Guardar cambios
        </Button>
      </div>
    </div>
  );
}
