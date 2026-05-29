import type { Lead } from "./Lead.js";

export type LeadDelivery = "telegram" | "dry-run";

export type LeadNotificationResult = {
  delivery: LeadDelivery;
};

export interface LeadNotifier {
  notify(lead: Lead): Promise<LeadNotificationResult>;
}
