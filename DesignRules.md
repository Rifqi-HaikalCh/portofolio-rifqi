# DesignRules.md

# Design System, UX Blueprint & Engineering Guardrails — 3D Paper Craft Developer Portfolio

> **Status:** Single Source of Truth (v2.1). Replaces `PORTFOLIO_STANDARDS.md` and `.cursor/rules/portfolio-standards.mdc` (both deleted 2026-11-22).
> **Owner:** Rifqi Haikal Chairiansyah (`portofolio-rifqi`)
> **Approved Concept:** *The Paper Studio* — a walk-through paper office in shadow boxes (final score 92.75 / 100 on the v2 rubric, see §1). Supersedes *The Architect's Paper Desk* (v1).
> **Rendering Strategy:** Hybrid 2D + 3D — 8–14 procedurally lit 2D paper layers per station placed at real depths and projected through one analytic camera (§9.2), plus one lazy React Three Fiber paper puppet on capable desktops
> **Target Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · React Three Fiber 9 · Motion (see §11)
> **Deployment Target:** Vercel Hobby
> **Primary Audience:** Technical recruiters, engineering managers, enterprise clients, fellow developers

---

## 0. Purpose, Authority & Change Control

This document is the project's **binding design, UX, and engineering contract**. Every human contributor and AI coding agent MUST read it before editing any file.

### 0.1 Rule Keywords

- **MUST / MUST NOT** — Mandatory. A violation is a defect that blocks merge.
- **SHOULD / SHOULD NOT** — Default. Deviating requires a written justification in the PR before implementation.
- **MAY** — Optional, allowed only while every experience gate (§9.6) and visual rule still holds.

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

The concept was not picked by taste. v1 (2026-11-22) chose *The Architect's Paper Desk* (91.5 on the v1 rubric). After it was built (v1.7), the owner reported that the paper craft "is just there": it does not feel like a 3D world and it is not the main experience. v2 diagnoses why, changes the rubric to weigh that, scores six new directions over three rounds, and stress-tests the winner. Future redesign proposals MUST be scored with the v2 rubric and beat **92.75** to replace it.

### 1.0 Diagnosis of v1.7 (why it reads as primitive paper craft)

Audit of the built hero (1440 px and 390 px, light and dark), compared with the owner's two mood references (a layered paper landscape and a framed paper shadow box):

| # | Cause | Evidence in v1.7 | What the references do instead |
| --- | --- | --- | --- |
| 1 | **Hard, zero-blur shadows** | `--paper-drop` is a 4 px offset with 0 blur on every group; it reads as vector stickers | Each sheet casts a soft shadow with a dark contact core and a wide penumbra; the further the gap, the longer and softer the shadow |
| 2 | **Flat fills** | One solid token per shape; gradients were banned outright (§5.3 v1) | Every sheet is lit: a gentle falloff across its face, a bright rim on the lit edge, a darker cut wall on the other |
| 3 | **Too few depth planes** | 3 SVG layers (wall, desk, front) plus the figurine | 8–15 planes, every object built from several stacked sheets |
| 4 | **No atmospheric depth** | Far and near layers share saturation and value | Far layers drift toward the air colour and lose contrast |
| 5 | **The camera never moves through depth** | Pointer parallax ±4–10 px on a flat stage; nobody notices it | Layers sit at real depths, so any camera move shows real parallax |
| 6 | **The world stops after the hero** | From `#about` on, the page is flat cards on a beige page | The whole composition is the experience; there is no "plain page" part |
| 7 | **Byte budgets forced primitives** | 40 KB per layer and 30 KB for the mobile stage pushed shapes toward rectangles and a single stroke per edge | Rich, organic cut edges, stacked contours, real paper texture |
| 8 | **No frame** | The stage is a bordered rectangle | The shadow-box frame itself says "this is a physical object with depth" |

Conclusion: the v1 concept (office, desk, laptop, lamp, figurine) is right for the brand. The **material model, depth model, and page structure** are wrong. v2 keeps the identity and rebuilds those three.

### 1.1 Scoring Rubric v2 (weights sum to 10; maximum 100)

