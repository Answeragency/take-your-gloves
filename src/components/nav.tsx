"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type NavEvent = { slug: string; title: string };

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
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lastY = useRef(0);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      setHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 z-50 w-full border-b transition-[background,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-line bg-background/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "border-foreground/10 bg-background/70 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl}
              alt="Take Your Gloves"
              width={160}
              height={60}
              className="h-12 w-auto object-contain"
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
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                  >
                    <div className="min-w-[220px] overflow-hidden rounded-xl border border-line bg-background/98 shadow-2xl shadow-black/40 backdrop-blur-md">
                      <Link
                        href="/evenements"
                        className="flex items-center gap-2 border-b border-line px-4 py-3 font-display text-[10px] uppercase tracking-[0.2em] text-accent hover:bg-surface"
                      >
                        Calendrier 2026 →
                      </Link>
                      <div className="max-h-72 overflow-y-auto py-1" data-lenis-prevent>
                        {events.map((e) => (
                          <Link
                            key={e.slug}
                            href={`/evenements/${e.slug}`}
                            className="block px-4 py-2.5 text-xs text-foreground/70 transition-colors hover:bg-surface hover:text-foreground"
                          >
                            {e.title}
                          </Link>
                        ))}
                      </div>
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
            className="hidden rounded-full border border-foreground/25 px-5 py-2.5 font-display text-xs uppercase tracking-[0.02em] text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_18px_rgba(2,33,53,0.34)] lg:inline-block"
          >
            Nous contacter
          </Link>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 lg:hidden"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-px w-7 bg-foreground" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-px w-7 bg-foreground" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-px w-7 bg-foreground" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-6 py-24">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                <Link href="/evenements" className="font-display text-2xl uppercase tracking-tight text-foreground">
                  Événements
                </Link>
              </motion.div>
              {events.length > 0 && (
                <div className="flex flex-col items-center gap-2">
                  {events.map((e, i) => (
                    <motion.div key={e.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * (i + 1) }}>
                      <Link href={`/evenements/${e.slug}`} className="text-sm text-foreground/75 hover:text-foreground">
                        {e.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
              {staticLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * (i + events.length + 1) }}
                >
                  <Link href={link.href} className="font-display text-2xl uppercase tracking-tight text-foreground">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (staticLinks.length + events.length + 2) }}
              >
                <Link
                  href="/contact"
                  className="mt-4 rounded-full bg-accent-fill px-8 py-3.5 font-display text-sm uppercase tracking-[0.02em] text-foreground"
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
