import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  HiMail,
  HiUser,
  HiOfficeBuilding,
  HiChatAlt2,
  HiCheckCircle,
  HiLocationMarker,
  HiPhone,
  HiClock,
} from "react-icons/hi";
import "./ContactForm.css";

const INFO = [
  {
    icon: <HiMail />,
    label: "Email Us",
    value: "contact@northwind.io",
    sub: "We reply within 2 hours",
    href:
      "mailto:contact@northwind.io?subject=IT%20Consultation%20Request&body=Hi%20NorthWind%2C%0A%0AI%20would%20like%20to%20discuss%20IT%20services%20for%20my%20business.%0A%0APlease%20let%20me%20know%20about%20availability%20for%20a%20free%20consultation.%0A%0AThank%20you%2C",
  },
  {
    icon: <HiPhone />,
    label: "Call Us",
    value: "+355 68 306 8605",
    sub: "Mon–Fri, 9am–6pm EST",
    href: "tel:+355683068605",
  },
  {
    icon: <HiLocationMarker />,
    label: "Location",
    value: "Tirana, Albania",
    sub: "Serving clients worldwide",
  },
  {
    icon: <HiClock />,
    label: "Support Hours",
    value: "24 / 7 Available",
    sub: "Emergency line always open",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const portalId = useMemo(() => import.meta.env.VITE_HUBSPOT_PORTAL_ID, []);
  const formId = useMemo(() => import.meta.env.VITE_HUBSPOT_FORM_ID, []);
  const endpoint = useMemo(() => {
    if (!portalId || !formId) return "";
    return `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  }, [portalId, formId]);

  const onSubmit = async (data) => {
    if (!endpoint) {
      setSubmitError("Configuration error. Please try again later.");
      return;
    }

    setLoading(true);
    setSubmitError("");

    const name = data.name.trim();
    const nameParts = name.split(/\s+/);
    const firstname = nameParts[0] || name;
    const lastname = nameParts.slice(1).join(" ") || "-";

    const payload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "email", value: data.email.trim() },
        { name: "company", value: data.company.trim() },
        { name: "message", value: data.message.trim() },
      ],
      context: {
        pageUri: window.location.href,
        pageName: "NorthWind Contact Form",
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let details = "";
        try {
          const err = await response.json();
          details = err?.message || "";
          console.error("HubSpot error:", err);
        } catch {
          // no-op
        }
        setSubmitError(details || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Network error:", error);
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact__eyebrow">Get In Touch</div>
          <h2 className="contact__title">
            Let's Talk About Your <span className="accent">IT Needs</span>
          </h2>
          <p className="contact__sub">
            Whether you need a full infrastructure overhaul or just a second
            opinion — we're here. Fill out the form and we'll be in touch
            within one business day.
          </p>
        </motion.div>

        <div className="contact__layout">
          <motion.div
            className="contact__info"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {INFO.map(({ icon, label, value, sub, href }) => (
              <motion.div key={label} className="contact-info-card" variants={fadeUp}>
                <div className="contact-info-card__icon">{icon}</div>
                <div>
                  <div className="contact-info-card__label">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      className="contact-info-card__value"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="contact-info-card__value">{value}</div>
                  )}
                  <div className="contact-info-card__sub">{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-live="polite"
                >
                  <div className="contact__success-icon">
                    <HiCheckCircle />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thanks for reaching out. A NorthWind consultant will contact
                    you within one business day.
                  </p>
                  <button
                    type="button"
                    className="contact__success-btn"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact__form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <div className="contact__row">
                    <div className="contact__field">
                      <label className="contact__label" htmlFor="name">
                        <HiUser /> Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        className={`contact__input${errors.name ? " contact__input--error" : ""}`}
                        {...register("name", {
                          required: "Full name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" },
                        })}
                      />
                      {errors.name && <span className="contact__error">{errors.name.message}</span>}
                    </div>

                    <div className="contact__field">
                      <label className="contact__label" htmlFor="email">
                        <HiMail /> Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className={`contact__input${errors.email ? " contact__input--error" : ""}`}
                        {...register("email", {
                          required: "Email address is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="contact__error">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="company">
                      <HiOfficeBuilding /> Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Corp"
                      className={`contact__input${errors.company ? " contact__input--error" : ""}`}
                      {...register("company", { required: "Company name is required" })}
                    />
                    {errors.company && (
                      <span className="contact__error">{errors.company.message}</span>
                    )}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="message">
                      <HiChatAlt2 /> Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your IT challenges or what you're looking to achieve..."
                      className={`contact__input contact__textarea${
                        errors.message ? " contact__input--error" : ""
                      }`}
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 20, message: "Message must be at least 20 characters" },
                      })}
                    />
                    {errors.message && (
                      <span className="contact__error">{errors.message.message}</span>
                    )}
                  </div>

                  {submitError ? (
                    <p className="contact__error" aria-live="assertive">
                      {submitError}
                    </p>
                  ) : null}

                  <motion.button
                    type="submit"
                    className={`contact__submit${loading ? " contact__submit--loading" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="contact__spinner" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}