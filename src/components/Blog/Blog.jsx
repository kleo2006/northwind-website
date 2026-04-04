import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiClock, HiTag } from "react-icons/hi";
import "./Blog.css";

const POSTS = [
  {
    id: 1,
    slug: "cloud-migration-guide-2025",
    category: "Cloud",
    categoryColor: "#38bdf8",
    title: "The Complete Cloud Migration Guide for Mid-Size Businesses",
    excerpt: "Moving to the cloud doesn't have to be risky. We break down the five-phase migration framework we use with every client — from audit to go-live.",
    date: "Mar 18, 2025",
    readTime: "8 min read",
    initials: "CM",
    bg: "#0c1e35",
  },
  {
    id: 2,
    slug: "cybersecurity-threats-2025",
    category: "Security",
    categoryColor: "#34d399",
    title: "Top Cybersecurity Threats Facing Businesses in 2025",
    excerpt: "Ransomware, supply chain attacks, and AI-powered phishing are evolving fast. Here's what your IT team needs to watch — and how to prepare.",
    date: "Feb 27, 2025",
    readTime: "6 min read",
    initials: "CS",
    bg: "#0c2a1e",
  },
  {
    id: 3,
    slug: "it-consulting-roi",
    category: "Consulting",
    categoryColor: "#818cf8",
    title: "How to Measure the ROI of IT Consulting Engagements",
    excerpt: "Most companies struggle to quantify what they get from consulting. We share the metrics and reporting framework we use to make value visible.",
    date: "Feb 10, 2025",
    readTime: "5 min read",
    initials: "IR",
    bg: "#160f2e",
  },
  {
    id: 4,
    slug: "helpdesk-response-time",
    category: "Support",
    categoryColor: "#fb923c",
    title: "Why Sub-2-Minute Response Time Changes Everything",
    excerpt: "Slow IT support kills productivity silently. We analyzed 12 months of helpdesk data and found one metric that predicts employee satisfaction.",
    date: "Jan 22, 2025",
    readTime: "4 min read",
    initials: "HR",
    bg: "#2a1500",
  },
  {
    id: 5,
    slug: "data-pipeline-best-practices",
    category: "Data",
    categoryColor: "#f472b6",
    title: "Building Reliable Data Pipelines: Lessons From the Field",
    excerpt: "After designing pipelines for 40+ companies, we've identified the five patterns that separate stable pipelines from ones that break at 2am.",
    date: "Jan 08, 2025",
    readTime: "7 min read",
    initials: "DP",
    bg: "#2a0a1e",
  },
  {
    id: 6,
    slug: "digital-transformation-mistakes",
    category: "Strategy",
    categoryColor: "#facc15",
    title: "7 Digital Transformation Mistakes That Cost Companies Millions",
    excerpt: "Technology alone doesn't transform businesses — strategy does. We look at the most common failure points and how forward-thinking CIOs avoid them.",
    date: "Dec 14, 2024",
    readTime: "9 min read",
    initials: "DT",
    bg: "#1f1a00",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

function BlogCard({ post, featured = false }) {
  const {
    slug, category, categoryColor,
    title, excerpt, date, readTime,
    initials, bg,
  } = post;

  return (
    <motion.article
      className={`blog-card ${featured ? "blog-card--featured" : ""}`}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ "--post-color": categoryColor }}
    >
      {/* Thumbnail */}
      <div className="blog-card__thumb" style={{ background: bg }}>
        <span className="blog-card__initials">{initials}</span>
        <div className="blog-card__thumb-glow" />
      </div>

      {/* Body */}
      <div className="blog-card__body">
        {/* Meta top */}
        <div className="blog-card__meta-top">
          <span className="blog-card__category">
            <HiTag />
            {category}
          </span>
          <span className="blog-card__dot-sep" />
          <span className="blog-card__time">
            <HiClock />
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="blog-card__title">{title}</h3>

        {/* Excerpt */}
        <p className="blog-card__excerpt">{excerpt}</p>

        {/* Footer */}
        <div className="blog-card__footer">
          <span className="blog-card__date">{date}</span>
          <Link
            to={"/blog/" + slug}
            className="blog-card__link"
            aria-label={"Read " + title}
          >
            Read more
            <HiArrowRight className="blog-card__arrow" />
          </Link>
        </div>
      </div>

      {/* Hover line */}
      <div className="blog-card__line" />
    </motion.article>
  );
}

export default function Blog() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <section className="blog section" id="blog">
      <div className="container">

        {/* Header */}
        <motion.div
          className="blog__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="blog__eyebrow">Insights & Resources</div>
          <h2 className="blog__title">
            Latest From the <span className="accent">NorthWind Blog</span>
          </h2>
          <p className="blog__sub">
            Practical IT guides, security briefings, and strategy deep-dives
            written by our consulting team — no fluff, just signal.
          </p>
        </motion.div>

        {/* Featured post */}
        <motion.div
          className="blog__featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <BlogCard post={featured} featured={true} />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="blog__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {rest.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="blog__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/blog" className="blog__cta-btn">
            View all articles
            <HiArrowRight />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}