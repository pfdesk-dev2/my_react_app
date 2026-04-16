import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import Badge from "../../components/common/Badge";

// SCR-10: Claim Tracker — Status of active PF withdrawal/transfer requests
const MOCK_CLAIMS = [
  {
    id: "CLM-2024-001",
    type: "PF Transfer",
    account: "Delhi Metro Rail Corp.",
    filed: "12 Mar 2024",
    status: "pending",
    statusLabel: "Awaiting Employer",
    timeline: [
      { label: "Claim Filed", done: true, date: "12 Mar 2024" },
      { label: "Member Portal Verified", done: true, date: "12 Mar 2024" },
      { label: "Employer Approval", done: false, date: "Expected by 22 Mar" },
      { label: "EPFO Processing", done: false, date: "—" },
      { label: "Transfer Complete", done: false, date: "—" },
    ],
  },
  {
    id: "CLM-2024-002",
    type: "Partial Withdrawal",
    account: "Infosys Ltd.",
    filed: "5 Jan 2024",
    status: "done",
    statusLabel: "Settled",
    amount: "₹1,20,000",
    timeline: [
      { label: "Claim Filed", done: true, date: "5 Jan 2024" },
      { label: "Member Portal Verified", done: true, date: "5 Jan 2024" },
      { label: "Employer Approval", done: true, date: "8 Jan 2024" },
      { label: "EPFO Processing", done: true, date: "13 Jan 2024" },
      { label: "Amount Credited", done: true, date: "15 Jan 2024" },
    ],
  },
];

const statusStyle = {
  pending: { color: C.orange, bg: C.orangeBg },
  done: { color: C.green, bg: C.greenBg },
  rejected: { color: C.red, bg: C.redBg },
};

const Tracker = ({ onNav }) => (
  <AppShell active="tracker" onNav={onNav}>
    <PageHeader title="Claim Tracker" subtitle="Track the status of your PF transfer and withdrawal requests" />

    <div style={{ padding: 36 }}>
      {MOCK_CLAIMS.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: C.gray600,
            fontSize: 14,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          No active claims. Use the Actions tab to start a new request.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 780 }}>
          {MOCK_CLAIMS.map((claim, i) => {
            const style = statusStyle[claim.status] || statusStyle.pending;
            return (
              <div
                key={i}
                style={{
                  borderRadius: 16,
                  background: "#fff",
                  border: `1.5px solid ${C.gray200}`,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: "16px 24px",
                    borderBottom: `1px solid ${C.gray200}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{claim.type}</div>
                    <div style={{ fontSize: 12, color: C.gray600, marginTop: 2 }}>
                      {claim.account} &nbsp;·&nbsp; Filed {claim.filed}
                      {claim.amount && <> &nbsp;·&nbsp; <b style={{ color: C.navy }}>{claim.amount}</b></>}
                    </div>
                  </div>
                  <Badge text={claim.statusLabel} color={style.color} bg={style.bg} />
                </div>

                {/* Timeline */}
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", gap: 0 }}>
                    {claim.timeline.map((step, j) => (
                      <div
                        key={j}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        {/* Connector line */}
                        {j < claim.timeline.length - 1 && (
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: "50%",
                              right: "-50%",
                              height: 2,
                              background: step.done ? C.green : C.gray200,
                              zIndex: 0,
                            }}
                          />
                        )}

                        {/* Circle */}
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background: step.done ? C.green : C.gray200,
                            border: `2px solid ${step.done ? C.green : C.gray200}`,
                            zIndex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 8,
                          }}
                        >
                          {step.done && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: step.done ? C.navy : C.gray400 }}>
                            {step.label}
                          </div>
                          <div style={{ fontSize: 10, color: C.gray400, marginTop: 2 }}>{step.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </AppShell>
);

export default Tracker;
