import { useState, useRef, useEffect } from "react";
import C from "../../constants/colors";
import { TwoCol } from "../../components/common/Layouts";
import { GoldBtn } from "../../components/common/Buttons";
import { ShieldIcon, LockIcon, ArrowR } from "../../components/icons";

// SCR-01B: Login (Mobile Number Entry)
// User enters their 10-digit Indian mobile number to receive an OTP
const Login = ({ go }) => {
  const [phone, setPhone] = useState("");
  const inputRef = useRef();

  // Auto-focus the input on screen load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Only allow numeric input
  const handleChange = (e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
  };

  const leftPanel = (
    <div style={{ maxWidth: 400 }}>
      <h2
        style={{
          fontFamily: "var(--fh)",
          fontSize: 36,
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.2,
          marginBottom: 16,
        }}
      >
        Your PF journey<br />starts here.
      </h2>
      <p style={{ fontSize: 15, color: C.gray400, lineHeight: 1.7, marginBottom: 32 }}>
        Enter your mobile number and we'll send you a one-time password.
        No account creation needed.
      </p>
      {["✓  No passwords to remember", "✓  OTP-based secure login", "✓  Works with any Indian mobile number"].map(
        (text, i) => (
          <div key={i} style={{ fontSize: 14, color: C.goldLight, marginBottom: 12 }}>
            {text}
          </div>
        )
      )}
    </div>
  );

  const rightPanel = (
    <div style={{ maxWidth: 400 }}>
      <h2
        style={{
          fontFamily: "var(--fh)",
          fontSize: 28,
          fontWeight: 600,
          color: C.navy,
          marginBottom: 8,
        }}
      >
        Welcome to <span style={{ color: C.gold }}>PFDesk</span>
      </h2>
      <p style={{ fontSize: 14, color: C.gray600, marginBottom: 32 }}>
        Enter your mobile number to get started.
      </p>

      {/* Mobile number input */}
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: C.navy,
          textTransform: "uppercase",
          letterSpacing: ".8px",
          display: "block",
          marginBottom: 8,
        }}
      >
        Mobile Number
      </label>
      <div
        style={{
          display: "flex",
          border: `2px solid ${phone.length > 0 ? C.gold : C.gray200}`,
          borderRadius: 12,
          overflow: "hidden",
          background: C.gray100,
          marginBottom: 28,
          transition: "border-color 0.2s",
        }}
      >
        {/* Country code prefix */}
        <div
          style={{
            padding: "14px 16px",
            borderRight: `1px solid ${C.gray200}`,
            fontSize: 14,
            fontWeight: 600,
            color: C.navy,
          }}
        >
          🇮🇳 +91
        </div>
        <input
          ref={inputRef}
          type="tel"
          maxLength={10}
          value={phone}
          onChange={handleChange}
          placeholder="Enter 10-digit number"
          style={{
            flex: 1,
            padding: "14px 16px",
            border: "none",
            background: "transparent",
            fontSize: 16,
            fontWeight: 500,
            color: C.navy,
            fontFamily: "var(--fb)",
            letterSpacing: "1.5px",
          }}
        />
      </div>

      {/* Send OTP button — enabled only when 10 digits entered */}
      <GoldBtn onClick={() => go("login_otp")} disabled={phone.length !== 10}>
        Send OTP <ArrowR />
      </GoldBtn>

      {/* Trust card */}
      <div
        style={{
          marginTop: 36,
          padding: 20,
          borderRadius: 14,
          background: C.goldDim,
          border: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <ShieldIcon />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
              100% Safe &amp; Secure
            </div>
            <div style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6 }}>
              We never store your PF credentials. All data is fetched with your consent and
              encrypted end-to-end.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <TwoCol left={leftPanel} right={rightPanel} />;
};

export default Login;
