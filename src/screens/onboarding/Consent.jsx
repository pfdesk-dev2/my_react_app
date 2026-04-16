import { useState } from "react";
import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";
import { GoldBtn } from "../../components/common/Buttons";
import { ShieldIcon, ArrowR } from "../../components/icons";

// SCR-02A: Data Consent Collection
// User must agree to all 3 consent items before proceeding
// This is a DPDP Act 2023 compliance requirement
const Consent = ({ go }) => {
  const [checked, setChecked] = useState([false, false, false]);

  const consentItems = [
    "I authorize PFDesk to verify my Aadhaar and PAN for discovering my PF accounts.",
    "I consent to fetching my employment history and PF balance data from EPFO through verified APIs.",
    "I understand my data will be encrypted, not shared with third parties, and handled per DPDP Act 2023.",
  ];

  // Toggle a single consent item
  const toggle = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const allChecked = checked.every(Boolean);

  return (
    <CenterCol maxW={560} back="Back" onBack={() => go("login_otp")}>
      <StepBar current={1} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: C.goldDim,
            border: "1px solid rgba(201,168,76,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldIcon s={26} />
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: 28, fontWeight: 600, color: C.navy }}>
            Your Data, Your Control
          </h2>
          <p style={{ fontSize: 13, color: C.gray600, marginTop: 2 }}>
            We need your permission before accessing any information.
          </p>
        </div>
      </div>

      {/* Consent checkboxes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
        {consentItems.map((text, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              padding: "16px 18px",
              borderRadius: 12,
              cursor: "pointer",
              background: checked[i] ? C.greenBg : C.gray100,
              border: `1.5px solid ${checked[i] ? C.green : "transparent"}`,
              transition: "all 0.2s",
            }}
          >
            {/* Checkbox box */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                flexShrink: 0,
                marginTop: 1,
                border: `2px solid ${checked[i] ? C.green : C.gray200}`,
                background: checked[i] ? C.green : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {checked[i] && (
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6L5 8.5L9.5 3.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 14, color: C.navy, lineHeight: 1.6 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTA — disabled until all 3 are checked */}
      <GoldBtn onClick={() => go("aadhaar_verify")} disabled={!allChecked}>
        I Agree &amp; Continue <ArrowR />
      </GoldBtn>
    </CenterCol>
  );
};

export default Consent;
