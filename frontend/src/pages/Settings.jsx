
import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    company: "ProcuraPay Technologies",
    email: "admin@procurapay.ai",
    currency: "INR",
    notifications: true,
    approvalAlerts: true,
    budgetAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("procuraPaySettings", JSON.stringify(settings));
    setSaved(true);
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <span className="eyebrow">SYSTEM CONFIGURATION</span>
        <h1>Settings</h1>
        <p>Manage your organization and procurement preferences.</p>
      </div>

      <div className="settings-card">
        <h2>Organization Profile</h2>

        <label>Company Name</label>
        <input
          value={settings.company}
          onChange={(e) => update("company", e.target.value)}
        />

        <label>Administrator Email</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <label>Default Currency</label>
        <select
          value={settings.currency}
          onChange={(e) => update("currency", e.target.value)}
        >
          <option value="INR">INR - Indian Rupee</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
        </select>
      </div>

      <div className="settings-card">
        <h2>Notification Preferences</h2>

        {[
          ["notifications", "General Notifications"],
          ["approvalAlerts", "Purchase Approval Alerts"],
          ["budgetAlerts", "Budget Limit Alerts"],
        ].map(([key, label]) => (
          <label className="setting-toggle" key={key}>
            <span>{label}</span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(e) => update(key, e.target.checked)}
            />
          </label>
        ))}
      </div>

      <button className="save-settings-btn" onClick={handleSave}>
        Save Changes
      </button>

      {saved && (
        <p className="success-message">
          ✓ Settings saved successfully!
        </p>
      )}
    </div>
  );
}

export default Settings;
