import { ModeToggle } from "@/components/default/ui/toggle-mode";
import { UserNav } from "./UserNav";
import { LanguagePicker } from "./LanguagePicker";

export default function Header() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <UserNav />
        <div className="ml-auto flex items-center space-x-4">
          <LanguagePicker />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
