/**
 * IVA Nail Art - Availability API
 * GET /api/availability → bookable dates with their slots and whether each is free.
 */

import { NextResponse } from 'next/server';
import { getAppStatus, getSlotsStatus } from '@/lib/kv';
import { getBookableDates, getSlotsForDate } from '@/lib/schedule';

export const dynamic = 'force-dynamic';

export interface AvailabilityDay {
  date: string;
  slots: { id: string; label: string; available: boolean }[];
}

export async function GET(): Promise<NextResponse> {
  try {
    if ((await getAppStatus()) === 'REST') {
      return NextResponse.json({ open: false, days: [] }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const dates = getBookableDates();
    const pairs = dates.flatMap((date) => getSlotsForDate(date).map((s) => ({ date, slot: s.id, label: s.label })));
    const status = await getSlotsStatus(pairs);

    const byDate = new Map<string, AvailabilityDay>();
    pairs.forEach((p, i) => {
      const day = byDate.get(p.date) ?? { date: p.date, slots: [] };
      day.slots.push({ id: p.slot, label: p.label, available: !status[i].booked && !status[i].locked });
      byDate.set(p.date, day);
    });

    return NextResponse.json(
      { open: true, days: [...byDate.values()] },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Availability error:', error);
    return NextResponse.json({ error: 'Availability unavailable' }, { status: 503 });
  }
}
