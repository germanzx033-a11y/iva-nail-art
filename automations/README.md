# ⚙️ IVA Nail Art NY — Automations & Booking Retention Pipeline
**Owner:** Director of Automations & Agents (n8n / Make / MCP)  
**Workflow File:** `ivanailart-booking-pipeline.json`  

---

## 1. ASCII Pipeline Flow Diagram (9-Node Production Architecture)

```
+---------------------------------------------------------------------------------+
|                            Calendly Webhook Event                               |
|                     Events: invitee.created | invitee.canceled                  |
+---------------------------------------+-----------------------------------------+
                                        |
                                        v  (HTTP POST Webhook)
+---------------------------------------------------------------------------------+
|                        Webhook: Calendly Trigger                                |
|                Path: /webhook/calendly-booking-pipeline                         |
+---------------------------------------+-----------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------+
|                        Parse & Normalize Calendly Event                         |
|   Extracts Client, Phone, Email, Service, Instagram, Formats Dates (EST),       |
|   Calculates reminderWaitDate = startTime - 24h, sets $35 deposit terms         |
+---------------------------------------+-----------------------------------------+
                                        |
                                        v
                        +---------------+---------------+
                        |                               |
             (invitee.created)                  (invitee.canceled)
                        |                               |
        +---------------+---------------+               +---------------+---------------+
        |                               |               |                               |
        v                               v               v                               v
+-------------------------------+ +-------------------+ +-------------------+ +-------------------+
|  Alert Iva: Confirm $35 Dep.  | | Send Client       | | Alert Iva:        | | Send Client       |
|  Direct WhatsApp link to chat | | Deposit Notice    | | Canceled Slot     | | Cancellation      |
|  Holds slot with Zelle/Apple  | | Zelle/Apple/Venmo | | Slot freed in     | | Confirmation      |
+-------------------------------+ +-------------------+ | calendar          | | Rebooking link    |
                                                        +-------------------+ +-------------------+
        |
        v
+-------------------------------+
|     Wait until 24h Before     |
|   Targets: reminderWaitDate   |
+---------------+---------------+
                |
                v
+-------------------------------+
|    24h WhatsApp Reminder      |
|  Address (Bay Ridge 11209)    |
|  15 min grace period policy   |
|  24h cancellation notice rule |
+-------------------------------+
```

---

## 2. Environment Variables & Credentials Setup

Set these variables in your n8n instance environment or workflow credentials:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `STUDIO_OWNER_TELEGRAM_OR_PHONE` | Studio owner's Telegram Chat ID or Phone | `@iva_nailart_nyc_admin` |
| `WHATSAPP_API_TOKEN` | WhatsApp Cloud API / Twilio bearer token | `EAA...` |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | Secret key to verify Calendly webhook signatures | `cal_sec_...` |

---

## 3. Calendly Webhook Subscription Setup

To activate the webhook in Calendly, register the webhook subscription via Calendly API or dashboard:

```bash
curl -X POST https://api.calendly.com/webhook_subscriptions \
  -H "Authorization: Bearer <CALENDLY_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-n8n-instance.com/webhook/calendly-booking-pipeline",
    "events": ["invitee.created", "invitee.canceled"],
    "organization": "https://api.calendly.com/organizations/<ORG_ID>",
    "scope": "organization"
  }'
```

---

## 4. End-to-End Testing with cURL

### 4.1 Simulate a New Calendly Booking (`invitee.created`):

```bash
curl -X POST http://localhost:5678/webhook-test/calendly-booking-pipeline \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.created",
    "payload": {
      "name": "Elena Rostova",
      "email": "elena.rostova@example.com",
      "text_reminder_number": "+19295551234",
      "event_start_time": "2026-12-10T16:00:00Z",
      "questions_and_answers": [
        { "question": "Selected Service", "answer": "Russian Mani with Tier 2 Hand-Painted Art" },
        { "question": "Instagram Handle", "answer": "@elena_style_nyc" }
      ]
    }
  }'
```

### 4.2 Simulate a Booking Cancellation (`invitee.canceled`):

```bash
curl -X POST http://localhost:5678/webhook-test/calendly-booking-pipeline \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.canceled",
    "payload": {
      "name": "Elena Rostova",
      "email": "elena.rostova@example.com",
      "text_reminder_number": "+19295551234",
      "event_start_time": "2026-12-10T16:00:00Z",
      "cancellation": {
        "canceled_by": "Elena Rostova",
        "reason": "Schedule conflict with photoshoot"
      }
    }
  }'
```

### 4.3 Validation Script

To verify workflow integrity programmatically without launching an n8n daemon:
```bash
node -e "const f = require('./automations/ivanailart-booking-pipeline.json'); console.log('Validated nodes:', f.nodes.length, 'connections:', Object.keys(f.connections).length);"
```
