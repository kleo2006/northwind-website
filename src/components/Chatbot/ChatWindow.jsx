import { memo, useCallback, useEffect } from "react";
import { HiChevronUp, HiMinus, HiX } from "react-icons/hi";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickReplies from "./QuickReplies";
import TypingIndicator from "./TypingIndicator";
import LeadCaptureForm from "./leads/LeadCaptureForm";
import HumanHandoff from "./handoff/HumanHandoff";

/**
 * @param {{
 *   messages: Array<{ id: string, role: 'user' | 'bot', content: string, timestamp: string }>,
 *   isOpen: boolean,
 *   isMinimized: boolean,
 *   isTyping: boolean,
 *   messagesEndRef: import('react').RefObject<HTMLDivElement | null>,
 *   onClose: () => void,
 *   onMinimize: () => void,
 *   onRestore: () => void,
 *   onSend: (text: string) => void,
 *   onQuickReply: (id: string, label: string) => void,
 *   isCapturing: boolean,
 *   currentStep: string | null,
 *   currentPrompt: string | null,
 *   currentPlaceholder: string | null,
 *   stepError: string,
 *   stepProgress: { current: number, total: number } | null,
 *   onLeadStepSubmit: (value: string) => void,
 *   onLeadCancel: () => void,
 *   isHandoffOpen: boolean,
 *   handoffMode: string,
 *   handoffIsSubmitting: boolean,
 *   handoffSubmitSuccess: boolean,
 *   handoffSubmitError: string,
 *   capturedLead: object | null,
 *   onHandoffClose: () => void,
 *   onHandoffSubmit: (formData: object) => void,
 * }} props
 */
function ChatWindow({
  // Core (Steps 1-3)
  messages,
  isOpen,
  isMinimized,
  isTyping,
  messagesEndRef,
  onClose,
  onMinimize,
  onRestore,
  onSend,
  onQuickReply,
  // Step 4 — Lead Capture
  isCapturing,
  currentStep,
  currentPrompt,
  currentPlaceholder,
  stepError,
  stepProgress,
  onLeadStepSubmit,
  onLeadCancel,
  // Step 5 — Human Handoff
  isHandoffOpen,
  handoffMode,
  handoffIsSubmitting,
  handoffSubmitSuccess,
  handoffSubmitError,
  capturedLead,
  onHandoffClose,
  onHandoffSubmit,
}) {
  const handleEscape = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`nw-chat__window ${isMinimized ? "nw-chat__window--minimized" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="NorthWind live chat"
      >
        {/* Header */}
        <header
          className="nw-chat__header"
          onClick={isMinimized ? onRestore : undefined}
          onKeyDown={
            isMinimized
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onRestore();
                  }
                }
              : undefined
          }
          role={isMinimized ? "button" : undefined}
          tabIndex={isMinimized ? 0 : undefined}
        >
          <div className="nw-chat__header-info">
            <span className="nw-chat__avatar" aria-hidden="true">N</span>
            <div>
              <p className="nw-chat__header-title">NorthWind</p>
              <p className="nw-chat__header-status">
                <span className="nw-chat__status-dot" />
                Virtual IT Consultant
              </p>
            </div>
          </div>

          <div className="nw-chat__header-actions">
            {isMinimized ? (
              <button
                type="button"
                className="nw-chat__icon-btn"
                onClick={(e) => { e.stopPropagation(); onRestore(); }}
                aria-label="Restore chat"
              >
                <HiChevronUp aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="nw-chat__icon-btn"
                onClick={onMinimize}
                aria-label="Minimize chat"
              >
                <HiMinus aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              className="nw-chat__icon-btn"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close chat"
            >
              <HiX aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Body — only when not minimized */}
        {!isMinimized && (
          <>
            <div
              className="nw-chat__messages"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              <div role="list">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Hide quick replies during lead capture flow */}
            {!isCapturing && (
              <QuickReplies onSelect={onQuickReply} disabled={isTyping} />
            )}

            {/*
             * Step 4: LeadCaptureForm replaces ChatInput during capture.
             * Shows progress bar + validated input per step.
             * Step completes → ChatInput returns automatically.
             */}
            {isCapturing ? (
              <LeadCaptureForm
                currentStep={currentStep}
                currentPrompt={currentPrompt}
                currentPlaceholder={currentPlaceholder}
                stepError={stepError}
                stepProgress={stepProgress}
                onSubmit={onLeadStepSubmit}
                onCancel={onLeadCancel}
              />
            ) : (
              <ChatInput onSend={onSend} disabled={isTyping} />
            )}
          </>
        )}
      </div>

      {/*
       * Step 5: HumanHandoff modal sits outside the chat window
       * so it overlays the full page. prefilledData comes from
       * capturedLead so if Step 4 already ran, the form is pre-filled.
       */}
      <HumanHandoff
        isOpen={isHandoffOpen}
        mode={handoffMode}
        isSubmitting={handoffIsSubmitting}
        submitSuccess={handoffSubmitSuccess}
        submitError={handoffSubmitError}
        prefilledData={capturedLead ?? {}}
        onClose={onHandoffClose}
        onSubmit={onHandoffSubmit}
      />
    </>
  );
}

export default memo(ChatWindow);