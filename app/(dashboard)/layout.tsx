import React from "react";

import { Navbar } from "@/components/common/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="h-full overflow-auto sm:px-8 px-4 py-8">{children}</main>
    </div>
  );
}
