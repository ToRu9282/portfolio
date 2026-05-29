import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);

  if (error instanceof ZodError) {
    response.status(400).json({
      ok: false,
      message: "Проверьте поля формы.",
      errors: error.flatten()
    });
    return;
  }

  if (error instanceof Error && error.message.includes("Telegram admin")) {
    response.status(409).json({
      ok: false,
      message: "Telegram-админ еще не подключен. Напишите /start вашему боту с аккаунта @toru_srang и отправьте заявку снова."
    });
    return;
  }

  response.status(502).json({
    ok: false,
    message: "Сервер не смог обработать заявку. Попробуйте позже."
  });
};
