import "dotenv/config";

export type AppConfig = {
  port: number;
  nodeEnv: string;
  frontendOrigin: string;
  telegram: {
    botToken?: string;
    chatId?: string;
    adminUsername?: string;
    adminStorePath: string;
    dryRun: boolean;
  };
};

export function loadConfig(): AppConfig {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || undefined;
  const dryRunFromEnv = process.env.TELEGRAM_DRY_RUN?.toLowerCase() === "true";

  return {
    port: Number(process.env.PORT ?? 5174),
    nodeEnv: process.env.NODE_ENV ?? "development",
    frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    telegram: {
      botToken,
      chatId,
      adminUsername: process.env.TELEGRAM_ADMIN_USERNAME?.replace(/^@/, "").trim() || undefined,
      adminStorePath: process.env.TELEGRAM_ADMIN_STORE ?? ".data/telegram-admin.json",
      dryRun: dryRunFromEnv || !botToken
    }
  };
}
