import Link from "next/link";
import type { FooterRegionProps, RegionOverride, SitemapItem } from "@venore/theme-sdk";
import { t } from "@venore/theme-sdk/kit";

// Rodapé como expediente de jornal (região footer do Editorial): tinta preta nos dois modos
// (superfície "tinta" do theme.css, [data-editorial-colophon]), nome do site em manchete, descrição e as colunas do sitemap —
// cada item de primeiro nível com filhos vira uma coluna; os soltos se juntam numa coluna
// "Seções". Embaixo, um fio com direitos, créditos e "voltar ao topo".
const linkClass =
  "rounded-none text-sm text-muted-foreground outline-none ui-motion-base hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring";
const headingClass = "border-b border-border pb-2 text-xs font-semibold uppercase tracking-caps text-primary";

function ItemLink({ item, className }: { item: SitemapItem; className: string }) {
  if (item.href === null) return <span className={className}>{item.label}</span>;
  if (item.isExternal || item.opensInNewTab) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

function Column({ heading, items }: { heading: SitemapItem | string; items: SitemapItem[] }) {
  return (
    <div className="min-w-0 space-y-3">
      <p className={headingClass}>{typeof heading === "string" ? heading : <ItemLink item={heading} className="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring" />}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <ItemLink item={item} className={linkClass} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const EditorialFooter: RegionOverride<FooterRegionProps> = ({ Default, ...props }) => {
  if (props.area === "admin") return <Default {...props} />;
  const { brand, sitemapItems, creditsEnabled, loginLinkHref, strings, slots } = props;
  const groups = sitemapItems.filter((item) => item.children.length > 0);
  const loose = sitemapItems.filter((item) => item.children.length === 0);
  const year = new Date().getFullYear();

  return (
    <footer data-region="footer" data-editorial-colophon="" className="mt-auto bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {slots.outletTop}
        <div className="grid gap-10 border-t-4 border-double border-foreground pt-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-caps text-primary">{t(strings, "editorial.colophon")}</p>
            <p className="font-(family-name:--ed-headline) text-4xl leading-none font-black tracking-display">{brand.name}</p>
            {brand.description.trim().length > 0 && <p className="max-w-[40ch] text-pretty text-sm leading-relaxed text-muted-foreground">{brand.description}</p>}
          </div>
          {loose.length > 0 && <Column heading={t(strings, "editorial.colophon.sections")} items={loose} />}
          {groups.map((group) => (
            <Column key={group.key} heading={group} items={group.children} />
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. {t(strings, "editorial.colophon.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {creditsEnabled ? <span data-credits="">{t(strings, "footer.credits")}</span> : null}
            {loginLinkHref && (
              <Link href={loginLinkHref} className="uppercase tracking-caps outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
                {t(strings, "footer.signIn")}
              </Link>
            )}
            <a href="#site-header" className="uppercase tracking-caps outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
              {t(strings, "editorial.colophon.top")} ↑
            </a>
          </div>
        </div>
        {slots.outletBottom}
      </div>
    </footer>
  );
};
