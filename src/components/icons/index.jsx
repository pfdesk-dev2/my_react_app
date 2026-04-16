import C from "../../constants/colors";

// Green circle with a checkmark inside
export const CheckIcon = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill={C.green} />
    <path
      d="M5.5 9L8 11.5L12.5 6.5"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Shield with checkmark — used for security/trust sections
export const ShieldIcon = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5">
    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Lock icon — used in security footers
export const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

// Right arrow — used in buttons
export const ArrowR = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Left arrow — used in back buttons
export const ArrowL = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Spinning loader — shown during loading states
export const Spinner = ({ c = "#fff" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <circle cx="12" cy="12" r="10" stroke={c + "33"} strokeWidth="3" />
    <path d="M12 2a10 10 0 019.8 8" stroke={c} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Sidebar navigation icon — path changes per item
export const NavIcon = ({ d, active }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? C.gold : C.gray400}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

// Aadhaar card icon — orange gradient square with "आ" text
export const AadhaarIcon = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 10,
      background: "linear-gradient(135deg,#FF6B35,#FF8C42)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15,
      fontWeight: 800,
      color: "#fff",
    }}
  >
    आ
  </div>
);

// PAN card icon — blue gradient square with "PAN" text
export const PANIcon = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 10,
      background: "linear-gradient(135deg,#2E86AB,#45B0D8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15,
      fontWeight: 800,
      color: "#fff",
    }}
  >
    PAN
  </div>
);
