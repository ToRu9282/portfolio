import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDot, Menu, X } from "lucide-react";
import { links } from "../config/links";
import { navItems } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full border border-white/10 bg-black/[0.56] px-3 py-2 shadow-panel backdrop-blur-xl sm:px-5">
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full border border-white/[0.15] px-3 py-2 text-sm font-bold text-white transition hover:border-flame/60 sm:px-5"
          aria-label="Вернуться к началу страницы"
          onClick={close}
        >
          <span className="font-mono text-base font-black tracking-tight">TAMERLAN</span>
          <span className="text-flame transition group-hover:rotate-45">
            <CircleDot size={14} />
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="chrome-text rounded-full px-3 py-2 text-[0.62rem] text-white/[0.74] transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={links.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="chrome-text group hidden items-center gap-2 rounded-full border border-white/[0.15] px-4 py-2 text-[0.65rem] text-white transition hover:border-flame/70 sm:inline-flex"
        >
          <span className="h-2 w-2 rounded-full bg-flame shadow-ember" />
          Обсудить проект
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] text-white lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mx-auto mt-2 max-w-[1180px] rounded-[22px] border border-white/[0.12] bg-black/[0.78] p-3 shadow-panel backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="chrome-text rounded-2xl border border-white/[0.08] px-5 py-3.5 text-[0.7rem] text-white/[0.78] transition hover:border-flame/40 hover:text-flame"
                  onClick={close}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={links.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="chrome-text mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-flame/70 px-5 py-3.5 text-[0.7rem] text-flame transition hover:bg-flame/10"
                onClick={close}
              >
                <span className="h-2 w-2 rounded-full bg-flame shadow-ember" />
                Обсудить проект
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
