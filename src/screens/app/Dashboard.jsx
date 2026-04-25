import { useState } from "react";
import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import StatCard from "../../components/common/StatCard";
import Badge from "../../components/common/Badge";
import { GoldBtn, NavyBtn } from "../../components/common/Buttons";
import { SAMPLE_ACCOUNTS } from "../../constants/data";
import { ArrowR } from "../../components/icons";

const tabStyle = (isActive) => ({
  padding: "12px 20px",
  background: "none",
  border: "none",
  borderBottom: isActive ? `2.5px solid ${C.gold}` : "2.5px solid transparent",
  cursor: "pointer",
  fontSize: 14,
  fontFamily: "var(--fb)",
  fontWeight: isActive ? 700 : 400,
  color: isActive ? C.navy : C.gray600,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
});

const dot = (color) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: color,
  display: "inline-block",
  flexShrink: 0,
});

function groupAccountsByUAN(accounts) {
  const map = {};
  accounts.forEach((acc) => {
    if (!map[acc.uan]) {
      map[acc.uan] = { uan: acc.uan, employers: [], totalBalance: 0, hasActive: false, issueCount: 0 };
    }
    map[acc.uan].employers.push(acc);
    map[acc.uan].totalBalance += acc.balance;
    if (acc.status === "Active") map[acc.uan].hasActive = true;
    if (acc.issue) map[acc.uan].issueCount += 1;
  });
  return Object.values(map);
}

