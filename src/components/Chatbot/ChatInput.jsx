import { memo, useCallback, useRef, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";

/**
 * @param {{ onSend: (text: string) => void, disabled?: boolean }} props
 */
function ChatInput({ onSend, disabled = false }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    inputRef.current?.focus();
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit]
  );

  return (
    <form
      className="nw-chat__input-row"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor="nw-chat-input" className="sr-only">
        Type your message
      </label>
      <input
        id="nw-chat-input"
        ref={inputRef}
        type="text"
        className="nw-chat__input"
        placeholder="Type a message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        enterKeyHint="send"
      />
      <button
        type="submit"
        className="nw-chat__send"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <HiPaperAirplane aria-hidden="true" />
      </button>
    </form>
  );
}

export default memo(ChatInput);