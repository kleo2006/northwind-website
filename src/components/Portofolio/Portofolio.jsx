import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiExternalLink } from "react-icons/hi";
import "./Portofolio.css";

const PROJECTS = [
  {
    id: 1,
    slug: "cloud-migration-fintech",
    tag: "Cloud Migration",
    tagColor: "#38bdf8",
    client: "FinTech Solutions Ltd",
    title: "Full AWS Cloud Migration for 200-Person Fintech",
    summary: "Migrated legacy on-premise infrastructure to AWS in 6 weeks with zero downtime. Reduced infrastructure costs by 41% and improved system uptime from 97.2% to 99.98%.",
    results: ["41% cost reduction", "99.98% uptime", "6 week delivery"],
    initials: "FS",
    bg: "#0c1e35",
    accentColor: "#38bdf8",
  },
  {
    id: 2,
    slug: "cybersecurity-overhaul",
    tag: "Cybersecurity",
    tagColor: "#34d399",
    client: "MedCore Clinics",
    title: "End-to-End Cybersecurity Overhaul for Healthcare Group",
    summary: "Implemented zero-trust architecture, SOC 2 compliance framework, and 24/7 threat monitoring across 12 clinic locations. Passed external security audit on first attempt.",
    results: ["SOC 2 compliant", "12 locations secured", "0 breaches post-launch"],
    initials: "MC",
    bg: "#0c2a1e",
    accentColor: "#34d399",
  },
  {
    id: 3,
    slug: "custom-erp-development",
    tag: "Software Development",
    tagColor: "#818cf8",
    client: "LogiTrack Europe",
    title: "Custom ERP System for Pan-European Logistics Company",
    summary: "Built a full-stack ERP platform replacing 4 disconnected tools. Real-time shipment tracking, automated invoicing, and a driver mobile app — delivered in 14 weeks.",
    results: ["4 tools replaced", "14 week delivery", "60% faster invoicing"],
    initials: "LE",
    bg: "#160f2e",
    accentColor: "#818cf8",
  },
  {
    id: 4,
    slug: "it-support-retail",
    tag: "IT Support",
    tagColor: "#fb923c",
    client: "RetailMax Group",
    title: "Managed IT Support for 35-Location Retail Chain",
    summary: "Took over IT support for a rapidly growing retail chain. Reduced average ticket resolution time from 4.2 hours to 28 minutes and achieved 96% first-call resolution rate.",
    results: ["28 min resolution", "96% first-call fix", "35 locations covered"],
    initials: "RM",
    bg: "#2a1500",
    accentColor: "#fb923c",
  },
  {
    id: 5,
    slug: "data-analytics-platform",
    tag: "Data & Analytics",
    tagColor: "#f472b6",
    client: "GrowthMetrics Agency",
    title: "Real-Time Analytics Dashboard for Marketing Agency",
    summary: "Designed and built a unified data pipeline pulling from 8 sources into a real-time BI dashboard. Reduced reporting time from 3 days to under 2 hours.",
    results: ["8 data sources unified", "2hr reporting time", "3 day → 2hr savings"],
    initials: "GM",
    bg: "#2a0a1e",
    accentColor: "#f472b6",
  },
  {
    id: 6,
    slug: "digital-transformation-law",
    tag: "IT Consulting",
    tagColor: "#facc15",
    client: "Meridian Law Partners",
    title: "Digital Transformation for 80-Person Law Firm",
    summary: "Led a full digital transformation — cloud migration, document management system, secure client portal, and staff training. Firm reduced IT overhead by 38% in year one.",
    results: ["38% IT cost reduction", "Secure client portal", "Full staff trained"],
    initials: "ML",
    bg: "#1f1a00",
    accentColor: "#facc15",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function ProjectCard({ project }) {
  const { tag, tagColor, client, title, summary, results, initials, bg, accentColor } = project;

  return (
    <motion.div
      className="project-card"
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ "--project-color": accentColor }}
    >
      {/* Thumbnail */}
      <div className="project-card__thumb" style={{ background: bg }}>
        <span className="project-card__initials">{initials}</span>
        <div className="project-card__thumb-glow" />
      </div>

      {/* Body */}
      <div className="project-card__body">
        <div className="project-card__meta">
          <span
            className="project-card__tag"
            style={{
              color: tagColor,
              background: "color-mix(in srgb," + tagColor + " 10%, transparent)",
              borderColor: "color-mix(in srgb," + tagColor + " 25%, transparent)",
            }}
          >
            {tag}
          </span>
          <span className="project-card__client">{client}</span>
        </div>

        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__summary">{summary}</p>

        {/* Results */}
        <div className="project-card__results">
          {results.map((r) => (
            <span key={r} className="project-card__result">
              ✓ {r}
            </span>
          ))}
        </div>
      </div>

      {/* Hover line */}
      <div className="project-card__line" />
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">

        {/* Header */}
        <motion.div
          className="portfolio__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="portfolio__eyebrow">Our Work</div>
          <h2 className="portfolio__title">
            Real Projects. <span className="accent">Real Results.</span>
          </h2>
          <p className="portfolio__sub">
            Every engagement is measured by outcomes — not effort. Here are
            some of the client projects we're most proud of.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="portfolio__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="portfolio__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/contact" className="portfolio__cta-btn">
            Start Your Project
            <HiArrowRight />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}