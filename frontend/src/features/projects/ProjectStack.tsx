import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type PortfolioProject } from "../../data/projects";
import { BubbleText } from "../../components/BubbleText";
import { SectionIntro } from "../../components/SectionIntro";
import { cn } from "../../lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectStack() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-project-card]");
    if (cards.length === 0) return;

    gsap.set(cards, {
      opacity: 0,
      y: 80,
      rotateX: 10,
      scale: 0.92,
      transformPerspective: 1200,
      willChange: "transform, opacity",
    });

    const st = ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          stagger: { each: 0.08, from: "start" },
        });
      },
    });

    return () => st.forEach((t) => t.kill(true));
  }, []);

  return (
    <section id="work" className="relative overflow-hidden">
      <div className="noise-layer pointer-events-none" />
      <div className="relative z-10 px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <SectionIntro
            number="04"
            label="Портфолио"
              title={
                <>
                  <BubbleText text="Работы можно открыть прямо здесь" />
                  <span className="accent-dot" />
                </>
              }
            text="Кликните по проекту или по кнопке демо: откроется полноэкранный просмотр со скрином, мобильным видом, стеком и ссылкой на сайт."
          />
        </div>
      </div>

      <div className="relative z-10 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <div
            ref={gridRef}
            className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectPreviewModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: PortfolioProject;
  index: number;
  onOpen: () => void;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const onMove = (e: MouseEvent) => {
      const rect = img.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(img.querySelector("img"), {
        x: x * 12,
        y: y * 8,
        scale: 1.06,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(img.querySelector("img"), {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    img.addEventListener("mousemove", onMove);
    img.addEventListener("mouseleave", onLeave);
    return () => {
      img.removeEventListener("mousemove", onMove);
      img.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div data-project-card>
      <button type="button" onClick={onOpen} className="group w-full text-left">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-panel transition duration-500 hover:border-white/[0.16]">
          <div
            ref={imgRef}
            className="relative h-[220px] overflow-hidden sm:h-[280px]"
          >
            <img
              src={project.preview}
              alt={project.title}
              loading={index < 2 ? "eager" : "lazy"}
              className="h-full w-full object-cover object-top opacity-80 transition duration-700 group-hover:opacity-100"
              onError={(event) => {
                if (project.fallbackPreview) event.currentTarget.src = project.fallbackPreview;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="chrome-text text-[0.55rem] tracking-[0.15em] text-flame sm:text-[0.6rem]">
                  {project.type}
                </span>
                <h3 className="mt-1 truncate font-['Stolzl'] text-lg uppercase leading-tight text-white sm:text-xl">
                  {project.title}
                </h3>
              </div>
              <span className="shrink-0 display-text text-2xl leading-none text-white/[0.06] sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/[0.5] line-clamp-2 sm:text-base sm:leading-7">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[0.55rem] text-white/[0.4] sm:px-3 sm:py-1.5 sm:text-[0.6rem]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-flame transition group-hover:gap-2">
              <span className="chrome-text text-[0.55rem] tracking-[0.15em] sm:text-[0.6rem]">
                открыть демо
              </span>
              <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function ProjectPreviewModal({ project, onClose }: { project: PortfolioProject | null; onClose: () => void }) {
  const [liveMode, setLiveMode] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  useEffect(() => {
    if (!liveMode) return;

    const timeout = setTimeout(() => {
      if (!iframeLoaded) setIframeError(true);
    }, 12000);

    return () => clearTimeout(timeout);
  }, [liveMode, iframeLoaded]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="fixed inset-0 z-[10000] overflow-y-auto bg-black/[0.82] backdrop-blur-xl p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Демо проекта ${project.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="mx-auto min-h-full max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.88 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid min-h-dvh gap-0 rounded-2xl border border-white/[0.14] bg-[#080808] p-0 shadow-panel sm:min-h-[calc(100dvh-2rem)] sm:rounded-[28px] lg:rounded-[36px] xl:grid-cols-[minmax(0,1fr)_330px] xl:gap-4 xl:p-6">
            <div className="relative flex min-h-0 flex-col overflow-hidden rounded-none border-0 bg-black sm:rounded-2xl sm:border sm:border-white/[0.12] lg:rounded-[30px]">
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.1] bg-black/[0.76] px-2 py-1.5 backdrop-blur sm:px-3 sm:py-2.5 lg:px-4 lg:py-3">
                <div className="min-w-0">
                  <p className="chrome-text text-[0.5rem] text-flame sm:text-[0.55rem] lg:text-[0.62rem]">{project.type}</p>
                  <h3 className="truncate font-['Stolzl'] text-sm uppercase text-white sm:text-base lg:text-lg">{project.title}</h3>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLiveMode((p) => !p);
                      setIframeLoaded(false);
                      setIframeError(false);
                    }}
                    className={cn(
                      'chrome-text hidden rounded-full border px-2 py-0.5 text-[0.45rem] tracking-[0.15em] transition sm:px-2.5 sm:py-1 sm:text-[0.5rem] lg:px-3 lg:py-1.5 lg:text-[0.55rem] xl:inline-flex',
                      liveMode
                        ? 'border-flame/60 bg-flame/10 text-flame'
                        : 'border-white/[0.14] text-white/[0.5] hover:border-white/[0.3] hover:text-white'
                    )}
                  >
                    {liveMode ? 'скриншот' : 'live'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid h-7 w-7 place-items-center rounded-full border border-white/[0.14] text-white transition hover:border-flame hover:text-flame sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                    aria-label="Закрыть демо"
                  >
                    <X size={14} className="sm:size-4 lg:size-[18px]" />
                  </button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden xl:max-h-[80svh]">
                {liveMode && !iframeError ? (
                  <>
                    {!iframeLoaded && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#080808] sm:gap-4">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-flame/30 border-t-flame sm:h-8 sm:w-8" />
                        <span className="chrome-text text-[0.5rem] tracking-[0.15em] text-white/[0.35] sm:text-[0.55rem]">
                          загрузка демо...
                        </span>
                      </div>
                    )}
                    <iframe
                      ref={iframeRef}
                      src={project.url}
                      title={`Демо ${project.title}`}
                      className="h-full w-full bg-white"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      loading="lazy"
                      onLoad={() => {
                        setIframeLoaded(true);
                        setIframeError(false);
                      }}
                      onError={() => setIframeError(true)}
                    />
                  </>
                ) : (
                  <div className="flex h-full items-start overflow-y-auto">
                    {iframeError ? (
                      <div className="flex w-full flex-col items-center gap-3 px-4 py-12 text-center sm:gap-4 sm:px-6 sm:py-16">
                        <span className="chrome-text text-[0.55rem] tracking-[0.15em] text-white/[0.3] sm:text-[0.6rem]">
                          сайт не открывается в окне предпросмотра
                        </span>
                        <p className="max-w-[400px] text-xs leading-5 text-white/[0.4] sm:text-sm sm:leading-6">
                          Некоторые сайты блокируют встраивание через iframe. Откройте сайт напрямую.
                        </p>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="chrome-text inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-3 py-1.5 text-[0.5rem] tracking-[0.15em] text-white/[0.6] transition hover:border-white/[0.3] hover:text-white sm:px-4 sm:py-2 sm:text-[0.55rem]"
                        >
                          открыть в новой вкладке
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setIframeError(false);
                            setIframeLoaded(false);
                            setLiveMode(true);
                          }}
                          className="chrome-text mt-1 text-[0.45rem] tracking-[0.15em] text-flame/60 underline underline-offset-4 transition hover:text-flame sm:mt-2 sm:text-[0.5rem]"
                        >
                          попробовать снова
                        </button>
                      </div>
                    ) : (
                      <img
                        src={project.preview}
                        alt={`Полное превью проекта ${project.title}`}
                        className="w-full object-contain"
                        onError={(event) => {
                          if (project.fallbackPreview) event.currentTarget.src = project.fallbackPreview;
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <aside className="flex flex-col xl:gap-4">
              <div className="hidden xl:block">
                <div className="glass-panel rounded-2xl p-5">
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

                <div className="glass-panel mt-4 rounded-2xl p-4">
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
              </div>

              <div className="flex gap-2 bg-black/80 px-2 py-3 backdrop-blur sm:px-4 sm:py-4 xl:flex-col xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
                <button
                  type="button"
                  onClick={() => {
                    setLiveMode((p) => !p);
                    setIframeLoaded(false);
                    setIframeError(false);
                  }}
                  className={cn(
                    'chrome-text flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 py-3 text-[0.65rem] tracking-[0.15em] transition sm:min-h-14 sm:text-[0.7rem] lg:min-h-16 lg:text-[0.8rem]',
                    liveMode
                      ? 'border-white/[0.12] text-white/[0.5] hover:border-white/[0.3] hover:text-white'
                      : 'border-flame/60 bg-flame/10 text-flame hover:bg-flame/20'
                  )}
                >
                  {liveMode ? 'скриншот' : 'live'}
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="chrome-text flex-1 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-flame px-5 py-3 text-[0.65rem] text-white shadow-ember transition hover:scale-[1.02] sm:min-h-14 sm:text-[0.7rem] lg:min-h-16 lg:text-[0.8rem]"
                >
                  Перейти
                  <ExternalLink className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
                </a>
              </div>
            </aside>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
