import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        cream: "#F5F0E8",
        ink: "#0D0D0D",
        muted: "#6B6560",
        accent: "#C8A96E",
        "accent-light": "#E8D5A8",
        surface: "#EFEBE0",
        border: "#D8D0C0",
        parchment: "#FDFBF7",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        cursor: "cursor 1s stepEnd infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "gradient-shift": "gradientShift 3s ease infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "float-badge": "floatBadge 3s ease-in-out infinite",
        "radar-pulse": "radarPulse 1.5s ease-out infinite",
        "letter-reveal": "letterReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "morph-spin": "morphSpin 4s ease-in-out infinite",
        "orbit": "orbit 8s linear infinite",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollLine: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.15)" },
        },
        cursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200, 169, 110, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(200, 169, 110, 0.4)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -15px)" },
          "50%": { transform: "translate(-5px, 10px)" },
          "75%": { transform: "translate(-15px, -5px)" },
        },
        floatBadge: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-6px) rotate(3deg)" },
          "75%": { transform: "translateY(4px) rotate(-2deg)" },
        },
        radarPulse: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(3.5)", opacity: "0" },
        },
        letterReveal: {
          "0%": { opacity: "0", transform: "translateY(40px) rotateX(-40deg)" },
          "60%": { opacity: "1", transform: "translateY(-5px) rotateX(5deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotateX(0)" },
        },
        morphSpin: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(30px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(30px) rotate(-360deg)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
