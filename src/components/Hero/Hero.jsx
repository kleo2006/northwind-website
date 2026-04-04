import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import { HiArrowRight, HiShieldCheck, HiChip, HiGlobe } from "react-icons/hi";
import "./Hero.css";

const BADGES = [
  { icon: <HiShieldCheck />, label: "Cybersecurity" },
  { icon: <HiChip />,        label: "IT Infrastructure" },
  { icon: <HiGlobe />,       label: "Cloud Solutions" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section className="hero">

      {/* ── Background ── */}
      <div className="hero__grid"      aria-hidden="true" />
      <div className="hero__glow-a"    aria-hidden="true" />
      <div className="hero__glow-b"    aria-hidden="true" />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* ── Eyebrow ── */}
          <motion.div className="hero__eyebrow" variants={fadeUp}>
            <span className="hero__dot" />
            Trusted IT Partner for Modern Businesses
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1 className="hero__title" variants={fadeUp}>
            Technology That
            <span className="hero__title-accent"> Powers</span>
            <br />
            Your Business Forward
          </motion.h1>

          {/* ── Subheadline ── */}
          <motion.p className="hero__sub" variants={fadeUp}>
            NorthWind delivers end-to-end IT services and strategic consulting
            — from secure infrastructure and cloud migration to 24/7 support.
            We turn complex technology into your competitive advantage.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div className="hero__actions" variants={fadeUp}>
            <Link to="/contact" className="hero__btn hero__btn--primary">
              Get a Free Consultation
              <HiArrowRight className="hero__btn-icon" />
            </Link>
            <Link to="/services" className="hero__btn hero__btn--ghost">
              Explore Services
            </Link>
          </motion.div>

          {/* ── Badges ── */}
          <motion.div className="hero__badges" variants={fadeUp}>
            {BADGES.map(({ icon, label }) => (
              <div className="hero__badge" key={label}>
                <span className="hero__badge-icon">{icon}</span>
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Visual Card ── */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-dots">
                <span /><span /><span />
              </div>
              <span className="hero__card-title">System Status</span>
            </div>

            <div className="hero__card-body">
              {[
                { label: "Network Uptime",    value: "99.98%", color: "#22c55e" },
                { label: "Active Clients",    value: "140+",   color: "var(--accent)" },
                { label: "Incidents Resolved",value: "4,200+", color: "var(--accent)" },
                { label: "Avg Response Time", value: "< 2 min",color: "#f59e0b" },
              ].map(({ label, value, color }) => (
                <div className="hero__stat" key={label}>
                  <span className="hero__stat-label">{label}</span>
                  <span className="hero__stat-value" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="hero__card-footer">
              <span className="hero__pulse" />
              All systems operational
            </div>
          </div>

          {/* Floating tags */}
          <motion.div
            className="hero__tag hero__tag--a"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            🔒 SSL Secured
          </motion.div>
          <motion.div
            className="hero__tag hero__tag--b"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            ☁️ Cloud Ready
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}