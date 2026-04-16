import { useState, useRef, useEffect } from "react";
import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";
import { GoldBtn } from "../../components/common/Buttons";
import { AadhaarIcon, ArrowR, ShieldIcon } from "../../components/icons";

// SCR-03A: Aadhaar Number Entry
// User enters their 12-digit Aadhaar number to receive an OTP on their Aadhaar-linked mobile
const AadhaarVerify = ({ go }) => {
  const [aadhaar, setAadhaar] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Format Aadhaar as XXXX XXXX XXXX while storing only digits
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(digits);
  };

  // Display value with spaces: 4-4-4
  const displayValue = aadhaar
    .replace(/(\d{4})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" ")
    );

  const isComplete = aadhaar.length === 12;

  return (
    <CenterCol maxW={520} back="Back" onBack={() => go("consent")}>
      <StepBar current={2} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
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
            Verify Your Aadhaar
          </h2>
          <p style={{ fontSize: 13, color: C.gray600, marginTop: 2 }}>
            An OTP will be sent to your Aadhaar-linked mobile number.
          </p>
        </div>
      </div>

      {/* Aadhaar input */}
      <div style={{ marginBottom: 24 }}>
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
          Aadhaar Number
        </label>
        <input
          ref={inputRef}
          type="tel"
          value={displayValue}
          onChange={handleChange}
          placeholder="XXXX XXXX XXXX"
          style={{
            width: "100%",
            padding: "14px 18px",
            border: `2px solid ${aadhaar.length > 0 ? C.orange : C.gray200}`,
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 600,
            color: C.navy,
            background: aadhaar.length > 0 ? C.orangeBg : C.gray100,
            fontFamily: "var(--fb)",
            letterSpacing: "3px",
            transition: "all 0.2s",
            boxSizing: "border-box",
          }}
        />
        <p style={{ fontSize: 12, color: C.gray400, marginTop: 6 }}>
          Your Aadhaar number is 12 digits printed on your Aadhaar card.
        </p>
      </div>

      {/* Security info box */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: C.goldDim,
          border: "1px solid rgba(201,168,76,0.15)",
          marginBottom: 28,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <ShieldIcon s={18} />
        <div style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6 }}>
          Your Aadhaar number is only used to send an OTP via UIDAI's official API.
          We do not store your Aadhaar number on our servers.
        </div>
      </div>

      <GoldBtn onClick={() => go("aadhaar_otp")} disabled={!isComplete}>
        Send OTP to Aadhaar Mobile <ArrowR />
      </GoldBtn>
    </CenterCol>
  );
};

export default AadhaarVerify;
