import {
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

function Navbar({ activePage }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-divider">/</span>
        <strong>{activePage}</strong>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </div>

        <button className="topbar-icon" title="Calendar">
          <CalendarDays size={19} />
        </button>

        <button className="topbar-icon notification" title="Notifications">
          <Bell size={19} />
          <span />
        </button>

        <div className="topbar-user">
          <div className="profile-avatar small">H</div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;