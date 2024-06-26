import { defaultLocale } from "../../../../../../../locales/locales";
import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";

export default function Page() {
  const locale = useLocale();

  return (
    <SignIn
      redirectUrl={`${locale !== defaultLocale ? locale : ""}/dashboard`}
    />
  );
}
