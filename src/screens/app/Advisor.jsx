import { useState } from "react";
import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import { GoldBtn } from "../../components/common/Buttons";
import { ArrowR } from "../../components/icons";

// SCR-11: AI Advisor — Personalized PF advice based on user's accounts
const SUGGESTIONS = [
  {
    priority: "high",
    icon: "🔴",
    title: "Consolidate 2 inactive PF accounts",
    detail:
      "You have ₹3.24 lakh sitting in 2 old accounts. Transferring them to your current UAN reduces risk of dormancy penalties and simplifies future withdrawals.",
    action: "Start Transfer",
    screen: "actions",
  },
  {
    priority: "high",
    icon: "🔴",
    title: "Fix missing Aadhaar seeding on 2 accounts",
    detail:
      "Aadhaar seeding is mandatory for online claims. Without it, you can't withdraw or transfer PF online. Fix this first before attempting any claim.",
    action: "Fix KYC",
    screen: "actions",
  },
  {
    priority: "medium",
    icon: "🟡",
    title: "Declare a nominee on your active account",
    detail:
      "Your TCS account has no nominee. In case of an emergency, your family won't be able to claim the PF balance without legal documentation.",
    action: "Add Nominee",
    screen: "actions",
  },
  {
    priority: "low",
    icon: "🟢",
    title: "Check VPF option with current employer",
    detail:
      "With your current salary level, contributing an extra 2% as VPF (Voluntary PF) can save ₹18,000+ in taxes per year under Section 80C.",
    action: "Learn More",
    screen: null,
  },
];

const Advisor = ({ onNav }) => {
  const [expanded, setExpanded] = useState(null);

  const priorityStyle = {
    high: { color: C.red, bg: C.redBg, label: "High Priority" },
    medium: { color: C.orange, bg: C.orangeBg, label: "Medium" },
    low: { color: C.green, bg: C.greenBg, label: "Low Priority" },
  };

  return (
    <AppShell active="advisor" onNav={onNav}>
      <PageHeader title="AI Advisor" subtitle="Personalised recommendations based on your PF accounts" />

      <div style={{ padding: 36 }}>
        {/* Summary banner */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 12,
            background: C.goldDim,
            border: "1px solid rgba(201,168,76,0.2)",
            marginBottom: 24,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 24 }}>🤖</span>
          <div style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6 }}>
            <b style={{ color: C.navy }}>4 recommendations</b> found based on your PF accounts.
            We found 2 high-priority issues that need immediate attention.
          </div>
        </div>

        {/* Suggestion cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 700 }}>
          {SUGGESTIONS.map((item, i) => {
            const ps = priorityStyle[item.priority];
            const isOpen = expanded === i;

            return (
              <div
                key={i}
                style={{
                  borderRadius: 14,
                  background: "#fff",
                  border: `1.5px solid ${isOpen ? C.gold : C.gray200}`,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                  boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
                }}
              >
                {/* Row header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    width: "100%",
                    padding: "16px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{item.title}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: ps.color,
                      background: ps.bg,
                      padding: "3px 10px",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ps.label}
                  </div>
                  <span style={{ fontSize: 16, color: C.gray400, marginLeft: 8 }}>
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0 20px 20px 20px",
                      borderTop: `1px solid ${C.gray200}`,
                      paddingTop: 16,
                    }}
                  >
                    <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.7, marginBottom: 16 }}>
                      {item.detail}
                    </p>
                    {item.screen && (
                      <GoldBtn
                        onClick={() => onNav(item.screen)}
                        style={{ padding: "8px 18px", fontSize: 13, display: "inline-flex" }}
                      >
                        {item.action} <ArrowR />
                      </GoldBtn>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};

export default Advisor;
