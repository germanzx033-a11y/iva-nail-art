# Constants Directory

This directory contains all the static data and configuration for the IVA Nail Art application.

## Files

### `data.ts`
Contains all business data and configuration:
- **Service types and interfaces** - TypeScript types for services
- **CONFIG** - Business information (phone, address, hours, etc.)
- **IMAGES** - Image paths for hero and gallery
- **SERVICES** - Complete list of all services with prices and descriptions
- **AVAILABLE_HOURS** - Booking time slots
- **CATEGORIES** - Service category definitions

### `translations.ts`
Contains all UI text in English and Spanish:
- **TRANSLATIONS** - All interface text for both languages

### `index.ts`
Barrel export file that re-exports everything for easier imports.

## Usage

To edit prices or services, simply modify the `SERVICES` array in `data.ts`:

```typescript
{
  id: "gel-mani",
  name: "Gel Manicure",
  nameEs: "Manicura en Gel",
  description: "Long-Lasting Gel Polish",
  descriptionEs: "Esmalte Gel Duradero",
  price: 55,  // ← Edit price here
  duration: "45 min",
  category: "manicure",
  popular: true
}
```

To change business information (phone, hours, etc.), edit the `CONFIG` object in `data.ts`.

To update UI text, edit the `TRANSLATIONS` object in `translations.ts`.
