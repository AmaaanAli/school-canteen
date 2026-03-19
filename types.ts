export interface Snack {
  id: string;
  name: string;
  price: number;
  ordersCount: number;
}

export interface Student {
  id: string;
  name: string;
  referralCode: string;
  totalSpent: number;
}

export interface Order {
  id: string;
  studentId: string;
  snackId: string;
  quantity: number;
  amount: number;
  createdAt: string;
}

export interface ProcessedStudentData {
  id: string;
  name: string;
  referralCode: string;
  totalSpent: number;
}

export interface OrderInput {
  id: string;
  studentId: string;
  snackId: string;
  quantity: number;
  amount: number;
  createdAt: string;
}
