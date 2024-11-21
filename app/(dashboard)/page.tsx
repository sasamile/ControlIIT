"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AssignmentList } from "./equipment-assignment/components/assignment-list";


export default function Home() {
  const router = useRouter();
  const role = useCurrentRole();

  useEffect(() => {
    if (role === "ADMIN") {
      router.push("/inventory");
    }
  }, [role]);

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-6">Mis Asignaciones</h1>
      <AssignmentList />
    </div>
  );
}