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
import { AssignmentColum } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUsers } from "@/actions/user";
import { AssignmentForm } from "./assignment-form";
import { AlertModal } from "@/components/common/alert-modal";
import { toast } from "sonner";
import { deleteAssignment } from "@/actions/assignment";

interface CellActionProps {
  assignmentData: AssignmentColum;
}

export function CellAction({ assignmentData }: CellActionProps) {
  const loggedUser = useCurrentUser();

  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openAlertConfirmation, setOpenAlertConfirmation] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const { error, success } = await deleteAssignment(assignmentData.id);

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
          description: "Algo salió mal al eliminar el cartel publicitario.",
        });
      } finally {
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    getUsers(loggedUser?.id!).then((result) => setUsers(result));
  }, []);

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
              <DialogTitle>Editar Asignación</DialogTitle>
              <DialogDescription>
                Edita los campos que necesites.
              </DialogDescription>
            </DialogHeader>
            <AssignmentForm
              initialData={assignmentData}
              users={users}
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
