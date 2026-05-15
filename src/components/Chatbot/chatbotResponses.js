/** @typedef {{ keywords: string[], reply: string }} FaqEntry */

/** @type {Record<string, string>} */
export const QUICK_REPLY_RESPONSES = {
  consultation:
    "We'd be glad to schedule a consultation. Share your goals and timeline at /contact, or email hello@northwind.io — we typically respond within 2 hours on business days.",
  audits:
    "Our IT audits review infrastructure, security posture, compliance gaps, and operational efficiency. You receive a prioritized roadmap with clear risk levels and quick wins. Most engagements start with a discovery call — would you like to book one?",
  pricing:
    "NorthWind offers transparent Starter, Professional, and Enterprise plans, plus custom scopes for audits and infrastructure projects. Visit /pricing for plan details, or tell us your environment size and we'll recommend the right fit.",
  contact:
    "Reach our team at hello@northwind.io or through the contact form at /contact. For urgent matters, include your company name and the systems affected so we can route you quickly.",
  human:
    "You can connect with a NorthWind consultant via our contact form at /contact. Live agent handoff will be available in a future update — for now, we'll make sure the right specialist follows up promptly.",
};

/** @type {FaqEntry[]} */
const FAQ_ENTRIES = [
  {
    keywords: ["audit", "audits", "assessment", "review"],
    reply:
      "NorthWind IT audits uncover hidden risks, compliance gaps, and inefficiencies across your stack. We deliver executive summaries plus technical remediation priorities. Ask about a scoped audit or full infrastructure review.",
  },
  {
    keywords: ["infrastructure", "optimize", "optimization", "performance", "server", "network"],
    reply:
      "We optimize infrastructure for reliability, cost, and performance — including cloud migrations, capacity planning, monitoring, and automation. Tell us if you're on-prem, hybrid, or cloud-first and we'll outline next steps.",
  },
  {
    keywords: ["security", "cyber", "vulnerability", "penetration", "compliance", "soc"],
    reply:
      "Our security assessments cover access controls, endpoint posture, backup integrity, and policy alignment. We help you reduce exposure with practical, business-prioritized fixes — not checkbox-only reports.",
  },
  {
    keywords: ["price", "pricing", "cost", "plan", "quote", "budget"],
    reply:
      "Pricing depends on scope — managed support plans, audit depth, and infrastructure size. See /pricing for packages, or describe your environment and we'll suggest a proportionate engagement.",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "support"],
    reply:
      "Contact us at hello@northwind.io or /contact. Include your company name and primary IT challenge so we can assign the right consultant.",
  },
  {
    keywords: ["schedule", "book", "consultation", "meeting", "call", "appointment"],
    reply:
      "Book a consultation at /contact — select your preferred time window and brief context. Our team will confirm and prepare tailored talking points for your environment.",
  },
  {
    keywords: ["service", "services", "consulting", "what do you", "offer", "do you do"],
    reply:
      "NorthWind provides IT consulting, IT audits, infrastructure optimization, security assessments, and business technology strategy — focused on reducing risk and improving operational visibility.",
  },
  {
    keywords: ["cloud", "azure", "aws", "migration"],
    reply:
      "We design and execute cloud migrations with security, cost governance, and minimal downtime. Whether you're lifting workloads or modernizing apps, we align architecture to your business goals.",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    reply:
      "Hello! I'm NorthWind's virtual IT consultant. Ask about audits, infrastructure, security, pricing, or use the quick options below.",
  },
];

const FALLBACK_RESPONSE =
  "I don't have a specific answer for that yet. Try one of the quick options below, ask about IT audits, infrastructure, security, or pricing — or visit /contact to speak with our team.";

/**
 * @param {string} userText
 * @param {string} [quickReplyId]
 * @returns {string}
 */
export function getBotResponse(userText, quickReplyId) {
  if (quickReplyId && QUICK_REPLY_RESPONSES[quickReplyId]) {
    return QUICK_REPLY_RESPONSES[quickReplyId];
  }

  const normalized = userText.toLowerCase().trim();
  if (!normalized) {
    return "Please type a message or choose one of the options below.";
  }

  for (const entry of FAQ_ENTRIES) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return entry.reply;
    }
  }

  return FALLBACK_RESPONSE;
}
