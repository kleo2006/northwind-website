import { memo } from "react";

/**
 * @param {{ message: { id: string, role: 'user' | 'bot', content: string, timestamp: string } }} props
 */
function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`nw-chat__message ${isUser ? "nw-chat__message--user" : "nw-chat__message--bot"}`}
      role="listitem"
    >
      <div className="nw-chat__bubble">
        <p className="nw-chat__bubble-text">{message.content}</p>
        <time className="nw-chat__time" dateTime={message.timestamp}>
          {time}
        </time>
      </div>
    </div>
  );
}

export default memo(ChatMessage);