import { LogoutButton } from "@/components/auth/logout-button";
import { ModeToggle } from "@/components/common/mode-toggle";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <LogoutButton />
    </div>
  );
}
