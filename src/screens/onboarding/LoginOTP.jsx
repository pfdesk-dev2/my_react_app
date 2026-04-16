import { useState, useEffect, useRef } from "react";
import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import { GoldBtn } from "../../components/common/Buttons";
import { ArrowR } from "../../components/icons";

// SCR-01C: OTP Verification (Login)
// User enters the 6-digit OTP sent to their mobile number
const LoginOTP = ({ go }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // Create refs for each OTP input box
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Auto-focus first box on mount
    refs[0].current?.focus();

    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle digit input — auto advance to next box
  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) refs[index + 1].current?.focus();
  };

  // Handle backspace — move to previous box
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <CenterCol maxW={440} back="Back to login" onBack={() => go("login")}>
      <h2 style={{ fontFamily: "var(--fh)", fontSize: 30, fontWeight: 600, color: C.navy, marginBottom: 8 }}>
        Verify OTP
      </h2>
      <p style={{ fontSize: 14, color: C.gray600, marginBottom: 40 }}>
        Enter the 6-digit code sent to <b style={{ color: C.navy }}>+91 98XXX XXXXX</b>
      </p>

      {/* 6-digit OTP input boxes */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={{
              width: 56,
              height: 64,
              textAlign: "center",
              fontSize: 24,
              fontWeight: 700,
              color: C.navy,
              border: `2px solid ${digit ? C.gold : C.gray200}`,
              borderRadius: 12,
              background: digit ? C.goldDim : C.gray100,
              fontFamily: "var(--fb)",
            }}
          />
        ))}
      </div>

      {/* Resend timer / Resend link */}
      <div style={{ marginBottom: 32 }}>
        {timer > 0 ? (
          <span style={{ fontSize: 14, color: C.gray400 }}>
            Resend in <b style={{ color: C.navy }}>{timer}s</b>
          </span>
        ) : (
          <button
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: C.gold,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Resend OTP
          </button>
        )}
      </div>

      <GoldBtn onClick={() => go("consent")} disabled={!isComplete}>
        Verify &amp; Continue <ArrowR />
      </GoldBtn>
    </CenterCol>
  );
};

export default LoginOTP;
