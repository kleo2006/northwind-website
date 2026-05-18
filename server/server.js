/* eslint-env node */
// import { config } from "dotenv";
// import { resolve, dirname } from "path";
// import { fileURLToPath } from "url";
// import express from "express";
// import cors from "cors";
// import chatRoute from "./routes/chat.js";
// import checkoutRoute from "./routes/create-checkout-session.js";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// config({ path: resolve(__dirname, "../.env") });

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json({ limit: "16kb" }));

// app.use(
//   cors({
//     origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
//     methods: ["POST", "GET"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// app.use("/api", chatRoute);
// app.use("/api", checkoutRoute);

// app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// app.listen(PORT, () => {
//   console.log(`[NorthWind] API running on http://localhost:${PORT}`);
// });
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const { planId, billing } = req.body;

    const priceKey = `STRIPE_PRICE_${planId.toUpperCase()}_${billing.toUpperCase()}`;
    const price = process.env[priceKey];

    if (!price) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Checkout session failed" });
  }
});

export default router;