# DesignRules.md

# Design System, UX Blueprint & Engineering Guardrails — 3D Paper Craft Developer Portfolio

> **Status:** Single Source of Truth. Replaces `PORTFOLIO_STANDARDS.md` and `.cursor/rules/portfolio-standards.mdc` (both deleted 2026-11-22).
> **Owner:** Rifqi Haikal Chairiansyah (`portofolio-rifqi`)
> **Approved Concept:** *The Architect's Paper Desk — Lamp & Sheet edition* (final score 91.5 / 100, see §1)
> **Rendering Strategy:** Hybrid 2D + 3D — tokenized SVG paper layers for 80%+ of the scene, one lazy React Three Fiber figurine on capable desktops
> **Target Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · React Three Fiber 9 · Motion (see §11)
> **Deployment Target:** Vercel Hobby
> **Primary Audience:** Technical recruiters, engineering managers, enterprise clients, fellow developers

---

## 0. Purpose, Authority & Change Control

This document is the project's **binding design, UX, and engineering contract**. Every human contributor and AI coding agent MUST read it before editing any file.

### 0.1 Rule Keywords

- **MUST / MUST NOT** — Mandatory. A violation is a defect that blocks merge.
- **SHOULD / SHOULD NOT** — Default. Deviating requires a written justification in the PR before implementation.
- **MAY** — Optional, allowed only while every budget and visual rule still holds.

### 0.2 Source-of-Truth Hierarchy

1. This `DesignRules.md`.
2. Tokens in `src/styles/tokens.css` (Tailwind 4 `@theme`), `src/styles/z-index.css`, `src/styles/motion.css`.
3. Data contracts in `src/types/index.ts` and `src/data/portfolio.ts`.
4. Individual task prompts.

An agent MUST NOT silently weaken, delete, or reinterpret a rule to make an implementation easier. When a request conflicts with a rule, report the conflict and propose the smallest compliant alternative before writing code.

### 0.3 Change Control & Scope Discipline

- Changes to visual direction, tokens, typography, layer order, section structure, dependencies, budgets, or accessibility baselines MUST be intentional and recorded in §19 (Change Log).
- Do not add a dependency for a problem already solved by the browser, CSS, React, or an approved package.
- Do not refactor or reformat files outside the task's scope.
- Do not create parallel "v2" style systems, duplicate palettes, or alternate page shells.

---

## 1. Design Decision Record — How the Concept Was Chosen

The concept was not picked by taste. Five directions were scored, the best two were refined and merged, and the winner was stress-tested against real visitor personas. Future redesign proposals MUST be scored with the same rubric and beat **91.5** to replace it.

### 1.1 Scoring Rubric (100 points)

