import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { ModalProvider } from "@/components/providers/modal-provider";
import { CrispProvider } from "@/components/providers/crisp-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import MotionProvider from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";
import { loadFullApplications } from "@/lib/applications";
import { notFound } from "next/navigation";
import { locales } from "../../../locales/locales";
import { getMessages, getTranslator } from "next-intl/server";

const font = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export async function generateMetadata({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const t = await getTranslator(locale, "metadata");

  return {
    metadataBase: new URL("https://shipindays.cc"),
    title: t("applicationName"),
    description: t("applicationDescription"),
    keywords: [
      t("keywords-0"),
      t("keywords-1"),
      t("keywords-2"),
      t("keywords-3"),
      t("keywords-4"),
      t("keywords-5"),
      t("keywords-6"),
      t("keywords-7"),
      t("keywords-8"),
      t("keywords-9"),
      t("keywords-10"),
    ],
    openGraph: {
      images:
        "https://dt00g2eb5etby3xu.public.blob.vercel-storage.com/assets/qrbtf_kv-gXzB1cMYlyXQQrhza3HoQlH1WydQpe.jpg",
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages(locale);
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const applications = await loadFullApplications();

  return (
    <html lang={locale} suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={cn(font.className, "scroll-smooth font-sans antialiased")}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MotionProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <ModalProvider applications={applications} />
                {children}
                <Toaster />
              </NextIntlClientProvider>
            </MotionProvider>
          </ThemeProvider>
        </body>
        <CrispProvider />
      </ClerkProvider>
    </html>
  );
}
