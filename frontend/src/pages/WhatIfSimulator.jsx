
import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Package,
  Clock,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Target,
} from "lucide-react";

const suppliers = [
  {
    name: "TechNova Solutions",
    unitPrice: 1250,
    quality: 97,
    delivery: 3,
    reliability: 98,
  },
  {
    name: "Global Industrial Co.",
    unitPrice: 1180,
    quality: 94,
    delivery: 5,
    reliability: 95,
  },
  {
    name: "PrimeSource Technologies",
    unitPrice: 1320,
    quality: 96,
    delivery: 4,
    reliability: 91,
  },
];

const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function WhatIfSimulator() {
  const [budget, setBudget] = useState(150000);
  const [quantity, setQuantity] = useState(100);
  const [discount, setDiscount] = useState(5);
  const [deliveryLimit, setDeliveryLimit] = useState(5);
  const [selectedSupplier, setSelectedSupplier] = useState(0);

  const selected = suppliers[selectedSupplier];

  const results = useMemo(() => {
    const supplierResults = suppliers.map((supplier) => {
      const originalCost = supplier.unitPrice * quantity;
      const finalCost = originalCost * (1 - discount / 100);
      const savings = originalCost - finalCost;
      const withinBudget = finalCost <= budget;
      const deliveryOK = supplier.delivery <= deliveryLimit;

      const score =
        supplier.quality * 0.3 +
        supplier.reliability * 0.3 +
        (supplier.delivery <= deliveryLimit ? 100 : 40) * 0.2 +
        (withinBudget ? 100 : 30) * 0.2;

      return {
        ...supplier,
        originalCost,
        finalCost,
        savings,
        withinBudget,
        deliveryOK,
        score: Math.round(score),
      };
    });

    const eligible = supplierResults.filter(
      (supplier) => supplier.withinBudget && supplier.deliveryOK
    );

    const recommended = [...(eligible.length ? eligible : supplierResults)]
      .sort((a, b) => b.score - a.score)[0];

    const current = supplierResults[selectedSupplier];

    return {
      supplierResults,
      recommended,
      current,
      totalSavings: current.savings,
      remainingBudget: budget - current.finalCost,
      budgetUsed: (current.finalCost / budget) * 100,
    };
  }, [budget, quantity, discount, deliveryLimit, selectedSupplier]);

  const reset = () => {
    setBudget(150000);
    setQuantity(100);
    setDiscount(5);
    setDeliveryLimit(5);
    setSelectedSupplier(0);
  };

  const updateNumber = (setter, value, min, max) => {
    const number = Number(value);
    if (Number.isFinite(number)) {
      setter(Math.min(max, Math.max(min, number)));
    }
  };

  return (
    <div>
      <div className="welcome-section">
        <div>
          <p className="eyebrow">PREDICTIVE PROCUREMENT ANALYTICS</p>
          <h1>What-If Simulator</h1>
          <p>
            Experiment with procurement scenarios before making
            real purchasing decisions.
          </p>
        </div>
      </div>

      {/* Intro banner */}
      <div
        className="panel"
        style={{
          padding: "23px",
          background: "linear-gradient(120deg, #172b48, #26345e)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <SlidersHorizontal size={32} />
          <div>
            <h2 style={{ margin: 0 }}>Your decisions. Simulated outcomes.</h2>
            <p style={{ opacity: 0.8, marginTop: "8px" }}>
              Adjust the variables and instantly compare procurement outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Main controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "22px",
        }}
      >
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Scenario Controls</h3>
              <p>Customize your procurement conditions</p>
            </div>
            <SlidersHorizontal size={22} />
          </div>

          {/* Budget */}
          <div style={{ marginTop: "24px" }}>
            <label>
              <strong>Procurement Budget</strong>
            </label>
            <h2 style={{ margin: "8px 0" }}>{currency(budget)}</h2>
            <input
              type="range"
              min="50000"
              max="300000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <small>₹50,000</small>
              <small>₹3,00,000</small>
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginTop: "25px" }}>
            <label>
              <strong>Required Quantity</strong>
            </label>
            <h2 style={{ margin: "8px 0" }}>{quantity} units</h2>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <small>10 units</small>
              <small>500 units</small>
            </div>
          </div>

          {/* Discount */}
          <div style={{ marginTop: "25px" }}>
            <label>
              <strong>Expected Discount</strong>
            </label>
            <h2 style={{ margin: "8px 0" }}>{discount}%</h2>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <small>0%</small>
              <small>30%</small>
            </div>
          </div>

          {/* Delivery */}
          <div style={{ marginTop: "25px" }}>
            <label>
              <strong>Maximum Delivery Time</strong>
            </label>
            <h2 style={{ margin: "8px 0" }}>{deliveryLimit} days</h2>
            <input
              type="range"
              min="1"
              max="10"
              value={deliveryLimit}
              onChange={(e) => setDeliveryLimit(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <small>1 day</small>
              <small>10 days</small>
            </div>
          </div>

          {/* Supplier */}
          <div style={{ marginTop: "25px" }}>
            <label>
              <strong>Compare With Supplier</strong>
            </label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                borderRadius: "9px",
                border: "1px solid #aaa",
                background: "transparent",
                color: "inherit",
              }}
            >
              {suppliers.map((supplier, index) => (
                <option key={supplier.name} value={index}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="select-button"
            onClick={reset}
            style={{ marginTop: "25px", width: "100%" }}
          >
            <RotateCcw size={16} /> Reset Scenario
          </button>
        </div>

        {/* Results */}
        <div>
          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">SIMULATION RESULTS</p>
                <h3>Financial Impact</h3>
              </div>
              <IndianRupee size={22} />
            </div>

            <div style={{ marginTop: "22px" }}>
              <p style={{ opacity: 0.7 }}>Estimated Total Cost</p>
              <h1 style={{ fontSize: "34px", margin: "7px 0" }}>
                {currency(results.current.finalCost)}
              </h1>
              <p style={{ opacity: 0.7 }}>
                Before discount: {currency(results.current.originalCost)}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
                marginTop: "22px",
              }}
            >
              <div className="stat-card">
                <TrendingDown size={21} color="#22C55E" />
                <h2 style={{ color: "#22C55E" }}>
                  {currency(results.totalSavings)}
                </h2>
                <p>Discount savings</p>
              </div>

              <div className="stat-card">
                <IndianRupee size={21} />
                <h2>{currency(results.remainingBudget)}</h2>
                <p>Budget remaining</p>
              </div>
            </div>

            <div style={{ marginTop: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "9px",
                }}
              >
                <strong>Budget Utilization</strong>
                <strong>{Math.round(results.budgetUsed)}%</strong>
              </div>

              <div
                style={{
                  height: "11px",
                  background: "rgba(128,128,128,0.2)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, Math.max(0, results.budgetUsed))}%`,
                    background:
                      results.current.withinBudget ? "#22C55E" : "#EF4444",
                    borderRadius: "20px",
                    transition: "width 0.3s",
                  }}
                />
              </div>

              <p style={{ marginTop: "12px" }}>
                {results.current.withinBudget ? (
                  <>
                    <CheckCircle size={15} color="#22C55E" /> Within your
                    procurement budget
                  </>
                ) : (
                  <>
                    <AlertTriangle size={15} color="#EF4444" /> Exceeds your
                    budget by{" "}
                    {currency(-results.remainingBudget)}
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div
            className="panel"
            style={{ marginTop: "20px", border: "1px solid #22C55E" }}
          >
            <div className="panel-header">
              <div>
                <p className="eyebrow">SMART RECOMMENDATION</p>
                <h3>Best Scenario Match</h3>
              </div>
              <Target size={24} />
            </div>

            <h2 style={{ marginTop: "20px" }}>
              {results.recommended.name}
            </h2>

            <h1 style={{ fontSize: "34px", color: "#22C55E" }}>
              {results.recommended.score}/100
            </h1>
            <p>Scenario evaluation score</p>

            <div style={{ marginTop: "18px" }}>
              <p>
                Estimated total:{" "}
                <strong>{currency(results.recommended.finalCost)}</strong>
              </p>
              <p>
                Quality: {results.recommended.quality}%
              </p>
              <p>
                Delivery: {results.recommended.delivery} days
              </p>
              <p>
                Reliability: {results.recommended.reliability}%
              </p>
            </div>

            <span
              className="status approved"
              style={{ display: "inline-flex", marginTop: "12px" }}
            >
              <CheckCircle size={14} /> Recommended option
            </span>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <h3>Supplier Scenario Comparison</h3>
            <p>See how every supplier performs under your current settings.</p>
          </div>
          <Package size={22} />
        </div>

        <div style={{ overflowX: "auto", marginTop: "18px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "650px" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Supplier</th>
                <th style={{ padding: "12px" }}>Total Cost</th>
                <th style={{ padding: "12px" }}>Delivery</th>
                <th style={{ padding: "12px" }}>Quality</th>
                <th style={{ padding: "12px" }}>Score</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.supplierResults.map((supplier) => (
                <tr
                  key={supplier.name}
                  style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }}
                >
                  <td style={{ padding: "14px 12px" }}>
                    <strong>{supplier.name}</strong>
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {currency(supplier.finalCost)}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {supplier.delivery} days
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {supplier.quality}%
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {supplier.score}/100
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {supplier.withinBudget && supplier.deliveryOK ? (
                      <span className="status approved">Eligible</span>
                    ) : (
                      <span className="status">Review</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight */}
      <div
        className="panel"
        style={{
          marginTop: "22px",
          background: "rgba(99,102,241,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: "13px" }}>
          <Lightbulb size={27} color="#A78BFA" />
          <div>
            <h3>Procurement Insight</h3>
            <p>
              {results.current.withinBudget && results.current.deliveryOK
                ? `${selected.name} meets your current budget and delivery requirements. You can explore increasing the quantity or reducing the discount to test other scenarios.`
                : `The selected supplier does not meet all your current constraints. Try increasing the budget, adjusting the delivery limit or comparing another supplier.`}
            </p>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "18px" }}>
        Demo simulation: prices, supplier metrics and scoring weights are
        illustrative. Results are calculated locally and are not live quotes
        or guaranteed savings.
      </p>
    </div>
  );
}
