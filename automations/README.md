# ⚙️ IVA Nail Art NY — Automations & Booking Retention Pipeline
**Owner:** Director of Automations & Agents (n8n / Make / MCP)  
**Workflow File:** `ivanailart-booking-pipeline.json`  

---

## 1. ASCII Pipeline Flow Diagram

```
+--------------------------------------------------------------+
|                    /api/bookings (Next.js)                   |
|       Client submits reservation with $35 deposit            |
+------------------------------+-------------------------------+
                               |
                               v  (HTTP POST Webhook)
+--------------------------------------------------------------+
|                  Webhook: Booking Created                    |
|       Path: /webhook/iva-booking-pipeline                    |
+------------------------------+-------------------------------+
                               |
                               v
+--------------------------------------------------------------+
|                  Validate & Sanitize Data                    |
|       Format dates, normalize phone, verify deposits         |
+---------------+------------------------------+---------------+
                |                              |
                v                              v
+-------------------------------+ +----------------------------+
|      Owner Instant Alert      | |   Wait: 24h Pre-Service    |
| Telegram/SMS approval alert   | +--------------+-------------+
| with client info & quick link |                |
+-------------------------------+                v
                                  +----------------------------+
                                  | 24h WhatsApp Reminder      |
                                  | Address, protocol, cancel  |
                                  +--------------+-------------+
                                                 |
                                                 v
                                  +----------------------------+
                                  | Wait: 24h Post-Service     |
                                  +--------------+-------------+
                                                 |
                                                 v
                                  +----------------------------+
                                  | Google 5-Star Review &     |
                                  | 3-Week Rebooking Invite    |
                                  +----------------------------+
```

---

## 2. Environment Variables & Credentials Setup

Set these variables in your n8n instance environment or workflow credentials:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `STUDIO_OWNER_TELEGRAM_OR_PHONE` | Studio owner's Telegram Chat ID or Phone | `@aureate_sole_admin` |
| `WHATSAPP_API_TOKEN` | WhatsApp Cloud API / Twilio bearer token | `EAA...` |
| `GOOGLE_REVIEW_LINK` | Direct link to Google Business profile review | `https://g.page/r/ivanailartny/review` |

---

## 3. End-to-End Test (cURL Simulation)

Execute this command to simulate a confirmed booking flowing through the pipeline:

```bash
curl -X POST https://n8n.your-studio.com/webhook/iva-booking-pipeline \
  -H "Content-Type: application/json" \
  -H "x-signature: your_cryptographic_webhook_hmac_secret" \
  -d '{
    "event": "booking.created",
    "data": {
      "id": "bk_test_84f9",
      "clientName": "Elena Rostova",
      "clientEmail": "elena.rostova@fashionny.com",
      "clientPhone": "+19296257273",
      "instagramHandle": "@elena.rostova",
      "serviceName": "The Signature Russian Dry Mani",
      "addons": ["Nail Art Tier 2 (Artisan Hand-Painted)"],
      "appointmentDate": "2026-12-10",
      "startTime": "11:00",
      "totalPrice": 175.00,
      "depositAmount": 35.00,
      "depositStatus": "paid",
      "notes": "Almond shape, chrome gold accents for gala"
    }
  }'
```

Expected output:
```json
{
  "received": true,
  "status": "processing"
}
```
