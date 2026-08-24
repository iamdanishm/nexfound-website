import Header from "../_components/header";
import Hero from "../_components/hero";
import Comparison from "../_components/comparison";
import Features from "../_components/features";
import ArchitectureExplorer from "../_components/architecture-explorer";
import Showcase from "../_components/showcase";
import About from "../_components/about";
import Testimonials from "../_components/testimonials";
import FeaturedBlogCarousel from "../_components/featured-blog-carousel";
import ContactFooter from "../_components/contact-footer";
// import AuditChat from "../_components/audit-chat";
import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  servicesQuery,
  settingsQuery,
  testimonialsQuery,
  featuredBlogPostsQuery,
} from "../lib/queries";

async function getData() {
  try {
    const [projects, testimonials, services, settings, featuredBlogs] =
      await Promise.all([
        client.fetch(
          projectsQuery,
          {},
          { cache: "no-cache", next: { revalidate: 60 } }
        ),
        client.fetch(
          testimonialsQuery,
          {},
          { cache: "no-cache", next: { revalidate: 60 } }
        ),
        client.fetch(
          servicesQuery,
          {},
          { cache: "no-cache", next: { revalidate: 60 } }
        ),
        client.fetch(
          settingsQuery,
          {},
          { cache: "no-cache", next: { revalidate: 60 } }
        ),
        client.fetch(
          featuredBlogPostsQuery,
          {},
          { cache: "no-cache", next: { revalidate: 60 } }
        ),
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
      <main className="bg-[#030305] text-[#F0F0F5] overflow-hidden">
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