
import { useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NewProcurement from "./pages/NewProcurement";
import "./App.css";
import AIAssistant from "./pages/AIAssistant";
import SupplierIntelligence from "./pages/SupplierIntelligence";
import AIDebateRoom from "./pages/AIDebateRoom";
import WhatIfSimulator from "./pages/WhatIfSimulator";
import NegotiationStudio from "./pages/NegotiationStudio";
import FinanceBudget from "./pages/FinanceBudget";
import PurchaseOrders from "./pages/PurchaseOrders";
import PayPalPayments from "./pages/PayPalPayments";
import Settings from "./pages/Settings";
import ProcurementHistory from "./pages/ProcurementHistory";

function App() {
  const [activePage, setActivePage] = useState("Overview");

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return <Dashboard />;

      case "New Procurement":
        return <NewProcurement />;
      case "AI Assistant":
        return <AIAssistant />;
      case "Supplier Intelligence":
        return <SupplierIntelligence />;
      case "AI Debate Room":
        return <AIDebateRoom />;
      case "What-If Simulator":
        return <WhatIfSimulator />;
      case "Negotiation Studio":
        return <NegotiationStudio />;
      case "Finance & Budget":
        return <FinanceBudget />;
      case "Purchase Orders":
        return <PurchaseOrders />;
      case "PayPal Payments":
        return <PayPalPayments />;
      case "Procurement History":
        return <ProcurementHistory />;
      case "Settings":
        return <Settings />;

      default:
        return (
          <div className="coming-soon">
            <span className="eyebrow">PROCURA INTELLIGENCE</span>
            <h1>{activePage}</h1>
            <p>
              Your {activePage.toLowerCase()} workspace is being
              prepared. We're building intelligent procurement
              features for this module.
            </p>
            <button onClick={() => setActivePage("Overview")}>
              Back to Overview
            </button>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;
