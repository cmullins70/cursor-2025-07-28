# ADR-###: [Title of Decision]

**Status:** Proposed | Accepted | Rejected | Superseded  
**Date:** YYYY-MM-DD  
**Authors:** Name(s)

---

## ✨ Context

_What is the background and relevant context for this decision?_

- Describe the situation that led to this decision.
- Include any technical, organizational, or strategic constraints.
- Link to relevant documents, tickets, diagrams, or discussions.

---

## 🧠 Decision

_What decision did you make and why?_

- Be specific about the technology/tool/approach selected.
- Justify **why** this solution was chosen over alternatives.
- Consider trade-offs (performance, cost, complexity, extensibility).

> Example: "We chose Supabase for our backend because it offers a Postgres database, auth, storage, and edge functions—all tightly integrated and deployable with minimal infrastructure."

---

## 🔁 Alternatives Considered

| Option         | Pros                                   | Cons                                      |
|----------------|----------------------------------------|-------------------------------------------|
| Firebase       | Mature, scalable, real-time            | No SQL, harder self-hosting               |
| Hasura         | GraphQL native, highly performant      | Complexity, less community support        |
| Supabase (✅)  | SQL-native, full-stack, open-source    | Early-stage in some areas (AI tooling)    |

---

## 📈 Consequences

_What are the implications of this decision—now and later?_

- What benefits are expected?
- What limitations or risks are introduced?
- What changes might be needed down the line?

---

## 🧩 Related Decisions

- ADR-002: "Choose Next.js for Frontend Framework"  
- ADR-004: "Use Supabase Edge Functions Instead of Express API"

---

## 🗂 References

- [Link to discussion thread or proposal doc](#)
- [Diagram or system design](#)
- [Benchmarks / tests if applicable](#)
