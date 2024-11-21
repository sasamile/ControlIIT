import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";
import { currentUser } from "@/lib/auth-user";
import LogoTheme from "./logo-theme";

export async function Navbar() {
  const loggedUser = await currentUser();

  return (
    <div className="flex items-center justify-between h-[80px] border-b sm:px-8 px-4">
      <div className="flex items-center gap-6">
        <Link href="/">
          <LogoTheme />
        </Link>
        <NavbarRoutes role={loggedUser?.role!} />
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle className="size-10 border rounded-full" />
        <UserButton className="max-md-plus:hidden" />
        <MobileSidebar />
      </div>
    </div>
  );
}
