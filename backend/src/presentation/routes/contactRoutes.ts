import { Router } from "express";
import { z } from "zod";
import type { SubmitLeadUseCase } from "../../application/SubmitLeadUseCase.js";

const tgUsernameRegex = /^@[a-zA-Z0-9_]{3,32}$/;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(3).max(180).regex(tgUsernameRegex, "Укажите Telegram username: @username"),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().min(2).max(80),
  message: z.string().trim().max(4000).optional().default("")
});

export function createContactRoutes(submitLead: SubmitLeadUseCase) {
  const router = Router();

  router.post("/contact", async (request, response, next) => {
    try {
      const input = contactSchema.parse(request.body);
      const result = await submitLead.execute(input);

      response.status(201).json({
        ok: true,
        delivery: result.delivery,
        leadId: result.leadId
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
