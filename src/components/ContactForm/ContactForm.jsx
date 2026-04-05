import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  },
  {
    icon: <HiPhone />,
    label: "Call Us",
    value: "+1 (555) 000-1234",
    sub: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: <HiLocationMarker />,
    label: "Location",
    value: "Global Remote Team",
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
  const [loading, setLoading]     = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form data:", data);
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">

        {/* Header */}
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

        {/* Layout */}
        <div className="contact__layout">

          {/* Info cards */}
          <motion.div
            className="contact__info"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {INFO.map(({ icon, label, value, sub }) => (
              <motion.div
                key={label}
                className="contact-info-card"
                variants={fadeUp}
              >
                <div className="contact-info-card__icon">{icon}</div>
                <div>
                  <div className="contact-info-card__label">{label}</div>
                  <div className="contact-info-card__value">{value}</div>
                  <div className="contact-info-card__sub">{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
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
                >
                  <div className="contact__success-icon">
                    <HiCheckCircle />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thanks for reaching out. A NorthWind consultant will
                    contact you within one business day.
                  </p>
                  <button
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
                  {/* Row: Name + Email */}
                  <div className="contact__row">
                    {/* Name */}
                    <div className="contact__field">
                      <label className="contact__label" htmlFor="name">
                        <HiUser /> Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        className={"contact__input" + (errors.name ? " contact__input--error" : "")}
                        {...register("name", {
                          required: "Full name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" },
                        })}
                      />
                      {errors.name && (
                        <span className="contact__error">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="contact__field">
                      <label className="contact__label" htmlFor="email">
                        <HiMail /> Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className={"contact__input" + (errors.email ? " contact__input--error" : "")}
                        {...register("email", {
                          required: "Email address is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="contact__error">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="company">
                      <HiOfficeBuilding /> Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Corp"
                      className={"contact__input" + (errors.company ? " contact__input--error" : "")}
                      {...register("company", {
                        required: "Company name is required",
                      })}
                    />
                    {errors.company && (
                      <span className="contact__error">{errors.company.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="message">
                      <HiChatAlt2 /> Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your IT challenges or what you're looking to achieve..."
                      className={"contact__input contact__textarea" + (errors.message ? " contact__input--error" : "")}
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 20, message: "Message must be at least 20 characters" },
                      })}
                    />
                    {errors.message && (
                      <span className="contact__error">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className={"contact__submit" + (loading ? " contact__submit--loading" : "")}
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