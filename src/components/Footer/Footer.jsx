import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const NAV_LINKS = [
  { label: "Home",     to: "/"         },
  { label: "Services", to: "/services" },
  { label: "Pricing",  to: "/pricing"  },
  { label: "Team",     to: "/team"     },
  { label: "Blog",     to: "/blog"     },
  { label: "Contact",  to: "/contact"  },
];

function ContactEmail() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText("contact@northwind.io");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="footer__email-wrap">
      <div className="footer__contact-item">
        <HiMail />
        <span>contact@northwind.io</span>
      </div>
      <div className="footer__email-actions">
        <button
          className="footer__email-btn"
          onClick={handleCopy}
          title="Copy email"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
        <button
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
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">N</span>
              <span className="footer__logo-text">
                North<span className="accent">Wind</span>
              </span>
            </Link>
            <p className="footer__desc">
              Delivering cutting-edge IT solutions and consulting services to
              help businesses scale and innovate.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__links">
            <h4>Company</h4>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to}>{label}</Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="footer__contact">
            <h4>Contact</h4>
            <ContactEmail />
            <div className="footer__contact-item">
              <HiLocationMarker />
              <span>Global Remote Team</span>
            </div>
          </div>

          {/* Social */}
          <div className="footer__social">
            <h4>Follow Us</h4>
            <div className="footer__social-icons">
              <a href="#" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="#" aria-label="GitHub" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} NorthWind. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}