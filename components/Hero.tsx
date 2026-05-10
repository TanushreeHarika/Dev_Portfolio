"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

interface HeroData {
  name: string;
  initials: string;
  roles: string[];
  bio: string;
  availabilityText: string;
  profilePicture: string; // <--- Add this line here
  socialLinks: { github: string; linkedin: string; };
}

function AnimatedLetters({
  text,
  className,
  startDelay = 0,
  mounted,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  mounted: boolean;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(-40deg)",
            transition: `opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)`,
            transitionDelay: `${startDelay + i * 50}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// Particle field
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      baseAlpha: Math.random() * 0.4 + 0.1,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.parentElement?.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        // Mouse influence
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
          p.alpha = p.baseAlpha + force * 0.4;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 110, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200, 169, 110, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

export default function Hero({ data }: { data: HeroData }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const roles = data.roles;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    if (!current) return;
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx, roles]);

  // Split name into first and last for styling
  const nameParts = data.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid — parallax */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#D8D0C0 1px, transparent 1px), linear-gradient(90deg, #D8D0C0 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 0.1}px)`,
          willChange: "transform",
        }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Floating accent orbs — parallax */}
      <div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/8 blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div
        className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-accent/5 blur-2xl animate-float"
        style={{ animationDelay: "3s", transform: `translateY(${scrollY * -0.08}px)` }}
      />
      {/* Morphing blob */}
      <div
        className="absolute top-1/3 left-1/4 w-40 h-40 bg-accent/5 blur-2xl animate-morph-spin"
        style={{
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          animation: "morphSpin 8s ease-in-out infinite, float 6s ease-in-out infinite",
          transform: `translateY(${scrollY * -0.12}px)`,
        }}
      />

      {/* Decorative corner text */}
      <div className="absolute top-24 right-8 md:right-16 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted opacity-50 writing-mode-vertical hidden md:block"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
        Portfolio · 2025
      </div>

      {/* Content — two-column layout */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-28 pb-16 flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Left column — text content */}
        <div className="flex-1">
          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-accent">
              {data.availabilityText}
            </span>
          </div>

          <div
            className="mb-4"
            style={{ perspective: "600px" }}
          >
            <h1 className="font-playfair text-[clamp(3.5rem,9vw,8rem)] font-black leading-[0.92] tracking-tight">
              <span className="block whitespace-nowrap">
                <AnimatedLetters text={firstName} mounted={mounted} startDelay={300} />
              </span>
              <span className="block italic text-accent whitespace-nowrap">
                <AnimatedLetters text={lastName ? `${lastName}.` : `${firstName}.`} mounted={mounted} startDelay={600} />
              </span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div
            className={`flex items-center gap-0 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "900ms" }}
          >
            <span className="font-playfair text-[clamp(1rem,2.5vw,1.6rem)] italic text-muted">
              {displayed}
            </span>
            <span className="font-playfair text-[clamp(1rem,2.5vw,1.6rem)] italic text-accent animate-cursor">
              |
            </span>
          </div>

          {/* Bio */}
          <p
            className={`font-dm text-[0.95rem] text-muted max-w-[44ch] leading-[1.85] mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "1050ms" }}
          >
            {data.bio}
          </p>

          {/* CTA row */}
          <div
            className={`flex flex-wrap items-center gap-4 mb-16 lg:mb-0 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <a
              href="#projects"
              className="group font-mono text-[0.75rem] tracking-[0.12em] uppercase bg-ink text-cream px-6 py-3 border border-ink hover:bg-transparent hover:text-ink transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-ink/10 shine-sweep btn-ripple"
            >
              <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">View Projects</span>
            </a>
            <a
              href="#contact"
              className="group font-mono text-[0.75rem] tracking-[0.12em] uppercase text-muted border border-border px-6 py-3 hover:border-ink hover:text-ink hover:bg-surface/50 transition-all duration-300 hover:scale-105 shine-sweep"
            >
              <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">Get in Touch</span>
            </a>
            {/* GitHub */}
            <a
              href={data.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-muted hover:text-ink transition-all duration-200 hover:scale-110"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:animate-wiggle">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="font-mono text-[0.68rem] tracking-wider uppercase group-hover:text-accent transition-colors">GitHub</span>
            </a>
            {/* LinkedIn */}
            <a
              href={data.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-muted hover:text-ink transition-all duration-200 hover:scale-110"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:animate-wiggle">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-mono text-[0.68rem] tracking-wider uppercase group-hover:text-accent transition-colors">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right column — animated portrait placeholder */}
        <div
          className={`hidden lg:flex items-center justify-center flex-shrink-0 transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="relative w-[540px] h-[306px] md:w-[640px] md:h-[363px]">
            {/* Outer rotating dashed ring */}
            <div
              className="absolute inset-[-24px] rounded-[2rem] border-2 border-dashed border-accent/20"
              style={{ animation: "portraitSpin 20s linear infinite" }}
            />

            {/* Inner rotating ring (opposite direction) */}
            <div
              className="absolute inset-[-12px] rounded-[1.8rem] border border-accent/10"
              style={{ animation: "portraitSpin 15s linear infinite reverse" }}
            />

            {/* Main portrait frame */}
            <div className="absolute inset-0 rounded-[1.5rem] border-2 border-accent/30 bg-surface/50 overflow-hidden backdrop-blur-sm shadow-[0_20px_60px_rgba(200,169,110,0.08)]">
              {/* Profile Picture */}
              <Image
                src={data.profilePicture}
                alt={`${data.name}'s profile picture`}
                fill
                className="object-cover"
                priority
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-parchment/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Orbiting gold dots */}
            <div className="absolute inset-[-30px]" style={{ animation: "portraitSpin 12s linear infinite" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_8px_rgba(200,169,110,0.4)]" />
            </div>
            <div className="absolute inset-[-25px]" style={{ animation: "portraitSpin 18s linear infinite reverse" }}>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-accent/40" />
            </div>
            <div className="absolute inset-[-35px]" style={{ animation: "portraitSpin 25s linear infinite" }}>
              <div className="absolute top-1/4 right-0 w-1 h-1 rounded-full bg-accent/30" />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl-lg" />

            {/* Pulsing glow behind */}
            <div className="absolute inset-0 -z-10 rounded-[1.5rem] bg-accent/5 blur-2xl" style={{ animation: "portraitPulse 4s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — positioned absolutely at bottom */}
      <div className="absolute bottom-8 left-6 md:left-16 flex flex-col items-start gap-2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-scroll-line" />
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted">
          Scroll
        </span>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
