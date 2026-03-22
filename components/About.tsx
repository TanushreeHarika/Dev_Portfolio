"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useEffect, useRef, useState, useCallback } from "react";

interface AboutData {
  bioParas: string[];
  softSkills: { icon: string; title: string; note: string; highlight: boolean }[];
  techSkills: { name: string; pct: number }[];
  currentlyExploring: string[];
  leetcode: { profileUrl: string; statusText: string; description: string };
}

// Counting animation hook
function useCountUp(target: number, visible: boolean, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, target, duration]);

  return count;
}

function SkillBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const count = useCountUp(pct, visible, 1200 + delay);

  return (
    <div
      ref={ref}
      className="flex justify-between items-center py-3 px-4 border-b border-border hover:bg-surface/80 hover:px-6 transition-all duration-300 cursor-default group"
    >
      <span className="font-dm text-[0.85rem] font-medium text-ink group-hover:text-accent transition-colors duration-300">{name}</span>
      <div className="flex items-center gap-3">
        <div className="w-20 h-[2px] bg-border relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-accent transition-all duration-1000 ease-out group-hover:bg-accent-light skill-bar-glow"
            style={{
              width: visible ? `${pct}%` : "0%",
              transitionDelay: `${delay}ms`,
            }}
          />
        </div>
        <span className="font-mono text-[0.65rem] text-muted w-8 text-right group-hover:text-ink transition-colors duration-300 tabular-nums">
          {count}%
        </span>
      </div>
    </div>
  );
}

// Magnetic 3D tilt card
function MagneticCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`);
  }, []);

  const onMouseLeave = useCallback(() => {
    setTransform("perspective(400px) rotateX(0) rotateY(0) scale(1)");
  }, []);

  return (
    <div
      ref={ref}
      className={`magnetic-card ${className || ""}`}
      style={{ ...style, transform }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export default function About({ data }: { data: AboutData }) {
  const { ref: leftRef, visible: leftVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: rightRef, visible: rightVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="border-b border-border">
      <div className="grid md:grid-cols-2">
        {/* Left */}
        <div
          ref={leftRef}
          className="px-6 md:px-16 py-20 border-b md:border-b-0 md:border-r border-border"
        >
          <p
            className={`section-label mb-8 transition-all duration-700 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
          >
            About me
          </p>
          <h2
            className={`font-playfair text-[clamp(2.2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-tight mb-8 transition-all duration-700 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            Still learning,<br />
            <em className="italic text-accent">always building.</em>
          </h2>

          {data.bioParas.map((para, i) => (
            <p
              key={i}
              className={`font-dm text-[0.93rem] text-muted leading-[1.9] mb-5 max-w-[42ch] transition-all duration-700 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {para}
            </p>
          ))}

          {/* Soft skills — magnetic 3D tilt cards with staggered cascade */}
          <div
            className={`grid grid-cols-2 gap-3 transition-all duration-700 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            {data.softSkills.map((s, i) => (
              <MagneticCard
                key={s.title}
                className={`p-4 border hover-glow group cursor-pointer ${s.highlight
                    ? "border-accent bg-accent/8"
                    : "border-border bg-parchment"
                  }`}
                style={{
                  opacity: leftVisible ? 1 : 0,
                  transform: leftVisible
                    ? "translateX(0) translateY(0)"
                    : i % 2 === 0
                      ? "translateX(-30px) translateY(10px)"
                      : "translateX(30px) translateY(10px)",
                  transition: `opacity 0.6s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)`,
                  transitionDelay: `${500 + i * 100}ms`,
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{s.icon}</span>
                  <span className="font-dm text-[0.82rem] font-medium text-ink group-hover:text-accent transition-colors duration-300">
                    {s.title}
                  </span>
                  {s.highlight && (
                    <span className="font-mono text-[0.55rem] tracking-wider uppercase bg-accent text-ink px-1.5 py-0.5 ml-auto group-hover:animate-bounce-gentle">
                      ★
                    </span>
                  )}
                </div>
                <p className="font-dm text-[0.75rem] text-muted leading-snug group-hover:text-muted/80 transition-colors">{s.note}</p>
              </MagneticCard>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          id="skills"
          ref={rightRef}
          className={`px-6 md:px-16 py-20 transition-all duration-700 ${rightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <p className="section-label mb-4">Tech I've Used</p>
          <p className="font-playfair italic text-muted text-lg mb-8">
            Honest skill levels — no cap.
          </p>

          <div className="border border-border mb-8">
            {data.techSkills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 80} />
            ))}
          </div>

          {/* LeetCode callout */}
          <div className="border border-dashed border-accent/50 bg-accent/5 p-5 mb-5 group hover:border-accent hover:bg-accent/10 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">⚡</span>
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-accent mb-1">
                  LeetCode Journey
                </p>
                <p className="font-dm text-[0.85rem] text-ink font-medium mb-1">
                  {data.leetcode.statusText.includes("learning") ? (
                    <>
                      Actively in{" "}
                      <span className="italic font-playfair">learning phase.</span>
                    </>
                  ) : (
                    data.leetcode.statusText
                  )}
                </p>
                <p className="font-dm text-[0.78rem] text-muted leading-relaxed group-hover:text-muted/80 transition-colors">
                  {data.leetcode.description}
                </p>
                <a
                  href={data.leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 font-mono text-[0.65rem] tracking-wider uppercase text-accent hover:text-ink hover:gap-2 transition-all duration-300"
                >
                  View Profile →
                </a>
              </div>
            </div>
          </div>

          {/* Currently exploring */}
          <div className="border border-border bg-parchment p-5 group hover:border-accent/50 transition-all duration-300">
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-3 group-hover:text-ink transition-colors duration-300">
              Currently exploring
            </p>
            <div className="flex flex-wrap gap-2">
              {data.currentlyExploring.map((item, i) => (
                <span
                  key={item}
                  className="font-mono text-[0.65rem] tracking-wider uppercase text-accent border border-accent/40 bg-accent/5 px-2.5 py-1 group-hover:bg-accent group-hover:text-ink group-hover:border-accent transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
