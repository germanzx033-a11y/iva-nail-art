/**
 * IVA Nail Art - Stripe Webhook Handler
 * Golden Gate Protocol - Phase C (Blindado)
 *
 * Features:
 * - Idempotency: processed:{session.id}
 * - Capacity validation with auto-refund
 * - VIP Recovery tokens for overbooking
 * - Safe-Guard Buffer (2h before/after)
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  markProcessed,
  isProcessed,
  checkCapacity,
  incrementDailyCount,
  decrementDailyCount,
  createBooking,
  confirmBooking,
  releaseLock,
  createVIPToken,
  addToWaitlist,
} from '@/lib/kv';
import { stripe, verifyWebhookSignature, createRefund } from '@/lib/stripe';
import { generateVIPToken, formatDate } from '@/lib/utils';

// =============================================
// WEBHOOK CONFIGURATION
// =============================================

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// =============================================
// OVERBOOKING HANDLER
// =============================================

async function handleOverbooking(
  session: Stripe.Checkout.Session,
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const metadata = session.metadata!;
  const { date, customerName } = metadata;
  const email = session.customer_email!;

  console.log(`🚨 Overbooking detected for session ${session.id}`);

  // 1. Auto-refund
  try {
    await createRefund(paymentIntent.id, 'Overbooking - automatic refund');
    console.log(`💸 Refund initiated for payment ${paymentIntent.id}`);
  } catch (error) {
    console.error('Refund failed:', error);
  }

  // 2. Generate VIP Token with HIGH priority
  const vipToken = generateVIPToken();
  await createVIPToken(vipToken, {
    email,
    discount: 20, // 20% discount
    priority: 'HIGH',
    reason: 'overbooking_recovery',
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 3. Add to waitlist with HIGH priority
  await addToWaitlist(date, {
    email,
    phone: metadata.customerPhone || '',
    name: customerName,
    vibe: 'VIP Recovery',
    priority: 'HIGH',
  });

  console.log(`✨ VIP Token ${vipToken} created for ${email}`);
}

// =============================================
// SUCCESSFUL PAYMENT HANDLER
// =============================================

async function handleSuccessfulPayment(
  session: Stripe.Checkout.Session
): Promise<{ success: boolean; error?: string }> {
  const sessionId = session.id;
  const metadata = session.metadata!;
  const { date, slot, lockToken, serviceName, fullPrice, customerName, customerPhone } = metadata;
  const email = session.customer_email!;

  // 1. Idempotency check
  const alreadyProcessed = await isProcessed(sessionId);
  if (alreadyProcessed) {
    console.log(`⏭️ Session ${sessionId} already processed, skipping`);
    return { success: true };
  }

  // 2. Mark as processed (atomic)
  const marked = await markProcessed(sessionId);
  if (!marked) {
    console.log(`⚠️ Could not mark session ${sessionId} as processed (concurrent)`);
    return { success: true };
  }

  // 3. Check capacity before confirming
  const capacity = await checkCapacity(date);

  // 4. Get payment intent for potential refund
  const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

  // 5. Handle overbooking if capacity exceeded
  if (!capacity.available) {
    await handleOverbooking(session, paymentIntent);
    return { success: true };
  }

  // 6. Increment daily count (atomic)
  const newCount = await incrementDailyCount(date);

  // 7. Double-check: if count > 2 after increment, we have overbooking
  if (newCount > 2) {
    await decrementDailyCount(date);
    await handleOverbooking(session, paymentIntent);
    return { success: true };
  }

  // 8. Create booking record
  await createBooking(date, sessionId, {
    email,
    name: customerName,
    phone: customerPhone,
    service: serviceName,
    vibe: 'Luxury Client',
    amount: parseInt(fullPrice),
    deposit: 30,
    sessionId,
  });

  // 9. Confirm booking
  await confirmBooking(date, sessionId);

  // 10. Release the pre-lock (optional, as it expires anyway)
  await releaseLock(date, slot);

  console.log(`✅ Booking confirmed for ${email} on ${formatDate(date)} (${slot})`);

  return { success: true };
}

// =============================================
// POST /api/webhook
// =============================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    // 2. Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // 3. Handle event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Only process paid sessions
        if (session.payment_status === 'paid') {
          // Expand payment intent if needed
          let fullSession = session;
          if (typeof session.payment_intent === 'string') {
            fullSession = await stripe.checkout.sessions.retrieve(session.id, {
              expand: ['payment_intent'],
            });
          }

          await handleSuccessfulPayment(fullSession);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;

        if (metadata?.date && metadata?.slot) {
          // Release the lock when checkout expires
          await releaseLock(metadata.date, metadata.slot);
          console.log(`🔓 Lock released for expired session ${session.id}`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Payment failed: ${paymentIntent.id}`);
        // Lock will expire automatically, no action needed
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💸 Charge refunded: ${charge.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
