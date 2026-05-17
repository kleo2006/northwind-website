

import { useState, useCallback } from "react";

export const HANDOFF_MODE = Object.freeze({
  FORM: "form",
  BOOKING: "booking",
  LIVECHAT: "livechat",
});

export function useHumanHandoff({
  defaultMode = HANDOFF_MODE.FORM,
  bookingUrl = "/book-consultation",
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
        // Replace with your actual API endpoint
        // await fetch("/api/contact", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(formData),
        // });

        // Simulated delay
        await new Promise((r) => setTimeout(r, 1200));

        setSubmitSuccess(true);
        setIsSubmitting(false);

        onFormSubmit?.(formData);

        onBotMessage?.(
          `Thank you, ${formData.name}. Your message has been received. A NorthWind consultant will contact you at ${formData.email} within one business day.`
        );
      } catch (err) {
        console.error("[useHumanHandoff] Form submission failed:", err);
        setSubmitError(
          "We could not send your message. Please email us directly at hello@northwind.consulting."
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
