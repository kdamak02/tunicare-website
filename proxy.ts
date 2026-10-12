import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n";

/**
 * Envoie le visiteur qui arrive sur "/" vers /fr ou /en,
 * selon la langue de son navigateur (français par défaut).
 */
function langueDuNavigateur(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const preferences = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const trouvee = preferences.find((p) => (LOCALES as readonly string[]).includes(p.lang));
  return (trouvee?.lang as Locale) ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${langueDuNavigateur(request)}`;
  return NextResponse.redirect(url);
}

// Seule la racine "/" est concernée ; /fr, /en, les images et l'API ne passent pas ici.
export const config = {
  matcher: ["/"],
};
