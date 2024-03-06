import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/default/ui/avatar";
import { Button } from "@/components/default/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function UserNav() {
  const t = useTranslations("home-page");
  return (
    <Link href={"/"}>
      <h1 className="font-bold tracking-tight">{t("title")}</h1>
    </Link>
  );
}
