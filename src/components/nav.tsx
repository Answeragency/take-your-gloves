"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type NavEvent = { slug: string; title: string; dateLabel?: string; location?: string };

const staticLinks = [
  { href: "/galerie", label: "Galerie" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/a-propos", label: "À propos" },
  { href: "/temoignages", label: "Témoignages" },
];

export default function Nav({
  logoUrl = "/images/logo.png",
  events = [],
}: {
  logoUrl?: string;
  events?: NavEvent[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- referme le menu à chaque changement de page
  useEffect(() => { setOpen(false); setDropdownOpen(false); }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const eventsActive = pathname.startsWith("/evenements");

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-[background,border-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "border-line bg-background/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center">
            <Image
              quality={90}
              src={logoUrl}
              alt="Take Your Gloves"
              width={160}
              height={60}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {/* Événements with dropdown */}
            <li ref={dropdownRef} className="relative">
              <button
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onClick={() => setDropdownOpen((v) => !v)}
                className={`group relative flex items-center gap-1 font-display text-xs uppercase tracking-[0.02em] transition-colors duration-200 ${
                  eventsActive ? "text-accent" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Événements
                <svg
                  className={`h-2.5 w-2.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 10 6" fill="none"
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${eventsActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.99 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                  >
                    <div className="w-[min(680px,92vw)] origin-top rounded-2xl border border-line bg-background/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
                      <Link
                        href="/evenements"
                        className="group flex items-center justify-between gap-4 rounded-xl bg-accent/10 px-5 py-4 transition-colors hover:bg-accent/20"
                      >
                        <span>
                          <span className="block font-display text-sm uppercase tracking-[0.15em] text-foreground">
                            Calendrier 2027
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            {events.length} rendez-vous, rallyes, circuits et expériences
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-accent group-hover:text-background"
                        >
                          →
                        </span>
                      </Link>
                      <ul className="mt-2 grid grid-cols-2 gap-1">
                        {events.map((e, i) => {
                          const current = pathname === `/evenements/${e.slug}`;
                          return (
                            <motion.li
                              key={e.slug}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, delay: 0.03 + i * 0.015, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <Link
                                href={`/evenements/${e.slug}`}
                                aria-current={current ? "page" : undefined}
                                className={`group/item flex h-full items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-surface ${
                                  current ? "bg-surface" : ""
                                }`}
                              >
                                <span className="min-w-0">
                                  <span
                                    className={`block text-sm leading-snug transition-colors ${
                                      current ? "text-accent" : "text-foreground group-hover/item:text-foreground"
                                    }`}
                                  >
                                    {e.title}
                                  </span>
                                  {(e.dateLabel || e.location) && (
                                    <span className="mt-1 block text-xs leading-snug text-muted">
                                      {[e.dateLabel, e.location].filter(Boolean).join(" · ")}
                                    </span>
                                  )}
                                </span>
                                <span
                                  aria-hidden
                                  className="mt-0.5 -translate-x-1 text-accent opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                >
                                  →
                                </span>
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {staticLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative font-display text-xs uppercase tracking-[0.02em] transition-colors duration-200 ${
                      active ? "text-accent" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="hidden rounded-full border border-foreground/25 px-5 py-2.5 font-display text-xs uppercase tracking-[0.02em] text-white transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_18px_rgba(49,82,140,0.34)] lg:inline-block"
          >
            Nous contacter
          </Link>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-3 flex flex-col gap-1.5 p-3 lg:hidden"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-px w-7 bg-foreground" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-px w-7 bg-foreground" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-px w-7 bg-foreground" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background lg:hidden"
          >
            {/* my-auto : centré quand ça tient, défilable (sans rogner le haut) sur les petits écrans */}
            <div className="my-auto flex flex-col items-center gap-9 px-6 pb-14 pt-28 text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <Link href="/evenements" className="py-2 font-display text-2xl uppercase tracking-tight text-white">
                  Événements
                </Link>
                {events.length > 0 && (
                  <ul className="mt-3 flex flex-col items-center gap-0.5 border-t border-line pt-3">
                    {events.map((e) => (
                      <li key={e.slug}>
                        <Link
                          href={`/evenements/${e.slug}`}
                          className="block px-2 py-2 text-sm text-foreground/80 hover:text-white"
                        >
                          {e.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              {staticLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * (i + 1) }}
                >
                  <Link href={link.href} className="block py-2 font-display text-2xl uppercase tracking-tight text-white">
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (staticLinks.length + 1) }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-accent-fill px-10 py-4 font-display text-sm uppercase tracking-[0.05em] text-white"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
