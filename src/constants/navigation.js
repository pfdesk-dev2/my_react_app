// All screen IDs used for navigation
export const SCREENS = {
  WELCOME: "welcome",
  LOGIN: "login",
  LOGIN_OTP: "login_otp",
  CONSENT: "consent",
  AADHAAR_VERIFY: "aadhaar_verify",
  AADHAAR_OTP: "aadhaar_otp",
  PAN_VERIFY: "pan_verify",
  DOCS_OK: "docs_ok",
  FETCHING: "fetching",
  DISCOVERY: "discovery",
  DASHBOARD: "dashboard",
  HEALTH: "health",
  CALCULATOR: "calculator",
  ACTIONS: "actions",
  TRACKER: "tracker",
  ADVISOR: "advisor",
  SETTINGS: "settings",
};

// Labels shown in the dev navigation bar
export const ALL_LABELS = {
  welcome: "Welcome",
  login: "Login",
  login_otp: "OTP",
  consent: "Consent",
  aadhaar_verify: "Aadhaar",
  aadhaar_otp: "Aadhaar OTP",
  pan_verify: "PAN Verify",
  docs_ok: "Verified",
  fetching: "Fetching",
  discovery: "Discovery",
  dashboard: "Dashboard",
  health: "Health Check",
  calculator: "Calculator",
  actions: "Actions",
  tracker: "Tracker",
  advisor: "AI Advisor",
  settings: "Settings",
};

// Sidebar menu items for the main app shell
export const SIDEBAR_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1",
  },
  {
    id: "health",
    label: "Health Check",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "calculator",
    label: "Calculator",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    id: "actions",
    label: "Transfer & Actions",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: "tracker",
    label: "Resolution Tracker",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    id: "advisor",
    label: "AI Advisor",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];
