import C from "../../constants/colors";
import { Spinner } from "../icons";

// Gold gradient button — primary action button used throughout the app
export const GoldBtn = ({ children, onClick, disabled, full, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "14px 32px",
      background: disabled
        ? C.gray200
        : `linear-gradient(135deg,${C.gold},#D4B65E)`,
      border: "none",
      borderRadius: 12,
      color: disabled ? C.gray400 : C.navy,
      fontSize: 15,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--fb)",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      boxShadow: disabled ? "none" : "0 4px 20px rgba(201,168,76,0.3)",
      width: full ? "100%" : undefined,
      justifyContent: full ? "center" : undefined,
      transition: "opacity 0.2s",
      ...style,
    }}
  >
    {children}
  </button>
);

// Navy/dark button — secondary action button
export const NavyBtn = ({ children, onClick, disabled, full, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "14px 32px",
      background: disabled ? C.gray200 : C.navy,
      border: "none",
      borderRadius: 12,
      color: disabled ? C.gray400 : "#fff",
      fontSize: 15,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--fb)",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      width: full ? "100%" : undefined,
      justifyContent: full ? "center" : undefined,
      ...style,
    }}
  >
    {children}
  </button>
);

// Green button — used for verification actions (Aadhaar/PAN)
export const GreenBtn = ({ children, onClick, disabled, loading, full }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    style={{
      padding: "14px 32px",
      background: disabled
        ? C.gray200
        : `linear-gradient(135deg,${C.green},#3AA86A)`,
      border: "none",
      borderRadius: 12,
      color: disabled ? C.gray400 : "#fff",
      fontSize: 15,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--fb)",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      boxShadow: disabled ? "none" : "0 4px 20px rgba(45,139,85,0.25)",
      width: full ? "100%" : undefined,
      justifyContent: full ? "center" : undefined,
    }}
  >
    {loading ? <><Spinner /> Verifying...</> : children}
  </button>
);
