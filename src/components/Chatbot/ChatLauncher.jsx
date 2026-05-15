import { memo } from "react";
import { HiChatAlt2 } from "react-icons/hi";

/**
 * @param {{
 *   onClick: () => void,
 *   unreadCount: number,
 *   isOpen: boolean,
 * }} props
 */
function ChatLauncher({ onClick, unreadCount, isOpen }) {
  const showPulse = !isOpen;
  const showBadge = unreadCount > 0 && !isOpen;

  return (
    <button
      type="button"
      className={`nw-chat__launcher ${isOpen ? "nw-chat__launcher--active" : ""}`}
      onClick={onClick}
      aria-label={isOpen ? "Close NorthWind chat" : "Open NorthWind chat"}
      aria-expanded={isOpen}
    >
      <HiChatAlt2 className="nw-chat__launcher-icon" aria-hidden="true" />
      {showPulse && <span className="nw-chat__launcher-pulse" aria-hidden="true" />}
      {showBadge && (
        <span className="nw-chat__badge" aria-label={`${unreadCount} unread messages`}>
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}

export default memo(ChatLauncher);