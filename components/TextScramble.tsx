"use client";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  trigger: boolean;
  className?: string;
  speed?: number;
}

export default function TextScramble({
  text,
  trigger,
  className = "",
  speed = 30,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      
      iteration++;
      if (iteration >= maxIterations) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, text, speed]);

  return <span className={className}>{displayed}</span>;
}
