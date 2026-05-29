import type { Lead } from "../../domain/Lead.js";
import type { LeadRepository } from "../../domain/LeadRepository.js";

export class InMemoryLeadRepository implements LeadRepository {
  private readonly leads = new Map<string, Lead>();

  async save(lead: Lead): Promise<void> {
    this.leads.set(lead.id, lead);
  }
}