| Criterion | Weight | What a 10 means |
| --- | --- | --- |
| Brand fit | ×1.50 | Says "precise enterprise engineer who builds with care" (.NET/C#/SQL + fullstack) without a caption |
| Paper-craft authenticity | ×1.75 | Reads as real cut, layered, lit paper — never "flat vector with a texture" |
| Depth illusion & immersion | ×1.75 | Feels like a 3D world built from paper; the paper world is the main experience, not a header |
| Recruiter scan speed | ×1.25 | Name, role, stack, proof and CV reachable in < 5 s, in a linear scroll, on any device |
| Memorability | ×1.25 | A visitor can describe the site in one sentence a day later |
| Performance (LCP/INP/scroll) | ×1.00 | LCP ≤ 2.5 s on mid-range mobile 4G; smooth scroll on a mid-range laptop |
| Accessibility | ×0.75 | Fully usable by keyboard and screen reader, reduced-motion safe |
| Build risk / maintainability | ×0.75 | One developer (plus an agent) can build and maintain it on Vercel Hobby |

Baseline: v1.7 as built scores **66.0** on this rubric (row A below).

### 1.2 Round 1 — Six Directions

| # | Direction | Brand | Craft | Depth | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | **v1.7 polished in place** — richer hero art, sections unchanged | 8 | 5 | 3 | 9 | 5 | 9 | 9 | 9 | **66.0** |
| B | **Hero Shadow Box** — the hero becomes a deep framed diorama; sections stay flat sheets | 8 | 8 | 6 | 9 | 7 | 8 | 9 | 8 | **77.25** |
| C | **Office Walkthrough** — one fixed paper office behind the whole page; a scroll-driven camera travels from desk to shelf to cabinet while content scrolls over it | 9 | 9 | 10 | 6 | 10 | 5 | 6 | 4 | **79.25** |
| D | **Full WebGL paper world** — every object a textured plane in three.js, HTML overlaid | 8 | 9 | 10 | 5 | 9 | 3 | 4 | 3 | **71.0** |
| E | **Career Landscape** — a paper landscape like the mood reference; the career is a winding road, the office appears at the end | 5 | 9 | 9 | 6 | 8 | 6 | 7 | 6 | **72.25** |
| F | **Pop-up Book** — each section is a spread that pops up on a page turn | 6 | 9 | 8 | 4 | 9 | 6 | 4 | 4 | **67.0** |

**Critique.**
- **A** keeps every weakness from §1.0 except the art density. Rejected.
- **B** fixes the hero but leaves cause 6: below the fold the paper is still "just there".
- **C** has the strongest immersion, but text over a moving world hurts reading, one huge scene is a GPU cost on every scroll, every section depends on one global camera (fragile), and mobile gets a weak version.
- **D** fails performance, accessibility and maintainability; WebGL text and focus are poor.
- **E** is off-brief (the owner asked for an office) and a generic paper landscape is the most common AI-papercraft image. Its lessons (depth, atmosphere, stacked contours) are kept as material rules, not as a subject.
- **F** needs scroll hijacking. Rejected (§10.2).

### 1.3 Round 2 — Refinement & Hybrids

| # | Variant | Brand | Craft | Depth | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | C, with content sheets on a scrim over the fixed world | 9 | 9 | 10 | 7 | 10 | 5 | 7 | 5 | **82.0** |
| C2 | **Stations** — each section owns a framed shadow-box diorama of one corner of the office; the real content sits on paper sheets in front of it; depth unfolds per section on native scroll | 9 | 9 | 8 | 9 | 8 | 8 | 9 | 8 | **85.25** |
| C3 | C2 + **continuity and signature moves**: one office plan (stations share wall, floor line and light), the figurine appears at every station doing that section's job, the hero camera dollies into the room, each selected project is a mini shadow box that separates into depth on focus, the light-theme sun moves through a workday from station to station, and every station **unfolds into depth** as it enters | 10 | 10 | 9 | 9 | 10 | 7 | 9 | 7 | **91.0** |

C2 solves C's reading and GPU problems by giving each section its own bounded scene that only renders near the viewport. C3 restores C's "one world" feeling without one global camera.

### 1.4 Round 3 — Persona Stress Test of C3

| Persona | Failure found in C3 | Fix adopted into the rules |
| --- | --- | --- |
| Recruiter, phone, 4G, 30 seconds | Six rich scenes push the name and CV down and add HTML weight | The hero stays text-first on mobile (name, role, CTAs, CV in the first viewport; the shadow-box top edge peeks above the fold). The LCP is the `h1`. Station scenes below the fold use `content-visibility: auto` with a fixed aspect ratio (§9.6) |
| Engineering manager, desktop, 5 minutes | Stations turn into decoration; proof gets buried | Every station has a job: its objects are the controls (folder tabs = roles, project frames = case studies, binders = certificate categories). Purpose test (§3.3) applies to every object |
| Keyboard / screen-reader user | Depth reveals are hover-only; art could steal focus | Scene art is `aria-hidden`; the controls are real HTML in reading order; every depth reveal also runs on `:focus-visible` |
| Low-end laptop GPU | 6 scenes × 14 composited layers exhaust GPU memory | ≤ 14 composited layers per scene (≤ 8 on mobile), layer boxes cropped to their art, static neighbours merged, scenes outside the viewport skipped (§9.2) |
| Visitor with motion sensitivity | Unfold, dolly and pointer look add up | Reduced motion renders every scene in its final composed state; no scroll-linked or pointer-linked transforms (§10.2) |
| The maintainer | Hand-drawing six rich scenes with shadows, edges, rims and grain is too much work and drifts in quality | `paper-kit` generates the material (shadow, cut wall, light falloff, rim, grain, stacked contours) from simple authored shapes; scenes are data (§9.3) |

After the fixes: Perf 7 → 8, Risk 7 → 8. **Final score of C3′ = 92.75.** This is the approved concept: ***The Paper Studio***.

### 1.5 Asset Approach Decision

| Approach | Craft | Themeable (light/dark) | Authenticity | Verdict |
| --- | --- | --- | --- | --- |
| **Hand-authored SVG shapes + `paper-kit` procedural material** (shadow, cut wall, falloff, rim, grain, contours), tokenized fills | 9 | ✅ CSS variables | High (drawn for this site) | **Chosen for every scene, prop and frame** |
| **Paper texture tiles** (cardstock, kraft, cork, wood paper, felt): scanned real paper or procedurally generated | 10 | ✅ (blend modes) | High | **Chosen** for grain on every sheet |
| Photographed physical paper models made by the owner | 10 | ❌ | Highest | Allowed (optional), e.g. an About detail |
| Blender paper renders exported to WebP/AVIF | 10 | ❌ needs two renders | High | Allowed if they exist; not required |
| Full three.js scenes | 9 | ✅ | High | Only for the paper puppet (§9.4) |
| AI-generated images or AI image-to-3D meshes as final assets | — | — | Generic, off-model | **Forbidden** (§3). The v2 mood references are used for depth, shadow, framing and texture lessons only, never traced, never shipped |

### 1.6 What v2 takes from the mood references (and what it does not)

| Take | Do not take |
| --- | --- |
| 8–15 stacked planes; every object made of several sheets | The landscape subject (hills, forests, rivers, mountains) |
| Soft two-tier shadows whose length and blur grow with the gap between sheets | Teal-only monochrome palette |
| Far layers lighter and lower-contrast (light), darker and cooler (night) | Swirl-cloud borders as a frame ornament |
| Stacked contour edges (3–6 offset sheets) for rounded volumes | The glossy, mushy "AI papercraft render" finish |
| A visible frame with depth: the shadow box | Text that is part of a picture |
| Warm side light from a window; real paper grain; organic cut edges | |

---

## 2. Brand Identity & Art Direction

### 2.1 Concept: *The Paper Studio*

Rifqi is a **craft-minded Software Engineer (Enterprise .NET/C#/SQL & Fullstack Web)**. The site is **his office, cut, folded and layered from paper inside a deep shadow box**, built with the same precision he applies to enterprise systems. The visitor does not read a page with a picture on top; they **walk through the studio**. Each section is a **station**: one corner of the same office, seen through its own framed shadow box, with the real content laid in front of it on paper sheets.

- **One world:** every station shares the office plan (wall colour, floor line, skirting height, light), so scrolling feels like turning to the next corner of one room, not visiting six websites.
- **One character:** the paper figurine of Rifqi appears at every station, doing that section's job.
- **Real controls inside the world:** folder tabs, project frames, binders and the lamp are real HTML controls that sit exactly on their paper objects.
- **Editorial discipline:** an intentional, architectural paper studio. Never a SaaS landing page, neon HUD, glass dashboard, cartoon room, or generic paper landscape.

### 2.2 Stations (the visitor's walk through the studio)

| # | Section | Station | Scene, back → front | Figurine | Real content on |
| --- | --- | --- | --- | --- | --- |
| `01` | `#home` | **The Desk** — front view through the open shadow box | Jakarta skyline in 3 paper planes outside the window → window frame → wall, shelf with `.NET` `SQL` `C#` binders, pinboard → lamp → desk, laptop, notebook → figurine → mug, plant → chair back → frame lip | Seated on the notebook, near hand on the laptop (3D on capable desktops) | Hero text beside/above; live `LaptopScreenUI` on the glass; lamp = theme switch |
| `02` | `#about` | **The Pinboard** — cork board on the wall by the window | Wall → cork board (stacked edge) → pinned sheets at 2–3 depths → pins, one string-free cluster | Bust poster pinned as a "photo" card; full figure pinning a card at the board's edge | Dossier sheet + four index cards pinned to the board |
| `03` | `#experience` | **The Filing Cabinet** — top drawer pulled open, seen from slightly above | Wall → cabinet body → drawer walls → hanging folders (one per role, ordered by year) → drawer front with label holder | Leaning on the cabinet, holding a folder | Folder tabs (`Work` / `Organization` `tablist`); each folder = a ledger row |
| `04` | `#services` | **The Drafting Table** — angled board under the lamp | Wall → board (tilted plane) → blueprint sheet → ruler, set square, pencil → board edge | Drawing with a pencil | Capability board on the blueprint sheet |
| `04` | `#projects` | **The Shadow-Box Gallery** — wall of small framed shadow boxes | Wall → frames → inside each frame: backing, 3–5 domain sheets from that project's data, the paper laptop with the real screenshot | Hanging a frame | Each frame is a `ProjectCard`; focus or hover separates its layers (depth reveal); opens the case study |
| `05` | `#certificates` | **The Archive Shelf** — binders and boxes on a shelf | Wall → shelf back → binders (one per category, spine label + count from data) → shelf edge | Pulling a binder out | Each binder is a folio control; opening it pulls the binder forward and reveals the rows |
| `06` | `#contact` | **The Mail Tray** — desk corner by the window at the end of the day | Window at golden hour (light) / night (dark) → wall → desk corner → letter tray → envelope, letterpress card, stamp | Sealing an envelope | Letterpress card + correspondence-sheet form; postmark only after a real 2xx |
| — | Footer | **The back of the frame** — kraft backing board | Kraft board, hanging wire, a colophon label | — | Colophon strip |
| — | 404 | **The Empty Drawer** | Open drawer, nothing inside | Peering in | One line + link back to the desk |

Scenes are compositions of the shared prop set (§2.5). A station MUST NOT introduce a prop that has no compositional reason or no tie to Rifqi's data.

### 2.3 Light Story

Exactly **one light source per theme**. Every 2D shadow and 3D light follows it; `paper-kit` reads it from tokens (§5.6), never from hand-tuned offsets.

| Theme | Name | Source | Shadow direction | Station arc |
| --- | --- | --- | --- | --- |
| Light | **Workday** | Sun through the window, upper-left | Falls to bottom-right (`+x`, `+y`) | The sun moves through one workday as the visitor walks: `01` morning (cool-warm, medium shadows) → `02`–`04` midday (short, crisp shadows) → `05` afternoon → `06` golden hour (long, warm shadows). Set per station with `--light-len` and `--light-warmth` |
| Dark | **Lamp-On Night** | The desk lamp, upper-right | Falls to bottom-left (`−x`, `+y`) | Constant: night-blue windows, a warm pool under the lamp at every station (the lamp may be off-frame; its light still falls from the upper-right) |

Theme switch: clicking the lamp (or the navbar toggle) runs a View Transition that reveals the new theme as a circle growing from the lamp bulb (§10.2).

### 2.4 Paper Material System (the core of the look)

Every sheet in every scene is rendered by `paper-kit` (§9.3) as five parts. Hand-drawn shortcuts that skip a part are defects.

| Part | What it is | Rule |
| --- | --- | --- |
| **1. Cast shadow** | The sheet's silhouette falling onto whatever is behind it | Two tiers: a **contact** shadow (tight, darker) and a **penumbra** (wide, soft). Offset = `gap × 0.035 × light vector × --light-len`; blur σ = `2 + gap × 0.03` (quantised to 4 steps per scene so filters are shared); opacity 0.18–0.32 (light) / 0.35–0.5 (dark). `gap` is the depth distance to the surface behind, in scene units |
| **2. Cut wall** | The paper's thickness, visible on the side away from the light | 1.5–4 px offset copy in the material's `edge` tone (darker, same hue) |
| **3. Face** | The sheet's surface | Token fill + a **light falloff**: same hue, ±4–10 % lightness, oriented from the light. Never a second hue |
| **4. Rim** | The lit cut edge | 1–1.5 px `--paper-cut` stroke on the light-facing edges only |
| **5. Grain** | The paper fibre | A texture tile for the material (cardstock, kraft, cork, wood paper, felt) at 6–12 % opacity, clipped to the face |

Additional material rules:
- **Stacked contours:** rounded volumes (cushions, leaves, cable coils, hair, the cork board edge) are built from 3–6 concentric sheets offset 3–8 px, each with its own cut wall and rim, like the mood references.
- **Cut irregularity:** organic objects get a deterministic cut jitter (≤ 0.6 px) and 1–3 px corner radii. Manufactured objects (laptop, frames, cabinet) keep straight edges but still get cut wall, rim and grain.
- **Atmospheric depth:** a layer's colours mix toward `--air` by depth band: Far 25–40 %, Back 10–20 %, Mid 0–5 %, Front 0 %. Night mixes toward `--air-night`. Contrast drops with distance; saturation peaks in front.
- **Scale cue:** small repeated details (key rows, binder rings, folder tab edges, pins) only appear on Mid and Front layers.

### 2.5 Depth Plan & Compositional Restraint

Each station places its layers in five **depth bands** (scene units; the camera perspective is `1400`, §9.2):

| Band | `z` range | Typical content |
| --- | --- | --- |
| Far | −900 … −450 | Sky, skyline, outside the window |
| Back | −450 … −150 | Wall, window frame, shelf, pinboard, cabinet body |
| Mid | −150 … +60 | Desk, laptop, lamp, figurine, the station's main object |
| Front | +60 … +220 | Foreground props (mug, plant, chair back, ruler) |
| Frame | +220 … +280 | The shadow-box frame lip |

- **8–14 layers per scene**, at most ~25 objects. More is clutter; fewer is flat.
- The shared prop set: window (+ skyline, beam / moon), shelf, binders, pinboard, cabinet, drafting board, desk, laptop, lamp, mug, plant, notebook, chair, letter tray, envelope, frames. A new prop needs a compositional reason and a tie to Rifqi's real work (Purpose and Swap tests, §3.3).
- No real brand logos on props (laptop lid, mug, sneakers): plain paper only.
- Text inside art only where it comes from data (binder spines, drawer labels) and is duplicated in the HTML; never decorative fake text.

### 2.6 Material & Readability Constraints

- **Matte paper only:** 2D sheets and 3D meshes share the paper rules: roughness `0.82–0.95`, metalness `0.0–0.05`, grain, visible cut walls and rims.
- **Forbidden materials:** glossy plastic, chrome, glass/`backdrop-blur`, neon glow, photoreal skin shaders, random glossy 3D toys.
- **Readability first:** body text and controls sit on clean content sheets (`bg-raised`), placed in front of the scene, never on busy art. A sheet over a scene casts a real paper shadow onto it (§5.4).
- **Never obstructive:** no splash screen, no forced intro, no gated content. The page is fully usable without WebGL, without scroll-driven animation support, and with JS slow or off.

### 2.7 Character Specification — Rifqi Paper Figurine

Derived from the owner's turnaround reference (front, ¾, side, back, ¾-back, plus head close-ups).

| Feature | Reference | Paper translation |
| --- | --- | --- |
| Build & pose | Average athletic build, relaxed standing pose, arms down | ~4.5 heads tall paper puppet (flat cut-out sheets on joints, `figurine-parts.ts`); hero pose seated on the notebook, near hand on the laptop |
| Hair | Black tight curls on top, low taper fade on sides and back | **Quilled paper curls** (coiled paper strips) on top; short flat-cut paper planes for the fade |
| Face | Warm light-brown skin, dark almond eyes, straight brows, calm slight smile | Flat-shaded planes; eyes as small dark almond cut-outs, brows as thin paper strips, mouth as a single subtle fold. No realistic skin, no open mouth, no teeth |
| Top | Fitted black crew-neck t-shirt | Charcoal cardstock (`--ill-shirt`), never pure black |
| Bottom | Medium-blue faded straight-fit denim | Two-tone denim paper (`--ill-denim` + `--ill-denim-fade` on thighs and knees) |
| Shoes | Grey running sneakers, white midsole | Grey paper upper + off-white sole. **No brand marks** |

Rules:

- One character identity everywhere, drawn from one set of parts (`figurine-parts.ts`): Hero (3D sheets or poster), every station pose (§2.2), About bust, EQbot avatar (head crop with expression parts), 404.
- Station poses (`pin`, `folder`, `draw`, `hang`, `binder`, `seal`, `peer`) are static server-rendered posters with the full paper material (§2.4). Only the hero figure is animated (3D clips).
- Never photoreal, never uncanny. Flat paper sheets with real thickness.
- Non-blocking: no cursor-chasing, no walking across text, no gating navigation. Motion is limited to the clips in §10.2, all on demand: one wave per session, look at the laptop, a glance at the lamp on theme change, a thinking pose while EQbot is open, and a 120 ms blink every 4–7 s only while the stage is on screen.
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
| Paper-craft clichés | Generic paper landscapes unrelated to Rifqi (mountains, pine forests, swirl clouds, hot-air balloons, winding rivers); swirl-cloud frames; teal-only monochrome; the "AI papercraft render" finish (plastic sheen, mushy fibre, melted details, nonsense text); isometric office asset packs; stock paper-cut vectors; random rotations to look "handmade" |
| Fake depth | Large blurred `box-shadow` on UI cards as decoration; shadows that ignore the light model; parallax on text; depth without a light-consistent cast shadow; full-stage transparent layers stacked to fake depth |
| Template motion | Preloader counters; cursor-follower blobs, custom cursors, magnetic buttons; split-text letter reveals; scroll-snap sections; horizontal scroll-jacked galleries; marquee text |
| Icons | Mixing icon libraries; emoji as icons; filled + outlined icons mixed |

### 3.3 Authenticity Tests (every new component and scene MUST pass all seven)

1. **Swap test** — If the name were replaced with another developer's, would the component still make sense unchanged? Then it is generic: tie it to Rifqi's real data, stack, or desk.
2. **Material test** — Can you point to the paper property it shows (cut edge, fold, layer offset, grain, tape)? If not, it is "flat UI".
3. **Light test** — Do its shadows follow `--light-x` for the current theme?
4. **Fact test** — Is every number, company, link, and claim traceable to `src/data/portfolio.ts`? Nothing invented.
5. **Purpose test** — Remove it. If nothing is lost for the visitor, delete it.
6. **Depth test** — Can you name every layer's depth band (§2.5), and does its cast shadow grow with its gap and follow the light? If not, it is a sticker, not paper.
7. **Station test** — Does the scene's subject come from Rifqi's real work, data or office (§2.2)? A pretty object with no tie to him fails, however good it looks.

### 3.4 Copy Voice

- Plain, specific, first person. Name systems, industries, and stacks (".NET 8 Web API for a telecom tower inventory" beats "scalable solutions").
- Short sentences. No hype adjectives. No exclamation marks in UI.
- EN and ID written as equals; ID is never a machine translation left unreviewed.

---

## 4. Section-by-Section UX Blueprint & Visitor Journey

Render order, `data/sections.ts` order, and StudioRail order MUST match exactly:
`01 #home` → `02 #about` → `03 #experience` → `04 #services` (+ `#projects`) → `05 #certificates` → `06 #contact`.

### 4.1 Journey at a Glance

| Time | Visitor sees | Depth moment | Visitor does |
| --- | --- | --- | --- |
| 0–2 s | Name, role, value proposition, CTAs; the Desk station in its shadow box, morning light | The figurine waves once; pointer look on desktop | Decides to stay |
| 2–5 s | Metrics (`5`, `100+`, `3+`, `30+`), current role on the laptop glass | — | **View projects**, **Download CV**, or scrolls |
| 5–20 s | The camera dollies toward the desk; the Pinboard unfolds, the dossier sheet slides over the desk | Unfold into depth (§10.2) | Reads bio, education, industries |
| 20–60 s | Filing cabinet → drafting table → shadow-box gallery, midday light | A folder lifts; a project frame separates into depth on focus | Opens a role, opens a case study |
| 60 s+ | Archive shelf → mail tray at golden hour | A binder pulls forward; the postmark lands after a real send | Sends a message or copies the email |

### 4.2 Station Anatomy (every section follows it)

1. **Station scene** — a `ShadowBox` (frame + `PaperScene`, §9.2) built from the station's layer list. Desktop: full container width, aspect `16 / 9`, or a side column next to the content where the section says so. Mobile: the same layers through the station's mobile frame (art-directed crop, §9.1).
2. **Content sheets** — real HTML on `bg-raised` paper in front of the scene (`--z-content-ui`), overlapping the scene's lower edge by 48–96 px on desktop so they cast a paper shadow onto it. They hold every fact; the scene repeats nothing a visitor needs.
3. **Station controls** — where the section has interactive items, the controls are anchored to their paper objects (folder tabs on folders, frames, binders). Each is a real `button`/`a` in reading order.
4. **Entry** — the scene unfolds into depth as it enters (§10.2). The content sheets are visible in SSR HTML and never wait for it.

### 4.3 Section Specifications

#### `01` `#home` — The Desk

- **Layout (≥ 1280 px):** 5/7 grid; below 1280 px the text sits above a full-width shadow box, so the laptop glass stays wide enough for the screen UI. Left: eyebrow `01 — Software Engineer`, `h1` name in Fraunces, a **static** role line (current title from `workExperience[0]`) with one blinking caret, a value proposition ≤ 2 lines, 4 cut-out metric tickets, CTAs `View projects` (ink fill) and `Download CV` (outline, rendered only if the CV file exists). Right: the Desk station (16/10 inside its frame).
- **Scene:** §2.2 row `01`, 12–14 layers. Outside the window: three paper planes of a Jakarta skyline (Far band), lighter with distance.
- **Laptop screen (`LaptopScreenUI`):** a small window titled `rifqi.profile`: availability line (only if `contactInfo.availability` is set), current role and company, core stack tags (`focus: 'core'`), buttons `Open projects` and `Ask EQbot`. Real HTML, ≥ 13 px body / ≥ 11 px mono, keyboard focusable, bilingual. The company line hides when the glass is under 300 px wide (container query). `Ask EQbot` dispatches `paperdesk:eqbot-open`.
- **Lamp:** `<button aria-pressed={isDark}>` over the lamp art; same action as the navbar toggle (`useThemeToggle()`), with the lamp View Transition (§10.2).
- **Figurine:** the poster renders first; the 3D puppet swaps in after idle on capable desktops (§9.4). Hovering or focusing the laptop makes the figure look at it.
- **First paint:** the hero is in the server HTML, never part of a reveal. The `h1` is the LCP.
- **Exit:** at ≥ 1280 px wide and ≥ 800 px tall `#home` is `position: sticky; top: 0`; while the About sheet slides over it, the Desk camera dollies forward (`z` +160) and the Front band drops away. No pinning beyond sticky.
- **Mobile:** text first (eyebrow, name, role, value, CTAs, metrics). The shadow box follows through its portrait frame (laptop, figurine, lamp, window), its top edge visible in the first viewport at 390 × 844. The laptop screen renders as the compact paper laptop card directly below the shadow box.

#### `02` `#about` — The Pinboard

- **Entry:** the dossier sheet arrives over the hero with a lifted top edge; the Pinboard station unfolds behind it.
- **Scene:** cork board with stacked-contour edge on the wall by the window; the bust poster pinned as a photo card; the figure pinning a card at the board's right edge.
- **Content:** bio on a `bg-raised` dossier sheet with one fold crease; the 4 `aboutHighlights` as die-cut index cards **pinned** to the board at slightly different depths (Mid band, ±1.5° rotation, each with a pin and a real paper shadow). Equal row heights; hover/focus lifts a card 12 px in `z`.
- **Mobile:** single column; the board shows in portrait frame above the dossier; cards stack.

#### `03` `#experience` — The Filing Cabinet

- **Scene:** the top drawer pulled open; hanging folders ordered by year, the newest in front.
- **Tabs:** two die-cut folder tabs, `Work` and `Organization`, as an ARIA `tablist` (arrow keys move, `Enter`/`Space` select). Switching swaps the drawer's folder set.
- **Rows:** each role is a `Folio` (`<details>`): company, role, period, location, stamped index. Opening one lifts its folder in the scene (`z` +24, shadow grows) and unfolds the detail panel: role, period (`calculateTotalExperience` where relevant), impact bullets, stack tags. Rows above never jump.
- **Logos:** company logos from `public/assets/` with descriptive `alt`, printed on the folder tab like a label.

#### `04` `#services` — The Drafting Table

- **Scene:** an angled drafting board under the lamp with a blueprint sheet, ruler, set square and pencil; the figure drawing.
- **Content:** the capability board on the blueprint sheet: core `developerSkills` grouped Backend, Data, Frontend, Tooling; blueprint grid ≤ 8 % alpha; crop marks. Secondary skills open in `AdditionalSkillsDialog`.

#### `04` `#projects` — The Shadow-Box Gallery

- **Scene:** a wall of small frames. Each selected project is a **`ProjectShadowBox`**: a frame with 4–6 layers inside: backing sheet, 2–4 domain sheets chosen from the project's data (`project.motif`, e.g. a tower lattice for a tower-inventory system, ledger sheets for finance), and the paper laptop holding the real screenshot with one tape strip. Below the frame: title (`h3`, Fraunces), one-line summary, 3–4 stack tags in mono.
- **Depth reveal:** on hover or `:focus-visible` the frame's inner layers separate (`z` × 1.6) and their shadows lengthen in 240 ms. Whole frame is one stretched link (one tab stop).
- **Case study (`ProjectDetailDialog`):** native `<dialog>` styled as a folded sheet: **Problem → My role → Approach → Stack → Outcome → Slides → Links** (live/repo only if real). Missing sections are omitted, never filled.
- **Archive (`04b`):** `View all projects` opens the archive drawer dialog: folder-tab filters (`All`, `Individual`, `Group`, `Design`), labelled search, live result count, the same `ProjectShadowBox` at a smaller size (depth reveal kept, 3 inner layers).

#### `05` `#certificates` — The Archive Shelf

- **Scene:** a shelf of binders, one per `certificateCategories` entry (`Dicoding`, `Kegiatan`, `Organisasi`, `Magang`), spine label and count from data.
- **Content:** each binder is a `Folio`; opening it pulls the binder forward in the scene (`z` +40, slight tilt out) and reveals the rows: name, issuer, year, `Open` link to the verified file (`target="_blank" rel="noopener noreferrer"`), optional 64 px thumbnail.

#### `06` `#contact` — The Mail Tray

- **Scene:** desk corner by the window at golden hour (light theme, longest warm shadows) or night (dark), letter tray, envelope, stamp; the figure sealing an envelope.
- **Left:** letterpress business card (debossed name). Email with a copy button that announces "Copied", LinkedIn, GitHub, WhatsApp, Jakarta.
- **Right:** correspondence-sheet form: name, email, message, hidden honeypot. Labels always visible; inline errors after blur and submit.
- **Delivery states:** idle → sending (`aria-busy`) → **sent** (the postmark stamp lands on the envelope in the scene and on the sheet, only after a real 2xx) or **failed** (oxide error, retry, direct email). Never a fake success.

#### Footer — The Back of the Frame

Kraft backing board strip (`bg-ink` content area for contrast) with a hanging wire drawn at the top edge. Name, short section links, language and theme toggles, copyright year from `new Date()` at build time, a "Built with" line naming the real stack.

#### StudioRail & EQbot

- **StudioRail (≥ 1440 px):** vertical paper index `01`–`06` with station names on hover/focus and a hairline progress rule (`IntersectionObserver`, no scroll listeners). Each index is a link.
- **EQbotCompanion:** bottom-right launcher with the figurine head crop. Opens a paper dialogue sheet driven by `eqbot-script.ts`: bilingual, scripted, factual, no AI model.

#### 404 — The Empty Drawer

The filing-cabinet drawer, open and empty, with the figure peering in; one line of copy; a link back to the desk.

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
| Scene set (`--ill-wall`, `--ill-frame`, `--ill-mat`, `--ill-laptop*`, `--ill-bezel`, `--ill-screen`, `--ill-lamp`, `--ill-bulb`, `--ill-mug`, `--ill-coffee`, `--ill-pot*`, `--ill-leaf*`, `--ill-note`, `--ill-notebook`, `--ill-page`, `--ill-beam`, `--ill-hair-hi`) | see `tokens.css` | see `tokens.css` | Hero scene pieces only |

**Paper depth for SVG pieces** (also in `tokens.css`): from R1, scene sheets get their shadow, cut wall, falloff, rim and grain from `paper-kit` (§2.4, §9.3). The v1 `--paper-drop` / `--paper-drop-sm` hard offset filters remain only for small UI art (404 drawer, icons) until R2 replaces them; `--paper-cut` is the pale cut-edge stroke; `--paper-fold` is the shaded facet. Facets that must face away from the light sit in a group with `transform: scaleX(var(--light-x))`, so they mirror when the theme changes. `--beam-opacity`, `--night-opacity`, and `--glow-opacity` switch day and night scene parts.

### 5.3 Color Rules

- No `#000` / `#FFF` as surfaces.
- Dark mode switches variables inside `.dark` only. **No `dark:` utility classes**, except visibility swaps between a light and a dark asset (`dark:hidden`, `dark:block`, `dark:inline`, `dark:inline-block`), such as logo files and the hero window/lamp layers.
- There is no role-based theming. `RoleContext` was removed in Phase 1 because nothing set a role and every role mapped to the same palette.
- Sage and oxide states are reserved for real form outcomes and status, never decoration.
- **Gradients:** forbidden in UI (backgrounds, buttons, text, cards). Allowed only inside scene art: (a) hard-stop two-colour fold creases, (b) `paper-kit` light falloff on a sheet's face (one hue, ±4–10 % lightness), (c) the lamp's light cone and pool, (d) blur in cast shadows. Never a second hue, never decorative.
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
| `--paper-grain` | Inline SVG `feTurbulence` data URI, opacity `0.025–0.04` | Page ground only, **once** on `body::before`. Scene sheets use `paper-kit` texture grain instead |
| `--sheet-shadow` | contact `calc(2px * var(--light-x)) 2px 3px rgb(var(--rgb-shadow) / 0.22)` + penumbra `calc(12px * var(--light-x)) 18px 32px rgb(var(--rgb-shadow) / 0.12)` | Content sheets that lie over a scene (§4.2): a real paper shadow onto the art behind |

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

Inside a `ShadowBox`, layers are ordered by depth (DOM order from far to near, each with its `--k`, §9.2), not z-index; the whole scene sits in `--z-scene-*` and content sheets in `--z-content-ui`.

### 5.6 Depth & Light Tokens (added in R1)

| Token | Light — Workday | Dark — Lamp-On Night | Use |
| --- | --- | --- | --- |
| `--light-x` | `1` | `-1` | Horizontal light direction for every shadow, rim and fold |
| `--light-len` | per station: `01` 1.0, `02`–`04` 0.7, `05` 1.1, `06` 1.6 | `1.0` everywhere | Cast-shadow length factor (workday arc, §2.3) |
| `--light-warmth` | per station: `01` 0.2 → `06` 1.0 | `0.8` | Mix of `--ill-sun` into lit faces and rims |
| `--air` / `--air-night` | wall-paper tone | deep night blue | Atmospheric mix target by depth band (§2.4) |
| `--rgb-shadow` | warm brown-black | blue-black | Cast shadows (never pure black) |
| `--persp` | `1400` scene units | same | Camera perspective (§9.2) |
| `--band-far` … `--band-frame` | §2.5 ranges | same | Depth bands for layer placement |

Exact values are set in `tokens.css` during R1 and verified for contrast; this table fixes the names and roles.

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
| `PaperSheet` | `.paper-sheet` + `.fold-tr` (`styles/paper.css`) | `div`/`article` | — | `bg-raised`, `--paper-edge-cut`, at most one fold per sheet. Never put `.fold-tr` on a `<dialog>` (it overrides `position: fixed`); fold the dialog's inner sheet |
| `PaperCard` | `.paper-card` + `.stretched` (`ProjectShelf.tsx`) | `article` with one inner link/button | rest, hover (edge → accent, `translateY(-2px)`), focus-visible | Whole card clickable via stretched link, one tab stop. Projects move to `ProjectShadowBox` in R2 |
| `PaperButton` | `.btn-primary-custom` / `.btn-outline-custom` | `button` / `a` | primary (ink fill), secondary (outline), quiet (text), disabled, busy | Min 44×44 px, `rounded-[2px]` |
| `FolderTabs` | `ui/FolderTabs.tsx` | ARIA `tablist` | active (raised, connects to panel), inactive (recess) | Arrow-key roving focus; panel id `${idBase}-panel-${tab}` |
| `TabbedPanels` | `ui/TabbedPanels.tsx` | `FolderTabs` + `tabpanel`s | — | Client leaf over **server-rendered** panels; inactive panels stay in the HTML with `hidden` |
| `T` | `ui/T.tsx` | inline | — | Bilingual text in Server Components (§13) |
| `PaperDialog` | `ui/PaperDialog.tsx` | native `<dialog>` | open, closing | `showModal()`, `Escape` closes, focus restored to the trigger, `::backdrop` = ink at 40% |
| `Stamp` | `.stamp`, `.postmark` | `span` | — | Stamped index / postmark |
| `Tag` | `ui/Tag.tsx` | `li` | — | Mono 12 px, `border-line`, square |
| `SectionTitle` | `ui/SectionTitle.tsx` | `header` with `h2` | — | Eyebrow + title + optional lede |
| `Field` | inside `sections/ContactForm.tsx` | `label` + `input`/`textarea` | rest, focus, invalid, disabled | Error text linked via `aria-describedby`; first invalid field takes focus |
| `Folio` | `.folio` on `<details>` | `details`/`summary` | closed, open | Ledger rows and certificate folders: native expanded state, no JS |
| `ShadowBox` | `scenes/ShadowBox.tsx` | `div` (`aria-hidden` art + HTML slots) | static, looking (`.is-looking`), unfolding, dolly | Client leaf: size container (`container-type: inline-size`) and pointer look; hosts one `PaperScene`; `after` slot renders over the frame on desktop and below it on mobile (laptop screen card). `content-visibility: auto` lands in R4 |
| `PaperScene` / `SceneLayer` | `scenes/PaperScene.tsx` | `div` tree (§9.2) | at rest (= fallback), looking, scroll push | Viewport, frame and 8–14 layers at depth `k`; `frameVars`, `depthFactor`; layer art from `paper-kit`; Server Component |
| `DeskStation` | `scenes/desk/DeskStation.tsx` | `ShadowBox` + `PaperScene` | — | The Desk (§4.3 `01`): 14 layers, landscape mobile crop, `DeskLamp` and `FigurineSlot` at z = 0, `LaptopScreenUI` in `after` |
| `ProjectShadowBox` | `scenes/ProjectShadowBox.tsx` | `article` with one stretched link | rest, depth reveal (hover/focus) | Replaces the flat `PaperCard` for projects (§4.3); motif layers from `project.motif` |
| `StationFigure` | `scenes/StationFigure.tsx` | inline `svg` | — | `RifqiFigurine` in a station pose with `paper-kit` shadow |
| `LaptopScreenUI` | `scene/LaptopScreenUI.tsx` | `section aria-label` | — | Client leaf; positioned by `--screen-*` |
| `DeskLamp` | `scene/DeskLamp.tsx` | `button` | on / off | Transparent theme switch over the Desk's `lamp` layer (art in the layer, hit area at z = 0) |
| `FigurineSlot` | `scene/FigurineSlot.tsx` | `div role="img"` | poster, 3D, failed | Poster first, then the capability-gated canvas fades in over it |
| `PaperDeskCanvas` | `scene/PaperDeskCanvas.tsx` | R3F `<Canvas>` | loading, ready, failed | Dynamic, `ssr: false`; model in `scene/figurine-model.tsx` |
| `RifqiFigurine` | `scene/RifqiFigurine.tsx` | inline `svg` | — | The poster and fallback, same framing as the canvas |

`lucide-react` is the only icon library (stroke width `1.5`). Brand glyphs (GitHub, LinkedIn, WhatsApp) are local SVG components in `src/components/icons/`, sourced from Simple Icons (CC0).

---

## 8. Responsive Rules

| Breakpoint | Strategy |
| --- | --- |
| **Desktop ≥ 1024 px** | Every station at full depth (≤ 14 layers), unfold, camera dolly, pointer look (fine pointer), hero push-in with sticky slide-over (≥ 1280 px wide and ≥ 800 px tall), R3F puppet if the capability gate passes, StudioRail at ≥ 1440 px, content sheets beside or over the scene |
| **Tablet 768–1023 px** | Every station at full depth, unfold and dolly on scroll; no pointer look, no sticky, poster figurine; content sheets below the scene, overlapping its lower edge |
| **Mobile < 768 px** | Hero text first (name, role, value, CTAs, metrics, CV in the first viewport; the shadow box's top edge visible). Every station renders through its **mobile frame** (an art-directed crop of the same layers, portrait where the station allows it, ≤ 8 composited layers after merges), unfold and dolly on scroll (compositor only); **no WebGL**, no pointer look, no horizontal overflow, touch targets ≥ 44 px, no forced `min-h-screen` |
| **Reduced motion / no scroll-driven support / no 3D transforms** | The final composed state of every scene, flat-projected exactly as authored; all content and controls unchanged |

One component per section, made responsive with Tailwind breakpoints. **No separate `mobile/*` component tree and no `if (!mounted)` blank render.** Device-only behavior (parallax, R3F) is decided in CSS media queries or inside client leaves after mount, never by swapping the whole layout.

---

## 9. Hybrid 2D + 3D Rendering Architecture

**Hybrid means:** many 2D paper layers placed at real depths and projected through one analytic camera (every station, no WebGL needed), plus one WebGL paper puppet (the hero figure on capable desktops). The illusion of a 3D world comes from depth, light and camera movement over 2D sheets, not from meshes.

### 9.1 Scene Coordinates

- Every station is authored in a **1600 × 1000 world** (scene units). Each station declares two frames into that world: `desktop` (default `0 0 1600 1000`) and `mobile` (a crop rect art-directed per station; it need not be portrait — the Desk uses the landscape crop `150 60 1350 940` so the laptop stays legible, and the screen card follows below the box). Each layer's `viewBox` is its own cropped box in world units.
- HTML that sits on paper objects (laptop screen, lamp button, folder tabs, frames, binders) is positioned with `frameVars(rect, frames)` (`scenes/PaperScene.tsx`): `--l/--t/--w/--h` in % of the desktop frame and `--lm/--tm/--wm/--hm` for the mobile frame, so HTML and art never drift. Rects live next to the station's layer list (`scene/stage-geometry.ts` for the Desk).
- The camera distance is `P = 1400` scene units. `ShadowBox` is the size container (`container-type: inline-size`), so camera shifts are written in `cqw` and depth reads the same at every width.
- Layers are inline SVG (tokenized fills) rendered by Server Components. Scene art is `aria-hidden="true"` and `focusable="false"` (`check:design` enforces it).

### 9.2 `PaperScene` — the analytic camera

```
ShadowBox (client leaf: pointer look; container-type: inline-size)
└─ .scene-viewport   aspect-ratio from the active frame; overflow: clip; wall colour; outer shadow
   ├─ .scene-layer × 8–14   data-band, --k; placed by frameVars; box = layer's art bounds
   ├─ .shadowbox-frame      the frame's cut wall, rim and inner shadow (above the art)
   └─ HTML at z = 0          lamp button, figurine slot … (screen card via ShadowBox `after`)
```

- **Why not `preserve-3d`:** a CSS 3D context flattens under `overflow`, `filter` and `opacity`, forces scale compensation on every layer and makes the flat fallback an approximation. The projection is solved per layer instead: a camera shift `s` moves a layer at depth `z` by `k · s` with `k = z / (P − z)` (`depthFactor`, P = 1400). The `z = 0` plane (laptop, its HTML screen, the lamp button) never moves; far layers move with the camera, near layers against it. Same picture as a perspective camera, using only `translate`/`transform` on flat layers, and the resting state *is* the authored composition.
- **Compositor only:** animate `transform`, `translate` and `opacity`. Keyframes MAY reference static per-layer custom properties (`var(--k)`). **Never animate registered custom properties** (`@property`) or `filter`; they run on the main thread (`check:design` flags `@property`).
- **Layer budget (GPU memory):** ≤ 14 layers per station on desktop, ≤ 8 composited on mobile (layers outside the mobile crop are `desktopOnly`). Each layer's box is cropped to its art bounds (no full-stage transparent layers). Adjacent layers that never separate are merged into one. `will-change` is set only under a state class (`.is-looking`, toggled by `useParallaxStage` while the pointer moves), never statically (`check:design` enforces ≤ 14 layers, a band per layer and no static `will-change`).
- **Off-screen:** each `ShadowBox` has `content-visibility: auto` with `contain-intrinsic-size` from its aspect ratio (scene containers only, never sections, §15). Scenes far from the viewport are not painted or composited.
- **Shadows and filters are baked:** cast shadows are SVG blur filters inside the layer (rasterized once with the layer). Layer content never changes during camera motion. Light changes (theme, station arc) swap tokens, which repaints once.
- **Pointer look (desktop, fine pointer):** `useParallaxStage` writes `--px`/`--py` on the scene inside one `requestAnimationFrame`; each layer's `translate` is `calc(var(--px) * var(--k) * -9cqw) calc(var(--py) * var(--k) * -5cqw)`. Depth does the rest. No React state in pointer or scroll handlers.
- **Scroll dolly and unfold:** CSS scroll-driven animations (`animation-timeline: view()` on each station; `scroll(root)` for the sticky hero), inside `@supports (animation-timeline: view())`. Without support, scenes render in their final composed state. No JS scroll listeners.
- **Fallbacks:** `prefers-reduced-motion: reduce`, no fine pointer, or no scroll-driven support → every layer stays at `translate: 0`, which is exactly the authored 2D composition. The scene never depends on JS to render.

### 9.3 `paper-kit` — procedural paper material (server-only)

`src/lib/paper-kit/` turns authored shapes into finished paper. It runs in Server Components at build/render time and never ships to the client.

| Function | Input | Output |
| --- | --- | --- |
| `sheet({ d, material, z, gap, seed })` | Path, material id, depth, distance to the surface behind | `<g>` with the five parts of §2.4: contact + penumbra shadow, cut wall, face with light falloff, rim, grain |
| `stack({ d, layers, step, material })` | Path, 3–6 contours, offset step | Stacked-contour volume |
| `cut(d, { jitter, radius, seed })` | Path | Deterministic organic cut edge |
| `air(color, band)` | Token, depth band | `color-mix()` toward `--air` (§2.4) |
| `defs(scene)` | Scene | Shared `<defs>`: 4 quantised blur filters, falloff gradients, grain patterns |

- **Deterministic:** seeded randomness only; identical output on server and client, so no hydration mismatch.
- **Materials** (`materials.ts`): `cardstock`, `kraft`, `cork`, `wood`, `felt`, `screen`, each with `fill`, `edge`, `falloff`, `grain` (texture tile), `grainOpacity`, mapped to tokens.
- **Light** comes from tokens (`--light-x`, `--light-len`, `--light-warmth`); a station overrides them on its container for the workday arc (§2.3).
- Station scenes are **data**: `src/components/scenes/<station>/layers.tsx` exports the layer list (band, `z`, art built with `paper-kit`) and the frames and HTML rects.

### 9.4 React Three Fiber Guardrails (the hero paper puppet)

- `PaperDeskCanvas.tsx` (`"use client"`) loads via `next/dynamic(() => import(…), { ssr: false })` from `FigurineSlot`, which keeps the `RifqiFigurine` poster underneath until the first frame is drawn.
- **Capability gate** (`hooks/useCapabilityGate.ts`), after hydration inside `requestIdleCallback`: width ≥ 1024, `(pointer: fine)`, not reduced motion, no `saveData`, `deviceMemory ≥ 4` and `hardwareConcurrency ≥ 4` when exposed, WebGL2. Otherwise the poster stays. `?webgl=off` forces the poster.
- `dpr={[1, 1.5]}`, `frameloop="demand"`, `flat`, `gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}`, orthographic camera fitted to `STAGE_FRAME` (280 × 400 poster units), the poster's `crop="stage"` viewBox, placed as the figurine layer of the Desk scene.
- Nothing renders while idle: frames only on theme change, resize, or while a clip runs (`figurine-clips.ts`). The blink runs only while the canvas intersects the viewport and the tab is visible. `e2e/figurine.spec.ts` asserts zero draw calls while idle.
- Unlit `MeshBasicMaterial` in token colours so the front view equals the poster; fold planes cross-faded by `--light-x`; cut edges in `--paper-cut`; `--figure-rim` at night. Tokens re-read on every theme change (`#rrggbbaa` aware).
- **Model:** `figurine-mesh.ts` extrudes each cut part of `figurine-parts.ts` into a 1.6-unit sheet; `figurine-rig.ts` poses the joints (`S · M · S` to Y-up). `e2e/figurine.spec.ts` keeps the 3D front view within 2 % of the poster's pixels.
- The poster and the 3D canvas receive the paper-kit cast shadow of the Desk scene (the shadow is part of the layer behind, so it is identical for both).
- Error boundary + `webglcontextlost`: on failure the canvas unmounts and the poster stays, same framing, zero layout shift. three.js is a lazy chunk, never in first-load JS.

### 9.5 Asset Production Pipeline

| Asset | Tool | Output | Notes |
| --- | --- | --- | --- |
| Station scenes | Shapes authored by hand (Figma/Inkscape or directly as paths) + `paper-kit` material | Server-rendered inline SVG per layer | SVGO on authored paths (`multipass`, keep `viewBox`); fills are tokens |
| Paper textures | Scans of real paper, or procedural generation (`sharp`, seeded noise) | `public/assets/papercraft/tex-<material>.webp` (+ `.avif`), seamless tiles | One tile per material, reused by every scene |
| Figurine (all poses) | `figurine-parts.ts` → `RifqiFigurine` (poster) / `figurine-mesh.ts` (3D) | Inline SVG / runtime mesh | No download for the 3D model |
| Project motifs | Authored per project in data (`project.motif`) → `ProjectShadowBox` | Inline SVG | Tied to the project's real domain |
| Project screenshots | Real captures | `.webp`/`.avif`, explicit width/height | Lazy below the fold |
| Optional owner photos of physical paper models | Camera | `.webp`/`.avif` | Optional, never required |

### 9.6 Delivery Rules (replaces the v1 asset byte budgets)

The v1 per-asset byte caps (40 KB per SVG layer, 30 KB mobile stage, 12 KB fibre, 120 KB raster layer, triangle caps) are **removed for paper-craft 2D and 3D art and textures**: they pushed the art toward primitives (§1.0, cause 7). Quality of the paper world wins; the visitor experience is protected by gates on what the visitor feels, not by file sizes:

| Gate | Limit | Enforced by |
| --- | --- | --- |
| LCP (mobile 4G, mid-range) | ≤ 2.5 s | Hero text first in HTML; `h1` is the LCP; Lighthouse + trace |
| CLS | ≤ 0.1 | Fixed aspect ratio on every `ShadowBox`, canvas, poster, image |
| INP | ≤ 200 ms | No state in pointer/scroll loops; native dialogs |
| Scroll smoothness (desktop, mid-range) | No long animation frame > 50 ms while scrolling the full page; median ≥ 55 fps | `e2e/perf.spec.ts` (Long Animation Frames API) |
| Scroll smoothness (mobile emulation, 4× CPU) | No long animation frame > 100 ms while scrolling | Same spec, mobile project |
| First-load JS for `/` (code, not art) | ≤ 220 KB gzip of module scripts | `@next/bundle-analyzer`; art never enters client JS (scenes are Server Components) |

Delivery rules that keep heavy art off the critical path:
- The Desk scene is inline in the server HTML; station scenes below the fold are server-rendered too but skipped by `content-visibility: auto` until near.
- Texture tiles are referenced from CSS/SVG patterns with `image-set()` (AVIF, WebP); below-fold project screenshots use `loading="lazy"` with explicit dimensions.
- HTML is served compressed (Vercel default brotli). Record the compressed HTML size, texture sizes and layer counts in each handoff (§17.2) as information, not as gates.

Naming: lowercase kebab-case with a domain prefix in `public/assets/papercraft/` (`tex-…`, `desk-…`, `prop-…`, `rifqi-…`). No spaces, no `final2`, no `copy`. Every file in `public/` MUST be referenced by code or data; orphans are deleted.

---

## 10. Motion & Interaction

### 10.1 Motion Tokens (`src/styles/motion.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--ease-paper` | `cubic-bezier(0.22, 1, 0.36, 1)` | All UI motion |
| `--dur-micro` | `160ms` | Hover edge tint, button press |
| `--dur-ui` | `200ms` | Tabs, row unfold content, lamp |
| `--dur-depth` | `240ms` | Depth reveal (frames, folders, binders, pinned cards) |
| `--dur-sheet` | `320ms` | Dialog open/close |
| `--dur-theme` | `450ms` | Lamp theme View Transition |
| `--dur-reveal` | `600ms` | Content reveal (once) |

### 10.2 Signature Moves, Allowed & Forbidden Motion

**Signature moves (the paper world's vocabulary — use these, invent nothing else):**

| Move | What happens | Trigger | Implementation |
| --- | --- | --- | --- |
| **Unfold into depth** | A station's layers start flattened (like a closed pop-up) and separate to their `z` as the station enters; shadows lengthen with them | Station enters the viewport (view timeline, `entry 0% → cover 35%`) | Per-layer `transform` keyframes from `translateZ(0) scale(1)` to `translateZ(var(--z)) scale(var(--s))` |
| **Camera dolly** | While a station crosses the viewport the camera drifts (`x` ±40, `y` ±60, `z` 0 → +120 scene units), so near layers move more than far ones | Scroll (view timeline, `cover`) | `.scene-camera` transform keyframes |
| **Hero push-in** | The Desk camera moves toward the laptop while the About sheet slides over | Scroll over the first `100vh` (`scroll(root)`) | Same camera keyframes on the sticky hero |
| **Pointer look** | Camera follows the pointer by ±12 / ±8 px | `pointermove`, desktop fine pointer only | `--px`/`--py` + `translate` (§9.2) |
| **Depth reveal** | An object's inner layers separate (`z` × 1.6) and its shadow grows | Hover **and** `:focus-visible` / open state | `transform` transition, `--dur-depth` |
| **Lamp theme switch** | The new theme grows as a circle from the lamp bulb | Lamp or navbar toggle | `document.startViewTransition` + `clip-path` on `::view-transition-new(root)`, `--dur-theme` |
| **Postmark** | Stamp lands once | Real 2xx from the contact action | One keyframe, once |
| **Figurine clips** | Wave once per session, look at the laptop, glance at the lamp on theme change, think while EQbot is open, blink every 4–7 s while on screen | On demand (§2.7) | `figurine-clips.ts`, demand frames |

**Also allowed:** one content reveal per section on first view (`opacity` + `translateY(12px → 0)`), visible by default in SSR HTML (no `opacity: 0` trap); tab and dialog transitions; the hero caret; the lamp head tilt.

**Forbidden:** splash, loading or preloader screens (including "0 → 100 %" counters); scroll hijacking, Lenis or any smooth-scroll override; `scroll-snap` on the page; horizontal scroll-jacked galleries; pinning beyond the hero's natural `sticky`; continuous loops on props (the blink is the only repeating motion); physics engines; falling or flying cards; 3D tilt on cards; cursor-follower blobs, magnetic buttons, custom cursors; letter-by-letter split-text reveals; marquee text; particles, aurora, shimmer; `transition: all`; animating layout properties, `filter`, or registered custom properties.

**Reduced motion (`prefers-reduced-motion: reduce`):** scenes render in their final composed state; no unfold, dolly, push-in or pointer look; depth reveal becomes a shadow and outline change without movement; the theme switch is instant; reveals are instant; dialogs fade ≤ 100 ms; the figurine stays as the poster. Every feature still works.

**Tooling:** CSS first (transitions, scroll-driven animations, View Transitions). Use `motion` (`motion/react`) only for mount/unmount presence (dialog content, tab panels, EQbot sheet), loaded with `LazyMotion` + `domAnimation`.

---

## 11. Technology Stack Decision

### 11.1 Scored Choices

| Concern | Options considered | Chosen | Why |
| --- | --- | --- | --- |
| Framework | Stay on Next 14 · **Next 16** · Astro | **Next.js 16** (App Router, Turbopack) | Server Components for static paper layers, React 19 support required by R3F 9, Server Actions for the form, first-class on Vercel |
| UI runtime | **React 19** | React 19 | Native `<dialog>` refs, `useActionState`, needed by R3F 9 / drei 10 |
| Styling | Tailwind 3 · **Tailwind 4** · CSS Modules | **Tailwind CSS 4** | CSS-first `@theme` makes tokens the single source; no 100-line JS config of remapped palettes |
| Depth engine (2D layers in 3D) | **CSS 3D transforms + scroll-driven animations** · three.js planes for every scene · GSAP ScrollTrigger · Spline | **CSS 3D + scroll-driven CSS** | Server-rendered, accessible, works without WebGL and on mobile, compositor-only motion, zero runtime cost; three.js scenes fail perf/a11y (§1.2 D) |
| Paper material | **`paper-kit` (local, server-only)** · hand-drawn shadows per shape · raster renders | **`paper-kit`** | One consistent material model for every sheet; deterministic; no client JS |
| 3D character | **R3F 9** · `<model-viewer>` · Spline | **R3F** | Control over demand rendering, poster parity. Spline rejected: heavy runtime, external hosting, low control |
| Theme transition | **View Transitions API** · overlay wipe | **View Transitions** | Native, compositor-driven, falls back to an instant switch |
| Motion | **CSS + scroll-driven CSS + `motion`** · GSAP ScrollTrigger · Lenis | **CSS first, `motion` for presence** | No scroll hijacking; scroll-driven CSS is native and free |
| Dialogs | **Native `<dialog>`** · Radix · custom portal | **Native `<dialog>`** | Top layer, built-in `Escape`, inert background, zero dependency |
| Theme | **next-themes 0.4** | next-themes | `attribute="class"`, system default, no flash |
| Form | API route · **Server Action** | **Server Action + `zod` 4 + Resend** | Works without JS (progressive enhancement), typed validation in one place |
| Bot protection | **Honeypot + min-fill time + Vercel BotID + Firewall rate rule** | All four | No user-facing CAPTCHA |
| Icons | **lucide-react** + local brand SVGs | lucide-react | One library; `react-icons` removed |
| Asset tools | **Blender, gltf-transform, gltfjsx, SVGO, sharp** | All | Free, scriptable, best-in-class compression |
| QA | **Playwright + @axe-core/playwright**, Lighthouse CI, `@next/bundle-analyzer` | All | Proves the DoD instead of claiming it |

### 11.2 Package Policy

- **Install in Phase 1:** `next@16`, `react@19`, `react-dom@19`, `tailwindcss@4`, `@tailwindcss/postcss`, `three`, `@react-three/fiber@9`, `motion`, `zod@4`, `next-themes@0.4`, `lucide-react`, `resend`. Dev: `@playwright/test`, `@axe-core/playwright`, `@next/bundle-analyzer`, `svgo`, `eslint` (flat config) + `eslint-config-next`.
- **v2 adds no runtime package.** `paper-kit` is local code; texture tiles are generated with `sharp` (already a Next.js dependency) in a script under `scripts/`.
- **Not installed:** `@react-three/drei`, `@gltf-transform/cli`, `gltfjsx`. The procedural figurine needs none of them (§9.4); add them together with a GLB if one is ever made.
- **Installed so far:** `three@0.187` + `@react-three/fiber@9.8` and `@playwright/test` (Phase 3). Still to add in Phase 5: `@axe-core/playwright`, `@next/bundle-analyzer`, `svgo`.
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
- `optimizePackageImports` lists only installed packages (`lucide-react`).

---

## 12. Code Architecture

```
src/
  app/
    layout.tsx            fonts, ThemeProvider, LanguageProvider, skip link
    page.tsx              Server Component: composes sections, revalidate = 1 day, no loading gate
    not-found.tsx         Empty Drawer
    actions/contact.ts    Server Action (zod + Resend + honeypot + minimum fill time)
    papercraft/           dev-only asset review sheet (404 in production)
    opengraph-image.tsx, robots.ts, sitemap.ts, icon.svg, apple-icon.png
  components/
    scene/                LaptopScreenUI, DeskLamp, FigurineSlot, PaperDeskCanvas, RifqiFigurine, figurine-*, stage-geometry
    scenes/               ShadowBox, PaperScene (SceneLayer type, frameVars, depthFactor), StationFigure, ProjectShadowBox,
                          desk/DeskStation.tsx, pinboard/ cabinet/ drafting/ gallery/ archive/ mail/ (layers, frames, HTML rects)
    sections/             Navbar, Hero, About, Experience, Services, Certificates, Contact, Footer (server)
                          + client leaves: ProjectShelf (cards, archive drawer), CaseStudy, ContactForm,
                            CopyEmail, AdditionalSkillsLauncher, FooterControls
    ui/                   T, SectionTitle, Tag, FolderTabs, TabbedPanels, PaperDialog
    shared/               Providers, StudioProvider, StudioRail, EqbotLoader, EqbotCompanion, eqbot-script.ts,
                          AdditionalSkillsDialog (lazy), BrandLockup
    icons/                local brand glyph SVGs
  context/                LanguageContext
  data/portfolio.ts       the only content source (server-side only)
  data/sections.ts        section order and labels, safe for client imports
  hooks/                  useParallaxStage, useCapabilityGate, useHydrated
  lib/                    experience-utils, additional-skills, display-case, hero-screen
  lib/paper-kit/          paperKit (sheet, stack), PaperDefs, cut, air, edgeOf, shape helpers (server-only)
  styles/                 tokens.css, z-index.css, design-system.css, scene.css, paper.css
  types/index.ts
```

- `"use client"` only at interactive leaves (stage, tabs, dialogs, contact form, EQbot, Navbar). Every section is a Server Component.
- **Client leaves never import `data/portfolio.ts`.** The server section shapes the data and passes it as props (`heroScreen()`, `ShelfProject`). The one exception is `AdditionalSkillsDialog`, which loads with `next/dynamic` on first open.
- EQbot loads after hydration through `EqbotLoader` (`next/dynamic`, `ssr: false`).
- First-load JS budget for `/`: **≤ 220 KB gzip** of module scripts (the `nomodule` polyfill is excluded). Measured 160.6 KB after P4.
- No component file over ~250 lines; split by responsibility.
- TypeScript `strict`, zero `any`, zero `@ts-ignore`.

---

## 13. Data Integrity & Bilingual Standards

- All facts live in `src/data/portfolio.ts` and conform to `src/types/index.ts`.
- **Bilingual parity:** every visible string has EN and ID (`title`/`titleId`, `description`/`descriptionId`, `labelEn`/`labelId`) rendered through `<T en id />`, which prints both spans and lets CSS show the one matching `<html lang>`, so Server Components stay bilingual without client state. Client attributes (`aria-label`, `placeholder`) use `useLanguage().say(en, id)`. `LanguageProvider` sets `<html lang>`.
- Job titles, companies and category names stored in capitals render through `displayCase()`.
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
| CLS | ≤ 0.1 | Fixed `aspect-ratio` on every `ShadowBox`, canvas, poster, and image |
| Scroll smoothness | No long animation frame > 50 ms (desktop) / > 100 ms (mobile, 4× CPU) while scrolling the page | `e2e/perf.spec.ts` (§9.6) |

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
- The contact Server Action validates with `zod` (length limits, email format), strips control characters, rejects honeypot fills and submissions faster than 3 s, verifies BotID, and is behind a Vercel Firewall rate-limit rule. *Status (v1.5): validation, control-character stripping, honeypot and fill time are implemented; BotID and the Firewall rule are pending — they need the owner's Vercel project.*
- External links: `target="_blank" rel="noopener noreferrer"`.
- No third-party trackers without explicit owner approval. Vercel Web Analytics MAY be enabled (cookieless).
- Personal reference photos never ship in the repo (§2.7).

---

## 15. Automated Guardrails

| Check | Command | Blocks merge |
| --- | --- | --- |
| Lint | `npm run lint` (`eslint .`) | ✅ |
| Types | `npx tsc --noEmit` | ✅ |
| Build | `npm run build` | ✅ |
| Design rules | `npm run check:design` → `scripts/check-design-rules.mjs` greps `src/` for: hex/rgb literals in `.tsx`, `rounded-(xl|2xl|3xl)`, `rounded-full` outside the allowlist, `backdrop-blur`, `bg-gradient`/`bg-clip-text`, `dark:` outside the hero allowlist, `z-[`, `font-black|font-extrabold`, `transition-all`, `truncate`, and orphan files in `public/`. **Added in R1:** `scroll-snap`, `will-change` in static CSS, `@property` animations, scene art without `aria-hidden`, a station with more than 14 layers or a layer without a depth band; R1 adds: scroll snapping, `will-change` outside an `.is-*` state selector, `@property`, raw `<svg>` in `scenes/` without `aria-hidden`, a station with more than 14 layers or a layer without a depth band | ✅ |
| Data integrity | Same script: asset paths exist, certificate counts match, EN/ID pairs non-empty | ✅ |
| E2E + a11y | `npm run test:e2e` (`playwright.config.ts`, specs in `e2e/`): projects `desktop-light`/`desktop-dark` at 1440 px, `mobile-light`/`mobile-dark` at 390 px, `fallback` (reduced motion, `--disable-webgl --disable-3d-apis`); section order, anchors, keyboard tabs/dialogs/menu trap, contact validation, language switch, 404, axe (`@axe-core/playwright`, WCAG 2.2 AA) with zero serious/critical issues | ✅ |
| Scroll performance | `e2e/perf.spec.ts`: scripted full-page scroll; Long Animation Frames on desktop and mobile emulation (§9.6) | ✅ (from R3) |
| Performance | Lighthouse CI (`lighthouserc.json`, `npx -y @lhci/cli@0.15.1 autorun`; locally set `CHROME_PATH`): mobile, 3 runs — Performance ≥ 90, Accessibility = 100, Best Practices ≥ 90, SEO ≥ 90, LCP ≤ 2.5 s, CLS ≤ 0.1. Runs against `next start` in CI until a Vercel preview URL is wired | ⚠️ warn |

All checks run in GitHub Actions (`.github/workflows/ci.yml`) on every pull request: `verify` (lint, types, design rules, build) → `e2e` (blocks merge) and `lighthouse` (`continue-on-error`).

Do not put `content-visibility: auto` on sections: placeholder heights make in-page anchors land in the wrong place (`e2e/interaction.spec.ts` guards this). It is allowed only on `ShadowBox` scene containers, whose height is fixed by `aspect-ratio` (§9.2).

---

## 16. Implementation Roadmap

### 16.1 v1 (done)

| Phase | Scope | Result |
| --- | --- | --- |
| **P0 — Rules & cleanup** ✅ | v1 rules; dead components, orphan assets, unused packages deleted | Lint, types, build pass |
| **P1 — Foundation** ✅ | Next 16 / React 19 / Tailwind 4; tokens, z-index, motion CSS; no loading gate; `check-design-rules.mjs`; CI | All guardrails green |
| **P2 — Assets** ✅ | SVG wall, desk, laptop, lamp, props; SVG figurine poster; EQbot avatar; brand icons; `/papercraft` review sheet | — |
| **P3 — Hero stage** ✅ | `PaperDeskStage`, `LaptopScreenUI`, `DeskLamp`, parallax, lazy R3F figurine with capability gate | LCP 1.0–1.7 s at 4× CPU, slow 4G |
| **P4 — Sections** ✅ | One responsive Server Component per section; native dialogs; Server Action contact form | First-load JS 160.6 KB gzip |
| **P5 — QA & launch** ✅ (owner pending: Vercel preview review, BotID + Firewall rule) | Playwright + axe, Lighthouse CI, EN/ID copy review | 97 passed / 6 skipped; a11y/BP/SEO 1.00 |
| **P6.1–P6.3** ✅ | Paper puppet (parts, rig, 3D sheets, clips, expressions); 2D scene detail pass; mobile diorama | Playwright 103 passed / 12 skipped |

### 16.2 v2 — *The Paper Studio*

Order matters: R1 proves the material and camera on one station before any other station is built.

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| **R1 — Material & camera proof (the Desk)** — *built 2026-11-23, awaiting owner review* | `paper-kit` (`sheet`, `stack`, `cut`, `air`, `defs`, materials), texture tiles (`tex-cardstock`, `tex-kraft`, `tex-cork`, `tex-wood`), depth & light tokens (§5.6), `ShadowBox` + `PaperScene` + camera, the Desk station rebuilt at 12–14 layers (skyline, window, wall, shelf, pinboard, lamp, desk, laptop, figurine layer, props, chair, frame), mobile frame replacing `MobileDiorama`, `check:design` additions (§15) | Owner review on `/papercraft` against the mood references (depth, soft shadows, rims, grain, atmosphere); poster ↔ 3D gate still ≤ 2 %; LCP, CLS and scroll gates (§9.6) pass |
| **R2 — Stations** | Pinboard, Filing Cabinet, Drafting Table, Shadow-Box Gallery (`ProjectShadowBox`, `project.motif` data), Archive Shelf, Mail Tray, back-of-frame footer, Empty Drawer 404; station figurine poses (`pin`, `folder`, `draw`, `hang`, `binder`, `seal`) | Every station passes §3.3 (all seven tests); content sheets carry every fact; axe clean |
| **R3 — Motion** | Unfold into depth, camera dolly, hero push-in, depth reveal, lamp View Transition, workday light arc | Reduced-motion final states verified; `e2e/perf.spec.ts` scroll gates pass on desktop and mobile emulation |
| **R4 — Mobile & performance hardening** | Portrait frames tuned per station, layer merges to ≤ 8 on mobile, `content-visibility` on scenes, texture `image-set`, trace review | Gates in §9.6 on a real mid-range Android over 4G; no horizontal overflow at 390 px |
| **R5 — QA & launch** | Full Playwright + axe, Lighthouse, EN/ID copy, owner review on the Vercel preview | DoD (§17.3) fully checked |

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

### 17.3 Definition of Done (v2)

- [ ] *(owner review)* Reads as *The Paper Studio*: a walk-through paper office in shadow boxes, where the paper world is the main experience.
- [ ] Every sheet has the five material parts (§2.4); every scene has 8–14 layers in named depth bands (§2.5) and passes the Depth and Station tests.
- [ ] Passes the seven authenticity tests (§3.3) and contains no banned pattern (§3.2).
- [ ] Tokens only; light and dark verified; shadows, rims and falloff follow the light tokens, including the workday arc.
- [ ] EN/ID parity and `portfolio.ts` integrity preserved; no invented facts; every fact is in HTML content sheets, not only in art.
- [ ] Hero renders without a splash; the `h1` is the LCP; 3D is lazy, capability-gated, with a pixel-matched poster.
- [ ] Motion is compositor-only; reduced motion, no scroll-driven support and no 3D transforms all show the final composed scenes.
- [ ] Experience gates in §9.6 pass (LCP, CLS, INP, scroll smoothness, first-load JS).
- [ ] Keyboard, focus rings, semantics and ARIA verified; depth reveals work on focus; axe clean; no horizontal overflow at 390 px.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run check:design`, and Playwright pass.

---

## 18. Glossary

- **Slide-over** — the About sheet scrolling over the sticky hero stage.
- **Cut edge** — the 1 px seam plus offset recess edge that makes a surface read as cut paper.
- **Capability gate** — runtime check deciding whether the R3F figurine may load.
- **Poster** — the static image of the figurine rendered from the same camera as the 3D view.
- **Station** — one section's corner of the paper office, shown in its own shadow box (§2.2).
- **Shadow box** — the framed, deep paper diorama that holds a station's scene.
- **Depth band** — Far, Back, Mid, Front, Frame: the `z` ranges every layer belongs to (§2.5).
- **Unfold into depth** — a station's layers separating from flat to full depth as it enters (§10.2).
- **Camera dolly** — scroll-linked camera movement inside a station's 3D space.
- **`paper-kit`** — the server-only module that turns authored shapes into lit paper sheets (§9.3).
- **Workday arc** — the light theme's sun moving from morning (`01`) to golden hour (`06`).

## 19. Change Log

| Date | Change |
| --- | --- |
| 2026-11-22 | v1.0. Concept selected through three scored rounds (§1). Replaced `PORTFOLIO_STANDARDS.md` and the Cursor rule. Added the light story, anti-slop standard, character spec, component inventory, stack decision (Next 16 / React 19 / Tailwind 4 / R3F 9 / `motion`), native dialogs, Server Action contact form, automated guardrails, and roadmap. Deleted 37 dead source files, 49 orphan assets, and 7 unused packages. Baseline after cleanup (`next build`, Next 14): route `/` first-load JS 393 kB. `npm run lint` has no ESLint config yet (set up in P1). |
| 2026-11-22 | v1.1 — Phase 1. Next 16.4, React 19.3, Tailwind CSS 4.3 (CSS-first `@theme` in `tokens.css`; `tailwind.config.ts` deleted), ESLint 9 flat config, TypeScript 5.9. Swapped out `framer-motion`, `lottie-react`, `react-icons`, `react-type-animation`, `autoprefixer`; added `motion`, `zod`. Loading gate removed; skip link added; default theme follows the system. Brand glyphs are local SVGs (lucide 1.x dropped them; LinkedIn is a drawn monogram because Simple Icons removed it). `RoleContext` and role CSS deleted (dead). React 19 hook-rule errors fixed with `useSyncExternalStore` (`useHydrated`, `useMediaQuery`) and `useEffectEvent`. `scripts/check-design-rules.mjs` (`npm run check:design`) and GitHub Actions CI added; all checks green. The `ResponsiveLayout` / `mobile/*` merge moves to P4 because those sections are rebuilt there. |
| 2026-11-22 | v1.2 — Phase 2. Hand-drawn, token-only inline SVG assets in `src/components/scene/`: `WallLayer` (window with day beam / night moon, shelf with `.NET` / `SQL` / `C#` binders), `DeskLayer` (desk, drawer pedestal labelled `01`–`03`, mat, laptop with an empty glass area at `SCREEN`), `LampArt` (dark-mode light cone), `FrontLayer` (mug, notebook with sticky note, paper plant), `RifqiFigurine` (quilled curls, taper fade, charcoal tee, two-tone denim, unbranded sneakers). Shared geometry in `stage-geometry.ts`. Paper depth tokens and the scene palette added. EQbot avatar now uses the figurine head crop. Global paper grain on `body::before`. The figurine poster became inline SVG instead of a raster render, so one file serves both themes; the GLB moves to Phase 3. |
| 2026-11-22 | v1.3 — Phase 3. Hero rebuilt as one responsive `Hero` (`MobileHero` deleted) around `PaperDeskStage`: SVG layers, `LaptopScreenUI` as real HTML on the glass (compact laptop card under 768 px), `DeskLamp` theme switch with 6° head tilt, `useParallaxStage` (pointer, rAF, CSS variables) and scroll-driven depth in `scene.css`. 3D figurine: `FigurineSlot` → capability gate → lazy `PaperDeskCanvas` with a procedural low-poly model (Blender is not available in this toolchain, and a procedural mesh needs no download); poster stays on any failure. Theme flip unified in `useThemeToggle` (fixes the toggle reading `theme` instead of `resolvedTheme` under `system`). New data: `heroIntro`, `cvFile`, `contactInfo.availability`; `typingTexts` removed. Hero excluded from the section reveal and rendered outside the `mounted` gate, which moved LCP from the EQbot notice (3.2–4.0 s) to the hero text (1.0–1.7 s). Rule changes: 5/7 grid and sticky from 1280 px, tablet keeps the full static stage, figurine stands left of the laptop. |
| 2026-11-22 | v1.4 — Phase 4. `ResponsiveLayout`, `mobile/*`, `hocs/`, `AnimatedSectionTitle`, `Projects`, `ViewAllProjects`, `PortfolioFigmaCard`, `ProjectDetailDialog`, `Portal`, `FloatingNavigation`, `useLedgerRise`, `useMediaQuery`, `api/contact` and `lib/submit-contact` deleted; `public/assets/me.png` deleted (About now uses the figurine head crop with a paper clip, per §2.6). `page.tsx` and every section are Server Components; bilingual copy via `<T>` + CSS on `<html lang>`. Section order lives in `data/sections.ts` (`navLinks` removed). Experience is a folder-tab ledger of `<details>` rows; Certificates are `<details>` folios; Services is a blueprint board plus a Selected work shelf (`#projects`) whose case study and archive drawer are native dialogs with filters, labelled search and a live count. Contact posts to a Server Action (zod, honeypot, 3 s minimum fill) and shows the postmark only after Resend accepts. StudioRail/Provider use one IntersectionObserver and a CSS scroll-driven progress rule; the JS section reveal was replaced by a CSS `view()` timeline. Navbar and BrandLockup render on the server (theme swap via `dark:`). EQbot and the additional-skills dialog load lazily. First-load JS for `/`: 244 → 160.6 KB gzip. |
| 2026-11-23 | v1.7 — P6.3 (`docs/art-motion-upgrade.md` §3). Scene materiality: lit cut lines on the desk edge, drawer fronts and key rows; one paper fibre tile over the stage (`.stage-fibre`, 3.9 KB, multiply by day / screen at night). Composition: floor, skirting and rug under the desk, desk-chair back in L3, pinboard under the shelf. Laptop: lid thickness, two-tone hinge, embossed key rows. Light: the beam is 3 stacked trapezoids and the lamp pool 3 ellipses (the radial gradient is gone), paper cloud by the moon. Mobile: a static square diorama above the laptop card (§8); `stageBox` and `DeskLamp` take a rect and stage. `RifqiFigurine` tightens path strings and inherits caps/joins (−20 % bytes). |
| 2026-11-23 | v1.6 — P6.1–P6.2 (`docs/art-motion-upgrade.md`). The figurine is a paper puppet: `figurine-parts.ts` (parts, joints, poses, expressions), `figurine-rig.ts` (joint solver, projection), `figurine-mesh.ts` (extruded sheets), `figurine-clips.ts` (on-demand clips). Poster, About bust, EQbot expressions, 404 pose and the 3D view all draw from it; the primitive mesh and `figurine-geometry.ts` are gone. Hero pose is seated on the notebook (moved from L3 to L2) with the near hand on the laptop; the mug moved beside the lamp. Dark mode: `--ill-shirt` lifted to `#45413c` plus a `--figure-rim` lamp-side rim. Clips allowed in §2.6 / §10.2. New `e2e/figurine.spec.ts`: poster ↔ 3D match, zero draws while idle, look clip stops. |
| 2026-11-23 | v1.5 — Phase 5. Playwright suite (`playwright.config.ts`, `e2e/`: page, interaction, contact, a11y, fallback) with `@axe-core/playwright`; `npm run test:e2e`; `lighthouserc.json`; CI split into `verify` → `e2e` (blocking) + `lighthouse` (warn). Fixes found by the suite: `content-visibility` removed from sections (broke anchor scrolling), contact action strips control characters and validates before the fill-time check, blueprint list no longer has non-`li` children, capability headings h4 → h3, footer text contrast raised to `/75`, theme button gets `aria-pressed`, mobile menu traps Tab and closes on Escape and at ≥ 1024 px. EN/ID copy review: natural Indonesian (`proyek`, `Stack inti`), clearer About and Contact copy, no invented facts. Results: lint, types, design rules, build green; Playwright 97 passed / 6 skipped; Lighthouse a11y/BP/SEO 1.00, Performance 0.87–0.88 on localhost (warn only; real LCP 1.1–1.8 s); first-load JS 160.8 KB gzip. Pending owner: BotID and the Firewall rate-limit rule (§14.3), Vercel preview review. |
| 2026-11-23 | **v2.0 — *The Paper Studio*.** Owner feedback: the paper craft was "just there", not the main experience, and felt primitive. Diagnosis in §1.0 (hard zero-blur shadows, flat fills, 3 layers, no atmosphere, imperceptible parallax, flat sections after the hero, byte caps, no frame). New v2 rubric weighing craft and depth; six directions over three rounds; winner C3′ *The Paper Studio* at 92.75 (v1.7 scores 66.0). Every section becomes a station of one paper office in its own shadow box (§2.2); content stays on HTML sheets in front; paper material system with five parts per sheet (§2.4); depth bands (§2.5); workday light arc; CSS 3D camera (`ShadowBox`, `PaperScene`) with unfold, dolly, push-in, pointer look and depth reveal (§9.2, §10.2); `paper-kit` (§9.3); lamp View Transition. Per-asset byte caps for paper-craft 2D/3D art removed and replaced by experience gates (§9.6). Gradient rule narrowed to scene-art light falloff. New banned clichés and template-motion tropes (§3.2), Depth and Station tests (§3.3). Roadmap R1–R5 (§16.2). `docs/art-motion-upgrade.md` is superseded (banner added; its accepted parts live here); R1 repoints the code comments that cite it and deletes it. |
| 2026-11-23 | **v2.1 — R1 built.** `lib/paper-kit` (five-part sheet: two-tier cast shadow with offset `gap × 0.05` and blur `2 + gap × 0.03` quantised to five shared filters, cut wall, day/night falloff, rim, grain; `stack`, `cut`, `air`, `edgeOf`, `PaperDefs`); seeded texture tiles from `scripts/gen-paper-textures.mjs` (`tex-cardstock/kraft/cork/wood`, `desk-fibre` retired); depth & light tokens (§5.6). §9.2 rewritten: the camera is analytic (`k = z / (P − z)` per layer, `z = 0` plane fixed) instead of `preserve-3d` + `translateZ`, so the resting state is exactly the authored composition. `ShadowBox`, `PaperScene` (`frameVars`, `depthFactor`) and `scenes/desk/DeskStation.tsx` (14 layers: sky, two skylines with Monas, wall with beams, window, shelf + pinboard, floor + rug, desk with modesty panel and drawers, lamp, laptop, lamp light, figurine, props, chair). The Desk's mobile frame is a landscape crop (`150 60 1350 940`), not `4 / 5`, so the laptop stays legible; the screen card sits below the box. `PaperDeskStage`, `MobileDiorama`, `LampArt` and `scene/layers/*` deleted; registration marks dropped from the hero. `section {position: relative}` scoped to `section[id]` (it overrode the screen card's `md:absolute`). `check:design` R1 rules (§15). `docs/art-motion-upgrade.md` deleted; code comments now cite §2.7, §9.4, §10.2, §17.3. |
