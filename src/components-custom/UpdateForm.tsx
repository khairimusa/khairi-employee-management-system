"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useStore from "@/store";

import { Button } from "@/components/new-york/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/new-york/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/new-york/ui/form";
import { Input } from "@/components/new-york/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/new-york/ui/card";

import React, { useEffect, useState } from "react";
import { useEdgeStore } from "@/app/lib/edgestore";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/new-york/ui/use-toast";

const FormSchema = z.object({
  avatar: z.union([z.literal(""), z.string().trim().url()]),
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  salary: z.coerce.number().int().gte(1),
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .nonnegative({
      message: "Age must be a positive value",
    })
    .min(18, { message: "Must be at least 18" })
    .max(65, { message: "Age must be between 18 and 60" }),
});

export function UpdateForm() {
  const store = useStore((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const { toast } = useToast();

  const { edgestore } = useEdgeStore();

  useEffect(() => {
    fetch(form.getValues("avatar"))
      .then((res) => res.blob())
      .then((blob) => {
        setFile(new File([blob], "image", { type: blob.type }));
      });
  }, []);

  const employeeId = 0;
  const selectedEmployee = store.employees[employeeId];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      avatar: selectedEmployee.avatar,
      first_name: selectedEmployee.first_name,
      last_name: selectedEmployee.last_name,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      age: selectedEmployee.age,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setLoading(true);
    if (!file) {
      setOpen(true);
      setLoading(false);
    }
    if (file) {
      const res = await edgestore.myPublicImages.upload({
        file,
        input: { type: "profile" },
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });

      setUrls({
        url: res.url,
        thumbnailUrl: res.thumbnailUrl,
      });

      await store.updateEmployee(employeeId, {
        avatar: res.thumbnailUrl ?? "",
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        salary: data.salary,
        age: data.age,
        full_name: `${data.first_name}  ${data.last_name}`,
        id: employeeId,
      });

      setLoading(false);
      toast({
        title: "Employe updated successfully!",
        description: "Existing employee data saved",
      });
    }
  }

  return (
    <>
      <Card>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <CardHeader>
              <CardTitle>Update Employee Info</CardTitle>
              <CardDescription>
                Please fill in the employee info accordingly
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Form {...form}>
                <div className="grid w-full max-w-xs items-center">
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <div className="flex flex-wrap gap-2">
                            <SingleImageDropzone
                              width={200}
                              height={200}
                              value={file}
                              dropzoneOptions={{
                                maxSize: 1024 * 1024 * 1, // 1MB
                              }}
                              onChange={(file) => {
                                setFile(file);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input placeholder="25" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2"></div>
                </div>
              </Form>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
              {loading && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              )}
              {!loading && (
                <Button type="submit" variant={"secondary"}>
                  Save
                </Button>
              )}
            </CardFooter>
          </form>
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Please upload your employee photo
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </>
  );
}
