import { motion } from "framer-motion";
import { useState } from "react";
import { HiCheck, HiX, HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Pricing.css";

const PLANS = [
  {
    id: "basic",
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
    id: "pro",
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } },
};

// ── Reusable PricingCard ──────────────────────────────────────────────────
function PricingCard({ plan, isYearly }) {
  const { name, badge, monthlyPrice, yearlyPrice, description, color, features } = plan;
  const isPopular    = !!badge;
  const displayPrice = isYearly ? yearlyPrice : monthlyPrice;

  return (
    <motion.div
      className={`pricing-card ${isPopular ? "pricing-card--popular" : ""}`}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ "--card-accent": color }}
    >
      {/* Popular badge */}
      {badge && (
        <div className="pricing-card__badge">
          <HiSparkles />
          {badge}
        </div>
      )}

      {/* Header */}
      <div className="pricing-card__header">
        <div className="pricing-card__dot" />
        <h3 className="pricing-card__name">{name}</h3>
        <p className="pricing-card__desc">{description}</p>
      </div>

      {/* Price */}
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

      {/* Divider */}
      <div className="pricing-card__divider" />

      {/* Features */}
      <ul className="pricing-card__features">
        {features.map(({ text, included }) => (
          <li
            key={text}
            className={`pricing-card__feature ${!included ? "pricing-card__feature--off" : ""}`}
          >
            <span className="pricing-card__feature-icon">
              {included ? <HiCheck /> : <HiX />}
            </span>
            {text}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className={`pricing-card__cta ${isPopular ? "pricing-card__cta--popular" : ""}`}
      >
        {displayPrice ? "Get Started" : "Contact Sales"}
      </Link>

      {/* Glow */}
      <div className="pricing-card__glow" />
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="pricing section" id="pricing">
      <div className="container">

        {/* Header */}
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

          {/* Toggle */}
          <div className="pricing__toggle">
            <span className={!isYearly ? "pricing__toggle-label--active" : ""}>
              Monthly
            </span>
            <button
              className={`pricing__toggle-btn ${isYearly ? "pricing__toggle-btn--on" : ""}`}
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

        {/* Cards */}
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

        {/* Footer note */}
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