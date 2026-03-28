# CITSA International

**Centre Initiatique et Traditionnel pour les Sciences Africaines**

A single-page presentation website with a full school dashboard portal, built with React + TypeScript + Vite.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Wouter (client-side routing)
- Google Fonts: Cinzel + Cormorant Garamond

## Pages

- `/` — Main presentation website (Home, About, Teachings, Testimonials, Contact)
- `/login` — Student & Staff login portal
- `/dashboard` — Full school dashboard (student view + staff/admin view)

---

## Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel will auto-detect Vite and configure everything.

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a new GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel will auto-detect the framework as **Vite**
5. Leave all settings as default and click **Deploy**

The `vercel.json` file at the root handles SPA routing (so `/login` and `/dashboard` work on refresh).

### Build settings (auto-detected, no changes needed)

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

---

## Project Structure

```
citsa-international/
├── src/
│   ├── main.tsx          # Entry point
│   ├── App.tsx           # Router
│   ├── index.css         # All styles + animations
│   └── pages/
│       ├── HomePage.tsx      # Main landing page
│       ├── LoginPage.tsx     # Login portal
│       ├── DashboardPage.tsx # School dashboard
│       └── not-found.tsx     # 404 page
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json           # SPA rewrite rules
└── package.json
```
