import dynamic from "next/dynamic";
import Header from "../_components/header";
import Hero from "../_components/hero";
import Comparison from "../_components/comparison";
import Features from "../_components/features";
import About from "../_components/about";
import ContactFooter from "../_components/contact-footer";
import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  servicesQuery,
  settingsQuery,
  testimonialsQuery,
  featuredBlogPostsQuery,
} from "../lib/queries";

// Dynamic imports for heavy below-the-fold & interactive components
const Scroll3DBackground = dynamic(
  () => import("../_components/scroll-3d-background")
);
const Process = dynamic(() => import("../_components/process"));
const PlatformStrategy = dynamic(
  () => import("../_components/platform-strategy")
);
const ArchitectureExplorer = dynamic(
  () => import("../_components/architecture-explorer")
);
const Showcase = dynamic(() => import("../_components/showcase"));
const Testimonials = dynamic(() => import("../_components/testimonials"));
const FeaturedBlogCarousel = dynamic(
  () => import("../_components/featured-blog-carousel")
);

async function getData() {
  try {
    const [projects, testimonials, services, settings, featuredBlogs] =
      await Promise.all([
        client.fetch(projectsQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(testimonialsQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(servicesQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(settingsQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(featuredBlogPostsQuery, {}, { next: { revalidate: 60 } }),
      ]);

    return { projects, testimonials, services, settings, featuredBlogs };
  } catch (error) {
    console.error("Sanity data fetch error:", error);
    return {
      projects: [],
      testimonials: [],
      services: [],
      settings: null,
      featuredBlogs: [],
    };
  }
}

export default async function Home() {
  const { testimonials, settings, featuredBlogs } = await getData();

  return (
    <>
      <Header />
      <Scroll3DBackground />
      <main className="relative z-10 text-[#F0F0F5] overflow-hidden">
        {/* 1. Hero: Turn your product idea into a focused MVP */}
        <section id="home">
          <Hero />
        </section>

        {/* 2. Problem/Value: DIY Prototyping vs Accountable Technical Partner */}
        <section id="approach">
          <Comparison />
        </section>

        {/* 3. The 6-Step Scope-to-Launch Process */}
        <section id="process">
          <Process />
        </section>

        {/* 4. Platform Strategy: Web vs Mobile First Decision */}
        <section id="platform-strategy">
          <PlatformStrategy />
        </section>

        {/* 5. Primary Offer (MVP) & Secondary Services (Rescue / Improvement) with ₹50,000 floor */}
        <section id="services">
          <Features />
        </section>

        {/* 6. Interactive Architecture Explorer */}
        <section id="architecture">
          <ArchitectureExplorer />
        </section>

        {/* 7. Proof: EV Dock, DalalFree, and MVP Delivery */}
        <section id="work">
          <Showcase />
        </section>

        {/* 8. Studio Philosophy & Pillars */}
        <section id="about">
          <About about={settings?.about} />
        </section>

        {/* 9. Executive Endorsements & Proof */}
        <section id="testimonials">
          <Testimonials
            testimonials={testimonials}
            stats={settings?.testimonialStats}
          />
        </section>

        {/* 10. Founder Insights Dispatch */}
        {featuredBlogs && featuredBlogs.length > 0 && (
          <section id="blog">
            <FeaturedBlogCarousel posts={featuredBlogs} />
          </section>
        )}
      </main>

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