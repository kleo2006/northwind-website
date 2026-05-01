import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft, HiClock, HiTag } from "react-icons/hi";
import "./BlogPost.css";

const POSTS = [
  {
    id: 1,
    slug: "cloud-migration-guide-2025",
    category: "Cloud",
    categoryColor: "#38bdf8",
    title: "The Complete Cloud Migration Guide for Mid-Size Businesses",
    date: "Mar 18, 2025",
    readTime: "8 min read",
    content: `
      Moving to the cloud doesn't have to be risky or overwhelming. After guiding dozens of mid-size businesses through successful migrations, we've refined a five-phase framework that reduces downtime, controls costs, and sets teams up for long-term success.

      Phase 1 — Discovery & Audit: Before touching a single server, we map your entire infrastructure. What workloads exist? What are the dependencies? What compliance requirements apply? This phase typically takes 2–3 weeks and produces a migration readiness report.

      Phase 2 — Strategy & Architecture: Based on the audit, we design your target cloud architecture. This includes choosing the right provider (AWS, Azure, or GCP), selecting deployment models, and planning your network topology, security groups, and IAM policies.

      Phase 3 — Pilot Migration: We migrate a non-critical workload first. This stress-tests our plan, surfaces unexpected issues, and builds your team's confidence before tackling business-critical systems.

      Phase 4 — Full Migration: Using the pilot as a blueprint, we execute the full migration in carefully sequenced waves. Each wave is followed by a validation period before the next begins.

      Phase 5 — Optimisation: Once live, we right-size resources, implement auto-scaling, set up cost alerts, and hand over monitoring dashboards to your team.

      The result? Our clients average 34% reduction in infrastructure costs within 6 months of migration.
    `,
  },
  {
    id: 2,
    slug: "cybersecurity-threats-2025",
    category: "Security",
    categoryColor: "#34d399",
    title: "Top Cybersecurity Threats Facing Businesses in 2025",
    date: "Feb 27, 2025",
    readTime: "6 min read",
    content: `
      The threat landscape has shifted dramatically. AI-powered attacks, supply chain compromises, and ransomware-as-a-service have made cybersecurity a board-level concern for businesses of every size.

      Ransomware Evolution: Modern ransomware groups don't just encrypt your data — they exfiltrate it first and threaten to publish it if the ransom isn't paid. Double extortion attacks increased 120% last year. Your backup strategy alone is no longer sufficient.

      AI-Powered Phishing: Attackers now use large language models to craft perfectly worded, contextually accurate phishing emails at scale. Traditional security awareness training is struggling to keep pace.

      Supply Chain Attacks: Compromising a single vendor can give attackers access to hundreds of downstream companies. The SolarWinds and MOVEit incidents demonstrated just how devastating this vector can be.

      How to Prepare: Implement zero-trust architecture, conduct quarterly penetration tests, enforce MFA across all systems, and maintain an up-to-date incident response plan. Most importantly, treat security as a continuous process — not a one-time project.
    `,
  },
  {
    id: 3,
    slug: "it-consulting-roi",
    category: "Consulting",
    categoryColor: "#818cf8",
    title: "How to Measure the ROI of IT Consulting Engagements",
    date: "Feb 10, 2025",
    readTime: "5 min read",
    content: `
      Most companies struggle to answer a simple question: what did we actually get from that consulting engagement? Without clear metrics, IT consulting can feel like a black box.

      Define Success Before You Start: ROI measurement begins before the engagement does. Work with your consulting partner to define 3–5 measurable outcomes. These might include reduced incident response time, improved system uptime, lower infrastructure costs, or faster deployment cycles.

      Track Baseline Metrics: You can't measure improvement without a baseline. Before the engagement begins, document your current state across each success metric.

      Quantify Both Hard and Soft Returns: Hard returns are easy — cost savings, headcount reduction, revenue enabled by new capabilities. Soft returns require more effort to quantify but are equally real: reduced employee frustration, faster onboarding, improved security posture.

      Our Reporting Framework: We provide clients with a monthly value report showing progress against agreed KPIs, hours allocated per workstream, and a rolling 90-day roadmap. Transparency builds trust and keeps engagements focused on outcomes.
    `,
  },
  {
    id: 4,
    slug: "helpdesk-response-time",
    category: "Support",
    categoryColor: "#fb923c",
    title: "Why Sub-2-Minute Response Time Changes Everything",
    date: "Jan 22, 2025",
    readTime: "4 min read",
    content: `
      We analyzed 12 months of helpdesk data across 40 client accounts and found one metric that predicts employee satisfaction better than any other: first response time.

      The Data: When first response time exceeds 10 minutes, satisfaction scores drop by an average of 31%. When it drops below 2 minutes, satisfaction scores are consistently above 90% — regardless of how long the issue ultimately takes to resolve.

      Why Response Time Matters More Than Resolution Time: Employees understand that complex issues take time to fix. What they can't tolerate is feeling ignored. A fast acknowledgment — even if just to say "we've received your ticket and are looking into it" — dramatically changes the perceived experience.

      How We Achieve Sub-2-Minute Response: Dedicated triage engineers monitor our queue in real time. Intelligent routing sends tickets to the right specialist immediately. Automated acknowledgments with ticket IDs are sent instantly upon submission.

      The Business Impact: Faster support means less employee downtime, higher productivity, and lower frustration-driven turnover. For a 200-person company, we estimate this saves an average of 340 productive hours per month.
    `,
  },
  {
    id: 5,
    slug: "data-pipeline-best-practices",
    category: "Data",
    categoryColor: "#f472b6",
    title: "Building Reliable Data Pipelines: Lessons From the Field",
    date: "Jan 08, 2025",
    readTime: "7 min read",
    content: `
      After designing data pipelines for over 40 companies, we've identified five patterns that separate pipelines that run reliably for years from ones that break at 2am and require emergency intervention.

      Pattern 1 — Idempotency: Every pipeline stage should be safely re-runnable. If a stage fails halfway through, rerunning it should produce the same result without duplicating data. This sounds obvious but is violated surprisingly often.

      Pattern 2 — Explicit Schema Validation: Validate data against a schema at ingestion time. Catching a malformed record at the entry point is infinitely cheaper than discovering data corruption three stages downstream.

      Pattern 3 — Dead Letter Queues: Records that fail processing should go to a dead letter queue for inspection and reprocessing — not be silently dropped. Silent data loss is the worst kind of pipeline failure.

      Pattern 4 — Observable by Default: Every pipeline should emit metrics on throughput, latency, error rates, and lag. If you can't see what your pipeline is doing in real time, you're flying blind.

      Pattern 5 — Backfill-Friendly Design: Business requirements change. Design your pipelines so historical data can be reprocessed when logic changes. This saves enormous pain when you inevitably need to backfill.
    `,
  },
  {
    id: 6,
    slug: "digital-transformation-mistakes",
    category: "Strategy",
    categoryColor: "#facc15",
    title: "7 Digital Transformation Mistakes That Cost Companies Millions",
    date: "Dec 14, 2024",
    readTime: "9 min read",
    content: `
      Digital transformation has become one of the most overused — and most misunderstood — terms in business. After working with dozens of companies through major technology transitions, we've catalogued the mistakes that consistently derail initiatives and destroy value.

      Mistake 1 — Technology First, Strategy Never: Buying a new platform before defining the business problem it solves. Technology should follow strategy, not lead it.

      Mistake 2 — Underestimating Change Management: The technology is rarely the hard part. Getting people to change how they work is. Companies that invest in change management are 6x more likely to achieve their transformation goals.

      Mistake 3 — Big Bang Deployments: Trying to transform everything at once. Successful transformations happen in focused, measurable waves with clear checkpoints.

      Mistake 4 — Neglecting Data Quality: New systems built on dirty data produce dirty outputs. A data quality audit should precede any major system migration.

      Mistake 5 — Ignoring Integration Complexity: Every new system needs to talk to existing systems. Integration is consistently underestimated in both time and cost.

      Mistake 6 — No Clear Ownership: Transformation initiatives without a dedicated, empowered owner tend to drift. Someone needs to own outcomes, not just activities.

      Mistake 7 — Measuring Activity Instead of Outcomes: Tracking hours spent or features delivered instead of business metrics like revenue, cost, or customer satisfaction. Measure what matters.
    `,
  },
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="blogpost-notfound container">
        <h2>Post not found</h2>
        <Link to="/blog" className="blogpost__back">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="blogpost"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container blogpost__inner">

       
        <Link to="/blog" className="blogpost__back">
          <HiArrowLeft /> Back to Blog
        </Link>

        
        <div className="blogpost__header">
          <div className="blogpost__meta">
            <span
              className="blogpost__category"
              style={{
                color: post.categoryColor,
                background: "color-mix(in srgb," + post.categoryColor + " 10%, transparent)",
                borderColor: "color-mix(in srgb," + post.categoryColor + " 25%, transparent)",
              }}
            >
              <HiTag /> {post.category}
            </span>
            <span className="blogpost__time">
              <HiClock /> {post.readTime}
            </span>
            <span className="blogpost__date">{post.date}</span>
          </div>

          <h1 className="blogpost__title">{post.title}</h1>
        </div>

       
        <div className="blogpost__content">
          {post.content.trim().split("\n\n").map((para, i) => (
            <p key={i}>{para.trim()}</p>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="blogpost__footer">
          <p>Want to talk to our team about this topic?</p>
          <Link to="/contact" className="blogpost__cta">
            Get in Touch →
          </Link>
        </div>

      </div>
    </motion.div>
  );
}