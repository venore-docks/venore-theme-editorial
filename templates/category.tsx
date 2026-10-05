import Link from "next/link";
import type { CategoryTemplateProps, ThemeEntryView } from "@venore/theme-sdk";
import { formatEntryDate, t } from "@venore/theme-sdk/kit";
import { deck, headline, kicker, Rule } from "./shared";

// Categoria como índice de jornal: título da editoria entre fios, linha fina, ordenação em
// versalete e a lista de matérias separadas por fios — a primeira em destaque (manchete maior e
// foto), as demais em linhas com a data numa coluna à parte. A variante "compact" tira o
// destaque e as fotos (só a lista).
function EntryRow({ entry, locale, lead }: { entry: ThemeEntryView; locale: string; lead: boolean }) {
  const date = formatEntryDate(entry.publishedAt, locale);
  return (
    <li className="border-b border-border last:border-b-0">
      <article className={`grid gap-3 py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 ${lead && entry.cover ? "lg:grid-cols-[9rem_minmax(0,1fr)_minmax(0,22rem)]" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-caps text-muted-foreground sm:pt-2">{date ? <time dateTime={entry.publishedAt ?? undefined}>{date}</time> : null}</p>
        <div className="min-w-0 space-y-2">
          {entry.category && <p className={kicker}>{entry.category.label}</p>}
          <h2 className={`${headline} ${lead ? "text-3xl leading-tight sm:text-4xl" : "text-2xl leading-snug"}`}>
            <Link href={entry.path} className="outline-none ui-motion-base hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring">
              {entry.title}
            </Link>
          </h2>
          {entry.excerpt && <p className={`${deck} ${lead ? "text-lg" : "text-base"} leading-snug`}>{entry.excerpt}</p>}
        </div>
        {lead && entry.cover && (
          // eslint-disable-next-line @next/next/no-img-element -- mesmo padrão do kit
          <img src={entry.cover.url} alt={entry.cover.alt} className="aspect-[3/2] w-full object-cover sm:col-start-2 lg:col-start-auto" />
        )}
      </article>
    </li>
  );
}

function CategoryIndex({ category, entries, pagination, sort, empty, jsonLd, outlets, strings, locale, compact }: CategoryTemplateProps & { compact: boolean }) {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <Rule double />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className={kicker}>{t(strings, "editorial.index")}</p>
            <h1 className={`${headline} text-5xl leading-none sm:text-7xl`}>{category.label}</h1>
          </div>
          {sort.options.length > 1 && (
            <nav aria-label={t(strings, "editorial.sortLabel")} className="flex gap-4 text-xs font-semibold uppercase tracking-caps">
              {sort.options.map((option) => (
                <Link
                  key={option.value}
                  href={option.href}
                  aria-current={option.value === sort.current ? "true" : undefined}
                  className="border-b-2 border-transparent py-1 text-muted-foreground outline-none ui-motion-base hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=true]:border-primary aria-[current=true]:text-foreground"
                >
                  {option.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        {category.description && <p className={`${deck} max-w-3xl text-xl leading-snug`}>{category.description}</p>}
        <Rule />
      </header>

      {outlets.before}
      {entries.length === 0 ? (
        empty
      ) : (
        <ol className="list-none">
          {entries.map((entry, index) => (
            <EntryRow key={entry.id} entry={entry} locale={locale} lead={!compact && index === 0 && pagination.page === 1} />
          ))}
        </ol>
      )}
      {outlets.after}

      {(pagination.prevHref || pagination.nextHref) && (
        <nav aria-label={t(strings, "category.paginationLabel")} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 whitespace-nowrap border-t-4 border-double border-foreground pt-4 text-xs font-semibold uppercase tracking-caps">
          <span>
            {pagination.prevHref && (
              <Link href={pagination.prevHref} className="outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
                ← {t(strings, "category.newer")}
              </Link>
            )}
          </span>
          <span className="text-muted-foreground">{t(strings, "editorial.pageOf", { page: pagination.page, count: pagination.pageCount })}</span>
          <span className="text-end">
            {pagination.nextHref && (
              <Link href={pagination.nextHref} className="outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
                {t(strings, "category.older")} →
              </Link>
            )}
          </span>
        </nav>
      )}
      {jsonLd}
    </div>
  );
}

export function EditorialCategoryTemplate(props: CategoryTemplateProps) {
  return <CategoryIndex {...props} compact={false} />;
}

export function EditorialCategoryCompact(props: CategoryTemplateProps) {
  return <CategoryIndex {...props} compact />;
}
