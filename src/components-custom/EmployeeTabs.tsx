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

export default function EmployeeTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
              Employee List
            </TabsTrigger>
          </Link>
          <Link className="w-full" href={`/?tab=edit`}>
            <TabsTrigger className="w-full" value="edit">
              Edit
            </TabsTrigger>
          </Link>
          <Link className="w-full" href={`/?tab=add`}>
            <TabsTrigger className="w-full" value="add">
              Add New
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <EmployeeListTable />
        </TabsContent>
        <TabsContent value="edit" className="space-y-4">
          Edit
        </TabsContent>
        <TabsContent value="add" className="space-y-4">
          Add New
        </TabsContent>
      </Tabs>
    </>
  );
}
