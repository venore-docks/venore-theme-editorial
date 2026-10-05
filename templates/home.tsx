import { Suspense } from "react";
import Link from "next/link";
import type { HomeTemplateProps } from "@venore/theme-sdk";
import { formatEntryDate, KitHomeTemplate, KitLoadingState, t } from "@venore/theme-sdk/kit";
import { deck, Figure, headline, kicker, Rule } from "./shared";

// Home como primeira página. Com a entry "home": a matéria de destaque (chapéu, manchete enorme,
// linha fina, foto) numa grade assimétrica, um fio duplo e a composição da página logo abaixo; a
// vitrine de plugins (outlet home.showcase) vira a faixa "Nesta edição". Sem entry: o nome do site
// como manchete e a vitrine/estado vazio do kit. A variante "composition" é a home do kit (só a
// composição do page builder, sem manchete).
export function EditorialHomeTemplate(props: HomeTemplateProps) {
  const { entry, content, showcase, outlets, jsonLd, strings, locale } = props;
  if (!entry || !content) {
    return (
      <div className="space-y-10">
        <section className="space-y-4 text-center">
          <p className={kicker}>{t(strings, "editorial.lead")}</p>
          <h1 className={`${headline} text-4xl leading-tight sm:text-6xl`}>{props.siteName ?? ""}</h1>
          {props.primaryAction && (
            <Link
              href={props.primaryAction.href}
              className="inline-flex h-11 items-center border border-foreground px-5 text-xs font-semibold uppercase tracking-caps outline-none ui-motion-base hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              {props.primaryAction.label}
            </Link>
          )}
        </section>
        <Rule double />
        <KitHomeTemplate {...props} siteName={undefined} primaryAction={null} />
      </div>
    );
  }

  const date = formatEntryDate(entry.publishedAt, locale);
  return (
    <div data-editorial-front-page="" className="space-y-10 lg:space-y-14">
      <section aria-labelledby="editorial-lead" className={entry.cover ? "grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12" : "mx-auto max-w-4xl text-center"}>
        <div className="space-y-5">
          <p className={kicker}>{entry.category?.label ?? t(strings, "editorial.lead")}</p>
          <h1 id="editorial-lead" className={`${headline} text-4xl leading-[1.05] sm:text-6xl lg:text-7xl`}>
            {entry.title}
          </h1>
          {entry.excerpt && <p className={`${deck} text-xl leading-snug sm:text-2xl`}>{entry.excerpt}</p>}
          {date && (
            <p className="text-xs font-medium uppercase tracking-caps text-muted-foreground">
              {t(strings, "editorial.edition", { date })}
            </p>
          )}
        </div>
        {entry.cover && <Figure media={entry.cover} caption={entry.cover.alt} />}
      </section>
      <Rule double />
      {outlets.before}
      <div data-editorial-front-content="">
        <Suspense fallback={<KitLoadingState strings={strings} />}>{content}</Suspense>
      </div>
      {showcase && (
        <section aria-labelledby="editorial-showcase" className="space-y-6">
          <div className="flex items-baseline gap-4">
            <h2 id="editorial-showcase" className={`${headline} shrink-0 text-2xl`}>
              {t(strings, "editorial.moreInEdition")}
            </h2>
            <div aria-hidden="true" className="flex-1 border-t border-foreground" />
          </div>
          {showcase}
        </section>
      )}
      {outlets.after}
      {jsonLd}
    </div>
  );
}

export function EditorialHomeComposition(props: HomeTemplateProps) {
  return <KitHomeTemplate {...props} />;
}
