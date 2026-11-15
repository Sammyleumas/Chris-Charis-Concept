"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { mainNav, type NavItem } from "@/config/navigation";
import type { ProjectFamily } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/cn";

type MenuFamily = Pick<ProjectFamily, "slug" | "name" | "year" | "line">;

export function SiteHeader({ families }: { families: MenuFamily[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Escape closes; clicking outside closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const isActive = (item: NavItem) =>
    pathname === item.href || pathname.startsWith(item.href + "/") ||
    (item.href === "/media" && pathname.startsWith("/news")) ||
    (item.href === "/get-involved" && pathname.startsWith("/donate"));

  const solid = scrolled || open !== null;

  const enter = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid ? "bg-ink/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded bg-white px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="shrink-0 rounded-sm" aria-label="Chris Charis Concept, home">
          <Logo tone="light" />
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const hasMenu = item.mega || item.children;
              const active = isActive(item);
              const expanded = open === item.label;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={hasMenu ? () => enter(item.label) : undefined}
                  onMouseLeave={hasMenu ? leave : undefined}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "relative rounded-sm px-2.5 py-2 text-[0.84rem] font-medium transition-colors",
                        active ? "text-white" : "text-white/75 hover:text-white",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span aria-hidden="true" className="absolute inset-x-2.5 -bottom-0.5 h-0.5 bg-brand" />
                      )}
                    </Link>
                    {hasMenu && (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`menu-${item.label}`}
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpen(expanded ? null : item.label)}
                        className="-ml-1.5 rounded-sm p-1 text-white/60 hover:text-white"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  {item.mega && expanded && (
                    <MegaMenu id={`menu-${item.label}`} families={families} />
                  )}
                  {item.children && expanded && (
                    <div id={`menu-${item.label}`} className="absolute top-full left-0 pt-3">
                      <ul className="min-w-60 rounded-xl bg-white p-2 shadow-2xl ring-1 ring-ink/5">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={cn(
                                "block rounded-lg px-3.5 py-2.5 text-sm transition-colors hover:bg-mist",
                                pathname === child.href ? "font-semibold text-brand-ink" : "text-charcoal",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/donate" size="md" arrow={false} className="hidden h-10 px-5 sm:inline-flex">
            Donate
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} families={families} pathname={pathname} />
    </header>
  );
}
