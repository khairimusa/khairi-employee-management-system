import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components-custom/Header";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/new-york/ui/toaster";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";
import { type Locale } from "@/locales";
import { type Metadata } from "next";
import { EdgeStoreProvider } from "../lib/edgestore";

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout: React.FC<Props> = async (props) => {
  const messages = await getMessages();

  return (
    <html
      lang={props.params.locale}
      className={`${GeistSans.variable} ${GeistMono.variable} !scroll-smooth`}
    >
      <body>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <main className="block px-2 lg:px-0">
                <div className="relative mx-auto my-4 max-w-screen-md min-h-[96vh] rounded-md border shadow-2xl">
                  <Header />
                  <section className="mb-16">{props.children}</section>
                  <Toaster />
                </div>
              </main>
            </NextIntlClientProvider>
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "landingPage" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default RootLayout;
