import C from "../../constants/colors";
import { LockIcon } from "../icons";

// Top navigation bar — shown on all onboarding screens
// onNav prop: optional — clicking logo navigates to welcome screen
const Navbar = ({ onNav }) => (
  <nav
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 32px",
      background: "#fff",
      borderBottom: `1px solid ${C.gray200}`,
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}
  >
    {/* Logo */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: onNav ? "pointer" : undefined,
      }}
      onClick={() => onNav?.("welcome")}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        ₹
      </div>
      <span style={{ fontFamily: "var(--fh)", fontSize: 22, fontWeight: 700, color: C.navy }}>
        PF
      </span>
      <span style={{ fontFamily: "var(--fh)", fontSize: 22, fontWeight: 700, color: C.gold }}>
        Desk
      </span>
    </div>

    {/* Security badge */}
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.gray400 }}>
      <LockIcon />
      Secured &amp; Encrypted
    </div>
  </nav>
);

export default Navbar;
