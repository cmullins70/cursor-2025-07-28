# 🧱 Threaducate Tech Stack

## 📐 1. Architecture Overview

**Stack Type:** Modular Monolith (frontend + backend + edge functions in Next.js)  
**Deployment:** Serverless (Vercel)  
**Data Flow:** Client ⇄ Supabase (DB + Auth + Edge Functions)  
**CI/CD:** GitHub → Vercel automatic deploys on push

Optional Diagram:
```
[ Next.js (App Router) ]
    ↕        ↕
[ Supabase Edge Functions + DB ]
    ↕
[ Vercel Edge / CDN ]
```

---

## 🧑‍💻 2. Frontend

- **Framework:** `Next.js 14 (App Router)`  
- **Styling:** `Tailwind CSS` + `shadcn/ui`  
- **Markdown Parsing:** `react-markdown` + `remark-gfm`  
- **Embeds:** `react-player`, `iframe-resizer` (for YouTube, Loom, etc.)  
- **State / Caching:** `React Server Components` + `SWR` or `React Query`  
- **Validation:** `zod` or `yup` for forms

---

## 🔌 3. Backend (via Next.js & Supabase)

- **API Layer:** Supabase Edge Functions (TypeScript)  
- **Auth:** Supabase Auth (OAuth + Magic Links)  
- **Database:** Supabase PostgreSQL (hosted)  
- **Storage:** Supabase Storage (for user-uploaded images, etc.)  
- **Rate Limiting:** Supabase Edge middleware or Vercel Middleware  
- **Jobs:** Scheduled edge functions (for future digest emails, cleanup)

---

## 🛢️ 4. Data Layer

- **Database:** Supabase (PostgreSQL)  
- **ORM / DB Client:** `PostgREST` (auto-generated API) or optionally `Kysely` or `Drizzle`  
- **Full-text search:** Supabase’s built-in Postgres FTS  
- **Vector search (future):** Supabase pgvector for AI summaries or retrieval

---

## ☁️ 5. DevOps & Infrastructure

- **Hosting & Edge Runtime:** `Vercel`  
- **CI/CD:** GitHub → Vercel auto-deploy on push to main  
- **Environment Secrets:** Vercel dashboard + Supabase dashboard  
- **Monitoring:** Vercel + LogSnag or Highlight.io  
- **Analytics (optional):** `Plausible`, or `PostHog`

---

## 🔐 6. Security

- **Auth:** Supabase Auth (Email, Google, GitHub)  
- **Authorization:** Row-level security (RLS) via Supabase policies  
- **Input Sanitization:** Markdown + DOMPurify or custom sanitizer for embeds  
- **Secrets:** `.env.local` (local dev), Vercel Secrets (prod)

---

## 🧪 7. Testing

- **Unit Testing:** `Vitest` (Next.js-compatible)  
- **E2E Testing:** `Playwright` or `Cypress`  
- **Linting / Formatting:** `ESLint`, `Prettier`, `Stylelint`  
- **Type Safety:** TypeScript + zod (API + form validation)

---

## 🧰 8. Developer Tooling

- **IDE:** Cursor (AI-native dev experience)  
- **Dev Tools:**  
  - `Vercel CLI`  
  - `Supabase CLI` for local dev & migrations  
  - `Drizzle Studio` or `Supabase Studio` for DB browsing  
  - Optional: GitHub Copilot, Cursor Chains, Dev Containers

---

## 🧠 9. AI Features (Optional Phase 2)

- **Prompt Orchestration:** LangChain or simple fetch calls  
- **Model Access:** OpenAI API (for summarizing threads or lists)  
- **Memory Store:** Supabase table or pgvector  
- **Agent Embedding:** “Ask this thread” or “Summarize this list” feature  

---

## 🔄 10. Future Considerations

- Role-based access (RBAC) with Supabase policies  
- Caching layer (Redis or Edge config cache)  
- Internationalization (i18n via `next-intl`)  
- Mobile wrapper (Capacitor / Expo)  
- Public API for integrations (future)