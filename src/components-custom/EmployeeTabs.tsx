"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/default/ui/tabs";
import EmployeeListTable from "./EmployeeListTable";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function EmployeeTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("homePage");

  const selectedTab = searchParams.get("tab") ?? "list";

  useEffect(() => {
    router.replace(`?tab=${selectedTab}`);
  }, [selectedTab, router]);

  return (
    <>
      <Tabs value={selectedTab} className="space-y-4">
        <TabsList className="w-full">
          <Link className="w-full" href={`/?tab=list`}>
            <TabsTrigger className="w-full" value="list">
              {t("employeeList")}
            </TabsTrigger>
          </Link>
          <Link className="w-full" href={`/?tab=edit`}>
            <TabsTrigger className="w-full" value="edit">
              {t("edit")}
            </TabsTrigger>
          </Link>
          <Link className="w-full" href={`/?tab=add`}>
            <TabsTrigger className="w-full" value="add">
              {t("add")}
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <EmployeeListTable />
        </TabsContent>
        <TabsContent value="edit" className="space-y-4">
          {t("edit")}
        </TabsContent>
        <TabsContent value="add" className="space-y-4">
          {t("add")}
        </TabsContent>
      </Tabs>
    </>
  );
}
