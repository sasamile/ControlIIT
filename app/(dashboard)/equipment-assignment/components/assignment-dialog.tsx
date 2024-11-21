"use client";

import { Inventory, User } from "@prisma/client";
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
import { getUsers } from "@/actions/user";
import { getInventoryElements } from "@/actions/inventory";

export function AssignmentDialog() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [elements, setElements] = useState<Inventory[]>([]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers().then((result) => setUsers(result));
    getInventoryElements().then((result) => setElements(result));
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary">Nueva asignación</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] h-[80%] p-0">
        <ScrollArea>
          <DialogHeader className="p-6">
            <DialogTitle>Crear nueva asignación</DialogTitle>
            <DialogDescription>
              Ingresa los detalles de la nueva asignación de equipo aquí.
            </DialogDescription>
          </DialogHeader>
          <AssignmentForm
            users={users}
            elements={elements}
            closeDialog={closeDialog}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
