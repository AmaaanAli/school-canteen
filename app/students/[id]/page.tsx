"use client";

import { useStudent, useSnacks } from "@/hooks/useApi";
import { PageHeader, EmptyState, ErrorMessage, LoadingListSkeleton } from "@/components/shared/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderFormModal } from "@/components/shared/OrderFormModal";
import { useCanteen } from "@/components/providers/canteen-provider";
import { useState, use } from "react";
import { format } from "date-fns";
import { Snack } from "@/types";

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const studentId = unwrappedParams.id;
  const { data: student, isLoading, isError } = useStudent(studentId);
  const { data: snacks } = useSnacks();
  const { recentOrders } = useCanteen();
  
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);

  // Filter recent orders for this specific student
  const studentOrders = recentOrders.filter(o => o.studentId === studentId);

  // In a real app we'd fetch all actual past orders from the API
  // but for requirements we're using recentOrders from Zustand

  if (isLoading) return <LoadingListSkeleton />;
  if (isError || !student) return <ErrorMessage message="Failed to load student details." />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader 
        title="Student Profile" 
      />

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-primary/20 bg-primary/5 h-64">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold text-lg">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Referral Code</p>
              <p className="font-mono bg-white inline-block px-2 py-1 rounded border text-sm mt-1">{student.referralCode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="font-bold text-2xl text-primary">₹{student.totalSpent}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            {snacks && snacks.length > 0 && (
              <Button onClick={() => setSelectedSnack(snacks[0])}>Place Order</Button>
            )}
          </CardHeader>
          <CardContent>
            {studentOrders.length === 0 ? (
              <EmptyState 
                title="No orders yet" 
                description="This student hasn't placed any orders recently."
              />
            ) : (
              <div className="space-y-4">
                {studentOrders.map(order => {
                  const snackName = snacks?.find(s => s.id === order.snackId)?.name || "Unknown Snack";
                  return (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{snackName} x{order.quantity}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.createdAt), "PPp")}
                        </p>
                      </div>
                      <p className="font-bold">₹{order.amount}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <OrderFormModal
        snack={selectedSnack}
        isOpen={!!selectedSnack}
        onClose={() => setSelectedSnack(null)}
        preSelectedStudentId={studentId}
      />
    </div>
  );
}
