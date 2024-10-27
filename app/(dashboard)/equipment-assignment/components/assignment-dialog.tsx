"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AssignmentForm } from "./assignment-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUsers } from "@/actions/user";

export function AssignmentDialog() {
  const loggedUser = useCurrentUser();

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers(loggedUser?.id!).then((result) => setUsers(result));
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary">Nueva Asignación</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] h-[80%] p-0">
        <ScrollArea>
          <DialogHeader className="p-6">
            <DialogTitle>Crear Nueva Asignación</DialogTitle>
            <DialogDescription>
              Ingresa los detalles de la nueva asignación de equipo aquí.
            </DialogDescription>
          </DialogHeader>
          <AssignmentForm users={users} closeDialog={closeDialog} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
