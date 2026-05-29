import type { ReactNode } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { contactChannels } from "../../data/content";
import { links } from "../../config/links";
import { ContactForm } from "../../features/contact/ContactForm";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { BubbleText } from "../../components/BubbleText";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="grid-layer absolute inset-0 opacity-18" />
      <div className="noise-layer" />
      <div className="absolute left-[14%] top-[16%] h-80 w-80 rounded-full bg-flame/15 blur-[120px]" />
      <div className="absolute right-[6%] bottom-[4%] h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <SectionIntro
          number="08"
          label="Контакты"
          title={
            <>
              <BubbleText text="Расскажи, что нужно сделать" />
              <span className="accent-dot" />
            </>
          }
          text="Я предложу формат: лендинг, сайт, Telegram-бот или связку под ключ. Можно написать сразу в Telegram или оставить заявку в форме."
        />

        <div className="mt-9 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {contactChannels.map((channel) => (
                  <article key={channel.title} className="glass-panel rounded-2xl p-4">
                    <channel.icon className="h-5 w-5 text-flame" strokeWidth={1.5} />
                    <h3 className="mt-4 chrome-text text-[0.68rem] text-white">{channel.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/[0.58]">{channel.value}</p>
                  </article>
                ))}
              </div>

              <div className="glass-panel rounded-[24px] p-5">
                <h3 className="font-['Stolzl'] text-lg uppercase text-white">Прямые контакты</h3>
                <div className="mt-5 grid gap-3">
                  <ContactLink href={links.telegramUrl} label={`@${links.telegramUsername}`} icon={<MessageCircle size={18} />} />
                  <ContactLink href={links.whatsappUrl} label={links.phone} icon={<Phone size={18} />} />
                  <ContactLink href={links.emailUrl} label={links.email} icon={<Mail size={18} />} />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.035] px-4 py-3 text-sm text-white/[0.72] transition hover:border-flame/[0.45] hover:text-white"
    >
      <span className="text-flame">{icon}</span>
      {label}
    </a>
  );
}
