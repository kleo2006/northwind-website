import React, { useState, useCallback } from "react";

/**
 * @param {{
 *   currentStep: string | null,
 *   currentPrompt: string | null,
 *   currentPlaceholder: string | null,
 *   stepError: string,
 *   stepProgress: { current: number, total: number } | null,
 *   onSubmit: (value: string) => void,
 *   onCancel: () => void,
 *   isSubmitting?: boolean,
 * }} props
 */
export default function LeadCaptureForm({
  currentStep,
  currentPrompt,
  currentPlaceholder,
  stepError,
  stepProgress,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    onSubmit(inputValue);
    setInputValue("");
  }, [inputValue, onSubmit]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (!currentStep) return null;

  return (
    <div
      style={{
        padding: "12px",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
        borderRadius: "0 0 8px 8px",
      }}
    >
      {/* Progress Bar */}
      {stepProgress && (
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
            Question {stepProgress.current} of {stepProgress.total}
          </div>
          <div
            style={{
              height: "4px",
              backgroundColor: "#e0e0e0",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#0066cc",
                width: `${(stepProgress.current / stepProgress.total) * 100}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Input Field */}
      <div style={{ marginBottom: "8px" }}>
        <input
          type={currentStep === "email" ? "email" : "text"}
          placeholder={currentPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          aria-label={currentPrompt}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: stepError ? "1px solid #d32f2f" : "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Error Message */}
      {stepError && (
        <div style={{ fontSize: "12px", color: "#d32f2f", marginBottom: "8px" }}>
          {stepError}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isSubmitting}
          style={{
            flex: 1,
            padding: "8px 12px",
            backgroundColor: inputValue.trim() ? "#0066cc" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: inputValue.trim() ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {isSubmitting ? "Submitting..." : "Next"}
        </button>

        <button
          onClick={onCancel}
          style={{
            padding: "8px 12px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}