// SCR-06: Dashboard — Overview of all PF accounts and health summary
const Dashboard = ({ go, onNav }) => {
  const [activeTab, setActiveTab] = useState("master");
  const uanGroups = groupAccountsByUAN(SAMPLE_ACCOUNTS);

  const total = SAMPLE_ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);
  const activeCount = SAMPLE_ACCOUNTS.filter((a) => a.status === "Active").length;
  const issues = SAMPLE_ACCOUNTS.filter((a) => a.issue).length;

  const masterStats = [
    { label: "Total PF Balance", value: `₹${total.toLocaleString("en-IN")}`, sub: "Across all accounts", color: C.gold },
    { label: "Total UANs", value: String(uanGroups.length), sub: "Across employers", color: C.blue },
    { label: "Issues Found", value: String(issues), sub: "Require attention", color: issues > 0 ? C.orange : C.green },
    { label: "Active Accounts", value: String(activeCount), sub: "Currently employed", color: C.green },
  ];

  return (
    <AppShell active="dashboard" onNav={onNav}>
      <PageHeader
        title="Dashboard"
        subtitle={activeTab === "master" ? "Overview of all your PF accounts" : `UAN ${activeTab} — Employer details`}
        actions={
          <GoldBtn onClick={() => onNav("health")} style={{ padding: "8px 18px", fontSize: 13 }}>
            View Health Report <ArrowR />
          </GoldBtn>
        }
      />

      {/* UAN Tab Bar */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.gray200}`, padding: "0 36px", display: "flex" }}>
        <button onClick={() => setActiveTab("master")} style={tabStyle(activeTab === "master")}>
          All UANs
        </button>
        {uanGroups.map((g) => (
          <button key={g.uan} onClick={() => setActiveTab(g.uan)} style={tabStyle(activeTab === g.uan)}>
            UAN ···{g.uan.slice(-4)}
            {g.hasActive && <span style={dot(C.green)} />}
            {!g.hasActive && g.issueCount > 0 && <span style={dot(C.orange)} />}
          </button>
        ))}
      </div>

      <div style={{ padding: 36 }}>
        {activeTab === "master" ? (
          <>
            {/* Aggregate stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {masterStats.map((s, i) => (
                <StatCard key={i} {...s} />
              ))}
            </div>

            {/* UAN cards */}
            <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 16 }}>
              Your UANs
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {uanGroups.map((group, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(group.uan)}
                  style={{
                    padding: "20px 24px",
                    borderRadius: 14,
                    background: "#fff",
                    border: `1.5px solid ${C.gray200}`,
                    boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    {/* Left */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, fontFamily: "var(--fh)", marginBottom: 2 }}>
                        UAN: {group.uan}
                      </div>
                      <div style={{ fontSize: 12, color: C.gray600, marginBottom: 10 }}>
                        {group.employers.length} employer{group.employers.length > 1 ? "s" : ""}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {group.employers.map((emp, j) => (
                          <span
                            key={j}
                            style={{
                              padding: "3px 10px",
                              borderRadius: 20,
                              background: C.gray100,
                              fontSize: 12,
                              color: C.gray600,
                            }}
                          >
                            {emp.employer}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right */}
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                      <Badge
                        text={group.hasActive ? "Active" : "Inactive"}
                        color={group.hasActive ? C.green : C.gray400}
                        bg={group.hasActive ? C.greenBg : C.gray100}
                      />
                      <div style={{ fontSize: 13, color: C.gray600, marginTop: 10, marginBottom: 4 }}>UAN Balance</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: C.navy }}>
                        ₹{group.totalBalance.toLocaleString("en-IN")}
                      </div>
                      {group.issueCount > 0 && (
                        <div style={{
                          marginTop: 8,
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: 6,
                          background: C.orangeBg,
                          border: "1px solid rgba(212,116,12,0.2)",
                          fontSize: 12,
                          color: C.orange,
                          fontWeight: 500,
                        }}>
                          ⚠ {group.issueCount} issue{group.issueCount > 1 ? "s" : ""}
                        </div>
                      )}
                      <div style={{ marginTop: 10 }}>
                        <NavyBtn
                          onClick={(e) => { e.stopPropagation(); setActiveTab(group.uan); }}
                          style={{ fontSize: 12, padding: "6px 14px" }}
                        >
                          View Details
                        </NavyBtn>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Per-UAN view */
          (() => {
            const group = uanGroups.find((g) => g.uan === activeTab);
            if (!group) return null;
            return (
              <>
                {/* UAN summary banner */}
                <div style={{
                  padding: "20px 24px",
                  borderRadius: 14,
                  background: C.goldDim,
                  border: "1px solid rgba(201,168,76,0.2)",
                  marginBottom: 28,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.navy, fontFamily: "var(--fh)" }}>
                      UAN: {group.uan}
                    </div>
                    <div style={{ fontSize: 13, color: C.gray600, marginTop: 4 }}>
                      {group.employers.length} employer{group.employers.length > 1 ? "s" : ""}&nbsp;·&nbsp;Total ₹{group.totalBalance.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge
                      text={group.hasActive ? "Active" : "Inactive"}
                      color={group.hasActive ? C.green : C.gray400}
                      bg={group.hasActive ? C.greenBg : C.gray100}
                    />
                    <div style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginTop: 8 }}>
                      ₹{group.totalBalance.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                {/* Employer cards */}
                <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 16 }}>
                  Employers under this UAN
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {group.employers.map((acc, i) => (
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
                        {/* Left */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <span style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{acc.employer}</span>
                            <Badge
                              text={acc.status}
                              color={acc.status === "Active" ? C.green : C.gray400}
                              bg={acc.status === "Active" ? C.greenBg : C.gray100}
                            />
                          </div>
                          <div style={{ fontSize: 12, color: C.gray400, marginBottom: 4 }}>
                            Member ID: <span style={{ fontFamily: "var(--fb)" }}>{acc.mid}</span>
                          </div>
                          <div style={{ fontSize: 13, color: C.gray600, marginBottom: 4 }}>
                            {acc.years}&nbsp;·&nbsp;{acc.location}
                          </div>
                          <div style={{ fontSize: 12, color: C.gray400, marginBottom: 10 }}>
                            Joined: {acc.doj}&nbsp;·&nbsp;{acc.doe ? `Left: ${acc.doe}` : "Present"}
                          </div>
                          {acc.issue && (
                            <div style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              borderRadius: 6,
                              background: C.orangeBg,
                              border: "1px solid rgba(212,116,12,0.2)",
                              fontSize: 12,
                              color: C.orange,
                              fontWeight: 500,
                            }}>
                              ⚠ {acc.issue}
                            </div>
                          )}
                        </div>

                        {/* Right */}
                        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                          <div style={{ fontSize: 13, color: C.gray600, marginBottom: 4 }}>PF Balance</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: C.navy }}>
                            ₹{acc.balance.toLocaleString("en-IN")}
                          </div>
                          <div style={{
                            marginTop: 12,
                            background: C.gray50,
                            borderRadius: 10,
                            padding: "10px 14px",
                            minWidth: 160,
                          }}>
                            <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 12,
                              paddingBottom: 6,
                              borderBottom: `1px solid ${C.gray200}`,
                            }}>
                              <span style={{ color: C.gray600 }}>Employee Share</span>
                              <span style={{ color: C.navy, fontWeight: 600 }}>
                                ₹{Math.round(acc.balance * 0.5).toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 12,
                              paddingTop: 6,
                            }}>
                              <span style={{ color: C.gray600 }}>Employer Share</span>
                              <span style={{ color: C.navy, fontWeight: 600 }}>
                                ₹{Math.round(acc.balance * 0.5).toLocaleString("en-IN")}
                              </span>
                            </div>
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
              </>
            );
          })()
        )}
      </div>
    </AppShell>
  );
};

export default Dashboard;
