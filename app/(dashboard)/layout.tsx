import React from "react";
import { Navbar } from "@/components/common/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1 sm:px-8 px-4 py-16 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
