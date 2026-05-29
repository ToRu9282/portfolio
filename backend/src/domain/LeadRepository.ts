import type { Lead } from "./Lead.js";

export interface LeadRepository {
  save(lead: Lead): Promise<void>;
}
