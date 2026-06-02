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

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the portfolio.

## 🔧 Environment

This project works out of the box using the local content file in `data/portfolio.json`.

Optional Redis-backed content editing requires these environment variables:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

If Redis is configured, the app will read portfolio data from Upstash. Otherwise it falls back to the local JSON file.

## 🗂 Content Editing

The site content is stored in `data/portfolio.json` and includes:

- hero info
- about section text and skills
- projects
- experience
- contact details
- footer/social links

### Admin editor

- Public admin login page: `/login`
- Protected admin dashboard: `/admin`
- Content save endpoint: `/api/admin/content`
- Auth endpoints: `/api/auth/login`, `/api/auth/check`, `/api/auth/logout`

> Note: The editor requires auth and Redis configuration to persist changes.

## ✨ Customisation

Update these values in `data/portfolio.json` or the admin dashboard:

- `hero.name`, `hero.roles`, `hero.bio`
- Social links for GitHub and LinkedIn
- Project titles, descriptions, tags, and links
- Experience entries and timelines
- Skills, soft skills, and current learning focus
- Contact email and CTA copy

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

## 📌 Notes

- Update branding references and links to reflect your own portfolio.
- Customize UI text and theme colors in `globals.css` and the component files.
- Keep the `data/portfolio.json` file consistent with the shape defined in `lib/data.ts`.
