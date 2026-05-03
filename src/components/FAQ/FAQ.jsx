import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiPlus, HiMinus, HiChat, HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./FAQ.css";

const CATEGORIES = [
  { id: "all",      label: "All Questions" },
  { id: "services", label: "Services"      },
  { id: "pricing",  label: "Pricing"       },
  { id: "process",  label: "Our Process"   },
  { id: "support",  label: "Support"       },
];

const FAQS = [
  {
    id: 1,
    category: "services",
    question: "What IT services does NorthWind provide?",
    answer: "NorthWind provides end-to-end IT services including cloud migration and management, cybersecurity, custom software development, managed IT support, data analytics, and strategic IT consulting. Whether you need a single specialist or a full outsourced IT department, we have the expertise to deliver.",
  },
  {
    id: 2,
    category: "services",
    question: "Do you work with businesses outside Albania?",
    answer: "Yes — our team works with clients across Europe and North America. All of our services are available remotely, and we have experience managing infrastructure and teams across multiple time zones. Distance has never been a barrier to delivering great results.",
  },
  {
    id: 3,
    category: "services",
    question: "Can you handle both short-term projects and long-term engagements?",
    answer: "Absolutely. We work with clients on everything from a focused two-week security audit to multi-year managed IT partnerships. We'll recommend the engagement model that makes the most sense for your situation — and we're always transparent about what that looks like before you commit.",
  },
  {
    id: 4,
    category: "pricing",
    question: "How much does IT consulting cost?",
    answer: "Our pricing depends on the scope and type of engagement. Managed IT support starts at $499/month for small teams. Project-based work is scoped and quoted individually. We offer a free 30-minute consultation where we can give you a realistic estimate based on your specific needs — no commitment required.",
  },
  {
    id: 5,
    category: "pricing",
    question: "Are there any hidden fees or long-term lock-in contracts?",
    answer: "Never. We believe in complete transparency. Every engagement comes with a clear scope of work and fixed pricing. Our managed support plans are month-to-month — you can scale up, scale down, or leave at any time. We earn your business every month by delivering results.",
  },
  {
    id: 6,
    category: "pricing",
    question: "Do you offer a free trial or consultation?",
    answer: "Yes — we offer a free 30-minute IT consultation for every new prospective client. In that session we'll review your current setup, identify your biggest pain points, and give you honest recommendations — whether or not you choose to work with us. No sales pressure, just value.",
  },
  {
    id: 7,
    category: "process",
    question: "What does the onboarding process look like?",
    answer: "We start with a discovery session to understand your infrastructure, team, and goals. From there we produce a detailed audit and roadmap. Once you approve the plan, we begin implementation in carefully sequenced phases — always with clear milestones and regular check-ins. Most clients are fully onboarded within 2–4 weeks.",
  },
  {
    id: 8,
    category: "process",
    question: "How do you handle data security during a migration or project?",
    answer: "Security is embedded in everything we do — not bolted on at the end. All data transfers are encrypted, access is controlled on a need-to-know basis, and we document every change we make to your environment. For regulated industries, we follow the relevant compliance frameworks (GDPR, SOC 2, HIPAA) throughout.",
  },
  {
    id: 9,
    category: "process",
    question: "Will there be any downtime during a migration or upgrade?",
    answer: "We plan every migration specifically to minimize downtime — and in most cases, we achieve zero downtime by running parallel environments and doing a controlled cutover. Where some downtime is unavoidable, we schedule it during off-hours and communicate clearly in advance.",
  },
  {
    id: 10,
    category: "support",
    question: "What does 24/7 IT support actually mean?",
    answer: "It means a real engineer is available around the clock — not just a chatbot or an answering service. Our average first response time is under 2 minutes for critical issues. We have dedicated triage engineers monitoring our queue at all hours, with intelligent routing to ensure the right specialist handles your ticket.",
  },
  {
    id: 11,
    category: "support",
    question: "How quickly do you resolve IT issues?",
    answer: "It depends on complexity, but our average resolution time is 28 minutes for standard issues. We track first-call resolution rate, average handle time, and client satisfaction scores for every ticket — and we share those metrics with you monthly. You always know exactly how we're performing.",
  },
  {
    id: 12,
    category: "support",
    question: "Can you take over IT support from our existing provider?",
    answer: "Yes, and we do this regularly. We have a proven transition process that ensures continuity — your team won't experience any disruption during the handover. We'll conduct a full audit of your existing setup, document everything, and be fully up to speed before we take the reins.",
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState(1);

  const filtered = activeCategory === "all"
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="faq section" id="faq">
      <div className="container">

        {/* Header */}
        <motion.div
          className="faq__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="faq__eyebrow">Got Questions?</div>
          <h2 className="faq__title">
            Everything You Need <span className="accent">To Know</span>
          </h2>
          <p className="faq__sub">
            We've answered the questions we hear most often. If you don't
            find what you're looking for, our team is one message away.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="faq__layout">

          {/* Left — Categories + CTA */}
          <motion.div
            className="faq__sidebar"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="faq__categories">
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  className={"faq__cat-btn " + (activeCategory === id ? "faq__cat-btn--active" : "")}
                  onClick={() => {
                    setActiveCategory(id);
                    setOpenId(null);
                  }}
                >
                  {label}
                  <span className="faq__cat-count">
                    {id === "all" ? FAQS.length : FAQS.filter((f) => f.category === id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Card */}
            <div className="faq__cta-card">
              <div className="faq__cta-icon">
                <HiChat />
              </div>
              <h4>Still have questions?</h4>
              <p>Our team typically responds within 2 hours on business days.</p>
              <Link to="/contact" className="faq__cta-btn">
                Ask Us Anything
                <HiArrowRight />
              </Link>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            className="faq__accordion"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {filtered.map(({ id, question, answer }) => {
                  const isOpen = openId === id;
                  return (
                    <div
                      key={id}
                      className={"faq__item " + (isOpen ? "faq__item--open" : "")}
                    >
                      <button
                        className="faq__question"
                        onClick={() => toggle(id)}
                        aria-expanded={isOpen}
                      >
                        <span>{question}</span>
                        <span className="faq__icon">
                          {isOpen ? <HiMinus /> : <HiPlus />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="faq__answer-wrap"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="faq__answer">
                              {answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}