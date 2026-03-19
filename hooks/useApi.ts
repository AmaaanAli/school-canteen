import { useState, useEffect } from "react";
import { useCanteen } from "@/components/providers/canteen-provider";
import { getStudentById, createStudent as apiCreateStudent, createOrder as apiCreateOrder } from "@/lib/api";
import { ProcessedStudentData, OrderInput, Order } from "@/types";

export function useSnacks() {
  const { snacks, isLoadingSnacks, isSnacksError } = useCanteen();
  return { data: snacks, isLoading: isLoadingSnacks, isError: isSnacksError };
}

export function useStudents() {
  const { students, isLoadingStudents, isStudentsError } = useCanteen();
  return { data: students, isLoading: isLoadingStudents, isError: isStudentsError };
}

export function useStudent(id: string) {
  const [student, setStudent] = useState<ProcessedStudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    setIsLoading(true);
    setIsError(false);
    getStudentById(id).then(data => {
      if (isMounted) setStudent(data);
    }).catch(e => {
      if (isMounted) setIsError(true);
    }).finally(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => { isMounted = false; };
  }, [id]);

  return { data: student, isLoading, isError };
}

export function useCreateStudent() {
  const { refreshStudents } = useCanteen();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: ProcessedStudentData, options: { onSuccess: () => void, onError: () => void }) => {
    setIsPending(true);
    try {
      await apiCreateStudent(data);
      await refreshStudents();
      options.onSuccess();
    } catch (e) {
      options.onError();
    } finally {
      setIsPending(false);
    }
  };
  return { mutate, isPending };
}

export function useCreateOrder() {
  const { refreshStudents, refreshSnacks, addRecentOrder } = useCanteen();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: OrderInput, options?: { onSuccess?: (order: Order) => void, onError?: () => void }) => {
    setIsPending(true);
    try {
      const newOrder = await apiCreateOrder(data);
      addRecentOrder(newOrder);
      await Promise.all([refreshStudents(), refreshSnacks()]);
      if (options?.onSuccess) options.onSuccess(newOrder);
    } catch (e) {
      if (options?.onError) options.onError();
    } finally {
      setIsPending(false);
    }
  };
  return { mutate, isPending };
}
