# Портфолио Тамерлана

Сайт продает услуги разработки лендингов, сайтов, веб-сервисов, Telegram-ботов, автоматизаций и интерфейсов для бизнеса. Проект не переписан с нуля: он аккуратно развивает существующую React/Vite + Express архитектуру.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, Lucide React.
- Backend: Node.js, Express, TypeScript, Zod, Telegram Bot API.
- Backend layers: `domain -> application -> infrastructure -> presentation`.
- Шрифты локальные: `Panton`, `Evolve Sans`, `Stolzl`, `Laqonic`.

GSAP добавлен только для двух motion-паттернов, которые были в примерах: scroll-flow портфолио и cinematic footer.

## Запуск

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend healthcheck: `http://localhost:5174/health`

Проверка:

```bash
npm run typecheck
npm run build
```

## Telegram

В `backend/.env` уже можно задать токен бота. Для безопасной доставки без ручного `chat_id` работает логика администратора:

1. Тамерлан пишет боту `/start` с аккаунта `@toru_srang`.
2. Backend вызывает Telegram `getUpdates`.
3. Первый найденный чат от `@toru_srang` сохраняется в `.data/telegram-admin.json`.
4. Все заявки отправляются только в этот chat id.

Пример:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
TELEGRAM_ADMIN_USERNAME=toru_srang
TELEGRAM_ADMIN_STORE=.data/telegram-admin.json
TELEGRAM_DRY_RUN=false
```

Если админ еще не написал боту, форма вернет понятную ошибку: нужно отправить `/start` боту и повторить заявку.

## Скриншоты работ

Список сайтов лежит в [scripts/work-sites.js](/home/toru/Проекты/Парфолио/scripts/work-sites.js:1).

Снять desktop/mobile скриншоты:

```bash
npm run capture:sites
```

Файлы сохраняются в:

```text
frontend/public/work-screenshots
```

Данные портфолио используются в [frontend/src/data/projects.ts](/home/toru/Проекты/Парфолио/frontend/src/data/projects.ts:1).

## Структура

```text
frontend/src/config/links.ts       # Telegram, WhatsApp, email, телефон
frontend/src/data/content.ts       # услуги, проблемы, процесс, цены, FAQ
frontend/src/data/projects.ts      # портфолио и ссылки на сайты
frontend/src/app/sections          # секции страницы
frontend/src/features/contact      # форма заявки
frontend/src/features/projects     # scroll-flow портфолио и modal preview

backend/src/domain                 # Lead entity, notifier/repository contracts
backend/src/application            # SubmitLeadUseCase
backend/src/infrastructure         # env, HTTP server, Telegram adapter
backend/src/presentation           # routes, validation, errors
```

## Основные фичи

- Русский продающий контент под РФ.
- Компактный hero без перегруза.
- Карточки услуг, блок проблемы, процесс, цены, FAQ.
- Интерактивное портфолио со scroll-flow анимацией.
- Fullscreen/modal demo preview работ без ухода со страницы.
- Кнопки перехода на реальные сайты.
- Финальный cinematic CTA с magnetic links.
- Адаптив под мобильные ширины и `prefers-reduced-motion`.
