import {
  BarChart3,
  BellRing,
  Bot,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Code2,
  Compass,
  FileText,
  LayoutDashboard,
  MessageCircle,
  MonitorSmartphone,
  PanelsTopLeft,
  Puzzle,
  Rocket,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench
} from "lucide-react";

export const navItems = [
  { label: "Работы", href: "#work" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Цена", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" }
];

export const heroBadges = ["Лендинги", "Сайты под ключ", "Telegram-боты", "Веб-сервисы", "Анимации", "Адаптив"];

export const serviceTicker = [
  "Лендинги",
  "Сайты",
  "Telegram-боты",
  "Веб-сервисы",
  "Квизы",
  "CRM",
  "Заявки в Telegram",
  "Адаптив"
];

export const services = [
  {
    icon: PanelsTopLeft,
    title: "Лендинги для бизнеса",
    text: "Продающие страницы для услуг, экспертов, студий и локального бизнеса."
  },
  {
    icon: MonitorSmartphone,
    title: "Многостраничные сайты",
    text: "Структура, разделы, портфолио, услуги и понятный путь к заявке."
  },
  {
    icon: Bot,
    title: "Telegram-боты",
    text: "Боты для заявок, записи, квизов, уведомлений и поддержки клиентов."
  },
  {
    icon: LayoutDashboard,
    title: "Веб-сервисы и кабинеты",
    text: "Админки, CRM, каталоги, личные кабинеты и внутренние инструменты."
  },
  {
    icon: Calculator,
    title: "Калькуляторы и квизы",
    text: "Формы, калькуляторы стоимости и сценарии сбора заявок."
  },
  {
    icon: Puzzle,
    title: "Интеграции",
    text: "Telegram, CRM, аналитика, email, уведомления и обработка лидов."
  }
];

export const problems = [
  {
    icon: FileText,
    title: "Много текста, мало маршрута",
    text: "Пользователь не понимает, куда нажать и зачем оставлять заявку."
  },
  {
    icon: Route,
    title: "Красиво, но без сценария",
    text: "Визуал есть, а логики продажи, доверия и следующего шага нет."
  },
  {
    icon: Smartphone,
    title: "Телефон ломает впечатление",
    text: "Кнопки, тексты и карточки расползаются на реальном мобильном экране."
  },
  {
    icon: BellRing,
    title: "Заявки теряются",
    text: "Нет Telegram-уведомлений, интеграций, аналитики и понятной обработки."
  }
];

export const processSteps = [
  {
    icon: Compass,
    title: "Разбираю задачу и нишу",
    text: "Фиксируем цель, аудиторию, оффер и что должно произойти после заявки."
  },
  {
    icon: ClipboardList,
    title: "Собираю структуру и смыслы",
    text: "Помогаю без идеального ТЗ: раскладываю блоки, тексты и сценарии."
  },
  {
    icon: Sparkles,
    title: "Делаю дизайн-концепт",
    text: "Выстраиваю визуальный язык, ритм, анимации и ключевые состояния."
  },
  {
    icon: Code2,
    title: "Разрабатываю сайт/бота/сервис",
    text: "Собираю frontend, backend, формы, интеграции и Telegram-уведомления."
  },
  {
    icon: Rocket,
    title: "Запускаю и тестирую",
    text: "Проверяю адаптив, скорость, клики, заявки и реальные пользовательские сценарии."
  }
];

export const pricing = [
  {
    title: "Лендинг старт",
    price: "от 30 000 ₽",
    note: "Для быстрого запуска услуги или продукта.",
    duration: "3–7 дней",
    features: ["до 5–7 блоков", "адаптив", "форма заявки", "базовая анимация", "Telegram-уведомления"]
  },
  {
    title: "Сайт под ключ",
    price: "от 60 000 ₽",
    note: "Для бизнеса, которому нужен сильный сайт и доверие.",
    duration: "7–14 дней",
    features: ["уникальная структура", "больше экранов", "портфолио/каталог/калькулятор", "продвинутые анимации", "аналитика и интеграции"]
  },
  {
    title: "Сайт + бот / автоматизация",
    price: "от 100 000 ₽",
    note: "Для связки сайта, Telegram-бота и обработки заявок.",
    duration: "индивидуально",
    features: ["сайт или веб-сервис", "Telegram-бот", "уведомления", "админка или простая CRM", "автоматизация процессов"]
  }
];

export const faq = [
  {
    question: "Сколько стоит сайт?",
    answer: "Зависит от формата, количества экранов и интеграций. Простые лендинги начинаются от 30 000 ₽."
  },
  {
    question: "Сколько времени занимает разработка?",
    answer: "Лендинг обычно 3–7 дней, сайт под ключ 7–14 дней. Сервисы и боты оцениваются отдельно."
  },
  {
    question: "Можно ли сделать Telegram-бота вместе с сайтом?",
    answer: "Да. Можно связать сайт, формы, Telegram-бота, уведомления и простую CRM."
  },
  {
    question: "Можно ли подключить заявки в Telegram?",
    answer: "Да. Заявки могут приходить сразу в Telegram с именем, контактом, типом проекта и сообщением."
  },
  {
    question: "Нужно ли мне писать текст самому?",
    answer: "Не обязательно. Я помогу собрать структуру, смыслы и короткие тексты под вашу услугу."
  },
  {
    question: "Будет ли сайт адаптирован под телефон?",
    answer: "Да. Проверяю мобильные ширины, кликабельность, читабельность и отсутствие горизонтального скролла."
  },
  {
    question: "Можно ли потом редактировать сайт?",
    answer: "Да. Можно заложить удобную структуру данных, CMS или простую админку, если это нужно."
  }
];

export const contactChannels = [
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@toru_srang"
  },
  {
    icon: Wrench,
    title: "Форматы",
    value: "сайт, бот, сервис"
  },
  {
    icon: ShieldCheck,
    title: "Заявки",
    value: "сразу в Telegram"
  },
  {
    icon: BarChart3,
    title: "Фокус",
    value: "скорость и конверсия"
  },
  {
    icon: CheckCircle2,
    title: "Адаптив",
    value: "360px+"
  },
  {
    icon: Workflow,
    title: "Автоматизация",
    value: "CRM и уведомления"
  }
];
