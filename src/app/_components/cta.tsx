"use client";

import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        },
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
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 rotate-45 animate-float-slow opacity-40" />
        <div className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 rotate-12 animate-float-medium opacity-30" />
        <div className="absolute top-1/3 left-10 w-28 h-28 bg-[#F4E6C0]/10 rounded-full animate-float-fast opacity-25" />
        <div className="absolute bottom-1/4 right-20 w-40 h-40 border border-[#B08D57]/25 rotate-60 animate-float-slow opacity-35" />
      </div>

      <div className="container-custom relative z-10 px-6 py-5 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 backdrop-blur-md border transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(176, 141, 87, 0.15) 0%, rgba(244, 230, 192, 0.08) 100%)",
                borderColor: "rgba(176, 141, 87, 0.4)",
                boxShadow: "0 8px 32px rgba(176, 141, 87, 0.1)",
              }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-[#B08D57] rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-[#F4E6C0] rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold text-[#F4E6C0] tracking-wide uppercase">
                {badgeText}
              </span>
            </div>

            {/* Premium Title */}
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              <span className="block text-white mb-3">{mainHeading}</span>
              <span
                className="block bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                }}
              >
                {highlightedText}
              </span>
            </h2>

            {/* Enhanced Description */}
            <p
              className={`text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Communication Documents Layout */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 transition-all duration-1000 delay-600 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            {/* Project Inquiry Document - Contact Form */}
            <div
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B08D57]/40 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/10"
              style={{
                boxShadow:
                  "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Document Header - Form Title Tab Style */}
              <div className="relative h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                    {formTitle}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-white/60">
                    Secure Submission
                  </span>
                </div>
              </div>

              {/* Document Content - Form Body */}
              <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Company Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                      placeholder="Your Company Ltd."
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project goals and requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
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

                {/* Archive Stamp */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30 font-mono transform -rotate-12">
                    SECURE
                  </div>
                </div>
              </div>

              {/* Page Curl Effect */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-white/5 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Communication Protocols - Contact Info */}
            <div className="space-y-8">
              {/* Contact Protocol Document */}
              <div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B08D57]/40 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/10"
                style={{
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Document Header */}
                <div className="relative h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                      {quickContactTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-white/60">
                      Always Available
                    </span>
                  </div>
                </div>

                {/* Document Content */}
                <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
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

                  {/* Archive Stamp */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/30 font-mono transform -rotate-12">
                      ACTIVE
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Charter Document */}
              <div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B08D57]/40 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/10"
                style={{
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Document Header */}
                <div className="relative h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                      {whyChooseTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-white/60">Guaranteed</span>
                  </div>
                </div>

                {/* Document Content */}
                <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
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

                  {/* Archive Stamp */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded border border-purple-500/30 font-mono transform -rotate-12">
                      COMMITTED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
