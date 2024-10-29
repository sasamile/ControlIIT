"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RequestForm } from "./request-form";

export function RequestDialog() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary" className="max-md:w-full">
          Nueva solicitud de cambio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-xl:max-h-[500px] xl:max-h-[560px] h-full p-0">
        <ScrollArea>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Nueva Solicitud de Cambio</DialogTitle>
            <DialogDescription>
              Completa el formulario para solicitar un cambio en tu equipo o
              realizar otras peticiones.
            </DialogDescription>
          </DialogHeader>
          <RequestForm closeModal={closeDialog} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
