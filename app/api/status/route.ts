/**
 * IVA Nail Art - App Status API
 * Maternity Ghost Mode (MGM) Controller
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAppStatus, setAppStatus, toggleAppStatus, AppStatus } from '@/lib/kv';
import { requireAdmin } from '@/lib/auth';

// =============================================
// GET /api/status
// =============================================

export async function GET(): Promise<NextResponse> {
  try {
    const status = await getAppStatus();
    return NextResponse.json({
      status,
      isActive: status === 'ACTIVE',
      isResting: status === 'REST',
      message: status === 'REST'
        ? 'Iva está en un merecido descanso. Únete a la lista VIP.'
        : 'Accepting limited bookings',
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}

// =============================================
// POST /api/status (Toggle MGM)
// =============================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const unauthorized = requireAdmin(request);
    if (unauthorized) return unauthorized;

    const body = await request.json().catch(() => ({}));
    let newStatus: AppStatus;

    if (body.action === 'toggle') {
      newStatus = await toggleAppStatus();
    } else if (body.status === 'ACTIVE' || body.status === 'REST') {
      await setAppStatus(body.status);
      newStatus = body.status;
    } else {
      newStatus = await toggleAppStatus();
    }

    return NextResponse.json({
      success: true,
      status: newStatus,
      isActive: newStatus === 'ACTIVE',
      isResting: newStatus === 'REST',
      message: newStatus === 'REST'
        ? 'Ghost Mode activated. Calendar hidden.'
        : 'Ghost Mode deactivated. Calendar visible.',
    });
  } catch (error) {
    console.error('Status toggle error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle status' },
      { status: 500 }
    );
  }
}
