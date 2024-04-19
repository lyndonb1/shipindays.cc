import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "../locales/locales";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export default authMiddleware({
  beforeAuth: (req) =>
    // Execute next-intl middleware before Clerk's auth middleware
    intlMiddleware(req),
  // Ensure that locale specific sign-in pages are public
  publicRoutes: [
    "/",
    ...locales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => `/${locale}`),
    `/sign-in`,
    `/sign-up`,
    `/:locale/sign-in`,
    `/:locale/sign-up`,
  ],
  afterAuth: (auth, req, evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    return intlMiddleware(req);
  },
});

export const config = {
  // Add a custom matcher to ensure that the locale is correctly detected
  // for all routes
  // This matcher will match all routes that do not contain a file extension
  // or the _next directory
  // It will also match all routes that start with /api or /trpc
  // This ensures that the locale is correctly detected for all routes
  // in the application
  // For more information on matchers, see:
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  // https://nextjs.org/docs/api-reference/next.config.js/headers
  // https://nextjs.org/docs/api-reference/next.config.js/custom-rewrites
  // https://nextjs.org/docs/api-reference/next.config.js/custom-routes
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites-redirects
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
