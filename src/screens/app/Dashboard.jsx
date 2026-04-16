import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import StatCard from "../../components/common/StatCard";
import Badge from "../../components/common/Badge";
import { GoldBtn, NavyBtn } from "../../components/common/Buttons";
import { SAMPLE_ACCOUNTS } from "../../constants/data";
import { ArrowR } from "../../components/icons";

// SCR-06: Dashboard — Overview of all PF accounts and health summary
const Dashboard = ({ go, onNav }) => {
  const total = SAMPLE_ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);
  const active = SAMPLE_ACCOUNTS.filter((a) => a.status === "Active").length;
  const issues = SAMPLE_ACCOUNTS.filter((a) => a.issue).length;

  const stats = [
    { label: "Total PF Balance", value: `₹${total.toLocaleString("en-IN")}`, sub: "Across all accounts", color: C.gold },
    { label: "Accounts Found", value: String(SAMPLE_ACCOUNTS.length), sub: `${active} active`, color: C.blue },
    { label: "Issues Detected", value: String(issues), sub: "Require attention", color: issues > 0 ? C.orange : C.green },
    { label: "KYC Status", value: "Pending", sub: "Aadhaar seeding needed", color: C.red },
  ];

  return (
    <AppShell active="dashboard" onNav={onNav}>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of all your PF accounts"
        actions={
          <GoldBtn onClick={() => onNav("health")} style={{ padding: "8px 18px", fontSize: 13 }}>
            View Health Report <ArrowR />
          </GoldBtn>
        }
      />

      <div style={{ padding: 36 }}>
        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* Account cards */}
        <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 16 }}>
          Your PF Accounts
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SAMPLE_ACCOUNTS.map((acc, i) => (
            <div
              key={i}
              style={{
                padding: "20px 24px",
                borderRadius: 14,
                background: "#fff",
                border: `1.5px solid ${C.gray200}`,
                boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{acc.employer}</span>
                    <Badge
                      text={acc.status}
                      color={acc.status === "Active" ? C.green : C.gray400}
                      bg={acc.status === "Active" ? C.greenBg : C.gray100}
                    />
                  </div>
                  <div style={{ fontSize: 13, color: C.gray600, marginBottom: 10 }}>
                    UAN: {acc.uan} &nbsp;·&nbsp; Est. {acc.years} &nbsp;·&nbsp; {acc.location}
                  </div>

                  {acc.issue && (
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: C.orangeBg,
                        border: `1px solid rgba(212,116,12,0.2)`,
                        fontSize: 12,
                        color: C.orange,
                        fontWeight: 500,
                      }}
                    >
                      ⚠ {acc.issue}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ fontSize: 13, color: C.gray600, marginBottom: 4 }}>PF Balance</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.navy }}>
                    ₹{acc.balance.toLocaleString("en-IN")}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <NavyBtn onClick={() => onNav("actions")} style={{ fontSize: 12, padding: "6px 14px" }}>
                      Take Action
                    </NavyBtn>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
