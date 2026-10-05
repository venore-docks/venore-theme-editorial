import { defineTheme } from "@venore/theme-sdk";
import { EditorialContextualBar } from "./components/contextual-bar";
import { EditorialFooter } from "./components/footer";
import { EditorialHeader } from "./components/header";
import { EditorialLayout } from "./components/layout";
import { EditorialMobileNav } from "./components/mobile-nav";
import { EDITORIAL_COLOR_PALETTES } from "./color-palettes";
import { editorialManifest } from "./manifest";
import { EDITORIAL_MESSAGES } from "./messages";
import { EditorialCategoryCompact, EditorialCategoryTemplate } from "./templates/category";
import { EditorialEntryTemplate } from "./templates/entry";
import { EditorialHomeComposition, EditorialHomeTemplate } from "./templates/home";

// Editorial no contrato 8.0.0: arranjo próprio (EditorialLayout, sem rail no site público),
// quatro regiões substituídas (cabeçalho-nameplate, expediente, faixa "Nesta seção" e sumário de
// tela cheia) e três templates (primeira página, matéria longa, índice). Trilha, menu do usuário,
// estados, login, conta e 404 continuam sendo os do kit, vestidos pelos tokens do theme.css.
// O core lê este módulo pelo export "./theme" (default).
export const editorialTheme = defineTheme({
  manifest: editorialManifest,
  layout: EditorialLayout,
  regions: {
    header: EditorialHeader,
    footer: EditorialFooter,
    contextualBar: EditorialContextualBar,
    mobileNav: EditorialMobileNav,
  },
  templates: {
    home: { default: EditorialHomeTemplate, composition: EditorialHomeComposition },
    entry: EditorialEntryTemplate,
    category: { default: EditorialCategoryTemplate, compact: EditorialCategoryCompact },
  },
  messages: EDITORIAL_MESSAGES,
  colorPalettes: EDITORIAL_COLOR_PALETTES,
});

export default editorialTheme;
