import Header from "./_components/header";
import Hero from "./_components/hero";
import Features from "./_components/features";
import Showcase from "./_components/showcase";
import Testimonials from "./_components/testimonials";
import CTA from "./_components/cta";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Features />
        </section>
        <section id="work">
          <Showcase />
        </section>
        <section id="about">
          <Testimonials />
        </section>
        <section id="contact">
          <CTA />
        </section>
      </main>
      <Footer />
    </>
  );
}
