"use client";

import { useEffect, useState } from "react";

import { getAssignment } from "@/actions/assignment";
import { AssignmentCard } from "./assignment-card";
import Image from "next/image";
import { useTheme } from "next-themes";

type Assignment = {
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

export const AssignmentList = () => {
  const { theme, systemTheme } = useTheme();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const result = await getAssignment();
        if ("error" in result) {
          setError(result.error);
        } else {
          setAssignments(result);
        }
      } catch (err) {
        setError("Error al cargar las asignaciones");
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  const getImageSource = () => {
    // Si el tema es system, usamos systemTheme para determinar la imagen
    if (theme === "system") {
      return systemTheme === "dark"
        ? "/ampty-alerts-white.svg"
        : "/ampty-alerts-black.svg";
    }
    // Si no es system, usamos la lógica original
    return theme === "dark"
      ? "/ampty-alerts-white.svg"
      : "/ampty-alerts-black.svg";
  };


  if (loading) {
    return <div>Cargando asignaciones...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (assignments.length === 0) {
    return (
        <div className="text-center">
        <div className="flex justify-center items-center flex-col">
          <div>
            <Image
              src={getImageSource()}
              alt="Iconsvg"
              width={500}
              height={500}
            />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No se encontraron Asignaciones.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};
