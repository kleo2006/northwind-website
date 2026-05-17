

import { useState, useCallback, useRef } from "react";
import { saveLead, getSessionLead, pushLeadToCRM } from "./leadStorage";

const CAPTURE_STEPS = ["name", "email", "company", "challenge"];

const STEP_PROMPTS = {
  name: "Before we continue, may I get your name?",
  email: "Great! And what's the best email address to reach you?",
  company: "What company are you with?",
  challenge: "Lastly — what's your main IT challenge right now? (e.g. security gaps, slow infrastructure, compliance needs)",
};

const STEP_PLACEHOLDERS = {
  name: "Your full name",
  email: "you@company.com",
  company: "Your company name",
  challenge: "Describe your IT challenge...",
};

const STEP_VALIDATION = {
  name: (v) => v.trim().length >= 2 || "Please enter at least 2 characters.",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
  company: (v) => v.trim().length >= 2 || "Please enter your company name.",
  challenge: (v) => v.trim().length >= 5 || "Please describe your challenge briefly.",
};

export function useLeadCapture({ onBotMessage, onLeadCaptured } = {}) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [leadData, setLeadData] = useState({});
  const [stepError, setStepError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [capturedLead, setCapturedLead] = useState(() => getSessionLead());

  const stepIndexRef = useRef(0);

  const startCapture = useCallback(() => {
    if (capturedLead) {
      onBotMessage?.(
        `Welcome back, ${capturedLead.name}. How can NorthWind assist you further?`
      );
      return;
    }

    stepIndexRef.current = 0;
    const firstStep = CAPTURE_STEPS[0];

    setIsCapturing(true);
    setCurrentStep(firstStep);
    setLeadData({});
    setStepError("");
    setIsComplete(false);

    onBotMessage?.(STEP_PROMPTS[firstStep]);
  }, [capturedLead, onBotMessage]);

  const submitStep = useCallback(
    (value) => {
      if (!isCapturing || !currentStep) return;

      const validation = STEP_VALIDATION[currentStep];
      const result = validation(value);

      if (result !== true) {
        setStepError(result);
        return false;
      }

      setStepError("");

      const updatedData = { ...leadData, [currentStep]: value.trim() };
      setLeadData(updatedData);

      const nextIndex = stepIndexRef.current + 1;

      if (nextIndex < CAPTURE_STEPS.length) {
        stepIndexRef.current = nextIndex;
        const nextStep = CAPTURE_STEPS[nextIndex];
        setCurrentStep(nextStep);
        onBotMessage?.(STEP_PROMPTS[nextStep]);
      } else {
        completeLead(updatedData);
      }

      return true;
    },
    [isCapturing, currentStep, leadData, onBotMessage]
  );

  const completeLead = useCallback(
    async (data) => {
      try {
        const saved = saveLead(data);
        await pushLeadToCRM(saved);

        setCapturedLead(saved);
        setIsCapturing(false);
        setCurrentStep(null);
        setIsComplete(true);

        onBotMessage?.(
          `Thank you, ${saved.name}! A NorthWind consultant will be in touch at ${saved.email} shortly. In the meantime, feel free to ask me anything else about our services.`
        );

        onLeadCaptured?.(saved);
      } catch (err) {
        console.error("[useLeadCapture] Failed to save lead:", err);
        onBotMessage?.(
          "I encountered an issue saving your details. Please try again or contact us directly at hello@northwind.consulting."
        );
        setIsCapturing(false);
        setCurrentStep(null);
      }
    },
    [onBotMessage, onLeadCaptured]
  );

  const cancelCapture = useCallback(() => {
    setIsCapturing(false);
    setCurrentStep(null);
    setLeadData({});
    setStepError("");
    stepIndexRef.current = 0;
    onBotMessage?.("No problem. Feel free to ask me anything else.");
  }, [onBotMessage]);

  return {
    isCapturing,
    currentStep,
    leadData,
    stepError,
    isComplete,
    capturedLead,
    currentPrompt: currentStep ? STEP_PROMPTS[currentStep] : null,
    currentPlaceholder: currentStep ? STEP_PLACEHOLDERS[currentStep] : null,
    stepProgress: currentStep
      ? { current: stepIndexRef.current + 1, total: CAPTURE_STEPS.length }
      : null,
    startCapture,
    submitStep,
    cancelCapture,
  };
}
