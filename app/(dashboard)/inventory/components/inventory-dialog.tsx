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
import { InventoryForm } from "./inventory-form";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { getUsers } from "@/actions/user";

export function InventoryDialog() {
  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState<User[]>([]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   getUsers().then((result) => setUsers(result));
  // }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary">Nuevo equipo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] h-[80%] p-0">
        <ScrollArea>
          <DialogHeader className="p-6">
            <DialogTitle>Crear Nuevo Equipo</DialogTitle>
            <DialogDescription>
              Ingresa los detalles del nuevo elemento.
            </DialogDescription>
          </DialogHeader>
          <InventoryForm closeDialog={closeDialog} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
