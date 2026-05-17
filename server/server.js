import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/api", chatRoute);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`[NorthWind] Chat API running on http://localhost:${PORT}`);
});