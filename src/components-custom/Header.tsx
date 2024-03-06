import { ModeToggle } from "@/components/default/ui/toggle-mode";
import { UserNav } from "./UserNav";
import LocaleSelector from "./LocaleSelector";

export default function Header() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <UserNav />
        <div className="ml-auto flex items-center space-x-4">
          <LocaleSelector />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
