import {
  BadgeCheck,
  BarChart3,
  BellRing,
  Bot,
  BriefcaseBusiness,
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
  TimerReset,
  Workflow,
  Wrench
} from "lucide-react";

export const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Обо мне", href: "#about" },
  { label: "Работы", href: "#work" },
  { label: "Процесс", href: "#process" },
  { label: "Цена", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" }
];

export const heroBadges = ["Лендинг", "Сайт под ключ", "Telegram-бот", "Веб-сервис", "Заявки", "Адаптив"];

export const serviceTicker = [
  "Лендинги",
  "Сайты",
  "Telegram-боты",
  "Веб-сервисы",
  "Заявки",
  "Telegram",
  "Адаптив"
];

export const aboutStats = [
  {
    value: "2+",
    label: "года в разработке",
    text: "Собираю сайты под бизнес-задачи, а не просто красивые страницы.",
    icon: BadgeCheck
  },
  {
    value: "20+",
    label: "выполненных заказов",
    text: "Лендинги, сервисные сайты, каталоги, формы и интеграции.",
    icon: BriefcaseBusiness
  },
  {
    value: "100%",
    label: "сроки фиксируются",
    text: "Сроки, объем и результат обсуждаются до старта работы.",
    icon: TimerReset
  }
];

export const aboutPrinciples = [
  {
    title: "От идеи до запуска",
    text: "Беру процесс на себя: структура, дизайн, разработка, адаптив и публикация сайта."
  },
  {
    title: "Понятная стоимость",
    text: "Заранее обсуждаем задачу, сроки и цену. Без неожиданных доплат по ходу работы."
  },
  {
    title: "Связь с клиентами",
    text: "Подключаю заявки в Telegram, формы обратной связи и простую автоматизацию."
  }
];

export const services = [
  {
    icon: PanelsTopLeft,
    title: "Лендинги",
    text: "Быстрый запуск услуги с понятным оффером и заявкой."
  },
  {
    icon: MonitorSmartphone,
    title: "Сайты под ключ",
    text: "Структура, дизайн, разделы и адаптив без лишнего шума."
  },
  {
    icon: Bot,
    title: "Telegram-боты",
    text: "Заявки, запись, уведомления и простая автоматизация."
  },
  {
    icon: LayoutDashboard,
    title: "Веб-сервисы",
    text: "Кабинеты, CRM, каталоги и внутренние инструменты."
  },
  {
    icon: Calculator,
    title: "Квизы и формы",
    text: "Сбор заявок, бюджетов и контактов без сложного пути."
  },
  {
    icon: Puzzle,
    title: "Интеграции",
    text: "Telegram, CRM, аналитика, email и уведомления."
  }
];

export const problems = [
  {
    icon: FileText,
    title: "Нет оффера",
    text: "Человек не понимает, почему оставить заявку сейчас."
  },
  {
    icon: Route,
    title: "Нет маршрута",
    text: "Красиво, но путь к действию не собран."
  },
  {
    icon: Smartphone,
    title: "Слабый мобильный",
    text: "На телефоне теряются кнопки, тексты и доверие."
  },
  {
    icon: BellRing,
    title: "Лиды теряются",
    text: "Нет уведомлений, аналитики и быстрой обработки."
  }
];

export const processSteps = [
  {
    icon: Compass,
    title: "Цель",
    text: "Фиксируем услугу, аудиторию и нужное действие."
  },
  {
    icon: ClipboardList,
    title: "Структура",
    text: "Собираю блоки, оффер и короткие тексты."
  },
  {
    icon: Sparkles,
    title: "Визуал",
    text: "Делаю чистый дизайн и нужные акценты."
  },
  {
    icon: Code2,
    title: "Разработка",
    text: "Собираю сайт, форму, backend и интеграции."
  },
  {
    icon: Rocket,
    title: "Запуск",
    text: "Проверяю адаптив, клики и отправку заявок."
  }
];

export const pricing = [
  {
    title: "Лендинг старт",
    price: "от 10 000\u00a0₽",
    note: "Быстро запустить услугу и начать получать заявки.",
    duration: "3–5 дней",
    features: ["сильный первый экран", "форма заявки", "адаптив", "Telegram-уведомления"]
  },
  {
    title: "Сайт под ключ",
    price: "от 15 000\u00a0₽",
    note: "Для бизнеса, которому нужен сайт с доверием и продажей.",
    duration: "до 7 дней",
    features: ["структура под нишу", "портфолио/каталог", "анимации", "аналитика и интеграции"]
  },
  {
    title: "Сайт + бот / автоматизация",
    price: "от 25 000\u00a0₽",
    note: "Связка сайта, Telegram-бота и обработки заявок. Финальная стоимость зависит от сложности.",
    duration: "индивидуально",
    features: ["сайт или сервис", "Telegram-бот", "уведомления", "простая CRM"]
  }
];

export const faq = [
  {
    question: "Сколько стоит сайт?",
    answer: "Лендинги начинаются от 10 000 ₽, сайты под ключ — от 15 000 ₽. Точная цена зависит от блоков и интеграций."
  },
  {
    question: "Сколько времени занимает разработка?",
    answer: "Лендинг обычно 3–5 дней, сайт под ключ до 7 дней."
  },
  {
    question: "Можно ли сделать Telegram-бота вместе с сайтом?",
    answer: "Да. Сайт, бот, уведомления и CRM можно собрать одной связкой."
  },
  {
    question: "Можно ли подключить заявки в Telegram?",
    answer: "Да. Заявка приходит сразу с именем, контактом, бюджетом и задачей."
  },
  {
    question: "Нужно ли мне писать текст самому?",
    answer: "Нет. Я помогу собрать оффер, структуру и короткие тексты."
  },
  {
    question: "Будет ли сайт адаптирован под телефон?",
    answer: "Да. Проверяю мобильные экраны, клики и читаемость."
  },
  {
    question: "Можно ли потом редактировать сайт?",
    answer: "Да. Можно заложить CMS, данные или простую админку."
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
