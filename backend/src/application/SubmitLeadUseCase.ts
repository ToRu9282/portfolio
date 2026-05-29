import { createLead, type CreateLeadInput } from "../domain/Lead.js";
import type { LeadDelivery, LeadNotifier } from "../domain/LeadNotifier.js";
import type { LeadRepository } from "../domain/LeadRepository.js";

export type SubmitLeadResult = {
  leadId: string;
  delivery: LeadDelivery;
};

export class SubmitLeadUseCase {
  constructor(
    private readonly repository: LeadRepository,
    private readonly notifier: LeadNotifier
  ) {}

  async execute(input: CreateLeadInput): Promise<SubmitLeadResult> {
    const lead = createLead(input);
    await this.repository.save(lead);
    const notification = await this.notifier.notify(lead);

    return {
      leadId: lead.id,
      delivery: notification.delivery
    };
  }
}
