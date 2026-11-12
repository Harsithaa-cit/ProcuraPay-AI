
import { useState } from "react";
import {
  Sparkles,
  ShoppingCart,
  Package,
  IndianRupee,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

function NewProcurement() {
  const [form, setForm] = useState({
    product: "",
    category: "Electronics",
    quantity: 1,
    budget: "",
    urgency: "Medium",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [request, setRequest] = useState(null);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.product.trim() || !form.budget || Number(form.budget) <= 0) {
      return;
    }

    setRequest({ ...form });
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      product: "",
      category: "Electronics",
      quantity: 1,
      budget: "",
      urgency: "Medium",
      description: "",
    });
    setSubmitted(false);
    setRequest(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "13px",
    background: "#171f30",
    border: "1px solid #303b52",
    borderRadius: "8px",
    color: "#edf0fa",
    outline: "none",
    fontSize: "12px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "9px",
    color: "#b7c1d4",
    fontSize: "11px",
    fontWeight: 600,
  };

  const suppliers = [
    {
      name: "TechNova Solutions",
      rating: "4.9",
      price: "₹42,000",
      delivery: "3–5 days",
      tag: "Best Value",
      score: "96%",
    },
    {
      name: "GlobalTech Supplies",
      rating: "4.7",
      price: "₹45,500",
      delivery: "2–4 days",
      tag: "Fast Delivery",
      score: "91%",
    },
    {
      name: "PrimeSource India",
      rating: "4.5",
      price: "₹47,000",
      delivery: "5–7 days",
      tag: "Trusted Supplier",
      score: "87%",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* HEADER */}
      <div className="welcome-section">
        <div>
          <div className="eyebrow">
            <Sparkles size={15} />
            INTELLIGENT PROCUREMENT
          </div>
          <h1>New <span>Procurement</span></h1>
          <p>Create a purchase request and discover smarter supplier options.</p>
        </div>
        <div className="stat-icon">
          <ShoppingCart size={23} />
        </div>
      </div>

      {/* INTRO CARDS */}
      <div className="stats-grid">
        {[
          { icon: Package, title: "Smart Requests", text: "Create structured purchase requests" },
          { icon: Sparkles, title: "AI Matching", text: "Discover suitable suppliers" },
          { icon: ShieldCheck, title: "Better Decisions", text: "Compare offers before purchasing" },
          { icon: IndianRupee, title: "Budget Control", text: "Keep spending within limits" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className="stat-card" key={item.title}>
              <div className="stat-top">
                <span>{item.title}</span>
                <div className="stat-icon"><Icon size={18} /></div>
              </div>
              <p style={{ color: "#929db1", fontSize: 11, marginTop: 15 }}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* REQUEST FORM */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3><ShoppingCart size={16} style={{ display: "inline", marginRight: 8 }} />Purchase Request Details</h3>
            <p>Provide your requirements to initiate procurement.</p>
          </div>
          <span className="status approved">New Request</span>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 25 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 22
          }}>
            <div>
              <label style={labelStyle}>Product / Item Name *</label>
              <input
                style={inputStyle}
                name="product"
                value={form.product}
                onChange={updateField}
                placeholder="e.g. Business laptops"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} name="category" value={form.category} onChange={updateField}>
                <option>Electronics</option>
                <option>Office Supplies</option>
                <option>Raw Materials</option>
                <option>Software</option>
                <option>Furniture</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Quantity *</label>
              <input
                style={inputStyle}
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={updateField}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Maximum Budget (₹) *</label>
              <input
                style={inputStyle}
                type="number"
                name="budget"
                min="1"
                value={form.budget}
                onChange={updateField}
                placeholder="e.g. 50000"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Urgency Level</label>
              <select style={inputStyle} name="urgency" value={form.urgency} onChange={updateField}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <label style={labelStyle}>Additional Specifications</label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Describe quality, brand preferences, technical requirements, delivery location, etc."
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 22 }}>
            <button type="button" onClick={resetForm} className="select-button">
              Clear Form
            </button>
            <button type="submit" className="primary-button">
              Analyse Procurement <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* AI RESULTS */}
      {submitted && request && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="eyebrow">
                <Sparkles size={15} /> PROCUREMENT ANALYSIS
              </div>
              <h3>Request Submitted Successfully!</h3>
              <p>Your demo request has been prepared for supplier comparison.</p>
            </div>
            <CheckCircle2 color="#5ccea1" size={28} />
          </div>

          <div style={{
            background: "#1a2537",
            padding: 18,
            borderRadius: 10,
            marginTop: 22,
          }}>
            <h3 style={{ fontSize: 15 }}>{request.product}</h3>
            <p style={{ color: "#9caac0", fontSize: 11, marginTop: 10 }}>
              Category: {request.category} · Quantity: {request.quantity}
            </p>
            <p style={{ color: "#9caac0", fontSize: 11, marginTop: 7 }}>
              Budget: ₹{Number(request.budget).toLocaleString("en-IN")} · Urgency: {request.urgency}
            </p>
            {request.description && (
              <p style={{ color: "#9caac0", fontSize: 11, marginTop: 7 }}>
                Specifications: {request.description}
              </p>
            )}
          </div>

          <div className="eyebrow" style={{ marginTop: 27 }}>
            <Zap size={15} /> DEMONSTRATION SUPPLIER MATCHES
          </div>

          <div className="stats-grid" style={{ marginTop: 10 }}>
            {suppliers.map((supplier, index) => (
              <div className="stat-card" key={supplier.name}>
                <span className="status approved">{supplier.tag}</span>
                <h3 style={{ fontSize: 14, marginTop: 16 }}>{supplier.name}</h3>
                <h2 style={{ fontSize: 23, marginTop: 17 }}>{supplier.price}</h2>
                <p style={{ color: "#8f9bb0", fontSize: 10 }}>Illustrative price</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                  <span style={{ color: "#d6dceb", fontSize: 10 }}>
                    <Star size={12} color="#eab46c" style={{ display: "inline" }} /> {supplier.rating}
                  </span>
                  <span style={{ color: "#8f9bb0", fontSize: 10 }}>
                    <Truck size={12} style={{ display: "inline" }} /> {supplier.delivery}
                  </span>
                </div>
                <p style={{ color: "#65d4a6", fontSize: 11, marginTop: 15 }}>
                  Demo match score: {supplier.score}
                </p>
              </div>
            ))}
          </div>

          <p style={{ color: "#8995aa", fontSize: 10, marginTop: 17 }}>
            Demo only: supplier names, prices, ratings, delivery estimates and match scores are illustrative, not live supplier quotes or AI-generated recommendations.
          </p>

          <button className="primary-button" onClick={resetForm} style={{ marginTop: 20 }}>
            Create Another Request <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

export default NewProcurement;
