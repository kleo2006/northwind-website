import { useState, useEffect, useCallback, useRef, useId } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiShieldCheck, HiX, HiChevronDown } from "react-icons/hi";
import "./CookieConsent.css";

const STORAGE_KEY = "nw-cookie-consent";

const DEFAULT_PREFS = {
  essential: true,
  analytics: false,
  functional: false,
};

const PANEL_VARIANTS = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
};

const BANNER_VARIANTS = {
  hidden: { opacity: 0, y: 64, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: 64,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const closeRef = useRef(null);
  const panelId = useId();
  const manageBtnId = useId();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  // Escape key dismisses banner
  useEffect(() => {
    if (!visible) return;
    const handler = (e) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible]);

  // Move focus to close button when banner appears
  useEffect(() => {
    if (visible) closeRef.current?.focus();
  }, [visible]);

  const save = useCallback((data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setVisible(false);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const acceptAll = useCallback(
    () => save({ essential: true, analytics: true, functional: true }),
    [save]
  );

  const rejectAll = useCallback(
    () => save({ essential: true, analytics: false, functional: false }),
    [save]
  );

  const acceptSelected = useCallback(
    () => save(prefs),
    [save, prefs]
  );

  const togglePref = useCallback((key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="cc"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          aria-live="polite"
          variants={BANNER_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="cc__inner">
            {/* ---- LEFT ---- */}
            <div className="cc__left">
              <div className="cc__icon" aria-hidden="true">
                <HiShieldCheck size={22} />
              </div>

              <div className="cc__content">
                <h3 className="cc__title">We value your privacy</h3>
                <p className="cc__desc">
                  We use cookies to enhance your experience, analyze traffic,
                  and personalize content.{" "}
                  <Link to="/cookie-policy" className="cc__link">
                    Cookie Policy
                  </Link>{" "}
                  &middot;{" "}
                  <Link to="/privacy-policy" className="cc__link">
                    Privacy Policy
                  </Link>
                </p>

                {/* Manage preferences toggle */}
                <button
                  id={manageBtnId}
                  className={`cc__manage-btn${panelOpen ? " is-open" : ""}`}
                  onClick={() => setPanelOpen((o) => !o)}
                  aria-expanded={panelOpen}
                  aria-controls={panelId}
                >
                  <HiChevronDown className="cc__manage-chevron" aria-hidden="true" />
                  Manage preferences
                </button>

                {/* Collapsible preferences panel */}
                <AnimatePresence initial={false}>
                  {panelOpen && (
                    <motion.div
                      id={panelId}
                      className="cc__panel"
                      role="group"
                      aria-labelledby={manageBtnId}
                      variants={PANEL_VARIANTS}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <PrefRow
                        label="Essential"
                        description="Required for the site to function."
                        locked
                        checked
                      />
                      <PrefRow
                        label="Analytics"
                        description="Help us understand how visitors use the site."
                        checked={prefs.analytics}
                        onChange={() => togglePref("analytics")}
                      />
                      <PrefRow
                        label="Functional"
                        description="Remember your preferences and settings."
                        checked={prefs.functional}
                        onChange={() => togglePref("functional")}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ---- RIGHT ACTIONS ---- */}
            <div className="cc__actions">
              <button
                className="cc__btn cc__btn--ghost"
                onClick={rejectAll}
                aria-label="Reject all cookies"
              >
                Reject all
              </button>
              <button
                className="cc__btn cc__btn--outline"
                onClick={acceptSelected}
                aria-label="Accept selected cookies"
              >
                Accept selected
              </button>
              <button
                className="cc__btn cc__btn--primary"
                onClick={acceptAll}
                aria-label="Accept all cookies"
              >
                Accept all
              </button>
            </div>
          </div>

          {/* ---- CLOSE ---- */}
          <button
            ref={closeRef}
            className="cc__close"
            onClick={dismiss}
            aria-label="Close cookie banner"
          >
            <HiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---- Sub-component: preference row ---- */
function PrefRow({ label, description, checked, onChange, locked }) {
  const id = useId();
  return (
    <div className="cc__pref-row">
      <div className="cc__pref-text">
        <label htmlFor={id} className="cc__pref-label">
          {label}
          {locked && <span className="cc__pref-locked">Always on</span>}
        </label>
        <span className="cc__pref-desc">{description}</span>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label} cookies`}
        disabled={locked}
        className={`cc__toggle${checked ? " is-on" : ""}${locked ? " is-locked" : ""}`}
        onClick={locked ? undefined : onChange}
      >
        <span className="cc__toggle-thumb" />
      </button>
    </div>
  );
}