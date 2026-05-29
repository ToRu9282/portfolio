import { randomUUID } from "node:crypto";

export type Lead = {
  id: string;
  name: string;
  contact: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: Date;
};

export type CreateLeadInput = Omit<Lead, "id" | "createdAt">;

export function createLead(input: CreateLeadInput): Lead {
  return {
    id: randomUUID(),
    createdAt: new Date(),
    name: input.name.trim(),
    contact: input.contact.trim(),
    projectType: input.projectType.trim(),
    budget: input.budget.trim(),
    message: input.message.trim()
  };
}
