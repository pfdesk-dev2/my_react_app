import { useState } from "react";
import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import { GoldBtn } from "../../components/common/Buttons";

// SCR-12: Settings — Profile, linked accounts, notification preferences
const Settings = ({ go, onNav }) => {
  const [notifications, setNotifications] = useState({
    balanceAlerts: true,
    kycReminders: true,
    claimUpdates: true,
    newsletter: false,
  });

  const toggle = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const notifItems = [
    { key: "balanceAlerts", label: "Balance Alerts", desc: "Notify when PF balance changes significantly" },
    { key: "kycReminders", label: "KYC Reminders", desc: "Remind before KYC documents expire" },
    { key: "claimUpdates", label: "Claim Status Updates", desc: "Track transfer/withdrawal progress" },
    { key: "newsletter", label: "PF Tips Newsletter", desc: "Monthly tips on PF rules and savings" },
  ];

  const profileFields = [
    { label: "Full Name", value: "Rahul Kumar Sharma" },
    { label: "Mobile Number", value: "+91 98XXX XXXXX" },
    { label: "UAN", value: "1012 3456 7890" },
    { label: "Aadhaar (masked)", value: "XXXX XXXX 8721" },
    { label: "PAN", value: "ABCDE•••••" },
  ];

  const sectionTitle = (text) => (
    <h3
      style={{
        fontFamily: "var(--fh)",
        fontSize: 15,
        fontWeight: 600,
        color: C.navy,
        marginBottom: 14,
        paddingBottom: 10,
        borderBottom: `1px solid ${C.gray200}`,
      }}
    >
      {text}
    </h3>
  );

  const cardStyle = {
    padding: 24,
    borderRadius: 14,
    background: "#fff",
    border: `1.5px solid ${C.gray200}`,
    boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
    marginBottom: 20,
  };

  return (
    <AppShell active="settings" onNav={onNav}>
      <PageHeader title="Settings" subtitle="Manage your profile and preferences" />

      <div style={{ padding: 36, maxWidth: 680 }}>
        {/* Profile */}
        <div style={cardStyle}>
          {sectionTitle("Your Profile")}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {profileFields.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: C.gray50,
                }}
              >
                <span style={{ fontSize: 13, color: C.gray600 }}>{f.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={cardStyle}>
          {sectionTitle("Notification Preferences")}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {notifItems.map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: C.gray600, marginTop: 2 }}>{item.desc}</div>
                </div>
                {/* Toggle switch */}
                <button
                  onClick={() => toggle(item.key)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: "none",
                    background: notifications[item.key] ? C.green : C.gray200,
                    cursor: "pointer",
                    position: "relative",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      left: notifications[item.key] ? 23 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div
          style={{
            ...cardStyle,
            border: `1.5px solid ${C.redBg}`,
            background: C.redBg,
          }}
        >
          {sectionTitle("Account")}
          <p style={{ fontSize: 13, color: C.gray600, marginBottom: 16 }}>
            Logging out will remove your session. You can log back in anytime with your mobile number.
          </p>
          <button
            onClick={() => go("welcome")}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: `1.5px solid ${C.red}`,
              background: "transparent",
              color: C.red,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--fb)",
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </AppShell>
  );
};

export default Settings;
