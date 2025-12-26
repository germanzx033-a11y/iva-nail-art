/**
 * IVA Nail Art - Waitlist API
 * VIP Waitlist Management
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  addToWaitlist,
  getWaitlist,
  updateWaitlistNotified,
  getAppStatus,
} from '@/lib/kv';
import { isValidEmail, isValidPhone, getTodayDate } from '@/lib/utils';

// =============================================
// REQUEST TYPES
// =============================================

interface WaitlistRequest {
  email: string;
  phone: string;
  name: string;
  vibe?: string;
  date?: string;
}

// =============================================
// POST /api/waitlist (Join waitlist)
// =============================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: WaitlistRequest = await request.json();
    const { email, phone, name, vibe, date } = body;

    // Validate required fields
    if (!email || !phone || !name) {
      return NextResponse.json(
        { error: 'Email, phone, and name are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Use today's date if not specified
    const targetDate = date || getTodayDate();

    // Add to waitlist
    const success = await addToWaitlist(targetDate, {
      email,
      phone,
      name,
      vibe: vibe || 'Interested',
      priority: 'MEDIUM',
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    // Check if Ghost Mode is active
    const status = await getAppStatus();

    return NextResponse.json({
      success: true,
      message: status === 'REST'
        ? "You're on the VIP list! We'll notify you when Iva returns."
        : "You're on the waitlist! We'll contact you if a spot opens up.",
      priority: 'MEDIUM',
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

// =============================================
// GET /api/waitlist (Get waitlist for admin)
// =============================================

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_SECRET_KEY;

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || getTodayDate();

    const waitlist = await getWaitlist(date);

    return NextResponse.json({
      date,
      count: waitlist.length,
      entries: waitlist,
    });

  } catch (error) {
    console.error('Waitlist fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}

// =============================================
// PATCH /api/waitlist (Mark as notified)
// =============================================

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_SECRET_KEY;

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { date, email } = body;

    if (!date || !email) {
      return NextResponse.json(
        { error: 'Date and email are required' },
        { status: 400 }
      );
    }

    const success = await updateWaitlistNotified(date, email);

    return NextResponse.json({
      success,
      message: success ? 'Marked as notified' : 'Failed to update',
    });

  } catch (error) {
    console.error('Waitlist update error:', error);
    return NextResponse.json(
      { error: 'Failed to update waitlist' },
      { status: 500 }
    );
  }
}
