import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import "./Legal.css";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the NorthWind website or any of our IT services and consulting offerings, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, clients, and others who access or use our services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of any changes.`,
  },
  {
    title: "2. Description of Services",
    content: `NorthWind provides IT services and consulting including but not limited to cloud solutions, cybersecurity, software development, IT support, data analytics, and strategic IT consulting. The specific scope of services provided to any client is defined in a separate service agreement or statement of work.

Services described on our website are for informational purposes and do not constitute a binding offer. All engagements are subject to a formal agreement between NorthWind and the client.`,
  },
  {
    title: "3. Client Responsibilities",
    content: `Clients are responsible for providing accurate and complete information necessary for NorthWind to deliver its services. Clients must ensure that NorthWind has the necessary access, permissions, and cooperation required to perform the agreed services.

Clients are responsible for maintaining the confidentiality of any credentials or access information provided by NorthWind, and for all activities that occur under their accounts.`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on the NorthWind website, including text, graphics, logos, and software, is the property of NorthWind and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.

For client engagements, intellectual property ownership is governed by the terms of the applicable service agreement. Unless otherwise agreed in writing, custom work product developed for a client becomes the property of the client upon full payment.`,
  },
  {
    title: "5. Confidentiality",
    content: `Both parties agree to keep confidential any proprietary or sensitive information disclosed during the course of an engagement. NorthWind will not disclose client information to third parties without consent, except as required by law or as necessary to deliver the agreed services.

This confidentiality obligation survives termination of any service agreement for a period of three years.`,
  },
  {
    title: "6. Payment Terms",
    content: `Payment terms for services are specified in the applicable service agreement or invoice. Unless otherwise agreed, invoices are due within 30 days of issuance. Late payments may be subject to interest charges of 1.5% per month.

NorthWind reserves the right to suspend services in the event of non-payment. Clients are responsible for all costs associated with collecting overdue amounts, including reasonable legal fees.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, NorthWind shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website.

Our total liability for any claim arising from our services shall not exceed the total fees paid by the client to NorthWind in the three months preceding the claim.`,
  },
  {
    title: "8. Termination",
    content: `Either party may terminate a service engagement by providing written notice as specified in the applicable service agreement. NorthWind reserves the right to terminate services immediately in the event of a material breach of these terms or non-payment.

Upon termination, the client's right to use any NorthWind-provided tools or access credentials will cease immediately.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms of Service shall be governed by and construed in accordance with applicable law. Any disputes arising under these terms shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration.`,
  },
  {
    title: "10. Contact",
    content: `If you have questions about these Terms of Service, please contact us at legal@northwind.io or through our contact form. We are happy to clarify any aspect of these terms.`,
  },
];

export default function TermsOfService() {
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
          <h1 className="legal__title">Terms of Service</h1>
          <p className="legal__meta">Effective Date: January 1, 2025 · Last Updated: March 1, 2025</p>
          <p className="legal__intro">
            Please read these Terms of Service carefully before using NorthWind's
            website or services. These terms govern your use of our platform and
            define the relationship between you and NorthWind.
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
          <p>Questions about these terms?</p>
          <Link to="/contact" className="legal__cta">Contact Us →</Link>
        </div>
      </div>
    </motion.div>
  );
}