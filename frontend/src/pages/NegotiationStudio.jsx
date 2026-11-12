
import { useMemo, useState } from "react";
import {
  Handshake,
  Target,
  IndianRupee,
  TrendingDown,
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  CheckCircle,
  RotateCcw,
  ShieldCheck,
  Lightbulb,
  Award,
} from "lucide-react";

const suppliers = [
  {
    name: "TechNova Solutions",
    price: 125000,
    rating: 4.9,
    quality: 97,
    reliability: 98,
    minPrice: 112000,
  },
  {
    name: "Global Industrial Co.",
    price: 118000,
    rating: 4.7,
    quality: 94,
    reliability: 95,
    minPrice: 108000,
  },
  {
    name: "PrimeSource Technologies",
    price: 132000,
    rating: 4.6,
    quality: 96,
    reliability: 91,
    minPrice: 120000,
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function NegotiationStudio() {
  const [supplierIndex, setSupplierIndex] = useState(0);
  const [targetPrice, setTargetPrice] = useState(115000);
  const [counterOffer, setCounterOffer] = useState("");
  const [messages, setMessages] = useState([]);
  const [negotiationStarted, setNegotiationStarted] = useState(false);
  const [dealAccepted, setDealAccepted] = useState(false);

  const supplier = suppliers[supplierIndex];

  const savings = useMemo(
    () => supplier.price - targetPrice,
    [supplier.price, targetPrice]
  );

  const savingsPercentage = useMemo(
    () => ((savings / supplier.price) * 100).toFixed(1),
    [savings, supplier.price]
  );

  const generateStrategy = () => {
    const discount = ((supplier.price - targetPrice) / supplier.price) * 100;

    if (discount <= 5) {
      return {
        title: "Low-risk negotiation",
        description:
          "Request a modest discount and focus on long-term business potential, repeat orders and faster payment.",
        tactics: [
          "Ask for a small volume-based discount.",
          "Request free delivery or additional support.",
          "Highlight the possibility of repeat purchases.",
        ],
      };
    }

    if (discount <= 12) {
      return {
        title: "Value-based negotiation",
        description:
          "Use supplier performance, market competition and order quantity to justify your target price.",
        tactics: [
          "Use competing quotations as leverage.",
          "Offer a larger order in exchange for a better price.",
          "Negotiate delivery and warranty benefits.",
        ],
      };
    }

    return {
      title: "Aggressive negotiation",
      description:
        "Your target requires a significant price reduction. Support your offer with strong evidence and consider alternative suppliers.",
      tactics: [
        "Present a clear competing quotation.",
        "Offer a larger or recurring purchase commitment.",
        "Be prepared to walk away if the supplier cannot meet your requirements.",
      ],
    };
  };

  const strategy = generateStrategy();

  const startNegotiation = () => {
    setNegotiationStarted(true);
    setDealAccepted(false);
    setMessages([
      {
        sender: "ai",
        text: `Hello! I'm your procurement negotiation assistant. ${supplier.name} has quoted ${money(supplier.price)}. Your target is ${money(targetPrice)}. Let's work towards a better deal.`,
      },
      {
        sender: "ai",
        text: `Suggested opening offer: ${money(targetPrice)}. Use your order value, supplier reliability and long-term partnership potential as negotiation points.`,
      },
    ]);
  };

  const sendMessage = () => {
    if (!counterOffer.trim()) return;

    const buyerMessage = counterOffer.trim();

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: buyerMessage },
      {
        sender: "ai",
        text: generateResponse(buyerMessage),
      },
    ]);

    setCounterOffer("");
  };

  const generateResponse = (message) => {
    const amount = Number(message.replace(/[₹,\s]/g, ""));

    if (amount > 0 && amount < supplier.minPrice) {
      return `That offer is below the illustrative minimum negotiation threshold of ${money(supplier.minPrice)}. Consider increasing your offer or negotiating additional benefits such as free delivery, extended warranty or flexible payment terms.`;
    }

    if (amount >= supplier.minPrice && amount < supplier.price) {
      return `That is a reasonable counteroffer to explore! The illustrative supplier threshold is ${money(supplier.minPrice)}. You could propose ${money(amount)} with a commitment to future orders. Remember, the actual supplier must confirm the price.`;
    }

    if (amount >= supplier.price) {
      return "Your offer is at or above the quoted price. You could instead negotiate additional value such as faster delivery, installation or an extended warranty.";
    }

    const lower = message.toLowerCase();

    if (lower.includes("delivery")) {
      return "Try requesting complimentary delivery or a guaranteed delivery timeline. This can reduce your total procurement cost without requiring a direct price reduction.";
    }

    if (lower.includes("discount")) {
      return "You can justify a discount by highlighting order quantity, repeat business and competing quotations. Start with your target price and leave room for a counteroffer.";
    }

    if (lower.includes("warranty")) {
      return "An extended warranty is a useful non-price negotiation point. Ask the supplier to include additional coverage or maintenance support in the quoted price.";
    }

    return "A good negotiation balances price, quality and long-term value. Try making a specific counteroffer or asking for benefits such as free delivery, warranty or flexible payment terms.";
  };

  const acceptDeal = () => {
    setDealAccepted(true);
    setMessages((previous) => [
      ...previous,
      {
        sender: "ai",
        text: "Your proposed deal has been marked as accepted in this demonstration. This does not represent a real supplier agreement or confirmed purchase.",
      },
    ]);
  };

  const reset = () => {
    setTargetPrice(suppliers[supplierIndex].price - 10000);
    setMessages([]);
    setNegotiationStarted(false);
    setDealAccepted(false);
    setCounterOffer("");
  };

  const changeSupplier = (index) => {
    setSupplierIndex(index);
    setTargetPrice(suppliers[index].price - 10000);
    setMessages([]);
    setNegotiationStarted(false);
    setDealAccepted(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="welcome-section">
        <div>
          <p className="eyebrow">STRATEGIC PROCUREMENT</p>
          <h1>Negotiation Studio</h1>
          <p>
            Negotiate smarter, discover better prices and maximize
            procurement value.
          </p>
        </div>
      </div>

      {/* Hero */}
      <div
        className="panel"
        style={{
          background: "linear-gradient(120deg, #172b48, #30204f)",
          color: "white",
          padding: "25px",
        }}
      >
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Handshake size={38} />
          <div>
            <h2 style={{ margin: 0 }}>Every deal has room for improvement.</h2>
            <p style={{ opacity: 0.8, marginTop: "8px" }}>
              Prepare your offer, evaluate supplier responses and find
              a better procurement deal.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stats-grid" style={{ marginTop: "22px" }}>
        <div className="stat-card">
          <div className="stat-top">
            <span>Original Quotation</span>
            <IndianRupee size={20} />
          </div>
          <h2>{money(supplier.price)}</h2>
          <p>Supplier's listed price</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Target Price</span>
            <Target size={20} />
          </div>
          <h2>{money(targetPrice)}</h2>
          <p>Your negotiation goal</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Potential Savings</span>
            <TrendingDown size={20} />
          </div>
          <h2 style={{ color: "#22C55E" }}>{money(savings)}</h2>
          <p>{savingsPercentage}% estimated reduction</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Supplier Rating</span>
            <Award size={20} />
          </div>
          <h2>{supplier.rating}/5</h2>
          <p>Illustrative rating</p>
        </div>
      </div>

      {/* Negotiation setup */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <h3>Negotiation Configuration</h3>
            <p>Set your supplier and desired purchase price.</p>
          </div>
          <Target size={22} />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label><strong>Select Supplier</strong></label>
          <select
            value={supplierIndex}
            onChange={(e) => changeSupplier(Number(e.target.value))}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "9px",
              border: "1px solid #aaa",
              background: "transparent",
              color: "inherit",
            }}
          >
            {suppliers.map((item, index) => (
              <option value={index} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Your Target Price</strong>
            <strong>{money(targetPrice)}</strong>
          </div>

          <input
            type="range"
            min={supplier.minPrice}
            max={supplier.price}
            step="1000"
            value={Math.min(supplier.price, Math.max(supplier.minPrice, targetPrice))}
            onChange={(e) => {
              setTargetPrice(Number(e.target.value));
              setDealAccepted(false);
            }}
            style={{ width: "100%", marginTop: "15px" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <small>Minimum: {money(supplier.minPrice)}</small>
            <small>Quoted: {money(supplier.price)}</small>
          </div>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={startNegotiation}
          style={{ width: "100%", marginTop: "24px" }}
        >
          <Sparkles size={17} /> Prepare Negotiation
        </button>
      </div>

      {/* Strategy */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">NEGOTIATION INTELLIGENCE</p>
            <h3>{strategy.title}</h3>
          </div>
          <Lightbulb size={24} />
        </div>

        <p style={{ marginTop: "15px" }}>{strategy.description}</p>

        <h4 style={{ marginTop: "20px" }}>Recommended Tactics</h4>

        {strategy.tactics.map((tactic, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              marginTop: "14px",
            }}
          >
            <CheckCircle size={18} color="#22C55E" />
            <span>{tactic}</span>
          </div>
        ))}
      </div>

      {/* Negotiation chat */}
      <div className="panel" style={{ marginTop: "22px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">INTERACTIVE NEGOTIATION</p>
            <h3>Negotiation Assistant</h3>
            <p>Discuss counteroffers and negotiation strategies.</p>
          </div>
          <Bot size={26} />
        </div>

        {!negotiationStarted ? (
          <div style={{ textAlign: "center", padding: "35px 10px" }}>
            <MessageSquare size={38} />
            <h3>Ready to negotiate?</h3>
            <p>Click Prepare Negotiation to start your session.</p>
          </div>
        ) : (
          <>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                maxHeight: "380px",
                overflowY: "auto",
                padding: "5px",
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {message.sender === "ai" && (
                    <Bot size={22} color="#A78BFA" />
                  )}

                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "13px",
                      borderRadius: "12px",
                      background:
                        message.sender === "user"
                          ? "rgba(59,130,246,0.15)"
                          : "rgba(128,128,128,0.12)",
                    }}
                  >
                    <p style={{ margin: 0 }}>{message.text}</p>
                  </div>

                  {message.sender === "user" && (
                    <User size={22} color="#60A5FA" />
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <input
                value={counterOffer}
                onChange={(e) => setCounterOffer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Enter a counteroffer or negotiation question..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #aaa",
                  background: "transparent",
                  color: "inherit",
                }}
              />

              <button
                type="button"
                className="primary-button"
                onClick={sendMessage}
                disabled={!counterOffer.trim()}
              >
                <Send size={17} />
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
              {["Request discount", "Ask for free delivery", "Negotiate warranty"].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="select-button"
                  onClick={() => setCounterOffer(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Final deal */}
      {negotiationStarted && (
        <div
          className="panel"
          style={{
            marginTop: "22px",
            border: "1px solid #22C55E",
          }}
        >
          <div className="panel-header">
            <div>
              <p className="eyebrow">DEAL SUMMARY</p>
              <h3>Your Proposed Deal</h3>
            </div>
            <ShieldCheck size={24} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <p>Supplier: <strong>{supplier.name}</strong></p>
            <p>Original quotation: <strong>{money(supplier.price)}</strong></p>
            <p>Proposed target: <strong>{money(targetPrice)}</strong></p>
            <p>Potential savings: <strong style={{ color: "#22C55E" }}>{money(savings)}</strong></p>
          </div>

          {dealAccepted ? (
            <div style={{ marginTop: "20px" }}>
              <span className="status approved">
                <CheckCircle size={15} /> Demo deal accepted
              </span>
              <p style={{ marginTop: "12px" }}>
                Your proposed deal has been marked accepted in this demo.
                Actual supplier confirmation is still required.
              </p>
            </div>
          ) : (
            <button
              type="button"
              className="primary-button"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={acceptDeal}
            >
              <CheckCircle size={17} /> Accept Proposed Deal (Demo)
            </button>
          )}

          <button
            type="button"
            className="select-button"
            style={{ width: "100%", marginTop: "12px" }}
            onClick={reset}
          >
            <RotateCcw size={16} /> Reset Negotiation
          </button>
        </div>
      )}

      <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "20px" }}>
        Demo mode: negotiation responses are generated using predefined
        rules, not a connected AI model or live supplier communication.
        Minimum price values are illustrative simulation thresholds,
        not verified supplier limits.
      </p>
    </div>
  );
}
