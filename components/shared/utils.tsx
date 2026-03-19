import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export function PageHeader({ title, description, action }: { title: string, description?: string, action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-dashed">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm">{description}</p>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-800 rounded-lg">
      <AlertCircle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
}

export function LoadingCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow space-y-4 p-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
}

export function LoadingListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex p-4 border rounded-lg justify-between items-center">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      ))}
    </div>
  );
}
