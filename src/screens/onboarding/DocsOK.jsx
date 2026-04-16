import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";
import { GoldBtn } from "../../components/common/Buttons";
import { CheckIcon, AadhaarIcon, PANIcon, ArrowR } from "../../components/icons";

// SCR-03D: Identity Verified — Both Aadhaar and PAN confirmed
// Shown after both verifications pass — user proceeds to PF discovery
const DocsOK = ({ go }) => {
  const verified = [
    {
      icon: <AadhaarIcon />,
      label: "Aadhaar",
      detail: "XXXX XXXX 8721",
      bg: C.orangeBg,
      border: "rgba(212,116,12,0.2)",
    },
    {
      icon: <PANIcon />,
      label: "PAN Card",
      detail: "ABCDE•••••",
      bg: C.blueBg,
      border: "rgba(37,99,235,0.2)",
    },
  ];

  return (
    <CenterCol maxW={500}>
      <StepBar current={2} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Success icon */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ margin: "0 auto 20px", width: "fit-content" }}>
          <CheckIcon s={72} />
        </div>
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 28, fontWeight: 600, color: C.navy, marginBottom: 8 }}>
          Identity Verified!
        </h2>
        <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.6 }}>
          Both your Aadhaar and PAN have been successfully verified.
          You're now ready to discover your PF accounts.
        </p>
      </div>

      {/* Verified items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {verified.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 18px",
              borderRadius: 12,
              background: item.bg,
              border: `1.5px solid ${item.border}`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{item.label}</div>
              <div style={{ fontSize: 12, color: C.gray600, marginTop: 2 }}>{item.detail}</div>
            </div>
            {/* Green check badge */}
            <CheckIcon s={28} />
          </div>
        ))}
      </div>

      <GoldBtn onClick={() => go("fetching")}>
        Discover My PF Accounts <ArrowR />
      </GoldBtn>
    </CenterCol>
  );
};

export default DocsOK;
