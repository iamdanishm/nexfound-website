"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type CTAData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  description?: string;
  formTitle?: string;
  quickContactTitle?: string;
  whyChooseTitle?: string;
  whyChoosePoints?: string[];
};

type CTAProps = {
  cta?: CTAData;
  contactEmail?: string;
  contactPhone?: string;
};

export default function CTA({ cta, contactEmail, contactPhone }: CTAProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const badgeText = cta?.badgeText ?? "Let's Connect";
  const mainHeading = cta?.mainHeading ?? "Ready to Build";
  const highlightedText = cta?.highlightedText ?? "Something Extraordinary?";
  const description =
    cta?.description ??
    "Transform your vision into reality. Schedule a consultation with our team and discover how we can elevate your digital presence.";
  const formTitle = cta?.formTitle ?? "Get Started Today";
  const quickContactTitle = cta?.quickContactTitle ?? "Quick Contact";
  const email = contactEmail ?? "hello@nexfound.in";
  const phone = contactPhone ?? "+91 8286556661";
  const whyChooseTitle = cta?.whyChooseTitle ?? "Why Nexfound?";
  const whyChoosePoints =
    cta?.whyChoosePoints && cta.whyChoosePoints.length > 0
      ? cta.whyChoosePoints
      : [
          "48-hour response guarantee",
          "Dedicated project manager",
          "Transparent pricing model",
          "Post-launch support included",
        ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success
      setFormData({ name: "", email: "", company: "", message: "" });
      toast.success(
        "Thank you for reaching out! We've received your message and will get back to you within 24 hours.",
        {
          duration: 6000,
          icon: "✨",
        }
      );
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : `We couldn't send your message. Please try again or email us at ${email}`,
        {
          duration: 7000,
          icon: "⚠️",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-12 md:py-12 lg:py-12"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#B08D57] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#1A7F6B] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(176, 141, 87, 0.1) 0%, rgba(244, 230, 192, 0.05) 100%)",
              border: "1px solid rgba(176, 141, 87, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-sm font-medium text-[#F4E6C0] tracking-wide">
              {badgeText}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">{mainHeading}</span>
            <span className="block text-gold-gradient text-shadow-gold">
              {highlightedText}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="liquid-glass--intense p-8 md:p-10 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    focusedField === "name"
                      ? "text-gold-gradient"
                      : "text-[#E0E0E0]"
                  }`}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    focusedField === "email"
                      ? "text-gold-gradient"
                      : "text-[#E0E0E0]"
                  }`}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                  placeholder="john@company.com"
                />
              </div>

              {/* Company Field */}
              <div>
                <label
                  htmlFor="company"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    focusedField === "company"
                      ? "text-gold-gradient"
                      : "text-[#E0E0E0]"
                  }`}
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                  placeholder="Your Company Ltd."
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    focusedField === "message"
                      ? "text-gold-gradient"
                      : "text-[#E0E0E0]"
                  }`}
                >
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project goals and requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info & Features */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="liquid-glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                {quickContactTitle}
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 text-[#E0E0E0] hover:text-gold-gradient transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B08D57] to-[#F4E6C0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#B3B3B3]">Email</div>
                    <div className="font-medium">{email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 text-[#E0E0E0] hover:text-gold-gradient transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A7F6B] to-[#0D3B66] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#B3B3B3]">Phone</div>
                    <div className="font-medium">{phone}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="liquid-glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                {whyChooseTitle}
              </h3>
              <ul className="space-y-4">
                {whyChoosePoints.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#B08D57] to-[#F4E6C0] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-[#E0E0E0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
