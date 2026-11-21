# IVA Nail Art - Antigravity Agent Rules

## 1. Project Overview & Brand Identity
* **Project:** IVA Nail Art - Luxury Nail Studio (Brooklyn, NY).
* **Brand Aesthetics:** Luxury, high-end, clean glassmorphism, elegant pastel and gold accents.
* **Core Values:**
  - Medical-grade hygiene & hospital-grade sterilization.
  - Exclusivity: intimate appointments (maximum 3 clients per day, 4-hour slots).
  - Pregnancy-safe sanctuary (non-toxic, premium products).
* **Language Support:** Bilingual mandatory (**English** and **Spanish**).

---

## 2. Tech Stack & Conventions
* **Framework:** Next.js 16.1+ (App Router), React 19, TypeScript 5.
* **Styling:** Tailwind CSS 4, Framer Motion for smooth luxury micro-interactions.
* **Icons:** `lucide-react`.
* **State & Data Architecture:**
  - Services, pricing, and salon configuration live in `app/constants/data.ts`.
  - Bilingual copy and translations live in `app/constants/translations.ts`.
  - Do NOT hardcode customer-facing text or prices directly inside UI components.
* **Payments & Bookings:**
  - Stripe SDK for booking deposits and payments.
  - WhatsApp booking generator with structured pre-filled messages.

---

## 3. Development & Execution Rules
* **Dev Server:** Always use port **3003** with Turbo (`npm run dev:fast` -> `next dev -p 3003 --turbo`).
* **Client vs. Server Components:**
  - Keep components server-rendered by default.
  - Use `'use client'` only when React hooks (`useState`, `useEffect`), browser APIs, or Framer Motion are strictly required.
* **TypeScript Strictness:**
  - Explicit typing for component props, API request/response payloads, and state.
  - Avoid `any`. Use generics or utility types (`Partial`, `Pick`, `Record`) where appropriate.
* **Image & Asset Optimization:**
  - Always use `next/image` with proper `width`, `height`, `alt`, and responsive `sizes`.
  - Prioritize lazy loading for gallery items below the fold.

---

## 4. Neuromarketing & UX Guidelines
* Every major section must maintain high perceived value:
  - Trust indicators visible above the fold (Google Reviews, 500+ clients, 10+ years experience).
  - Clear, high-contrast Call to Action (CTA) buttons ("Reserve Your Experience" / "Reserva Tu Cita").
  - Mobile-first responsiveness: test seamless experience on iPhone/Android viewports.

---

## 5. Security & Safety
* Never commit real API keys, Stripe secret keys, or database credentials.
* Use `.env.local` for local secrets and adhere to `.env.example`.
