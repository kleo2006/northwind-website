import { memo } from "react";

function TypingIndicator() {
  return (
    <div className="nw-chat__message nw-chat__message--bot" aria-label="NorthWind is typing">
      <div className="nw-chat__bubble nw-chat__bubble--typing">
        <span className="nw-chat__typing-dot" />
        <span className="nw-chat__typing-dot" />
        <span className="nw-chat__typing-dot" />
      </div>
    </div>
  );
}

export default memo(TypingIndicator);