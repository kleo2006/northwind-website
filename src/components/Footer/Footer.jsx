import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";

import "./Footer.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
            <h3 className="footer__logo">NorthWind</h3>
            <p className="footer__desc">
              Delivering cutting-edge IT solutions and consulting services to
              help businesses scale and innovate.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__links">
            <h4>Company</h4>
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/pricing">Pricing</a>
            <a href="/team">Team</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>

          {/* Contact Info */}
          <div className="footer__contact">
            <h4>Contact</h4>
            <div className="footer__contact-item">
              <HiMail />
              <span>contact@northwind.io</span>
            </div>
            <div className="footer__contact-item">
              <HiLocationMarker />
              <span>Global Remote Team</span>
            </div>
          </div>

          {/* Social */}
          <div className="footer__social">
            <h4>Follow Us</h4>
            <div className="footer__social-icons">
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} NorthWind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}