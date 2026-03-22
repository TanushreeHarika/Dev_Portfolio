"use client";
import { useEffect, useState } from "react";

export default function PageLoader({ initials = "TH" }: { initials?: string }) {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  useEffect(() => {
    // Brief logo display, then reveal
    const t1 = setTimeout(() => setPhase("revealing"), 800);
    const t2 = setTimeout(() => setPhase("done"), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      {/* Left curtain */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: "linear-gradient(135deg, #F5F0E8, #EFEBE0)",
          transform: phase === "revealing" ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      {/* Right curtain */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: "linear-gradient(225deg, #F5F0E8, #EFEBE0)",
          transform: phase === "revealing" ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      {/* Center logo */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: phase === "revealing" ? 0 : 1,
          transform: phase === "revealing" ? "scale(0.8)" : "scale(1)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <span
          className="font-playfair text-5xl md:text-7xl font-black italic select-none"
          style={{ color: "#0D0D0D" }}
        >
          {initials}<span style={{ color: "#C8A96E" }}>.</span>
        </span>
      </div>
      {/* Gold line accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: phase === "loading" ? "80px" : "0px",
          height: "1px",
          background: "#C8A96E",
          transition: "width 0.6s ease",
          transitionDelay: phase === "revealing" ? "0s" : "0.3s",
        }}
      />
    </div>
  );
}
