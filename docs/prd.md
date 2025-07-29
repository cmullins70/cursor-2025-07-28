# 🧾 Product Requirements Document (PRD)

## 📌 1. Overview

**Product Name:**  
Threaducate

**Prepared By:**  
Chris, Product & Growth Architect

**Date:**  
2025-07-28

**Version:**  
v1.0 Draft

**Status:**  
In Development

---

## 🎯 2. Purpose

Build **Threaducate** — a lightweight, conversation-centric community platform designed for curated learning and shared knowledge. Threaducate combines threaded discussions with curated resource lists (e.g., YouTube videos, articles, docs), providing creators and learners a simple but powerful space to teach and grow together.

---

## 🌍 3. Background / Context

Current community tools like Slack, Discord, and Facebook are not optimized for structured learning or thoughtful discussion. Skool and Circle offer more advanced features, but are closed-source or expensive, and focus heavily on course monetization.

**Threaducate** aims to:
- Be open, minimal, and extensible
- Center around posts, discussions, and curated knowledge
- Serve indie educators, technical groups, and content-first communities

---

## 👤 4. Target Users

**Primary User Personas:**

- **Indie Educator / Thought Leader** – wants to run a lightweight, curated learning space  
- **Learner / Explorer** – wants to browse content and participate in thoughtful discussion  
- **Content Curator** – shares playlists, articles, and tools around specific topics  

**User Segments:**

- Internal: Admins, moderators  
- External: Members, lurkers, contributors

---

## 🧭 5. Goals & Objectives

| Goal                        | Metric / KPI          | Success Criteria               |
|-----------------------------|-----------------------|--------------------------------|
| Foster discussion           | Posts per member      | Avg 3+ posts/comments/month    |
| Curate learning content     | Lists created         | 100+ curated items in 30 days  |
| Encourage engagement        | Daily active users    | DAU/MAU ratio > 30%            |

---

## 📐 6. Requirements

### Functional Requirements

| ID  | Description                                                | Priority |
|-----|------------------------------------------------------------|----------|
| F1  | Users can post threads and comments                        | High     |
| F2  | Users can create and browse curated learning lists         | High     |
| F3  | Admin can tag and feature high-value content               | Medium   |
| F4  | Posts support markdown and embeds (YouTube, Loom, etc.)    | High     |
| F5  | Basic gamification (likes, points, leaderboard)            | Medium   |
| F6  | Notifications for replies, mentions, and list updates      | Medium   |
| F7  | Member profiles and activity history                       | Low      |

### Non-Functional Requirements

| ID  | Description                        | Priority |
|-----|------------------------------------|----------|
| N1  | Mobile-responsive design           | High     |
| N2  | Loads within 500ms on average      | High     |
| N3  | Easily self-hosted or deployable   | Medium   |

---

## 📋 7. User Stories

- As a member, I want to post questions and get responses from the community.  
- As a moderator, I want to feature important threads and curated lists.  
- As a learner, I want to follow curated playlists and track which I’ve completed.  
- As a new user, I want to see the most helpful and popular content right away.

---

## 🧪 8. Acceptance Criteria

- ✅ Threads and comments render correctly on all devices  
- ✅ Embeds from YouTube display in both posts and lists  
- ✅ Lists include title, description, and ordered resources with links  
- ✅ Markdown formatting works across text areas  
- ✅ Points are awarded for likes, comments, and contributions  
- ✅ Users are notified of replies or mentions

---

## 🧱 9. Wireframes / Mockups

[Insert Figma link or Loom walkthrough here]

Key Screens:
- Community Feed (posts)  
- Thread View (comments)  
- Curated List View  
- Create List / New Post  
- Member Profile

---

## 🧩 10. Dependencies

- Auth system (Clerk, Supabase Auth, or custom JWT)  
- Frontend framework (React or Next.js)  
- Markdown/Embed parser (e.g., `react-markdown`, `remark-gfm`)  
- Optional: YouTube Data API for metadata  
- Postgres or SQLite database  

---

## 🚫 11. Out of Scope

- Paid courses or LMS-style modules  
- Cohort scheduling or live events  
- Messaging / DMs  
- Role-based permissions (beyond basic admin/moderator/user)

---

## 📅 12. Timeline / Milestones

| Phase             | Dates           | Owner       |
|-------------------|------------------|-------------|
| Feature planning  | July 28–Aug 1    | Chris       |
| MVP Build         | Aug 2–Aug 10     | Dev Team    |
| Alpha Launch      | Aug 12           | Community   |
| Feedback & Iteration | Aug 13–Aug 20 | Team        |

---

## 📣 13. Stakeholders

| Name    | Role              | Responsibilities              |
|---------|-------------------|-------------------------------|
| Chris   | Product Lead      | Vision, scoping, QA           |
| Jamie   | Developer         | Frontend + backend buildout   |
| Taylor  | Community Manager | User feedback, onboarding     |

---

## 📌 14. Open Questions

- Should curated lists support collaborative editing?  
- Should we support public/private toggles on lists or threads?  
- Should we use a Reddit-style voting system for ranking?  
- Is there value in adding optional AI summarization for threads?

---

## 🧠 15. Future Considerations

- Member badges and reputation  
- Invite-only or tiered access  
- AI digest for weekly highlights  
- “Saved for Later” list bookmarking  
- Public API for extensions and bots
