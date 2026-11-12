
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Star,
  Truck,
  ShieldCheck,
  TrendingUp,
  X,
  Package,
  Clock,
  Award,
  ArrowUpDown,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const suppliers = [
  {
    id: 1,
    name: "TechNova Solutions",
    category: "Electronics",
    location: "Chennai, India",
    rating: 4.9,
    reliability: 98,
    delivery: 3,
    price: 125000,
    quality: 97,
    match: 98,
    orders: 124,
    email: "sales@technova.example",
    phone: "+91 98765 43210",
    description:
      "A technology supplier specializing in high-quality electronic components and enterprise hardware.",
    strengths: ["Excellent quality", "Fast delivery", "High reliability"],
    status: "Verified",
  },
  {
    id: 2,
    name: "Global Industrial Co.",
    category: "Industrial",
    location: "Bengaluru, India",
    rating: 4.7,
    reliability: 95,
    delivery: 5,
    price: 118000,
    quality: 94,
    match: 95,
    orders: 98,
    email: "contact@globalindustrial.example",
    phone: "+91 98765 12345",
    description:
      "An industrial procurement partner offering competitive pricing and dependable supply services.",
    strengths: ["Competitive pricing", "Good reliability", "Bulk orders"],
    status: "Verified",
  },
  {
    id: 3,
    name: "PrimeSource Technologies",
    category: "Electronics",
    location: "Hyderabad, India",
    rating: 4.6,
    reliability: 91,
    delivery: 4,
    price: 132000,
    quality: 96,
    match: 91,
    orders: 87,
    email: "hello@primesource.example",
    phone: "+91 98765 67890",
    description:
      "A component supplier focused on quality assurance and advanced electronic solutions.",
    strengths: ["Premium components", "Quality assurance", "Technical support"],
    status: "Verified",
  },
  {
    id: 4,
    name: "SwiftSupply Enterprises",
    category: "Logistics",
    location: "Coimbatore, India",
    rating: 4.5,
    reliability: 89,
    delivery: 2,
    price: 128000,
    quality: 90,
    match: 89,
    orders: 76,
    email: "support@swiftsupply.example",
    phone: "+91 98765 11111",
    description:
      "A delivery-focused supply partner specializing in quick procurement fulfillment.",
    strengths: ["Very fast delivery", "Flexible ordering", "Responsive support"],
    status: "Verified",
  },
  {
    id: 5,
    name: "EcoProcure Industries",
    category: "Raw Materials",
    location: "Pune, India",
    rating: 4.4,
    reliability: 93,
    delivery: 6,
    price: 110000,
    quality: 88,
    match: 87,
    orders: 65,
    email: "info@ecoprocure.example",
    phone: "+91 98765 22222",
    description:
      "A cost-conscious supplier focused on sustainable sourcing and raw material distribution.",
    strengths: ["Lower pricing", "Sustainable sourcing", "Bulk availability"],
    status: "Verified",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function SupplierIntelligence() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [selected, setSelected] = useState(null);

  const categories = [
    "All",
    "Electronics",
    "Industrial",
    "Logistics",
    "Raw Materials",
  ];

  const filteredSuppliers = useMemo(() => {
    return suppliers
      .filter((supplier) => {
        const matchesSearch =
          supplier.name.toLowerCase().includes(search.toLowerCase()) ||
          supplier.location.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          category === "All" || supplier.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [search, category, sortBy]);

  return (
    <div className="supplier-page">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">PROCUREMENT INTELLIGENCE</p>
          <h1>Supplier Intelligence</h1>
          <p>
            Discover, compare and evaluate suppliers with intelligent
            procurement insights.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Suppliers</span>
            <Package size={20} />
          </div>
          <h2>{suppliers.length}</h2>
          <p>Available in directory</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Verified Suppliers</span>
            <ShieldCheck size={20} />
          </div>
          <h2>5</h2>
          <p>Demo verified profiles</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Average Rating</span>
            <Star size={20} />
          </div>
          <h2>4.62/5</h2>
          <p>Illustrative supplier rating</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Top Match</span>
            <TrendingUp size={20} />
          </div>
          <h2>98%</h2>
          <p>Best matching supplier</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="panel supplier-filter-panel">
        <div className="panel-header">
          <div>
            <h3>Find Suppliers</h3>
            <p>Search and compare supplier profiles</p>
          </div>
          <Filter size={20} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "18px",
          }}
        >
          <div
            style={{
              flex: "2",
              minWidth: "200px",
              position: "relative",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "13px",
                top: "13px",
                color: "#888",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search suppliers or locations..."
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: "transparent",
                color: "inherit",
                outline: "none",
              }}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "transparent",
              color: "inherit",
            }}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "transparent",
              color: "inherit",
            }}
          >
            <option value="match">Best Match</option>
            <option value="price">Lowest Price</option>
            <option value="delivery">Fastest Delivery</option>
            <option value="rating">Highest Rating</option>
            <option value="reliability">Reliability</option>
          </select>
        </div>
      </div>

      {/* Supplier list */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Available Suppliers</h3>
            <p>{filteredSuppliers.length} supplier profiles found</p>
          </div>
        </div>

        {filteredSuppliers.length === 0 ? (
          <div style={{ padding: "35px", textAlign: "center" }}>
            <Search size={30} />
            <h3>No suppliers found</h3>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                style={{
                  border: "1px solid rgba(128,128,128,0.25)",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "43px",
                      height: "43px",
                      borderRadius: "12px",
                      background: "rgba(99,102,241,0.12)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Package size={21} />
                  </div>

                  <span className="status approved">
                    <CheckCircle size={13} /> {supplier.status}
                  </span>
                </div>

                <h3 style={{ marginBottom: "5px", marginTop: "18px" }}>
                  {supplier.name}
                </h3>

                <p style={{ opacity: 0.7, fontSize: "13px" }}>
                  {supplier.category} · {supplier.location}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "18px",
                  }}
                >
                  <span>
                    <Star size={14} color="#EAB308" /> {supplier.rating}
                  </span>
                  <span>{supplier.match}% match</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <span style={{ opacity: 0.7 }}>Estimated price</span>
                  <strong>{formatPrice(supplier.price)}</strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <span style={{ opacity: 0.7 }}>Delivery</span>
                  <span>{supplier.delivery} days</span>
                </div>

                <button
                  type="button"
                  className="primary-button"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelected(supplier);
                    document
                      .getElementById("supplier-profile")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  View Supplier
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected supplier profile */}
      {selected && (
        <div
          className="panel"
          id="supplier-profile"
          style={{ marginTop: "25px" }}
        >
          <div className="panel-header">
            <div>
              <p className="eyebrow">SUPPLIER PROFILE</p>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close supplier profile"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <X size={22} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px",
              margin: "22px 0",
            }}
          >
            <div className="stat-card">
              <Star size={20} color="#EAB308" />
              <h2>{selected.rating}/5</h2>
              <p>Supplier rating</p>
            </div>

            <div className="stat-card">
              <ShieldCheck size={20} />
              <h2>{selected.reliability}%</h2>
              <p>Reliability</p>
            </div>

            <div className="stat-card">
              <Truck size={20} />
              <h2>{selected.delivery} days</h2>
              <p>Delivery time</p>
            </div>

            <div className="stat-card">
              <TrendingUp size={20} />
              <h2>{selected.match}%</h2>
              <p>Procurement match</p>
            </div>
          </div>

          <h3>Supplier Information</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <p>
              <MapPin size={16} /> {selected.location}
            </p>
            <p>
              <Mail size={16} /> {selected.email}
            </p>
            <p>
              <Phone size={16} /> {selected.phone}
            </p>
            <p>
              <Award size={16} /> {selected.orders} previous demo orders
            </p>
            <p>
              <Clock size={16} /> {selected.delivery}-day delivery estimate
            </p>
            <p>
              <Package size={16} /> {selected.category}
            </p>
          </div>

          <h3 style={{ marginTop: "25px" }}>Supplier Strengths</h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            {selected.strengths.map((strength) => (
              <span
                key={strength}
                className="status approved"
                style={{ padding: "9px 13px" }}
              >
                <CheckCircle size={14} /> {strength}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              borderRadius: "12px",
              background: "rgba(99,102,241,0.08)",
            }}
          >
            <p className="eyebrow">ESTIMATED QUOTATION</p>
            <h2>{formatPrice(selected.price)}</h2>
            <p>
              Illustrative supplier pricing for demonstration. Confirm actual
              quotations before placing an order.
            </p>
          </div>

          <button
            type="button"
            className="select-button"
            style={{ marginTop: "20px" }}
            onClick={() => setSelected(null)}
          >
            Close Profile
          </button>
        </div>
      )}

      <p
        style={{
          fontSize: "12px",
          opacity: 0.6,
          marginTop: "20px",
        }}
      >
        Note: Supplier profiles, ratings, prices and performance metrics are
        sample demonstration data, not verified live supplier information.
      </p>
    </div>
  );
}
