import Header from "../_components/header";
import Hero from "../_components/hero";
import {
  LazyFeatures,
  LazyShowcase,
  LazyTestimonials,
  LazyAbout,
  LazyFeaturedBlogCarousel,
} from "../_components/lazy-section";
import ContactFooter from "../_components/contact-footer";
import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  servicesQuery,
  settingsQuery,
  testimonialsQuery,
  featuredBlogPostsQuery,
} from "../lib/queries";

async function getData() {
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
}

export default async function Home() {
  const { projects, testimonials, services, settings, featuredBlogs } =
    await getData();

  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Hero hero={settings?.hero} />
        </section>
        <section id="services">
          <LazyFeatures services={services} />
        </section>
        <section id="work">
          <LazyShowcase projects={projects} />
        </section>
        <section id="about">
          <LazyAbout about={settings?.about} />
        </section>
        <section id="testimonials">
          <LazyTestimonials
            testimonials={testimonials}
            stats={settings?.testimonialStats}
          />
        </section>
        {featuredBlogs && featuredBlogs.length > 0 && (
          <section id="blog">
            <LazyFeaturedBlogCarousel posts={featuredBlogs} />
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