| Criterion | Weight | What a 10 means |
| --- | --- | --- |
| Brand fit | ×2.0 | Says "precise enterprise engineer who builds with care" (.NET/C#/SQL + fullstack) without a caption |
| Recruiter scan speed | ×2.0 | Name, role, stack, proof and CV reachable in < 5 s, in a linear scroll |
| Paper-craft authenticity | ×1.5 | Reads as real cut, folded, layered paper — not "flat UI with a texture" |
| Memorability | ×1.5 | A visitor can describe the site in one sentence a day later |
| Performance (LCP/INP) | ×1.0 | LCP ≤ 2.5 s on mid-range mobile 4G without heroics |
| Accessibility | ×1.0 | Fully usable by keyboard and screen reader, reduced-motion safe |
| Build risk / maintainability | ×1.0 | One developer can build and maintain it on Vercel Hobby |

### 1.2 Round 1 — Five Directions

| # | Direction | Brand | Scan | Craft | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | **Architect's Paper Desk** — front-view desk diorama, sections become paper artifacts | 9 | 8 | 8 | 8 | 8 | 8 | 7 | **81.0** |
| B | Paper Office Tower — isometric floors, "elevator" scroll between rooms | 7 | 5 | 9 | 9 | 5 | 5 | 4 | 65.0 |
| C | Pop-up Book — each section is a spread that unfolds on page turn | 6 | 4 | 10 | 9 | 6 | 4 | 4 | 62.5 |
| D | Overhead Flat-lay — top-down desk, click objects to open sections | 8 | 5 | 9 | 8 | 8 | 6 | 6 | 71.5 |
| E | Paper OS — whole site lives inside the laptop screen as a fake desktop | 6 | 6 | 4 | 5 | 7 | 5 | 6 | 55.5 |

**Critique.**
- **B, C** hijack scroll (elevator, page turn). That fails recruiters and keyboard users and needs heavy 3D. Rejected.
- **E** is a common template trope ("portfolio as an OS"). It reduces paper craft to a skin. Rejected as AI-slop-adjacent.
- **D** has the best craft per byte, but click-to-explore navigation hides content from a 30-second scan.
- **A** wins, with two weaknesses: (1) the hero can become "a pretty picture" with no job, and (2) the jump from a front-view diorama to flat cards feels like two different websites.

### 1.3 Round 2 — Refinement & Hybrids

| # | Variant | Brand | Scan | Craft | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | A, but every section stays in front view (shelves, wall boards) | 8 | 7 | 7 | 7 | 8 | 8 | 8 | 75.0 |
| A2 | A + D's flat-lay craft: the hero stays front-view; the first dossier **slides over it like a sheet laid on the desk**; every later section is a flat-lay artifact in a linear scroll | 9 | 9 | 9 | 8 | 8 | 9 | 7 | 85.5 |
| A3 | A2 + **the lamp is the theme switch** (daylight from the window in light mode, the desk lamp turns on in dark mode) + the laptop screen becomes a working hub + the paper figurine of Rifqi | 10 | 9 | 9 | 10 | 7 | 9 | 7 | 89.5 |

The sheet slide-over fixes A's discontinuity with `position: sticky` only, so there is no scroll hijacking. The lamp gives the hero a job and makes dark mode part of the story instead of a color inversion.

### 1.4 Round 3 — Persona Stress Test of A3

| Persona | Failure found in A3 | Fix adopted into the rules |
| --- | --- | --- |
| Recruiter, phone, 4G, 30 seconds | Diorama pushes the name and CV below the fold | Mobile is text-first; the laptop becomes a compact card *below* the CTAs (§8) |
| Engineering manager, desktop, 5 minutes | Project cards show screenshots, not reasoning | Case-study sheet structure is mandatory: Problem → Role → Approach → Stack → Outcome (§4, `04`) |
| Keyboard / screen-reader user | The lamp switch is a hidden affordance | The lamp is a real `<button aria-pressed>`, mirrored by the navbar theme toggle (§4, `01`) |
| Low-end laptop GPU | WebGL figurine stutters and drains battery | Capability gate for R3F: ≥ 1024 px, `pointer: fine`, no `Save-Data`, `deviceMemory ≥ 4`, `hardwareConcurrency ≥ 4`; otherwise the poster (§9.3) |
| Visitor with motion sensitivity | Sticky slide-over plus parallax adds up | Reduced motion keeps the slide-over (it is plain scrolling) but removes every parallax and scroll-linked transform (§10.2) |

After the fixes: Perf 7 → 8, Risk 7 → 8. **Final score of A3′ = 91.5.** This is the approved concept.

### 1.5 Asset Approach Decision

| Approach | Craft | Themeable (light/dark) | Weight | Authenticity | Verdict |
| --- | --- | --- | --- | --- | --- |
| **Hand-built SVG paper layers with tokenized fills + shared SVG edge/shadow filters** | 8 | ✅ CSS variables | ~10–40 KB per layer | High (drawn by hand for this site) | **Chosen for 2D scene, props, icons** |
| Blender paper renders exported to WebP/AVIF | 10 | ❌ needs two renders | 80–200 KB per layer | High | **Only** for the figurine poster (must match the GLB) |
| Photographed physical paper models | 10 | ❌ | Large | Highest | Allowed later as an optional About photo, never for the scene |
| AI-generated images or AI image-to-3D meshes used as final assets | — | — | — | Generic, off-model | **Forbidden** (§3). Allowed only as a private blockout reference that is redrawn or remodeled by hand |

---

## 2. Brand Identity & Art Direction

### 2.1 Concept: *The Architect's Paper Desk*

Rifqi is a **craft-minded Software Engineer (Enterprise .NET/C#/SQL & Fullstack Web)**. The site is his **miniature desk, cut and folded from paper**: built with the same precision he applies to enterprise systems.

- **Hero (front-desk diorama):** layered paper office wall with a window, a wood-paper desk, an open paper laptop whose screen is real HTML, a desk lamp that switches the theme, a few props, and a paper figurine of Rifqi.
- **Sheet slide-over:** on scroll, the first dossier slides up over the diorama like a sheet laid onto the desk. From here, the view is **top-down onto the desk surface** (flat-lay).
- **Content artifacts:** dossier (About), ledger with folder tabs (Experience), blueprint board and project sheets (Services), certificate folios (Certificates), letterpress card and correspondence sheet (Contact).
- **Editorial discipline:** an intentional, architectural paper studio. Never a SaaS landing page, neon HUD, glass dashboard, or cluttered cartoon room.

### 2.2 Light Story (signature of the brand)

Exactly **one light source per theme**. Every 2D shadow and 3D light MUST follow it.

| Theme | Name | Source | Shadow direction | Visual cue |
| --- | --- | --- | --- | --- |
| Light | **Daylight Desk** | Window, upper-left | Falls to bottom-right (`+x`, `+y`) | Pale window beam on the wall; lamp off |
| Dark | **Lamp-On Desk** | Desk lamp, upper-right | Falls to bottom-left (`−x`, `+y`) | Night-blue window; warm light pool under the lamp |

Shadow direction is a token (`--light-x`), not hand-tuned per component (§5.4).

### 2.3 Signature Motifs (use these, nothing else decorative)

| Motif | Where | Rule |
| --- | --- | --- |
| **Cut edge** — 1 px `line` border + offset paper-recess edge | All raised paper | Default elevation, §5.4 |
| **Fold crease** — hard-stop two-tone corner | Dossier, case-study sheet | Max one fold per card |
| **Die-cut folder tab** | Experience, Certificates, Archive filters | `clip-path` trapezoid, `rounded-[4px]` max |
| **Stamped index** — `01`–`06` in JetBrains Mono, like a drawer label | Section eyebrows, StudioRail | Accent color, never decorative elsewhere |
| **Registration / crop marks** | Corners of the hero stage and the blueprint board only | 1 px `line`, 12 px arms |
| **Blueprint grid** | `#services` capability board only | `blueprint` at ≤ 8% alpha |
| **Paper tape strip** | Holding project screenshots only | Max one per card, slight rotation (−3° to 3°) |
| **Postmark stamp** | Contact success state only | Appears **only** after a real 2xx delivery |

### 2.4 Workspace Props & Compositional Restraint

| Layer role | Approved objects | Purpose |
| --- | --- | --- |
| Back wall (L1) | Window + light beam, small pinboard, one wall shelf | Office atmosphere, depth |
| Desk (L2) | Wood-grain paper desk plane, desk mat | Grounds the scene |
| Focal object (L2) | Open paper laptop + live HTML screen | Identity, role, live status |
| Character (L2) | Paper figurine of Rifqi (GLB or poster) | Personal brand, links Hero to EQbot |
| Lamp (L2) | Articulated paper desk lamp | Theme switch, light source |
| Foreground (L3) | Mug, paper plant, folded notebook, one sticky note | Parallax depth, warmth |

- Full props appear in `#home` only. Lower sections use **at most 1–2 edge props** with `pointer-events: none`.
- Every object needs a compositional reason. No clutter to fill whitespace.
- No real brand logos on props (laptop lid, mug, sneakers): plain paper only.

### 2.5 Material & Readability Constraints

- **Paper materiality:** 2D layers and 3D meshes share matte paper rules: roughness `0.82–0.95`, metalness `0.0–0.05`, subtle fiber grain, visible 1–2 px cut edges.
- **Forbidden materials:** glossy plastic, chrome, glass/`backdrop-blur`, neon glow, photoreal skin shaders, random glossy 3D toys.
- **Readability first:** body text and controls sit on clean paper (`bg-paper` / `bg-raised`), never on illustrations or busy 3D edges.
- **Never obstructive:** no splash screen, no forced intro, no gated content. The page is fully usable if WebGL fails or JS is slow.

### 2.6 Character Specification — Rifqi Paper Figurine

Derived from the owner's turnaround reference (front, ¾, side, back, ¾-back, plus head close-ups).

| Feature | Reference | Paper translation |
| --- | --- | --- |
| Build & pose | Average athletic build, relaxed standing pose, arms down | ~5 heads tall miniature, relaxed A-pose for rigging; idle pose seated or standing beside the laptop |
| Hair | Black tight curls on top, low taper fade on sides and back | **Quilled paper curls** (coiled paper strips) on top; short flat-cut paper planes for the fade |
| Face | Warm light-brown skin, dark almond eyes, straight brows, calm slight smile | Flat-shaded planes; eyes as small dark almond cut-outs, brows as thin paper strips, mouth as a single subtle fold. No realistic skin, no open mouth, no teeth |
| Top | Fitted black crew-neck t-shirt | Charcoal cardstock (`--ill-shirt`), never pure black |
| Bottom | Medium-blue faded straight-fit denim | Two-tone denim paper (`--ill-denim` + `--ill-denim-fade` on thighs and knees) |
| Shoes | Grey running sneakers, white midsole | Grey paper upper + off-white sole. **No brand marks** |

Rules:

- One character identity everywhere: Hero (GLB or poster), EQbot avatar (head crop of the same poster), 404 page.
- Never photoreal, never uncanny. Low-poly folded planes (≤ 15k triangles total).
- Non-blocking: no cursor-chasing, no walking across text, no gating navigation. Idle motion is limited to one blink or head turn, on demand (§10).
- The reference photos are personal data. They MUST NOT be committed to `public/` or the repo; keep them in private storage.

---

## 3. Anti-AI-Slop & Authenticity Standard

"AI slop" is the generic look of template- or AI-generated sites. This portfolio MUST look made by one person, for one person.

### 3.1 Repository Audit (2026-11-22)

The pre-redesign code still contained, in live files: 48 `gradient` usages, 66 hover `scale`/`whileHover` effects, 41 hardcoded hex colors, 41 ad-hoc `dark:` classes, 27 remapped neon palette classes (`emerald`, `purple`, `indigo`, …), 16 `rounded-full`, 8 large drop shadows, 7 arbitrary `z-[…]` values, a blocking `LoadingScreen`, a Lottie avatar, and a "typing rotator" with four role buzzwords. All of these are retired by this redesign.

Removed in the cleanup commit: 37 unreachable components (`GlassSkillCard`, `TiltedCard`, `FallingText`, `ParticleEffect`, `lanyard`, `Carousel`, `RoleSelection*`, `DualFunnelProjects`, `ImmersivePortfolioGallery*`, `FloatingRoleSwitcher`, …), 49 unreferenced assets (~6.9 MB), and the packages `@react-three/rapier`, `matter-js`, `@types/matter-js`, `motion` (duplicate), `three`, `@react-three/fiber`, `@react-three/drei` (reinstalled at new majors in Phase 1).

### 3.2 Banned Patterns (each is a merge blocker)

| Category | Banned |
| --- | --- |
| Color | Purple/indigo/blue-violet palettes; gradient text (`bg-clip-text text-transparent`); mesh/aurora/blob backgrounds; neon glow; animated gradients |
| Surfaces | Glassmorphism, `backdrop-blur`; dot-grid or line-grid page backgrounds (blueprint grid allowed only in `#services`); noisy gradients behind cards |
| Shape | `rounded-xl` and above on cards, buttons, inputs, nav; pill badges everywhere (`rounded-full` allowed only for the EQbot avatar crop and the presence dot) |
| Layout | Centered hero with two buttons and floating blobs; "bento grid" of equal tiles; 3-column "icon in a rounded square + title + two lines" feature grids; endless logo marquee; testimonial carousels |
| Motion | Counters animating from 0; shimmer borders; hover `scale`/3D tilt; floating loops; staggered fade on every element; parallax on text |
| Copy | "Hi, I'm X 👋"; "Let's build something amazing together"; "passionate", "cutting-edge", "seamless", "leverage", "elevate", "unleash"; emoji in headings; rotators cycling buzzwords |
| Components | Unmodified shadcn/ui or template blocks; Lottie characters; stock illustrations (unDraw, Storyset, …); AI-generated images |
| Icons | Mixing icon libraries; emoji as icons; filled + outlined icons mixed |

### 3.3 Authenticity Tests (every new component MUST pass all five)

1. **Swap test** — If the name were replaced with another developer's, would the component still make sense unchanged? Then it is generic: tie it to Rifqi's real data, stack, or desk.
2. **Material test** — Can you point to the paper property it shows (cut edge, fold, layer offset, grain, tape)? If not, it is "flat UI".
3. **Light test** — Do its shadows follow `--light-x` for the current theme?
4. **Fact test** — Is every number, company, link, and claim traceable to `src/data/portfolio.ts`? Nothing invented.
5. **Purpose test** — Remove it. If nothing is lost for the visitor, delete it.

### 3.4 Copy Voice

- Plain, specific, first person. Name systems, industries, and stacks (".NET 8 Web API for a telecom tower inventory" beats "scalable solutions").
- Short sentences. No hype adjectives. No exclamation marks in UI.
- EN and ID written as equals; ID is never a machine translation left unreviewed.

---

## 4. Section-by-Section UX Blueprint & Visitor Journey

Render order, `navLinks` order, and StudioRail order MUST match exactly:
`01 #home` → `02 #about` → `03 #experience` → `04 #services` → `05 #certificates` → `06 #contact`.
(The pre-redesign `navLinks` listed Services before Experience. Fix in Phase 4.)

### 4.1 Journey at a Glance

| Time | Visitor sees | Visitor does |
| --- | --- | --- |
| 0–2 s | Name, role, one-line value proposition, CTAs, laptop screen with live status | Decides to stay |
| 2–5 s | Highlight metrics (`5`, `100+`, `3+`, `30+`), current role on the laptop | Clicks **View projects** or **Download CV**, or scrolls |
| 5–20 s | Dossier slides over the desk; index cards | Confirms education and industries |
| 20–60 s | Ledger of roles; blueprint board; project sheets | Opens one case study |
| 60 s+ | Certificates, contact card | Sends a message or copies the email |

### 4.2 Section Specifications

#### `01` `#home` — Front-Desk Diorama & Open Laptop

- **Layout (≥ 1024 px):** 5/7 grid. Left: eyebrow `01 — Software Engineer`, `h1` name in Fraunces, a **static** role line (current title from `workExperience[0]`) with one blinking caret, a value proposition ≤ 2 lines, 4 cut-out metric tickets, CTAs `View projects` (ink fill) and `Download CV` (outline, rendered only if the CV file exists). Right: the stage (§9.1).
- **Laptop screen (`LaptopScreenUI`):** a small window titled `rifqi.profile`. It shows the status line (rendered only if the owner sets `contactInfo.availability`), current role and company, core stack tags from `developerSkills` (`focus: 'core'`), and two buttons: `Open projects` and `Ask EQbot`. Real HTML, ≥ 13 px body / ≥ 11 px mono, keyboard focusable, bilingual.
- **Lamp:** `<button aria-pressed={isDark} aria-label="Turn desk lamp on (dark theme)">`. Click flips the theme through `next-themes`. The lamp head tilts 6° and the light pool fades in over 200 ms. The navbar toggle does the same thing.
- **Figurine:** stands right of the laptop. Poster renders first; GLB swaps in after idle on capable desktops (§9.3). Hovering or focusing the laptop makes the figurine turn its head toward it once (on-demand frame).
- **Exit:** the stage is `position: sticky; top: 0` inside a wrapper ≥ 1024 px and ≥ 700 px tall, so the About sheet slides over it. No pinning beyond natural sticky behavior.

#### `02` `#about` — Folded Profile Dossier

- **Entry:** the sheet arrives over the hero with a lifted top edge (`--paper-edge-lifted` mirrored upward).
- **Content:** bio on a `bg-raised` dossier with one fold crease (top-right) and a paper clip holding a small figurine poster crop. The 4 `aboutHighlights` render as die-cut index cards in a 2×2 grid with equal row heights; hover tints the cut edge to `accent`.
- **Mobile:** single column, the clip and crop hidden below 640 px.

#### `03` `#experience` — Tabbed Career Archive Ledger

- **Tabs:** two die-cut folder tabs, `Work` and `Organization`, implemented as an ARIA `tablist` (arrow keys move, `Enter`/`Space` select).
- **Rows:** `ledger-item` rows (company, role, period, location) with a stamped index. Clicking a row (`<button aria-expanded>`) unfolds a detail panel: role, period (via `calculateTotalExperience` where relevant), impact bullets, tech stack tags. Height changes instantly; only the inner content fades and rises 8 px in 200 ms. No layout jump for rows above.
- **Logos:** company logos from `public/assets/` with descriptive `alt`.

#### `04` `#services` — Blueprint Board & Project Sheets

- **Band A — Capabilities:** a blueprint board (crop marks, blueprint grid ≤ 8% alpha) listing core `developerSkills` grouped as Backend, Data, Frontend, Tooling. Secondary skills open in `AdditionalSkillsDialog`.
- **Band B — Selected projects:** paper project cards. The screenshot sits in a thin paper-laptop frame held by one tape strip; below it are the title (`h3`, Fraunces), a one-line summary, and 3–4 stack tags in mono. `View all projects` opens the archive.
- **Case-study sheet (`ProjectDetailDialog`):** native `<dialog>` styled as a folded sheet. Sections in this order: **Problem → My role → Approach → Stack → Outcome → Slides → Links** (live/repo only if real). Missing sections are omitted, never filled with placeholders.

#### `04b` Project Archive Drawer (`ViewAllProjects`)

- A full section view reached from Services and returned from with **Back to desk**; it restores scroll position and focus.
- Square, ink-filled folder-tab filters (`All`, `Individual`, `Group`, `Design`) and a crisp `border-line` search input with a visible label. It reuses the exact `ProjectCard`. Result count announced via `aria-live="polite"`.

#### `05` `#certificates` — Die-Cut Certificate Folios

- The 4 `certificateCategories` (`Dicoding`, `Kegiatan`, `Organisasi`, `Magang`) render as folder cards with a mono `count` tab.
- Selecting a folder (`aria-expanded`) reveals itemized rows: name, issuer, year, and an `Open` link to the verified file (`target="_blank" rel="noopener noreferrer"`). Optional 64 px thumbnail.

#### `06` `#contact` — Letterpress Card & Correspondence Sheet

- **Left:** letterpress business card (debossed name via a 1 px inset highlight/shadow pair). It lists Email (with a copy button that announces "Copied"), LinkedIn, GitHub, WhatsApp, and Jakarta.
- **Right:** correspondence sheet form: name, email, message, and a hidden honeypot field. Labels are always visible. Inline errors after blur and submit.
- **Delivery states:** idle → sending (button text changes, form `aria-busy`) → **sent** (postmark stamp + message, only after a real 2xx) or **failed** (oxide error with a retry and the direct email). Never a fake success.

#### Footer — Ink Colophon Strip

`bg-ink text-paper`. Name, short section links, language and theme toggles repeated, copyright year from `new Date()` at build time, and a "Built with" line naming the real stack.

#### StudioRail & EQbot

- **StudioRail (≥ 1440 px):** vertical paper index `01`–`06` with a hairline progress rule, updated via `IntersectionObserver` (no scroll listeners). Each index is a link.
- **EQbotCompanion:** bottom-right launcher showing the figurine head crop in a circle. It opens a square paper dialogue sheet driven by `eqbot-script.ts`: bilingual, scripted, factual, no AI model. Its avatar and status use the same tokens as the rest of the page (no `white` hard-codes).

#### 404 — Empty Drawer

An open, empty paper drawer, a single line of copy, and a link back to the desk. Same tokens, no new assets beyond one SVG.

---

## 5. Design Tokens & Visual System

All visual values live in `src/styles/tokens.css` as a Tailwind 4 `@theme` block (light values), with `.dark` overriding the same variables. **Hex, `rgb()`, or `oklch()` literals in TSX are forbidden.** Inline SVG components in TSX use `fill="var(--color-…)"` or Tailwind `fill-*` classes.

### 5.1 Core Palette

| Token | Utility | Light — Daylight Desk | Dark — Lamp-On Desk | Usage |
| --- | --- | --- | --- | --- |
| `--color-paper` | `bg-paper`, `text-paper` | `#F4F0E8` | `#131211` | Page ground |
| `--color-raised` | `bg-raised` | `#FBF8F2` | `#1C1A17` | Cards, dossiers, dialogs, inputs |
| `--color-recess` | `bg-recess` | `#EAE3D5` | `#24211D` | Fold undersides, inactive tabs, cut-edge offset |
| `--color-ink` | `text-ink`, `bg-ink` | `#1B1916` | `#F3EEE6` | Headings, body, primary button, footer |
| `--color-muted` | `text-muted` | `#6A635B` | `#A79E93` | Secondary copy, metadata |
| `--color-line` | `border-line` | `#DDD4C6` | `#322E29` | Hairlines, seams, ledger borders |
| `--color-accent` | `text-accent`, `bg-accent` | `#8C3A2F` | `#D47868` | Oxide accent, active markers, focus ring |
| `--color-wood` | `bg-wood` | `#8A6245` | `#6B4B34` | Desk surface and wood props only |
| `--color-wood-dark` | `bg-wood-dark` | `#5C4030` | `#3D2A1F` | Desk edge thickness |
| `--color-blueprint` | `text-blueprint` | `#4E6A7D` | `#7FA1B8` | Technical labels, screen code accents, blueprint grid |
| `--color-sage` | `text-sage` | `#6B7D65` | `#8EA387` | Paper plant; **form success only** |

### 5.2 Illustration Palette (SVG scene, figurine, props only)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--ill-skin` / `--ill-skin-shade` | `#C4916F` / `#A87658` | `#96694F` / `#78533E` | Figurine face, arms |
| `--ill-hair` | `#211D1B` | `#161413` | Quilled curls, fade |
| `--ill-shirt` | `#2B2927` | `#1E1D1C` | Charcoal tee |
| `--ill-denim` / `--ill-denim-fade` | `#466080` / `#6884A0` | `#344862` / `#4E647E` | Jeans |
| `--ill-sneaker` / `--ill-sole` | `#969694` / `#E8E5DE` | `#70706E` / `#AAA6A0` | Shoes |
| `--ill-window` | `#E6EEF2` | `#1E2A36` | Window pane (day / night) |
| `--ill-lamp-light` | — (lamp off) | `#FFD696` at 18% | Lamp light pool, dark only |

### 5.3 Color Rules

- No `#000` / `#FFF` as surfaces.
- Dark mode switches variables inside `.dark` only. **No `dark:` utility classes** except `dark:` swaps of SVG layer visibility in the hero (window day/night, lamp light), which are listed here and nowhere else.
- `RoleContext` MUST NOT alter the palette. Roles change copy order or emphasis only.
- Sage and oxide states are reserved for real form outcomes and status, never decoration.
- **Gradients:** forbidden except (a) hard-stop two-color fold creases and (b) the single radial lamp light pool in the dark hero.
- Contrast: body ≥ 4.5:1, large text and UI glyphs ≥ 3:1, verified in both themes. `blueprint` text only at ≥ 14 px.

### 5.4 Shape, Spacing & Paper Elevation

- **Spacing scale:** `4, 8, 12, 16, 24, 32, 48, 64, 80, 112` px.
- **Container:** `max-w-6xl mx-auto px-5 lg:px-8`.
- **Section rhythm:** `py-16 md:py-28 border-b border-line`.
- **Radii:** `rounded-none` or `rounded-[2px]` by default; `rounded-[4px]` max for tabs and laptop bezel; `rounded-full` only for the EQbot avatar crop and presence dot.
- **Light-driven elevation tokens** (`--light-x` = `1` in light, `-1` in dark):

| Token | Value | Use |
| --- | --- | --- |
| `--paper-edge-flat` | `1px solid var(--color-line)` | Ledger rows, table cells |
| `--paper-edge-cut` | border + `calc(2px * var(--light-x)) 2px 0 var(--color-recess)` | Cards, tabs |
| `--paper-edge-lifted` | border + `calc(4px * var(--light-x)) 4px 0 var(--color-recess), calc(10px * var(--light-x)) 14px 24px rgb(27 25 22 / 0.08)` | Hover, laptop frame, dialogs, slide-over sheet |
| `--paper-grain` | Inline SVG `feTurbulence` data URI, opacity `0.025–0.04` | Applied **once** on `body::before`, never per card |

### 5.5 Z-Index Contract (`src/styles/z-index.css`)

Arbitrary `z-[…]` values and numeric `z-*` utilities are forbidden. Use the named tokens.

| Token | Value | Role | Pointer events |
| --- | --- | --- | --- |
| `--z-plane-base` (L0) | 0 | Page ground, grain | none |
| `--z-scene-back` (L1) | 10 | Wall, window, shelf | none |
| `--z-scene-mid` (L2) | 20 | Desk, laptop, lamp, figurine | auto (laptop screen + lamp only) |
| `--z-scene-front` (L3) | 30 | Foreground props | none |
| `--z-content-ui` (L4) | 40 | Sections, cards, controls | auto |
| `--z-chrome` (L5) | 50 | Navbar, StudioRail, EQbot | auto |
| `--z-overlay` (L6) | 60 | Mobile menu, toasts | auto |

Dialogs use native `<dialog>.showModal()` and live in the browser **top layer**, so they need no z-index.

---

## 6. Typography

Keep the three fonts loaded through `next/font/google` (`display: "swap"`, `adjustFontFallback: true`).

| Role | Utility | Font | Weights | Usage |
| --- | --- | --- | --- | --- |
| Display | `font-serif` | **Fraunces** (variable, axes `opsz`, `SOFT`) | 500–700 | Hero name, section titles, card titles |
| UI & body | `font-sans` | **Source Sans 3** | 400–700 | Paragraphs, navigation, buttons |
| Technical | `font-mono` | **JetBrains Mono** | 400, 600 | Indices, eyebrows, tags, laptop screen |

- Fraunces display uses `font-variation-settings: "SOFT" 50` for a slightly soft, cut-paper feel. `WONK` stays off.
- Section `h2`: `font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink` via `SectionTitle`.
- Eyebrow: `font-mono text-[11px] tracking-[0.2em] uppercase text-accent`, formatted `0N — Label`.
- Body ≥ 16 px, `leading-relaxed`, max line length `65ch`.
- Forbidden: `font-black`, `font-extrabold`, gradient text, mono paragraphs, `truncate` on titles, roles, certificate names or descriptions. Wrap instead. `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

---

## 7. Component Inventory

Every component is a token consumer. Names are fixed; do not create look-alikes.

| Component | File | Element | States | Notes |
| --- | --- | --- | --- | --- |
| `PaperSheet` | `ui/PaperSheet.tsx` | `div`/`article` | — | `bg-raised`, `--paper-edge-cut`, optional `fold="tr"` |
| `PaperCard` | `ui/PaperCard.tsx` | `article` with one inner link/button | rest, hover (edge → accent, `translateY(-2px)`), focus-visible | Whole card clickable via stretched link, one tab stop |
| `PaperButton` | `ui/PaperButton.tsx` | `button` / `a` | primary (ink fill), secondary (outline), quiet (text), disabled, busy | Min 44×44 px, `rounded-[2px]` |
| `FolderTabs` | `ui/FolderTabs.tsx` | ARIA `tablist` | active (raised, connects to panel), inactive (recess) | Arrow-key roving focus |
| `PaperDialog` | `ui/PaperDialog.tsx` | native `<dialog>` | open, closing | `showModal()`, `Escape` closes, focus restored to the trigger, `::backdrop` = ink at 40% |
| `Stamp` | `ui/Stamp.tsx` | `span` | — | Stamped index / postmark |
| `Tag` | `ui/Tag.tsx` | `li` | — | Mono 12 px, `border-line`, square |
| `SectionTitle` | `ui/SectionTitle.tsx` | `header` with `h2` | — | Eyebrow + title + optional lede |
| `Field` | `ui/Field.tsx` | `label` + `input`/`textarea` | rest, focus, invalid, disabled | Error text linked via `aria-describedby` |
| `PaperDeskStage` | `scene/PaperDeskStage.tsx` | `div` | static, parallax | Server-rendered SVG layers |
| `LaptopScreenUI` | `scene/LaptopScreenUI.tsx` | `section aria-label` | — | Client leaf |
| `DeskLamp` | `scene/DeskLamp.tsx` | `button` | on / off | Theme switch |
| `PaperDeskCanvas` | `scene/PaperDeskCanvas.tsx` | R3F `<Canvas>` | loading, ready, failed | Dynamic, `ssr: false` |
| `PaperScenePoster` | `scene/PaperScenePoster.tsx` | `img` via `next/image` | — | Same framing as the canvas |

`lucide-react` is the only icon library (stroke width `1.5`). Brand glyphs (GitHub, LinkedIn, WhatsApp) are local SVG components in `src/components/icons/`, sourced from Simple Icons (CC0).

---

## 8. Responsive Rules

| Breakpoint | Strategy |
| --- | --- |
| **Desktop ≥ 1024 px** | Full 5-layer stage, pointer parallax, sticky slide-over (if height ≥ 700 px), R3F figurine if the capability gate passes, StudioRail at ≥ 1440 px, 2-column dossiers and grids |
| **Tablet 768–1023 px** | 3-layer stage (wall, desk + laptop, one front prop), no parallax, no sticky, poster figurine, 2-column grids |
| **Mobile < 768 px** | Text first: eyebrow, name, role, value prop, CTAs, metrics. Then a compact laptop card (screen UI in a paper frame, no wall or props). **No WebGL**, no parallax, no horizontal overflow, touch targets ≥ 44 px, no forced `min-h-screen` |

One component per section, made responsive with Tailwind breakpoints. **No separate `mobile/*` component tree and no `if (!mounted)` blank render.** Device-only behavior (parallax, R3F) is decided in CSS media queries or inside client leaves after mount, never by swapping the whole layout.

---

## 9. Hybrid 2D + 3D Rendering Architecture

### 9.1 Stage Coordinate System

- The stage is one container with `aspect-ratio: 16 / 10`. Every SVG layer uses `viewBox="0 0 1600 1000"`, so layers align at any width.
- The laptop screen rect is defined once as percentages of the stage (`--screen-x`, `--screen-y`, `--screen-w`, `--screen-h`). `LaptopScreenUI` is absolutely positioned with those values, so HTML and artwork never drift.
- Layers are inline SVG (for tokenized fills) rendered by Server Components. Decorative layers get `aria-hidden="true"` and `focusable="false"`.

### 9.2 Parallax Specification

- Animate **only** `transform: translate3d()` and `opacity`. Never `top/left/width/height/margin/filter`.
- Amplitude (desktop only): L1 ±4 px pointer / `0.08×` scroll; L2 anchored (0 px on the screen and lamp, ±2 px elsewhere); L3 ±10 px pointer / `0.16×` scroll.
- `useParallaxStage` writes `--px` and `--py` on the stage element inside one `requestAnimationFrame` per pointer move. **No React state on `pointermove` or `scroll`.**
- Scroll-linked depth uses CSS scroll-driven animations (`animation-timeline: view()`) inside `@supports (animation-timeline: view())`. Without support, layers stay static. No JS scroll listeners.
- Disabled for `(pointer: coarse)`, `< 1024 px`, and `prefers-reduced-motion: reduce`.

### 9.3 React Three Fiber Guardrails

- `PaperDeskCanvas.tsx` (`"use client"`) loads via `next/dynamic(() => import(…), { ssr: false, loading: () => <PaperScenePoster /> })`.
- **Capability gate**, checked after hydration inside `requestIdleCallback`: width ≥ 1024, `matchMedia('(pointer: fine)')`, not `prefers-reduced-motion`, no `navigator.connection.saveData`, `deviceMemory ≥ 4` and `hardwareConcurrency ≥ 4` when exposed, and WebGL2 available. Otherwise the poster stays.
- `dpr={[1, 1.5]}`, `frameloop="demand"`, `gl={{ antialias: true, powerPreference: 'low-power' }}`.
- Pause with `IntersectionObserver` when the stage leaves the viewport or is covered by the About sheet, and on `document.hidden`.
- Lighting: one hemisphere light plus one directional light positioned per theme (window upper-left / lamp upper-right). No real-time shadow maps; use a baked contact-shadow plane.
- Model loaded with drei `useGLTF` plus a Meshopt decoder, generated as a typed component with `gltfjsx --types`.
- Dispose geometries, materials, and textures on unmount.
- Wrap in an `ErrorBoundary` and listen for `webglcontextlost`. On failure, render `PaperScenePoster` with identical framing, so there is zero layout shift.

### 9.4 Asset Production Pipeline

| Asset | Tool | Output | Optimization |
| --- | --- | --- | --- |
| Scene layers, props, laptop, lamp | Figma or Inkscape, hand-drawn | Inline SVG React components | SVGO (`multipass`, keep `viewBox`), fills replaced with tokens |
| Figurine | Blender 4.x: low-poly hand-modeled from the turnaround, quilled curls as curve meshes, flat paper materials, baked AO | `rifqi-figurine-paper.glb` | `gltf-transform optimize --compress meshopt --texture-compress webp --texture-size 1024` |
| Figurine poster | Same Blender scene and camera as the R3F view | `rifqi-figurine-poster.avif` + `.webp`, light and dark | `sharp`, ≤ 80 KB each |
| EQbot avatar | Head crop of the poster | `eqbot-avatar.webp` 128 px | ≤ 12 KB |
| Project screenshots | Real captures | `.webp` | ≤ 150 KB, explicit width/height |

### 9.5 Asset Budgets

| Category | Target | Hard limit |
| --- | --- | --- |
| Figurine GLB | ≤ 1.5 MB | 3 MB |
| Optional decorative GLB | ≤ 300 KB | 500 KB |
| 3D textures | ≤ 1024² | never above 2048² |
| SVG scene layer | ≤ 40 KB | 80 KB |
| Raster scene layer (if ever needed) | ≤ 120 KB | 200 KB |
| Project screenshot | ≤ 150 KB | 250 KB |
| Total JS on first load (route `/`) | ≤ 170 KB gzip | 220 KB gzip (three.js excluded; it loads after idle) |

Naming: lowercase kebab-case with a domain prefix in `public/assets/papercraft/` (`desk-…`, `prop-…`, `laptop-…`, `rifqi-…`). No spaces, no `final2`, no `copy`. Every file in `public/` MUST be referenced by code or data; orphans are deleted.

---

## 10. Motion & Interaction

### 10.1 Motion Tokens (`src/styles/motion.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--ease-paper` | `cubic-bezier(0.22, 1, 0.36, 1)` | All UI motion |
| `--dur-micro` | `160ms` | Hover edge tint, button press |
| `--dur-ui` | `200ms` | Tabs, row unfold content, lamp |
| `--dur-sheet` | `320ms` | Dialog open/close |
| `--dur-reveal` | `600ms` | Section reveal (once) |

### 10.2 Allowed & Forbidden Motion

**Allowed:** one reveal per section on first view (`opacity` + `translateY(12px → 0)`), visible by default in SSR HTML (progressive enhancement, no `opacity: 0` trap); 2 px hover lift on cards; tab and dialog transitions; the hero caret; lamp tilt; one figurine head turn on demand; the postmark stamp (once).

**Forbidden:** splash or loading screens; scroll hijacking, Lenis or any smooth-scroll override; continuous loops on multiple props; physics engines; falling or flying cards; 3D tilt; particles, aurora, shimmer; `transition: all`; animating layout properties.

**Reduced motion (`prefers-reduced-motion: reduce`):** no parallax, no scroll-linked transforms, the figurine stays as the poster, reveals are instant, dialogs fade ≤ 100 ms. Every feature still works.

**Tooling:** CSS first. Use `motion` (`motion/react`) only for mount/unmount presence (dialog content, tab panels, EQbot sheet) where CSS cannot. It is loaded with `LazyMotion` + `domAnimation`.

---

## 11. Technology Stack Decision

### 11.1 Scored Choices

| Concern | Options considered | Chosen | Why |
| --- | --- | --- | --- |
| Framework | Stay on Next 14 · **Next 16** · Astro | **Next.js 16** (App Router, Turbopack) | Server Components for static paper layers, React 19 support required by R3F 9, Server Actions for the form, first-class on Vercel |
| UI runtime | **React 19** | React 19 | Native `<dialog>` refs, `useActionState`, needed by R3F 9 / drei 10 |
| Styling | Tailwind 3 · **Tailwind 4** · CSS Modules | **Tailwind CSS 4** | CSS-first `@theme` makes tokens the single source; no 100-line JS config of remapped palettes |
| 3D | **R3F 9 + drei 10** · `<model-viewer>` · Spline | **R3F** | Control over demand rendering, theme-driven lights, poster parity. Spline rejected: heavy runtime, external hosting, low control |
| Motion | **CSS + scroll-driven CSS + `motion`** · GSAP ScrollTrigger · Lenis | **CSS first, `motion` for presence** | No scroll hijacking; scroll-driven CSS is native and free |
| Dialogs | **Native `<dialog>`** · Radix · custom portal | **Native `<dialog>`** | Top layer, built-in `Escape`, inert background, zero dependency |
| Theme | **next-themes 0.4** | next-themes | `attribute="class"`, system default, no flash |
| Form | API route · **Server Action** | **Server Action + `zod` 4 + Resend** | Works without JS (progressive enhancement), typed validation in one place |
| Bot protection | **Honeypot + min-fill time + Vercel BotID + Firewall rate rule** | All four | No user-facing CAPTCHA |
| Icons | **lucide-react** + local brand SVGs | lucide-react | One library; `react-icons` removed |
| Asset tools | **Blender, gltf-transform, gltfjsx, SVGO, sharp** | All | Free, scriptable, best-in-class compression |
| QA | **Playwright + @axe-core/playwright**, Lighthouse CI, `@next/bundle-analyzer` | All | Proves the DoD instead of claiming it |

### 11.2 Package Policy

- **Install in Phase 1:** `next@16`, `react@19`, `react-dom@19`, `tailwindcss@4`, `@tailwindcss/postcss`, `three`, `@react-three/fiber@9`, `@react-three/drei@10`, `motion`, `zod@4`, `next-themes@0.4`, `lucide-react`, `resend`. Dev: `@playwright/test`, `@axe-core/playwright`, `@next/bundle-analyzer`, `svgo`, `@gltf-transform/cli`, `gltfjsx`, `eslint` (flat config) + `eslint-config-next`.
- **Remove in Phase 1:** `framer-motion` (replaced by `motion`), `lottie-react`, `react-icons`, `react-type-animation`, `autoprefixer` (Tailwind 4 handles it).
- **TypeScript:** pin the newest major that Next.js 16 officially supports; move to TypeScript 7 (native compiler) only after `next build` passes on it.
- **Node:** 20.9+ (Vercel default Node 24 LTS).
- Exact versions are locked in `package-lock.json`. R3F, drei, and three versions MUST be bumped together after checking peer ranges (`npm view <pkg> peerDependencies`).
- Next 16 removed `next lint`: `npm run lint` runs `eslint .`.
- React Compiler (`reactCompiler: true`) MAY be enabled once the build and Playwright suite pass with it.

### 11.3 `next.config` Rules

- No `hostname: '**'` remote image pattern. Only explicitly needed hosts, ideally none.
- No custom webpack `splitChunks` overrides; Turbopack defaults are better.
- Keep security headers (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, a CSP once the R3F worker/decoder origins are known).
- `optimizePackageImports` lists only installed packages (`lucide-react`, `@react-three/drei`).

---

## 12. Code Architecture

```
src/
  app/
    layout.tsx            fonts, ThemeProvider, LanguageProvider, skip link
    page.tsx              Server Component: composes sections, no loading gate
    not-found.tsx         Empty Drawer
    actions/contact.ts    Server Action (zod + Resend + honeypot)
    opengraph-image.tsx, robots.ts, sitemap.ts, icon.svg, apple-icon.png
  components/
    scene/                PaperDeskStage, LaptopScreenUI, DeskLamp, PaperDeskCanvas, PaperScenePoster, layers/*.tsx
    sections/             Navbar, Hero, About, Experience, Services, ProjectArchive, Certificates, Contact, Footer
    ui/                   PaperSheet, PaperCard, PaperButton, FolderTabs, PaperDialog, Stamp, Tag, SectionTitle, Field
    shared/               StudioRail, EqbotCompanion, eqbot-script.ts, ProjectDetailDialog, AdditionalSkillsDialog, BrandLockup
    icons/                local brand glyph SVGs
  context/                LanguageContext, RoleContext
  data/portfolio.ts       the only content source
  hooks/                  useParallaxStage, useReducedMotion, useInView, useCapabilityGate
  lib/                    experience-utils, additional-skills, validation schemas
  styles/                 tokens.css, z-index.css, motion.css, globals.css
  types/index.ts
```

- `"use client"` only at interactive leaves (LaptopScreenUI, DeskLamp, FolderTabs, dialogs, Contact form, EQbot, Navbar menu). Sections stay Server Components where possible.
- No component file over ~250 lines; split by responsibility.
- TypeScript `strict`, zero `any`, zero `@ts-ignore`.

---

## 13. Data Integrity & Bilingual Standards

- All facts live in `src/data/portfolio.ts` and conform to `src/types/index.ts`.
- **Bilingual parity:** every visible string has EN and ID (`title`/`titleId`, `description`/`descriptionId`, `labelEn`/`labelId`) rendered through `useLanguage().t(en, id)`. `<html lang>` follows the active language.
- **Zero fabricated facts:** no invented employers, metrics, outcomes, URLs, availability statuses, or skills. Keep the verified figures (`5`, `100+`, `3+`, `30+`) and `calculateTotalExperience`.
- **Optional fields render conditionally.** If a project has no repo link, there is no repo button. Never "Coming soon" or `#` links.
- Stable lowercase kebab-case `id`s. Every `image`, `logo`, `slides`, and certificate `link` points to an existing file in `public/assets/` (checked in CI).
- `certificateCategories[i].count === certificateCategories[i].certificates.length` (checked in CI, or derive `count` instead of storing it).

---

## 14. Performance, Accessibility & Security Baselines

### 14.1 Core Web Vitals

| Metric | Target | Enforcement |
| --- | --- | --- |
| LCP | ≤ 2.5 s (mobile 4G) | Hero text and SVG stage are in the initial HTML; three.js loads after idle |
| INP | ≤ 200 ms | No state updates in pointer/scroll loops; dialogs are native |
| CLS | ≤ 0.1 | Fixed `aspect-ratio` on stage, canvas, poster, and every image |

### 14.2 Accessibility (WCAG 2.2 AA)

- Skip link to `#main` as the first focusable element.
- One `h1` (hero name) → `h2` per section → `h3` per card.
- Native `<button>`/`<a>` only; visible `outline: 2px solid var(--color-accent); outline-offset: 3px` on `:focus-visible`.
- Decorative layers: `aria-hidden="true"`; informative images have descriptive `alt`.
- Dialogs: native `<dialog>` modal, `Escape` closes, focus returns to the trigger. Mobile menu traps focus.
- Target size ≥ 24 px everywhere and ≥ 44 px on touch layouts.
- Theme and language toggles expose their state (`aria-pressed`, `lang` attributes).

### 14.3 Security & Privacy

- Never commit secrets (`RESEND_API_KEY`) or expose them through `NEXT_PUBLIC_*`. `.env.local` stays ignored.
- The contact Server Action validates with `zod` (length limits, email format), strips control characters, rejects honeypot fills and submissions faster than 3 s, verifies BotID, and is behind a Vercel Firewall rate-limit rule.
- External links: `target="_blank" rel="noopener noreferrer"`.
- No third-party trackers without explicit owner approval. Vercel Web Analytics MAY be enabled (cookieless).
- Personal reference photos never ship in the repo (§2.6).

---

## 15. Automated Guardrails

| Check | Command | Blocks merge |
| --- | --- | --- |
| Lint | `npm run lint` (`eslint .`) | ✅ |
| Types | `npx tsc --noEmit` | ✅ |
| Build | `npm run build` | ✅ |
| Design rules | `npm run check:design` → `scripts/check-design-rules.mjs` greps `src/` for: hex/rgb literals in `.tsx`, `rounded-(xl|2xl|3xl)`, `rounded-full` outside the allowlist, `backdrop-blur`, `bg-gradient`/`bg-clip-text`, `dark:` outside the hero allowlist, `z-[`, `font-black|font-extrabold`, `transition-all`, `truncate`, and orphan files in `public/` | ✅ |
| Data integrity | Same script: asset paths exist, certificate counts match, EN/ID pairs non-empty | ✅ |
| E2E + a11y | `npx playwright test`: 390 px and 1440 px, light and dark, reduced motion, WebGL disabled (`--disable-webgl`), keyboard tour, axe with zero serious/critical issues | ✅ |
| Performance | Lighthouse CI on the Vercel preview: Performance ≥ 90 mobile, Accessibility = 100 | ⚠️ warn |

All checks run in GitHub Actions on every pull request.

---

## 16. Implementation Roadmap

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| **P0 — Rules & cleanup** ✅ | This document; delete old rules, dead components, orphan assets, unused packages | Lint, types, build pass |
| **P1 — Foundation** | Upgrade to Next 16 / React 19 / Tailwind 4; `tokens.css`, `z-index.css`, `motion.css`; remove `LoadingScreen`, `ResponsiveLayout`, `mobile/*`; package swaps (§11.2); `check-design-rules.mjs`; CI workflow | Page renders with new tokens, no loading gate, all guardrails green |
| **P2 — Assets** | SVG wall, desk, laptop, lamp, props (light/dark via tokens); figurine in Blender → GLB + posters; EQbot avatar; brand icons | Budgets in §9.5 met; owner approves the figurine against the turnaround |
| **P3 — Hero stage** | `PaperDeskStage`, `LaptopScreenUI`, `DeskLamp`, `useParallaxStage`, `PaperDeskCanvas` with capability gate and fallback | LCP ≤ 2.5 s, WebGL-off test passes |
| **P4 — Sections** | About, Experience, Services + case-study dialog, Project Archive, Certificates, Contact (Server Action), Footer, Navbar, StudioRail, EQbot reskin, 404; fix `navLinks` order | Every section meets §4 and passes the authenticity tests (§3.3) |
| **P5 — QA & launch** | Playwright/axe suite, Lighthouse CI, copy review EN/ID, Vercel preview review by owner | DoD (§17.3) fully checked |

---

## 17. AI Coding-Agent Workflow & Definition of Done

### 17.1 Execution Protocol

1. **Before editing:** read this file and `package.json`, inspect target files, state a scoped plan, and flag rule conflicts.
2. **While editing:** smallest coherent change, reuse tokens and components, preserve bilingual parity, keep 3D isolated, never fabricate content or fake success states.
3. **After editing:** run the checks in §15 that apply; verify 1440 px and 390 px, keyboard, light/dark, reduced motion, and WebGL fallback.

### 17.2 Mandatory Handoff Format

- **Goal** — what was implemented.
- **Files changed** — exact paths added, modified, removed.
- **Design compliance** — which sections of this file are satisfied.
- **Performance impact** — bundle, asset, and 3D runtime effects.
- **Validation** — exact commands run and their observed results. Never claim a check passed without running it.
- **Remaining issues** — known limitations and follow-ups.

### 17.3 Definition of Done

- [ ] Matches *The Architect's Paper Desk* (matte cardstock, one light source per theme, crisp edges, no glass/neon).
- [ ] Passes the five authenticity tests (§3.3) and contains no banned pattern (§3.2).
- [ ] Uses tokens only; light and dark verified; shadows follow `--light-x`.
- [ ] EN/ID parity and `portfolio.ts` integrity preserved; no invented facts.
- [ ] Hero renders without a splash; 3D is lazy, capability-gated, with a pixel-matched poster fallback.
- [ ] Parallax uses `translate3d` only and is off on touch, < 1024 px, and reduced motion.
- [ ] No truncated meaningful copy; no horizontal overflow at 390 px.
- [ ] Keyboard, focus rings, semantics, and ARIA verified; axe clean.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run check:design`, and Playwright pass.

---

## 18. Glossary

- **Flat-lay** — top-down view onto the desk surface, used for every section after the hero.
- **Slide-over** — the About sheet scrolling over the sticky hero stage.
- **Cut edge** — the 1 px seam plus offset recess edge that makes a surface read as cut paper.
- **Capability gate** — runtime check deciding whether the R3F figurine may load.
- **Poster** — the static image of the figurine rendered from the same camera as the 3D view.

## 19. Change Log

| Date | Change |
| --- | --- |
| 2026-11-22 | v1.0. Concept selected through three scored rounds (§1). Replaced `PORTFOLIO_STANDARDS.md` and the Cursor rule. Added the light story, anti-slop standard, character spec, component inventory, stack decision (Next 16 / React 19 / Tailwind 4 / R3F 9 / `motion`), native dialogs, Server Action contact form, automated guardrails, and roadmap. Deleted 37 dead source files, 49 orphan assets, and 7 unused packages. Baseline after cleanup (`next build`, Next 14): route `/` first-load JS 393 kB. `npm run lint` has no ESLint config yet (set up in P1). |
