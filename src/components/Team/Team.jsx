import { motion } from "framer-motion";
import { HiMail, HiGlobeAlt } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";

import "./Team.css";

const STATS = [
  { value: "12+",  label: "Years in Business" },
  { value: "140+", label: "Clients Worldwide" },
  { value: "98%",  label: "Client Retention"  },
  { value: "24/7", label: "Support Available" },
];

const TEAM = [
  { name: "Marcus Elliot", role: "CEO & IT Strategist", bio: "15+ years leading digital transformation. Marcus aligns technology with business strategy.", avatar: "ME", color: "#38bdf8", linkedin: "#", email: "marcus@northwind.io", web: "#" },
  { name: "Sophia Reyes", role: "Head of Cloud Architecture", bio: "AWS and Azure certified architect designing resilient cloud infrastructure for global teams.", avatar: "SR", color: "#818cf8", linkedin: "#", email: "sophia@northwind.io", web: "#" },
  { name: "Daniel Kroft", role: "Cybersecurity Lead", bio: "CISSP-certified expert in penetration testing, SOC 2 compliance, and threat management.", avatar: "DK", color: "#34d399", linkedin: "#", email: "daniel@northwind.io", web: "#" },
  { name: "Aisha Mensah", role: "Software Engineering Lead", bio: "Full-stack engineer who has shipped products used by millions across web and enterprise.", avatar: "AM", color: "#f472b6", linkedin: "#", email: "aisha@northwind.io", web: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

function TeamCard({ member }) {
  const { name, role, bio, avatar, color, linkedin, email, web } = member;
  const mailtoLink = "mailto:" + email;
  return (
    <motion.div
      className="team-card"
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      style={{ "--member-color": color }}
    >
      <div className="team-card__bar" />
      <div className="team-card__avatar-wrap">
        <div className="team-card__avatar">{avatar}</div>
        <div className="team-card__avatar-ring" />
      </div>
      <div className="team-card__info">
        <h3 className="team-card__name">{name}</h3>
        <span className="team-card__role">{role}</span>
        <p className="team-card__bio">{bio}</p>
      </div>
      <div className="team-card__social">
        <a href={linkedin} className="team-card__social-btn" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href={mailtoLink} className="team-card__social-btn" aria-label="Email">
          <HiMail />
        </a>
        <a href={web} className="team-card__social-btn" aria-label="Website">
          <HiGlobeAlt />
        </a>
      </div>
      <div className="team-card__glow" />
    </motion.div>
  );
}

export default function Team() {
  return (
    <section className="team section" id="team">
      <div className="container">
        <motion.div
          className="team__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="team__eyebrow">The People Behind NorthWind</div>
          <h2 className="team__title">
            Experts You Can <span className="accent">Trust</span>
          </h2>
          <p className="team__sub">
            Our team combines deep technical expertise with real business
            acumen so every solution we deliver is both technically sound
            and strategically aligned.
          </p>
        </motion.div>
        <motion.div
          className="team__stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {STATS.map(({ value, label }) => (
            <div className="team__stat" key={label}>
              <span className="team__stat-value">{value}</span>
              <span className="team__stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="team__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {TEAM.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
        <motion.div
          className="team__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>Interested in joining the NorthWind team?</p>
          <a href="mailto:careers@northwind.io" className="team__cta-link">
            View open positions
          </a>
        </motion.div>
      </div>
    </section>
  );
}