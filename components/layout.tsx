import type { ThemeLayoutProps } from "@venore/theme-sdk";
import { KIT_MAIN_CONTENT_ID } from "@venore/theme-sdk/kit";

// Arranjo próprio do Editorial (nem "topbar" nem "rail"): uma coluna só, centrada, como uma
// página de jornal. Não existe rail no site público — o menu principal mora no sumário de tela
// cheia (região mobileNav) — e a barra contextual nunca é lateral: sai como faixa "Nesta seção"
// entre a trilha e o texto, em qualquer `contextualPlacement` diferente de "none".
//
// O contêiner de largura é o pai direto de <main id="conteudo"> (gancho do page-layout.css do
// core para largura por página na navegação soft); `page.width` decide a carga inicial.
const WIDTH_CLASS = {
  contained: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

export function EditorialLayout({ regions, page, children }: ThemeLayoutProps) {
  const contextual =
    regions.contextualBar != null && page.contextualPlacement !== "none" ? (
      <aside data-region="contextual" data-editorial-placement="top" className="text-foreground">
        {regions.contextualBar}
      </aside>
    ) : null;

  return (
    <div data-layout="editorial" className="flex min-h-dvh flex-col bg-background text-foreground">
      {regions.skipLink}
      {regions.header}
      <div data-sidebar-contextual={contextual != null} className={`mx-auto flex w-full flex-1 flex-col gap-6 px-4 pt-4 pb-12 sm:px-6 lg:px-8 lg:pb-20 ${WIDTH_CLASS[page.width]}`}>
        {regions.breadcrumbs}
        {contextual}
        <main id={KIT_MAIN_CONTENT_ID} data-region="content" className="min-w-0 flex-1 pt-2 text-foreground lg:pt-6">
          {children}
        </main>
      </div>
      {regions.footer}
      {regions.mobileNav}
    </div>
  );
}
