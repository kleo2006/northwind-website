

const LEADS_KEY = "northwind_chatbot_leads";
const SESSION_LEAD_KEY = "northwind_session_lead";

export function saveLead(lead) {
  if (!lead || typeof lead !== "object") {
    throw new Error("[LeadStorage] Invalid lead object.");
  }

  const sanitized = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: sanitizeField(lead.name),
    email: sanitizeField(lead.email),
    company: sanitizeField(lead.company),
    challenge: sanitizeField(lead.challenge),
    capturedAt: new Date().toISOString(),
    source: "chatbot",
  };

  if (sanitized.email && !isValidEmail(sanitized.email)) {
    throw new Error("[LeadStorage] Invalid email format.");
  }

  const existing = getAllLeads();
  existing.push(sanitized);

  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(existing));
    sessionStorage.setItem(SESSION_LEAD_KEY, JSON.stringify(sanitized));
  } catch {
    console.warn("[LeadStorage] Storage quota exceeded or unavailable.");
  }

  return sanitized;
}

export function getAllLeads() {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getSessionLead() {
  try {
    const raw = sessionStorage.getItem(SESSION_LEAD_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearLeads() {
  localStorage.removeItem(LEADS_KEY);
  sessionStorage.removeItem(SESSION_LEAD_KEY);
}

export function exportLeadsAsJSON() {
  return JSON.stringify(getAllLeads(), null, 2);
}

export async function pushLeadToCRM(lead) {
  // Placeholder for future CRM integration
  // const CRM_WEBHOOK_URL = process.env.REACT_APP_CRM_WEBHOOK_URL;
  // if (!CRM_WEBHOOK_URL) return;
  // try {
  //   await fetch(CRM_WEBHOOK_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(lead),
  //   });
  // } catch (err) {
  //   console.error("[LeadStorage] CRM push failed:", err);
  // }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function sanitizeField(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/<[^>]*>/g, "").slice(0, 500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}