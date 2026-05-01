import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsApp.css";

const WHATSAPP_NUMBER = "355683068605"; // Replace with real number
const WHATSAPP_MESSAGE = "Hello! I'm interested in NorthWind's IT services. Can we talk?";

export default function WhatsApp() {
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="whatsapp-btn__icon" />
      <span className="whatsapp-btn__tooltip">Chat with us</span>
      <span className="whatsapp-btn__pulse" />
    </motion.a>
  );
}