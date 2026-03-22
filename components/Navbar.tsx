"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ initials = "TH" }: { initials?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-16 py-4 md:py-5">
          {/* Logo */}
          <Link
            href="/login"
            className="font-playfair text-lg font-black italic text-ink hover:text-accent transition-colors duration-300 tracking-tight group"
          >
            {initials}<span className="text-accent group-hover:animate-pulse">.</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors duration-200 relative group ${
                    activeSection === link.href.slice(1)
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="relative z-10 group-hover:tracking-[0.18em] transition-all duration-300">
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ease-out ${
                      activeSection === link.href.slice(1)
                        ? "w-full"
                        : "w-0 group-hover:w-full group-hover:animate-pulse-glow"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:block font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-cream transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-ink/20"
            >
              Hire Me
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 group cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px bg-ink transition-all duration-300 origin-center group-hover:bg-accent ${
                  menuOpen ? "rotate-45 translate-y-[5px] w-full" : "w-full"
                }`}
              />
              <span
                className={`block h-px bg-ink transition-all duration-300 group-hover:bg-accent ${
                  menuOpen ? "opacity-0 w-0" : "w-4/5"
                }`}
              />
              <span
                className={`block h-px bg-ink transition-all duration-300 origin-center group-hover:bg-accent ${
                  menuOpen ? "-rotate-45 -translate-y-[5px] w-full" : "w-full"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-cream flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-playfair text-4xl font-black italic text-ink hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: "transform 0.4s ease, opacity 0.4s ease",
            }}
          >
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm tracking-widest uppercase border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-all"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
