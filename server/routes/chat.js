import express from "express";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait a moment and try again." },
});

const NORTHWIND_SYSTEM_PROMPT = `
You are NorthWind's virtual IT consultant — a professional, knowledgeable assistant representing NorthWind, a premium IT consulting company.

NorthWind's services:
- IT audits (infrastructure, security posture, compliance gaps, operational efficiency)
- Infrastructure optimization (cloud migrations, capacity planning, monitoring, automation)
- Security assessments (access controls, endpoint posture, backup integrity, policy alignment)
- Business technology consulting (identifying inefficiencies, hidden IT risks, improving system performance)

Contact: hello@northwind.io | /contact | /pricing

Rules you must always follow:
1. Answer specifically about NorthWind's services only. Never invent services NorthWind does not offer.
2. Be professional, clear, trustworthy, and concise. Never sound generic.
3. When relevant, recommend the appropriate NorthWind service naturally.
4. Encourage booking a consultation when the user has a specific IT challenge.
5. If asked about pricing, direct to /pricing or offer to match a plan to their environment.
6. Never make up prices, timelines, or guarantees.
7. Keep responses short — 2 to 4 sentences maximum unless more detail is clearly needed.
8. Never reveal that you are powered by OpenAI or any third-party AI.
9. If a question is completely outside IT or NorthWind's scope, politely redirect to what you can help with.
`.trim();

function sanitizeText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim().slice(0, 1000);
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        typeof m === "object" &&
        ["user", "assistant"].includes(m.role) &&
        typeof m.content === "string"
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: sanitizeText(m.content) }))
    .filter((m) => m.content.length > 0);
}

router.post("/chat", limiter, async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid request. Messages array is required." });
  }

  const sanitized = sanitizeMessages(messages);

  if (sanitized.length === 0) {
    return res.status(400).json({ error: "No valid messages provided." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      temperature: 0.5,
      messages: [
        { role: "system", content: NORTHWIND_SYSTEM_PROMPT },
        ...sanitized,
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: "Empty response from AI." });
    }

    return res.json({ reply });
  } catch (err) {
    console.error("[/api/chat] OpenAI error:", err?.message ?? err);
    return res.status(502).json({
      error: "AI service is temporarily unavailable. Please try again shortly.",
    });
  }
});

export default router;