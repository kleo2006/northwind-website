import { useCallback, useEffect, useRef } from "react";
import { DEFAULT_CHAT_STATE, STORAGE_KEY } from "../constants";

/**
 * @param {typeof DEFAULT_CHAT_STATE} state
 * @returns {typeof DEFAULT_CHAT_STATE}
 */
function parseStoredState(state) {
  if (!state || typeof state !== "object") return DEFAULT_CHAT_STATE;

  return {
    messages: Array.isArray(state.messages) ? state.messages : [],
    isOpen: false,
    isMinimized: false,
    unreadCount: typeof state.unreadCount === "number" ? state.unreadCount : 0,
    hasInteracted: Boolean(state.hasInteracted),
  };
}

/**
 * @returns {typeof DEFAULT_CHAT_STATE}
 */
export function loadChatState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CHAT_STATE };
    return parseStoredState(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_CHAT_STATE };
  }
}

/**
 * @param {typeof DEFAULT_CHAT_STATE} state
 */
export function saveChatState(state) {
  try {
    const payload = {
      messages: state.messages,
      unreadCount: state.unreadCount,
      hasInteracted: state.hasInteracted,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* storage full or private mode */
  }
}

/**
 * @param {typeof DEFAULT_CHAT_STATE} state
 * @param {(value: typeof DEFAULT_CHAT_STATE) => void} setState
 */
export function useChatPersistence(state, setState) {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    saveChatState(state);
  }, [state.messages, state.unreadCount, state.hasInteracted]);

  const hydrate = useCallback(() => {
    const stored = loadChatState();
    setState((prev) => ({
      ...prev,
      messages: stored.messages,
      unreadCount: stored.unreadCount,
      hasInteracted: stored.hasInteracted,
    }));
  }, [setState]);

  return { hydrate };
}