import "./TypingIndicator.css";

export default function TypingIndicator() {
  return (
    <div className="nw-typing-row" aria-label="NorthWind AI is typing" aria-live="polite">
      <div className="nw-typing-avatar" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="nw-typing-bubble" aria-hidden="true">
        <span className="nw-typing-dot" />
        <span className="nw-typing-dot" />
        <span className="nw-typing-dot" />
      </div>
    </div>
  );
}