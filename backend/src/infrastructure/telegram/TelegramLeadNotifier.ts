import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "../../domain/Lead.js";
import type { LeadNotificationResult, LeadNotifier } from "../../domain/LeadNotifier.js";

type TelegramConfig = {
  botToken?: string;
  chatId?: string;
  adminUsername?: string;
  adminStorePath: string;
  dryRun: boolean;
};

type StoredAdmin = {
  chatId: number | string;
  username?: string;
  claimedAt: string;
};

type TelegramUpdate = {
  message?: {
    chat?: {
      id?: number | string;
    };
    from?: {
      username?: string;
    };
  };
};

export class TelegramLeadNotifier implements LeadNotifier {
  constructor(private readonly config: TelegramConfig) {}

  async notify(lead: Lead): Promise<LeadNotificationResult> {
    if (this.config.dryRun || !this.config.botToken) {
      console.info("[telegram:dry-run]", this.formatMessage(lead));
      return { delivery: "dry-run" };
    }

    const chatId = this.config.chatId ?? (await this.resolveAdminChatId());

    if (!chatId) {
      throw new Error(
        this.config.adminUsername
          ? `Telegram admin @${this.config.adminUsername} is not connected. Send /start to the bot first.`
          : "Telegram admin is not connected. Send /start to the bot first."
      );
    }

    const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: this.formatMessage(lead),
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(`Telegram API error: ${response.status} ${details}`);
    }

    return { delivery: "telegram" };
  }

  private async resolveAdminChatId(): Promise<number | string | undefined> {
    const stored = await this.readStoredAdmin();
    if (stored?.chatId) return stored.chatId;

    const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/getUpdates`, {
      signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) return undefined;

    const payload = (await response.json()) as { ok?: boolean; result?: TelegramUpdate[] };
    const updates = payload.result ?? [];
    const username = this.config.adminUsername?.toLowerCase();

    const matchedUpdate = username
      ? updates.find((update) => {
        const fromUsername = update.message?.from?.username?.toLowerCase();
        return fromUsername === username;
      })
      : updates.find((update) => Boolean(update.message?.chat?.id));

    const chatId = matchedUpdate?.message?.chat?.id;
    if (!chatId) return undefined;

    await this.writeStoredAdmin({
      chatId,
      username: matchedUpdate.message?.from?.username,
      claimedAt: new Date().toISOString()
    });

    return chatId;
  }

  private async readStoredAdmin(): Promise<StoredAdmin | undefined> {
    try {
      const data = await readFile(this.adminStorePath(), "utf8");
      return JSON.parse(data) as StoredAdmin;
    } catch {
      return undefined;
    }
  }

  private async writeStoredAdmin(admin: StoredAdmin): Promise<void> {
    const filePath = this.adminStorePath();
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(admin, null, 2), "utf8");
  }

  private adminStorePath() {
    return path.isAbsolute(this.config.adminStorePath)
      ? this.config.adminStorePath
      : path.resolve(process.cwd(), this.config.adminStorePath);
  }

  private formatMessage(lead: Lead): string {
    const rows = [
      "📩 <b>Новая заявка с портфолио</b>",
      "",
      `├ 👤 <b>Имя:</b> ${escapeHtml(lead.name)}`,
      `├ 💬 <b>Контакт:</b> ${escapeHtml(lead.contact)}`,
      `├ 📂 <b>Тип проекта:</b> ${escapeHtml(lead.projectType)}`,
      `└ 💰 <b>Бюджет:</b> ${escapeHtml(lead.budget)}`,
    ];

    if (lead.message) {
      rows.push(
        "",
        "<b>📝 Сообщение:</b>",
        `<blockquote>${escapeHtml(lead.message)}</blockquote>`
      );
    }

    rows.push(
      "",
      `<i>🆔 ${escapeHtml(lead.id)}</i>`,
      `<i>⏱ ${escapeHtml(formatDate(lead.createdAt))}</i>`
    );

    return rows.join("\n");
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDate(date: Date): string {
  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Novosibirsk"
  });
}
