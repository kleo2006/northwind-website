import { motion } from "framer-motion";
import {
  HiCloud,
  HiCode,
  HiShieldCheck,
  HiSupport,
  HiDatabase,
  HiChip,
} from "react-icons/hi";
import "./Services.css";

const SERVICES = [
  {
    icon: <HiCloud />,
    title: "Cloud Solutions",
    description:
      "Seamless cloud migration, architecture design, and managed services across AWS, Azure, and GCP. Scale confidently with zero downtime.",
    tags: ["AWS", "Azure", "GCP"],
    accent: "#38bdf8",
  },
  {
    icon: <HiCode />,
    title: "Software Development",
    description:
      "Custom web and enterprise applications built with modern stacks. From MVPs to full-scale platforms — delivered on time, built to last.",
    tags: ["React", "Node.js", "APIs"],
    accent: "#818cf8",
  },
  {
    icon: <HiShieldCheck />,
    title: "Cybersecurity",
    description:
      "End-to-end security audits, threat monitoring, and compliance frameworks. We protect your data before threats become breaches.",
    tags: ["Pen Testing", "SOC 2", "GDPR"],
    accent: "#34d399",
  },
  {
    icon: <HiSupport />,
    title: "IT Support & Helpdesk",
    description:
      "24/7 managed IT support with sub-2-minute response times. Your team stays productive — we handle the rest.",
    tags: ["24/7", "Remote", "On-site"],
    accent: "#fb923c",
  },
  {
    icon: <HiDatabase />,
    title: "Data & Analytics",
    description:
      "Transform raw data into strategic insight. We design pipelines, dashboards, and BI solutions that drive real decisions.",
    tags: ["BI", "ETL", "SQL"],
    accent: "#f472b6",
  },
  {
    icon: <HiChip />,
    title: "IT Consulting",
    description:
      "Strategic technology roadmaps aligned to your business goals. We audit, plan, and guide your digital transformation end-to-end.",
    tags: ["Strategy", "Audit", "Roadmap"],
    accent: "#facc15",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="services__eyebrow">What We Offer</div>
          <h2 className="services__title">
            Services Built for <span className="accent">Modern IT</span>
          </h2>
          <p className="services__sub">
            From infrastructure to strategy, NorthWind covers every layer of
            your technology stack — so you can focus on growing your business.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          className="services__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICES.map(({ icon, title, description, tags, accent }) => (
            <motion.div
              key={title}
              className="service-card"
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Top accent line */}
              <div
                className="service-card__line"
                style={{ background: accent }}
              />

              {/* Icon */}
              <div
                className="service-card__icon"
                style={{
                  color: accent,
                  background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                }}
              >
                {icon}
              </div>

              {/* Content */}
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{description}</p>

              {/* Tags */}
              <div className="service-card__tags">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="service-card__tag"
                    style={{
                      color: accent,
                      background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover glow */}
              <div
                className="service-card__glow"
                style={{
                  background: `radial-gradient(circle at 50% 100%, color-mix(in srgb, ${accent} 12%, transparent), transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}