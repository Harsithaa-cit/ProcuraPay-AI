
import { useState } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShoppingCart,
  Package,
  TrendingUp,
  RotateCcw,
  Lightbulb,
} from "lucide-react";

const suggestions = [
  "I need 20 laptops under ₹10 lakhs",
  "How can I reduce procurement costs?",
  "What should I consider when choosing suppliers?",
  "Help me create a purchase strategy",
];

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm Procura AI, your intelligent procurement assistant. I can help you plan purchases, analyse requirements, compare supplier options and make smarter procurement decisions. What would you like help with?",
    },
  ]);

  const [input, setInput] = useState("");

  const generateResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes("laptop")) {
      return "Let's plan your laptop procurement! First, we should identify the processor, RAM, storage, warranty and intended usage. I recommend comparing at least three suppliers and evaluating total cost, delivery time and after-sales support. Please specify your preferred laptop configuration so we can refine the requirement.";
    }

    if (q.includes("cost") || q.includes("budget") || q.includes("reduce")) {
      return "Here are some cost-optimisation strategies:\n\n1. Compare multiple supplier quotations.\n2. Explore bulk purchase discounts.\n3. Evaluate total cost of ownership, not just the initial price.\n4. Negotiate payment and delivery terms.\n5. Identify unnecessary specifications.\n\nI recommend setting a target price and a maximum budget before negotiating.";
    }

    if (q.includes("supplier")) {
      return "A good supplier evaluation should consider:\n\n1. Product quality and certifications.\n2. Competitive pricing.\n3. Delivery reliability.\n4. Customer reviews and reputation.\n5. Warranty and after-sales service.\n6. Payment terms.\n\nDon't select a supplier based on price alone. Reliability and total value matter too!";
    }

    if (q.includes("strategy") || q.includes("purchase")) {
      return "Let's create a procurement strategy:\n\n1. Define the business requirement.\n2. Set a realistic budget.\n3. Identify potential suppliers.\n4. Compare quotations and delivery timelines.\n5. Negotiate the best terms.\n6. Evaluate risks before final approval.\n\nStart by defining exactly what you need to purchase.";
    }

    return "That's a great procurement question! I suggest breaking it into requirements, budget, supplier selection and delivery considerations. Could you share a little more detail about the product, quantity or business objective? I'll help you structure the decision.";
  };

  const sendMessage = (text = input) => {
    const question = text.trim();
    if (!question) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
      { role: "assistant", text: generateResponse(question) },
    ]);

    setInput("");
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hello again! I'm Procura AI. What procurement challenge can I help you solve today?",
      },
    ]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      <div className="welcome-section">
        <div>
          <div className="eyebrow">
            <Sparkles size={15} /> INTELLIGENT PROCUREMENT
          </div>
          <h1>AI <span>Assistant</span></h1>
          <p>Your procurement copilot for smarter purchasing decisions.</p>
        </div>

        <button className="select-button" onClick={clearChat}>
          <RotateCcw size={14} /> New Conversation
        </button>
      </div>

      <div className="stats-grid">
        {[
          { icon: ShoppingCart, title: "Purchase Planning", text: "Structure procurement needs" },
          { icon: TrendingUp, title: "Cost Optimisation", text: "Explore savings opportunities" },
          { icon: Package, title: "Supplier Guidance", text: "Understand supplier selection" },
          { icon: Lightbulb, title: "Smart Insights", text: "Explore better decisions" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className="stat-card" key={item.title}>
              <div className="stat-top">
                <span>{item.title}</span>
                <div className="stat-icon"><Icon size={18} /></div>
              </div>
              <p style={{ color: "#929db1", fontSize: 11, marginTop: 13 }}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{
          padding: "19px 22px",
          borderBottom: "1px solid #293247",
          display: "flex",
          alignItems: "center",
          gap: 13,
        }}>
          <div className="insight-icon">
            <Sparkles size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 13 }}>Procura AI Copilot</h3>
            <p style={{ color: "#8794aa", fontSize: 10, marginTop: 4 }}>
              Procurement intelligence workspace
            </p>
          </div>
          <span className="status completed">Demo Mode</span>
        </div>

        <div style={{
          height: 420,
          overflowY: "auto",
          padding: 22,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 11,
                flexDirection: message.role === "user" ? "row-reverse" : "row",
              }}
            >
              <div style={{
                width: 34,
                height: 34,
                flexShrink: 0,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                background: message.role === "user" ? "#285b78" : "#7451c8",
                color: "white",
              }}>
                {message.role === "user" ? <User size={17} /> : <Bot size={18} />}
              </div>

              <div style={{
                maxWidth: "82%",
                padding: "14px 16px",
                borderRadius: 12,
                background: message.role === "user" ? "#25334b" : "#1a2233",
                border: "1px solid #303b52",
                color: "#e1e7f3",
                fontSize: 12,
                lineHeight: 1.9,
                whiteSpace: "pre-line",
              }}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {messages.length === 1 && (
          <div style={{ padding: "0 22px 20px" }}>
            <p style={{
              color: "#929db1",
              fontSize: 10,
              marginBottom: 12,
              fontWeight: 700,
            }}>
              TRY ASKING
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 9,
            }}>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  style={{
                    textAlign: "left",
                    padding: 12,
                    background: "#192235",
                    border: "1px solid #303b52",
                    color: "#b8c3d7",
                    borderRadius: 8,
                    fontSize: 10,
                    lineHeight: 1.6,
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          style={{
            padding: 17,
            borderTop: "1px solid #293247",
            display: "flex",
            gap: 10,
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about procurement..."
            style={{
              flex: 1,
              minWidth: 0,
              background: "#1a2233",
              border: "1px solid #354057",
              borderRadius: 9,
              padding: "13px 15px",
              color: "white",
              outline: "none",
              fontSize: 12,
            }}
          />

          <button
            type="submit"
            className="primary-button"
            disabled={!input.trim()}
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <p style={{ color: "#77859b", fontSize: 10 }}>
        <Sparkles size={12} style={{ display: "inline" }} /> Demo responses are predefined. Live AI integration will be added through the backend.
      </p>
    </div>
  );
}

export default AIAssistant;
