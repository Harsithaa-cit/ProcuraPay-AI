
import { useState } from "react";
import {
  Bot,
  Brain,
  Scale,
  Trophy,
  Play,
  RotateCcw,
  CheckCircle,
  MessageSquare,
  Zap,
  ShieldCheck,
} from "lucide-react";

const suppliers = [
  {
    name: "TechNova Solutions",
    price: 125000,
    quality: 97,
    delivery: 3,
    reliability: 98,
    rating: 4.9,
  },
  {
    name: "Global Industrial Co.",
    price: 118000,
    quality: 94,
    delivery: 5,
    reliability: 95,
    rating: 4.7,
  },
  {
    name: "PrimeSource Technologies",
    price: 132000,
    quality: 96,
    delivery: 4,
    reliability: 91,
    rating: 4.6,
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function AIDebateRoom() {
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const [debating, setDebating] = useState(false);
  const [result, setResult] = useState(null);

  const startDebate = () => {
    setDebating(true);
    setResult(null);

    setTimeout(() => {
      const winner = suppliers.reduce((best, current) => {
        const score = (s) =>
          s.quality * 0.3 +
          s.reliability * 0.3 +
          s.rating * 10 * 0.2 +
          (10 - s.delivery) * 10 * 0.1 +
          (150000 - s.price) / 1500 * 0.1;

        return score(current) > score(best) ? current : best;
      });

      const budgetWinner = [...suppliers].sort(
        (a, b) => a.price - b.price
      )[0];

      const qualityWinner = [...suppliers].sort(
        (a, b) => b.quality - a.quality
      )[0];

      setResult({
        winner,
        budgetWinner,
        qualityWinner,
        score: Math.round(
          winner.quality * 0.3 +
          winner.reliability * 0.3 +
          winner.rating * 10 * 0.2 +
          (10 - winner.delivery) * 10 * 0.1 +
          (150000 - winner.price) / 1500 * 0.1
        ),
      });

      setDebating(false);
    }, 1800);
  };

  const resetDebate = () => {
    setResult(null);
    setDebating(false);
    setSelectedSupplier(0);
  };

  return (
    <div>
      <div className="welcome-section">
        <div>
          <p className="eyebrow">MULTI-AGENT INTELLIGENCE</p>
          <h1>AI Debate Room</h1>
          <p>
            Let two intelligent procurement agents challenge each
            other's decisions before you choose a supplier.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div
        className="panel"
        style={{
          background: "linear-gradient(120deg, #211c45, #172b48)",
          color: "white",
          padding: "25px",
        }}
      >
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Scale size={35} />
          <div>
            <h2 style={{ margin: 0 }}>Two agents. One smart decision.</h2>
            <p style={{ opacity: 0.8, marginTop: "8px" }}>
              A competitive evaluation of price, quality, reliability
              and delivery performance.
            </p>
          </div>
        </div>
      </div>

      {/* Agent cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px",
          marginTop: "22px",
        }}
      >
        <div className="panel">
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                padding: "13px",
                borderRadius: "12px",
                background: "rgba(59,130,246,0.15)",
              }}
            >
              <Brain size={26} color="#60A5FA" />
            </div>
            <div>
              <h3>Agent Alpha</h3>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>
                Cost Optimization Expert
              </span>
            </div>
          </div>
          <h4 style={{ marginTop: "20px" }}>Primary objective</h4>
          <p>
            Find the most financially efficient supplier while
            maintaining acceptable quality and reliability.
          </p>
          <span className="status approved">Budget focused</span>
        </div>

        <div className="panel">
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                padding: "13px",
                borderRadius: "12px",
                background: "rgba(168,85,247,0.15)",
              }}
            >
              <ShieldCheck size={26} color="#A78BFA" />
            </div>
            <div>
              <h3>Agent Beta</h3>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>
                Quality & Risk Expert
              </span>
            </div>
          </div>
          <h4 style={{ marginTop: "20px" }}>Primary objective</h4>
          <p>
            Prioritize supplier quality, delivery reliability and
            long-term procurement value.
          </p>
          <span className="status approved">Quality focused</span>
        </div>
      </div>

      {/* Supplier selection */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <h3>Debate Configuration</h3>
            <p>Choose a supplier to challenge the agents.</p>
          </div>
          <MessageSquare size={22} />
        </div>

        <label style={{ display: "block", margin: "18px 0 8px" }}>
          Supplier under consideration
        </label>

        <select
          value={selectedSupplier}
          onChange={(e) => {
            setSelectedSupplier(Number(e.target.value));
            setResult(null);
          }}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "10px",
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

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <span>Price: <strong>{formatPrice(suppliers[selectedSupplier].price)}</strong></span>
          <span>Quality: <strong>{suppliers[selectedSupplier].quality}%</strong></span>
          <span>Rating: <strong>{suppliers[selectedSupplier].rating}/5</strong></span>
        </div>

        <button
          className="primary-button"
          type="button"
          disabled={debating}
          onClick={startDebate}
          style={{ marginTop: "22px", width: "100%" }}
        >
          {debating ? (
            <>Agents are debating...</>
          ) : (
            <>
              <Play size={16} /> Start AI Debate
            </>
          )}
        </button>
      </div>

      {/* Debate animation */}
      {debating && (
        <div className="panel" style={{ marginTop: "22px", textAlign: "center" }}>
          <Bot size={35} />
          <h3>Agents are analyzing the suppliers</h3>
          <p>
            Comparing pricing, quality, delivery and reliability...
          </p>
          <div
            style={{
              height: "7px",
              background: "rgba(128,128,128,0.2)",
              borderRadius: "20px",
              overflow: "hidden",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "70%",
                background: "#8B5CF6",
                borderRadius: "20px",
                animation: "debateProgress 1.8s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>
      )}

      {/* Debate results */}
      {result && (
        <div style={{ marginTop: "22px" }}>
          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">DEBATE TRANSCRIPT</p>
                <h2>Agent Arguments</h2>
              </div>
              <MessageSquare size={23} />
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "12px",
                background: "rgba(59,130,246,0.09)",
                marginTop: "18px",
              }}
            >
              <h3>
                <Brain size={18} /> Agent Alpha — Cost Perspective
              </h3>
              <p>
                My priority is financial efficiency.{" "}
                {result.budgetWinner.name} offers the lowest
                estimated price at {formatPrice(result.budgetWinner.price)}.
                Choosing a competitive supplier can help reduce procurement
                expenditure.
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "12px",
                background: "rgba(168,85,247,0.09)",
                marginTop: "15px",
              }}
            >
              <h3>
                <ShieldCheck size={18} /> Agent Beta — Quality Perspective
              </h3>
              <p>
                Price should not be the only deciding factor.{" "}
                {result.qualityWinner.name} has the strongest
                quality score at {result.qualityWinner.quality}%.
                Reliability and product quality matter for long-term value.
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "12px",
                background: "rgba(34,197,94,0.08)",
                marginTop: "15px",
              }}
            >
              <h3>
                <Scale size={18} /> Final Evaluation
              </h3>
              <p>
                The evaluation considers price, quality, reliability,
                delivery speed and supplier rating. The highest weighted
                score determines the recommended supplier.
              </p>
              <p>
                Both agents' priorities are considered rather than
                automatically choosing the cheapest option.
              </p>
            </div>
          </div>

          {/* Winner */}
          <div
            className="panel"
            style={{
              marginTop: "20px",
              border: "1px solid #22C55E",
            }}
          >
            <div style={{ textAlign: "center", padding: "15px" }}>
              <Trophy size={42} color="#EAB308" />
              <p className="eyebrow" style={{ marginTop: "12px" }}>
                FINAL RECOMMENDATION
              </p>
              <h2>{result.winner.name}</h2>
              <h1 style={{ fontSize: "42px", color: "#22C55E" }}>
                {result.score}/100
              </h1>
              <p>Weighted evaluation score</p>
              <div style={{ marginTop: "18px" }}>
                <span className="status approved">
                  <CheckCircle size={14} /> Recommended Supplier
                </span>
              </div>
              <p style={{ marginTop: "20px" }}>
                Estimated price: <strong>{formatPrice(result.winner.price)}</strong>
              </p>
              <p>
                Quality: {result.winner.quality}% · Reliability:{" "}
                {result.winner.reliability}% · Delivery:{" "}
                {result.winner.delivery} days
              </p>
            </div>
          </div>

          <button
            className="select-button"
            type="button"
            onClick={resetDebate}
            style={{ marginTop: "18px" }}
          >
            <RotateCcw size={16} /> Start New Debate
          </button>
        </div>
      )}

      <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "20px" }}>
        Demo mode: agent arguments and recommendations use predefined
        sample supplier data and local weighted scoring. No external
        AI model is connected yet.
      </p>

      <style>{`
        @keyframes debateProgress {
          from { width: 20%; }
          to { width: 95%; }
        }
      `}</style>
    </div>
  );
}
