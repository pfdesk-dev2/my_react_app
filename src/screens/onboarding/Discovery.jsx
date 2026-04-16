import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";
import { GoldBtn } from "../../components/common/Buttons";
import Badge from "../../components/common/Badge";
import { SAMPLE_ACCOUNTS } from "../../constants/data";
import { ArrowR, CheckIcon } from "../../components/icons";

// SCR-05: PF Account Discovery Results
// Shows all PF accounts found linked to the user's UAN/PAN
const Discovery = ({ go }) => {
  const total = SAMPLE_ACCOUNTS.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <CenterCol maxW={580}>
      <StepBar current={3} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ margin: "0 auto 16px", width: "fit-content" }}>
          <CheckIcon s={64} />
        </div>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 26, fontWeight: 600, color: C.navy, marginBottom: 6 }}>
          {SAMPLE_ACCOUNTS.length} PF Accounts Found
        </h2>
        <p style={{ fontSize: 14, color: C.gray600 }}>
          Total balance across all accounts:{" "}
          <b style={{ color: C.navy }}>₹{total.toLocaleString("en-IN")}</b>
        </p>
      </div>

      {/* Account cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
        {SAMPLE_ACCOUNTS.map((acc, i) => (
          <div
            key={i}
            style={{
              padding: "18px 20px",
              borderRadius: 14,
              background: "#fff",
              border: `1.5px solid ${C.gray200}`,
              boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
            }}
          >
            {/* Top row: employer + status badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{acc.employer}</div>
                <div style={{ fontSize: 12, color: C.gray600, marginTop: 2 }}>
                  UAN: {acc.uan} &nbsp;·&nbsp; Est. {acc.years}
                </div>
              </div>
              <Badge
                text={acc.status}
                color={acc.status === "Active" ? C.green : C.gray400}
                bg={acc.status === "Active" ? C.greenBg : C.gray100}
              />
            </div>

            {/* Balance row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 10,
                background: C.gray50,
                border: `1px solid ${C.gray200}`,
              }}
            >
              <span style={{ fontSize: 13, color: C.gray600 }}>PF Balance</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: C.navy }}>
                ₹{acc.balance.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Issue warning if any */}
            {acc.issue && (
              <div
                style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 8,
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
        ))}
      </div>

      <GoldBtn onClick={() => go("dashboard")}>
        View Full Dashboard <ArrowR />
      </GoldBtn>
    </CenterCol>
  );
};

export default Discovery;
