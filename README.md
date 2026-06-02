# 🚀 Portfolio — Next.js + Tailwind CSS

A polished developer portfolio built with Next.js, Tailwind CSS, and modern motion/UI patterns. This is a full end-to-end product deployed at https://dev-portfolio-pink-eight.vercel.app, featuring a dynamic homepage, content-driven sections, and an authenticated admin editor.

## ✨ What’s Included

- **Responsive landing page** with hero, projects, experience, skills, and contact sections
- **Animated navbar** with section highlighting and mobile menu
- **Typewriter text effect** in the hero section
- **Infinite marquee** for tech stack display
- **About section** with dynamic soft skills and animated progress bars
- **Projects grid** with curated cards and hover interactions
- **Experience timeline** with clean editorial layout
- **Contact section** with email copy button and LinkedIn CTA
- **Optional admin CMS** for editing portfolio data through `/admin`
- **Data layer** that loads from `data/portfolio.json` or Upstash Redis when configured

## 🧰 Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis smooth scrolling
- Upstash Redis (optional)
- JWT / `jose` auth helpers

## 🚀 Run locally

```bash
npm install
npm run dev
```

The app is available locally at http://localhost:3000.

## 🔧 Environment

This project works out of the box using the local content file in `data/portfolio.json`.

Optional Redis-backed content editing is supported via:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

If Redis is configured, the app reads portfolio data from Upstash; otherwise it falls back to the local JSON file.

## 🗂 Data model

Portfolio content is sourced from `data/portfolio.json` and includes:

- hero data and role cycling
- about section copy, soft skills, and tech skills
- project cards and external links
- experience timeline entries
- contact details and footer social links

### Admin editor

- public admin login page: `/login`
- protected admin dashboard: `/admin`
- content save endpoint: `/api/admin/content`
- auth endpoints: `/api/auth/login`, `/api/auth/check`, `/api/auth/logout`

The editor is protected and supports authenticated content management.

## 📁 Project Structure

```
app/
  layout.tsx       ← root layout, fonts, metadata
  page.tsx         ← homepage composition
  globals.css      ← base styles and theme utilities
  admin/           ← authenticated content editor
  login/           ← admin login page
  api/             ← auth and admin content routes
components/
  About.tsx
  Contact.tsx
  CustomCursor.tsx
  DockNav.tsx
  Experience.tsx
  Footer.tsx
  Hero.tsx
  Marquee.tsx
  Navbar.tsx
  PageLoader.tsx
  Projects.tsx
  ScrollProgress.tsx
  SmoothScroll.tsx
  TextScramble.tsx
lib/
  auth.ts          ← auth helpers and token logic
  data.ts          ← portfolio data loader/writer
  useScrollReveal.ts← reveal hook for scroll animations
public/
  robots.txt
```

## ✅ Build

```bash
npm run build
npm start
```

