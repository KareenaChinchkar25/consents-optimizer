import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --------------------------------------------------------------
// ERROR HANDLER
// --------------------------------------------------------------
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === "ECONNREFUSED") {
      throw new Error("⚠ Node backend offline. Start server!");
    }
    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw err;
  }
);

// --------------------------------------------------------------
// SAFE PARSER
// --------------------------------------------------------------
function safeParseList(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try {
    return JSON.parse(val.replace(/'/g, '"'));
  } catch {
    return [];
  }
}


function normalizeConsent(doc) {
  // doc may come from Mongo (has _id) or older sources (consentId/id)
  const _id = doc._id || doc.id || doc.consentId || null;
  const consentId = doc.consentId || _id;

  return {
    // keep original backend id too (useful for debugging/upstream)
    _id,
    consentId,

    website: doc.website || "",
    platform: doc.platform || "",
    permission: doc.permission || "",
    category: doc.category || "",
    purpose: doc.purpose || "",
    status: doc.status || "Granted",
    retention_months: Number(doc.retention_months || 0),
    grantedOn: doc.grantedOn,

    dataFlow: safeParseList(doc.dataFlow),

    risk_score: Number(doc.risk_score || 0),
    risk_category: doc.risk_category || "Unknown",
  };
}


// --------------------------------------------------------------
// CONSENT SERVICE (New DB-backed routes)
// --------------------------------------------------------------
export const consentService = {
  // GET from Node → MongoDB
  async getConsents() {
    const res = await api.get("/consents");
    return res.data.map(normalizeConsent);
  },

  // POST from extension → Node → FastAPI → Mongo → dashboard
  async addConsent(consent) {
    const res = await api.post("/consents", consent);
    return res.data;
  },

  // Update status from dashboard

 updateConsentStatus: ({ website, permission, status }) =>
  api.patch("/consents/status", {
    website,
    permission,
    status,
  }),
};

export default consentService;
