/**
 * IVA Nail Art - Utility Functions
 */

import { customAlphabet } from 'nanoid';

// =============================================
// TOKEN GENERATION
// =============================================

// Secure token generator (URL-safe)
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 32);

export function generateLockToken(): string {
  return `lock_${nanoid()}`;
}

export function generateVIPToken(): string {
  return `vip_${nanoid()}`;
}

export function generateClientId(): string {
  return `client_${nanoid(16)}`;
}

// =============================================
// DATE UTILITIES
// =============================================

export function formatDate(dateStr: string, locale: 'en' | 'es' = 'en'): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getMinBookingDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function isValidBookingDate(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00');
  const minDate = new Date(getMinBookingDate() + 'T00:00:00');
  return date >= minDate;
}

// =============================================
// IP EXTRACTION
// =============================================

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return '127.0.0.1';
}

// =============================================
// WHATSAPP INTEGRATION
// =============================================

export const WHATSAPP_CONFIG = {
  number: '13474735036', // IVA's WhatsApp number
  businessName: 'IVA Nail Art',
};

export function generateWhatsAppURL(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateVIPConciergeMessage(name: string, date: string, slot: string): string {
  return `Hola ${name} ✨ Soy el Concierge de IVA. Iva ha abierto un espacio exclusivo para ${date} (${slot}) y el cupo es tuyo. ¿Confirmas? 💅`;
}

export function generateBookingConfirmationMessage(
  name: string,
  service: string,
  date: string,
  slot: string
): string {
  return `✨ *Booking Confirmation* ✨

Hi ${name}! Your appointment at IVA Nail Art is confirmed.

💅 Service: ${service}
📅 Date: ${date}
🕐 Time: ${slot}
💰 Deposit: $30 (paid)

Please arrive 5 minutes early. See you soon! 💕`;
}

// =============================================
// VALIDATION
// =============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
}

// =============================================
// SLOT UTILITIES
// =============================================

export type TimeSlot = 'morning' | 'afternoon';

export const TIME_SLOTS: Record<TimeSlot, { label: string; labelEs: string; icon: string; time: string }> = {
  morning: {
    label: 'Morning Glow',
    labelEs: 'Brillo Matutino',
    icon: '🌅',
    time: '9:00 AM - 1:00 PM',
  },
  afternoon: {
    label: 'Golden Hour',
    labelEs: 'Hora Dorada',
    icon: '🌇',
    time: '2:00 PM - 6:00 PM',
  },
};

// =============================================
// CURRENCY FORMATTING
// =============================================

export function formatCurrency(amount: number, cents = false): string {
  const value = cents ? amount / 100 : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// =============================================
// SAFE GUARD BUFFER
// =============================================

export function getBufferSlots(slot: TimeSlot): TimeSlot[] {
  // 2-hour buffer means if morning is booked, afternoon has buffer
  // Since we only have 2 slots, booking one affects the other
  return slot === 'morning' ? ['afternoon'] : ['morning'];
}

// =============================================
// ERROR MESSAGES
// =============================================

export const ERROR_MESSAGES = {
  SLOT_ALREADY_LOCKED: 'This time slot is currently being reserved by another client.',
  RATE_LIMIT_EXCEEDED: 'You have exceeded the maximum booking attempts. Please try again tomorrow.',
  INVALID_TOKEN: 'Your booking session has expired. Please start again.',
  CAPACITY_EXCEEDED: 'This date is fully booked. Please select another date.',
  GHOST_MODE_ACTIVE: 'IVA is currently on a well-deserved rest. Join the VIP waitlist!',
  KV_ERROR: 'An error occurred. Please try again.',
  PAYMENT_FAILED: 'Payment could not be processed. Please try again.',
  OVERBOOKING_DETECTED: 'We apologize, this slot was just booked. Your payment will be refunded.',
};
