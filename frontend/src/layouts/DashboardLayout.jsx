
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({
  activePage,
  setActivePage,
  onLogout,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={onLogout}
      />

      <main className="main-area">
        <Navbar activePage={activePage} />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
