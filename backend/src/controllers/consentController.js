import axios from "axios";
import { Consent } from "../models/consent.js";

const ML_URL = "http://127.0.0.1:8000/predict";


export const addConsent = async (req, res) => {
  try {
    const data = req.body;

    if (!data.website || !data.permission) {
      return res.status(400).json({ error: "Invalid consent payload" });
    }

    if (data.grantedOn) {
      data.grantedOn = new Date(data.grantedOn);
    }

    // Fetch existing consent FIRST
    const existing = await Consent.findOne({
      website: data.website,
      permission: data.permission,
    });

    let riskUpdate = {};

    try {
      const mlRes = await axios.post(ML_URL, data);
      riskUpdate = {
        risk_score: mlRes.data.risk_score,
        risk_category: mlRes.data.risk_category,
      };
    } catch {
      console.warn("ML unavailable, preserving existing risk values");
      if (existing?.risk_score !== undefined) {
        riskUpdate = {
          risk_score: existing.risk_score,
          risk_category: existing.risk_category,
        };
      }
    }

    const consent = await Consent.findOneAndUpdate(
      { website: data.website, permission: data.permission },
      {
        $set: {
          ...data,
          ...riskUpdate,
          lastVerifiedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    res.json(consent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const getAllConsents = async (req, res) => {
  try {
    const consents = await Consent.find().sort({ createdAt: -1 });
    res.json(consents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateConsentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Denied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status update" });
    }

    const consent = await Consent.findById(id);
    if (!consent) {
      return res.status(404).json({ error: "Consent not found" });
    }

    consent.status = status;
    consent.audit = consent.audit || [];
    consent.audit.push({
      action: `STATUS_SET_${status.toUpperCase()}`,
      source: "dashboard",
      timestamp: new Date(),
    });

    await consent.save();

    res.json(consent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPermissionChange = async (req, res) => {
  try {
    const { website, permission, status } = req.body;

    if (!website || !permission || !status) {
      return res.status(400).json({ error: "Invalid verification payload" });
    }

    const consent = await Consent.findOne({
      website,
      permission,
    }).sort({ createdAt: -1 });

    if (!consent) {
      return res.status(404).json({ error: "Consent not found" });
    }

    consent.status = status;
    consent.lastVerifiedAt = new Date();
    consent.audit = consent.audit || [];
    consent.audit.push({
      action: `STATUS_VERIFIED_${status.toUpperCase()}`,
      source: "extension",
      timestamp: new Date(),
    });

    await consent.save();

    res.json({ verified: true, consent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
