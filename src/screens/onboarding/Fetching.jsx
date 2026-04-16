import { useEffect, useState } from "react";
import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";

// SCR-04: Fetching PF Data
// Auto-advance loading screen shown while EPFO API call is in progress
const STEPS = [
  "Connecting to EPFO servers...",
  "Matching UAN with your Aadhaar & PAN...",
  "Fetching linked PF accounts...",
  "Retrieving balance & employment history...",
  "Running KYC health check...",
  "Preparing your report...",
];

const Fetching = ({ go }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Advance through steps every 800ms, then navigate to discovery
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => go("discovery"), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [go]);

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <CenterCol maxW={480}>
      <StepBar current={3} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Animated spinner */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `4px solid ${C.goldDim}`,
            borderTop: `4px solid ${C.gold}`,
            margin: "0 auto 24px",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <h2 style={{ fontFamily: "var(--fh)", fontSize: 26, fontWeight: 600, color: C.navy, marginBottom: 8 }}>
          Fetching Your PF Data
        </h2>
        <p style={{ fontSize: 14, color: C.gray600 }}>
          Please wait — this usually takes under 30 seconds.
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            height: 8,
            borderRadius: 8,
            background: C.gray200,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg,${C.gold},${C.goldLight})`,
              borderRadius: 8,
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: C.gray400 }}>{progress}%</div>
      </div>

      {/* Step list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {STEPS.map((text, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: i <= step ? 1 : 0.3,
              transition: "opacity 0.4s",
            }}
          >
            {/* Step indicator dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background:
                  i < step ? C.green : i === step ? C.gold : C.gray200,
                flexShrink: 0,
                transition: "background 0.3s",
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: i < step ? C.green : i === step ? C.navy : C.gray400,
                fontWeight: i === step ? 600 : 400,
                transition: "color 0.3s",
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </CenterCol>
  );
};

export default Fetching;
