# 🛠️ Ivan Antony Babu Portfolio — Complete Maintainer & Developer Guide

> **Purpose:** This document is your permanent manual for updating, restyling, or extending this website. Keep it in your repo so that you (or any other AI tool like ChatGPT, Claude, Cursor, or DeepSeek) can inspect this file and immediately make changes without guessing.

---

## 🧭 1. "Where is What?" — Instant Cheat Sheet

| What do you want to change? | File to edit | What to look for inside |
|---|---|---|
| **Any personal info, bio, skills, projects, achievements, experiences, references** | [`src/data/portfolioData.ts`](./src/data/portfolioData.ts) | Almost **95% of your content** is inside this single file! |
| **Site Colors & Theme (Background, Accent, Border)** | [`src/index.css`](./src/index.css) | `:root` block at lines 5–18 (`--color-electric: #38bdf8`) |
| **Navbar links, logo, social links** | [`src/components/Navbar.tsx`](./src/components/Navbar.tsx) | `navLinks` array |
| **Hero banner (top typography, status pill, clock)** | [`src/components/Hero.tsx`](./src/components/Hero.tsx) | `Hero.tsx` |
| **About section text layout or photo card** | [`src/components/AboutSection.tsx`](./src/components/AboutSection.tsx) | `AboutSection.tsx` |
| **Achievements ticker speed & card count** | [`src/components/AchievementsSection.tsx`](./src/components/AchievementsSection.tsx) | `marquee 38s` / `32s` animation duration |
| **Skills ticker speeds & categories** | [`src/components/SkillsSection.tsx`](./src/components/SkillsSection.tsx) | `rowSpeeds = [42, 36, 48, 34]` |
| **Project bento cards or inspect modal** | [`src/components/ProjectsSection.tsx`](./src/components/ProjectsSection.tsx) | `PROJECTS` mapping & Modal |
| **Research & Publication citation** | [`src/components/PublicationsSection.tsx`](./src/components/PublicationsSection.tsx) | `citationText` string & `PUBLICATION` object |
| **Contact links, email, form action** | [`src/components/ContactSection.tsx`](./src/components/ContactSection.tsx) | Email mailto & socials |
| **Command Palette (⌘K shortcuts)** | [`src/components/CommandPalette.tsx`](./src/components/CommandPalette.tsx) | `commands` list |
| **Interactive background particles/grid** | [`src/components/BackgroundCanvas.tsx`](./src/components/BackgroundCanvas.tsx) | Canvas particle generator |
| **Add or remove a whole section from page** | [`src/App.tsx`](./src/App.tsx) | `<Navbar />`, `<Hero />`, `<AboutSection />` tags |

---

## 📝 2. Updating Content (No Coding Required)

All your actual information lives in **one central file**:
👉 [`src/data/portfolioData.ts`](./src/data/portfolioData.ts)

You **never** need to touch React code just to change your bio, GPA, new project, or phone number.

### A. Updating Your Bio & Contact Info
Search for `PERSONAL_INFO` near line 71:
```ts
export const PERSONAL_INFO = {
  name: "Ivan Antony Babu",
  title: "Robotics & Embedded Systems Engineer",
  location: "Kochi, Kerala, India",
  email: "ivanantonybabu@gmail.com",
  phone: "+91 8078584371",
  github: "https://github.com/Nightsky2004",
  linkedin: "https://www.linkedin.com/in/ivan-antony-babu-530265280",
  // ...
};
```
Change any string and save.

### B. Adding a New Project
Find `PROJECTS` (around line 195) and duplicate one block:
```ts
{
  id: "my-new-project-id",
  title: "Your Project Title Here",
  subtitle: "Short 1-line summary",
  year: "2026",
  category: "Robotics & SLAM", // Options: "Robotics & SLAM" | "Software-Defined Radio" | "Embedded & IoT" | "Software"
  featured: false,
  bentoSpan: "lg:col-span-2 lg:row-span-1",
  description: "Detailed description of what you designed and built...",
  highlights: [
    "Key engineering achievement 1",
    "Key engineering achievement 2"
  ],
  tags: ["ROS", "C++", "Python", "Raspberry Pi"],
  githubUrl: "https://github.com/Nightsky2004/your-repo",
  image: "./project-new.jpg" // optional photo in public/ folder
}
```

### C. Adding a New Achievement / Award
Find `ACHIEVEMENTS` (around line 135) and add:
```ts
{
  id: "new-award",
  metric: "1st Place",
  label: "National Robotics Championship",
  organization: "IIT Bombay",
  year: "2026",
  description: "Won first prize for autonomous indoor drone navigation.",
  image: "./award-photo.jpg" // optional photo
}
```

---

## 🎨 3. Changing the Colors & Visual Theme

All theme colors are managed through **CSS variables** in [`src/index.css`](./src/index.css).

