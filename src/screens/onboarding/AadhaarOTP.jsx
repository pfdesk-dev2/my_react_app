import { useState, useEffect, useRef } from "react";
import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";
import { GreenBtn } from "../../components/common/Buttons";
import { AadhaarIcon, ArrowR } from "../../components/icons";

// SCR-03B: Aadhaar OTP Verification
// User enters the 6-digit OTP sent to their Aadhaar-linked mobile number
const AadhaarOTP = ({ go }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  // Refs for each OTP digit box
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    refs[0].current?.focus();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Move to next box after digit entered
  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) refs[index + 1].current?.focus();
  };

  // Move back on backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== "");

  const handleVerify = () => {
    setLoading(true);
    // Simulate API call — replace with actual Aadhaar OTP verify API
    setTimeout(() => {
      setLoading(false);
      go("pan_verify");
    }, 1500);
  };

  return (
    <CenterCol maxW={480} back="Back" onBack={() => go("aadhaar_verify")}>
      <StepBar current={2} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: C.orangeBg,
            border: "1px solid rgba(212,116,12,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AadhaarIcon />
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: 26, fontWeight: 600, color: C.navy }}>
            Enter Aadhaar OTP
          </h2>
        </div>
      </div>

      <p style={{ fontSize: 14, color: C.gray600, marginBottom: 36 }}>
        A 6-digit OTP has been sent to the mobile number registered with your Aadhaar.
      </p>

      {/* OTP Boxes */}
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
              border: `2px solid ${digit ? C.orange : C.gray200}`,
              borderRadius: 12,
              background: digit ? C.orangeBg : C.gray100,
              fontFamily: "var(--fb)",
              transition: "all 0.15s",
            }}
          />
        ))}
      </div>

      {/* Resend timer */}
      <div style={{ marginBottom: 32 }}>
        {timer > 0 ? (
          <span style={{ fontSize: 14, color: C.gray400 }}>
            Resend OTP in <b style={{ color: C.navy }}>{timer}s</b>
          </span>
        ) : (
          <button
            onClick={() => setTimer(30)}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: C.orange,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--fb)",
            }}
          >
            Resend OTP
          </button>
        )}
      </div>

      <GreenBtn onClick={handleVerify} disabled={!isComplete} loading={loading}>
        Verify Aadhaar OTP <ArrowR />
      </GreenBtn>
    </CenterCol>
  );
};

export default AadhaarOTP;
