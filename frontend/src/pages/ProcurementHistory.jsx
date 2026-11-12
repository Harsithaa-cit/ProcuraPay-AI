
import { useState } from "react";

function ProcurementHistory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const records = [
    {
      id: "PO-1001",
      supplier: "TechNova Solutions",
      item: "Cloud Infrastructure",
      amount: 85000,
      status: "Completed",
      date: "2026-11-08",
    },
    {
      id: "PO-1002",
      supplier: "Global Office Supplies",
      item: "Office Equipment",
      amount: 32000,
      status: "Pending",
      date: "2026-11-09",
    },
    {
      id: "PO-1003",
      supplier: "DataCore Systems",
      item: "Enterprise Software",
      amount: 125000,
      status: "Approved",
      date: "2026-11-10",
    },
    {
      id: "PO-1004",
      supplier: "SmartTech Industries",
      item: "Networking Equipment",
      amount: 54000,
      status: "Cancelled",
      date: "2026-11-11",
    },
  ];

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(search.toLowerCase()) ||
      record.supplier.toLowerCase().includes(search.toLowerCase()) ||
      record.item.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || record.status === filter;

    return matchesSearch && matchesFilter;
  });

  const total = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="module-page">
      <div className="module-header">
        <span className="eyebrow">PROCUREMENT TRACKING</span>
        <h1>Procurement History</h1>
        <p>Track and review your previous procurement activities.</p>
      </div>

      <div className="history-summary">
        <div className="history-stat">
          <span>Total Orders</span>
          <h2>{records.length}</h2>
        </div>
        <div className="history-stat">
          <span>Total Order Value</span>
          <h2>₹{total.toLocaleString("en-IN")}</h2>
        </div>
        <div className="history-stat">
          <span>Completed</span>
          <h2>{records.filter(r => r.status === "Completed").length}</h2>
        </div>
      </div>

      <div className="history-toolbar">
        <input
          placeholder="Search order, supplier or item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.supplier}</td>
                <td>{record.item}</td>
                <td>₹{record.amount.toLocaleString("en-IN")}</td>
                <td>{record.date}</td>
                <td>
                  <span className={`status-pill ${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-history-btn"
                    onClick={() => setSelected(record)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan="7">No matching procurement records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="history-detail">
          <h2>Order Details — {selected.id}</h2>
          <p><strong>Supplier:</strong> {selected.supplier}</p>
          <p><strong>Item:</strong> {selected.item}</p>
          <p><strong>Amount:</strong> ₹{selected.amount.toLocaleString("en-IN")}</p>
          <p><strong>Date:</strong> {selected.date}</p>
          <p><strong>Status:</strong> {selected.status}</p>

          <button onClick={() => setSelected(null)}>
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}

export default ProcurementHistory;
