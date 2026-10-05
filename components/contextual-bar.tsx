import Link from "next/link";
import type { ContextualBarRegionProps, ContextualMenuItemView, RegionOverride } from "@venore/theme-sdk";
import { t } from "@venore/theme-sdk/kit";

// Barra contextual como faixa "Nesta seção" (região contextualBar do Editorial): em vez de uma
// coluna lateral, um sumário horizontal entre fios acima do texto — itens em linha, quebrando
// em várias linhas no celular. Grupos (href null) viram um rótulo seguido dos filhos.
const itemClass =
  "inline-flex py-1 text-sm text-foreground underline-offset-4 outline-none ui-motion-base hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:font-semibold aria-[current=page]:text-primary aria-[current=page]:underline";

function Item({ item }: { item: ContextualMenuItemView }) {
  if (item.href === null) {
    return (
      <li className="flex flex-wrap items-baseline gap-x-4">
        <span className="text-xs font-semibold uppercase tracking-caps text-muted-foreground">{item.label}</span>
        {item.children.length > 0 && (
          <ul className="contents">
            {item.children.map((child) => (
              <Item key={child.key} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }
  const link = item.isExternal ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={itemClass}>
      {item.label}
    </a>
  ) : (
    <Link
      href={item.href}
      aria-current={item.isActive ? "page" : undefined}
      target={item.opensInNewTab ? "_blank" : undefined}
      rel={item.opensInNewTab ? "noopener noreferrer" : undefined}
      className={itemClass}
    >
      {item.label}
    </Link>
  );
  return (
    <li className="flex flex-wrap items-baseline gap-x-4">
      {link}
      {item.children.length > 0 && (
        <ul className="contents">
          {item.children.map((child) => (
            <Item key={child.key} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export const EditorialContextualBar: RegionOverride<ContextualBarRegionProps> = ({ Default, ...props }) => {
  if (props.area === "admin") return <Default {...props} />;
  const { data, strings, slots } = props;
  return (
    <div data-editorial-toc="" className="flex flex-col gap-2 border-y border-foreground py-3 sm:flex-row sm:items-baseline sm:gap-6">
      {slots.outletTop}
      <p className="shrink-0 text-xs font-semibold uppercase tracking-caps text-primary">{t(strings, "contextual.label")}</p>
      <div className="min-w-0 flex-1">
        {data.source === "menu" ? (
          data.items.length > 0 ? (
            <nav aria-label={t(strings, "contextual.label")}>
              <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                {data.items.map((item) => (
                  <Item key={item.key} item={item} />
                ))}
              </ul>
            </nav>
          ) : null
        ) : (
          data.node
        )}
      </div>
      {slots.outletBottom}
    </div>
  );
};
