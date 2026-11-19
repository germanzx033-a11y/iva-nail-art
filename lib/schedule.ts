/**
 * IVA Nail Art - Appointment schedule
 *
 * One appointment on weekdays, two on Saturday and Sunday.
 * Times are in New York time. Change the start times here; everything
 * (availability, checkout, webhook) reads from this file.
 */

export const STUDIO_TIME_ZONE = 'America/New_York';

/** How far ahead clients can book. */
export const BOOKING_WINDOW_DAYS = 45;

export interface ScheduleSlot {
  /** Stable id stored in KV and Stripe metadata, e.g. "1730". */
  id: string;
  label: string;
}

const WEEKDAY_SLOTS: ScheduleSlot[] = [{ id: '1730', label: '5:30 PM' }];

const WEEKEND_SLOTS: ScheduleSlot[] = [
  { id: '1000', label: '10:00 AM' },
  { id: '1500', label: '3:00 PM' },
];

/** Day of week (0 = Sunday) for a YYYY-MM-DD date, independent of the server time zone. */
function dayOfWeek(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export function getSlotsForDate(date: string): ScheduleSlot[] {
  const day = dayOfWeek(date);
  return day === 0 || day === 6 ? WEEKEND_SLOTS : WEEKDAY_SLOTS;
}

export function getSlot(date: string, slotId: unknown): ScheduleSlot | undefined {
  if (typeof slotId !== 'string') return undefined;
  return getSlotsForDate(date).find((s) => s.id === slotId);
}

/** Today's date in New York as YYYY-MM-DD. */
export function studioToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: STUDIO_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Bookable dates: from tomorrow (New York time) through the booking window. */
export function getBookableDates(now: Date = new Date()): string[] {
  const today = studioToday(now);
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => addDays(today, i + 1));
}

export function isBookableDate(date: unknown, now: Date = new Date()): date is string {
  return typeof date === 'string' && getBookableDates(now).includes(date);
}
