import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_CHAT_STATE,
  TYPING_DELAY_MS,
  TYPING_DELAY_VARIANCE_MS,
  WELCOME_MESSAGE,
} from "../constants";
import { getBotResponse } from "../chatbotResponses";
import { loadChatState, useChatPersistence } from "./useChatStorage";

/** @typedef {{ id: string, role: 'user' | 'bot', content: string, timestamp: string }} ChatMessage */

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** @returns {ChatMessage} */
function createMessage(role, content) {
  return {
    id: createId(),
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

function typingDelay() {
  return TYPING_DELAY_MS + Math.random() * TYPING_DELAY_VARIANCE_MS;
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
    if (state.isOpen && !state.isMinimized) {
      scrollToBottom();
    }
  }, [state.messages, state.isOpen, state.isMinimized, isTyping, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const addBotReply = useCallback((userText, quickReplyId) => {
    setIsTyping(true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      const reply = getBotResponse(userText, quickReplyId);
      const botMessage = createMessage("bot", reply);

      setState((prev) => {
        const nextUnread = prev.isOpen && !prev.isMinimized ? 0 : prev.unreadCount + 1;
        return {
          ...prev,
          messages: [...prev.messages, botMessage],
          unreadCount: nextUnread,
          hasInteracted: true,
        };
      });

      setIsTyping(false);
    }, typingDelay());
  }, []);

  const sendUserMessage = useCallback(
    (text, quickReplyId) => {
      const trimmed = text.trim();
      if (!trimmed && !quickReplyId) return;

      const displayText = trimmed || text;
      const userMessage = createMessage("user", displayText);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        unreadCount: 0,
        hasInteracted: true,
      }));

      addBotReply(displayText, quickReplyId);
    },
    [addBotReply]
  );

  const openChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      isMinimized: false,
      unreadCount: 0,
    }));
  }, []);

  const closeChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      isMinimized: false,
    }));
  }, []);

  const minimizeChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      isMinimized: true,
    }));
  }, []);

  const restoreChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      isMinimized: false,
      unreadCount: 0,
    }));
  }, []);

  const toggleChat = useCallback(() => {
    setState((prev) => {
      if (prev.isOpen && prev.isMinimized) {
        return { ...prev, isMinimized: false, unreadCount: 0 };
      }
      if (prev.isOpen && !prev.isMinimized) {
        return { ...prev, isOpen: false, isMinimized: false };
      }
      return {
        ...prev,
        isOpen: true,
        isMinimized: false,
        unreadCount: 0,
      };
    });
  }, []);

  return {
    messages: state.messages,
    isOpen: state.isOpen,
    isMinimized: state.isMinimized,
    unreadCount: state.unreadCount,
    isTyping,
    messagesEndRef,
    sendUserMessage,
    openChat,
    closeChat,
    minimizeChat,
    restoreChat,
    toggleChat,
  };
}
