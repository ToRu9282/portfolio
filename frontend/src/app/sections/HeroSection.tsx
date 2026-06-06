import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BubbleText } from "../../components/BubbleText";
import { Magnetic } from "../../components/Magnetic";
import { PrimaryLink } from "../../components/Buttons";
import { heroBadges, serviceTicker } from "../../data/content";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.18], ["0%", "14%"]);
  const ringY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-18%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-8%"]);

  return (
    <section id="top" className="hero-section relative min-h-svh overflow-hidden px-3 pb-3 pt-20 sm:px-6 sm:pb-6 sm:pt-24">
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

      <div className="hud-frame hero-hud-frame relative mx-auto min-h-[calc(100svh-6rem)] max-w-[1360px] overflow-hidden rounded-[clamp(18px,2.2vw,34px)]">
        <div className="hero-frame-wash absolute inset-0" />
        <HudRails />

        <motion.div
          style={{ y: ringY }}
          className="orbital-ring z-[1] left-[54%] top-[19%] hidden aspect-square w-[min(36vw,470px)] -translate-x-1/2 lg:block"
        />

        <motion.div
          style={{ y: imageY }}
          className="hero-portrait-frame pointer-events-none absolute bottom-[-9%] right-[-5%] z-10 w-[min(66vw,315px)] max-w-none overflow-visible opacity-90 sm:bottom-[-11%] sm:right-[-8%] sm:w-[min(58vw,430px)] md:right-[-6%] lg:bottom-[-7%] lg:right-[-4%] lg:w-[min(40vw,590px)] lg:opacity-100 xl:right-[1%]"
        >
          <div className="hero-portrait-halo" />
          <div className="hero-portrait-frontlight" />
          <div className="hero-portrait-rim" />
          <Magnetic strength={6} padding={180}>
            <img
              src="/assets/hero-tamerlan-cutout-clean.png"
              alt=""
              className="hero-portrait-image h-auto w-[calc(100%_+_8px)] max-w-none select-none object-contain -ml-[8px]"
              draggable={false}
            />
          </Magnetic>
        </motion.div>

        <div className="smoke z-20" />

        <div className="hero-content-shell relative z-30 flex min-h-[calc(100svh-6rem)] flex-col justify-between px-5 pb-4 pt-8 sm:px-10 sm:pb-6 md:px-14 lg:px-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_360px]">
            <motion.div
              className="hero-copy max-w-[700px] pt-[2svh] sm:pt-[4svh] xl:pt-[5svh]"
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="chrome-text mb-4 max-w-[360px] text-xs leading-relaxed text-white/[0.72] sm:mb-6">
                Тамерлан / сайты, боты, веб-сервисы
              </p>
              <h1 className="metal-text max-w-[720px] font-['Panton'] text-[clamp(2.1rem,4.55vw,4.85rem)] font-black leading-[0.98] tracking-normal">
                <BubbleText text="Сайт, который приводит заявки" />
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-7 text-white/[0.72] sm:text-lg sm:leading-8">
                Лендинги, сайты, боты и сервисы под ключ: структура, дизайн, форма и Telegram-уведомления.
              </p>

              <div className="hero-actions mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <PrimaryLink href="#contact">Получить расчет</PrimaryLink>
                <a
                  href="#work"
                  className="chrome-text group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/[0.14] px-6 py-3 text-[0.72rem] text-white transition hover:border-white/[0.32] hover:bg-white/[0.08]"
                >
                  Смотреть работы
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>

              <div className="hero-badges mt-6 flex max-w-[680px] flex-wrap gap-2">
                {heroBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/[0.12] bg-white/[0.045] px-3 py-2 text-sm text-white/[0.7] backdrop-blur">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>


          </div>

          <div className="hero-marquee relative z-40 -mx-5 mt-10 overflow-hidden border-t border-white/[0.12] bg-black/[0.34] py-4 sm:-mx-10 md:-mx-14 lg:-mx-20">
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
