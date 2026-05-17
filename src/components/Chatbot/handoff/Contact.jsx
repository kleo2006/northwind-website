

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
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Name */}
      <div>
        <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Company */}
      <div>
        <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>
          Company
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Subject */}
      <div>
        <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="e.g., Need IT Security Assessment"
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Message */}
      <div>
        <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Tell us more about your IT needs..."
          rows="4"
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <div style={{ fontSize: "12px", color: "#d32f2f", padding: "8px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "10px 16px",
          backgroundColor: isSubmitting ? "#ccc" : "#0066cc",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
