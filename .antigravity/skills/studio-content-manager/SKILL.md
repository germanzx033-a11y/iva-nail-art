---
name: studio-content-manager
description: Professional Mobile-First Studio Asset & Content Management Skill for IVA Nail Art NY. Handles photo uploads from mobile, portfolio curation, text editing, and live sync across the atelier website.
---

# Studio Content & Asset Manager Skill

This skill governs the visual content, mobile photo upload workflow, and copy management for IVA Nail Art NY (`ivanailartny.com`).

## 1. Core Operating Philosophy
- **Authenticity First**: Real photos of Ivannía's sculpted acrylic sets and Russian dry manicure work (`/trabajo1.jpg`, `/trabajo2.jpg`, `/trabajo3.jpg`) take precedence over generic stock imagery.
- **Bespoke Quote Protocol**: Never expose hardcoded dollar amounts for services. All CTAs guide clients directly to WhatsApp consultations with pre-filled design requests.
- **Mobile-First Upload**: Studio photos taken directly on an iPhone or Android phone must be compressed on the client-side (max 1200px dimension, ~82% quality) to guarantee sub-second load times on mobile 5G/LTE networks.

## 2. Architecture & Data Flow
1. **CMS Dashboard (`/admin-iva`)**:
   - Tab `content`: Managed via `AdminContentEditor.tsx`.
   - Allows changing Hero Cover Scenes, Gallery Lookbook items, Service Card photos, and Studio Bio/Contact data.
2. **Persistence Layer (`lib/contentStore.ts`)**:
   - Client: `localStorage.getItem("iva_site_content_custom_v1")` with instant `iva-content-updated` event dispatching.
   - Server: `/api/admin/content` (JSON state endpoint) and `/api/admin/upload` (multipart/base64 photo uploader).
3. **Consumer Components**:
   - `HeroScroll.tsx`: Consumes `customScenes` dynamically.
   - `GallerySection.tsx` & `LookbookFilterable.tsx`: Sync with custom gallery items.
   - `ServiceSelectorLuxury.tsx`: Syncs with service naming and descriptions.

## 3. Image Optimization Standard
- **Format**: WebP / Progressive JPEG.
- **Max Width/Height**: 1200px.
- **Aspect Ratios**: 3:4 for portrait editorial nails, 1:1 for detail shots.
- **Destination**: `/public/uploads/` on disk, or inline Base64 data URL for instant zero-latency preview.
