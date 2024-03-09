"use client";

import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/new-york/ui/dropdown-menu";
import { Input } from "@/components/new-york/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/default/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/new-york/ui/avatar";
import useStore, { Employee } from "@/store";
import { useTranslations } from "next-intl";

export default function EmployeeListTable() {
  const t = useTranslations("homePage");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const store = useStore((state) => state);
  const data = store.employees;

  const fetchEmployees = async () => {
    const baseUrl = new URL(`https://reqres.in/api/users`);

    try {
      if (store.employees.length !== 0) return; // need to remove this to use locale storage as store

      const res = await fetch(baseUrl);

      if (!res.ok) {
        throw new Error("Something went wrong", {
          cause: res,
        });
      }

      const { data } = await res.json();

      const formatedData = data.map((item: any) => {
        return {
          id: item.id,
          avatar: item.avatar,
          first_name: item.first_name,
          last_name: item.last_name,
          full_name: `${item.first_name} ${item.last_name}`,
          email: item.email,
          salary: (Math.floor(Math.random() * 10000) + 5000).toLocaleString(),
          age: Math.floor(Math.random() * 60) + 25,
        };
      });

      await store.setEmployees(formatedData);
    } catch (err: any) {
      const httpStatus = err.cause?.res?.status;

      switch (httpStatus) {
        case 400:
          throw new Error("Bad Response");
        case 401:
          throw new Error("Invalid Token");
        case 500:
          throw new Error("Internal Server Error");
      }

      throw err;
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "avatar",
      header: () => <div className="text-left">{t("avatar")}</div>,
      cell: ({ row }) => (
        <div>
          <Avatar>
            <AvatarImage src={row.getValue("avatar")} alt="@shadcn" />
            <AvatarFallback>N/A</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "full_name",
      header: () => <div className="text-left">{t("fullName")}</div>,
      cell: ({ row }) => (
        <div className="truncate max-w-[190px]">
          {row.getValue("full_name")}
        </div>
      ),
    },
    {
      accessorKey: "salary",
      header: () => <div className="text-left">{t("salary")}</div>,
      cell: ({ row }) => <div>RM {row.getValue("salary")}</div>,
    },
    {
      accessorKey: "age",
      header: () => <div className="text-left">{t("age")}</div>,
      cell: ({ row }) => <div>{row.getValue("age")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-right">{t("actions")}</div>,
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => store.removeEmployee(employee.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={t("filterEmployee")}
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
