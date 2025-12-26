import mongoose from "mongoose";

const ConsentSchema = new mongoose.Schema(
  {
    website: { type: String, required: true },
    platform: { type: String, required: true },
    permission: { type: String, required: true },
    category: { type: String, required: true },
    purpose: { type: String, required: true },

    status: {
      type: String,
      enum: ["Granted", "Revoked", "Denied", "Pending"],
      default: "Granted",
    },

    dataFlow: { type: [String], default: [] },
    retention_months: { type: Number, default: 0 },
    grantedOn: { type: Date, required: true },

    risk_score: { type: Number },
    risk_category: { type: String },

    lastVerifiedAt: { type: Date },

    audit: [
      {
        action: String,
        source: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Consent = mongoose.model("Consent", ConsentSchema);
