import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface AssignmentCardProps {
  assignment: {
    id: string;
    image?: string | null;
    quantity: number;
    reference?: string | null;
    serial?: string | null;
    location: string;
    owner: string;
    status: string;
    availability?: string | null;
    details?: string | null;
    inventory: {
      element: string;
      brand?: string | null;
    };
    user: {
      name?: string | null;
    };
  };
}

export const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
    return (
      <Card className="w-full max-w-sm hover:shadow-lg transition-all duration-300 shadow-2xl">
        <CardHeader className="relative h-56">
          {assignment.image ? (
            <Image
              src={assignment.image}
              alt={assignment.inventory?.element || 'Equipment image'}
              fill
              className="object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-t-lg">
              <span className=" font-medium">Sin imagen</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-bold text-lg ">
                {assignment.inventory?.element}
                {assignment.inventory?.brand && (
                  <span className=""> - {assignment.inventory.brand}</span>
                )}
              </h3>
              <Badge 
                variant={assignment.status === "Activo" ? "success" : "destructive"}
                className="px-3 py-1 text-xs font-medium rounded-full"
              >
                {assignment.status}
              </Badge>
            </div>
            
            <div className="text-sm space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span className="font-semibold">Responsable:</span> 
                <span>{assignment.user.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Ubicación:</span> 
                <span>{assignment.location}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Propietario:</span> 
                <span>{assignment.owner}</span>
              </p>
              {assignment.serial && (
                <p className="flex justify-between">
                  <span className="font-semibold">Serial:</span> 
                  <span>{assignment.serial}</span>
                </p>
              )}
              <p className="flex justify-between">
                <span className="font-semibold">Cantidad:</span> 
                <span>{assignment.quantity}</span>
              </p>
            </div>
            
            {assignment.details && (
              <div className="text-sm  pt-2 border-t border-gray-100">
                <p className="font-semibold mb-1">Observaciones:</p>
                <p className="">{assignment.details}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };