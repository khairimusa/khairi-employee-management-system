import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "my"],

  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(my|en)/:path*"],
};
