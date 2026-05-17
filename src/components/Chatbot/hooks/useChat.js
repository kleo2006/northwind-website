

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_CHAT_STATE,
  TYPING_DELAY_MS,
  TYPING_DELAY_VARIANCE_MS,
  WELCOME_MESSAGE,
} from "../constants";
import { getBotResponse } from "../chatbotResponses";
import { loadChatState, useChatPersistence } from "./useChatStorage";
import { useLeadCapture } from "../leads/useLeadCapture";
import { useHumanHandoff, HANDOFF_MODE } from "../handoff/useHumanHandoff";

/** @typedef {{ id: string, role: 'user' | 'bot', content: string, timestamp: string }} ChatMessage */

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** @returns {ChatMessage} */
function createMessage(role, content) {
  return { id: createId(), role, content, timestamp: new Date().toISOString() };
}

function typingDelay() {
  return TYPING_DELAY_MS + Math.random() * TYPING_DELAY_VARIANCE_MS;
}

// ─────────────────────────────────────────────────────────────
// Step 6 — AI backend call
// Sends conversation history to /api/chat → OpenAI → response.
// Falls back to predefined getBotResponse if AI call fails.
// ─────────────────────────────────────────────────────────────
async function fetchAIResponse(messages) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL ?? ""}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return data.reply ?? null;
  } catch (err) {
    console.warn("[useChat] AI fetch failed, using fallback:", err);
    return null;
  }
}

