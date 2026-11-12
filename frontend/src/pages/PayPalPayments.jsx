
import { useMemo, useState } from "react";

const approvedOrders = [
  {
    id: "PO-2026-001",
    supplier: "TechNova Solutions",
    amount: 85000,
  },
];

const initialPayments = [];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PayPalPayments() {
  const [payments, setPayments] = useState(initialPayments);
  const [showForm, setShowForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPO, setSelectedPO] = useState("");
  const [email, setEmail] = useState("");

  const availableOrders = approvedOrders.filter(
    (po) => !payments.some((payment) => payment.poId === po.id)
  );

  const completed = payments.filter(
    (payment) => payment.status === "Completed"
  );

  const pending = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const failed = payments.filter(
    (payment) => payment.status === "Failed"
  );

  const totalPaid = completed.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const selectedOrder = approvedOrders.find(
    (po) => po.id === selectedPO
  );

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.poId.toLowerCase().includes(search.toLowerCase()) ||
        payment.supplier.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || payment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [payments, search, filter]);

  const styles = {
    page: {
      padding: 28,
      color: "#e9edf7",
      fontFamily: "inherit",
    },
    card: {
      background: "#151b2b",
      border: "1px solid #29334a",
      borderRadius: 14,
      padding: 20,
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      background: "#0f1524",
      border: "1px solid #35405a",
      color: "white",
      borderRadius: 8,
      padding: 11,
      marginTop: 7,
    },
    button: {
      background: "#7165f5",
      color: "white",
      border: "none",
      borderRadius: 9,
      padding: "11px 17px",
      cursor: "pointer",
      fontWeight: 600,
    },
  };

  const statusStyle = (status) => ({
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    background:
      status === "Completed"
        ? "#123d32"
        : status === "Pending"
        ? "#453719"
        : "#48242d",
    color:
      status === "Completed"
        ? "#56d6a0"
        : status === "Pending"
        ? "#f5c76a"
        : "#ff8294",
  });

  const openPaymentForm = () => {
    setSelectedPO("");
    setEmail("");
    setShowForm(true);
  };

  const initiatePayment = (e) => {
    e.preventDefault();

    const order = approvedOrders.find(
      (po) => po.id === selectedPO
    );

    if (!order) return;

    if (payments.some((payment) => payment.poId === order.id)) {
      alert("A payment has already been initiated for this order.");
      return;
    }

    const newPayment = {
      id: `PAY-2026-${String(payments.length + 1).padStart(3, "0")}`,
      poId: order.id,
      supplier: order.supplier,
      email,
      amount: order.amount,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      method: "PayPal Demo Checkout",
    };

    setPayments((previous) => [newPayment, ...previous]);
    setShowForm(false);
    setSelectedPayment(newPayment);
  };

  const confirmDemoPayment = (payment) => {
    const updatedPayment = {
      ...payment,
      status: "Completed",
      date: new Date().toISOString().slice(0, 10),
    };

    setPayments((previous) =>
      previous.map((item) =>
        item.id === payment.id ? updatedPayment : item
      )
    );

    setSelectedPayment(updatedPayment);
  };

  const downloadReceipt = (payment) => {
    const receipt = `
PROCURA PAY AI
PAYMENT RECEIPT

Transaction ID: ${payment.id}
Purchase Order: ${payment.poId}

SUPPLIER DETAILS
Supplier: ${payment.supplier}
Email: ${payment.email}

PAYMENT DETAILS
Amount: ${money(payment.amount)}
Payment Date: ${payment.date}
Payment Method: ${payment.method}
Payment Status: ${payment.status}

Thank you for using ProcuraPay AI.

DEMO RECEIPT
No real payment was processed.
    `;

    const blob = new Blob([receipt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${payment.id}-receipt.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 27 }}>
            PayPal Payments
          </h1>
          <p style={{ color: "#929db5", marginTop: 8 }}>
            Manage supplier payments and track transactions.
          </p>
        </div>

        <button style={styles.button} onClick={openPaymentForm}>
          + Initiate Payment
        </button>
      </div>

      {/* PayPal banner */}
      <div
        style={{
          ...styles.card,
          background: "linear-gradient(110deg, #172a52, #18213b)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 15,
          marginBottom: 22,
        }}
      >
        <div>
          <p style={{ color: "#aab8d6", margin: 0 }}>
            PAYMENT GATEWAY
          </p>

          <h2 style={{ margin: "9px 0" }}>
            <span style={{ color: "#5da9ff" }}>Pay</span>
            <span style={{ color: "white" }}>Pal</span>
            {" "}Payment Center
          </h2>

          <p style={{ color: "#aab8d6", margin: 0 }}>
            A unified payment workflow for procurement operations.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #6079ad",
            padding: "12px 18px",
            borderRadius: 12,
            color: "#aab8d6",
            fontSize: 13,
          }}
        >
          DEMO PAYMENT ENVIRONMENT
        </div>
      </div>

      {/* Dashboard cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 15,
          marginBottom: 24,
        }}
      >
        {[
          ["Total Paid", money(totalPaid), "Successfully completed"],
          ["Completed", completed.length, "Successful transactions"],
          ["Pending", pending.length, "Awaiting confirmation"],
          ["Failed", failed.length, "Unsuccessful transactions"],
        ].map(([label, value, description]) => (
          <div key={label} style={styles.card}>
            <p style={{ color: "#9ba6bd", margin: 0 }}>{label}</p>
            <h2 style={{ margin: "13px 0 7px", fontSize: 25 }}>
              {value}
            </h2>
            <small style={{ color: "#77849e" }}>
              {description}
            </small>
          </div>
        ))}
      </div>

      {/* Workflow */}
      <div style={{ ...styles.card, marginBottom: 24 }}>
        <h2 style={{ marginTop: 0 }}>Payment Workflow</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
          }}
        >
          {[
            ["01", "Approved PO", "Purchase order approved"],
            ["02", "Initiate", "Enter supplier payment details"],
            ["03", "Confirm", "Review demo transaction"],
            ["04", "Complete", "Generate payment receipt"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              style={{
                background: "#0f1524",
                padding: 15,
                borderRadius: 10,
                border: "1px solid #303b55",
              }}
            >
              <span style={{ color: "#9c91ff", fontWeight: 700 }}>
                STEP {number}
              </span>
              <h3 style={{ margin: "10px 0 5px" }}>{title}</h3>
              <small style={{ color: "#929db5" }}>
                {description}
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 6px" }}>
              Transaction History
            </h2>
            <small style={{ color: "#929db5" }}>
              Monitor supplier payment activity.
            </small>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              style={{ ...styles.input, width: 200, marginTop: 0 }}
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              style={{ ...styles.input, width: 145, marginTop: 0 }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              minWidth: 780,
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ color: "#9ba6bd", fontSize: 13 }}>
                {[
                  "TRANSACTION",
                  "PURCHASE ORDER",
                  "SUPPLIER",
                  "AMOUNT",
                  "DATE",
                  "STATUS",
                  "ACTION",
                ].map((heading) => (
                  <th key={heading} style={cellStyle}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td style={cellStyle}>{payment.id}</td>
                  <td style={cellStyle}>{payment.poId}</td>
                  <td style={cellStyle}>{payment.supplier}</td>
                  <td style={cellStyle}>{money(payment.amount)}</td>
                  <td style={cellStyle}>{payment.date}</td>
                  <td style={cellStyle}>
                    <span style={statusStyle(payment.status)}>
                      {payment.status}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    <button
                      style={{
                        ...styles.button,
                        background: "#293650",
                        padding: "7px 10px",
                      }}
                      onClick={() => setSelectedPayment(payment)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      ...cellStyle,
                      textAlign: "center",
                      color: "#929db5",
                    }}
                  >
                    No transactions found. Initiate your first payment!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Initiate payment modal */}
      {showForm && (
        <div style={backdropStyle}>
          <form onSubmit={initiatePayment} style={modalStyle}>
            <h2 style={{ margin: 0 }}>Initiate Supplier Payment</h2>

            <p style={{ color: "#929db5", margin: 0 }}>
              Select an approved purchase order to begin.
            </p>

            <label>Approved Purchase Order</label>

            <select
              required
              style={styles.input}
              value={selectedPO}
              onChange={(e) => setSelectedPO(e.target.value)}
            >
              <option value="">Select a purchase order</option>

              {availableOrders.map((po) => (
                <option key={po.id} value={po.id}>
                  {po.id} — {po.supplier}
                </option>
              ))}
            </select>

            {availableOrders.length === 0 && (
              <small style={{ color: "#f5c76a" }}>
                No eligible approved orders are currently available.
              </small>
            )}

            <label>Supplier Email</label>

            <input
              required
              type="email"
              style={styles.input}
              placeholder="supplier@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Payment Amount (₹)</label>

            <input
              required
              type="number"
              style={{ ...styles.input, opacity: 0.75 }}
              value={selectedOrder ? selectedOrder.amount : ""}
              placeholder="Select a purchase order first"
              readOnly
            />

            <label>Payment Method</label>

            <input
              disabled
              style={{ ...styles.input, opacity: 0.7 }}
              value="PayPal Demo Checkout"
              readOnly
            />

            <p style={{ color: "#f5c76a", fontSize: 12 }}>
              Demo only. No real payment will be processed.
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="submit"
                style={styles.button}
                disabled={!selectedPO}
              >
                Continue to Payment
              </button>

              <button
                type="button"
                style={{ ...styles.button, background: "#35405a" }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment details modal */}
      {selectedPayment && (
        <div style={backdropStyle}>
          <div style={modalStyle}>
            <h2 style={{ margin: 0 }}>Payment Details</h2>

            <div
              style={{
                background: "#0f1524",
                padding: 17,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <p style={{ color: "#929db5", margin: 0 }}>
                PAYMENT AMOUNT
              </p>

              <h1 style={{ margin: "10px 0", fontSize: 32 }}>
                {money(selectedPayment.amount)}
              </h1>

              <span style={statusStyle(selectedPayment.status)}>
                {selectedPayment.status}
              </span>
            </div>

            {[
              ["Transaction ID", selectedPayment.id],
              ["Purchase Order", selectedPayment.poId],
              ["Supplier", selectedPayment.supplier],
              ["Recipient", selectedPayment.email],
              ["Payment Date", selectedPayment.date],
              ["Payment Method", selectedPayment.method],
            ].map(([label, value]) => (
              <div key={label} style={detailRow}>
                <span style={{ color: "#9ba6bd" }}>{label}</span>
                <strong style={{ textAlign: "right" }}>{value}</strong>
              </div>
            ))}

            {selectedPayment.status === "Pending" && (
              <button
                style={{
                  ...styles.button,
                  background: "#16865f",
                  marginTop: 10,
                }}
                onClick={() => confirmDemoPayment(selectedPayment)}
              >
                Confirm Demo Payment
              </button>
            )}

            {selectedPayment.status === "Completed" && (
              <button
                style={{
                  ...styles.button,
                  background: "#16865f",
                  marginTop: 10,
                }}
                onClick={() => downloadReceipt(selectedPayment)}
              >
                Download Receipt
              </button>
            )}

            <button
              style={{
                ...styles.button,
                background: "#35405a",
                marginTop: 5,
              }}
              onClick={() => setSelectedPayment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const cellStyle = {
  padding: 13,
  borderBottom: "1px solid #283247",
  fontSize: 13,
};

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.78)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 15,
  zIndex: 1000,
  overflowY: "auto",
};

const modalStyle = {
  background: "#151b2b",
  border: "1px solid #35405a",
  borderRadius: 16,
  padding: 25,
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 13,
  color: "#e9edf7",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid #30394d",
  fontSize: 13,
};
