import { useState, useEffect, useRef } from "react";
import "./ExitModal.css";

const BENEFITS = [
  "Full IT Infrastructure Audit ($497 value)",
  "Personalized Technology Roadmap",
  "Security Vulnerability Assessment",
  "Cost Optimization Recommendations",
];

export default function ExitModal() {
  const [visible, setVisible]     = useState(false);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef                  = useRef(null);

  useEffect(() => {
    // ── FIX 1: Clear sessionStorage gate during development ──
    // Remove the next line in production if you want once-per-session behaviour
    sessionStorage.removeItem("nw-exit-modal");

    const shown = sessionStorage.getItem("nw-exit-modal");
    if (shown) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem("nw-exit-modal", "true");
      setVisible(true);
    };

    // ── FIX 2: Reduced timer to 3 s so it's visible quickly ──
    const timer = setTimeout(trigger, 10000);

    // ── FIX 3: More reliable exit-intent detection ──
    const onMouseLeave = (e) => {
      if (e.clientY <= 5) trigger();   // slight tolerance for fast moves
    };

    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("em-locked", visible);
    return () => document.body.classList.remove("em-locked");
  }, [visible]);

  const close = () => setVisible(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      inputRef.current?.focus();
      return;
    }
    setSubmitted(true);
  };

  if (!visible) return null;

  return (
    <div className="em-backdrop" onClick={close}>
      <div
        className="em-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Free IT Audit Offer"
      >
        <button className="em-close" onClick={close} aria-label="Close">
          ✕
        </button>

        {submitted ? (
          <div className="em-success">
            <div className="em-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="em-success-title">You are Booked In!</h3>
            <p className="em-success-sub">
              Check your inbox. We will send a calendar link within 2 hours
              to schedule your free IT audit.
            </p>
            <button className="em-success-btn" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="em-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <div className="em-urgency-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Limited — 3 spots remaining this week
            </div>

            <h2 className="em-title">
              Wait! Get a Free IT Audit Before You Go
            </h2>

            <p className="em-sub">
              Our senior engineers will review your IT infrastructure and
              deliver an honest assessment. Free, no commitment required.
            </p>

            <div className="em-proof">
              <div className="em-proof-top">
                <div className="em-proof-left">
                  <div className="em-proof-avatars">
                    {["JH", "SO", "MB", "CS"].map((i) => (
                      <div key={i} className="em-proof-avatar">{i}</div>
                    ))}
                  </div>
                  <span className="em-proof-count">
                    <strong>140+ businesses</strong> booked this month
                  </span>
                </div>
              </div>
              <div className="em-proof-value">
                Total value: <strong>$497</strong> — Yours{" "}
                <strong className="em-free">FREE</strong>
              </div>
              <div className="em-bar-track">
                <div className="em-bar-fill" />
              </div>
            </div>

            {/* ── FIX 4: Replaced word "checkmark" with real ✓ SVG icon ── */}
            <div className="em-benefits-list">
              {BENEFITS.map((b) => (
                <div key={b} className="em-benefit-item">
                  <span className="em-benefit-check" aria-hidden="true">
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 6 5 10 11 2" />
                    </svg>
                  </span>
                  {b}
                </div>
              ))}
            </div>

            {/* ── FIX 5: Removed <form> wrapper — use onClick handler instead ── */}
            <div className="em-input-wrap">
              <input
                ref={inputRef}
                type="email"
                className="em-input"
                placeholder="Enter your work email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit(e)}
              />
            </div>
            <button className="em-cta" onClick={submit}>
              Claim My Free IT Audit
            </button>

            <p className="em-trust">
              No spam. No sales pressure. Unsubscribe anytime.
            </p>

            <button className="em-skip" onClick={close}>
              No thanks, I do not want a free audit
            </button>
          </>
        )}
      </div>
    </div>
  );
}