// src/components/chatbot/handoff/HumanHandoff.jsx

import React, { useEffect, useRef } from "react";
import ContactForm from "./Contact";
import { HANDOFF_MODE } from "./useHumanHandoff";

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
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 999,
        }}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          width: "360px",
          maxHeight: "500px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
            {mode === HANDOFF_MODE.FORM && "Contact NorthWind"}
            {mode === HANDOFF_MODE.BOOKING && "Booking..."}
            {mode === HANDOFF_MODE.LIVECHAT && "Live Chat"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              padding: "0",
              color: "#666",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "16px", overflowY: "auto", flex: 1 }}>
          {mode === HANDOFF_MODE.FORM && (
            <>
              {submitSuccess ? (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "#e8f5e9",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "14px", color: "#2e7d32", fontWeight: "500" }}>
                    ✓ Message sent successfully!
                  </div>
                  <div style={{ fontSize: "12px", color: "#558b2f", marginTop: "8px" }}>
                    A consultant will be in touch shortly.
                  </div>
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
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Live chat support is coming soon. For now, please fill out the contact form.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          [role="dialog"] {
            width: calc(100% - 20px) !important;
            bottom: 80px !important;
            right: 10px !important;
          }
        }
      `}</style>
    </>
  );
}
