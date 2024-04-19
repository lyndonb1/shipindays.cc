import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const TestimonialHighlight = () => {
  const t = useTranslations("testimonialHighlight");

  return (
    <>
      <section id="testimonial-highlight">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
          <h3 className=" font-semibold pb-6">{t("question")}</h3>
          <figure>
            <blockquote>
              <p
                className="text-accent-foreground text-xl text-center font-semibold sm:text-2xl italic group-hover:-translate-y-1 transition-all duration-300 ease-in-out
                "
              >
                {siteConfig.name} {t("quote")}
              </p>
            </blockquote>
          </figure>
        </div>
      </section>
    </>
  );
};

export default TestimonialHighlight;
