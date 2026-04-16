import { useState } from "react";
import { ALL_LABELS } from "./constants/navigation";
import C from "./constants/colors";

// Onboarding screens
import Welcome from "./screens/onboarding/Welcome";
import Login from "./screens/onboarding/Login";
import LoginOTP from "./screens/onboarding/LoginOTP";
import Consent from "./screens/onboarding/Consent";
import AadhaarVerify from "./screens/onboarding/AadhaarVerify";
import AadhaarOTP from "./screens/onboarding/AadhaarOTP";
import PANVerify from "./screens/onboarding/PANVerify";
import DocsOK from "./screens/onboarding/DocsOK";
import Fetching from "./screens/onboarding/Fetching";
import Discovery from "./screens/onboarding/Discovery";

// App screens
import Dashboard from "./screens/app/Dashboard";
import Health from "./screens/app/Health";
import Calculator from "./screens/app/Calculator";
import Actions from "./screens/app/Actions";
import Tracker from "./screens/app/Tracker";
import Advisor from "./screens/app/Advisor";
import Settings from "./screens/app/Settings";

// ─────────────────────────────────────────────────────
// App — top-level screen router using a simple screen ID string
// All navigation is done via go(screenId) or onNav(screenId)
// ─────────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = useState("welcome");

  // go() is used for sequential onboarding navigation
  // onNav() is used for sidebar navigation in the main app
  const go = (id) => setScreen(id);
  const onNav = (id) => setScreen(id);

  const renderScreen = () => {
    switch (screen) {
      // ── Onboarding flow ──────────────────────────────
      case "welcome":       return <Welcome go={go} />;
      case "login":         return <Login go={go} />;
      case "login_otp":     return <LoginOTP go={go} />;
      case "consent":       return <Consent go={go} />;
      case "aadhaar_verify":return <AadhaarVerify go={go} />;
      case "aadhaar_otp":   return <AadhaarOTP go={go} />;
      case "pan_verify":    return <PANVerify go={go} />;
      case "docs_ok":       return <DocsOK go={go} />;
      case "fetching":      return <Fetching go={go} />;
      case "discovery":     return <Discovery go={go} />;

      // ── Main app ─────────────────────────────────────
      case "dashboard":     return <Dashboard go={go} onNav={onNav} />;
      case "health":        return <Health go={go} onNav={onNav} />;
      case "calculator":    return <Calculator go={go} onNav={onNav} />;
      case "actions":       return <Actions go={go} onNav={onNav} />;
      case "tracker":       return <Tracker go={go} onNav={onNav} />;
      case "advisor":       return <Advisor go={go} onNav={onNav} />;
      case "settings":      return <Settings go={go} onNav={onNav} />;

      default:              return <Welcome go={go} />;
    }
  };

  return (
    <>
      {renderScreen()}

      {/* ── Dev-only screen switcher (remove before production) ── */}
      {import.meta.env.DEV && (
        <div
          style={{
            position: "fixed",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            padding: "8px 12px",
            borderRadius: 12,
            background: "rgba(10,22,40,0.88)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            maxWidth: "calc(100vw - 24px)",
            justifyContent: "center",
          }}
        >
          {Object.entries(ALL_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setScreen(id)}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                border: "none",
                background: screen === id ? C.gold : "rgba(255,255,255,0.1)",
                color: screen === id ? C.navy : C.gray400,
                fontSize: 11,
                fontWeight: screen === id ? 700 : 400,
                cursor: "pointer",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
