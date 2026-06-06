# Портфолио Тамерлана

Личный сайт-портфолио для продажи разработки лендингов, сайтов под ключ, Telegram-ботов, веб-сервисов и автоматизаций. Проект собран как npm-workspace: React/Vite frontend и Express backend с отправкой заявок в Telegram.

## Что внутри

- Одностраничный frontend на React, TypeScript, Vite и Tailwind CSS.
- Анимации на Framer Motion и GSAP.
- Локальные шрифты в `frontend/public/assets/fonts`.
- Портфолио с desktop/mobile превью работ.
- Контактная форма с валидацией Telegram username.
- Backend на Express, TypeScript и Zod.
- Интеграция с Telegram Bot API и режим `dry-run` для локальной разработки.

## Быстрый запуск

```bash
npm install
npm run dev
```

После запуска доступны:

- Frontend: `http://localhost:5173/`
- Backend healthcheck: `http://localhost:5174/health`
- API формы: `POST http://localhost:5174/api/contact`

В dev-режиме Vite проксирует `/api` и `/health` на backend, поэтому frontend отправляет форму на относительный путь `/api/contact`.

## Команды

```bash
npm run dev            # backend + frontend в режиме разработки
npm run build          # сборка backend и frontend
npm run start          # запуск собранного backend из backend/dist
npm run typecheck      # TypeScript-проверка во всех workspaces
npm run capture:sites  # переснять превью работ через Playwright
```

Отдельные workspace-команды:

```bash
npm --workspace frontend run dev
npm --workspace frontend run build
npm --workspace backend run dev
npm --workspace backend run build
```

## Переменные окружения

Backend читает переменные из `backend/.env`. Шаблон лежит в `backend/.env.example`.

```env
PORT=5174
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
TELEGRAM_ADMIN_USERNAME=toru_srang
TELEGRAM_ADMIN_STORE=.data/telegram-admin.json
TELEGRAM_DRY_RUN=true
```

Для локальной разработки можно оставить `TELEGRAM_DRY_RUN=true`: API примет заявку и вернет успешный ответ без отправки сообщения в Telegram.

Для реальной отправки нужен `TELEGRAM_BOT_TOKEN`. Если `TELEGRAM_CHAT_ID` не задан, backend может найти чат администратора по `TELEGRAM_ADMIN_USERNAME`: администратор пишет боту `/start`, после чего найденный chat id сохраняется в `.data/telegram-admin.json`.

## Контактная форма

Форма отправляет JSON на `POST /api/contact`.

```json
{
  "name": "Тамерлан",
  "contact": "@toru_srang",
  "projectType": "Лендинг",
  "budget": "от 10 000 ₽",
  "message": "Нужен сайт под услугу"
}
```

Ответ при успешной обработке:

```json
{
  "ok": true,
  "delivery": "telegram",
  "leadId": "..."
}
```

Поле `contact` принимает Telegram username в формате `@username`.

## Контент и портфолио

Основные данные frontend вынесены в TypeScript-файлы:

- `frontend/src/config/links.ts` - Telegram, WhatsApp, телефон и email.
- `frontend/src/data/content.ts` - услуги, боли, процесс, тарифы, FAQ и контактные карточки.
- `frontend/src/data/projects.ts` - проекты портфолио, ссылки, стеки и пути к превью.

Список сайтов для автоматического снятия скриншотов находится в `scripts/work-sites.js`. Команда `npm run capture:sites` сохраняет desktop/mobile изображения в `frontend/public/work-screenshots`.

## Структура

```text
.
├── backend
│   ├── src/application       # use case отправки заявки
│   ├── src/domain            # Lead и контракты repository/notifier
│   ├── src/infrastructure    # config, HTTP server, Telegram adapter
│   └── src/presentation      # routes, validation, error handler
├── frontend
│   ├── public                # favicon, шрифты, скриншоты работ
│   └── src
│       ├── app               # основной App и секции страницы
│       ├── components        # общие UI-компоненты
│       ├── data              # контент и проекты
│       ├── features          # contact и projects
│       └── styles            # Tailwind/global CSS
└── scripts                   # Playwright-скрипты для превью портфолио
```

## Проверка перед релизом

```bash
npm run typecheck
npm run build
```

Дополнительно стоит проверить:

- `http://localhost:5173/` открывается без error overlay.
- `http://localhost:5174/health` возвращает `{"ok":true}`.
- Форма отправляет заявку в `dry-run` или Telegram в зависимости от env.
- На мобильной ширине нет горизонтального скролла и перекрытия текста.
