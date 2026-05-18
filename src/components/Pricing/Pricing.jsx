import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { HiCheck, HiX, HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Pricing.css";

// ── Plan definitions ──────────────────────────────────────────────────────────
// NOTE: prices here are display-only. The backend PLAN_CATALOG is the real
// source of truth — the frontend never sends a price to the server.
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    monthlyPrice: 499,
    yearlyPrice: 399,
    description: "Perfect for small businesses taking their first step into managed IT.",
    color: "#38bdf8",
    features: [
      { text: "Up to 10 users supported",         included: true  },
      { text: "Helpdesk support (business hours)", included: true  },
      { text: "Basic network monitoring",          included: true  },
      { text: "Monthly security report",           included: true  },
      { text: "Cloud storage (500 GB)",            included: true  },
      { text: "24/7 emergency support",            included: false },
      { text: "Dedicated account manager",         included: false },
      { text: "Custom software integrations",      included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    badge: "Most Popular",
    monthlyPrice: 1199,
    yearlyPrice: 959,
    description: "For growing teams that need reliable infrastructure and priority support.",
    color: "#818cf8",
    features: [
      { text: "Up to 50 users supported",          included: true  },
      { text: "24/7 helpdesk & emergency support", included: true  },
      { text: "Advanced network monitoring",        included: true  },
      { text: "Weekly security reports",            included: true  },
      { text: "Cloud storage (5 TB)",               included: true  },
      { text: "Dedicated account manager",          included: true  },
      { text: "Custom software integrations",       included: false },
      { text: "On-site engineer visits",            included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: null,
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Fully tailored IT strategy and infrastructure for large organizations.",
    color: "#34d399",
    features: [
      { text: "Unlimited users",                   included: true  },
      { text: "24/7 priority support (SLA < 1hr)", included: true  },
      { text: "Full infrastructure monitoring",    included: true  },
      { text: "Real-time security dashboard",      included: true  },
      { text: "Unlimited cloud storage",           included: true  },
      { text: "Dedicated account manager",         included: true  },
      { text: "Custom software integrations",      included: true  },
      { text: "On-site engineer visits",           included: true  },
    ],
  },
];

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } },
};

// ── Checkout button ───────────────────────────────────────────────────────────
function CheckoutButton({ planId, billing, isPopular }) {
  const [status, setStatus]     = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = useCallback(async () => {
    if (status === "loading") return; // prevent double-click

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/create-checkout-session", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        // Only send planId and billing — NEVER a price value
        body: JSON.stringify({ planId, billing }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to start checkout. Please try again.");
      }

      if (!data.url) {
        throw new Error("Invalid response from server. Please try again.");
      }

      // Redirect to Stripe-hosted checkout page
      window.location.href = data.url;

    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again or contact support.");

      // Auto-reset after 6 s so the user can retry
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
      }, 6000);
    }
  }, [planId, billing, status]);

  return (
    <div className="pricing-card__cta-wrapper">
      <button
        className={`pricing-card__cta pricing-card__cta--btn${isPopular ? " pricing-card__cta--popular" : ""}${status === "loading" ? " pricing-card__cta--loading" : ""}`}
        onClick={handleCheckout}
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        aria-label={status === "loading" ? "Processing, please wait…" : `Get started with ${planId} plan`}
      >
        {status === "loading" ? (
          <>
            <span className="cta-spinner" aria-hidden="true" />
            Processing…
          </>
        ) : (
          "Get Started"
        )}
      </button>

      {status === "error" && errorMsg && (
        <p className="pricing-card__cta-error" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

// ── Pricing card ──────────────────────────────────────────────────────────────
function PricingCard({ plan, isYearly }) {
  const { id, name, badge, monthlyPrice, yearlyPrice, description, color, features } = plan;
  const isPopular    = !!badge;
  const isEnterprise = id === "enterprise";
  const displayPrice = isYearly ? yearlyPrice : monthlyPrice;
  const billing      = isYearly ? "yearly" : "monthly";

  return (
    <motion.div
      className={`pricing-card${isPopular ? " pricing-card--popular" : ""}`}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ "--card-accent": color }}
    >
      {badge && (
        <div className="pricing-card__badge">
          <HiSparkles />
          {badge}
        </div>
      )}

      <div className="pricing-card__header">
        <div className="pricing-card__dot" />
        <h3 className="pricing-card__name">{name}</h3>
        <p className="pricing-card__desc">{description}</p>
      </div>

      <div className="pricing-card__price">
        {displayPrice ? (
          <>
            <span className="pricing-card__currency">$</span>
            <span className="pricing-card__amount">{displayPrice}</span>
            <span className="pricing-card__period">/ mo</span>
          </>
        ) : (
          <span className="pricing-card__custom">Custom Pricing</span>
        )}
        {displayPrice && isYearly && (
          <div className="pricing-card__saving">Save 20% annually</div>
        )}
      </div>

      <div className="pricing-card__divider" />

      <ul className="pricing-card__features">
        {features.map(({ text, included }) => (
          <li
            key={text}
            className={`pricing-card__feature${!included ? " pricing-card__feature--off" : ""}`}
          >
            <span className="pricing-card__feature-icon">
              {included ? <HiCheck /> : <HiX />}
            </span>
            {text}
          </li>
        ))}
      </ul>

      {/* Enterprise → contact page | all others → Stripe checkout */}
      {isEnterprise ? (
        <Link to="/contact" className="pricing-card__cta">
          Contact Sales
        </Link>
      ) : (
        <CheckoutButton planId={id} billing={billing} isPopular={isPopular} />
      )}

      <div className="pricing-card__glow" />
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="pricing section" id="pricing">
      <div className="container">
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="pricing__eyebrow">Transparent Pricing</div>
          <h2 className="pricing__title">
            Plans That <span className="accent">Scale With You</span>
          </h2>
          <p className="pricing__sub">
            No hidden fees. No long-term lock-in. Pick the plan that fits your
            team today — upgrade anytime as you grow.
          </p>

          <div className="pricing__toggle">
            <span className={!isYearly ? "pricing__toggle-label--active" : ""}>
              Monthly
            </span>
            <button
              className={`pricing__toggle-btn${isYearly ? " pricing__toggle-btn--on" : ""}`}
              onClick={() => setIsYearly((p) => !p)}
              aria-label="Toggle billing period"
            >
              <span className="pricing__toggle-thumb" />
            </button>
            <span className={isYearly ? "pricing__toggle-label--active" : ""}>
              Yearly
              <span className="pricing__save-pill">Save 20%</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          className="pricing__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </motion.div>

        <motion.p
          className="pricing__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          All plans include onboarding support. Need something custom?{" "}
          <Link to="/contact" className="pricing__note-link">
            Talk to our team →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}