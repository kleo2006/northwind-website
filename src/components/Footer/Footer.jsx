// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
// import { HiMail, HiLocationMarker } from "react-icons/hi";
// import "./Footer.css";
// import { useNavigate } from "react-router-dom";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// const NAV_LINKS = [
  
//   { label: "Services", to: "/services" },
//   { label: "Testimonials", to: "/testimonials" },

//   { label: "Pricing",  to: "/pricing"  },
//   { label: "About",     to: "/about"     },
//   { label: "Portofolio",     to: "/portfolio"     },
//   { label: "Contact",  to: "/contact"  },
// ];

// function ContactEmail() {
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();

//   const handleCopy = () => {
//     navigator.clipboard.writeText("contact@northwind.io");
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleSendMessage = () => {
//     navigate("/contact");
//     window.scrollTo({ top: 0, behavior: "instant" });
//   };

//   return (
//     <div className="footer__email-wrap">
//       <div className="footer__contact-item">
//         <HiMail />
//         <span>contact@northwind.io</span>
//       </div>
//       <div className="footer__email-actions">
//         <button
//           className="footer__email-btn"
//           onClick={handleCopy}
//           title="Copy email"
//         >
//           {copied ? "✓ Copied!" : "Copy"}
//         </button>
//         <button
//           className="footer__email-btn footer__email-btn--accent"
//           onClick={handleSendMessage}
//         >
//           Send Message
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="container">
//         <motion.div
//           className="footer__content"
//           variants={fadeInUp}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           {/* Brand */}
//           <div className="footer__brand">
//             <Link to="/" className="footer__logo">
//               <span className="footer__logo-mark">N</span>
//               <span className="footer__logo-text">
//                 North<span className="accent">Wind</span>
//               </span>
//             </Link>
//             <p className="footer__desc">
//               Delivering cutting-edge IT solutions and consulting services to
//               help businesses scale and innovate.
//             </p>
//           </div>

//           {/* Navigation */}
//           <div className="footer__links">
//             <h4>Company</h4>
//             {NAV_LINKS.map(({ label, to }) => (
//               <Link key={to} to={to}>{label}</Link>
//             ))}
//           </div>

//           {/* Contact Info */}
//           <div className="footer__contact">
//             <h4>Contact</h4>
//             <ContactEmail />
//             <div className="footer__contact-item">
//               <HiLocationMarker />
//               <span>Tirana, Albania</span>
//             </div>
//           </div>

//           {/* Social */}
//           <div className="footer__social">
//             <h4>Follow Us</h4>
//             <div className="footer__social-icons">
//               <a href="#" aria-label="LinkedIn" target="_blank" rel="noreferrer">
//                 <FaLinkedin />
//               </a>
//               <a href="#" aria-label="Twitter" target="_blank" rel="noreferrer">
//                 <FaTwitter />
//               </a>
//               <a href="#" aria-label="GitHub" target="_blank" rel="noreferrer">
//                 <FaGithub />
//               </a>
//             </div>
//           </div>
//         </motion.div>

//         {/* Bottom */}
//         <div className="footer__bottom">
//           <p>© {new Date().getFullYear()} NorthWind. All rights reserved.</p>
//          <div className="footer__bottom-links">
//   <Link to="/privacy-policy">Privacy Policy</Link>
//   <Link to="/terms-of-service">Terms of Service</Link>
//   <Link to="/cookie-policy">Cookie Policy</Link>
// </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import "./Footer.css";

const EMAIL = "contact@northwind.io";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: FaLinkedin },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ContactEmail() {
  const [copyState, setCopyState] = useState("idle"); // idle | success | error
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetCopyStateWithDelay = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopyState("idle"), 2000);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState("success");
    } catch {
      setCopyState("error");
    } finally {
      resetCopyStateWithDelay();
    }
  }, [resetCopyStateWithDelay]);

  const handleSendMessage = useCallback(() => {
    navigate("/contact");
    // "auto" is broadly supported; "instant" is not standard in many browsers.
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [navigate]);

  const copyLabel =
    copyState === "success" ? "✓ Copied!" : copyState === "error" ? "Copy failed" : "Copy";

  return (
    <div className="footer__email-wrap">
      <div className="footer__contact-item">
        <HiMail aria-hidden="true" />
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>

      <div className="footer__email-actions">
        <button
          type="button"
          className="footer__email-btn"
          onClick={handleCopy}
          title="Copy email"
          aria-live="polite"
        >
          {copyLabel}
        </button>
        <button
          type="button"
          className="footer__email-btn footer__email-btn--accent"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer__content"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">N</span>
              <span className="footer__logo-text">
                North<span className="accent">Wind</span>
              </span>
            </Link>
            <p className="footer__desc">
              Delivering cutting-edge IT solutions and consulting services to help businesses scale
              and innovate.
            </p>
          </div>

          <nav className="footer__links" aria-label="Company links">
            <h4>Company</h4>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="footer__contact">
            <h4>Contact</h4>
            <ContactEmail />
            <div className="footer__contact-item">
              <HiLocationMarker aria-hidden="true" />
              <span>Tirana, Albania</span>
            </div>
          </div>

          <div className="footer__social">
            <h4>Follow Us</h4>
            <div className="footer__social-icons">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} NorthWind. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}