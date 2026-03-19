import { Snack, Student, Order, ProcessedStudentData, OrderInput } from "@/types";

const API_URL = "http://localhost:3001";

export async function getSnacks(): Promise<Snack[]> {
  const res = await fetch(`${API_URL}/snacks`);
  if (!res.ok) throw new Error("Failed to fetch snacks");
  return res.json();
}

export async function getStudents(): Promise<Student[]> {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

export async function getStudentById(id: string): Promise<Student> {
  const res = await fetch(`${API_URL}/students/${id}`);
  if (!res.ok) throw new Error("Failed to fetch student");
  return res.json();
}

export async function createStudent(data: ProcessedStudentData): Promise<Student> {
  const res = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create student");
  return res.json();
}

export async function updateStudentTotalSpent(studentId: string, additionalAmount: number): Promise<Student> {
  const student = await getStudentById(studentId);
  const updatedStudent = { ...student, totalSpent: student.totalSpent + additionalAmount };
  
  const res = await fetch(`${API_URL}/students/${studentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent),
  });
  if (!res.ok) throw new Error("Failed to update student totalSpent");
  return res.json();
}

export async function createOrder(data: OrderInput): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create order");
  
  const createdOrder = await res.json();
  
  await updateStudentTotalSpent(data.studentId, data.amount);
  
  return createdOrder;
}

