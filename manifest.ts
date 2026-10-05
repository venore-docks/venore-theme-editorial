import type { ThemeManifest } from "@venore/theme-sdk";

// Manifesto do contrato 8.0.0 (docs/themes/theme-system-v8.md no core). O Editorial não usa
// nenhum dos presets do kit: o arranjo é o componente próprio `EditorialLayout` (theme.ts) —
// cabeçalho de jornal centrado, faixa de seções entre fios, sem rail fixa no site público (o menu
// principal mora num sumário de tela cheia), barra contextual como "Nesta seção" em faixa
// horizontal acima do texto e rodapé em colunas (expediente).
export const editorialManifest: ThemeManifest = {
  key: "editorial",
  name: "Editorial",
  // Mesmo número de package.json#version (o /admin/themes compara com as tags do repositório).
  version: "0.1.0",
  themeContractVersion: "8.0.0",
  // Marca centrada: o cabeçalho é um "nameplate" de jornal. A cor aproxima o vermelhão de
  // --primary (referência visual; o logo real vem de /admin/settings/brand).
  brandAesthetics: { mode: "text", size: 100, scrolledSize: 100, position: "center", color: "oklch(0.53 0.2 32)" },
  colorModes: ["light", "dark"],
  // O cabeçalho do Editorial não é fixo nem encolhe (é alto de propósito, como uma capa).
  capabilities: { headerBehavior: false },

  layout: { preset: "custom", headerNavVisibleFrom: "always", collapseControl: "none" },
  responsive: {
    mobileNav: "fullscreen",
    mobileNavChoices: ["fullscreen", "bottom-bar"],
    contextualBarMobile: "top-collapsible",
  },

  palette: { accent: "neutral" },

  options: [
    {
      key: "accent",
      type: "select",
      label: { messageKey: "editorial.option.accent" },
      description: { messageKey: "editorial.option.accent.help" },
      group: "Cor",
      default: "vermilion",
      choices: [
        { value: "vermilion", label: { messageKey: "editorial.option.accent.vermilion" } },
        { value: "cobalt", label: { messageKey: "editorial.option.accent.cobalt" } },
        { value: "forest", label: { messageKey: "editorial.option.accent.forest" } },
        { value: "ink", label: { messageKey: "editorial.option.accent.ink" } },
      ],
    },
    {
      key: "headline",
      type: "select",
      label: { messageKey: "editorial.option.headline" },
      description: { messageKey: "editorial.option.headline.help" },
      group: "Tipografia",
      default: "serif",
      choices: [
        { value: "serif", label: { messageKey: "editorial.option.headline.serif" } },
        { value: "sans", label: { messageKey: "editorial.option.headline.sans" } },
      ],
    },
    {
      key: "density",
      type: "select",
      label: { messageKey: "editorial.option.density" },
      description: { messageKey: "editorial.option.density.help" },
      group: "Layout",
      default: "airy",
      choices: [
        { value: "airy", label: { messageKey: "editorial.option.density.airy" } },
        { value: "compact", label: { messageKey: "editorial.option.density.compact" } },
      ],
    },
    {
      key: "drop-cap",
      type: "boolean",
      label: { messageKey: "editorial.option.dropCap" },
      description: { messageKey: "editorial.option.dropCap.help" },
      group: "Tipografia",
      default: true,
    },
  ],

  fonts: {
    sans: "inter",
    display: "fraunces",
    mono: "ibm-plex-mono",
    choices: {
      sans: ["inter", "source-serif-4", "manrope"],
      display: ["fraunces", "playfair-display", "source-serif-4"],
      mono: ["ibm-plex-mono", "jetbrains-mono"],
    },
  },

  pageBuilder: {
    sectionStyles: [
      { value: "newsprint", label: { messageKey: "editorial.section.newsprint" } },
      { value: "ink", label: { messageKey: "editorial.section.ink" } },
    ],
    hideSectionStyles: ["brand"],
    blockVariants: {
      "core.content.hero": [{ value: "front-page", label: { messageKey: "editorial.variant.frontPage" } }],
      "core.content.card": [{ value: "clipping", label: { messageKey: "editorial.variant.clipping" } }],
    },
  },

  templateVariants: {
    home: [{ value: "composition", label: { messageKey: "editorial.template.home.composition" } }],
    category: [{ value: "compact", label: { messageKey: "editorial.template.category.compact" } }],
  },

  // Regiões próprias (header, footer, contextualBar, mobileNav) só desenham estes outlets; a rail
  // não existe no arranjo Editorial (rail.top/rail.bottom ficam de fora).
  outlets: [
    "header.start",
    "header.end",
    "content.before",
    "content.after",
    "contextual.top",
    "contextual.bottom",
    "footer.top",
    "footer.bottom",
    "userMenu.items",
    "home.showcase",
    "entry.after-content",
  ],

  seo: {
    themeColor: { light: "#f5efe3", dark: "#16130f" },
    structuredData: { entry: "Article", category: "CollectionPage", home: "WebSite" },
  },

  locales: ["pt-BR", "en"],
};
