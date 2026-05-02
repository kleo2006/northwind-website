import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiLightningBolt,
  HiShieldCheck,
  HiUserGroup,
  HiGlobe,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi";
import "./About.css";

const VALUES = [
  {
    icon: <HiLightningBolt />,
    title: "Speed & Reliability",
    desc: "We move fast without breaking things. Every solution we deliver is tested, documented, and built to last.",
    color: "#38bdf8",
  },
  {
    icon: <HiShieldCheck />,
    title: "Security First",
    desc: "Security is never an afterthought. We embed it into every layer of every solution from day one.",
    color: "#34d399",
  },
  {
    icon: <HiUserGroup />,
    title: "Client Partnership",
    desc: "We don't just deliver projects — we become an extension of your team and stay invested in your success.",
    color: "#818cf8",
  },
  {
    icon: <HiGlobe />,
    title: "Global Thinking",
    desc: "Our team has worked with clients across 3 continents. We bring global best practices to every local engagement.",
    color: "#f472b6",
  },
];

const MILESTONES = [
  { year: "2012", event: "NorthWind founded by Marcus Elliot in Tirana, Albania" },
  { year: "2015", event: "Expanded to cloud services — first AWS partnership secured" },
  { year: "2018", event: "Grew to 20+ consultants, opened second office" },
  { year: "2020", event: "Launched 24/7 managed IT support practice" },
  { year: "2022", event: "Reached 100+ active clients across Europe and North America" },
  { year: "2024", event: "Recognized as a top IT consulting firm in the Balkans" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">

        {/* Header */}
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="about__eyebrow">About NorthWind</div>
          <h2 className="about__title">
            Built on Trust. <span className="accent">Driven by Results.</span>
          </h2>
          <p className="about__sub">
            Since 2012, NorthWind has helped businesses across industries
            harness technology as a competitive advantage — not just a
            necessary cost.
          </p>
        </motion.div>

        {/* Story + Mission */}
        <motion.div
          className="about__story"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="about__story-content">
            <h3 className="about__story-title">Our Story</h3>
            <p>
              NorthWind was founded with a simple belief: that small and
              mid-size businesses deserve the same quality of IT leadership
              that Fortune 500 companies take for granted. Too many growing
              companies were being held back by outdated infrastructure,
              reactive IT support, and technology decisions made without
              strategic context.
            </p>
            <p>
              We started as a two-person consulting team in Tirana, Albania.
              Today we're a full-service IT firm with specialists across cloud,
              security, software development, data, and strategic consulting —
              serving clients from Albania to the United States.
            </p>
            <p>
              Our mission has never changed: to make enterprise-grade
              technology accessible, understandable, and genuinely useful for
              the businesses we work with.
            </p>

            <div className="about__mission">
              <div className="about__mission-item">
                <HiCheckCircle />
                <span>Enterprise-grade IT for growing businesses</span>
              </div>
              <div className="about__mission-item">
                <HiCheckCircle />
                <span>Transparent, outcome-focused engagements</span>
              </div>
              <div className="about__mission-item">
                <HiCheckCircle />
                <span>Long-term partnerships, not one-off projects</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="about__timeline">
            <h3 className="about__story-title">Our Journey</h3>
            {MILESTONES.map(({ year, event }, i) => (
              <motion.div
                key={year}
                className="about__milestone"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="about__milestone-year">{year}</div>
                <div className="about__milestone-line">
                  <div className="about__milestone-dot" />
                  {i < MILESTONES.length - 1 && (
                    <div className="about__milestone-connector" />
                  )}
                </div>
                <div className="about__milestone-event">{event}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          className="about__values-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="about__values-title">Our Core Values</h3>
          <motion.div
            className="about__values"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {VALUES.map(({ icon, title, desc, color }) => (
              <motion.div
                key={title}
                className="about__value-card"
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{ "--value-color": color }}
              >
                <div className="about__value-icon">{icon}</div>
                <h4 className="about__value-title">{title}</h4>
                <p className="about__value-desc">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="about__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="about__cta-text">
            <h3>Ready to work with us?</h3>
            <p>Let's talk about what NorthWind can do for your business.</p>
          </div>
          <Link to="/contact" className="about__cta-btn">
            Get in Touch
            <HiArrowRight />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}