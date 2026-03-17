import express from "express";
import cors from "cors";
import { apiRouter } from "../routes";
import { errorHandler } from "../middleware/errorHandler";

const app = express();

const configuredOrigins = [
  "http://localhost:3000",
  "https://amazon-clone-dh4mija.vercel.app",
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean),
].filter((v): v is string => Boolean(v));

const allowedOrigins = new Set(configuredOrigins);
const vercelFrontendPattern = /^https:\/\/[a-z0-9-]+(?:-[a-z0-9-]+)?\.vercel\.app$/i;

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server/no-origin calls and explicitly configured origins.
      if (!origin || allowedOrigins.has(origin) || vercelFrontendPattern.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRouter);

app.use(errorHandler);
export default app;
