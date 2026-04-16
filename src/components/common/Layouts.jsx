import C from "../../constants/colors";
import { ArrowL } from "../icons";
import { NavIcon } from "../icons";
import { SIDEBAR_ITEMS } from "../../constants/navigation";

// ─────────────────────────────────────────────
// TwoCol — split layout used for Welcome and Login screens
// Left: dark navy panel | Right: white form panel
// ─────────────────────────────────────────────
import Navbar from "./Navbar";

export const TwoCol = ({ left, right, ratio = "1.1fr 1fr" }) => (
  <>
    <Navbar />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: ratio,
        minHeight: "calc(100vh - 53px)",
      }}
    >
      {/* Dark navy left panel */}
      <div
        style={{
          background: `linear-gradient(165deg,${C.navy},${C.navyMid})`,
          padding: "60px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {left}
      </div>

      {/* White right panel */}
      <div
        style={{
          background: "#fff",
          padding: "48px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 640,
        }}
      >
        {right}
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────
// CenterCol — centered single-column layout for OTP/consent/verification screens
// ─────────────────────────────────────────────
export const CenterCol = ({ children, maxW = 520, bg = "#fff", back, onBack }) => (
  <>
    <Navbar />
    <div
      style={{
        minHeight: "calc(100vh - 53px)",
        background: bg,
        display: "flex",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: maxW }}>
        {/* Optional back button */}
        {back && (
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: C.gray400,
              marginBottom: 24,
              fontFamily: "var(--fb)",
            }}
          >
            <ArrowL /> {back}
          </button>
        )}
        {children}
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────
// AppShell — main app layout with left sidebar + main content area
// ─────────────────────────────────────────────
export const AppShell = ({ active, onNav, children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    {/* Sidebar */}
    <aside
      style={{
        width: 240,
        background: C.navy,
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 20px",
          marginBottom: 32,
          cursor: "pointer",
        }}
        onClick={() => onNav("welcome")}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ₹
        </div>
        <span style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, color: "#fff" }}>
          PF
        </span>
        <span style={{ fontFamily: "var(--fh)", fontSize: 20, fontWeight: 700, color: C.gold }}>
          Desk
        </span>
      </div>

      {/* Nav items */}
      {SIDEBAR_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onNav(item.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px",
            background: active === item.id ? "rgba(201,168,76,0.12)" : "transparent",
            border: "none",
            borderLeft: active === item.id ? `3px solid ${C.gold}` : "3px solid transparent",
            cursor: "pointer",
            width: "100%",
            fontFamily: "var(--fb)",
            fontSize: 13,
            fontWeight: active === item.id ? 600 : 400,
            color: active === item.id ? C.goldLight : C.gray400,
            textAlign: "left",
          }}
        >
          <NavIcon d={item.icon} active={active === item.id} />
          {item.label}
        </button>
      ))}

      {/* User info at the bottom */}
      <div
        style={{
          marginTop: "auto",
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ fontSize: 12, color: C.gray400 }}>RAHUL KUMAR SHARMA</div>
        <div style={{ fontSize: 11, color: C.gray600, marginTop: 2 }}>UAN: 1012 3456 7890</div>
      </div>
    </aside>

    {/* Main content */}
    <main style={{ flex: 1, background: C.gray50, minHeight: "100vh" }}>{children}</main>
  </div>
);

// ─────────────────────────────────────────────
// PageHeader — top bar used inside AppShell pages
// ─────────────────────────────────────────────
export const PageHeader = ({ title, subtitle, actions }) => (
  <div
    style={{
      background: "#fff",
      borderBottom: `1px solid ${C.gray200}`,
      padding: "24px 36px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <h1 style={{ fontFamily: "var(--fh)", fontSize: 28, fontWeight: 600, color: C.navy }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>{subtitle}</p>
      )}
    </div>
    {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
  </div>
);
