# School Canteen Digital Ordering System – Prompt

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- State Management: Context Api
- Forms & Validation: React Hook Form + Zod
- Backend: JSON Server (mock API)

---

## Core Features

### 1. Snacks Page (`/snacks`)
- Fetch snacks from: `GET /snacks`
- Display using `SnackCard` component:
  - Name
  - Price
  - ordersCount

- Each snack has an **"Order"** button:
  - Opens modal (`OrderForm`)

#### Order Form
- Fields:
  - Select student (dropdown from `/students`)
  - Quantity (1–5)
- Validation using Zod

#### On Submit
- POST `/orders`
- Show success/error toast
- Optimistic UI update

---

### 2. Students Page (`/students`)
- Fetch from: `GET /students`
- Display using `StudentListItem`:
  - Name
  - Referral Code
  - Total Spent

- Each student has:
  - **"View Details"** → `/students/:id`

---

### 3. Student Detail Page (`/students/[id]`)
- Fetch: `GET /students/:id`

#### Display:
- Name
- Referral Code
- Total Spent

#### Orders List:
- Snack name
- Quantity
- Payable amount

#### Features:
- "Place Order" button (reuse `OrderForm`)
- Store recent orders in `localStorage`

---

### 4. ➕ Create Student Page (`/students/create`)
- Form using React Hook Form + Zod:
  - Name (required)

#### On Submit:
- Generate referral code:
  - Example: `REF + random string`
- POST `/students`
- Show success/error states
- Redirect to `/students`

---

## State Management (Zustand)

Global store should manage:
- Selected student
- Modal open/close state
- Recent orders (sync with `localStorage`)

---

## 🔄 API Layer

### API Functions:
- `getSnacks()`
- `getStudents()`
- `getStudentById(id)`
- `createStudent(data)`
- `createOrder(data)`

### React Query Hooks:
- `useSnacks()`
- `useStudents()`
- `useStudent(id)`
- `useCreateStudent()`
- `useCreateOrder()`

### Handle:
- Loading states (skeletons preferred)
- Error states (alerts/toasts)

---

## Component Architecture

Reusable components:
- `SnackCard`
- `StudentListItem`
- `OrderForm` (modal)
- `PageHeader`
- `EmptyState`
- `LoadingSkeleton`
- `ErrorMessage`

---

## UI/UX Requirements

- Clean UI using shadcn/ui
- Fully responsive (mobile + desktop)
- Accessible forms & buttons
- Toast notifications for feedback
- Proper empty states
- Use skeleton loaders instead of spinners

---

## Notes
- Use modular folder structure
- Keep components reusable and typed
- Follow best practices for state and API separation