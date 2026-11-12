
import { useMemo, useState } from "react";
import {
  Wallet,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  PieChart,
  Target,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Lightbulb,
  ShoppingCart,
  Truck,
  Monitor,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

const initialCategories = [
  { name: "Technology", budget: 80000, spent: 52000, icon: Monitor },
  { name: "Raw Materials", budget: 100000, spent: 68000, icon: Package },
  { name: "Logistics", budget: 40000, spent: 26000, icon: Truck },
  { name: "Office Supplies", budget: 30000, spent: 12000, icon: ShoppingCart },
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function FinanceBudget() {
  const [totalBudget, setTotalBudget] = useState(300000);
  const [categories, setCategories] = useState(initialCategories);
  const [savingsTarget, setSavingsTarget] = useState(50000);
  const [showDetails, setShowDetails] = useState(false);

  const totalAllocated = categories.reduce(
    (sum, item) => sum + item.budget,
    0
  );

  const totalSpent = categories.reduce(
    (sum, item) => sum + item.spent,
    0
  );

  const remaining = totalBudget - totalSpent;
  const unallocated = totalBudget - totalAllocated;
  const utilization = (totalSpent / totalBudget) * 100;

  const potentialSavings = Math.max(
    0,
    categories.reduce(
      (sum, item) => sum + item.budget - item.spent,
      0
    )
  );

  const savingsProgress = Math.min(
    100,
    (potentialSavings / savingsTarget) * 100
  );

  const financialHealth = useMemo(() => {
    if (totalSpent > totalBudget) return "Critical";
    if (utilization >= 85) return "Needs Attention";
    if (utilization >= 65) return "Moderate";
    return "Healthy";
  }, [totalSpent, totalBudget, utilization]);

  const updateAllocation = (index, value) => {
    const updated = [...categories];
    updated[index] = {
      ...updated[index],
      budget: Number(value),
    };
    setCategories(updated);
  };

  const updateSpending = (index, value) => {
    const updated = [...categories];
    updated[index] = {
      ...updated[index],
      spent: Number(value),
    };
    setCategories(updated);
  };

  const reset = () => {
    setTotalBudget(300000);
    setCategories(initialCategories);
    setSavingsTarget(50000);
    setShowDetails(false);
  };

  const addSpending = (index, amount) => {
    const updated = [...categories];
    updated[index] = {
      ...updated[index],
      spent: Math.max(0, updated[index].spent + amount),
    };
    setCategories(updated);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="welcome-section">
        <div>
          <p className="eyebrow">FINANCIAL INTELLIGENCE</p>
          <h1>Finance & Budget</h1>
          <p>
            Monitor procurement expenses, optimize budget allocation
            and discover potential savings.
          </p>
        </div>
      </div>

      {/* HERO */}
      <div
        className="panel"
        style={{
          padding: "25px",
          marginBottom: "22px",
          background: "linear-gradient(120deg, #172b48, #26345e)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Wallet size={38} />
          <div>
            <h2 style={{ margin: 0 }}>Take control of every rupee.</h2>
            <p style={{ opacity: 0.8, marginTop: "8px" }}>
              Make smarter financial decisions with real-time
              interactive procurement insights.
            </p>
          </div>
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Budget</span>
            <Wallet size={21} />
          </div>
          <h2>{money(totalBudget)}</h2>
          <p>Available procurement budget</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Total Spent</span>
            <TrendingDown size={21} />
          </div>
          <h2>{money(totalSpent)}</h2>
          <p>Across all categories</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Remaining Balance</span>
            <IndianRupee size={21} />
          </div>
          <h2 style={{ color: remaining >= 0 ? "#22C55E" : "#EF4444" }}>
            {money(remaining)}
          </h2>
          <p>Unspent procurement funds</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Potential Savings</span>
            <TrendingUp size={21} />
          </div>
          <h2 style={{ color: "#22C55E" }}>
            {money(potentialSavings)}
          </h2>
          <p>Remaining allocated funds</p>
        </div>
      </div>

      {/* BUDGET UTILIZATION */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">BUDGET PERFORMANCE</p>
            <h3>Overall Budget Utilization</h3>
            <p>Track how much of your procurement budget is being used.</p>
          </div>
          <PieChart size={25} />
        </div>

        <div style={{ marginTop: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <h1 style={{ fontSize: "36px", margin: 0 }}>
              {utilization.toFixed(1)}%
            </h1>
            <span
              className={`status ${
                financialHealth === "Healthy" ? "approved" : ""
              }`}
            >
              {financialHealth}
            </span>
          </div>

          <div
            style={{
              height: "14px",
              background: "rgba(128,128,128,0.2)",
              borderRadius: "20px",
              overflow: "hidden",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, Math.max(0, utilization))}%`,
                background:
                  utilization >= 100
                    ? "#EF4444"
                    : utilization >= 85
                    ? "#F59E0B"
                    : "#22C55E",
                borderRadius: "20px",
                transition: "width 0.3s",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span>Spent: {money(totalSpent)}</span>
            <span>Budget: {money(totalBudget)}</span>
          </div>

          {remaining < 0 && (
            <p style={{ color: "#EF4444", marginTop: "15px" }}>
              <AlertTriangle size={16} /> Budget exceeded by{" "}
              {money(Math.abs(remaining))}
            </p>
          )}
        </div>
      </div>

      {/* BUDGET SETTINGS */}
      <div
        className="panel"
        style={{ marginTop: "22px" }}
      >
        <div className="panel-header">
          <div>
            <p className="eyebrow">FINANCIAL CONFIGURATION</p>
            <h3>Budget Settings</h3>
            <p>Adjust your financial targets.</p>
          </div>
          <Target size={24} />
        </div>

        <div style={{ marginTop: "22px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <strong>Total Procurement Budget</strong>
            <strong>{money(totalBudget)}</strong>
          </div>

          <input
            type="range"
            min="100000"
            max="1000000"
            step="10000"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            style={{ width: "100%", marginTop: "15px" }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <small>₹1,00,000</small>
            <small>₹10,00,000</small>
          </div>
        </div>

        <div style={{ marginTop: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <strong>Savings Target</strong>
            <strong>{money(savingsTarget)}</strong>
          </div>

          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={savingsTarget}
            onChange={(e) => setSavingsTarget(Number(e.target.value))}
            style={{ width: "100%", marginTop: "15px" }}
          />
        </div>
      </div>

      {/* CATEGORY ALLOCATION */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">SMART ALLOCATION</p>
            <h3>Category-wise Budget Allocation</h3>
            <p>Modify allocations and monitor spending by category.</p>
          </div>
          <ShoppingCart size={24} />
        </div>

        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <strong>Total Allocated</strong>
            <strong>{money(totalAllocated)}</strong>
          </div>

          <p
            style={{
              color: unallocated >= 0 ? "#22C55E" : "#EF4444",
              marginTop: "8px",
            }}
          >
            {unallocated >= 0
              ? `${money(unallocated)} remains unallocated`
              : `${money(Math.abs(unallocated))} overallocated`}
          </p>
        </div>

        {categories.map((category, index) => {
          const Icon = category.icon;
          const percentage =
            category.budget > 0
              ? (category.spent / category.budget) * 100
              : category.spent > 0
              ? 100
              : 0;

          return (
            <div
              key={category.name}
              style={{
                marginTop: "25px",
                padding: "17px",
                border: "1px solid rgba(128,128,128,0.2)",
                borderRadius: "13px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Icon size={23} />
                  <div>
                    <strong>{category.name}</strong>
                    <p style={{ margin: "5px 0", opacity: 0.7 }}>
                      Spent: {money(category.spent)}
                    </p>
                  </div>
                </div>

                <strong>{money(category.budget)}</strong>
              </div>

              <p style={{ marginTop: "18px" }}>
                <strong>Allocation</strong>
              </p>

              <input
                type="range"
                min="0"
                max="250000"
                step="5000"
                value={category.budget}
                onChange={(e) =>
                  updateAllocation(index, e.target.value)
                }
                style={{ width: "100%" }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  opacity: 0.7,
                }}
              >
                <span>₹0</span>
                <span>₹2,50,000</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "18px",
                }}
              >
                <strong>Spending Utilization</strong>
                <strong>{percentage.toFixed(1)}%</strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "rgba(128,128,128,0.2)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginTop: "9px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, percentage)}%`,
                    background:
                      percentage > 100 ? "#EF4444" : "#6366F1",
                    borderRadius: "20px",
                  }}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                <label>
                  <strong>Adjust Recorded Spending</strong>
                </label>
                <input
                  type="number"
                  min="0"
                  value={category.spent}
                  onChange={(e) =>
                    updateSpending(index, Math.max(0, Number(e.target.value)))
                  }
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "11px",
                    marginTop: "8px",
                    borderRadius: "8px",
                    border: "1px solid rgba(128,128,128,0.4)",
                    background: "transparent",
                    color: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                <button
                  className="select-button"
                  type="button"
                  onClick={() => addSpending(index, 5000)}
                >
                  + ₹5,000 Spending
                </button>
                <button
                  className="select-button"
                  type="button"
                  onClick={() => addSpending(index, -5000)}
                >
                  - ₹5,000 Spending
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SAVINGS TRACKER */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">SAVINGS INTELLIGENCE</p>
            <h3>Procurement Savings Tracker</h3>
          </div>
          <TrendingUp size={25} />
        </div>

        <div style={{ marginTop: "22px" }}>
          <h1 style={{ color: "#22C55E", fontSize: "35px" }}>
            {money(potentialSavings)}
          </h1>
          <p>Potential remaining allocated funds</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <strong>Savings Target Progress</strong>
            <strong>{savingsProgress.toFixed(1)}%</strong>
          </div>

          <div
            style={{
              height: "12px",
              background: "rgba(128,128,128,0.2)",
              borderRadius: "20px",
              overflow: "hidden",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: `${savingsProgress}%`,
                height: "100%",
                background: "#22C55E",
                borderRadius: "20px",
                transition: "width 0.3s",
              }}
            />
          </div>

          <p style={{ marginTop: "12px" }}>
            Target: {money(savingsTarget)}
          </p>
        </div>
      </div>

      {/* FINANCIAL HEALTH */}
      <div
        className="panel"
        style={{
          marginTop: "22px",
          background: "rgba(99,102,241,0.07)",
        }}
      >
        <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
          <ShieldCheck size={29} color="#818CF8" />
          <div>
            <p className="eyebrow">FINANCIAL HEALTH CHECK</p>
            <h3>{financialHealth}</h3>
          </div>
        </div>

        <p style={{ marginTop: "15px" }}>
          {financialHealth === "Critical"
            ? "Your procurement spending has exceeded the available budget. Review expenses and revise your allocation immediately."
            : financialHealth === "Needs Attention"
            ? "Your budget utilization is high. Monitor upcoming purchases and avoid unnecessary expenses."
            : financialHealth === "Moderate"
            ? "Your spending is progressing steadily. Continue monitoring category-wise expenses."
            : "Your procurement finances are currently within a healthy range. Continue tracking expenses and optimizing allocations."}
        </p>

        <div style={{ marginTop: "18px" }}>
          <h4>
            <Lightbulb size={17} /> Financial Recommendations
          </h4>

          {[
            "Review categories with high spending utilization.",
            "Compare supplier quotations before approving purchases.",
            "Avoid allocating more funds than your total budget.",
            "Track potential savings before finalizing procurement.",
          ].map((tip, index) => (
            <p key={index} style={{ marginTop: "12px" }}>
              <Sparkles size={15} color="#A78BFA" /> {tip}
            </p>
          ))}
        </div>
      </div>

      {/* DETAILED SUMMARY */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <h3>Financial Summary</h3>
            <p>Your current procurement financial snapshot.</p>
          </div>
          <IndianRupee size={24} />
        </div>

        <div style={{ marginTop: "18px" }}>
          {[
            ["Total Budget", totalBudget],
            ["Total Allocated", totalAllocated],
            ["Total Spent", totalSpent],
            ["Remaining Balance", remaining],
            ["Unallocated Budget", unallocated],
            ["Potential Savings", potentialSavings],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                padding: "14px 0",
                borderBottom: "1px solid rgba(128,128,128,0.2)",
              }}
            >
              <span>{label}</span>
              <strong>{money(value)}</strong>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="select-button"
          onClick={() => setShowDetails(!showDetails)}
          style={{ width: "100%", marginTop: "18px" }}
        >
          {showDetails ? "Hide Category Details" : "View Category Details"}
        </button>

        {showDetails && (
          <div style={{ marginTop: "15px", overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "400px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ padding: "10px" }}>Category</th>
                  <th style={{ padding: "10px" }}>Budget</th>
                  <th style={{ padding: "10px" }}>Spent</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.name}>
                    <td style={{ padding: "10px" }}>{item.name}</td>
                    <td style={{ padding: "10px" }}>{money(item.budget)}</td>
                    <td style={{ padding: "10px" }}>{money(item.spent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RESET */}
      <button
        type="button"
        className="select-button"
        onClick={reset}
        style={{ width: "100%", marginTop: "22px", padding: "14px" }}
      >
        <RotateCcw size={17} /> Reset Financial Dashboard
      </button>

      <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "18px" }}>
        Demo mode: Financial values are illustrative. Changes are
        maintained in the current page session only. This module
        does not yet connect to real accounting or payment systems.
      </p>
    </div>
  );
}
