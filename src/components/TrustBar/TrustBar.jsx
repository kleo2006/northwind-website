import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiUserGroup,
  HiClock,
  HiTrendingUp,
  HiStar,
  HiGlobe,
} from "react-icons/hi";
import "./TrustBar.css";

const STATS = [
  { icon: <HiUserGroup />, value: "140+",    label: "Active Clients",    color: "#38bdf8" },
  { icon: <HiShieldCheck />, value: "99.98%", label: "Network Uptime",   color: "#22c55e" },
  { icon: <HiTrendingUp />, value: "12+",    label: "Years in Business", color: "#818cf8" },
  { icon: <HiClock />,      value: "< 2 min", label: "Avg Response Time",color: "#fb923c" },
  { icon: <HiStar />,       value: "4,200+", label: "Issues Resolved",   color: "#f472b6" },
  { icon: <HiGlobe />,      value: "3",      label: "Continents Served", color: "#e9a800" },
];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Company statistics">
      <div className="trustbar__grid">
        {STATS.map(({ icon, value, label, color }, i) => (
          <motion.div
            key={label}
            className="trustbar__stat"
            style={{ "--stat-color": color }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <div className="trustbar__icon">{icon}</div>
            <div className="trustbar__content">
              <span className="trustbar__value">{value}</span>
              <span className="trustbar__label">{label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}