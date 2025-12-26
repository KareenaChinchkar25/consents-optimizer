
function extractDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return "unknown.com"
  }
}

function generateStableConsentId(domain, permission) {
  return `${domain}::${permission}`
}

function notifyTab(tabId, payload) {
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, {
    type: "SHOW_PERMISSION_NOTIFICATION",
    payload
  });
}


function convertToMLFormat(raw) {
  const domain = raw.domain || extractDomain(raw.url)
  const permission = raw.permission_type || raw.permission || "unknown"

  return {
    consentId: generateStableConsentId(domain, permission),
    website: domain,
    fullUrl: raw.url || null,

    platform:
      raw.platform ||
      (navigator.userAgent.includes("Android")
        ? "Android"
        : navigator.userAgent.includes("iPhone")
        ? "iOS"
        : "Chrome"),

    permission,
    category: raw.category || "General",
    purpose: raw.purpose || "User granted permission",
    status: raw.status || "Granted",

    dataFlow: Array.isArray(raw.dataFlow) ? raw.dataFlow : [],
    retention_months: raw.retention_months || 12,
    grantedOn: raw.grantedOn || new Date().toISOString(),
  }
}


const sentConsents = new Set()

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "PERMISSION_DETECTED") {
  const formatted = convertToMLFormat(msg);

  if (sentConsents.has(formatted.consentId)) {
    sendResponse({ skipped: true });
    return;
  }

  sentConsents.add(formatted.consentId);

  fetch("http://localhost:4000/consents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formatted),
  })
    .then(() => {
     navigator.geolocation.getCurrentPosition(console.log, console.error);
      notifyTab(sender.tab?.id, {
        website: formatted.website,
        permission: formatted.permission,
        risk_category: msg.risk_category ,
        status: formatted.status
      });

      sendResponse({ received: true });
    })
    .catch(() => sendResponse({ received: false }));

  return true;
}

})


chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  if (msg.type === "OPEN_SITE_SETTINGS") {
    const site = msg.site
    const ua = navigator.userAgent.toLowerCase()
    let url

    if (ua.includes("edg")) {
      url = `edge://settings/content/siteDetails?site=${encodeURIComponent(site)}`
    } else if (ua.includes("firefox")) {
      url = "about:preferences#privacy"
    } else {
      url = `chrome://settings/content/siteDetails?site=${encodeURIComponent(site)}`
    }

    chrome.tabs.create({ url })
    sendResponse({ opened: true })
    return true
  }
})


chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  if (msg.type === "TEST_OPEN") {
    chrome.tabs.create({ url: "chrome://settings/content" })
    sendResponse({ ok: true })
  }
})
