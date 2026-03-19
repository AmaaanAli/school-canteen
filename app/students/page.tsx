"use client";

import { useStudents } from "@/hooks/useApi";
import { StudentListItem } from "@/components/shared/StudentListItem";
import { PageHeader, EmptyState, ErrorMessage, LoadingListSkeleton } from "@/components/shared/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function StudentsPage() {
  const { data: students, isLoading, isError } = useStudents();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader 
        title="Students Directory" 
        description="Manage students and their canteen accounts."
        action={
          <Link href="/students/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </Link>
        }
      />

      {isError && (
        <ErrorMessage message="Failed to load students. Please ensure the mock API server is running." />
      )}

      {isLoading && (
        <LoadingListSkeleton />
      )}

      {!isLoading && !isError && students?.length === 0 && (
        <EmptyState 
          title="No students found" 
          description="Register a new student to get started."
        />
      )}

      {!isLoading && !isError && students && students.length > 0 && (
        <div className="space-y-4">
          {students.map((student) => (
            <StudentListItem key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}
