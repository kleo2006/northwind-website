import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import "./Legal.css";

const COOKIE_TYPES = [
  {
    type: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.",
    examples: "Session cookies, security tokens, load balancing cookies.",
    required: true,
  },
  {
    type: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to improve our website's performance and user experience.",
    examples: "Google Analytics, page view tracking, bounce rate measurement.",
    required: false,
  },
  {
    type: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalization, such as remembering your theme preference (dark or light mode). They may be set by us or by third-party providers whose services we use.",
    examples: "Theme preference, language settings, form data retention.",
    required: false,
  },
  {
    type: "Marketing Cookies",
    description: "We currently do not use marketing or advertising cookies on our website. NorthWind does not serve ads or share your data with advertising networks.",
    examples: "None currently in use.",
    required: false,
  },
];

const SECTIONS = [
  {
    title: "What Are Cookies?",
    content: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies do not contain personally identifiable information on their own, but they can be linked to personal data we hold about you.`,
  },
  {
    title: "How We Use Cookies",
    content: `NorthWind uses cookies to ensure our website functions correctly, to remember your preferences such as your chosen theme, and to understand how visitors use our site so we can improve it. We do not use cookies to serve advertisements or track you across other websites.`,
  },
  {
    title: "Managing Your Cookie Preferences",
    content: `You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when cookies are set. Please note that disabling certain cookies may affect the functionality of our website.

To manage cookies in your browser: In Chrome, go to Settings > Privacy and Security > Cookies. In Firefox, go to Options > Privacy and Security. In Safari, go to Preferences > Privacy.`,
  },
  {
    title: "Third-Party Cookies",
    content: `We may use third-party services such as analytics providers that set their own cookies. These third parties have their own privacy policies and we do not control their cookies. We encourage you to review the privacy policies of any third-party services we use.`,
  },
  {
    title: "Updates to This Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated effective date. We encourage you to check this page periodically.`,
  },
];

export default function CookiePolicy() {
  return (
    <motion.div
      className="legal"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container legal__inner">
        <Link to="/" className="legal__back">
          <HiArrowLeft /> Back to Home
        </Link>

        <div className="legal__header">
          <div className="legal__eyebrow">Legal</div>
          <h1 className="legal__title">Cookie Policy</h1>
          <p className="legal__meta">Effective Date: January 1, 2025 · Last Updated: March 1, 2025</p>
          <p className="legal__intro">
            This Cookie Policy explains how NorthWind uses cookies and similar
            tracking technologies on our website, and what choices you have
            regarding their use.
          </p>
        </div>

        <div className="legal__content">
          {SECTIONS.slice(0, 2).map(({ title, content }) => (
            <div className="legal__section" key={title}>
              <h2 className="legal__section-title">{title}</h2>
              {content.split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          ))}

          <div className="legal__section">
            <h2 className="legal__section-title">Types of Cookies We Use</h2>
            <div className="legal__cookie-table">
              {COOKIE_TYPES.map(({ type, description, examples, required }) => (
                <div className="legal__cookie-row" key={type}>
                  <div className="legal__cookie-header">
                    <span className="legal__cookie-type">{type}</span>
                    <span className={"legal__cookie-badge " + (required ? "legal__cookie-badge--required" : "legal__cookie-badge--optional")}>
                      {required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="legal__cookie-desc">{description}</p>
                  <p className="legal__cookie-examples">
                    <strong>Examples:</strong> {examples}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {SECTIONS.slice(2).map(({ title, content }) => (
            <div className="legal__section" key={title}>
              <h2 className="legal__section-title">{title}</h2>
              {content.split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="legal__footer">
          <p>Questions about our cookie practices?</p>
          <Link to="/contact" className="legal__cta">Contact Us →</Link>
        </div>
      </div>
    </motion.div>
  );
}