import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { aboutPrinciples, aboutStats, faq, pricing, problems, processSteps, services } from "../../data/content";
import { links } from "../../config/links";
import { PrimaryLink } from "../../components/Buttons";
import { BubbleText } from "../../components/BubbleText";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";

export function ServicesSection() {
  return (
    <section id="services" className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="noise-layer" />
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="02"
          label="Что я делаю"
          title={
            <>
              <BubbleText text="Разработка под заявки" />
            </>
          }
          text="Упаковка, дизайн, разработка и отправка лидов в Telegram."
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.045}>
              <article className="service-card compact-card group min-h-[150px] rounded-[20px] border border-white/[0.12] bg-white/[0.035] p-4 backdrop-blur transition hover:-translate-y-1 hover:border-flame/[0.45] hover:bg-white/[0.06] sm:min-h-[180px] sm:rounded-[24px] sm:p-5 lg:min-h-[205px] lg:p-6">
                <service.icon className="h-6 w-6 text-flame sm:h-7 sm:w-7" strokeWidth={1.35} />
                <h3 className="mt-5 font-['Stolzl'] text-lg uppercase leading-tight text-white sm:mt-6 sm:text-xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.6] sm:mt-4 sm:leading-7">{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,61,18,0.13),transparent_28%),linear-gradient(180deg,transparent,rgba(255,255,255,0.025),transparent)]" />
      <div className="noise-layer" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionIntro
            number="03"
            label="Обо мне"
            title={
              <>
                <BubbleText text="Сайты, которые помогают получать заявки" />
              </>
            }
            text="Не просто рисую красивый дизайн, а собираю готовый инструмент для продаж: продумываю структуру, запускаю сайт и подключаю прием обращений."
          />

          <Reveal delay={0.08}>
            <div className="about-note rounded-[28px] border border-flame/[0.28] bg-flame/[0.08] p-5 sm:p-6">
              <p className="chrome-text text-[0.66rem] text-flame">Фокус работы</p>
              <p className="mt-4 text-lg leading-8 text-white sm:text-xl">
                Сайт должен быстро объяснять ценность, вызывать доверие и вести клиента к понятному действию.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-3 lg:grid-cols-3">
          {aboutStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.055}>
              <article className="trust-card group min-h-[260px] rounded-[26px] border border-white/[0.12] bg-black/[0.3] p-5 transition hover:-translate-y-1 hover:border-flame/[0.45] hover:bg-white/[0.045] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <stat.icon className="h-7 w-7 text-flame" strokeWidth={1.35} />
                  <span className="chrome-text text-[0.62rem] text-white/[0.28]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="metal-text mt-7 font-['Panton'] text-[clamp(2.7rem,6vw,4.6rem)] font-black leading-none">{stat.value}</p>
                <h3 className="mt-4 font-['Stolzl'] text-lg uppercase leading-tight text-white">{stat.label}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.62]">{stat.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {aboutPrinciples.map((item, index) => (
            <Reveal key={item.title} delay={0.14 + index * 0.045}>
              <article className="rounded-[22px] border border-white/[0.1] bg-white/[0.035] p-5 backdrop-blur">
                <h3 className="font-['Stolzl'] text-base uppercase leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.58]">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[8%] h-72 w-72 rounded-full bg-flame/10 blur-[110px]" />
      </div>
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="04"
          label="Почему сайт не продает"
          title={
            <>
              <BubbleText text="Сайт должен вести к действию" />
            </>
          }
          text="Меньше лишнего текста. Больше ясности, доверия и кликов."
        />

        <div className="mt-9 grid gap-3 md:grid-cols-4">
          {problems.map((problem, index) => (
            <Reveal key={problem.title} delay={index * 0.05}>
              <article className="glass-panel min-h-[180px] rounded-[22px] p-5">
                <problem.icon className="h-6 w-6 text-white/[0.82]" strokeWidth={1.35} />
                <h3 className="mt-6 font-['Stolzl'] text-base uppercase leading-tight text-white">{problem.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/[0.58]">{problem.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6 rounded-[24px] border border-flame/[0.28] bg-flame/[0.08] p-5 text-base leading-8 text-white sm:p-6 sm:text-lg">
            Маршрут страницы: <span className="text-flame">оффер → доверие → действие → заявка</span>.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="06"
          label="Как проходит работа"
          title={
            <>
              <BubbleText text="Быстрый путь к запуску" />
            </>
          }
          text="Без долгих созвонов и сложного ТЗ: задача, структура, дизайн, разработка, запуск."
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.055}>
              <article className="process-card compact-card group min-h-[165px] rounded-[20px] border border-white/[0.12] bg-black/[0.28] p-4 transition hover:border-flame/[0.42] hover:bg-white/[0.04] sm:min-h-[210px] sm:rounded-[24px] sm:p-5 lg:min-h-[255px]">
                <div className="flex items-center justify-between gap-4">
                  <step.icon className="h-6 w-6 text-flame" strokeWidth={1.35} />
                  <span className="chrome-text text-[0.66rem] text-white/[0.28]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-['Stolzl'] text-base uppercase leading-tight text-white sm:mt-6">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.58] sm:mt-4">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-[-12%] top-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="07"
          label="Форматы работы"
          title={
            <>
              <BubbleText text="Выбери формат запуска" />
            </>
          }
          text="От компактного лендинга до сайта с ботом и автоматизацией."
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {pricing.map((tariff, index) => (
            <Reveal key={tariff.title} delay={index * 0.06}>
              <article className="glass-panel flex min-h-[560px] flex-col rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-flame/[0.45]">
                <p className="chrome-text text-[0.66rem] text-flame">{tariff.duration}</p>
                <h3 className="mt-5 font-['Stolzl'] text-2xl uppercase leading-tight text-white">{tariff.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.58]">{tariff.note}</p>
                <p className="display-text metal-text mt-7 whitespace-nowrap text-[clamp(1.6rem,3.5vw,2rem)] leading-[1.2] py-1">{tariff.price}</p>
                <ul className="mt-7 grid gap-3">
                  {tariff.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-white/[0.68]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame shadow-ember" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <PrimaryLink href={links.telegramUrl} target="_blank" rel="noreferrer" className="mt-auto w-fit">
                  Обсудить
                </PrimaryLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[980px]">
        <SectionIntro
          number="08"
          label="FAQ"
          align="center"
          title={
            <>
              <BubbleText text="Частые вопросы" />
            </>
          }
        />

        <div className="mt-9 grid gap-3">
          {faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.035}>
              <div
                className={`cursor-pointer rounded-[22px] border p-5 transition-colors duration-300 ${
                  openIndex === index
                    ? "border-flame/[0.35] bg-white/[0.05]"
                    : "border-white/[0.12] bg-white/[0.03]"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-['Stolzl'] text-base uppercase leading-tight text-white">
                    {item.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.15] text-flame"
                  >
                    +
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 max-w-[760px] text-sm leading-7 text-white/[0.62]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