### How to change the Accent Color (currently Arctic Blue `#38bdf8`):
1. Open [`src/index.css`](./src/index.css) lines 5–18.
2. Edit `--color-electric`:
   ```css
   :root {
     /* Dark Mode Backgrounds */
     --color-bg: #0d1117;          /* Page background */
     --color-bg-elevated: #161b22; /* Card background */
     --color-bg-surface: #1c2128;  /* Hover card background */
     --color-border: #21262d;      /* Card border line */

     /* Accent Color — Change this to change site accent */
     --color-electric: #38bdf8;       /* Main accent */
     --color-electric-light: #7dd3fc; /* Lighter hover shade */
     --color-electric-dark: #0284c7;  /* Darker active shade */
   }
   ```
3. To replace the accent across any hardcoded Tailwind classes, do a global find-and-replace in your editor:
   - Find: `#38bdf8`
   - Replace with: your new hex color (e.g., `#10b981` for Emerald Green, `#f59e0b` for Amber Gold, `#a855f7` for Purple).

---

## 🏃 4. Controlling Animations & Sliding Speeds

### A. Achievements Sliding Ticker
File: [`src/components/AchievementsSection.tsx`](./src/components/AchievementsSection.tsx)
- Line ~124: `style={{ animation: 'marquee 38s linear infinite normal' }}` (Row 1 speed)
- Line ~142: `style={{ animation: 'marquee 32s linear infinite reverse' }}` (Row 2 speed)
- **Make it faster:** Decrease seconds (e.g., `25s`).
- **Make it slower:** Increase seconds (e.g., `50s`).
- **Disable hover pause:** Remove `onMouseEnter` and `onMouseLeave` props.

### B. Skills Sliding Ticker
File: [`src/components/SkillsSection.tsx`](./src/components/SkillsSection.tsx)
- Line ~30: `const rowSpeeds = [42, 36, 48, 34];`
  - Index 0 = Robotics row speed (in seconds)
  - Index 1 = Embedded row speed
  - Index 2 = SDR row speed
  - Index 3 = Software/AI row speed
- Line ~32: `const rowDirections = ['normal', 'reverse', 'normal', 'reverse'];`
  - Change `'normal'` (left) to `'reverse'` (right) to alter slide direction.

---

## 📷 5. How to Add / Swap Photos

All images go in the `public/` directory:
```
public/
  profile.jpg               <-- Hero / Profile portrait
  aws-certificate.jpg       <-- AWS Certificate in education modal
  vlsi.png                  <-- VLSI Certificate in education modal
  project-slam.jpg          <-- (your project image)
  achievement-isdc.jpg      <-- (your achievement image)
  resume.pdf                <-- Downloadable resume
```

### Rule for photo paths:
Always use `./filename.jpg` (with a dot `./` at the start) so GitHub Pages finds it correctly regardless of repository subpaths!

---

## 💻 6. How to Run, Test, and Deploy

Open your terminal in the portfolio directory:

```bash
# 1. Start local dev server (live preview on http://localhost:5173)
npm run dev

# 2. Check for TypeScript or Build errors before pushing
npm run build
```
*(If `npm run build` prints `✓ built in X.XXs` with 0 red errors, your changes are 100% safe to deploy!)*

```bash
# 3. Commit and publish live to GitHub Pages
git add .
git commit -m "Update: describe what you changed"
git push origin main
```
Within 2 minutes, GitHub Actions will automatically update:
👉 **https://ivanantonybabu.github.io/portfolio/**

---

## 🤖 7. "Copy-Paste Prompt" For Other AI Tools

If your weekly chat limits run out and you use **ChatGPT**, **Claude**, **DeepSeek**, or **Cursor**, paste this exact prompt to the AI before asking for changes:

```markdown
I have a React + TypeScript + Vite + Tailwind CSS portfolio website hosted on GitHub Pages.
- Repository: https://github.com/ivanantonybabu/portfolio
- All content data is centrally organized in: `src/data/portfolioData.ts`
- Global theme CSS variables and keyframe animations are in: `src/index.css`
- Component files live in: `src/components/`
- Static images live in `public/` and are referenced with relative paths (e.g. `./profile.jpg`).
- The project builds with `tsc && vite build`.

Please review DEVELOPER_GUIDE.md in the repo.
Here is the exact task I want to achieve:
[DESCRIBE YOUR CHANGE HERE — e.g. "Change the accent color from #38bdf8 to Emerald Green #10b981" OR "Add a new project in portfolioData.ts"]

Please provide the exact file paths and code replacements so I don't introduce any TypeScript errors.
```

---

## 🔒 8. Security & Privacy Notes

- Do **not** commit `.env` files with secret passwords or private tokens.
- Your email and social links are public on GitHub. Keep sensitive items (e.g. personal government IDs, bank details) out of `public/` and `src/`.
- To change who can see the code: In GitHub repo **Settings → Change visibility to Private** (requires GitHub Student Pack or Pro to keep Pages active).
