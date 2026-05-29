import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Globe2, Plus, Sparkles } from "lucide-react";
import { Magnetic } from "../../components/Magnetic";
import { PrimaryLink } from "../../components/Buttons";
import { links } from "../../config/links";
import { heroBadges, serviceTicker } from "../../data/content";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.18], ["0%", "14%"]);
  const ringY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-18%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-8%"]);

  return (
    <section id="top" className="relative min-h-svh overflow-hidden px-3 pb-3 pt-20 sm:px-6 sm:pb-6 sm:pt-24">
      <div className="grid-layer absolute inset-0 opacity-35" />
      <div className="noise-layer" />
      <div className="scan-line" />
      <motion.div
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-flame/20 blur-[110px]"
        animate={{ x: [0, 42, -18, 0], y: [0, -20, 24, 0], scale: [1, 1.08, 0.94, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[22%] h-80 w-80 rounded-full bg-white/10 blur-[130px]"
        animate={{ x: [0, -34, 20, 0], y: [0, 26, -18, 0], scale: [1, 0.92, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="hud-frame relative mx-auto min-h-[calc(100svh-6rem)] max-w-[1360px] overflow-hidden rounded-[clamp(18px,2.2vw,34px)] bg-black/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(255,61,18,0.16),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_44%)]" />
        <HudRails />

        <motion.div
          style={{ y: ringY }}
          className="orbital-ring left-[52%] top-[21%] hidden aspect-square w-[min(36vw,470px)] -translate-x-1/2 lg:block"
        />

        <motion.div
          style={{ y: imageY }}
          className="pointer-events-none absolute bottom-0 right-[-8%] z-10 w-[min(50vw,660px)] max-w-none opacity-78 sm:right-[-5%] md:right-[1%]"
        >
          <Magnetic strength={6} padding={180}>
            <img
              src="/assets/hero-statue.png"
              alt=""
              className="h-auto w-full select-none object-contain [mask-image:linear-gradient(180deg,black_62%,transparent_96%)]"
              draggable={false}
            />
          </Magnetic>
        </motion.div>

        <div className="smoke z-20" />

        <div className="relative z-30 flex min-h-[calc(100svh-6rem)] flex-col justify-between px-5 pb-4 pt-8 sm:px-10 sm:pb-6 md:px-14 lg:px-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_360px]">
            <motion.div
              className="max-w-[700px] pt-[2svh] sm:pt-[4svh] xl:pt-[5svh]"
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="chrome-text mb-4 max-w-[360px] text-xs leading-relaxed text-white/[0.72] sm:mb-6">
                Тамерлан / сайты, боты, веб-сервисы
              </p>
              <h1 className="metal-text max-w-[720px] font-['Panton'] text-[clamp(2.1rem,4.55vw,4.85rem)] font-black leading-[0.98] tracking-normal">
                Создаю сайты, лендинги и Telegram-ботов, которые выглядят сильно и приводят заявки<span className="accent-dot" />
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-7 text-white/[0.72] sm:text-lg sm:leading-8">
                Разрабатываю визуально сильные сайты, веб-сервисы и автоматизации для бизнеса: от первого экрана до формы заявки, Telegram-уведомлений и админки.
              </p>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <PrimaryLink href="#work">Посмотреть работы</PrimaryLink>
                <a
                  href={links.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="chrome-text group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/[0.14] px-6 py-3 text-[0.72rem] text-white transition hover:border-white/[0.32] hover:bg-white/[0.08]"
                >
                  Обсудить проект
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-6 flex max-w-[680px] flex-wrap gap-2">
                {heroBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/[0.12] bg-white/[0.045] px-3 py-2 text-sm text-white/[0.7] backdrop-blur">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="ml-auto mt-[8svh] hidden w-full max-w-[300px] self-start rounded-3xl border border-white/10 bg-black/[0.28] p-5 backdrop-blur-lg xl:block"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.82, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-start gap-3">
                <Plus className="mt-1 h-4 w-4 text-flame" />
                <p className="chrome-text text-xs leading-7 text-white/[0.72]">
                  Структура
                  <br />
                  Дизайн
                  <br />
                  Код и заявки
                </p>
              </div>
              <div className="mt-6 grid gap-3">
                <div className="flex items-center gap-3 text-sm text-white/[0.7]">
                  <Globe2 className="h-4 w-4 text-flame" />
                  сайты под ключ
                </div>
                <div className="flex items-center gap-3 text-sm text-white/[0.7]">
                  <Bot className="h-4 w-4 text-flame" />
                  Telegram-боты
                </div>
                <div className="flex items-center gap-3 text-sm text-white/[0.7]">
                  <Sparkles className="h-4 w-4 text-flame" />
                  motion-интерфейсы
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative z-40 -mx-5 mt-10 overflow-hidden border-t border-white/[0.12] bg-black/[0.34] py-4 sm:-mx-10 md:-mx-14 lg:-mx-20">
            <div className="marquee-track flex items-center gap-7 whitespace-nowrap">
              {[...serviceTicker, ...serviceTicker, ...serviceTicker].map((item, index) => (
                <span key={`${item}-${index}`} className="chrome-text inline-flex items-center gap-7 text-sm text-white/[0.68]">
                  <span className="h-2.5 w-2.5 rounded-full bg-flame shadow-ember" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HudRails() {
  return (
    <>
      <div className="absolute left-5 top-[17%] z-20 hidden h-[58%] w-px bg-white/[0.15] sm:block">
        <span className="absolute -left-2 top-0 h-4 w-4 rounded-full border border-white/30" />
        <span className="chrome-text absolute -left-1 top-[calc(100%+1.4rem)] text-xs text-white">00</span>
      </div>
      <div className="absolute right-6 top-[20%] z-20 hidden text-right text-xs leading-8 text-white/[0.72] md:block">
        <p>ВЫС</p>
        <p>36.7°</p>
        <p className="mt-4">ДОЛ</p>
        <p>128.7°</p>
      </div>
      <div className="absolute left-5 top-[26%] z-20 hidden -rotate-90 text-[0.62rem] text-white/[0.44] sm:block">
        ПРОТОКОЛ-X
      </div>
    </>
  );
}
