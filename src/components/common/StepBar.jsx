import C from "../../constants/colors";

// Step progress indicator shown during onboarding (Consent → Verify → Discover)
// current: active step number (1-based)
// labels: array of step label strings
const StepBar = ({ current, labels }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
    {labels.map((label, i) => {
      const step = i + 1;
      const done = step < current;
      const active = step === current;

      return (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          {/* Step circle + label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: done ? C.green : active ? C.gold : C.gray200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: done || active ? "#fff" : C.gray400,
              }}
            >
              {done ? "✓" : step}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                color: active ? C.navy : done ? C.green : C.gray400,
              }}
            >
              {label}
            </span>
          </div>

          {/* Connector line between steps */}
          {i < labels.length - 1 && (
            <div
              style={{
                width: 48,
                height: 2,
                background: done ? C.green : C.gray200,
                margin: "0 16px",
                borderRadius: 1,
              }}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepBar;
