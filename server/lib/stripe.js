/* eslint-env node */
import Stripe from "stripe";

let stripeClient;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10",
    });
  }
  return stripeClient;
}
