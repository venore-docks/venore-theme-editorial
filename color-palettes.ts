import type { ColorPalette } from "@venore/theme-sdk";

// Paletas do Editorial: só trocam o acento (papel e tinta são a identidade do tema). Ids estáveis.
const mk = (id: string, name: string, light: string, dark: string, onLight: string, onDark: string): ColorPalette => ({
  id,
  name,
  light: { primary: light, "primary-foreground": onLight, ring: light },
  dark: { primary: dark, "primary-foreground": onDark, ring: dark },
});

export const EDITORIAL_COLOR_PALETTES: ColorPalette[] = [
  mk("vermelhao", "Vermelhão", "oklch(0.53 0.2 32)", "oklch(0.7 0.17 35)", "oklch(0.98 0.01 85)", "oklch(0.16 0.01 40)"),
  mk("cobalto", "Cobalto", "oklch(0.47 0.17 262)", "oklch(0.74 0.12 255)", "oklch(0.98 0.01 85)", "oklch(0.16 0.01 260)"),
  mk("musgo", "Musgo", "oklch(0.46 0.1 155)", "oklch(0.75 0.12 155)", "oklch(0.98 0.01 85)", "oklch(0.16 0.01 155)"),
];
