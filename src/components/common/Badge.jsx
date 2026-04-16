// Small colored pill badge — used for status labels (Active, Inactive, Critical, etc.)
// text: label text
// color: text color
// bg: background color
const Badge = ({ text, color, bg }) => (
  <span
    style={{
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      background: bg,
      color,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

export default Badge;
