/**
 * IVA Nail Art - Stripe Integration
 * Lock-to-Stripe Bridge Protocol
 */

import Stripe from 'stripe';

// Initialize Stripe with fallback for build time
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// =============================================
// CONFIGURATION
// =============================================

export const STRIPE_CONFIG = {
  deposit: 3000, // $30 in cents
  currency: 'usd',
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://iva-nail-art.vercel.app'}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://iva-nail-art.vercel.app'}/booking/cancel`,
};

// =============================================
// TYPES
// =============================================

export interface CreateCheckoutParams {
  clientLockToken: string;
  date: string;
  slot: string;
  serviceName: string;
  servicePrice: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
}

export interface CheckoutSessionMetadata {
  [key: string]: string;
  lockToken: string;
  date: string;
  slot: string;
  serviceName: string;
  fullPrice: string;
  customerName: string;
  customerPhone: string;
}

// =============================================
// CHECKOUT SESSION
// =============================================

export async function createCheckoutSession(params: CreateCheckoutParams): Promise<Stripe.Checkout.Session> {
  const {
    clientLockToken,
    date,
    slot,
    serviceName,
    servicePrice,
    customerEmail,
    customerName,
    customerPhone,
  } = params;

  const metadata: CheckoutSessionMetadata = {
    lockToken: clientLockToken,
    date,
    slot,
    serviceName,
    fullPrice: servicePrice.toString(),
    customerName,
    customerPhone,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    client_reference_id: clientLockToken, // Lock-to-Stripe Bridge
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: `IVA Nail Art - ${serviceName}`,
            description: `Booking deposit for ${date} (${slot}). Full service: $${servicePrice}`,
            images: ['https://iva-nail-art.vercel.app/og-image.jpg'],
          },
          unit_amount: STRIPE_CONFIG.deposit,
        },
        quantity: 1,
      },
    ],
    metadata,
    success_url: STRIPE_CONFIG.successUrl,
    cancel_url: STRIPE_CONFIG.cancelUrl,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    allow_promotion_codes: true,
  });

  return session;
}

// =============================================
// REFUND
// =============================================

export async function createRefund(
  paymentIntentId: string,
  reason: string
): Promise<Stripe.Refund> {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    reason: 'requested_by_customer',
    metadata: {
      reason,
      automated: 'true',
      timestamp: new Date().toISOString(),
    },
  });

  return refund;
}

// =============================================
// RETRIEVE SESSION
// =============================================

export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });
  } catch {
    return null;
  }
}

// =============================================
// WEBHOOK SIGNATURE VERIFICATION
// =============================================

export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}

// =============================================
// CUSTOMER PORTAL
// =============================================

export async function createPortalSession(customerId: string): Promise<Stripe.BillingPortal.Session> {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://iva-nail-art.vercel.app'}`,
  });
}
