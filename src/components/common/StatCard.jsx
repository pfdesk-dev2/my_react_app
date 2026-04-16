import C from "../../constants/colors";

// Stat summary card used in dashboard and calculator
// label: small grey label above the value
// value: large bold number/text
// sub: optional small text below the value
// color: value text color (defaults to navy)
const StatCard = ({ label, value, sub, color = C.navy }) => (
  <div
    style={{
      padding: "20px 24px",
      borderRadius: 14,
      background: "#fff",
      border: `1px solid ${C.gray200}`,
      flex: 1,
    }}
  >
    <div style={{ fontSize: 12, color: C.gray400, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: "var(--fb)" }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: C.gray400, marginTop: 4 }}>{sub}</div>}
  </div>
);

export default StatCard;
