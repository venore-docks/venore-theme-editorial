import type { MediaView } from "@venore/theme-sdk";

// Peças comuns dos templates do Editorial.
export const kicker = "text-xs font-semibold uppercase tracking-caps text-primary";
export const headline = "font-(family-name:--ed-headline) font-bold tracking-display text-foreground text-balance";
export const deck = "font-(family-name:--ed-headline) text-pretty italic text-muted-foreground";

// Fio grosso + fino (assinatura visual do tema), puramente decorativo.
export function Rule({ double = false }: { double?: boolean }) {
  return <div aria-hidden="true" className={double ? "border-t-4 border-double border-foreground" : "border-t border-foreground"} />;
}

export function Figure({ media, caption }: { media: MediaView; caption?: string | null }) {
  return (
    <figure className="space-y-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- mesmo padrão do kit, sem domínio remoto configurado pra next/image */}
      <img src={media.url} alt={media.alt} width={media.width} height={media.height} className="aspect-[3/2] w-full object-cover grayscale-[15%]" />
      {caption ? <figcaption className="border-s-2 border-primary ps-3 text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
