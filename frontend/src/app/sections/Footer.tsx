import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUp, Mail, MessageCircle, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links } from "../../config/links";
import { serviceTicker } from "../../data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || compact) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 46, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 25%",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        linksRef.current?.children ?? [],
        { y: 18 },
        {
          y: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 58%",
            end: "top 20%",
            scrub: 1
          }
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={rootRef} className="cinematic-footer-wrapper relative min-h-[92svh] overflow-hidden bg-black px-5 py-16 sm:px-8 lg:px-12">
      <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[82vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[90px]" />
      <div className="footer-bg-grid pointer-events-none absolute inset-0" />
      <div className="footer-giant-bg-text pointer-events-none absolute bottom-[5vh] left-1/2 -translate-x-1/2 select-none whitespace-nowrap">
        TAMERLAN
      </div>

      <div className="absolute left-0 top-10 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/[0.12] bg-black/[0.62] py-4 shadow-panel backdrop-blur">
        <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-white/[0.56]">
          {[...serviceTicker, ...serviceTicker, ...serviceTicker, ...serviceTicker].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8 px-4">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-ember" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[72svh] max-w-[980px] flex-col items-center justify-center pt-20 text-center">
        <p className="chrome-text text-xs text-white/[0.52]">Финальный шаг</p>
        <h2 ref={titleRef} className="footer-text-glow mt-6 max-w-[860px] font-['Panton'] text-[clamp(2rem,5.4vw,5.8rem)] font-black leading-[1.06] tracking-normal">
          Нужен сайт, который приводит заявки?
        </h2>
        <p className="mt-7 max-w-[640px] text-base leading-8 text-white/[0.68] sm:text-lg">
          Напиши мне — подберу формат, сроки и понятный план запуска.
        </p>

        <div ref={linksRef} className="mt-9 flex flex-wrap justify-center gap-3">
          <MagneticFooterLink href={links.telegramUrl} label="Написать в Telegram" icon={<MessageCircle size={18} />} />
          <MagneticFooterLink href="#work" label="Посмотреть работы" />
          <MagneticFooterLink href={links.whatsappUrl} label={links.phone} icon={<Phone size={18} />} />
          <MagneticFooterLink href={links.emailUrl} label={links.email} icon={<Mail size={18} />} />
        </div>
      </div>

      <div className="relative z-20 mx-auto grid max-w-[1180px] gap-5 border-t border-white/[0.12] pt-6 text-sm text-white/[0.52] lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div>
          <p className="chrome-text text-[0.68rem]">© 2026 Тамерлан. Сайты / боты / веб-сервисы</p>
          <p className="mt-2 text-sm leading-6 text-white/[0.42]">ИНН: 542200280252</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center">
          <a href="/offer" className="font-semibold text-flame transition hover:text-white">
            Договор-оферта
          </a>
          <a href="/privacy" className="font-semibold text-flame transition hover:text-white">
            Политика обработки персональных данных
          </a>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer-glass-pill grid h-12 w-12 place-items-center rounded-full text-white/[0.72] transition hover:text-white lg:ml-auto"
          aria-label="Наверх"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}

function MagneticFooterLink({ href, label, icon }: { href: string; label: string; icon?: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(element, { x: x * 0.18, y: y * 0.18, scale: 1.035, duration: 0.28, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(element, { x: 0, y: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.35)" });
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);
    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const external = href.startsWith("http") || href.startsWith("mailto");

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="footer-glass-pill inline-flex min-h-12 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white/[0.82]"
    >
      {icon}
      {label}
    </a>
  );
}
