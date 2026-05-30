# ☕ Brew & Bloom — Digital Menu

A full-stack Next.js 14 digital menu with a Supabase-powered admin panel.

---

## Features

- **Public menu** — beautiful card grid with category tabs, veg/bestseller tags
- **Admin panel** — protected by Supabase Auth (email + password)
- **Full CRUD** — add, edit, delete, show/hide menu items
- **Supabase DB** — PostgreSQL with Row-Level Security
- **Optimistic UI** — instant feedback with server-side revalidation
- **Responsive** — works on mobile, tablet, and desktop

---

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Framework  | Next.js 14 (App Router)        |
| Language   | TypeScript                     |
| Database   | Supabase (PostgreSQL)          |
| Auth       | Supabase Auth                  |
| Styling    | CSS Modules + CSS Variables    |
| Fonts      | Playfair Display + DM Sans     |

---

## Setup Guide

### 1. Clone & install dependencies

```bash
cd brew-and-bloom
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish provisioning

### 3. Run the database schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Open and run the file `supabase-schema.sql` from this project
3. This creates the `menu_items` and `categories` tables, seeds 12 sample items, and sets up Row-Level Security policies

### 4. Create your admin user

1. In Supabase dashboard → **Authentication** → **Users** → **Add User**
2. Enter your admin email and a strong password
3. That's it — this user will have full CRUD access to the menu

### 5. Add environment variables

Copy `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local .env.local   # already there, just edit it
```

Get your values from **Supabase Dashboard → Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
brew-and-bloom/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Redirects → /menu
│   ├── globals.css             # Global CSS variables & resets
│   ├── menu/
│   │   ├── layout.tsx          # Public header
│   │   └── page.tsx            # Public menu (server component)
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx        # Login page
│   └── admin/
│       ├── layout.tsx          # Admin shell (auth guard + sidebar)
│       ├── page.tsx            # Redirects → /admin/dashboard
│       ├── dashboard/          # Stats overview
│       ├── items/              # CRUD table for menu items
│       └── settings/           # Account settings + logout
│
├── components/
│   ├── menu/
│   │   ├── MenuClientPage.tsx  # Client-side category filter + grid
│   │   ├── MenuCard.tsx        # Individual menu item card
│   │   └── CategoryTabs.tsx    # Horizontal scrollable tabs
│   ├── admin/
│   │   ├── AdminSidebar.tsx    # Sidebar / mobile top-bar
│   │   ├── LoginForm.tsx       # Email+password login form
│   │   ├── ItemsClientPage.tsx # Full CRUD table with optimistic UI
│   │   ├── ItemModal.tsx       # Add / Edit modal (shared)
│   │   └── DeleteConfirmModal  # Deletion confirmation dialog
│   └── ui/
│       └── Toast.tsx           # Success / error toast
│
├── lib/
│   ├── actions/
│   │   ├── auth.ts             # login / logout server actions
│   │   └── menu.ts             # CRUD server actions
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client (cookies)
│       └── middleware.ts       # Session refresh + route protection
│
├── types/
│   └── index.ts                # MenuItem, Category TypeScript types
│
├── middleware.ts               # Next.js middleware entry point
├── next.config.ts
├── supabase-schema.sql         # ← Run this in Supabase SQL Editor
└── .env.local                  # ← Fill in your Supabase credentials
```

---

## Routes

| Route              | Description                          | Protected |
|--------------------|--------------------------------------|-----------|
| `/`                | Redirects to `/menu`                 | No        |
| `/menu`            | Public digital menu                  | No        |
| `/auth/login`      | Admin login page                     | No        |
| `/admin`           | Redirects to `/admin/dashboard`      | Yes       |
| `/admin/dashboard` | Stats overview                       | Yes       |
| `/admin/items`     | Menu item CRUD                       | Yes       |
| `/admin/settings`  | Account info + logout                | Yes       |

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add env vars in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Make sure to also add your production domain to Supabase:
**Authentication → URL Configuration → Site URL**

---

## Customization

- **Cafe name / branding** — search for `Brew & Bloom` across components
- **Categories** — edit the `categories` table in Supabase
- **Colors** — all in `app/globals.css` under `:root { ... }`
- **Fonts** — swap the Google Fonts import in `globals.css`
