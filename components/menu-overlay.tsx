"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import type { MainNavItem, NavItem, ThemeStrings } from "@venore/theme-sdk";
import { t } from "@venore/theme-sdk/kit";
import { closeMobileNav, getMobileNavTrigger, useMobileNavOpen, useOverlay, useScrollLock } from "@venore/theme-sdk/kit-client";
import { EDITORIAL_MENU_ID } from "./menu-ids";

// Sumário de tela cheia (região mobileNav do Editorial): o menu principal do site em tipografia de
// manchete, em colunas a partir de md. Fechado, fica no HTML com `hidden` (fora do Tab e da árvore
// de acessibilidade); aberto, Escape/troca de rota fecham, o foco fica preso no painel e volta ao
// gatilho (useOverlay do kit) e o scroll da página trava (useScrollLock, ref-contado).
const linkClass =
  "group/link flex items-baseline gap-3 py-2 font-(family-name:--ed-headline) text-2xl leading-tight text-foreground outline-none ui-motion-base hover:text-primary focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-primary sm:text-3xl";

function ItemLink({ item, pathname }: { item: Extract<MainNavItem, { href: string }>; pathname: string | null }) {
  if (item.isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {item.label}
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      target={item.opensInNewTab ? "_blank" : undefined}
      rel={item.opensInNewTab ? "noopener noreferrer" : undefined}
      className={linkClass}
    >
      {item.label}
    </Link>
  );
}

function Items({ items, pathname }: { items: MainNavItem[]; pathname: string | null }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) =>
        item.href === null ? (
          <li key={item.key} className="py-3">
            <p className="pb-1 text-xs font-semibold uppercase tracking-caps text-primary">{item.label}</p>
            <div className="ps-4">
              <Items items={item.children} pathname={pathname} />
            </div>
          </li>
        ) : (
          <li key={item.key}>
            <ItemLink item={item} pathname={pathname} />
          </li>
        ),
      )}
    </ul>
  );
}

export function EditorialMenuOverlay({
  strings,
  items,
  sections,
  extra,
}: {
  strings: ThemeStrings;
  items: MainNavItem[];
  sections: NavItem[];
  extra: ReactNode;
}) {
  const open = useMobileNavOpen();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  useOverlay({ open, onClose: closeMobileNav, containerRef: panelRef, returnFocus: getMobileNavTrigger });
  useScrollLock(open);

  return (
    <div
      ref={panelRef}
      id={EDITORIAL_MENU_ID}
      role="dialog"
      aria-modal="true"
      aria-label={t(strings, "editorial.menu.title")}
      hidden={!open}
      data-editorial-menu=""
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background text-foreground"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:px-8 lg:py-10">
        <div className="flex items-center justify-between gap-4 border-b-4 border-double border-foreground pb-4">
          <p className="font-(family-name:--ed-headline) text-3xl font-bold sm:text-4xl">{t(strings, "editorial.menu.title")}</p>
          <button
            type="button"
            onClick={closeMobileNav}
            aria-label={t(strings, "mobileNav.close")}
            className="inline-flex size-11 items-center justify-center border border-foreground outline-none ui-motion-base hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={t(strings, "mobileNav.label")} data-region="mobile-nav" data-mobile-nav="fullscreen" className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>{items.length > 0 && <Items items={items} pathname={pathname} />}</div>
          {sections.length > 0 && (
            <div className="border-t border-foreground pt-3 md:border-t-0 md:border-s md:ps-6 md:pt-0">
              <p className="pb-2 text-xs font-semibold uppercase tracking-caps text-muted-foreground">{t(strings, "editorial.sections")}</p>
              <ul className="space-y-1">
                {sections.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="block py-1.5 text-sm font-medium uppercase tracking-caps text-foreground outline-none ui-motion-base hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        {extra}
      </div>
    </div>
  );
}
