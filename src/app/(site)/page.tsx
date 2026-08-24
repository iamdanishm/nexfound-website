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
  const { projects, testimonials, services, settings, featuredBlogs } =
    await getData();

  return (
    <>
      <Header />
      <Scroll3DBackground />
      <main className="relative z-10 text-[#F0F0F5] overflow-hidden">
        <section id="home">
          <Hero hero={settings?.hero} />
        </section>

        {/* The Nexfound Standard vs Traditional Agency Trap */}
        <section id="standard">
          <Comparison />
        </section>

        {/* Core Capabilities */}
        <section id="services">
          <Features services={services} />
        </section>

        {/* Interactive Architecture Explorer */}
        <section id="architecture">
          <ArchitectureExplorer />
        </section>

        {/* Case Studies & Work */}
        <section id="work">
          <Showcase projects={projects} />
        </section>

        {/* Studio Philosophy & Pillars */}
        <section id="about">
          <About about={settings?.about} />
        </section>

        {/* Executive Endorsements & Proof */}
        <section id="testimonials">
          <Testimonials
            testimonials={testimonials}
            stats={settings?.testimonialStats}
          />
        </section>

        {/* AI Diagnostic Workstation (Temporarily commented as requested) */}
        {/* <section id="audit">
          <AuditChat />
        </section> */}

        {/* Founder Insights Dispatch */}
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