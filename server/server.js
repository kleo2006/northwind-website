/* eslint-env node */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import checkoutRoute from "./routes/create-checkout-session.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/api", chatRoute);
app.use("/api", checkoutRoute);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`[NorthWind] API running on http://localhost:${PORT}`);
});