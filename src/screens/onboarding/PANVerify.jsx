import { useState, useRef, useEffect } from "react";
import C from "../../constants/colors";
import { CenterCol } from "../../components/common/Layouts";
import StepBar from "../../components/common/StepBar";
import { GreenBtn } from "../../components/common/Buttons";
import { PANIcon, ArrowR, ShieldIcon } from "../../components/icons";

// SCR-03C: PAN Card Verification
// User enters their 10-character PAN number — verified via direct PAN API
const PANVerify = ({ go }) => {
  const [pan, setPan] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // PAN format: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
  const handleChange = (e) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setPan(raw);
  };

  // Validate PAN format: AAAAA9999A
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const isValid = panRegex.test(pan);

  const handleVerify = () => {
    setLoading(true);
    // Simulate API call — replace with actual PAN verification API
    setTimeout(() => {
      setLoading(false);
      go("docs_ok");
    }, 1500);
  };

  // Show inline format hint based on what user has typed
  const getHintColor = () => {
    if (pan.length === 0) return C.gray400;
    if (pan.length < 10) return C.orange;
    return isValid ? C.green : C.red;
  };

  const getHintText = () => {
    if (pan.length === 0) return "Format: ABCDE1234F (5 letters · 4 digits · 1 letter)";
    if (pan.length < 10) return `${10 - pan.length} more character${10 - pan.length > 1 ? "s" : ""} needed`;
    return isValid ? "Valid PAN format" : "Invalid PAN format — please check";
  };

  return (
    <CenterCol maxW={520} back="Back" onBack={() => go("aadhaar_otp")}>
      <StepBar current={2} labels={["Consent", "Verify Identity", "PF Discovery"]} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: C.blueBg,
            border: "1px solid rgba(37,99,235,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PANIcon />
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: 26, fontWeight: 600, color: C.navy }}>
            Verify Your PAN Card
          </h2>
          <p style={{ fontSize: 13, color: C.gray600, marginTop: 2 }}>
            Required to discover PF accounts linked to your PAN.
          </p>
        </div>
      </div>

      {/* PAN input */}
      <div style={{ marginBottom: 8 }}>
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
          PAN Number
        </label>
        <input
          ref={inputRef}
          type="text"
          value={pan}
          onChange={handleChange}
          placeholder="ABCDE1234F"
          style={{
            width: "100%",
            padding: "14px 18px",
            border: `2px solid ${
              pan.length === 0 ? C.gray200
              : isValid ? C.green
              : pan.length < 10 ? C.blue
              : C.red
            }`,
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 600,
            color: C.navy,
            background: pan.length === 0 ? C.gray100 : isValid ? C.greenBg : C.blueBg,
            fontFamily: "var(--fb)",
            letterSpacing: "4px",
            transition: "all 0.2s",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Format hint */}
      <p style={{ fontSize: 12, color: getHintColor(), marginBottom: 24, transition: "color 0.2s" }}>
        {getHintText()}
      </p>

      {/* Privacy note */}
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
          PAN verification uses the official IT Department API. Your PAN is used
          only for KYC matching with EPFO and is not stored.
        </div>
      </div>

      <GreenBtn onClick={handleVerify} disabled={!isValid} loading={loading}>
        Verify PAN <ArrowR />
      </GreenBtn>
    </CenterCol>
  );
};

export default PANVerify;
