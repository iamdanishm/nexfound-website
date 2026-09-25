"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion, Variants } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

export default function CTA({ contactEmail = "hello@nexfound.in", contactPhone = "+91 9321456661" }: CTAProps) {
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState("Web App First");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        { duration: 6000, icon: "🚀" }
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Feel free to message on WhatsApp directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Danish! I saw Nexfound and have a product idea I want to launch in 30 days. Let's discuss."
  );

  return (
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full opacity-15 pointer-events-none blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(223, 202, 159, 0.22) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Provocative Reel Hook */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 text-left">
              <div>
                <div className="studio-badge mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>The Final Decision</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
                  <span>So... what are you going to do with </span>
                  <span className="text-gold-gradient block">your idea?</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  Leave it in your notes app for another year, or have a live, payment-ready product in customers&apos; hands next month?
                </p>
              </div>

              {/* Instant WhatsApp Priority Button */}
              <div className="p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/25 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Hate filling forms? Chat directly</span>
                </div>
                <a
                  href={`https://wa.me/919321456661?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <span>Chat with Danish on WhatsApp</span>
                  <span>💬</span>
                </a>
                <div className="text-[11px] text-zinc-400 text-center font-mono">
                  Direct reply &middot; {contactPhone} &middot; {contactEmail}
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 text-xs text-zinc-300 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% honest feasibility &amp; ruthless scope cut</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Transparent starting floor of ₹50,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Direct technical discussion with the engineer</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 60-Second Fast Idea Drop */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="bg-[#08080C]/95 p-6 sm:p-8 rounded-3xl border border-white/[0.1] shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    60-Second Fast Idea Drop
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Takes 1 Minute
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Step 1: Idea in one sentence */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5 font-semibold">
                      1. What do you want to build? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. A direct booking link for local fitness trainers with 1-click UPI payments..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0C0D16] border border-white/[0.1] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
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
                          className={`py-2 px-2 rounded-xl text-xs font-mono font-medium transition-all ${
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0D16] border border-white/[0.1] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white/30 transition-colors"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0D16] border border-white/[0.1] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>
                      {isSubmitting ? "Sending Your Idea..." : "Send My Idea for 30-Day Launch"}
                    </span>
                    <span>→</span>
                  </button>

                  <div className="pt-2 text-center text-[11px] text-zinc-400 font-mono">
                    Already have an existing app that needs rescue? Mention it in the idea box.
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}