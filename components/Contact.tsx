"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useState } from "react";

interface ContactData {
  email: string;
  linkedinUrl: string;
  heading: string;
  description: string;
}

export default function Contact({ data }: { data: ContactData }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split heading for styling
  const headingParts = data.heading.split(" ");
  const firstWords = headingParts.slice(0, 2).join(" ");
  const restWords = headingParts.slice(2).join(" ");

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-ink text-cream overflow-hidden py-24 md:py-32 px-6 md:px-16"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent shapes — enhanced */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl animate-float-delay" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/8 blur-xl animate-float-slow" style={{ animationDelay: "1s" }} />

      {/* Orbiting geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-accent/30 rounded-full" style={{ animation: "orbit 10s linear infinite" }} />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent/20 rounded-full" style={{ animation: "orbit 14s linear reverse infinite" }} />

      {/* Decorative corner elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-accent/20 rotate-45 animate-spin-slow opacity-30" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border border-cream/10 rotate-12 animate-pulse-slow opacity-30" />
      {/* Morphing shape */}
      <div
        className="absolute top-1/3 right-1/6 w-24 h-24 bg-accent/5 blur-xl opacity-40"
        style={{
          borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
          animation: "morphSpin 10s ease-in-out infinite",
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p
          className={`font-mono text-[0.68rem] tracking-[0.25em] uppercase text-accent mb-6 flex items-center justify-center gap-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <span className="block w-6 h-px bg-accent" />
          Get in touch
          <span className="block w-6 h-px bg-accent" />
        </p>

        {/* Standard fading heading */}
        <h2
          className={`font-playfair text-[clamp(2.8rem,6vw,5rem)] font-black leading-[1.0] tracking-tight mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="block">{firstWords}</span>
          <em className="italic text-accent">
            {restWords}
          </em>
        </h2>

        <p
          className={`font-dm text-[0.93rem] text-cream/60 leading-[1.85] mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          style={{ transitionDelay: "200ms" }}
        >
          {data.description}
        </p>

        {/* Contact buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Email copy button */}
          <button
            onClick={copyEmail}
            className="group relative font-mono text-[0.75rem] tracking-[0.1em] uppercase bg-accent text-ink px-7 py-3.5 border border-accent hover:bg-transparent hover:text-accent transition-all duration-300 flex items-center gap-2.5 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 btn-ripple"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5] group-hover:animate-bounce-gentle">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {copied ? "Copied! ✓" : "Copy Email"}
          </button>

          {/* LinkedIn */}
          <a
            href={data.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-[0.75rem] tracking-[0.1em] uppercase text-cream border border-cream/30 px-7 py-3.5 hover:border-cream hover:bg-cream/5 transition-all duration-300 flex items-center gap-2.5 hover:scale-105 hover:shadow-lg hover:shadow-cream/10 btn-ripple"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover:animate-wiggle">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn — Active</span>
          </a>
        </div>

        {/* Email display */}
        <p
          className={`font-mono text-[0.7rem] tracking-[0.12em] text-cream/40 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"
            }`}
          style={{ transitionDelay: "400ms" }}
        >
          {data.email}
        </p>
      </div>
    </section>
  );
}
