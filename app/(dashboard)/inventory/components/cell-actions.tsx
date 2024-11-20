"use client";

import { useEffect, useState, useTransition } from "react";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { User } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InventoryElementColum } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InventoryForm } from "./inventory-form";
import { AlertModal } from "@/components/common/alert-modal";
import { toast } from "sonner";
import { deleteInventoryElement } from "@/actions/inventory";

interface CellActionProps {
  inventoryElementData: InventoryElementColum;
}

export function CellAction({ inventoryElementData }: CellActionProps) {
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openAlertConfirmation, setOpenAlertConfirmation] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const { error, success } = await deleteInventoryElement(
          inventoryElementData.id
        );

        if (error) {
          toast.error("Algo salió mal.", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado.", {
            description: success,
          });
          setOpenAlertConfirmation(false);
        }
      } catch {
        toast.error("Error", {
          description: "Algo salió mal en el proceso.",
        });
      } finally {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={openAlertConfirmation}
        onClose={() => setOpenAlertConfirmation(false)}
        onConfirm={handleConfirm}
      />

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[480px] h-[80%] p-0">
          <ScrollArea>
            <DialogHeader className="p-6">
              <DialogTitle>Editar Elemento</DialogTitle>
              <DialogDescription>
                Edita los campos que necesites.
              </DialogDescription>
            </DialogHeader>
            <InventoryForm
              initialData={inventoryElementData}
              closeDialog={closeDialog}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenAlertConfirmation(true)}
            className=" dark:hover:focus:bg-rose-400/20 hover:focus:bg-rose-400/20 text-rose-400 hover:focus:text-rose-400 dark:hover:focus:text-rose-400"
          >
            <Trash2 className="size-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
