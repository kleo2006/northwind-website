import { motion } from "framer-motion";
import { useState } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Hartwell",
    role: "CTO",
    company: "FinTech Solutions Ltd",
    initials: "JH",
    color: "#38bdf8",
    rating: 5,
    text: "NorthWind completely transformed our infrastructure. The AWS migration was flawless — zero downtime, 41% cost reduction, and our team barely noticed the transition. Their engineers are genuinely world-class.",
  },
  {
    id: 2,
    name: "Dr. Sarah Okonkwo",
    role: "Operations Director",
    company: "MedCore Clinics",
    initials: "SO",
    color: "#34d399",
    rating: 5,
    text: "After a security incident with our previous provider, we brought in NorthWind for a full cybersecurity overhaul. They passed our external audit on the first attempt. I sleep much better now knowing our patient data is protected.",
  },
  {
    id: 3,
    name: "Marco Bellini",
    role: "CEO",
    company: "LogiTrack Europe",
    initials: "MB",
    color: "#818cf8",
    rating: 5,
    text: "We had four disconnected systems slowing us down. NorthWind built us a custom ERP in 14 weeks that replaced all of them. Our invoicing time dropped by 60%. The ROI was visible within the first month.",
  },
  {
    id: 4,
    name: "Claire Stevenson",
    role: "IT Manager",
    company: "RetailMax Group",
    initials: "CS",
    color: "#fb923c",
    rating: 5,
    text: "The helpdesk support NorthWind provides is unlike anything we've experienced. Average resolution time went from 4 hours to 28 minutes. Our staff actually compliment the IT support now — that never happened before.",
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Head of Marketing",
    company: "GrowthMetrics Agency",
    initials: "PN",
    color: "#f472b6",
    rating: 5,
    text: "Our reporting used to take 3 days every month. NorthWind built us a real-time dashboard pulling from 8 data sources. Now we have live insights at our fingertips. It has genuinely changed how we make decisions.",
  },
  {
    id: 6,
    name: "Thomas Keller",
    role: "Managing Partner",
    company: "Meridian Law Partners",
    initials: "TK",
    color: "#facc15",
    rating: 5,
    text: "NorthWind guided our entire digital transformation with patience and expertise. They didn't just implement technology — they made sure our team understood and embraced it. Our IT overhead dropped 38% in year one.",
  },
];

const LOGOS = [
 
  { name: "Google",    abbr: "G"  },
  { name: "Netflix",   abbr: "N"  },
  { name: "Microsoft", abbr: "Ms" },
  { name: "Amazon",    abbr: "A"  },
  { name: "Spotify",   abbr: "S"  },
  { name: "Airbnb",    abbr: "Ab" },
  { name: "Stripe",    abbr: "St" },
  { name: "Slack",     abbr: "Sl" },
  { name: "Notion",    abbr: "No" },
  { name: "Figma",     abbr: "Fi" },
];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function StarRating({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <HiStar key={i} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const { name, role, company, initials, color, rating, text } = testimonial;
  return (
    <motion.div
      className="testimonial-card"
      variants={fadeUp}
      style={{ "--t-color": color }}
    >
      <StarRating count={rating} />
      <p className="testimonial-card__text">"{text}"</p>
      <div className="testimonial-card__author">
        <div
          className="testimonial-card__avatar"
          style={{
            background: "color-mix(in srgb," + color + " 15%, var(--bg))",
            color: color,
            border: "2px solid color-mix(in srgb," + color + " 30%, transparent)",
          }}
        >
          {initials}
        </div>
        <div>
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__meta">{role} · {company}</div>
        </div>
      </div>
      <div className="testimonial-card__glow" />
    </motion.div>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">

        {/* Header */}
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="testimonials__eyebrow">Client Stories</div>
          <h2 className="testimonials__title">
            Trusted by Teams <span className="accent">Across Industries</span>
          </h2>
          <p className="testimonials__sub">
            Don't take our word for it — here's what the people we work with
            have to say about working with NorthWind.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="testimonials__grid"
          key={page}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {visible.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="testimonials__pagination">
          <button
            className="testimonials__page-btn"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
          >
            <HiChevronLeft />
          </button>
          <div className="testimonials__dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={"testimonials__dot " + (i === page ? "testimonials__dot--active" : "")}
                onClick={() => setPage(i)}
                aria-label={"Page " + (i + 1)}
              />
            ))}
          </div>
          <button
            className="testimonials__page-btn"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next"
          >
            <HiChevronRight />
          </button>
        </div>

        {/* Logo wall */}
        {/* Logo wall */}
<motion.div
  className="testimonials__logos"
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  <p className="testimonials__logos-label">
    Trusted by leading innovators
  </p>
  <div className="testimonials__marquee-wrap">
    <div className="testimonials__marquee">
      {[...LOGOS, ...LOGOS].map((logo, i) => (
        <div key={i} className="testimonials__logo-item">
          <span className="testimonials__logo-abbr">{logo.abbr}</span>
          <span className="testimonials__logo-name">{logo.name}</span>
        </div>
      ))}
    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
}