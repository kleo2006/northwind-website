import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { HiMail, HiOfficeBuilding } from "react-icons/hi";

import "./ContactForm.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // simulate request
    await new Promise((res) => setTimeout(res, 1200));

    setSuccess(true);
    reset();

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        {/* Header */}
        <motion.div
          className="contact__header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="contact__title">
            Get in <span className="accent">Touch</span>
          </h2>
          <p className="contact__sub">
            Let’s discuss how NorthWind can help your business scale with modern
            technology solutions.
          </p>
        </motion.div>

        <div className="contact__content">
          {/* FORM */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit(onSubmit)}
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="john@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            {/* Company */}
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                placeholder="Your Company"
                {...register("company")}
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Tell us about your project..."
                {...register("message", {
                  required: "Message is required",
                })}
              />
              {errors.message && <span>{errors.message.message}</span>}
            </div>

            {/* Button */}
            <motion.button
              type="submit"
              className="contact__btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>

            {/* Success */}
            {success && (
              <p className="contact__success">
                ✅ Message sent successfully!
              </p>
            )}
          </motion.form>

          {/* INFO SIDE */}
          <motion.div
            className="contact__info"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="contact__info-card">
              <HiMail className="contact__icon" />
              <div>
                <h4>Email</h4>
                <p>contact@northwind.io</p>
              </div>
            </div>

            <div className="contact__info-card">
              <HiOfficeBuilding className="contact__icon" />
              <div>
                <h4>Office</h4>
                <p>Global Remote Team</p>
              </div>
            </div>

            <p className="contact__note">
              We typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}