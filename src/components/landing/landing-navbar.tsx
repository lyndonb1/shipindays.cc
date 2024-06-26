"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next-intl/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";
import { LanguageSwitcher } from "../language-switcher";
import { defaultLocale } from "../../../locales/locales";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const locale = useLocale();
  const t = useTranslations("landingNavbar");

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-primary", font.className)}>
          {t("applicationName")}
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <Link
          href={`${locale !== defaultLocale ? locale : ""}${
            isSignedIn ? "/dashboard" : "/sign-up"
          }`}
        >
          <Button variant="default" className="rounded-full">
            {isSignedIn ? t("dashboard") : t("getStarted")}
          </Button>
        </Link>
      </div>
    </nav>
  );
};
