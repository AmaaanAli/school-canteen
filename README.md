# School Canteen Digital Ordering System

A fast and simple prototype web application for a school canteen digital ordering system. It allows students to order snacks, manage their accounts, and review their previous transactions smoothly.

## Libraries and Tech Stack Used

This application scales modern tooling for maximum reliability and developer experience:
- **Framework:** [Next.js (App Router)]
- **Language:** [TypeScript]
- **Styling:** [Tailwind CSS v4] + [shadcn/ui]
- **State Management:** [Context Api]
- **Forms & Validation:** [React Hook Form] + [Zod]
- **Backend Mocking:** [JSON Server] for building full REST API capabilities locally.
- **Icons & Components:** `lucide-react`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `sonner`

## Setup Instructions

Follow these steps to get the environment up and running locally.

### 1. Installation
Clone the project, then install the dependencies via your preferred package manager:
```bash
npm install
```

### 2. Start the Mock Backend API
The mock datastore operates using `json-server` on port 3001. In a new terminal, run:
```bash
npm run server
```
This handles `GET`/`POST`/`PUT` commands for the RESTful endpoints (`/snacks`, `/students`, `/orders`).

### 3. Start the Next.js Frontend Development Server
In another dedicated terminal context, execute the web application locally:
```bash
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:3000](http://localhost:3000) to inspect the prototype and begin using the ordering system!
