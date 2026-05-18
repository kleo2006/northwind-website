/**
 * server/routes/create-checkout-session.js
 * ─────────────────────────────────────────────────────────────────────────────
 * NorthWind — POST /api/create-checkout-session
 * Creates a Stripe Checkout session and returns the redirect URL.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* eslint-env node */
/* eslint-env node */
/* eslint-env node */
/* eslint-env node */
/* eslint-env node */
import express from "express";
import { getStripe } from "../lib/stripe.js";

const router = express.Router();

const ALLOWED_BILLING = new Set(["monthly", "yearly"]);

router.post("/create-checkout-session", async (req, res) => {
  // Defined here so process.env is already loaded
  const PLAN_CATALOG = {
    starter: {
      name: "NorthWind Starter",
      monthly: {
        priceId: process.env.STRIPE_PRICE_STARTER_MONTHLY,
        amount: 49900,
      },
      yearly: {
        priceId: process.env.STRIPE_PRICE_STARTER_YEARLY,
        amount: 39900,
      },
    },
    professional: {
      name: "NorthWind Professional",
      monthly: {
        priceId: process.env.STRIPE_PRICE_PRO_MONTHLY,
        amount: 119900,
      },
      yearly: {
        priceId: process.env.STRIPE_PRICE_PRO_YEARLY,
        amount: 95900,
      },
    },
  };

  const planId = typeof req.body?.planId === "string"
    ? req.body.planId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "")
    : "";

  const billing = typeof req.body?.billing === "string"
    ? req.body.billing.trim().toLowerCase().replace(/[^a-z]/g, "")
    : "monthly";

  if (!planId || !(planId in PLAN_CATALOG)) {
    return res.status(400).json({ error: "Invalid plan selected." });
  }

  if (!ALLOWED_BILLING.has(billing)) {
    return res.status(400).json({ error: "Invalid billing period." });
  }

  const plan      = PLAN_CATALOG[planId];
  const priceData = plan[billing];

  if (!priceData?.priceId) {
    return res.status(400).json({ error: "This plan/billing combination is not available." });
  }

  const clientUrl  = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
  const successUrl = `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl  = `${clientUrl}/payment/cancel?plan=${planId}&billing=${billing}`;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceData.priceId, quantity: 1 }],
      billing_address_collection: "required",
      custom_fields: [
        {
          key:      "company_name",
          label:    { type: "custom", custom: "Company name" },
          type:     "text",
          optional: true,
        },
      ],
      ...(isValidEmail(req.body?.customerEmail)
        ? { customer_email: req.body.customerEmail }
        : {}),
      success_url: successUrl,
      cancel_url:  cancelUrl,
      metadata: {
        planId,
        planName:  plan.name,
        billing,
        amount:    priceData.amount,
        createdAt: new Date().toISOString(),
      },
      submit_type: "pay",
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("[NorthWind] Stripe session error:", err.message);

    const status = err.statusCode >= 400 && err.statusCode < 500
      ? err.statusCode
      : 500;

    const message = status < 500
      ? "Invalid payment details. Please try again."
      : "Unable to start checkout. Please try again or contact support.";

    return res.status(status).json({ error: message });
  }
});

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default router;
/**
 * Cloudflare Pages Function
 * Route: POST /api/create-checkout-session
 *
 * File location in your repo:
 *   functions/api/create-checkout-session.js
 *
 * Cloudflare Pages automatically maps:
 *   functions/api/create-checkout-session.js  →  /api/create-checkout-session
 *
 * Required environment variables (Cloudflare Pages → Settings → Environment Variables):
 *   STRIPE_SECRET_KEY     →  sk_live_...  (or sk_test_... for testing)
 *   STRIPE_WEBHOOK_SECRET →  whsec_...
 *   SITE_URL              →  https://northwind-website-3j7.pages.dev
 */

// ─────────────────────────────────────────────────────────────────────────────
// Plan catalogue — SINGLE source of truth for prices.
// The frontend NEVER sends a price — only a planId string.
// ─────────────────────────────────────────────────────────────────────────────
