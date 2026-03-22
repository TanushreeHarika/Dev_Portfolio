"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useEffect, useRef, useState } from "react";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  desc: string;
  tags: string[];
}

export default function Experience({ data }: { data: ExperienceItem[] }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      // Slight delay so timeline items have started appearing
      const t = setTimeout(() => setLineVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <section id="experience" ref={ref} className="border-b border-border">
      <div className="grid md:grid-cols-2">
        {/* Left */}
        <div className="px-6 md:px-16 py-20 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
          <p
            className={`section-label mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
          >
            My journey so far
          </p>
          <h2
            className={`font-playfair text-[clamp(2.2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-tight mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            Early days,<br /><em className="italic text-accent">big lessons.</em>
          </h2>
          <p
            className={`font-dm text-[0.93rem] text-muted leading-[1.9] max-w-[40ch] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            Still at the start of the journey — but every project, every bug, and every
            collaboration has taught me something real.
          </p>
        </div>

        {/* Right timeline */}
        <div className="px-6 md:px-16 py-20">
          <div className="relative ml-2 pl-8 flex flex-col gap-0">
            {/* Self-drawing timeline line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-0 bottom-0 w-px bg-border"
              style={{
                transformOrigin: "top",
                transform: lineVisible ? "scaleY(1)" : "scaleY(0)",
                transition: "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Animated glow on the line */}
              <div
                className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-accent/40 to-transparent"
                style={{
                  animation: lineVisible ? "scrollLine 3s ease-in-out infinite" : "none",
                }}
              />
            </div>

            {data.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} parentVisible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  parentVisible,
}: {
  item: ExperienceItem;
  index: number;
  parentVisible: boolean;
}) {
  return (
    <div
      className={`relative pb-10 last:pb-0 group hover:pl-2`}
      style={{
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible
          ? "translateX(0) translateY(0)"
          : index % 2 === 0
            ? "translateX(-30px) translateY(10px)"
            : "translateX(30px) translateY(10px)",
        transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${index * 200 + 400}ms`,
      }}
    >
      {/* Timeline dot with radar ring */}
      <div className="timeline-dot radar-ring absolute -left-[2.65rem] top-[0.35rem] w-2.5 h-2.5 rounded-full border-2 border-accent bg-cream group-hover:bg-accent group-hover:scale-125" />

      <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-accent mb-1.5 group-hover:tracking-[0.2em] transition-all duration-300">
        {item.period}
      </p>
      <h3 className="font-playfair text-[1.15rem] font-bold text-ink mb-0.5 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
        {item.role}
      </h3>
      <p className="font-dm text-[0.8rem] text-muted font-medium mb-3 group-hover:text-ink transition-colors duration-300">{item.company}</p>
      <p className="font-dm text-[0.82rem] text-muted leading-relaxed mb-3 max-w-[40ch] group-hover:text-muted/80 transition-colors">
        {item.desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag, i) => (
          <span
            key={tag}
            className="tag-scatter font-mono text-[0.58rem] tracking-[0.1em] uppercase text-muted bg-surface border border-border px-2 py-0.5 group-hover:border-accent/50 group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300 hover:scale-105"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
