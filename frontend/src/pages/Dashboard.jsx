import {
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Wallet,
  TrendingUp,
  Users,
  Sparkles,
  Clock3,
  ArrowRight,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const spendingData = [
  { month: "May", spending: 42000, savings: 8500 },
  { month: "Jun", spending: 51000, savings: 12000 },
  { month: "Jul", spending: 46000, savings: 11000 },
  { month: "Aug", spending: 63000, savings: 16000 },
  { month: "Sep", spending: 54000, savings: 14000 },
  { month: "Oct", spending: 72000, savings: 21000 },
  { month: "Nov", spending: 61000, savings: 19000 },
];

const supplierData = [
  { name: "Electronics", value: 42, color: "#9575ff" },
  { name: "Equipment", value: 28, color: "#43c6db" },
  { name: "Office", value: 18, color: "#e8ae68" },
  { name: "Others", value: 12, color: "#64748b" },
];

const activities = [
  {
    title: "Laptop procurement request",
    supplier: "TechNova Supplies",
    amount: "₹2,45,000",
    status: "Pending",
    color: "pending",
  },
  {
    title: "Office equipment purchase",
    supplier: "Prime Office Solutions",
    amount: "₹48,500",
    status: "Approved",
    color: "approved",
  },
  {
    title: "Cloud infrastructure",
    supplier: "CloudSphere",
    amount: "₹32,000",
    status: "Completed",
    color: "completed",
  },
];

function StatCard({ title, value, change, icon: Icon, positive }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className="stat-icon">
          <Icon size={19} />
        </div>
      </div>

      <h2>{value}</h2>

      <div className="stat-bottom">
        <span className={positive ? "positive" : "negative"}>
          {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
          {change}
        </span>
        <small>vs last month</small>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">

      <section className="welcome-section">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} /> PROCUREMENT INTELLIGENCE
          </div>
          <h1>Good evening, <span>Business Owner</span></h1>
          <p>
            Here's what's happening with your procurement operations.
          </p>
        </div>

        <button className="primary-button">
          <ShoppingBag size={17} />
          New Procurement
        </button>
      </section>

      <div className="demo-notice">
        <ShieldCheck size={16} />
        Demonstration workspace · All financial figures are simulated.
      </div>

      <section className="stats-grid">
        <StatCard
          title="Total Procurement"
          value="₹7,16,720"
          change="12.8%"
          icon={ShoppingBag}
          positive
        />

        <StatCard
          title="AI Estimated Savings"
          value="₹84,250"
          change="18.4%"
          icon={Wallet}
          positive
        />

        <StatCard
          title="Pending Approvals"
          value="08"
          change="2.5%"
          icon={Clock3}
          positive={false}
        />

        <StatCard
          title="Active Suppliers"
          value="24"
          change="6.2%"
          icon={Users}
          positive
        />
      </section>

      <section className="analytics-grid">
        <div className="panel spending-panel">
          <div className="panel-header">
            <div>
              <h3>Procurement Analytics</h3>
              <p>Spending and estimated savings over time</p>
            </div>
            <button className="select-button">
              Last 7 months <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="chart-legend">
            <span><i className="legend-dot purple" /> Spending</span>
            <span><i className="legend-dot cyan" /> Estimated savings</span>
          </div>

          <div className="spending-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9875ff" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#9875ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#43c6db" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#43c6db" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#293043" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" stroke="#778198" tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#778198"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#171d2c",
                    border: "1px solid #343c52",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                />

                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#9875ff"
                  fill="url(#spendingFill)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#43c6db"
                  fill="url(#savingsFill)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel category-panel">
          <div className="panel-header">
            <div>
              <h3>Spending Categories</h3>
              <p>Procurement distribution</p>
            </div>
            <MoreHorizontal size={20} />
          </div>

          <div className="category-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={supplierData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  stroke="none"
                >
                  {supplierData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#171d2c",
                    border: "1px solid #343c52",
                    borderRadius: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="category-legend">
            {supplierData.map((item) => (
              <div key={item.name}>
                <span><i style={{ background: item.color }} />{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h3>Recent Procurement Activity</h3>
              <p>Track your latest purchase requests</p>
            </div>
            <button className="text-button">
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="activity-table">
            <div className="table-heading">
              <span>PROCUREMENT</span>
              <span>SUPPLIER</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
            </div>

            {activities.map((activity) => (
              <div className="activity-row" key={activity.title}>
                <strong>{activity.title}</strong>
                <span>{activity.supplier}</span>
                <strong>{activity.amount}</strong>
                <span className={`status ${activity.color}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel insight-panel">
          <div className="insight-heading">
            <div className="insight-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <h3>AI Procurement Insight</h3>
              <small>DEMO INSIGHT</small>
            </div>
          </div>

          <h4>An opportunity to optimize spending</h4>
          <p>
            Your simulated electronics procurement spending
            shows potential for better supplier negotiation.
            Compare warranty and delivery terms before approving
            your next purchase.
          </p>

          <div className="insight-footer">
            <span><TrendingUp size={15} /> Potential optimization</span>
            <button>Explore <ArrowRight size={15} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;