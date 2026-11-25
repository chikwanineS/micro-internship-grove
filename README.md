# Micro Internship Grove

Build a clean, modern, interactive frontend MVP web application called "SkillBridge" — a micro-internship and task-matching platform designed to close the local experience gap for emerging software developers (aligned with UN SDGs 8, 10, and 17).

TECHNICAL GUARDRAILS (STRICT):

- Build purely as a React + Tailwind CSS frontend application using local React state and realistic pre-populated mock data.

- DO NOT connect Supabase, a backend, or authentication screens. All interactions (applying to tasks, completing tasks, posting new tasks, switching roles) must work immediately in-memory so the app is 100% interactive for a live hackathon demo.

DESIGN & AESTHETIC:

- Clean, trustworthy, modern tech-career aesthetic. Use a crisp light background (#F8FAFC), deep navy primary accents (#0F172A), emerald green success/verified badges (#10B981), and indigo action buttons (#4F46E5).

- Use rounded cards, subtle borders, generous whitespace, and Lucide icons. Make it mobile-responsive.

LAYOUT & NAVIGATION:

- Top navigation bar featuring the "SkillBridge" logo, an SDG Impact badge ("SDGs 8 • 10 • 17"), and a prominent Role Switcher toggle pill in the top right allowing instant switching between "Student Developer View" and "Hiring Partner View" (no login required).

CORE VIEWS & FEATURES (3 TABS/SECTIONS):

1. Micro-Task Marketplace (Default View):

- A compact hero banner explaining the mission: "Bridge the local experience gap. Complete real micro-tasks from local businesses and build a verified portfolio."

- Skill filter pills (All, Python, SQL/MySQL, Web Dev, Data Analysis) and search bar.

- A 2-column grid of 6 realistic local micro-task cards (e.g., "Build a Sales CSV Parser in Python" for Savanna Logistics, "Optimize Inventory MySQL Queries" for Nairobi Fresh Grocers, "Create a Responsive Event Landing Page" for Pwani Tech Hub).

- Each card shows: Company Name, Task Title, Tech Stack tags, Estimated Hours (e.g., "6 hrs"), Difficulty level, and an "Accept & Start Task" button.

- Clicking "Accept & Start Task" updates the task status to "In Progress" and adds it to the user's active workspace.

2. Student Workspace & Verified Experience Ledger:

- Shows a realistic sample student profile ("Amina Ochieng — PLP Software Engineering Track") with skill tags (Python, MySQL, Git).

- "Active Tasks" section: Lists tasks the user accepted from the marketplace, with a "Mark Complete & Submit Repo Link" button (opens a quick modal to paste a mock GitHub URL and submit).

- "Verified Experience Ledger" (Portfolio): Submitting a task moves it here and dynamically generates a Verified Experience Card featuring a green "Verified by Partner" badge, completion date, skills demonstrated, and a mock verifiable credential ID (e.g., SB-2026-884). Pre-populate 2 completed tasks so the portfolio looks rich immediately.

3. Hiring Partner Portal (Visible when toggled to Hiring Partner View or via tab):

- Allows a local business to post a new micro-task via a clean form (Task Title, Company Name, Required Skill tag, Estimated Hours, Description). Submitting immediately adds the new task to the live Micro-Task Marketplace.

- Shows a "Talent Scout" table of top-performing student developers ranked by verified completed micro-tasks, with a "Request Interview" button that triggers a confirmation toast.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://micro-internship-grove.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b223ac6d-c53a-57fd-8bf4-f921a1ea996e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
