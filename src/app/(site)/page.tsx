import Header from "../_components/header";
import Hero from "../_components/hero";
import Features from "../_components/features";
import Showcase from "../_components/showcase";
import Testimonials from "../_components/testimonials";
import CTA from "../_components/cta";
import Footer from "../_components/footer";
import About from "../_components/about";
import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  servicesQuery,
  settingsQuery,
  testimonialsQuery,
} from "../lib/queries";

// Fetch data server-side (App Router default)
async function getData() {
  const [projects, testimonials, services, settings] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(testimonialsQuery),
    client.fetch(servicesQuery),
    client.fetch(settingsQuery),
  ]);

  return { projects, testimonials, services, settings };
}

export default async function Home() {
  const { projects, testimonials, services, settings } = await getData();

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
          <Testimonials testimonials={testimonials} />
        </section>
        <section id="contact">
          <CTA
            cta={settings?.cta}
            contactEmail={settings?.contactEmail}
            contactPhone={settings?.contactPhone}
          />
        </section>
      </main>
      <Footer footer={settings?.footer} socialLinks={settings?.socialLinks} />
    </>
  );
}
