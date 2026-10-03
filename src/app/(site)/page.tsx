import CinematicReel from "../_components/cinematic-reel";

export const metadata = {
  title: "Turn Your Product Idea Into a Focused MVP",
  description:
    "We help founders and businesses turn raw concepts into live, payment-ready web and mobile MVPs in 30 days—sprints starting from ₹1,49,000* (Design Sprints from ₹49,000).",
};

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#030305]">
      <CinematicReel />
    </main>
  );
}