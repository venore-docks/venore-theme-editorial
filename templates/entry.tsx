import { Suspense } from "react";
import Link from "next/link";
import type { EntryTemplateProps } from "@venore/theme-sdk";
import { formatEntryDate, KitLoadingState, t } from "@venore/theme-sdk/kit";
import { deck, Figure, headline, kicker } from "./shared";

// Matéria longa: cabeçalho centrado (chapéu na cor de destaque, manchete, linha fina em itálico,
// data entre fios), foto de capa na largura do texto + respiro e o corpo numa medida estreita
// (~68 caracteres). Capitular, citação em destaque (blockquote) e fios dentro do corpo são CSS do
// tema sobre `[data-editorial-prose]` (theme.css) — o conteúdo continua sendo o do core. Quando o
// primeiro bloco é um hero, a manchete já está nele: o template mostra só a linha de data.
export function EditorialEntryTemplate({ entry, content, backLink, jsonLd, outlets, locale, strings, firstBlockIsHero }: EntryTemplateProps) {
  const published = formatEntryDate(entry.publishedAt, locale);
  const updated = entry.updatedAt && entry.updatedAt !== entry.publishedAt ? formatEntryDate(entry.updatedAt, locale) : null;
  const dateline = (
    <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-y border-border py-3 text-xs font-medium uppercase tracking-caps text-muted-foreground">
      {published && <span>{t(strings, "editorial.publishedOn", { date: published })}</span>}
      {updated && <span aria-hidden="true" className="h-3 border-s border-border" />}
      {updated && <span>{t(strings, "editorial.updatedOn", { date: updated })}</span>}
    </p>
  );

  return (
    <article data-editorial-article="" className="space-y-10">
      <header className="mx-auto max-w-3xl space-y-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {backLink && (
            <Link href={backLink.href} className={`${kicker} outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring`}>
              {backLink.label}
            </Link>
          )}
          {!backLink && entry.category && <p className={kicker}>{entry.category.label}</p>}
        </div>
        {!firstBlockIsHero && (
          <>
            <h1 className={`${headline} text-4xl leading-[1.05] sm:text-5xl lg:text-6xl`}>{entry.title}</h1>
            {entry.excerpt && <p className={`${deck} text-xl leading-snug sm:text-2xl`}>{entry.excerpt}</p>}
          </>
        )}
        {(published || updated) && dateline}
      </header>

      {entry.cover && !firstBlockIsHero && (
        <div className="mx-auto max-w-4xl">
          <Figure media={entry.cover} caption={entry.cover.alt} />
        </div>
      )}

      <div data-editorial-prose="" className="mx-auto max-w-[68ch] space-y-6">
        {outlets.before}
        <Suspense fallback={<KitLoadingState strings={strings} />}>{content}</Suspense>
        {outlets.after}
      </div>
      {jsonLd}
    </article>
  );
}
