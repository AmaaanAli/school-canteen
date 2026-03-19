"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Snack, ProcessedStudentData, Order } from "@/types";
import { getSnacks, getStudents } from "@/lib/api";

type CanteenContextType = {
  snacks: Snack[] | undefined;
  isLoadingSnacks: boolean;
  isSnacksError: boolean;
  refreshSnacks: () => Promise<void>;

  students: ProcessedStudentData[] | undefined;
  isLoadingStudents: boolean;
  isStudentsError: boolean;
  refreshStudents: () => Promise<void>;

  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  isOrderModalOpen: boolean;
  setOrderModalOpen: (isOpen: boolean) => void;
  
  recentOrders: Order[];
  addRecentOrder: (order: Order) => void;
};

const CanteenContext = createContext<CanteenContextType | undefined>(undefined);

export function CanteenProvider({ children }: { children: React.ReactNode }) {
  const [snacks, setSnacks] = useState<Snack[] | undefined>();
  const [isLoadingSnacks, setIsLoadingSnacks] = useState(true);
  const [isSnacksError, setIsSnacksError] = useState(false);

  const [students, setStudents] = useState<ProcessedStudentData[] | undefined>();
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [isStudentsError, setIsStudentsError] = useState(false);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Load recent orders from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("canteen-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.state && parsed.state.recentOrders) {
          setRecentOrders(parsed.state.recentOrders);
        } else if (parsed.recentOrders) {
          setRecentOrders(parsed.recentOrders);
        }
      }
    } catch (e) {
      console.error("Failed to parse canteen-storage", e);
    }
  }, []);

  const addRecentOrder = useCallback((order: Order) => {
    setRecentOrders(prev => {
      const updated = [order, ...prev].slice(0, 10);
      try {
        localStorage.setItem("canteen-storage", JSON.stringify({ state: { recentOrders: updated } }));
      } catch (e) {}
      return updated;
    });
  }, []);

  const refreshSnacks = useCallback(async () => {
    setIsLoadingSnacks(true);
    setIsSnacksError(false);
    try {
      const data = await getSnacks();
      setSnacks(data);
    } catch (e) {
      setIsSnacksError(true);
    } finally {
      setIsLoadingSnacks(false);
    }
  }, []);

  const refreshStudents = useCallback(async () => {
    setIsLoadingStudents(true);
    setIsStudentsError(false);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (e) {
      setIsStudentsError(true);
    } finally {
      setIsLoadingStudents(false);
    }
  }, []);

  useEffect(() => {
    refreshSnacks();
    refreshStudents();
  }, [refreshSnacks, refreshStudents]);

  return (
    <CanteenContext.Provider value={{
      snacks, isLoadingSnacks, isSnacksError, refreshSnacks,
      students, isLoadingStudents, isStudentsError, refreshStudents,
      selectedStudentId, setSelectedStudentId,
      isOrderModalOpen, setOrderModalOpen,
      recentOrders, addRecentOrder
    }}>
      {children}
    </CanteenContext.Provider>
  );
}

export function useCanteen() {
  const context = useContext(CanteenContext);
  if (context === undefined) {
    throw new Error("useCanteen must be used within a CanteenProvider");
  }
  return context;
}
