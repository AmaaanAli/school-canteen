"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageHeader } from "@/components/shared/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateStudent } from "@/hooks/useApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export default function CreateStudentPage() {
  const createStudent = useCreateStudent();
  const router = useRouter();

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof studentSchema>) => {
    // Generate mock referral code
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referralCode = `REF${randomStr}`;

    createStudent.mutate(
      {
        id: crypto.randomUUID(),
        name: values.name,
        referralCode,
        totalSpent: 0,
      },
      {
        onSuccess: () => {
          toast.success("Student created successfully!");
          router.push("/students");
        },
        onError: () => {
          toast.error("Failed to create student.");
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader 
        title="Register Student" 
        description="Add a new student to the canteen system."
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rahul Sharma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={createStudent.isPending}>
                {createStudent.isPending ? "Registering..." : "Register Student"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
