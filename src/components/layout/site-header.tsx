"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, MessageCircle, Phone, Search } from "lucide-react";
import type { HeaderConfig, NavItem, SearchEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Emblem } from "@/components/ui/primitives";
import { SearchDialog } from "./search-dialog";

function isActive(pathname: string, item: NavItem, homeHref: string) {
  if (!pathname) return false;
  const paths = [item.href, ...(item.children?.map((c) => c.href.split("#")[0]) ?? [])];
  return paths.some((p) => p !== "/" && p !== homeHref && (pathname === p || pathname.startsWith(`${p}/`)));
}

type HeaderProps = { config: HeaderConfig; searchIndex: SearchEntry[] };

/** Reads the pathname; remounts the header on navigation so menus close automatically. */
export function SiteHeaderWithPath(props: HeaderProps) {
  const pathname = usePathname();
  return <SiteHeader key={pathname} pathname={pathname} {...props} />;
}

/**
 * `shell` renders a static placeholder (used as the Suspense fallback) without ids, menus or dialogs,
 * so the streamed real header never duplicates element ids in the document.
 */
export function SiteHeader({ pathname, config, searchIndex, shell = false }: HeaderProps & { pathname: string; shell?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setDropdown(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const openDropdown = useCallback((label: string) => {
    clearTimeout(closeTimer.current);
    setDropdown(label);
  }, []);
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(null), 140);
  }, []);

  // Solid (light) bar when scrolled or when the mobile menu is open; transparent over dark heroes otherwise.
  const solid = scrolled || menuOpen;
  // Over a light hero the transparent bar needs dark text.
  const onLight = !solid && !!config.lightHeroPaths?.includes(pathname);
  const lightUI = solid || onLight;
  // Controls floating over hero photos get a frosted backing so they stay legible on any image.
  const chip = solid
    ? "hover:bg-ink-950/5"
    : onLight
      ? "bg-white/85 ring-1 ring-ink-950/[0.08] backdrop-blur-md hover:bg-white"
      : "bg-ink-950/45 ring-1 ring-white/20 backdrop-blur-md hover:bg-ink-950/65";
  const { brand, announcement } = config;
  const showAnnouncement = !!announcement && pathname === brand.href && !solid;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3">
        {announcement && (
          <div className={cn("grid transition-[grid-template-rows,opacity] duration-300", showAnnouncement ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <Link
                href={announcement.href}
                tabIndex={showAnnouncement ? undefined : -1}
                className="group mb-2 flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-2 text-[0.78rem] font-medium text-ink-950 sm:text-sm"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-ink-950" aria-hidden />
                <span className="truncate">
                  <span className="sm:hidden">{announcement.short}</span>
                  <span className="hidden sm:inline">{announcement.text}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 font-semibold underline underline-offset-4">
                  {announcement.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        )}
        <div
          className={cn(
            "rounded-2xl transition-[background-color,box-shadow,color] duration-300",
            solid
              ? "bg-white/85 text-ink-950 shadow-[0_1px_0_rgba(15,15,15,0.06),0_12px_32px_-16px_rgba(15,15,15,0.25)] backdrop-blur-xl"
              : onLight
                ? "text-ink-950"
                : "text-white",
          )}
        >
          <div className="mx-auto flex h-16 max-w-[96rem] items-center justify-between gap-3 px-3 sm:px-6 xl:gap-6">
            {/* Brand */}
            <Link href={brand.href} className="flex min-w-0 items-center gap-3" aria-label={`${brand.subtitle} — Home`}>
              <Emblem className="size-10" preload />
              <span className="min-w-0 leading-tight">
                <span className="block font-display text-[0.95rem] font-semibold tracking-tight">{brand.title}</span>
                <span className={cn("block max-w-[11rem] truncate text-[0.68rem] sm:max-w-none", lightUI ? "text-ink-500" : "text-white/75")}>
                  <span className="sm:hidden xl:inline 2xl:hidden">{brand.subtitleShort}</span>
                  <span className="hidden sm:inline xl:hidden 2xl:inline">{brand.subtitle}</span>
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main" className="hidden shrink-0 xl:block">
              <ul
                className={cn(
                  "flex items-center gap-0.5 rounded-full border p-1 transition-colors",
                  solid
                    ? "border-ink-950/[0.06] bg-ink-950/[0.03]"
                    : onLight
                      ? "border-ink-950/[0.08] bg-white/85 backdrop-blur-md"
                      : "border-white/20 bg-ink-950/45 backdrop-blur-md",
                )}
              >
                {config.nav.map((item) => {
                  const active = isActive(pathname, item, brand.href);
                  const itemClass = cn(
                    "flex h-9 items-center gap-1 rounded-full px-3 text-[0.82rem] font-medium whitespace-nowrap transition-colors 2xl:px-4",
                    active
                      ? lightUI
                        ? "bg-ink-950 text-white"
                        : "bg-white text-ink-950"
                      : lightUI
                        ? "text-ink-700 hover:bg-ink-950/5 hover:text-ink-950"
                        : "text-white/90 hover:bg-white/15 hover:text-white",
                  );
                  if (!item.children) {
                    return (
                      <li key={item.label}>
                        <Link href={item.href} className={itemClass} aria-current={active ? "page" : undefined}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const open = dropdown === item.label;
                  const panelId = `nav-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
                  return (
                    <li key={item.label} className="relative" onMouseEnter={() => openDropdown(item.label)} onMouseLeave={scheduleClose}>
                      <button
                        type="button"
                        className={itemClass}
                        aria-expanded={open}
                        aria-controls={shell ? undefined : panelId}
                        onClick={() => (open ? setDropdown(null) : openDropdown(item.label))}
                      >
                        {item.label}
                        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
                      </button>
                      <div
                        id={shell ? undefined : panelId}
                        className={cn(
                          "absolute top-full left-1/2 w-[23rem] -translate-x-1/2 pt-3 transition-[opacity,translate] duration-200",
                          open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
                        )}
                      >
                        <ul className="rounded-2xl border border-ink-950/[0.06] bg-white p-2 text-ink-950 shadow-[0_24px_60px_-20px_rgba(15,15,15,0.35)]">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-paper"
                                onClick={() => setDropdown(null)}
                              >
                                <span>
                                  <span className="block text-sm font-semibold">{child.label}</span>
                                  {child.description && <span className="mt-0.5 block text-[0.8rem] text-ink-500">{child.description}</span>}
                                </span>
                                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-300 transition-all group-hover:text-gold-600" aria-hidden />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cn("flex h-10 items-center gap-2 rounded-full px-3 text-sm transition-colors", chip)}
                aria-label="Search the website"
              >
                <Search className="size-[1.1rem]" aria-hidden />
                <kbd className={cn("hidden rounded-md border px-1.5 py-0.5 font-sans text-[0.65rem] 2xl:inline", lightUI ? "border-ink-950/10 text-ink-500" : "border-white/25 text-white/75")}>
                  Ctrl K
                </kbd>
              </button>
              <Link
                href={config.contactHref}
                className={cn(
                  "hidden h-10 items-center rounded-full border px-4 text-[0.82rem] font-medium whitespace-nowrap transition-colors lg:flex",
                  solid ? "border-ink-950/10 hover:bg-ink-950/5" : cn("border-transparent", chip),
                )}
              >
                Contact
              </Link>
              <Link
                href={config.cta.href}
                className="hidden h-10 items-center gap-1.5 rounded-full bg-gold-400 px-4 text-[0.82rem] font-semibold whitespace-nowrap text-ink-950 transition-colors hover:bg-gold-300 sm:flex"
              >
                {config.cta.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
              <button
                type="button"
                className={cn("grid size-10 place-items-center rounded-full transition-colors xl:hidden", lightUI ? "bg-ink-950 text-white" : "bg-white text-ink-950")}
                aria-expanded={menuOpen}
                aria-controls={shell ? undefined : "mobile-menu"}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="relative block h-3 w-4" aria-hidden>
                  <span className={cn("absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300", menuOpen ? "top-1.5 rotate-45" : "top-0")} />
                  <span className={cn("absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300", menuOpen ? "top-1.5 -rotate-45" : "top-[0.7rem]")} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {!shell && (
        <>
      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        config={config}
        onNavigate={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} index={searchIndex} />
        </>
      )}
    </>
  );
}

function MobileMenu({
  open,
  pathname,
  config,
  onNavigate,
  onSearch,
}: {
  open: boolean;
  pathname: string;
  config: HeaderConfig;
  onNavigate: () => void;
  onSearch: () => void;
}) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 overflow-y-auto bg-paper transition-[opacity,visibility] duration-300 xl:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <div className={cn("mx-auto max-w-2xl px-5 pt-24 pb-12 transition-transform duration-500 ease-(--ease-soft)", open ? "translate-y-0" : "translate-y-4")}>
        <button
          type="button"
          onClick={onSearch}
          className="flex h-13 w-full items-center gap-3 rounded-2xl border border-line bg-white px-4 text-left text-ink-400"
        >
          <Search className="size-5" aria-hidden />
          Search courses, notices, pages…
        </button>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {config.quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-4 text-[0.95rem] font-semibold transition-colors",
                pathname.startsWith(q.href.split("#")[0]) && q.href !== config.brand.href ? "bg-ink-950 text-white" : "bg-white text-ink-950 active:bg-paper-2",
              )}
            >
              {q.label}
              <ArrowUpRight className="size-4 opacity-50" aria-hidden />
            </Link>
          ))}
        </div>

        {config.crossLink && (
          <Link
            href={config.crossLink.href}
            onClick={onNavigate}
            className="mt-2 flex items-center gap-4 rounded-2xl bg-ink-950 p-4 text-white"
          >
            <Emblem className="size-10" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.95rem] font-semibold">{config.crossLink.label}</span>
              {config.crossLink.description && <span className="block text-[0.78rem] text-white/60">{config.crossLink.description}</span>}
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-gold-400" aria-hidden />
          </Link>
        )}

        <nav aria-label="Mobile" className="mt-8 space-y-8">
          {config.nav
            .filter((g) => g.children)
            .map((group) => (
              <div key={group.label}>
                <p className="px-1 text-[0.7rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">{group.label}</p>
                <ul className="mt-2 divide-y divide-line rounded-2xl bg-white">
                  {group.children!.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="flex items-center justify-between gap-4 px-4 py-3.5"
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        <span>
                          <span className="block text-[0.95rem] font-medium text-ink-950">{link.label}</span>
                          {link.description && <span className="block text-[0.78rem] text-ink-500">{link.description}</span>}
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-ink-300" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </nav>

        <div className="mt-8 rounded-2xl bg-ink-950 p-5 text-white">
          <p className="font-display text-lg font-medium">Need help choosing a course?</p>
          <p className="mt-1 text-sm text-white/60">Talk to the admissions office.</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-medium">
            <a href={config.contact.phoneHref} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 py-3">
              <Phone className="size-4" aria-hidden /> Call
            </a>
            <a href={config.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 py-3">
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
            <a href={`mailto:${config.contact.email}`} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 py-3">
              <Mail className="size-4" aria-hidden /> Email
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
