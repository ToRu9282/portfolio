import { faq, pricing, problems, processSteps, services } from "../../data/content";
import { links } from "../../config/links";
import { PrimaryLink } from "../../components/Buttons";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="noise-layer" />
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="02"
          label="Что я делаю"
          title={
            <>
              Сайты, боты и сервисы для заявок<span className="accent-dot" />
            </>
          }
          text="Не просто верстаю красиво. Помогаю упаковать продукт, собрать структуру, подключить формы, Telegram и понятный сценарий до заявки."
        />

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.045}>
              <article className="service-card group min-h-[190px] rounded-[24px] border border-white/[0.12] bg-white/[0.035] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-flame/[0.45] hover:bg-white/[0.06] sm:p-6">
                <service.icon className="h-7 w-7 text-flame" strokeWidth={1.35} />
                <h3 className="mt-7 font-['Stolzl'] text-xl uppercase leading-tight text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.6]">{service.text}</p>
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
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="absolute left-[-12%] top-[8%] h-72 w-72 rounded-full bg-flame/10 blur-[110px]" />
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="03"
          label="Почему сайт не продает"
          title={
            <>
              Красивого экрана мало<span className="accent-dot" />
            </>
          }
          text="У сайта должен быть маршрут: внимание, доверие, интерес и понятное действие. Иначе заявки просто не доходят."
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
            Я собираю сайт как маршрут: <span className="text-flame">внимание → доверие → интерес → заявка</span>.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="05"
          label="Как проходит работа"
          title={
            <>
              От идеи до рабочей заявки<span className="accent-dot" />
            </>
          }
          text="Сначала разбираю задачу, потом собираю структуру, делаю визуал, разрабатываю и проверяю в реальном сценарии клиента."
        />

        <div className="mt-9 grid gap-3 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.055}>
              <article className="group min-h-[205px] rounded-[24px] border border-white/[0.12] bg-black/[0.28] p-5 transition hover:border-flame/[0.42] hover:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-4">
                  <step.icon className="h-6 w-6 text-flame" strokeWidth={1.35} />
                  <span className="chrome-text text-[0.66rem] text-white/[0.28]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-7 font-['Stolzl'] text-base uppercase leading-tight text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/[0.58]">{step.text}</p>
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
    <section id="pricing" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="absolute right-[-12%] top-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="06"
          label="Форматы работы"
          title={
            <>
              Можно начать компактно или собрать систему<span className="accent-dot" />
            </>
          }
          text="Формат зависит от задачи: быстрый лендинг, сайт под ключ или связка сайта, бота и автоматизации."
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {pricing.map((tariff, index) => (
            <Reveal key={tariff.title} delay={index * 0.06}>
              <article className="glass-panel flex min-h-[430px] flex-col rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-flame/[0.45]">
                <p className="chrome-text text-[0.66rem] text-flame">{tariff.duration}</p>
                <h3 className="mt-5 font-['Stolzl'] text-2xl uppercase leading-tight text-white">{tariff.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.58]">{tariff.note}</p>
                <p className="display-text metal-text mt-7 text-[clamp(2.4rem,4vw,3.8rem)]">{tariff.price}</p>
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
  return (
    <section id="faq" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[980px]">
        <SectionIntro
          number="07"
          label="FAQ"
          align="center"
          title={
            <>
              Частые вопросы<span className="accent-dot" />
            </>
          }
        />

        <div className="mt-9 grid gap-3">
          {faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.035}>
              <details className="group rounded-[22px] border border-white/[0.12] bg-white/[0.03] p-5 open:border-flame/[0.35] open:bg-white/[0.05]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-['Stolzl'] text-base uppercase leading-tight text-white">
                  {item.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.15] text-flame transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[760px] text-sm leading-7 text-white/[0.62]">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
