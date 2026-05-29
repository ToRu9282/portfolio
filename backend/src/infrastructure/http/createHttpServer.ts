import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import type { SubmitLeadUseCase } from "../../application/SubmitLeadUseCase.js";
import type { AppConfig } from "../config/env.js";
import { errorHandler } from "../../presentation/middleware/errorHandler.js";
import { createContactRoutes } from "../../presentation/routes/contactRoutes.js";

export function createHttpServer(config: AppConfig, submitLead: SubmitLeadUseCase) {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.frontendOrigin,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"]
    })
  );
  app.use(express.json({ limit: "32kb" }));
  app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/health", (_request, response) => {
    response.json({
      ok: true,
      service: "portfolio-backend",
      telegram: config.telegram.dryRun ? "dry-run" : "enabled"
    });
  });

  app.use("/api", createContactRoutes(submitLead));
  app.use(errorHandler);

  return app;
}
