import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarRoutes } from "./sidebar-routes";
import { LogoutButton } from "./logout-button";
import { UserAvatar } from "./user-avatar";
import { currentUser } from "@/lib/auth-user";

export async function MobileSidebar() {
  const loggedUser = await currentUser();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="size-6 shrink-0" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] p-0" side="right">
          <SheetDescription className="hidden" aria-readonly></SheetDescription>
          <SheetTitle className="hidden" aria-readonly></SheetTitle>

          <aside className="flex flex-col w-full max-h-screen h-full shrink-0 border-r bg-zinc-100/40 dark:bg-zinc-900/10 overflow-hidden">
            <div className="flex items-center space-x-4 truncate px-4 py-5 border-b">
              <UserAvatar src={loggedUser?.image!} />
              <div className="overflow-x-hidden">
                <p className="truncate w-full text-[15.5px] font-semibold">
                  {loggedUser?.name}
                </p>
                <p className="truncate w-full text-sm text-gray-500 dark:text-gray-400">
                  {loggedUser?.email}
                </p>
              </div>
            </div>

            <ScrollArea className="h-full pt-3">
              <nav className="flex-1 py-2 overflow-y-auto">
                <SidebarRoutes role={loggedUser?.role!} className="mt-1" />
              </nav>
            </ScrollArea>

            <div className="px-4 border-t">
              <LogoutButton
                variant="ghost"
                className="flex items-center justify-start gap-3 w-full my-2"
              >
                <LogOut className="h-5 w-5 shrink-0" />
              </LogoutButton>
            </div>
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
}
