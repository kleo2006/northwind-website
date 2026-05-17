

import React, { useState } from "react";

export default function Contact({
  onSubmit,
  isSubmitting = false,
  error = "",
  prefilledData = {},
}) {
  const [formData, setFormData] = useState({
    name: prefilledData.name || "",
    email: prefilledData.email || "",
    company: prefilledData.company || "",
    subject: "",
    message: prefilledData.challenge || "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      errs.name = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      errs.email = "Valid email is required.";
    if (!formData.company.trim())
      errs.company = "Company name is required.";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="nw-contact-form" noValidate>

      {/* Row: Name + Email */}
      <div className="nw-contact-form__row">
        <div className="nw-contact-form__field">
          <label className="nw-contact-form__label">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="John Smith"
            className={`nw-contact-form__input${fieldErrors.name ? " nw-contact-form__input--error" : ""}`}
          />
          {fieldErrors.name && (
            <span className="nw-contact-form__field-error">{fieldErrors.name}</span>
          )}
        </div>

        <div className="nw-contact-form__field">
          <label className="nw-contact-form__label">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="john@company.com"
            className={`nw-contact-form__input${fieldErrors.email ? " nw-contact-form__input--error" : ""}`}
          />
          {fieldErrors.email && (
            <span className="nw-contact-form__field-error">{fieldErrors.email}</span>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="nw-contact-form__field">
        <label className="nw-contact-form__label">Company *</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Acme Corp"
          className={`nw-contact-form__input${fieldErrors.company ? " nw-contact-form__input--error" : ""}`}
        />
        {fieldErrors.company && (
          <span className="nw-contact-form__field-error">{fieldErrors.company}</span>
        )}
      </div>

      {/* Subject — optional */}
      <div className="nw-contact-form__field">
        <label className="nw-contact-form__label">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="e.g., Need IT Security Assessment"
          className="nw-contact-form__input"
        />
      </div>

      {/* Message */}
      <div className="nw-contact-form__field">
        <label className="nw-contact-form__label">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Tell us about your IT challenge..."
          rows="3"
          className={`nw-contact-form__textarea${fieldErrors.message ? " nw-contact-form__input--error" : ""}`}
        />
        {fieldErrors.message && (
          <span className="nw-contact-form__field-error">{fieldErrors.message}</span>
        )}
      </div>

      {/* HubSpot / network error */}
      {error && <div className="nw-contact-form__error">{error}</div>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="nw-contact-form__submit"
      >
        {isSubmitting ? (
          <span className="nw-contact-form__submit-loading">
            <span /><span /><span />
          </span>
        ) : (
          "Send Message →"
        )}
      </button>
    </form>
  );
}