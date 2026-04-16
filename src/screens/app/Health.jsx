import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import Badge from "../../components/common/Badge";
import { SAMPLE_ACCOUNTS } from "../../constants/data";

// SCR-07: Health Check — AI-detected KYC issues per account
const CHECKS = [
  { label: "Aadhaar Seeding", key: "aadhaar" },
  { label: "DOB Match", key: "dob" },
  { label: "Exit Date Marked", key: "exit" },
  { label: "Nominee Declared", key: "nominee" },
];

// Mock health data per account — replace with API response
const HEALTH_DATA = {
  "1012 3456 7890": { aadhaar: "fail", dob: "pass", exit: "pass", nominee: "fail" },
  "1023 4567 8901": { aadhaar: "fail", dob: "pass", exit: "fail", nominee: "fail" },
  "1034 5678 9012": { aadhaar: "pass", dob: "pass", exit: "pass", nominee: "pass" },
};

const statusProps = {
  pass: { text: "OK", color: C.green, bg: C.greenBg },
  fail: { text: "Fix Needed", color: C.red, bg: C.redBg },
  warn: { text: "Warning", color: C.orange, bg: C.orangeBg },
};

const Health = ({ onNav }) => (
  <AppShell active="health" onNav={onNav}>
    <PageHeader title="KYC Health Check" subtitle="AI-detected issues across your PF accounts" />

    <div style={{ padding: 36 }}>
      {SAMPLE_ACCOUNTS.map((acc, i) => {
        const health = HEALTH_DATA[acc.uan] || {};
        const failCount = Object.values(health).filter((v) => v === "fail").length;

        return (
          <div
            key={i}
            style={{
              marginBottom: 20,
              borderRadius: 14,
              background: "#fff",
              border: `1.5px solid ${C.gray200}`,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
            }}
          >
            {/* Account header */}
            <div
              style={{
                padding: "16px 24px",
                borderBottom: `1px solid ${C.gray200}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: failCount > 0 ? C.redBg : C.greenBg,
              }}
            >
              <div>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{acc.employer}</span>
                <span style={{ fontSize: 12, color: C.gray600, marginLeft: 10 }}>UAN: {acc.uan}</span>
              </div>
              <Badge
                text={failCount > 0 ? `${failCount} issue${failCount > 1 ? "s" : ""}` : "All OK"}
                color={failCount > 0 ? C.red : C.green}
                bg={failCount > 0 ? C.redLight : C.greenLight}
              />
            </div>

            {/* Health check grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
              }}
            >
              {CHECKS.map((check, j) => {
                const status = health[check.key] || "warn";
                const props = statusProps[status];
                return (
                  <div
                    key={j}
                    style={{
                      padding: "16px 20px",
                      borderRight: j < CHECKS.length - 1 ? `1px solid ${C.gray200}` : "none",
                    }}
                  >
                    <div style={{ fontSize: 12, color: C.gray600, marginBottom: 8 }}>{check.label}</div>
                    <Badge text={props.text} color={props.color} bg={props.bg} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Tip box */}
      <div
        style={{
          marginTop: 8,
          padding: "16px 20px",
          borderRadius: 12,
          background: C.goldDim,
          border: "1px solid rgba(201,168,76,0.2)",
          fontSize: 13,
          color: C.gray600,
          lineHeight: 1.7,
        }}
      >
        <b style={{ color: C.navy }}>How to fix issues:</b> Go to the <b>Actions</b> tab to get
        step-by-step guidance on resolving KYC mismatches, missing exit dates, and nominee declarations.
      </div>
    </div>
  </AppShell>
);

export default Health;
