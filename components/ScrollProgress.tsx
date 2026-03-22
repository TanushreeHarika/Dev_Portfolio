"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px]">
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #C8A96E, #E8D5A8, #C8A96E)",
          backgroundSize: "200% 100%",
          animation: "gradientShift 3s ease infinite",
          boxShadow: "0 0 10px rgba(200,169,110,0.4), 0 0 20px rgba(200,169,110,0.2)",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
