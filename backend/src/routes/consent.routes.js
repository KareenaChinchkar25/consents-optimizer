import express from "express";
import { addConsent, getAllConsents, updateConsentStatus } from "../controllers/consentController.js";

const router = express.Router();

// GET → dashboard reads consents
router.get("/", getAllConsents);

// POST → extension sends new consent
router.post("/", addConsent);

// PATCH → update consent status
router.patch("/status", updateConsentStatus);


export default router;
