import type { MobileNavRegionProps, RegionOverride } from "@venore/theme-sdk";
import { EditorialMenuOverlay } from "./menu-overlay";

// Região mobileNav do Editorial. "fullscreen" (padrão) e "drawer" viram o sumário de tela cheia,
// aberto pelo botão "Menu" do cabeçalho em QUALQUER largura — no Editorial o menu principal nunca
// é uma rail fixa. "bottom-bar" (escolha do admin/seção) é a barra inferior do kit.
export const EditorialMobileNav: RegionOverride<MobileNavRegionProps> = ({ Default, ...props }) => {
  if (props.area === "admin" || props.mode === "bottom-bar") return <Default {...props} />;
  return <EditorialMenuOverlay strings={props.strings} items={props.items} sections={props.headerNavItems} extra={props.navModeSwitch} />;
};
