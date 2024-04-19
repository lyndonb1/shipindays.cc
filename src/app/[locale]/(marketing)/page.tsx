import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero/hero";
import Testimonials from "@/components/landing/testimonials/testimonials";
import TestimonialHighlight from "@/components/landing/testimonials/testimonial-highlight";
import { Examples } from "@/components/landing/examples/examples";
import { Technologies } from "@/components/landing/partners/technologies";
import { Suspense } from "react";
import { TestimonialsAlt } from "@/components/landing/testimonials/testimonials-alt";

const LandingPage = () => {
  // const user = await getCurrentUser()
  // if (user) redirect("/dashboard")
  return (
    <div className="h-full ">
      <LandingNavbar />
      <Hero />
      <Technologies />
      <TestimonialHighlight />
      <Examples />
      <Suspense>
        <Testimonials />
      </Suspense>

      <TestimonialsAlt />
      {/* 
      <TrustedBy />
      <Pricing />
      <FAQ />
      <Features /> */}
    </div>
  );
};

export default LandingPage;
