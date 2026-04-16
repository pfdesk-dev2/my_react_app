import C from "../../constants/colors";
import { TwoCol } from "../../components/common/Layouts";
import { GoldBtn } from "../../components/common/Buttons";
import { ShieldIcon, LockIcon, ArrowR } from "../../components/icons";

// SCR-01A: Welcome / Splash Screen
// First screen the user sees — introduces PFDesk and its value proposition
const Welcome = ({ go }) => {
  const features = [
    {
      icon: "🔍",
      title: "Discover All PF Accounts",
      desc: "Find every PF account linked to your PAN — even ones you forgot.",
    },
    {
      icon: "📊",
      title: "AI-Powered Health Check",
      desc: "Detect KYC issues, DOB mismatches, missing exit dates automatically.",
    },
    {
      icon: "💰",
      title: "Transfer & Withdraw",
      desc: "Get step-by-step guidance to claim your money from old accounts.",
    },
  ];

  const stats = [
    { n: "₹58,000 Cr+", l: "Unclaimed PF in India" },
    { n: "28 Crore+", l: "UAN accounts registered" },
    { n: "60 Seconds", l: "To discover accounts" },
  ];

  const leftPanel = (
    <div style={{ maxWidth: 520 }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
          }}
        >
          ₹
        </div>
        <div>
          <span style={{ fontFamily: "var(--fh)", fontSize: 32, fontWeight: 700, color: "#fff" }}>PF</span>
          <span style={{ fontFamily: "var(--fh)", fontSize: 32, fontWeight: 700, color: C.gold }}>Desk</span>
        </div>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "var(--fh)",
          fontSize: 44,
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.15,
          marginBottom: 16,
        }}
      >
        Lost PF?<br />
        <span style={{ color: C.gold }}>We find it.</span>
      </h1>

      <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
        Discover all your Provident Fund accounts in one place. Check balances, fix issues,
        and claim your money — in minutes, not months.
      </p>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 32 }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 4 }}>{s.n}</div>
            <div style={{ fontSize: 12, color: C.gray400 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const rightPanel = (
    <div>
      <h2 style={{ fontFamily: "var(--fh)", fontSize: 28, fontWeight: 600, color: C.navy, marginBottom: 8 }}>
        Get started in 3 steps
      </h2>
      <p style={{ fontSize: 14, color: C.gray600, marginBottom: 32 }}>
        No signup forms. No passwords. Just your phone number.
      </p>

      {/* Feature list */}
      {features.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: C.goldDim,
              border: "1px solid rgba(201,168,76,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            {f.icon}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: C.gray600, lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        </div>
      ))}

      {/* CTA */}
      <GoldBtn onClick={() => go("login")}>
        Get Started — It's Free <ArrowR />
      </GoldBtn>

      {/* Security note */}
      <p style={{ marginTop: 16, fontSize: 12, color: C.gray400, display: "flex", alignItems: "center", gap: 6 }}>
        <LockIcon /> Your data is encrypted &amp; never shared
      </p>
    </div>
  );

  return <TwoCol left={leftPanel} right={rightPanel} />;
};

export default Welcome;
