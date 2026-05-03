import { useState, useEffect, useRef } from "react";
import "./ExitModal.css";

/* ─── Icons ──────────────────────────────────────────────────── */
const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CheckBigIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────── */
const BENEFITS = [
  "ROI Calculator Tool ($197 value)",
  "47-Point Website Audit Checklist",
  "Conversion Optimization Guide",
];

/* ─── Component ──────────────────────────────────────────────── */
export default function ExitModal() {
  // Hidden by default — triggered by timer or exit intent
  const [visible, setVisible]     = useState(false);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef                  = useRef(null);

  /* Trigger: fires once per page load, no sessionStorage guard */
  useEffect(() => {
    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setVisible(true);
    };

    const timer = setTimeout(trigger, 8000);

    const onMouseLeave = (e) => {
      if (e.clientY <= 0) trigger();
    };

    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  /* Scroll lock */
  useEffect(() => {
    document.body.classList.toggle("em-locked", visible);
    return () => document.body.classList.remove("em-locked");
  }, [visible]);

  /* Close hides modal for current session; refresh resets everything */
  const close = () => setVisible(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) { inputRef.current?.focus(); return; }
    setSubmitted(true);
  };

  if (!visible) return null;

  return (
    <div className="em-backdrop" onClick={close}>
      <div className="em-modal" onClick={(e) => e.stopPropagation()}>

        <button className="em-close" onClick={close} aria-label="Close">✕</button>

        {submitted ? (
          <div className="em-success">
            <div className="em-success-icon"><CheckBigIcon /></div>
            <h3 className="em-success-title">You're all set!</h3>
            <p className="em-success-sub">
              Check your inbox — your free guide is on its way.
            </p>
            <button className="em-success-btn" onClick={close}>Done</button>
          </div>

        ) : (
          <>
            <div className="em-icon-wrap"><ClockIcon /></div>

            <h2 className="em-title">Wait! Don't Leave Yet</h2>
            <p className="em-sub">
              Get our FREE Website ROI Calculator &amp; Optimization Guide
            </p>

            <div className="em-proof">
              <div className="em-proof-top">
                <div className="em-proof-left">
                  <UsersIcon />
                  <span className="em-proof-count">2,847 downloads</span>
                </div>
                <span className="em-proof-this">this month</span>
              </div>
              <div className="em-proof-value">
                Value: <strong>$497</strong> — Yours <strong>FREE</strong>
              </div>
              <div className="em-bar-track">
                <div className="em-bar-fill" />
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="em-input-wrap">
                <input
                  ref={inputRef}
                  type="email"
                  className="em-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="em-cta">
                Get My FREE Guide Now
              </button>
            </form>

            <p className="em-trust">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>

            <div className="em-divider" />

            <p className="em-benefits-title">What you'll get:</p>
            <div className="em-benefits-list">
              {BENEFITS.map((b) => (
                <div key={b} className="em-benefit-item">{b}</div>
              ))}
            </div>

            <button className="em-skip" onClick={close}>
              No thanks, I don't want free tools
            </button>
          </>
        )}
      </div>
    </div>
  );
}