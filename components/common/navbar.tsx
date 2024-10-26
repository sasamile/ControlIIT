import Link from "next/link";

import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export function Navbar() {
  return (
    <div className="flex items-center justify-between h-[80px] border-b sm:px-8 px-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="">
          <Logo />
        </Link>
        <NavbarRoutes />
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle className="size-10 border rounded-full" />
        <UserButton className="max-md:hidden" />
        <MobileSidebar />
      </div>
    </div>
  );
}
