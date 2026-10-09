"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type CTAData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  description?: string;
};

type CTAProps = {
  cta?: CTAData;
  contactEmail?: string;
  contactPhone?: string;
};

const PLATFORMS = ["Web App First", "Mobile App First", "Help Me Decide"];

export default function CTA({
  contactEmail = "hello@nexfound.in",
  contactPhone = "+91 9321456661",
}: CTAProps) {
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState("Web App First");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mouse spotlight coordinates handler
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = `
[PLATFORM PREFERENCE]: ${platform}
[CONTACT INFO]: ${contact}
[PRODUCT IDEA]:
${idea}
    `.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Founder",
          email: contact.includes("@") ? contact : "contact-via-phone@nexfound.in",
          message: formattedMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send idea");
      }

      setIdea("");
      setContact("");
      setName("");
      toast.success(
        "Idea received! Danish will review your scope and reply within 24 hours.",
        { duration: 6000 }
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please message on WhatsApp directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Danish! I saw Nexfound and have a product idea I want to launch in 30 days. Let's discuss."
  );

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Accent Halo */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,202,159,0.06)_0%,rgba(223,202,159,0.01)_50%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Direct Founder Callout */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <div className="studio-badge mb-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
                  <span>Sprint Commencement</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-normal [word-spacing:0.24em] text-white mb-4 leading-tight">
                  Ready to launch your product{" "}
                  <span className="text-gold-gradient block">in 30 days?</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  Drop your raw concept below or chat directly with Danish on WhatsApp.
                  We review your scope, identify your single core revenue flow, and reply within 24 hours.
                </p>
              </div>

              {/* Direct WhatsApp Action Box */}
              <div
                onMouseMove={handleSpotlight}
                className="spotlight-card p-4 rounded-2xl border-[#DFCA9F]/30 bg-[#DFCA9F]/[0.04] space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#DFCA9F] font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#DFCA9F] animate-pulse" />
                  <span>Direct Founder Access</span>
                </div>
                <a
                  href={`https://wa.me/919321456661?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#DFCA9F]/20 hover:opacity-95 transition-opacity cursor-pointer font-mono"
                >
                  <span>Chat with Danish on WhatsApp</span>
                  <span>→</span>
                </a>
                <div className="text-[11px] text-zinc-400 text-center font-mono">
                  Direct reply within 2 hours &middot; {contactPhone} &middot; {contactEmail}
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2.5 text-xs text-zinc-300 pt-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>100% transparent scope audit &amp; ruthless bloat removal</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Fixed sprint fees: Design from ₹49k · Production MVP from ₹1.49L*</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Direct technical discussion with senior engineers—zero account managers</span>
                </div>
              </div>
            </div>

            {/* Right Column: 60-Second Fast Intake Drop with Spotlight Card */}
            <div className="lg:col-span-7">
              <div
                onMouseMove={handleSpotlight}
                className="spotlight-card p-6 sm:p-8 rounded-3xl bg-[#090A0E] border border-white/[0.12] shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    60-Second Founder Brief
                  </span>
                  <span className="text-[11px] font-mono text-[#DFCA9F] bg-[#DFCA9F]/10 px-2.5 py-0.5 rounded border border-[#DFCA9F]/20">
                    Takes 60 Seconds
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 1: Idea */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5 font-semibold">
                      1. What do you want to build? *
                    </label>
                    <textarea
                      name="idea"
                      required
                      rows={3}
                      placeholder="e.g. A marketplace connecting verified commercial EV chargers with logistics fleets, with live Razorpay automated settlement..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#06060A] border border-white/[0.1] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#DFCA9F]/50 transition-colors resize-none font-sans"
                    />
                  </div>

                  {/* Step 2: Preferred Platform */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5 font-semibold">
                      2. Preferred First Platform
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setPlatform(p)}
                          className={`py-2 px-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                            platform === p
                              ? "bg-white text-black font-bold shadow-md"
                              : "bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5 font-semibold">
                        3. Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#06060A] border border-white/[0.1] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#DFCA9F]/50 transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5 font-semibold">
                        WhatsApp or Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Phone or email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#06060A] border border-white/[0.1] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#DFCA9F]/50 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-[0_10px_25px_rgba(223,202,159,0.35)]"
                  >
                    <span>
                      {isSubmitting ? "Submitting Brief..." : "Submit Brief for 30-Day Sprint"}
                    </span>
                    <span>→</span>
                  </button>

                  <div className="pt-2 text-center text-[11px] text-zinc-500 font-mono">
                    Direct founder review. We reply within 24 hours with an honest scope and architecture plan.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}