import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { submitContact, type ContactPayload } from "./api";

const initialValues: ContactPayload = {
  name: "",
  contact: "",
  projectType: "Лендинг",
  budget: "Не определен",
  message: ""
};

const projectTypes = ["Лендинг", "Сайт под ключ", "Telegram-бот", "Веб-сервис", "CRM/админка", "Автоматизация", "Консультация"];
const budgets = ["Не определен", "до 100k", "100k-250k", "250k-500k", "500k+"];

type FieldErrors = {
  name?: string;
  contact?: string;
};

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const errors = useMemo((): FieldErrors => {
    const e: FieldErrors = {};
    if (values.name.trim().length > 0 && values.name.trim().length < 2)
      e.name = "Минимум 2 символа";
    if (values.contact.trim().length > 0 && !/^@[a-zA-Z0-9_]{3,32}$/.test(values.contact.trim()))
      e.contact = "Начните с @, только латиница и цифры";
    return e;
  }, [values]);

  const nameOk = values.name.trim().length >= 2;
  const contactOk = /^@[a-zA-Z0-9_]{3,32}$/.test(values.contact.trim());

  const canSubmit = useMemo(() => nameOk && contactOk, [nameOk, contactOk]);

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!nameOk) list.push("имя (мин. 2 символа)");
    if (!contactOk) list.push("Telegram @username");
    return list;
  }, [nameOk, contactOk]);

  const update = (key: keyof ContactPayload, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const blur = (key: string) => {
    setTouched((prev) => new Set(prev).add(key));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(new Set(["name", "contact"]));
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      const result = await submitContact(values);
      setValues(initialValues);
      setTouched(new Set());
      setStatus("success");
      setMessage(
        result.delivery === "telegram"
          ? "Заявка отправлена в Telegram. Я скоро отвечу."
          : "Заявка принята в dry-run режиме. Добавьте Telegram-токен, чтобы получать сообщения в бота."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    }
  };

  return (
    <form className="glass-panel grid gap-4 rounded-[28px] p-4 sm:p-6 lg:p-7" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Имя" error={touched.has("name") ? errors.name : undefined}>
          <input
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => blur("name")}
            autoComplete="name"
            placeholder="Как к вам обращаться"
            className="input-field"
            required
          />
        </Field>

        <Field label="Telegram" error={touched.has("contact") ? errors.contact : undefined}>
          <input
            value={values.contact}
            onChange={(event) => update("contact", event.target.value)}
            onBlur={() => blur("contact")}
            placeholder="@username"
            className="input-field"
            required
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Тип проекта">
          <select
            value={values.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            className="input-field"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Бюджет">
          <select value={values.budget} onChange={(event) => update("budget", event.target.value)} className="input-field">
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Сообщение (необязательно)">
        <textarea
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Опишите задачу: сайт, бот, сервис, сроки, что уже есть и какой результат нужен"
          className="input-field min-h-[150px] resize-y"
        />
      </Field>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm leading-relaxed text-white/[0.52]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-flame" />
            Заявка уходит на сервер и в Telegram-бот Тамерлана.
          </p>
          {!canSubmit && touched.size > 0 && (
            <p className="text-[0.62rem] text-red-400">
              Заполните: {missing.join(", ")}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!canSubmit || status === "submitting"}
          className="chrome-text group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-flame px-6 py-3 text-[0.72rem] text-white shadow-ember transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {status === "submitting" ? "Sending" : "Send message"}
          <Send className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </div>

      {message ? (
        <div
          role="status"
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status === "error"
              ? "border-red-400/30 bg-red-500/10 text-red-100"
              : "border-green-400/30 bg-green-500/10 text-green-100"
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="chrome-text text-[0.66rem] text-white/50">{label}</span>
      {children}
      {error && <span className="text-[0.62rem] text-red-400">{error}</span>}
    </label>
  );
}
