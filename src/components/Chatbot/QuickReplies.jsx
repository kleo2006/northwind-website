import { memo } from "react";
import { QUICK_REPLIES } from "./constants";

/**
 * @param {{ onSelect: (id: string, label: string) => void, disabled?: boolean }} props
 */
function QuickReplies({ onSelect, disabled = false }) {
  return (
    <div className="nw-chat__quick-replies" role="group" aria-label="Quick replies">
      {QUICK_REPLIES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className="nw-chat__quick-btn"
          disabled={disabled}
          onClick={() => onSelect(id, label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default memo(QuickReplies);