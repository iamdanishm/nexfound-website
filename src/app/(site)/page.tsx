import Header from "../_components/header";
import Hero from "../_components/hero";
import Features from "../_components/features";
import Showcase from "../_components/showcase";
import Testimonials from "../_components/testimonials";
import About from "../_components/about";
import FeaturedBlogCarousel from "../_components/featured-blog-carousel";
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
          <Features services={services} />
        </section>
        <section id="work">
          <Showcase projects={projects} />
        </section>
        <section id="about">
          <About about={settings?.about} />
        </section>
        <section id="testimonials">
          <Testimonials
            testimonials={testimonials}
            stats={settings?.testimonialStats}
          />
        </section>
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
