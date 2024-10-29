"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminRequestColum } from "./admin-columns";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { approveRequest, markAsPending, rejectRequest } from "@/actions/requests";
import { Loader2 } from "lucide-react";

interface AdminActionsProps {
  requestData: AdminRequestColum;
}

export default function AdminActions({ requestData }: AdminActionsProps) {
  const [isApproveLoading, startApproveTransition] = useTransition();
  const [isRejectLoading, startRejectTransition] = useTransition();
  const [isPendingLoading, startPendingTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleApproveRequest = () => {
    startApproveTransition(async () => {
      try {
        const { error, success } = await approveRequest(requestData.id);

        if (error) {
          toast.error("Algo salio mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          setOpen(false);
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salio mal en el proceso.",
        });
      }
    });
  };

  const handleRejectRequest = () => {
    startRejectTransition(async () => {
      try {
        const { error, success } = await rejectRequest(requestData.id);

        if (error) {
          toast.error("Algo salio mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          setOpen(false);
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salio mal en el proceso.",
        });
      }
    });
  };

  const handleMarkAsPending = () => {
    startPendingTransition(async () => {
      try {
        const { error, success } = await markAsPending(requestData.id);

        if (error) {
          toast.error("Algo salio mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          setOpen(false);
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salio mal en el proceso.",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Ver Detalles</Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-h-[500px] max-sm:h-full p-0">
        <ScrollArea>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
          </DialogHeader>

          <Card className="m-6 bg-muted">
            <CardContent className="space-y-2 py-5">
              <p className="text-primary/80">
                <strong className="text-accent-foreground">Empleado:</strong>{" "}
                {requestData.employee}
              </p>
              <p className="text-primary/80">
                <strong className="text-accent-foreground">Tipo:</strong>{" "}
                {requestData.requestType}
              </p>
              <p className="text-primary/80">
                <strong className="text-accent-foreground">Fecha:</strong>{" "}
                {requestData.createdAt}
              </p>
              <p className="text-primary/80">
                <strong className="text-accent-foreground">Estado:</strong>{" "}
                {requestData.status}
              </p>
              <p className="text-primary/80">
                <strong className="text-accent-foreground">Detalles:</strong>{" "}
                {requestData.description}
              </p>
              <p className="text-primary/80">
                <strong className="text-accent-foreground">
                  Razón de la solicitud:
                </strong>{" "}
                {requestData.reason}
              </p>
            </CardContent>
          </Card>

          <DialogFooter className="sm:justify-start px-6 pt-2 pb-6">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button onClick={handleApproveRequest} variant="primary">
                {isApproveLoading && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Aprobar
              </Button>
              <Button onClick={handleRejectRequest} variant="destructive">
                {isRejectLoading && <Loader2 className="size-4 animate-spin" />}
                Rechazar
              </Button>
              <Button onClick={handleMarkAsPending} variant="outline">
                {isPendingLoading && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Marcar como pendiente
              </Button>
            </div>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
