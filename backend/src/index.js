import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import consentRoutes from "./routes/consent.routes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// test route
app.get("/", (req, res) => {
  res.json({ message: "Node.js backend running with MongoDB" });
});

// load routes (will create in next phases)

app.use("/consents", consentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
