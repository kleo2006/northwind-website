import { useCallback, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import ChatLauncher from "./ChatLauncher";
import ChatWindow from "./ChatWindow";
import "./Chatbot.css";

export default function Chatbot() {
  const {
    // Core (Steps 1–3)
    messages,
    isOpen,
    isMinimized,
    unreadCount,
    isTyping,
    messagesEndRef,
    sendUserMessage,
    handleQuickReply,   // ← use the one from useChat, not a local override
    closeChat,
    minimizeChat,
    restoreChat,
    toggleChat,

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
  } = useChat();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");

    const syncBody = () => {
      const active = isOpen && !isMinimized;
      document.body.classList.toggle("nw-chat-open", active);
      document.body.style.overflow = active && mq.matches ? "hidden" : "";
    };

    syncBody();
    mq.addEventListener("change", syncBody);

    return () => {
      document.body.classList.remove("nw-chat-open");
      document.body.style.overflow = "";
      mq.removeEventListener("change", syncBody);
    };
  }, [isOpen, isMinimized]);

  const handleSend = useCallback(
    (text) => sendUserMessage(text),
    [sendUserMessage]
  );

  const rootClass = [
    "nw-chat",
    isOpen ? "nw-chat--open" : "",
    isMinimized ? "nw-chat--minimized" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-nw-chat>
      {isOpen && !isMinimized && (
        <button
          type="button"
          className="nw-chat__backdrop"
          aria-label="Close chat"
          onClick={closeChat}
          tabIndex={-1}
        />
      )}

      <ChatWindow
        // Core
        messages={messages}
        isOpen={isOpen}
        isMinimized={isMinimized}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        onClose={closeChat}
        onMinimize={minimizeChat}
        onRestore={restoreChat}
        onSend={handleSend}
        onQuickReply={handleQuickReply}

        // Step 4 — Lead Capture
        isCapturing={isCapturing}
        currentStep={currentStep}
        currentPrompt={currentPrompt}
        currentPlaceholder={currentPlaceholder}
        stepError={stepError}
        stepProgress={stepProgress}
        onLeadStepSubmit={onLeadStepSubmit}
        onLeadCancel={onLeadCancel}

        // Step 5 — Human Handoff
        isHandoffOpen={isHandoffOpen}
        handoffMode={handoffMode}
        handoffIsSubmitting={handoffIsSubmitting}
        handoffSubmitSuccess={handoffSubmitSuccess}
        handoffSubmitError={handoffSubmitError}
        capturedLead={capturedLead}
        onHandoffClose={onHandoffClose}
        onHandoffSubmit={onHandoffSubmit}
      />

      <ChatLauncher onClick={toggleChat} unreadCount={unreadCount} isOpen={isOpen} />
    </div>
  );
}