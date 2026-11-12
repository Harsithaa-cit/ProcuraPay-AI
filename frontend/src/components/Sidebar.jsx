
import {
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Store,
  BrainCircuit,
  SlidersHorizontal,
  MessagesSquare,
  WalletCards,
  ClipboardList,
  CreditCard,
  History,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const navigationItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "New Procurement", icon: ShoppingCart },
  { name: "AI Assistant", icon: Bot },
  { name: "Supplier Intelligence", icon: Store },
  { name: "AI Debate Room", icon: BrainCircuit },
  { name: "What-If Simulator", icon: SlidersHorizontal },
  { name: "Negotiation Studio", icon: MessagesSquare },
  { name: "Finance & Budget", icon: WalletCards },
  { name: "Purchase Orders", icon: ClipboardList },
  { name: "PayPal Payments", icon: CreditCard },
  { name: "Procurement History", icon: History },
  { name: "Settings", icon: Settings },
];

function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  onLogout,
}) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* BRAND LOGO */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <ShoppingCart size={23} />
        </div>

        {!collapsed && (
          <div>
            <h2>
              Procura<span>Pay</span>
            </h2>
            <small>INTELLIGENCE PLATFORM</small>
          </div>
        )}
      </div>

      {/* NAVIGATION LABEL */}
      {!collapsed && (
        <div className="workspace-label">
          WORKSPACE
        </div>
      )}

      {/* NAVIGATION ITEMS */}
      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.name;

          return (
            <button
              key={item.name}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => setActivePage(item.name)}
              title={collapsed ? item.name : ""}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={19} strokeWidth={1.8} />

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI PROMOTION CARD */}
      {!collapsed && (
        <div className="sidebar-ai-card">
          <div className="ai-card-icon">
            <Sparkles size={20} />
          </div>

          <h4>Meet your AI Copilot</h4>

          <p>
            Let AI analyse procurement requirements
            and discover smarter purchasing decisions.
          </p>

          <button
            onClick={() => setActivePage("AI Assistant")}
          >
            Explore AI Assistant <span>→</span>
          </button>
        </div>
      )}

      {/* COLLAPSE / EXPAND */}
      <button
        className="collapse-button"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight size={19} />
        ) : (
          <ChevronLeft size={19} />
        )}

        {!collapsed && <span>Collapse sidebar</span>}
      </button>

      {/* USER PROFILE */}
      {!collapsed && (
        <div className="sidebar-profile">
          <div className="profile-avatar">
            H
          </div>

          <div className="profile-info">
            <strong>Business Owner</strong>
            <small>Administrator</small>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut size={17} />
          </button>
        </div>
      )}

    </aside>
  );
}

export default Sidebar;