export function useChat() {
  const [state, setState] = useState(() => {
    const stored = loadChatState();
    const messages =
      stored.messages.length > 0
        ? stored.messages
        : [createMessage("bot", WELCOME_MESSAGE)];

    const unreadCount =
      stored.hasInteracted || stored.messages.length > 0
        ? stored.unreadCount
        : 1;

    return {
      ...DEFAULT_CHAT_STATE,
      messages,
      unreadCount,
      hasInteracted: stored.hasInteracted,
    };
  });

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  useChatPersistence(state, setState);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    if (state.isOpen && !state.isMinimized) scrollToBottom();
  }, [state.messages, state.isOpen, state.isMinimized, isTyping, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // addBotMessage
  // Used by Steps 4 & 5 to inject bot messages directly into
  // chat without going through getBotResponse or the AI.
  // ─────────────────────────────────────────────────────────────
  const addBotMessage = useCallback((content) => {
    const botMessage = createMessage("bot", content);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      unreadCount: prev.isOpen && !prev.isMinimized ? 0 : prev.unreadCount + 1,
      hasInteracted: true,
    }));
  }, []);

  // ─────────────────────────────────────────────────────────────
  // addBotReply
  // Called after every normal user message.
  // Tries AI first, falls back to predefined if AI fails.
  // ─────────────────────────────────────────────────────────────
  const addBotReply = useCallback((userText, quickReplyId, currentMessages) => {
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(async () => {
      // Send last 10 messages as context to OpenAI
      const history = currentMessages.slice(-10).map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      }));
      history.push({ role: "user", content: userText });

      const aiReply = await fetchAIResponse(history);
      const reply = aiReply ?? getBotResponse(userText, quickReplyId);
      const botMessage = createMessage("bot", reply);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        unreadCount: prev.isOpen && !prev.isMinimized ? 0 : prev.unreadCount + 1,
        hasInteracted: true,
      }));

      setIsTyping(false);
    }, typingDelay());
  }, []);

  const sendUserMessage = useCallback(
    (text, quickReplyId) => {
      const trimmed = text.trim();
      if (!trimmed && !quickReplyId) return;

      const displayText = trimmed || text;
      const userMessage = createMessage("user", displayText);

      setState((prev) => {
        const updatedMessages = [...prev.messages, userMessage];
        addBotReply(displayText, quickReplyId, updatedMessages);
        return {
          ...prev,
          messages: updatedMessages,
          unreadCount: 0,
          hasInteracted: true,
        };
      });
    },
    [addBotReply]
  );

  // ─────────────────────────────────────────────────────────────
  // Step 4 — Lead Capture
  // Triggered by "consultation" quick reply ID (matches constants.js)
  // ─────────────────────────────────────────────────────────────
  const leadCapture = useLeadCapture({
    onBotMessage: addBotMessage,
    onLeadCaptured: (lead) => {
      console.info("[Chatbot] Lead captured:", lead);
    },
  });

  // ─────────────────────────────────────────────────────────────
  // Step 5 — Human Handoff
  // Triggered by "human" or "contact" quick reply IDs (matches constants.js)
  // ─────────────────────────────────────────────────────────────
  const humanHandoff = useHumanHandoff({
    defaultMode: HANDOFF_MODE.FORM,
    bookingUrl: "/contact",
    onBotMessage: addBotMessage,
    onFormSubmit: (formData) => {
      console.info("[Chatbot] Contact form submitted:", formData);
    },
  });

  // ─────────────────────────────────────────────────────────────
  // Quick reply routing
  // IDs match QUICK_REPLIES in constants.js exactly:
  //   "consultation" → lead capture (Step 4)
  //   "human"        → handoff modal (Step 5)
  //   "contact"      → handoff modal (Step 5)
  //   everything else → normal AI / predefined response
  // ─────────────────────────────────────────────────────────────
  const handleQuickReply = useCallback(
    (id, label) => {
      switch (id) {
        case "consultation":
          leadCapture.startCapture();
          break;

        case "human":
        case "contact":
          humanHandoff.openHandoff(HANDOFF_MODE.FORM);
          break;

        default:
          sendUserMessage(label, id);
          break;
      }
    },
    [leadCapture, humanHandoff, sendUserMessage]
  );

  // ─────────────────────────────────────────────────────────────
  // Window controls (unchanged from original)
  // ─────────────────────────────────────────────────────────────
  const openChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true, isMinimized: false, unreadCount: 0 }));
  }, []);

  const closeChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false, isMinimized: false }));
  }, []);

  const minimizeChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true, isMinimized: true }));
  }, []);

  const restoreChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true, isMinimized: false, unreadCount: 0 }));
  }, []);

  const toggleChat = useCallback(() => {
    setState((prev) => {
      if (prev.isOpen && prev.isMinimized) return { ...prev, isMinimized: false, unreadCount: 0 };
      if (prev.isOpen && !prev.isMinimized) return { ...prev, isOpen: false, isMinimized: false };
      return { ...prev, isOpen: true, isMinimized: false, unreadCount: 0 };
    });
  }, []);

  return {
    // Core (Steps 1–3)
    messages: state.messages,
    isOpen: state.isOpen,
    isMinimized: state.isMinimized,
    unreadCount: state.unreadCount,
    isTyping,
    messagesEndRef,
    sendUserMessage,
    handleQuickReply,
    openChat,
    closeChat,
    minimizeChat,
    restoreChat,
    toggleChat,

    // Step 4 — Lead Capture
    isCapturing: leadCapture.isCapturing,
    currentStep: leadCapture.currentStep,
    currentPrompt: leadCapture.currentPrompt,
    currentPlaceholder: leadCapture.currentPlaceholder,
    stepError: leadCapture.stepError,
    stepProgress: leadCapture.stepProgress,
    capturedLead: leadCapture.capturedLead,
    onLeadStepSubmit: leadCapture.submitStep,
    onLeadCancel: leadCapture.cancelCapture,

    // Step 5 — Human Handoff
    isHandoffOpen: humanHandoff.isHandoffOpen,
    handoffMode: humanHandoff.handoffMode,
    handoffIsSubmitting: humanHandoff.isSubmitting,
    handoffSubmitSuccess: humanHandoff.submitSuccess,
    handoffSubmitError: humanHandoff.submitError,
    onHandoffClose: humanHandoff.closeHandoff,
    onHandoffSubmit: humanHandoff.submitContactForm,
  };
}