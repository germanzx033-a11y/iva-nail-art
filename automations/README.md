# ⚙️ IVA Nail Art NY — Automations & Booking Retention Pipeline
**Owner:** Director of Automations & Agents (n8n / Make / MCP)  
**Workflow File:** `ivanailart-booking-pipeline.json`  

---

## 1. ASCII Pipeline Flow Diagram (Calendly Webhook Architecture)

```
+--------------------------------------------------------------+
|                  Calendly Webhook Event                      |
|      Events: invitee.created | invitee.canceled              |
+------------------------------+-------------------------------+
                               |
                               v  (HTTP POST Webhook)
+--------------------------------------------------------------+
|               Webhook: Calendly Trigger                      |
|       Path: /webhook/calendly-booking-pipeline               |
+------------------------------+-------------------------------+
                               |
                               v
+--------------------------------------------------------------+
|               Parse & Sanitize Calendly Event                |
|   Extracts Client, Phone, Service, Time, $35 deposit note    |
+------------------------------+-------------------------------+
                               |
                               v
                 +-------------+-------------+
                 |                           |
        (invitee.created)            (invitee.canceled)
                 |                           |
                 v                           v
+-------------------------------+ +----------------------------+
|  Alert Iva: Confirm $35 Dep.  | |  Alert Iva: Canceled Slot  |
|  Direct WhatsApp link to chat | |  Slot freed in calendar    |
|  Holds slot with Zelle/Apple  | +----------------------------+
+-------------------------------+
                 |
                 v
+-------------------------------+
|     Wait: 24h Pre-Service     |
+----------------+--------------+
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

## 4. Local Testing with cURL

Simulate a new Calendly booking:

```bash
curl -X POST http://localhost:5678/webhook-test/calendly-booking-pipeline \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.created",
    "payload": {
      "name": "Camila Gomez",
      "email": "camila@example.com",
      "text_reminder_number": "+19295551234",
      "event_start_time": "2026-12-05T18:00:00Z",
      "questions_and_answers": [
        { "question": "Selected Service", "answer": "Builder Gel Manicure (BIAB)" }
      ]
    }
  }'
```
