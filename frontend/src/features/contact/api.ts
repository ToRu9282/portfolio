export type ContactPayload = {
  name: string;
  contact: string;
  projectType: string;
  budget: string;
  message: string;
};

export type ContactResponse = {
  ok: boolean;
  delivery: "telegram" | "dry-run";
  leadId: string;
};

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json().catch(() => null)) as
    | ContactResponse
    | { message?: string; errors?: unknown }
    | null;

  if (!response.ok) {
    const message = data && "message" in data && data.message ? data.message : "Не удалось отправить заявку.";
    throw new Error(message);
  }

  return data as ContactResponse;
}
