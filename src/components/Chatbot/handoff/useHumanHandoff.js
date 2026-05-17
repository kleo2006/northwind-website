

import { useState, useCallback } from "react";

export const HANDOFF_MODE = Object.freeze({
  FORM: "form",
  BOOKING: "booking",
  LIVECHAT: "livechat",
});

const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID;
const HUBSPOT_ENDPOINT =
  PORTAL_ID && FORM_ID
    ? `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`
    : null;

async function submitToHubSpot(formData) {
  if (!HUBSPOT_ENDPOINT) {
    throw new Error("HubSpot credentials are not configured.");
  }

  const name = (formData.name || "").trim();
  const nameParts = name.split(/\s+/);
  const firstname = nameParts[0] || name;
  const lastname = nameParts.slice(1).join(" ") || "-";

  const payload = {
    fields: [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "email", value: (formData.email || "").trim() },
      { name: "company", value: (formData.company || "").trim() },
      {
        name: "message",
        value: [formData.subject, formData.message].filter(Boolean).join(" — ").trim(),
      },
    ],
    context: {
      pageUri: window.location.href,
      pageName: "NorthWind Chatbot — Talk to a Human",
    },
  };

  const response = await fetch(HUBSPOT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let details = "";
    try {
      const err = await response.json();
      details = err?.message || "";
      console.error("[HubSpot] Submission error:", err);
    } catch {
      // no-op
    }
    throw new Error(details || "HubSpot submission failed.");
  }
}

export function useHumanHandoff({
  defaultMode = HANDOFF_MODE.FORM,
  bookingUrl = "/contact",
  onBotMessage,
  onFormSubmit,
} = {}) {
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [handoffMode, setHandoffMode] = useState(defaultMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const openHandoff = useCallback(
    (mode = defaultMode) => {
      setHandoffMode(mode);
      setSubmitSuccess(false);
      setSubmitError("");

      if (mode === HANDOFF_MODE.BOOKING) {
        onBotMessage?.(
          "I'm redirecting you to our consultation booking page. Our team looks forward to speaking with you."
        );
        setTimeout(() => {
          window.open(bookingUrl, "_blank", "noopener,noreferrer");
        }, 800);
        return;
      }

      if (mode === HANDOFF_MODE.LIVECHAT) {
        onBotMessage?.(
          "Connecting you to a NorthWind consultant. Please hold on — this feature will be available shortly."
        );
        setIsHandoffOpen(true);
        return;
      }

      onBotMessage?.(
        "I'm opening a contact form for you. Fill in your details and a NorthWind consultant will reach out within one business day."
      );
      setIsHandoffOpen(true);
    },
    [defaultMode, bookingUrl, onBotMessage]
  );

  const closeHandoff = useCallback(() => {
    setIsHandoffOpen(false);
    setSubmitSuccess(false);
    setSubmitError("");
    setIsSubmitting(false);
  }, []);

  const submitContactForm = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        await submitToHubSpot(formData);

        setSubmitSuccess(true);
        setIsSubmitting(false);

        onFormSubmit?.(formData);

        onBotMessage?.(
          `Thank you, ${formData.name}. Your message has been received. A NorthWind consultant will contact you at ${formData.email} within one business day.`
        );
      } catch (err) {
        console.error("[useHumanHandoff] Submission failed:", err);
        setSubmitError(
          err?.message ||
            "We could not send your message. Please email us directly at contact@northwind.io."
        );
        setIsSubmitting(false);
      }
    },
    [onBotMessage, onFormSubmit]
  );

  return {
    isHandoffOpen,
    handoffMode,
    isSubmitting,
    submitSuccess,
    submitError,
    openHandoff,
    closeHandoff,
    submitContactForm,
    HANDOFF_MODE,
  };
}