import Link from "next/link";
import type { HeaderRegionProps, RegionOverride } from "@venore/theme-sdk";
import { formatEntryDate, PlatformBrand, t } from "@venore/theme-sdk/kit";
import { EditorialMenuButton } from "./menu-button";

// Cabeçalho "nameplate" (região header do Editorial). Três faixas, de cima pra baixo:
//   1. linha fina: gatilho do sumário + data da edição | área do usuário;
//   2. o nome do site centrado, em manchete enorme (ou o logo, quando a marca não é texto);
//   3. a faixa de seções (header-nav) entre um fio duplo e um fio simples, rolando na horizontal
//      dentro do próprio <nav> quando não cabe (nunca estoura a página a 390 px).
// No admin (que nunca recebe override, invariante §0.5) cai no kit por segurança.
const smallCaps = "text-xs font-semibold uppercase tracking-caps";
const actionClass = `${smallCaps} inline-flex h-11 items-center px-1 text-foreground outline-none ui-motion-base hover:text-primary focus-visible:ring-2 focus-visible:ring-ring`;

export const EditorialHeader: RegionOverride<HeaderRegionProps> = ({ Default, ...props }) => {
  if (props.area === "admin") return <Default {...props} />;
  const { brand, userbarEnabled, headerNavItems, user, notificationAlert, showLoginLink, strings, locale, slots } = props;
  const today = formatEntryDate(new Date().toISOString(), locale);
  const edition = today ? t(strings, "editorial.edition", { date: today }) : null;

  const loginLink = showLoginLink ? (
    <Link href="/login" className={actionClass}>
      {t(strings, "header.signIn")}
    </Link>
  ) : null;
  const userArea = (
    <div className="flex items-center gap-2">
      {slots.outletEnd}
      {userbarEnabled && user && notificationAlert && (
        <Link href={notificationAlert.href} aria-label={notificationAlert.label} className={`${actionClass} gap-2`}>
          <span aria-hidden="true" className="size-2 bg-primary" />
          <span className="hidden sm:inline">{notificationAlert.label}</span>
        </Link>
      )}
      {userbarEnabled ? (user ? slots.userMenu : loginLink) : null}
    </div>
  );

  const logo = brand.mode !== "text" && brand.logoUrl ? <PlatformBrand {...brand} position="center" isScrolled={false} /> : null;

  return (
    <header id="site-header" data-region="header" data-editorial-masthead="" className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-14 items-center justify-between gap-3 border-b border-border">
          <div className="flex min-w-0 items-center gap-4">
            {slots.mobileNavToggle === null ? null : <EditorialMenuButton strings={strings} />}
            {edition && <p className={`${smallCaps} hidden truncate text-muted-foreground md:block`}>{edition}</p>}
            {slots.outletStart}
          </div>
          {userArea}
        </div>

        <div className="py-6 text-center sm:py-8 lg:py-10">
          <Link
            href="/"
            aria-label={brand.name}
            className="inline-flex max-w-full justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {logo ?? (
              <span data-editorial-nameplate="" className="block break-words font-(family-name:--ed-headline) text-5xl leading-none font-black tracking-display text-foreground sm:text-7xl lg:text-8xl">
                {brand.name}
              </span>
            )}
          </Link>
          {edition && <p className={`${smallCaps} mt-3 text-muted-foreground md:hidden`}>{edition}</p>}
        </div>

        <div className="border-t-4 border-double border-foreground" />
        {headerNavItems.length > 0 ? (
          <nav aria-label={t(strings, "header.navLabel")} className="border-b border-foreground">
            <ul className="flex min-w-0 justify-center-safe overflow-x-auto whitespace-nowrap">
              {headerNavItems.map((item) => (
                <li key={item.key} className="border-s border-border first:border-s-0">
                  <a
                    href={item.href}
                    className={`${smallCaps} block px-4 py-3 text-foreground outline-none ui-motion-base hover:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="border-b border-foreground pt-1" />
        )}
      </div>
    </header>
  );
};
