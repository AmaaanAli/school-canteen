import { Student } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { User } from "lucide-react";

interface StudentListItemProps {
  student: Student;
}

export function StudentListItem({ student }: StudentListItemProps) {
  return (
    <Card className="hover:bg-slate-50 transition-colors">
      <CardContent className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">Ref: {student.referralCode}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="font-semibold text-primary">₹{student.totalSpent}</p>
          </div>
          <Link href={`/students/${student.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
