import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Maximize2, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type PortfolioProject } from "../../data/projects";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectStack() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    if (reduced || !desktop) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-flow-section]"));
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const inner = section.querySelector<HTMLElement>("[data-flow-inner]");
        if (!inner) return;

        gsap.set(section, { zIndex: index + 1 });

        if (index > 0) {
          gsap.set(inner, { rotation: 17, y: 80, transformOrigin: "bottom left" });
          const tween = gsap.to(inner, {
            rotation: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 30%",
              scrub: true
            }
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (index < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: true
            })
          );
        }
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section id="work" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="noise-layer" />
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          number="04"
          label="Портфолио"
          title={
            <>
              Работы можно открыть прямо здесь<span className="accent-dot" />
            </>
          }
          text="Кликните по проекту или по кнопке демо: откроется полноэкранный просмотр со скрином, мобильным видом, стеком и ссылкой на сайт."
        />
      </div>

      <div ref={containerRef} className="mx-auto mt-9 max-w-[1180px] overflow-visible">
        {projects.map((project, index) => (
          <FlowProjectSection key={project.slug} project={project} index={index} onOpen={() => setActiveProject(project)} />
        ))}
      </div>

      <ProjectPreviewModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

function FlowProjectSection({
  project,
  index,
  onOpen
}: {
  project: PortfolioProject;
  index: number;
  onOpen: () => void;
}) {
  return (
    <article data-flow-section className="relative min-h-[74vh] overflow-visible py-3 md:min-h-[92vh]">
      <div
        data-flow-inner
        className="project-flow-card grid min-h-[68vh] gap-5 overflow-hidden rounded-[30px] border border-white/[0.14] bg-[#090909] p-4 shadow-panel will-change-transform sm:p-6 md:grid-cols-[0.92fr_1.08fr] md:rounded-[38px] md:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,61,18,0.14),transparent_28%),radial-gradient(circle_at_85%_40%,rgba(255,255,255,0.07),transparent_24%)]" />
        <div className="relative z-10 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="display-text text-[clamp(3.3rem,8vw,7rem)] text-white/[0.16]">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-16 w-px bg-white/[0.12]" />
              <div>
                <p className="chrome-text text-[0.66rem] text-flame">{project.type}</p>
                <h3 className="mt-2 font-['Stolzl'] text-[clamp(2rem,4.5vw,4.8rem)] uppercase leading-none text-white">
                  {project.title}
                </h3>
              </div>
            </div>
            <p className="mt-6 max-w-[620px] text-base leading-8 text-white/[0.64]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs text-white/[0.68]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="chrome-text group inline-flex min-h-11 items-center gap-3 rounded-full border border-flame/70 px-5 py-3 text-[0.68rem] text-flame shadow-ember transition hover:bg-flame hover:text-white"
            >
              Смотреть демо
              <Maximize2 className="h-4 w-4" />
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="chrome-text group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/[0.16] px-5 py-3 text-[0.68rem] text-white transition hover:border-white/[0.36] hover:bg-white/[0.08]"
            >
              Открыть сайт
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="group relative z-10 min-h-[330px] overflow-hidden rounded-[24px] border border-white/[0.12] bg-black/[0.28] text-left md:min-h-[520px] md:rounded-[32px]"
          aria-label={`Смотреть демо проекта ${project.title}`}
        >
          <img
            src={project.preview}
            alt={`Превью проекта ${project.title}`}
            loading={index < 2 ? "eager" : "lazy"}
            className="h-full w-full object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
            onError={(event) => {
              if (project.fallbackPreview) event.currentTarget.src = project.fallbackPreview;
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.76))]" />
          <span className="chrome-text absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/[0.58] px-4 py-3 text-[0.65rem] text-white backdrop-blur">
            открыть демо <ExternalLink className="h-4 w-4 text-flame" />
          </span>
        </button>
      </div>
    </article>
  );
}

function ProjectPreviewModal({ project, onClose }: { project: PortfolioProject | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-y-auto bg-black/[0.82] p-3 backdrop-blur-xl sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`Демо проекта ${project.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="mx-auto grid min-h-[calc(100svh-1.5rem)] max-w-[1280px] gap-4 rounded-[28px] border border-white/[0.14] bg-[#080808] p-4 shadow-panel sm:min-h-[calc(100svh-2.5rem)] sm:rounded-[36px] sm:p-6 lg:grid-cols-[minmax(0,1fr)_330px]"
            initial={{ y: 34, scale: 0.96, filter: "blur(10px)" }}
            animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ y: 24, scale: 0.97, filter: "blur(10px)" }}
            transition={{ duration: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-white/[0.12] bg-black sm:rounded-[30px]">
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.1] bg-black/[0.76] px-4 py-3 backdrop-blur">
                <div>
                  <p className="chrome-text text-[0.62rem] text-flame">{project.type}</p>
                  <h3 className="font-['Stolzl'] text-lg uppercase text-white">{project.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.14] text-white transition hover:border-flame hover:text-flame"
                  aria-label="Закрыть демо"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-[74svh] overflow-y-auto">
                <img
                  src={project.preview}
                  alt={`Полное превью проекта ${project.title}`}
                  className="w-full object-contain"
                  onError={(event) => {
                    if (project.fallbackPreview) event.currentTarget.src = project.fallbackPreview;
                  }}
                />
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <div className="glass-panel rounded-[24px] p-5">
                <p className="chrome-text text-[0.64rem] text-flame">Задача</p>
                <p className="mt-4 text-sm leading-7 text-white/[0.64]">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/[0.12] px-3 py-2 text-xs text-white/[0.68]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-[24px] p-4">
                <p className="chrome-text mb-3 text-[0.64rem] text-flame">Мобильный вид</p>
                <div className="mx-auto max-h-[360px] max-w-[190px] overflow-hidden rounded-[22px] border border-white/[0.14] bg-black">
                  <img
                    src={project.mobilePreview}
                    alt={`Мобильное превью проекта ${project.title}`}
                    className="w-full object-cover object-top"
                    onError={(event) => {
                      if (project.fallbackPreview) event.currentTarget.src = project.fallbackPreview;
                    }}
                  />
                </div>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="chrome-text group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-flame px-6 py-3 text-[0.72rem] text-white shadow-ember transition hover:scale-[1.02]"
              >
                Перейти на сайт
                <ExternalLink className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </aside>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
