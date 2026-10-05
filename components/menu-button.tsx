"use client";

import { Menu, X } from "lucide-react";
import type { ThemeStrings } from "@venore/theme-sdk";
import { t } from "@venore/theme-sdk/kit";
import { toggleMobileNav, useMobileNavOpen } from "@venore/theme-sdk/kit-client";
import { EDITORIAL_MENU_ID } from "./menu-ids";

// Gatilho do sumário de tela cheia. Diferente do hambúrguer do kit (só abaixo de lg), fica visível
// em toda largura: no Editorial o menu principal NUNCA vira rail fixa, ele mora no sumário. Usa o
// mesmo store do kit (aria-expanded + foco devolvido ao gatilho pelo useOverlay da camada).
export function EditorialMenuButton({ strings }: { strings: ThemeStrings }) {
  const open = useMobileNavOpen();
  return (
    <button
      type="button"
      onClick={toggleMobileNav}
      aria-expanded={open}
      aria-controls={EDITORIAL_MENU_ID}
      aria-label={open ? t(strings, "mobileNav.close") : t(strings, "mobileNav.open")}
      className="inline-flex h-11 items-center gap-2 border border-foreground px-3 text-xs font-semibold uppercase tracking-caps text-foreground outline-none ui-motion-base hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
      <span aria-hidden="true">{t(strings, "editorial.menu")}</span>
    </button>
  );
}
