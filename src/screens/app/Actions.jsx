import { useState } from "react";
import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import { GoldBtn, NavyBtn } from "../../components/common/Buttons";
import { SAMPLE_ACCOUNTS } from "../../constants/data";

// SCR-09: Actions — Step-by-step guidance for Transfer, Withdrawal, KYC fix
const ACTION_TYPES = [
  { id: "transfer", label: "Transfer PF", icon: "🔁", desc: "Consolidate old PF to current employer" },
  { id: "withdraw", label: "Withdraw PF", icon: "💰", desc: "Partial or full withdrawal guidance" },
  { id: "kyc", label: "Fix KYC Issues", icon: "🛡️", desc: "Resolve Aadhaar seeding, DOB mismatch" },
  { id: "nominee", label: "Add Nominee", icon: "👤", desc: "Declare nominee on EPFO portal" },
];

const STEPS = {
  transfer: [
    "Log in to EPFO Member Portal (unifiedportal-mem.epfindia.gov.in)",
    "Go to Online Services → One Member One EPF Account (Transfer Request)",
    "Select the account to transfer from the list",
    "Verify with Aadhaar OTP",
    "Submit — employer approval required within 10 days",
  ],
  withdraw: [
    "Ensure your KYC (Aadhaar + PAN + Bank) is linked to UAN",
    "Log in to EPFO Member Portal",
    "Go to Online Services → Claim (Form 31, 19, 10C & 10D)",
    "Select claim type: Full Withdrawal (19) or Advance (31)",
    "Verify with Aadhaar OTP and submit",
    "Amount credited to linked bank account in 3–5 working days",
  ],
  kyc: [
    "Log in to EPFO Member Portal",
    "Go to Manage → KYC",
    "Add Aadhaar number and link with Aadhaar OTP",
    "Add PAN and bank account details",
    "Submit for employer verification",
    "KYC approval usually takes 2–3 working days",
  ],
  nominee: [
    "Log in to EPFO Member Portal",
    "Go to Manage → E-Nomination",
    "Enter nominee details (name, relation, share %)",
    "Upload nominee's Aadhaar card",
    "Submit and verify with Aadhaar OTP",
  ],
};

const Actions = ({ onNav }) => {
  const [selected, setSelected] = useState(null);
  const [account, setAccount] = useState(SAMPLE_ACCOUNTS[0].uan);

  return (
    <AppShell active="actions" onNav={onNav}>
      <PageHeader title="PF Actions" subtitle="Step-by-step guidance to manage your PF" />

      <div style={{ padding: 36 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 28, maxWidth: 960 }}>
          {/* Left: action selector */}
          <div>
            {/* Account picker */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.navy,
                  textTransform: "uppercase",
                  letterSpacing: ".7px",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Select Account
              </label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: `2px solid ${C.gray200}`,
                  borderRadius: 10,
                  fontSize: 14,
                  color: C.navy,
                  background: C.gray100,
                  fontFamily: "var(--fb)",
                  cursor: "pointer",
                }}
              >
                {SAMPLE_ACCOUNTS.map((a) => (
                  <option key={a.uan} value={a.uan}>
                    {a.employer}
                  </option>
                ))}
              </select>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ACTION_TYPES.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setSelected(action.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: `1.5px solid ${selected === action.id ? C.gold : C.gray200}`,
                    background: selected === action.id ? C.goldDim : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{action.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{action.label}</div>
                    <div style={{ fontSize: 12, color: C.gray600, marginTop: 2 }}>{action.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: step guide */}
          <div
            style={{
              padding: 24,
              borderRadius: 16,
              background: "#fff",
              border: `1.5px solid ${C.gray200}`,
              boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
              minHeight: 300,
            }}
          >
            {selected ? (
              <>
                <h3 style={{ fontFamily: "var(--fh)", fontSize: 17, fontWeight: 600, color: C.navy, marginBottom: 20 }}>
                  {ACTION_TYPES.find((a) => a.id === selected)?.label} — Step by Step
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                  {STEPS[selected].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: C.goldDim,
                          border: `2px solid ${C.gold}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.navy,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6, paddingTop: 4 }}>{step}</span>
                    </div>
                  ))}
                </div>
                <GoldBtn
                  onClick={() => window.open("https://unifiedportal-mem.epfindia.gov.in", "_blank")}
                >
                  Open EPFO Portal ↗
                </GoldBtn>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 260,
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 36 }}>👈</div>
                <div style={{ fontSize: 14, color: C.gray600 }}>Select an action to see step-by-step guidance</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Actions;
