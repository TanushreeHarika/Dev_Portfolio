# 🚀 Portfolio — Next.js + Tailwind CSS

A clean, editorial developer portfolio with "Professional Gen Z meets Pinterest Aesthetic" vibes.

## ✨ Features

- **Animated Navbar** — Glass morphism, active section tracking, smooth mobile hamburger menu
- **Hero** — Typewriter role animation, live status badge, GitHub + LinkedIn links
- **Marquee** — Infinite scrolling tech stack ticker
- **About** — Skill bars with scroll-triggered animation, soft skills grid with Communication highlighted
- **LeetCode callout** — Honest "learning phase" card with profile link
- **Projects** — 3-card editorial grid with hover effects
- **Experience** — Animated timeline
- **Contact** — Dark section with copy-email button + LinkedIn CTA
- **Footer** — Minimal dark footer

## 🛠 Setup

```bash
# 1. Create a new Next.js app (if you haven't already)
npx create-next-app@latest my-portfolio --typescript --tailwind --eslint --app

# 2. Replace the generated files with this project's files
#    Copy all folders: app/, components/, lib/
#    Copy config files: tailwind.config.ts, postcss.config.js, tsconfig.json

# 3. Install dependencies
npm install

# 4. Run dev server
npm run dev
```

## 🎨 Customise

Open each component and replace:

| Placeholder | Replace with |
|---|---|
| `Your Name` / `YN` | Your real name |
| `youremail@gmail.com` | Your email |
| `yourusername` in GitHub links | Your GitHub username |
| `yourusername` in LinkedIn links | Your LinkedIn handle |
| `leetcode.com/yourusername` | Your LeetCode profile |
| Project titles/descriptions | Your real projects |
| Experience entries | Your real experience |
| Skill percentages | Your honest assessment |

## 🎨 Design System

- **Font Display**: Playfair Display (serif, editorial)
- **Font Body**: DM Sans (clean, modern)
- **Font Code**: DM Mono (monospace details)
- **Palette**: Warm cream `#F5F0E8` + ink `#0D0D0D` + gold accent `#C8A96E`

## 📁 File Structure

```
app/
  layout.tsx      ← Root layout with fonts
  page.tsx        ← Page composition
  globals.css     ← Base styles + grain overlay
components/
  Navbar.tsx      ← Sticky nav with mobile menu
  Hero.tsx        ← Hero with typewriter
  Marquee.tsx     ← Tech stack ticker
  About.tsx       ← About + skills + LeetCode
  Projects.tsx    ← Project cards
  Experience.tsx  ← Timeline
  Contact.tsx     ← Contact with email copy
  Footer.tsx      ← Footer
lib/
  useScrollReveal.ts  ← Intersection Observer hook
tailwind.config.ts    ← Extended Tailwind config
```
