import { Snack } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


interface SnackCardProps {
  snack: Snack;
  onOrderClick: (snack: Snack) => void;
}

export function SnackCard({ snack, onOrderClick }: SnackCardProps) {
  return (
    <Card className="flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-lg">
          <span>{snack.name}</span>
          <span className="text-primary font-bold">₹{snack.price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          Popularity: {snack.ordersCount} orders
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onOrderClick(snack)}>
          Order
        </Button>
      </CardFooter>
    </Card>
  );
}
