# 🛡️ Memory & Lessons Learned — IVA Nail Art NY
**Owner:** Director of Cybersecurity (CISO) & Head of QA  
**Purpose:** Self-healing log and preventative rules to avoid regressions in builds, security, and mobile UX.

---

## 1. Golden Engineering Rules

### Rule 1: Zero Secret Leakage in Client Bundles
* **Incident / Risk:** Accidental inclusion of Stripe Secret Key or internal database service roles in client-rendered components.
* **Resolution / Rule:** All secrets must be prefixed with internal environment names (never `NEXT_PUBLIC_` unless strictly meant for public keys like Stripe Publishable Key). Enforce `.env.example` audit before any build.

### Rule 2: iOS Safari Viewport Auto-Zoom Bug Prevention
* **Incident / Risk:** Inputs with font-size < 16px cause iOS Safari in Instagram's in-app browser to forcefully zoom in and break the fixed layout.
* **Resolution / Rule:** All `<input>`, `<select>`, and `<textarea>` elements MUST declare `text-base` (`font-size >= 16px`) on mobile viewports.

### Rule 3: Safe-Area Insets for Modern iPhone Navigation
* **Incident / Risk:** Fixed bottom action buttons become unclickable or clipped behind the iOS Home indicator bar.
* **Resolution / Rule:** Always include `pb-[max(1rem,env(safe-area-inset-bottom))]` on sticky mobile bars.

### Rule 4: Preserving Image Aspect Ratios & Lazy Loading
* **Incident / Risk:** Gallery layout shifts (CLS) when loading dozens of high-res nail art photos from `/public/gallery/`.
* **Resolution / Rule:** Always use `next/image` with predefined aspect ratios (`aspect-[4/5]` for nail editorial portrait shots) and `sizes="(max-width: 768px) 50vw, 33vw"`.

### Rule 5: Zod Schema Validation Before Database Access
* **Incident / Risk:** Invalid phone formats or malformed booking requests crashing route handlers.
* **Resolution / Rule:** All route handlers accepting POST/PUT must parse through strict `zod` schemas and return clean `{ error: string }` JSON with HTTP 400 status.


### Rule 6: Zod v4 Custom Parameter Overloads
* **Incident / Risk:** Using legacy Zod v3 `{ errorMap: () => ({ message: ... }) }` causes TS2769 error when compiling with Zod v4.
* **Resolution / Rule:** Use `{ message: "..." }` or `{ error: "..." }` directly in `z.enum([...], { message: "..." })`.
