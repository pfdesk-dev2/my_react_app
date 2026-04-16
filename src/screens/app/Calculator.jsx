import { useState } from "react";
import C from "../../constants/colors";
import { AppShell, PageHeader } from "../../components/common/Layouts";
import { GoldBtn } from "../../components/common/Buttons";

// SCR-08: PF Calculator — Estimate maturity amount
const Calculator = ({ onNav }) => {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("8.25");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const s = parseFloat(salary) || 0;
    const y = parseFloat(years) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = y * 12;

    // Monthly PF contribution = 12% of basic salary (employee) + 12% employer
    const monthly = s * 0.24;

    // Future value of monthly contributions: FV = P × [(1+r)^n - 1] / r
    const fv = r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;

    setResult({
      monthly: Math.round(monthly),
      total: Math.round(fv),
      contributed: Math.round(monthly * n),
      interest: Math.round(fv - monthly * n),
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: `2px solid ${C.gray200}`,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 500,
    color: C.navy,
    background: C.gray100,
    fontFamily: "var(--fb)",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: C.navy,
    textTransform: "uppercase",
    letterSpacing: ".7px",
    display: "block",
    marginBottom: 6,
  };

  return (
    <AppShell active="calculator" onNav={onNav}>
      <PageHeader title="PF Calculator" subtitle="Estimate how much your PF will grow" />

      <div style={{ padding: 36 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            maxWidth: 900,
          }}
        >
          {/* Input panel */}
          <div
            style={{
              padding: 28,
              borderRadius: 16,
              background: "#fff",
              border: `1.5px solid ${C.gray200}`,
              boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
            }}
          >
            <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 24 }}>
              Enter Your Details
            </h3>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Basic Monthly Salary (₹)</label>
              <input
                style={inputStyle}
                type="number"
                placeholder="e.g. 50000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Years of Service</label>
              <input
                style={inputStyle}
                type="number"
                placeholder="e.g. 10"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Interest Rate (% per year)</label>
              <input
                style={inputStyle}
                type="number"
                step="0.01"
                placeholder="8.25"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              <p style={{ fontSize: 12, color: C.gray400, marginTop: 4 }}>
                Current EPF rate: 8.25% (FY 2023-24)
              </p>
            </div>

            <GoldBtn onClick={calculate} disabled={!salary || !years}>
              Calculate
            </GoldBtn>
          </div>

          {/* Result panel */}
          <div>
            {result ? (
              <div
                style={{
                  padding: 28,
                  borderRadius: 16,
                  background: "#fff",
                  border: `1.5px solid ${C.gray200}`,
                  boxShadow: "0 2px 8px rgba(10,22,40,0.04)",
                }}
              >
                <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 24 }}>
                  Estimated Maturity Value
                </h3>

                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 0",
                    marginBottom: 24,
                    borderRadius: 12,
                    background: C.goldDim,
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <div style={{ fontSize: 13, color: C.gray600, marginBottom: 6 }}>Total Corpus</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: C.navy }}>
                    ₹{result.total.toLocaleString("en-IN")}
                  </div>
                </div>

                {[
                  { label: "Monthly Contribution", value: result.monthly, color: C.blue },
                  { label: "Total Contributed", value: result.contributed, color: C.navy },
                  { label: "Interest Earned", value: result.interest, color: C.green },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: i < 2 ? `1px solid ${C.gray200}` : "none",
                    }}
                  >
                    <span style={{ fontSize: 14, color: C.gray600 }}>{row.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: row.color }}>
                      ₹{row.value.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: 28,
                  borderRadius: 16,
                  background: C.gray100,
                  border: `1.5px dashed ${C.gray200}`,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 300,
                }}
              >
                <div>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                  <div style={{ fontSize: 14, color: C.gray600 }}>
                    Enter your details to see the projection
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Calculator;
