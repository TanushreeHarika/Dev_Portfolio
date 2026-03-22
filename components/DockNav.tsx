"use client";
import { useState, useEffect } from "react";

const dockItems = [
  {
    href: "#hero",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    href: "#about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-1a7 7 0 0114 0v1" />
      </svg>
    ),
  },
  {
    href: "#projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="7" width="18" height="13" rx="1" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M12 12v3" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    href: "#experience",
    label: "Experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h4" />
      </svg>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Resume",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9 15l3 3 3-3" />
      </svg>
    ),
    isSpecial: true,
  },
];

export default function DockNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Show dock after scrolling past hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
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
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div
        className="dock-container flex items-end gap-1 px-3 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
        style={{
          background: "linear-gradient(135deg, rgba(253,251,247,0.92), rgba(239,235,224,0.95))",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          border: "1px solid rgba(216,208,192,0.5)",
        }}
      >
        {dockItems.map((item, i) => {
          const isActive =
            activeSection === item.href.slice(1) ||
            (item.href === "#hero" && activeSection === "hero");
          const isHovered = hoveredIdx === i;
          const someHovered = hoveredIdx !== null;

          // Scale: hovered → big, neighbors scale down slightly
          const getScale = () => {
            if (!someHovered) return 1;
            if (isHovered) return 1;   // hovered item stays 1x but expands via width
            return 0.88;               // others contract
          };

          const getTranslateY = () => {
            if (!someHovered) return 0;
            if (isHovered) return -6;
            const dist = Math.abs(i - hoveredIdx!);
            if (dist === 1) return -2;
            return 0;
          };

          return (
            <div
              key={item.label}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Icon button — expands to show label on hover */}
              <a
                href={item.href}
                className={`dock-item relative flex items-center justify-center gap-0 rounded-full overflow-hidden whitespace-nowrap ${
                  item.isSpecial ? "ml-1" : ""
                } ${
                  isActive && !item.isSpecial
                    ? "text-[#C8A96E]"
                    : "text-[#6B6560] hover:text-[#0D0D0D]"
                }`}
                style={{
                  height: "42px",
                  width: isHovered ? "auto" : "42px",
                  minWidth: "42px",
                  paddingLeft: isHovered ? "14px" : "0",
                  paddingRight: isHovered ? "16px" : "0",
                  gap: isHovered ? "8px" : "0",
                  transform: `scale(${getScale()}) translateY(${getTranslateY()}px)`,
                  transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  background: item.isSpecial
                    ? "rgba(200,169,110,0.12)"
                    : isActive
                    ? "rgba(200,169,110,0.18)"
                    : isHovered
                    ? "rgba(200,169,110,0.1)"
                    : "transparent",
                  border: item.isSpecial
                    ? "1px solid rgba(200,169,110,0.3)"
                    : "1px solid transparent",
                  boxShadow: isActive && !item.isSpecial
                    ? "0 0 12px rgba(200,169,110,0.15), inset 0 0 6px rgba(200,169,110,0.08)"
                    : item.isSpecial && isHovered
                    ? "0 0 16px rgba(200,169,110,0.2)"
                    : "none",
                }}
              >
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                  {item.icon}
                </span>
                {/* Inline label — visible on hover */}
                <span
                  className="font-mono text-[0.58rem] tracking-[0.12em] uppercase"
                  style={{
                    maxWidth: isHovered ? "80px" : "0px",
                    opacity: isHovered ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </a>

              {/* Active dot indicator */}
              {isActive && !item.isSpecial && (
                <span
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C8A96E]"
                  style={{
                    boxShadow: "0 0 6px rgba(200,169,110,0.5)",
                    transition: "all 0.3s ease",
                    transform: `translateX(-50%) scale(${isHovered ? 1.5 : 1})`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
