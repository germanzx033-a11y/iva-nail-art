/**
 * IVA Nail Art - Daily Brief API
 * IVA-PULSE Admin Dashboard Data
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getDailyCount,
  getWaitlist,
  getAppStatus,
} from '@/lib/kv';
import { getTodayDate, formatDate } from '@/lib/utils';

// =============================================
// TYPES
// =============================================

interface DailyBriefResponse {
  date: string;
  formattedDate: string;
  appStatus: 'ACTIVE' | 'REST';
  bookings: {
    count: number;
    maxCapacity: number;
    revenue: number;
  };
  waitlist: {
    count: number;
    highPriority: number;
  };
  slots: {
    morning: boolean;
    afternoon: boolean;
  };
}

// =============================================
// GET /api/admin/brief
// =============================================

export async function GET(request: NextRequest): Promise<NextResponse<DailyBriefResponse | { error: string }>> {
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

    // Get all data in parallel
    const [count, waitlist, appStatus] = await Promise.all([
      getDailyCount(date),
      getWaitlist(date),
      getAppStatus(),
    ]);

    // Calculate high priority waitlist entries
    const highPriorityCount = waitlist.filter(e => e.priority === 'HIGH').length;

    // Calculate estimated revenue (deposit * confirmed bookings)
    const estimatedRevenue = count * 30; // $30 deposit per booking

    // Determine slot availability
    const morningAvailable = count < 2;
    const afternoonAvailable = count < 2;

    const brief: DailyBriefResponse = {
      date,
      formattedDate: formatDate(date),
      appStatus,
      bookings: {
        count,
        maxCapacity: 2,
        revenue: estimatedRevenue,
      },
      waitlist: {
        count: waitlist.length,
        highPriority: highPriorityCount,
      },
      slots: {
        morning: morningAvailable,
        afternoon: afternoonAvailable,
      },
    };

    return NextResponse.json(brief);

  } catch (error) {
    console.error('Daily brief error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily brief' },
      { status: 500 }
    );
  }
}
