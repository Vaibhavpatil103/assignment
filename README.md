# Learniee Parent Dashboard

A comprehensive, production-ready frontend interface for the Learniee Parent platform, allowing parents to track their child's educational progress, securely manage their account, and explore expert-led courses.

## 🚀 Features Built

1. **Complete Authentication Flow**
   - **Signup/Login**: Fully functional, secure authentication with email/password.
   - **Session Management**: Uses `httpOnly` cookies and signed JWTs (via the `jose` library) for secure, stateless session tracking.
   - **Route Protection**: Next.js Middleware automatically blocks unauthenticated users from the `/dashboard` and redirects logged-in users away from the auth pages.
   - **Validation**: Strict client-side and server-side validation with clear, inline error messaging.

2. **Polished Dashboard Interface**
   - **Responsive Layout**: A modern layout featuring a sticky top navigation bar with a user dropdown, a personalized welcome section, and a responsive grid system.
   - **Interactive Elements**: Standardized interactive states with smooth hover transitions (`transition-all duration-200`) and fully accessible keyboard focus rings (`focus-visible:ring-2`) across all UI elements.
   - **Loading & Empty States**: Integrated a global route loading spinner (`loading.tsx`), a custom 404 page (`not-found.tsx`), and highly accurate Skeleton loaders for the course cards to prevent layout shift.

3. **Advanced Course Search & Filtering**
   - **URL-Driven State**: All filters, search queries, and pagination states are tied to the URL (`?q=math&subjects=Coding&minPrice=1000`). This ensures the exact view is bookmarkable and shareable.
   - **Debounced Search**: A 400ms debounce prevents UI freezing when rapidly typing in the search bar.
   - **Multi-layered Filters**: Combinable filters for Subjects (checkboxes), Grade range (chip toggles), Price range (dual-thumb slider), and Minimum Teacher Rating.
   - **Dynamic Mobile Drawer**: On smaller screens, the complex sidebar filter menu gracefully condenses into a native-feeling slide-up bottom sheet (using the shadcn `Sheet` component).
   - **Pagination**: "Load More" functionality seamlessly appends courses to the view.

---

## 💾 Data Storage & Architecture

This application operates without an external database connection to ensure ease of setup for reviewing. Data is persistently stored in local JSON files acting as a mock database.

### 1. Users Store (`/data/users.json`)
Stores registered parent accounts. Passwords are securely hashed using `bcryptjs` before storage.

**Example Row:**
```json
{
  "id": "cd351b19-3248-4f48-b501-f911d62b7721",
  "name": "Jane Doe",
  "email": "parent@example.com",
  "passwordHash": "$2b$10$FUraYL24DPfymUdKp3zYpea9VygTg2JRcf9AwjRkO93nm1A3El/Ee",
  "createdAt": "2026-08-17T14:50:29.264Z"
}
```

### 2. Courses Store (`/data/courses.json`)
A robust 40-item mock dataset representing the platform's educational offerings.

**Example Row:**
```json
{
  "id": "course_1",
  "name": "Life Skills Masterclass 1: Fundamentals to Advanced",
  "subject": "Life Skills",
  "grade": [6, 7],
  "price": 3585,
  "teacherName": "Teacher B.",
  "teacherRating": 4.1,
  "description": "An engaging and comprehensive course on Life Skills tailored for grades 6-7.",
  "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
}
```

---

## 🤔 Assumptions Made

- **Auth Database**: Since setting up a SQLite or PostgreSQL instance requires extra configuration for reviewers, I assumed a local JSON flat-file (`users.json`) would be the most frictionless way to demonstrate a complete, functional backend authentication flow.
- **URL State Management**: I assumed that standardizing the dashboard filters around URL Query Parameters (via standard `useSearchParams`) was preferable to React local state. Though slightly more complex to build, URL state is an industry-standard best practice for dashboards, allowing users to share specific search results with a simple link.
- **Design System & Theme**: The brief asked for a "trustworthy edtech blue/indigo". I assumed a modern, slightly playful but highly professional aesthetic (rounded corners, subtle blurs, soft shadows, WCAG-compliant colors) based heavily on the shadcn/ui ecosystem.

---

## 🛠️ Future Improvements

If granted more time, I would elevate the project by implementing the following:

1. **Real Database Integration**: Migrate the JSON data stores to a robust PostgreSQL database (e.g., using Prisma ORM on Vercel Postgres or Supabase).
2. **Third-Party Authentication**: Integrate NextAuth.js (Auth.js) to support seamless OAuth login flows like "Continue with Google" or "Continue with Apple".
3. **Automated Testing**: Implement end-to-end (E2E) testing utilizing Playwright or Cypress to automate the validation of the authentication flows and complex filter combinations.
4. **Checkout/Booking Flow**: Build out the actual enrollment flow, incorporating a mock payment gateway (like Stripe Elements) when clicking the "View / Book" button on a course card.
5. **Image Optimization**: Host the course thumbnails on a dedicated CDN and utilize Next.js Image component optimization fully with remote pattern configurations.
