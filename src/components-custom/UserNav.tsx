import Link from "next/link";
import { useTranslations } from "next-intl";

export function UserNav() {
  const t = useTranslations("homePage");
  return (
    <Link href={"/"}>
      <h1 className="font-bold tracking-tight">{t("title")}</h1>
    </Link>
  );
}
