"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudents, useCreateOrder } from "@/hooks/useApi";
import { Snack } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCanteen } from "@/components/providers/canteen-provider";

const orderSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  quantity: z.number().min(1, "Quantity must be at least 1").max(5, "Maximum 5 items allowed"), 
});

export function OrderFormModal({ 
  snack, 
  isOpen, 
  onClose,
  preSelectedStudentId 
}: { 
  snack: Snack | null; 
  isOpen: boolean; 
  onClose: () => void;
  preSelectedStudentId?: string;
}) {
  const { data: students, isLoading: isLoadingStudents } = useStudents();
  const createOrder = useCreateOrder();
  const { selectedStudentId, setSelectedStudentId } = useCanteen();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      studentId: preSelectedStudentId || selectedStudentId || "",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (preSelectedStudentId) {
        form.setValue("studentId", preSelectedStudentId);
      } else if (selectedStudentId) {
        form.setValue("studentId", selectedStudentId);
      }
      form.setValue("quantity", 1);
    }
  }, [isOpen, preSelectedStudentId, selectedStudentId, form]);

  const onSubmit = (values: z.infer<typeof orderSchema>) => {
    if (!snack) return;

    if (!preSelectedStudentId) {
      setSelectedStudentId(values.studentId);
    }

    createOrder.mutate(
      {
        id: crypto.randomUUID(),
        studentId: values.studentId,
        snackId: snack.id,
        quantity: values.quantity,
        amount: snack.price * values.quantity,
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Order placed successfully!");
          onClose();
        },
        onError: () => {
          toast.error("Failed to place order.");
        },
      }
    );
  };

  if (!snack) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order {snack.name}</DialogTitle>
          <DialogDescription>
            Price: ₹{snack.price} per item
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!!preSelectedStudentId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingStudents ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : (
                        students?.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name} ({s.referralCode})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (1-5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      max={5} 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4 flex justify-between items-center bg-slate-50 p-3 rounded-md">
              <span className="text-sm font-medium">Total Amount:</span>
              <span className="font-bold text-lg text-primary">
                ₹{snack.price * (form.watch("quantity") || 1)}
              </span>
            </div>

            <Button type="submit" className="w-full" disabled={createOrder.isPending}>
              {createOrder.isPending ? "Placing Order..." : "Confirm Order"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
