import Header from "../_components/header";
import Hero from "../_components/hero";
import Showcase from "../_components/showcase";
import Process from "../_components/process";
import SprintPricing from "../_components/sprint-pricing";
import Comparison from "../_components/comparison";
import ContactFooter from "../_components/contact-footer";
import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  servicesQuery,
  settingsQuery,
  testimonialsQuery,
} from "../lib/queries";

import Testimonials from "../_components/testimonials";

export const metadata = {
  title: "Turn Your Product Idea Into a Focused MVP | Nexfound",
  description:
    "We architect, design, and deploy production-grade Web & Mobile MVPs for ambitious founders in 30 days. Transparent sprints from ₹1,49,000* (Design Sprints from ₹49,000). 100% direct Git and IP handover.",
};

async function getData() {
  try {
    const [projects, testimonials, services, settings] =
      await Promise.all([
        client.fetch(projectsQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(testimonialsQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(servicesQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(settingsQuery, {}, { next: { revalidate: 60 } }),
      ]);

    return { projects, testimonials, services, settings };
  } catch (error) {
    console.error("Sanity data fetch error:", error);
    return {
      projects: [],
      testimonials: [],
      services: [],
      settings: null,
    };
  }
}

export default async function Home() {
  const { testimonials, settings } = await getData();

  return (
    <>
      <Header />

      <main className="relative z-10 text-[#F0F0F5]">
        {/* 1. Above-The-Fold Studio Hero */}
        <Hero />

        {/* 2. Verified Production Proof: Shipped Software (DalalFree & EV Dock) */}
        <Showcase />

        {/* 3. The 30-Day Sprint Roadmap: Days 1–7 -> Days 8–22 -> Days 23–30 */}
        <Process />

        {/* 4. Transparent Sprint Pricing: Design (₹49k), MVP (₹1.49L*), Scale (₹3.49L) */}
        <SprintPricing />

        {/* 5. Why Nexfound: Velocity, Predictability, Autonomy */}
        <Comparison />

        {/* 6. Client Endorsements & Founder Proof */}
        <Testimonials
          testimonials={testimonials}
          stats={settings?.testimonialStats}
        />
      </main>

      {/* 7. 60-Second Founder Brief Intake & Studio Footer */}
      <ContactFooter
        cta={settings?.cta}
        contactEmail={settings?.contactEmail}
        contactPhone={settings?.contactPhone}
        footer={settings?.footer}
        socialLinks={settings?.socialLinks}
      />
    </>
  );
}