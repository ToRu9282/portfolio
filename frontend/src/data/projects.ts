export type ProjectType = "Лендинг" | "Сайт" | "Каталог" | "Веб-сервис" | "CRM";

export type PortfolioProject = {
  slug: string;
  title: string;
  type: ProjectType;
  description: string;
  stack: string[];
  url: string;
  preview: string;
  mobilePreview: string;
  fallbackPreview?: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: "frontend-cyan",
    title: "Frontend Studio",
    type: "Лендинг",
    description: "Темный промо-сайт с сильным первым экраном, услугами и заявкой для онлайн-направления.",
    stack: ["React", "Vite", "Анимации", "Адаптив"],
    url: "https://frontend-cyan-sigma-46.vercel.app/",
    preview: "/work-screenshots/frontend-cyan-desktop.png",
    mobilePreview: "/work-screenshots/frontend-cyan-mobile.png"
  },
  {
    slug: "luchiki",
    title: "Лучики",
    type: "Лендинг",
    description: "Мягкая посадочная страница для медицинской услуги: доверие, структура и понятный путь к записи.",
    stack: ["Лендинг", "UI", "Формы", "Адаптив"],
    url: "https://luchiki-landing.vercel.app/",
    preview: "/work-screenshots/luchiki-desktop.png",
    mobilePreview: "/work-screenshots/luchiki-mobile.png"
  },
  {
    slug: "lumiere",
    title: "Lumiere Dental",
    type: "Сайт",
    description: "Премиальный сайт для стоматологии с визуальной подачей, услугами и акцентом на доверие.",
    stack: ["React", "Дизайн", "SEO", "Адаптив"],
    url: "https://lumiere-dental-ashen.vercel.app/",
    preview: "/work-screenshots/lumiere-desktop.png",
    mobilePreview: "/work-screenshots/lumiere-mobile.png"
  },
  {
    slug: "ibachetka",
    title: "Ibachetka",
    type: "Каталог",
    description: "Каталог дизайнерских сумок с карточками, визуальным ритмом и понятной витриной.",
    stack: ["Каталог", "UI", "Карточки", "Адаптив"],
    url: "https://ibachetka-designer-bags.vercel.app/",
    preview: "/work-screenshots/ibachetka-desktop.png",
    mobilePreview: "/work-screenshots/ibachetka-mobile.png"
  },
  {
    slug: "aurea",
    title: "Aurea Beauty",
    type: "Лендинг",
    description: "Кинематографичный лендинг для beauty-направления: дорогая подача, анимации и сильная атмосфера.",
    stack: ["Framer Motion", "Премиум UI", "Форма заявки"],
    url: "https://aurea-beauty-landing.vercel.app/",
    preview: "/work-screenshots/aurea-desktop.png",
    mobilePreview: "/work-screenshots/aurea-mobile.png"
  },
  {
    slug: "art-academy",
    title: "Art Academy",
    type: "Сайт",
    description: "Арт-направленный сайт академии с параллаксом, крупной типографикой и секциями доверия.",
    stack: ["Параллакс", "Анимации", "Контент", "UX"],
    url: "https://art-academy-cinematic-parallax.vercel.app/",
    preview: "/work-screenshots/art-academy-desktop.png",
    mobilePreview: "/work-screenshots/art-academy-mobile.png"
  },
  {
    slug: "forma",
    title: "Forma",
    type: "Лендинг",
    description: "Премиальная посадочная страница с темной эстетикой, строгой сеткой и техническим визуалом.",
    stack: ["Лендинг", "Брендовый UI", "Анимации", "Адаптив"],
    url: "https://forma-premium-landing.vercel.app/",
    preview: "/work-screenshots/forma-desktop.png",
    mobilePreview: "/work-screenshots/forma-mobile.png"
  },
  {
    slug: "ad-architecture",
    title: "AD Architecture",
    type: "Сайт",
    description: "Сайт архитектурного проекта с портфолио, атмосферной графикой и премиальным ощущением.",
    stack: ["Архитектура", "Портфолио", "Анимации", "Адаптив"],
    url: "https://ad-architecture-landing.vercel.app/",
    preview: "/work-screenshots/ad-architecture-desktop.png",
    mobilePreview: "/work-screenshots/ad-architecture-mobile.png"
  },
  {
    slug: "ariton",
    title: "Ariton",
    type: "Веб-сервис",
    description: "Рабочий сервис на отдельном домене. Превью можно переснять скриптом, когда сайт отвечает стабильно.",
    stack: ["Веб-сервис", "Backend", "Бизнес-логика", "UI"],
    url: "https://ariton.ibachetka.ru/",
    preview: "/assets/works/work-01.png",
    mobilePreview: "/assets/works/work-01.png",
    fallbackPreview: "/assets/works/work-01.png"
  }
];
