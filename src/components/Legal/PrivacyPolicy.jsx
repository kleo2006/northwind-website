import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import "./Legal.css";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you fill out our contact form, request a consultation, or communicate with our team. This includes your name, email address, company name, phone number, and any message content you submit.

We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited. This data is collected through standard server logs and analytics tools.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to respond to your inquiries and provide the IT services and consulting you request. We also use it to send you relevant communications about our services, improvements, and updates — but only where you have given us permission to do so.

Your data helps us improve our website experience, analyze usage patterns, and ensure our services meet the needs of our clients. We do not use your personal information for automated decision-making or profiling.`,
  },
  {
    title: "3. Information Sharing",
    content: `NorthWind does not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and delivering our services — such as email delivery platforms or analytics providers — but only under strict confidentiality agreements.

We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. Contact form submissions are typically retained for 24 months. You may request deletion of your data at any time by contacting us at privacy@northwind.io.`,
  },
  {
    title: "5. Data Security",
    content: `We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption, access controls, and regular security assessments.

However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your location, you may have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to or restrict processing of your data, and request data portability.

To exercise any of these rights, please contact us at privacy@northwind.io. We will respond to your request within 30 days.`,
  },
  {
    title: "7. Cookies",
    content: `Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how visitors interact with our site. You can control cookie settings through your browser preferences. For more details, please see our Cookie Policy.`,
  },
  {
    title: "8. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of significant changes by posting the updated policy on this page with a revised effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@northwind.io or through our contact form. We are committed to resolving any concerns promptly and transparently.`,
  },
];

export default function PrivacyPolicy() {
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
          <h1 className="legal__title">Privacy Policy</h1>
          <p className="legal__meta">Effective Date: January 1, 2025 · Last Updated: March 1, 2025</p>
          <p className="legal__intro">
            At NorthWind, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you visit our website or use our services.
          </p>
        </div>

        <div className="legal__content">
          {SECTIONS.map(({ title, content }) => (
            <div className="legal__section" key={title}>
              <h2 className="legal__section-title">{title}</h2>
              {content.split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="legal__footer">
          <p>Questions about this policy?</p>
          <Link to="/contact" className="legal__cta">Contact Us →</Link>
        </div>
      </div>
    </motion.div>
  );
}