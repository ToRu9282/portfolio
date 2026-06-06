import { useEffect, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { legalDocuments, type LegalDocumentType } from "../../data/legal";
import { ThemeToggle } from "../../components/ThemeToggle";
import type { ThemeMode } from "../../lib/theme";

export function LegalPage({
  type,
  theme,
  onThemeToggle
}: {
  type: LegalDocumentType;
  theme: ThemeMode;
  onThemeToggle: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const document = legalDocuments[type];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    window.document.title = `${document.title} — Tamerlan`;
  }, [document.title]);

  return (
    <main className="relative min-h-svh overflow-hidden bg-void px-5 py-6 text-white sm:px-8 lg:px-12">
      <div className="grid-layer absolute inset-0 opacity-25" />
      <div className="noise-layer" />
      <div className="absolute left-[-10%] top-[-8%] h-96 w-96 rounded-full bg-flame/15 blur-[130px]" />
      <div className="absolute right-[-8%] top-[20%] h-80 w-80 rounded-full bg-white/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1040px]">
        <motion.header
          initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="site-header-shell flex items-center justify-between gap-4 rounded-full border px-3 py-2 shadow-panel backdrop-blur-xl sm:px-5"
        >
          <a
            href="/"
            className="chrome-text inline-flex min-h-10 items-center gap-3 rounded-full border border-white/[0.14] px-4 py-2 text-[0.66rem] text-white/[0.78] transition hover:border-flame/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 text-flame" />
            Вернуться на сайт
          </a>
          <div className="flex items-center gap-3">
            <p className="chrome-text hidden text-[0.66rem] text-white/[0.45] sm:block">Документы</p>
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-10 rounded-[clamp(24px,3vw,40px)] border border-white/[0.12] bg-black/[0.38] p-5 shadow-panel backdrop-blur sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-6 border-b border-white/[0.1] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-flame/[0.42] bg-flame/[0.1] text-flame shadow-ember">
                <FileText size={20} />
              </div>
              <h1 className="metal-text mt-6 max-w-[860px] font-['Panton'] text-[clamp(2rem,5vw,4.6rem)] font-black leading-[0.98] tracking-normal">
                {document.title}
              </h1>
            </div>
            <p className="chrome-text text-[0.66rem] text-white/[0.42]">{type === "offer" ? "Договор-оферта" : "Персональные данные"}</p>
          </div>

          <p className="legal-page-lead mt-7 max-w-[820px] text-base leading-8 text-white/[0.68] sm:text-lg">{document.lead}</p>

          <div className="mt-10 grid gap-4">
            {document.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: Math.min(index * 0.025, 0.18), duration: 0.55, ease: "easeOut" }}
                className="legal-section rounded-[22px] border border-white/[0.1] bg-white/[0.035] p-5 sm:p-6"
              >
                <h2 className="font-['Stolzl'] text-lg uppercase leading-tight text-white sm:text-xl">{section.title}</h2>
                <div className="mt-5 grid gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-white/[0.64] sm:text-base sm:leading-8">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
