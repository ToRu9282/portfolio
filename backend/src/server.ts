import { SubmitLeadUseCase } from "./application/SubmitLeadUseCase.js";
import { loadConfig } from "./infrastructure/config/env.js";
import { createHttpServer } from "./infrastructure/http/createHttpServer.js";
import { InMemoryLeadRepository } from "./infrastructure/http/InMemoryLeadRepository.js";
import { TelegramLeadNotifier } from "./infrastructure/telegram/TelegramLeadNotifier.js";

const config = loadConfig();
const repository = new InMemoryLeadRepository();
const notifier = new TelegramLeadNotifier(config.telegram);
const submitLead = new SubmitLeadUseCase(repository, notifier);
const app = createHttpServer(config, submitLead);

app.listen(config.port, () => {
  console.info(`Backend listening on http://localhost:${config.port}`);
  console.info(`Telegram delivery: ${config.telegram.dryRun ? "dry-run" : "enabled"}`);
});
