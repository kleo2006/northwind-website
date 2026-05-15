export const STORAGE_KEY = "northwind-chat";

export const WELCOME_MESSAGE =
  "Hi, welcome to NorthWind. How can we help optimize your IT today?";

export const TYPING_DELAY_MS = 900;
export const TYPING_DELAY_VARIANCE_MS = 600;

/** @typedef {{ id: string, label: string }} QuickReply */

/** @type {QuickReply[]} */
export const QUICK_REPLIES = [
  { id: "consultation", label: "Book a consultation" },
  { id: "audits", label: "Learn about IT audits" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact support" },
  { id: "human", label: "Talk to a human" },
];

export const DEFAULT_CHAT_STATE = {
  messages: [],
  isOpen: false,
  isMinimized: false,
  unreadCount: 0,
  hasInteracted: false,
};
