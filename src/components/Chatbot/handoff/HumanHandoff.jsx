// src/components/chatbot/handoff/HumanHandoff.jsx

import React, { useEffect, useRef } from "react";
import ContactForm from "./Contact";
import { HANDOFF_MODE } from "./useHumanHandoff";
import "./HumanHandoff.css";

export default function HumanHandoff({
  isOpen,
  mode,
  isSubmitting,
  submitSuccess,
  submitError,
  onClose,
  onSubmit,
  prefilledData = {},
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) modalRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="nw-handoff__backdrop" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="nw-handoff__modal"
        role="dialog"
        aria-modal="true"
        aria-label="Contact NorthWind"
      >
        {/* Header */}
        <div className="nw-handoff__header">
          <div className="nw-handoff__header-left">
            <div className="nw-handoff__avatar">N</div>
            <div>
              <p className="nw-handoff__title">
                {mode === HANDOFF_MODE.FORM && "Talk to Our Team"}
                {mode === HANDOFF_MODE.BOOKING && "Book a Consultation"}
                {mode === HANDOFF_MODE.LIVECHAT && "Live Support"}
              </p>
              <p className="nw-handoff__subtitle">
                <span className="nw-handoff__status-dot" />
                Typically responds within 2 hours
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="nw-handoff__close"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Divider line */}
        <div className="nw-handoff__divider" />

        {/* Content */}
        <div className="nw-handoff__body">
          {mode === HANDOFF_MODE.FORM && (
            <>
              {submitSuccess ? (
                <div className="nw-handoff__success">
                  <div className="nw-handoff__success-icon">✓</div>
                  <p className="nw-handoff__success-title">Message Sent</p>
                  <p className="nw-handoff__success-sub">
                    A NorthWind consultant will be in touch shortly.
                  </p>
                </div>
              ) : (
                <ContactForm
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  error={submitError}
                  prefilledData={prefilledData}
                />
              )}
            </>
          )}

          {mode === HANDOFF_MODE.LIVECHAT && (
            <div className="nw-handoff__coming-soon">
              <p>Live chat support is coming soon.</p>
              <p>Please use the contact form for now.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}