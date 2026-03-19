"use client";

import { useSnacks } from "@/hooks/useApi";
import { SnackCard } from "@/components/shared/SnackCard";
import { OrderFormModal } from "@/components/shared/OrderFormModal";
import { PageHeader, EmptyState, ErrorMessage, LoadingCardSkeleton } from "@/components/shared/utils";
import { useState } from "react";
import { Snack } from "@/types";

export default function SnacksPage() {
  const { data: snacks, isLoading, isError } = useSnacks();
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);

  const handleOrderClick = (snack: Snack) => {
    setSelectedSnack(snack);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Snacks Menu" 
        description="Browse and order from our delicious selection of snacks."
      />

      {isError && (
        <ErrorMessage message="Failed to load snacks. Please ensure the mock API server is running." />
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LoadingCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !isError && snacks?.length === 0 && (
        <EmptyState 
          title="No snacks found" 
          description="It looks like the canteen is currently out of stock."
        />
      )}

      {!isLoading && !isError && snacks && snacks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {snacks.map((snack) => (
            <SnackCard 
              key={snack.id} 
              snack={snack} 
              onOrderClick={handleOrderClick} 
            />
          ))}
        </div>
      )}

      <OrderFormModal
        snack={selectedSnack}
        isOpen={!!selectedSnack}
        onClose={() => setSelectedSnack(null)}
      />
    </div>
  );
}
