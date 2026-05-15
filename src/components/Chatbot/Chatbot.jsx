import { useCallback, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import ChatLauncher from "./ChatLauncher";
import ChatWindow from "./ChatWindow";
import "./Chatbot.css";

export default function Chatbot() {
  const {
    messages,
    isOpen,
    isMinimized,
    unreadCount,
    isTyping,
    messagesEndRef,
    sendUserMessage,
    closeChat,
    minimizeChat,
    restoreChat,
    toggleChat,
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
    (text) => {
      sendUserMessage(text);
    },
    [sendUserMessage]
  );

  const handleQuickReply = useCallback(
    (id, label) => {
      sendUserMessage(label, id);
    },
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
      />
      <ChatLauncher onClick={toggleChat} unreadCount={unreadCount} isOpen={isOpen} />
    </div>
  );
}