# 🏛️ System Architecture Document — IVA Nail Art NY
**Owner:** Director of Software Architecture (Chief Architect)  
**Status:** Approved Reference  

---

## 1. System Topology & Core Stack

```
iva-nail-art/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts        # Zod-validated booking creation & payment trigger
│   │   ├── availability/route.ts    # Real-time slot calculation (anti-overlapping)
│   │   ├── ai/concierge/route.ts    # AI Nail Concierge stylist recommendations
│   │   └── webhooks/n8n/route.ts    # Cryptographically verified n8n webhook receiver
│   ├── components/
│   │   ├── LookbookFilterable.tsx   # Curated gallery by nail art tier/style
│   │   ├── ServiceSelectorLuxury.tsx# Service + add-on calculator with live pricing
│   │   ├── MobileBookingBar.tsx     # iPhone-optimized sticky action bar
│   │   └── NailConcierge.tsx        # Client consultation AI interface
│   ├── constants/                   # Centralized prices, services, and translations
│   ├── layout.tsx                   # Editorial typography & SEO JSON-LD schema
│   └── page.tsx                     # Luxury editorial flagship landing page
├── lib/
│   ├── validations/booking.ts       # Zod schemas for booking requests
│   └── utils.ts                     # Time slot math & currency formatting
└── automations/                     # n8n production pipelines
```

* **Frontend:** Next.js 16.1.1 (App Router), React 19, Tailwind CSS 4, Lucide React, Framer Motion.
* **Backend:** Next.js Route Handlers (Edge / Node runtime).
* **Validation:** Zod 3.x schema enforcement on all payloads.
* **Storage / Database Interface:** PostgreSQL / Supabase with Row Level Security (RLS) or Vercel KV for high-speed ephemeral locks.

---

## 2. Database Schema (PostgreSQL / Supabase with RLS)

```sql
-- 1. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    instagram_handle TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- 3. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    service_id TEXT REFERENCES services(id),
    addon_ids TEXT[] DEFAULT '{}',
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 35.00,
    deposit_status TEXT NOT NULL CHECK (deposit_status IN ('pending', 'paid', 'refunded', 'forfeited')),
    booking_status TEXT NOT NULL CHECK (booking_status IN ('pending_approval', 'confirmed', 'completed', 'cancelled')),
    stripe_session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public read access to active services
CREATE POLICY "Public services are viewable by everyone" ON services
    FOR SELECT USING (is_active = true);

-- Restricted access to client personal data: only service role or owner can read
CREATE POLICY "Clients only accessible by authenticated staff" ON clients
    FOR ALL USING (auth.role() = 'service_role');

-- Restricted access to appointments
CREATE POLICY "Appointments only accessible by authenticated staff" ON appointments
    FOR ALL USING (auth.role() = 'service_role');
```

---

## 3. API Contract Specifications

### A. Create Booking (`POST /api/bookings`)
* **Request Payload (Validated via Zod):**
```json
{
  "clientName": "Victoria Sterling",
  "clientEmail": "victoria@example.com",
  "clientPhone": "+19175550192",
  "instagramHandle": "@victoria.style",
  "serviceId": "russian-mani",
  "addons": ["nailart-tier2", "chrome-finish"],
  "appointmentDate": "2026-12-05",
  "startTime": "10:00",
  "notes": "Prefer natural square shape and soft champagne chrome"
}
```
* **Success Response (`201 Created`):**
```json
{
  "success": true,
  "bookingId": "bk_98f12a3d",
  "totalPrice": 175.00,
  "depositRequired": 35.00,
  "checkoutUrl": "/booking/checkout?id=bk_98f12a3d",
  "status": "pending_deposit"
}
```

### B. Real-Time Slot Availability (`GET /api/availability?date=2026-12-05`)
* **Success Response (`200 OK`):**
```json
{
  "date": "2026-12-05",
  "maxDailySlots": 3,
  "availableSlots": [
    { "time": "09:00", "available": true, "durationAvailableMin": 240 },
    { "time": "13:30", "available": true, "durationAvailableMin": 240 },
    { "time": "17:30", "available": false, "reason": "booked" }
  ]
}
```

### C. n8n Automation Webhook (`POST /api/webhooks/n8n`)
* **Headers:** `x-signature: sha256=<hmac>`
* **Payload:** Dispatches events `booking.created`, `booking.approved`, `booking.reminder_dispatched`.
