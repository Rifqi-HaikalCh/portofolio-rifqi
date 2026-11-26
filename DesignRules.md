# DesignRules.md

# Design System, UX Blueprint & Engineering Guardrails — 3D Paper Craft Developer Portfolio

> **Status:** Single Source of Truth (v3.29). Replaces `PORTFOLIO_STANDARDS.md` and `.cursor/rules/portfolio-standards.mdc` (both deleted 2026-11-22).
> **Owner:** Rifqi Haikal Chairiansyah (`portofolio-rifqi`)
> **Approved Concept:** *The Paper Studio — Walkthrough* — a fullscreen paper office the visitor walks through in scroll chapters: each section's station fills the screen, its information arrives in small paper beats, and the camera hands off from station to station along one office plan (final score 90.75 / 100 on the v3 rubric, see §1). Builds on *The Paper Studio* (v2) and supersedes *The Architect's Paper Desk* (v1).
> **Rendering Strategy:** Hybrid 2D + 3D — 8–14 procedurally lit 2D paper layers per station placed at real depths and projected through one analytic camera (§9.2), staged fullscreen and choreographed by native CSS scroll-driven timelines (§9.7), plus one lazy React Three Fiber paper puppet on capable desktops
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

The concept is not picked by taste. Three decisions shaped it:

1. **v1 (2026-11-22):** *The Architect's Paper Desk*, 91.5 on the v1 rubric. Built as v1.7.
2. **v2 (2026-11-23):** *The Paper Studio*, 92.75 on the v2 rubric (record in §1.7). It fixed the paper material and gave every section its own station.
3. **v3 (2026-11-23), current:** the owner reviewed R2 as built: "sudah keren", and asked for five changes:
   - the paper craft fullscreen;
   - information that arrives on scroll from below, the side, above, or from inside the paper craft (a folder opens in a drawer and its paper comes out);
   - scene changes where the current assets move aside and the next ones come in from another direction;
   - information broken into smaller pieces, each timed to its own moment;
   - a fully animated 2D/3D paper world driven by scroll and click.

v3 keeps the identity, the material system (§2.4) and the stations (§2.2), and replaces the **page structure and motion model**. Future proposals MUST be scored with the v3 rubric (§1.2) and beat **90.75** to replace it.

### 1.1 Diagnosis of v2.2 as built (why it is not yet the experience the owner wants)

| # | Cause | Evidence in v2.2 | What v3 does instead |
| --- | --- | --- | --- |
| 1 | **Scenes are pictures in a column** | Each station is a 1600 × 640 box at container width; at 1440 × 900 it fills ~45 % of the viewport | The station *is* the viewport: a fullscreen stage (`100svh`) |
| 2 | **Content arrives as one block** | One big content sheet per section, already composed when it scrolls in | Content is split into **beats**: small sheets, each with its own entrance, hold and exit |
| 3 | **Sections do not connect** | Station → flat gap → next station; the "one room" exists only in the art | **Handoffs**: the camera moves through the office plan, so the old scene leaves in one direction while the next arrives from the other |
| 4 | **The scene never reacts to reading** | Only `:has()` state (folder lift, binder tilt) on click | Every beat has a **scene act**: the drawer slides out, a folder rises, the lamp swings, a binder is pulled |
| 5 | **Static figure at every station** | One pose per station | **Stop-motion pose swaps** (2–4 poses per chapter) tied to beats |
| 6 | **The scroll settle was removed** for performance (R2) | No motion between hero and footer | Motion lives on station-sized stages and beat sheets only; tall elements never animate (§9.7) |

### 1.2 Scoring Rubric v3 (weights sum to 10; maximum 100)

v3 adds **Scroll choreography** (the owner's new requirement) and lowers Build risk, because the owner accepts more work for the experience.

| Criterion | Weight | What a 10 means |
| --- | --- | --- |
| Brand fit | ×1.25 | Says "precise enterprise engineer who builds with care" (.NET/C#/SQL + fullstack) without a caption |
| Paper-craft authenticity | ×1.50 | Reads as real cut, layered, lit paper; motion behaves like paper (slides, folds, lifts, stop-motion), never like UI |
| Immersion | ×1.50 | The paper world fills the screen and is the experience from the first to the last scroll |
| Scroll choreography | ×1.50 | Information arrives in small, well-timed beats from meaningful directions; scenes hand off to each other; scroll and click both move the world |
| Recruiter scan speed | ×1.00 | Name, role, stack, proof and CV reachable in < 5 s on any device; any chapter reachable in one click |
| Memorability | ×1.00 | A visitor can describe the site in one sentence a day later |
| Performance | ×1.00 | LCP ≤ 2.5 s on mid-range mobile 4G; no long animation frame over the §9.6 gates while scrolling |
| Accessibility | ×0.75 | Fully usable by keyboard, screen reader, 200 % zoom and reduced motion; text never trapped in a fixed-height box |
| Build risk / maintainability | ×0.50 | One developer plus an agent can build and keep it on Vercel Hobby without a scroll framework |

Baseline: v2.2 as built scores **75.0** on this rubric (row A).

### 1.3 Round 1 — Seven Directions

| # | Direction | Brand | Craft | Immer. | Choreo | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | **v2.2 as built**: framed stations at container width, one content sheet each | 9 | 9 | 6 | 4 | 9 | 7 | 8 | 9 | 9 | **75.0** |
| B | **Fullscreen stations, stacked**: each station `100svh`, sheets scroll over it with entrance animations; no pinning, no handoffs | 9 | 9 | 8 | 6 | 8 | 7 | 7 | 9 | 8 | **78.5** |
| C | **One fixed office**: one fixed fullscreen panorama for the whole page; scroll drives one camera across it; content overlays | 9 | 9 | 10 | 8 | 5 | 10 | 5 | 5 | 3 | **77.0** |
| D | **Chapter Theatre**: each section is a scroll *chapter*: a sticky fullscreen stage plus a track of beats; the scene acts with each beat; chapters hand off with camera moves | 10 | 9 | 9 | 9 | 6 | 9 | 6 | 7 | 6 | **82.25** |
| E | **Pop-up book**: each chapter is a spread; scroll turns the page in 3D | 6 | 9 | 8 | 8 | 4 | 9 | 6 | 4 | 4 | **69.0** |
| F | **Full WebGL office**: every sheet a textured plane in three.js; scroll camera; HTML overlay | 8 | 8 | 10 | 9 | 4 | 9 | 3 | 3 | 2 | **69.75** |
| G | **Point-and-click studio**: one fullscreen office; the visitor clicks objects to open each section | 8 | 9 | 9 | 6 | 2 | 8 | 7 | 3 | 5 | **67.75** |

**Critique.**
- **A** is what the owner just asked to change.
- **B** is fullscreen, but it is still "picture, then text". There are no beats, scene acts or handoffs.
- **C** has the strongest immersion, but the same faults as in v2 remain. One global camera makes every section fragile. Text sits over a moving world. The whole office is painted on every scroll frame. Mobile gets a weak copy.
- **D** delivers what the owner asked for, and keeps each chapter self-contained, so one chapter can fail or change without breaking the others. Its weak points are scan speed (long tracks), accessibility (text in pinned boxes) and the cost of fullscreen layers.
- **E** turns pages by scroll-jacking. Its spread metaphor is off-brief: this is an office, not a book.
- **F** fails performance, accessibility and maintainability (as in v2 §1.7 D).
- **G** hides the content behind exploration: a recruiter cannot scan it.

### 1.4 Round 2 — Refining D

| # | Variant (cumulative) | Brand | Craft | Immer. | Choreo | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D1 | D + **floor-plan handoffs**: every handoff direction comes from where the next station stands in one office plan (§2.2), never from "variety" | 10 | 9 | 9 | 9 | 6 | 10 | 6 | 7 | 6 | **83.25** |
| D2 | D1 + **beats in document flow**: beat sheets are normal-flow HTML that scroll over the sticky stage and hold with `position: sticky`, never absolutely placed text in a fixed box (reflow, zoom, find-in-page, anchors) | 10 | 9 | 9 | 9 | 7 | 10 | 6 | 9 | 7 | **86.25** |
| D3 | D2 + **recruiter fast lane**: each chapter's first beat carries its key facts; chapter index always visible (StudioRail, mobile chapter bar); a *Skip chapter* link; track length caps | 10 | 9 | 9 | 9 | 8 | 10 | 6 | 9 | 7 | **87.25** |
| D4 | D3 + **paper act vocabulary**: beats *emerge* from the scene object they are about (folder → sheet, envelope → card, binder → list), with occluders so the paper really comes out from behind; **stop-motion** figurine poses | 10 | 10 | 9 | 10 | 8 | 10 | 5 | 9 | 6 | **88.75** |

### 1.5 Round 3 — Persona Stress Test of D4

| Persona | Failure found in D4 | Fix adopted into the rules |
| --- | --- | --- |
| Recruiter, phone, 4G, 30 seconds | Fullscreen chapters push proof far down; a pinned stage leaves half the screen for text | Hero beat 1 is in the server HTML at load (name, role, value, CTAs, CV). Mobile uses a **split stage**: the scene is pinned in the top 46 % and beats flow below it at reading pace (§8). Navbar keeps *Projects* and *CV* one tap away |
| Engineering manager, desktop, 5 minutes | Long holds feel slow; proof is spread across many beats | Track caps: ≤ 60 svh hold per beat, ≤ 600 svh per chapter (§4.6 formula), ≤ 2,400 svh for the page. Every chapter's first beat states its facts |
| Keyboard / screen-reader user | A focused link inside a beat could be mid-exit and invisible | Keyboard focus into a sheet that is off scrolls its track under the cue line and composes it at once (v3.3, §4.4); a sheet that is already showing is never re-animated by focus (a text field is `:focus-visible` even after a click, and replaying the entrance moved the button between press and release). The stage is `aria-hidden`. Reading order = DOM order = beat order. *Skip chapter* links |
| 200 % zoom, short laptop screens | Sticky holds and a fullscreen stage leave no room for text | Below `max-height: 560px` or at text zoom where a beat sheet is taller than `70svh`, the chapter falls back to the **stacked studio** (§8): the v2.2 layout, sheets in flow, no pin |
| Low-end laptop GPU | Two fullscreen stages × 14 layers during a handoff | Only the active chapter and its neighbour are painted (`content-visibility: auto` on the fixed-size stage); ≤ 14 layers per stage; ≤ 28 animated layers at any moment; poses swap by `opacity`, never by repainting joints |
| Visitor with motion sensitivity | Handoffs and emerges add up to a lot of motion | Reduced motion → the stacked studio: no pin, no holds, no handoffs, scenes in their final composed state (§10.2) |
| Browser without scroll-driven animations | Pinned stage with nothing moving = empty scrolling | Hold spacers exist only inside `@supports (animation-timeline: view())`; without support the page is the stacked studio. No polyfill |
| The maintainer | Hand-tuning dozens of timelines drifts and breaks | Chapters are **data** (`beats.ts` per station: id, origin, hold, scene act, pose). One `Chapter`/`Beat` component pair generates the CSS. `check:design` validates caps and origins (§15) |

After the fixes: Perf 5 → 7. **Final score of D4′ = 90.75** (Brand 10, Craft 10, Immersion 9, Choreography 10, Scan 8, Memorability 10, Perf 7, A11y 9, Risk 6). It is the approved model: ***The Paper Studio — Walkthrough***.

### 1.6 What stays from v2 and what changes

| Stays (binding) | Changes |
| --- | --- |
| The brand, the office, the seven stations and their props (§2.2) | Stations become **fullscreen chapters** instead of framed boxes in a column |
| The five-part paper material, `paper-kit`, depth bands, light story, workday arc (§2.3–§2.5) | Content becomes **beats** with origins, holds and scene acts (§4) |
| The analytic camera (`k = z / (P − z)`), layers as server-made static SVG (§9.2, §9.6) | Sections are connected by **floor-plan handoffs** (§4.3) |
| The figurine identity and its parts (§2.7) | Station figures change pose in **stop-motion** with the beats |
| v2.2 station composition | v2.2 becomes the **stacked studio** fallback (reduced motion, no support, short or zoomed screens) |
| The asset approach and the mood-reference lessons (§1.8–§1.9) | The v2 motion bans on pinning are replaced by the chapter-stage rule (§10.2) |

### 1.7 History — v2 Decision Record (superseded by §1.1–§1.6)

The v2 record below explains the material and station decisions that v3 keeps. Its rubric and scores are history; §1.8 and §1.9 still bind.

#### 1.7.0 Diagnosis of v1.7 (why it reads as primitive paper craft)

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

#### 1.7.1 Scoring Rubric v2 (weights sum to 10; maximum 100)

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

#### 1.7.2 Round 1 — Six Directions

| # | Direction | Brand | Craft | Depth | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | **v1.7 polished in place** — richer hero art, sections unchanged | 8 | 5 | 3 | 9 | 5 | 9 | 9 | 9 | **66.0** |
| B | **Hero Shadow Box** — the hero becomes a deep framed diorama; sections stay flat sheets | 8 | 8 | 6 | 9 | 7 | 8 | 9 | 8 | **77.25** |
| C | **Office Walkthrough** — one fixed paper office behind the whole page; a scroll-driven camera travels from desk to shelf to cabinet while content scrolls over it | 9 | 9 | 10 | 6 | 10 | 5 | 6 | 4 | **79.25** |
| D | **Full WebGL paper world** — every object a textured plane in three.js, HTML overlaid | 8 | 9 | 10 | 5 | 9 | 3 | 4 | 3 | **71.0** |
| E | **Career Landscape** — a paper landscape like the mood reference; the career is a winding road, the office appears at the end | 5 | 9 | 9 | 6 | 8 | 6 | 7 | 6 | **72.25** |
| F | **Pop-up Book** — each section is a spread that pops up on a page turn | 6 | 9 | 8 | 4 | 9 | 6 | 4 | 4 | **67.0** |

**Critique.**
- **A** keeps every weakness from §1.7.0 except the art density. Rejected.
- **B** fixes the hero but leaves cause 6: below the fold the paper is still "just there".
- **C** has the strongest immersion, but text over a moving world hurts reading, one huge scene is a GPU cost on every scroll, every section depends on one global camera (fragile), and mobile gets a weak version.
- **D** fails performance, accessibility and maintainability; WebGL text and focus are poor.
- **E** is off-brief (the owner asked for an office) and a generic paper landscape is the most common AI-papercraft image. Its lessons (depth, atmosphere, stacked contours) are kept as material rules, not as a subject.
- **F** needs scroll hijacking. Rejected (§10.2).

#### 1.7.3 Round 2 — Refinement & Hybrids

| # | Variant | Brand | Craft | Depth | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | C, with content sheets on a scrim over the fixed world | 9 | 9 | 10 | 7 | 10 | 5 | 7 | 5 | **82.0** |
| C2 | **Stations** — each section owns a framed shadow-box diorama of one corner of the office; the real content sits on paper sheets in front of it; depth unfolds per section on native scroll | 9 | 9 | 8 | 9 | 8 | 8 | 9 | 8 | **85.25** |
| C3 | C2 + **continuity and signature moves**: one office plan (stations share wall, floor line and light), the figurine appears at every station doing that section's job, the hero camera dollies into the room, each selected project is a mini shadow box that separates into depth on focus, the light-theme sun moves through a workday from station to station, and every station **unfolds into depth** as it enters | 10 | 10 | 9 | 9 | 10 | 7 | 9 | 7 | **91.0** |

C2 solves C's reading and GPU problems by giving each section its own bounded scene that only renders near the viewport. C3 restores C's "one world" feeling without one global camera.

#### 1.7.4 Round 3 — Persona Stress Test of C3

| Persona | Failure found in C3 | Fix adopted into the rules |
| --- | --- | --- |
| Recruiter, phone, 4G, 30 seconds | Six rich scenes push the name and CV down and add HTML weight | The hero stays text-first on mobile (name, role, CTAs, CV in the first viewport; the shadow-box top edge peeks above the fold). The LCP is the `h1`. Station scenes below the fold use `content-visibility: auto` with a fixed aspect ratio (§9.6) |
| Engineering manager, desktop, 5 minutes | Stations turn into decoration; proof gets buried | Every station has a job: its objects are the controls (folder tabs = roles, project frames = case studies, binders = certificate categories). Purpose test (§3.3) applies to every object |
| Keyboard / screen-reader user | Depth reveals are hover-only; art could steal focus | Scene art is `aria-hidden`; the controls are real HTML in reading order; every depth reveal also runs on `:focus-visible` |
| Low-end laptop GPU | 6 scenes × 14 composited layers exhaust GPU memory | ≤ 14 composited layers per scene (≤ 8 on mobile), layer boxes cropped to their art, static neighbours merged, scenes outside the viewport skipped (§9.2) |
| Visitor with motion sensitivity | Unfold, dolly and pointer look add up | Reduced motion renders every scene in its final composed state; no scroll-linked or pointer-linked transforms (§10.2) |
| The maintainer | Hand-drawing six rich scenes with shadows, edges, rims and grain is too much work and drifts in quality | `paper-kit` generates the material (shadow, cut wall, light falloff, rim, grain, stacked contours) from simple authored shapes; scenes are data (§9.3) |

After the fixes: Perf 7 → 8, Risk 7 → 8. **Final score of C3′ = 92.75.** This is the approved concept: ***The Paper Studio***.

### 1.8 Asset Approach Decision (still binding)

| Approach | Craft | Themeable (light/dark) | Authenticity | Verdict |
| --- | --- | --- | --- | --- |
| **Hand-authored SVG shapes + `paper-kit` procedural material** (shadow, cut wall, falloff, rim, grain, contours), tokenized fills | 9 | ✅ CSS variables | High (drawn for this site) | **Chosen for every scene, prop and frame** |
| **Paper texture tiles** (cardstock, kraft, cork, wood paper, felt): scanned real paper or procedurally generated | 10 | ✅ (blend modes) | High | **Chosen** for grain on every sheet |
| Photographed physical paper models made by the owner | 10 | ❌ | Highest | Allowed (optional), e.g. an About detail |
| Blender paper renders exported to WebP/AVIF | 10 | ❌ needs two renders | High | Allowed if they exist; not required |
| Full three.js scenes | 9 | ✅ | High | Only for the paper puppet (§9.4) |
| AI-generated images or AI image-to-3D meshes as final assets | — | — | Generic, off-model | **Forbidden** (§3). The v2 mood references are used for depth, shadow, framing and texture lessons only, never traced, never shipped |

### 1.9 What the mood references teach, and what they do not (still binding)

| Take | Do not take |
| --- | --- |
| 8–15 stacked planes; every object made of several sheets | The landscape subject (hills, forests, rivers, mountains) |
| Soft two-tier shadows whose length and blur grow with the gap between sheets | Teal-only monochrome palette |
| Far layers lighter and lower-contrast (light), darker and cooler (night) | Swirl-cloud borders as a frame ornament |
| Stacked contour edges (3–6 offset sheets) for rounded volumes | The glossy, mushy "AI papercraft render" finish |
| A visible frame with depth: the shadow box | Text that is part of a picture |
| Warm side light from a window; real paper grain; organic cut edges | |

### 1.10 Round 4 — Cued Paper (v3.3, owner feedback on W2)

**Owner feedback (2026-11-23).** (1) The information sheets look stiff: they read as UI cards, not paper. (2) Sheets that arrive while scrolling are hard to read because they *follow the scroll*: a sheet is half-way in for as long as the wheel is half-way through its entry range. Wanted: each scroll *triggers* an animation that plays to the end on its own, so the page feels tidy.

**Diagnosis of W2 as built.** The §9.7 rule "scroll position is the clock" was applied to the text as well as to the camera. A trackpad or wheel stops anywhere, so a sheet is often left mid-flight, tilted or half off-screen, exactly where the visitor wants to read. And the sheets have one flat colour and a hard drop shadow: no stock, no give. Scored on the §1.2 rubric, W2 as built is lower than the D4′ plan (row W2).

**Round 4a — how a beat is triggered**

| # | Option | Brand | Craft | Immer. | Choreo | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W2 | As built: sheets scrubbed by their beat timelines | 10 | 8 | 9 | 7 | 7 | 9 | 7 | 9 | 7 | **81.75** |
| C1 | Keep scrubbing, shorten entries to 30 svh and add flex keyframes | 10 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | 8 | **85.25** — a stopped wheel still leaves text mid-flight, only for less time |
| C2 | Cue beats by scroll position; sheets stay sticky inside their own wrappers, hidden while they ride up | 10 | 9 | 9 | 8 | 8 | 9 | 7 | 9 | 6 | **85.25** — a sticky sheet still rises with the page before it sticks and scrolls away after its wrapper ends; hiding both phases makes the hold window jump |
| **C3** | **Cue + deck**: one sticky viewport layer per chapter holds every pinned sheet at its place in the lane; empty *tracks* give the scroll length; an `IntersectionObserver` picks the beat under the viewport's middle line; each sheet then plays its whole flight in time | 10 | 10 | 9 | 10 | 9 | 10 | 8 | 8 | 6 | **92.0** |
| C4 | Scroll-snap one beat per page | 10 | 9 | 9 | 8 | 6 | 9 | 8 | 6 | 6 | **82.0** — banned (§3.2, §10.2); fights trackpad inertia, anchors and find-in-page |
| C5 | Wheel stepper: one gesture = one beat (`preventDefault` + programmatic scroll) | 10 | 10 | 9 | 9 | 5 | 10 | 7 | 4 | 4 | **81.5** — scroll hijacking (§10.2); breaks keyboard, inertia and assistive scrolling |

**Round 4b — what makes a sheet paper**

| # | Option | Verdict |
| --- | --- | --- |
| P1 | Per-sheet `feTurbulence` noise | Rejected: §5.4 keeps the generated noise on the page ground only; mushy noise is the "AI paper" finish (§3.2) |
| **P2** | **The scenes' own cardstock tile** (`tex-cardstock.webp`, §1.8) under a veil of the sheet's tone (78 %), plus a lit top edge (`--leaf-lip`) | **Chosen**: the sheets are cut from the same stock as the stations |
| **F1** | **Flex in flight**: every flight bends the sheet about its leading edge (`rotateX` / `skewX` in perspective), overshoots a little and settles flat; a curvature shade (`::before`, `opacity` only) shows while it bends | **Chosen**: paper has weight and give; at rest it is flat and still |
| F2 | Real curl (sliced sheet or WebGL page curl) | Rejected: slices break text selection and the accessibility tree; GPU cost |
| F3 | Idle "breathing" or a hover tilt | Rejected: floating loops and hover 3D tilt are banned (§3.2) |

**Persona check of C3 + P2 + F1** (fixes are in §4.4, §9.7 and §10.2):

| Persona | Risk | Answer |
| --- | --- | --- |
| Trackpad flick through three beats | Every skipped sheet flashes in and out | A beat jumped over (`before ↔ after`) changes state without playing; only the beat the wheel lands on plays |
| Scrolling back | One-way animations feel broken | Back from the next beat plays the exit backwards; back to before plays the entrance backwards |
| Keyboard | Tabbing into a sheet that is off | Keyboard focus into an off sheet scrolls its track under the cue line (the one programmatic scroll allowed besides anchors) and shows it at once |
| Screen reader | Off sheets hidden from AT | Off = `opacity: 0` + `pointer-events: none`, never `visibility` / `display`: every sheet stays in the accessibility tree in DOM order |
| No JavaScript | Sheets never cued | The theatre needs `[data-cue]`, set by the cue on mount; without it the chapter is the stacked studio |
| 200 % zoom | Text trapped in the fixed-height deck | Unchanged: `ChapterFit` drops a chapter to the stacked studio when a sheet is taller than 70 % of the viewport. *v3.11:* sheets drawn on the stage itself (`.stage-sheet`: the services on the blueprint, the certificate books) are sized by the stage fit and never count |
| Find-in-page | A match inside an off sheet is highlighted but not shown | **Known limitation** of C3 against D2's in-flow sheets (§1.4). *W4 decision:* `beforematch` fires only on `hidden="until-found"` content, which is also removed from the accessibility tree and from Tab order; hiding off sheets that way would take every off beat away from screen-reader browsing, a worse loss than the find-in-page gap. Rejected; the limitation stays. The stacked studio (no JS, reduced motion, text zoom, short viewports) and the split stage keep every sheet in flow, so find-in-page works there |
| Low-end GPU | More animation | Sheets animate `transform` / `opacity` in time (compositor), not on every scroll frame; the observer fires only on crossings |

C3 + P2 + F1 is adopted as v3.3. It supersedes the D2 rule "beat sheets are normal-flow HTML that hold with `position: sticky`" for *pinned* beats; long beats (`hold: 'flow'`) stay in flow.

### 1.11 Round 5 — Station Lamps & Beam Choreography (v3.25, owner request)

**Owner request (2026-11-26).** (1) Elevate the papercraft design quality of the lamp assets across all sections using multi-layered 2D objects at distinct depths (`z` / `gap` / `stack`) to create a strong 3D illusion while keeping authentic cut-paper craft. (2) Each station's lamp may take a form suited to its design (spotlight, drafting/study lamp, picture lamp, track lamp, etc.) with refined head geometry and beam direction:
- `02` About Me: lamp spotlighting the pinboard;
- `03` Experience: lamp spotlighting the open filing cabinet drawer;
- `04` Services: lamp spotlighting the drafting board;
- `04b` Projects: lamp spotlighting Rifqi's character on the ladder;
- `05` Certificates: lamp spotlighting the books/binders on the archive shelf;
- plus the interactive theme-switch lamps at `01` Desk and `06` Mail Tray.
(3) Run design iterations to evaluate and choose the best lamp architecture and visitor experience flow per section, and update `DesignRules.md` to lock in anti-AI-slop, component, and technology standards without gaps.

**Diagnosis of v3.24 lamps.** In v3.24, `lampLayers` (`src/components/scenes/lamp.tsx`) used one generic 4-point stick helper across `02`, `03`, `04b` and `05` (`circle` base, two flat `bar`s, a single quadrilateral shade, and an un-layered polygon beam). In `01`, `04` and `06`, the lamps were hand-authored inline with 5–6 flat polygons and a single flat triangle cone (`--ill-lamp-light`). None of the lamps had multi-sheet stacked contours, internal reflector depths, side facets, counterweights, or layered paper-cut light cones, and only `04` Services animated its lamp (`rotate(9deg)` on title).

**Round 5a — Five Directions for Papercraft Lamp & Lighting Experience (scored on §1.2 rubric)**

| # | Direction | Brand | Craft | Immer. | Choreo | Scan | Memo | Perf | A11y | Risk | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| L1 | **v3.24 baseline**: one generic wall-arm stick lamp (`lampLayers`) reused on `02`–`05`, flat single polygon cone, static except `04` | 8 | 7 | 8 | 7 | 9 | 8 | 8 | 9 | 9 | **79.75** |
| L2 | **Uniform heavy studio lights**: identical multi-layered architectural arm lamp pasted into every station, static beam | 8 | 8.5 | 8.5 | 7.5 | 9 | 8 | 8 | 9 | 8.5 | **82.50** — fails Swap/Station test (§3.3): a gallery wall, a bookcase and a drafting board do not use the same fixture |
| L3 | **WebGL / CSS `preserve-3d` volumetric lamps**: real 3D meshes or `feSpotLight` SVG filters per station | 8 | 7 | 9 | 8.5 | 8 | 9 | 4 | 8 | 4 | **74.50** — violates §9.2 (no `preserve-3d`, no animated filters) and hurts scroll performance |
| L4 | **Station-Specific Multi-Layered 2D/3D Paper Fixtures**: one unified `scenes/lamp.tsx` kit supporting station-tailored fixtures (`architect`, `barn-door`, `clamp`, `track-can`, `picture-hood`, `banker`) built from 6–9 stacked paper planes (`k.stack` base, articulated twin-parallel bars with tension springs, 4-plane head with dorsal vent fin, outer cowl, recessed inner reflector wall, warm core filament + die-cut cross-baffle, and a 3-tier layered paper beam) | 10 | 10 | 9.5 | 8.5 | 9 | 9.5 | 8 | 9 | 8 | **91.25** |
| **L5** | **L4 + Interactive & Beat-Driven Lamp Choreography**: every station lamp is a live actor in the chapter walk — its head and 3-tier beam pivot in sync (`transform-origin` at the exact world pivot) as the visitor enters the chapter or cues key beats, and every station lamp can be clicked to toggle the day/night theme (View Transition from its bulb) | 10 | 10 | 10 | 10 | 9 | 10 | 8 | 9 | 7.5 | **94.50** |

**Critique & Decision.** **L5** wins at **94.50 / 100** (beating the 90.75 threshold in §1). It turns the lamps from passive background props into a unifying narrative thread across all seven stations while keeping 100 % server-rendered static SVG (`svgString`), compositor-only `transform` acts, and the ≤ 14 layer budget per station.

**Round 5b — Station-by-Station Lamp Architecture & UX Flow**

| Station | Fixture Type | Multi-Layer 2D→3D Paper Anatomy (Back → Front) | Target (`aim`) & Beam Vector | UX Choreography & Interaction |
| --- | --- | --- | --- | --- |
| `01` `#home` **The Desk** | **Architect Counterpoise Desk Lamp** (`architect`) | 3-layer `k.stack` weighted plinth (`gap: 14→40`) → lower twin parallel bars + paper tension spring + counterweight → elbow joint disc → upper arm → 4-plane conical hood (rear collar, outer shade `gap: 60`, fold facet, recessed reflector, warm bulb lip + switch tab) | Aims down-left from `(1184, 316)` onto the laptop keyboard and notebook `(880, 650)`, `spread: 260` | Clicking toggles Light/Dark theme with radial View Transition from bulb + nod animation (`data-lamp-tap`); head tilts `-6deg` in dark mode |
| `02` `#about` **The Pinboard** | **Gallery Gooseneck Barn-Door Lamp** (`barn-door`) | Stacked wood/brass wall pattera `(1262, -26)` → arched multi-segment paper arm with cable clips → cylindrical canister → 4-plane barn-door shade with two angled side flaps (`gap: 24→64`), inner gold reflector and bulb | Aims from `(1118, -14)` to the cork board centre `(875, 255)`, `spread: 275`, framing the photo print and 4 index cards | **Beat 1 (`title`)**: lamp head + light cone swing `-7deg → 0deg` onto the cork board as the title pins; **Beat 2 (`dossier`)**: subtle shift toward the photo print; clickable theme switch |
| `03` `#experience` **The Filing Cabinet** | **Industrial Articulated Clamp Lamp** (`clamp`) | Heavy C-clamp & thumbscrew mounted to the upper-right wall/cabinet rail `(C.x + 498, -14)` → twin-strut boom arm (`gap: 54`) → knurled pivot joint → faceted industrial trapezoidal bell with top heat-fin, inner reflector cone and filament | Aims from `(C.x + 388, -6)` straight into the pulled-out top drawer and hanging folders `(C.x + 225, 258)`, `spread: 220` | **Beat 1 (`title`)**: as the top drawer slides out, the clamp lamp head & beam dip `-8deg → 0deg` to follow the opening drawer mouth; **Beat 10 (`board`)**: camera zooms to the career board while the warm pool anchors the cabinet corner |
| `04` `#services` **The Drafting Table** | **Drafting Board Swing-Arm Study Lamp** (`drafting`) | Clamp & vertical post on the board's upper-right edge `(1186, 126)` → lower & upper Pantograph parallel bars (`gap: 52`) with red oxide tension spring → rotary wrist joint → wide asymmetric drafting shade (`1100..1180`) with visor lip and recessed diffuser | Aims from `(1142, 92)` across the angled blueprint sheet `(850, 340)`, `spread: 265` | **Beat 1 (`title`)**: lamp head and 3-tier beam swing `9deg → 0deg` onto the blueprint; stays locked to the board plane during the `1.5×` camera push-in (`svc-0`..`svc-5`) |
| `04b` `#projects` **The Shadow-Box Gallery** | **Ceiling Track Theatrical Spotlight** (`track-can`) | Overhead track rail bar & sliding adapter box `(1096, -32)` → U-yoke bracket with locking knobs → deep cylindrical stage can (`k.stack` back cap + barrel + side shadow facet + angled glare snoot/louvers + bright lens ring) | Aims from `(992, -22)` directly onto Rifqi's character on the step ladder `(812, 236)`, `spread: 195` | **Beat 1 (`title`)**: spotlight pans `-6deg → 0deg` to catch Rifqi hanging the new frame on the rail; illuminates the figure with a warm rim while the project wire slides behind and below him |
| `05` `#certificates` **The Archive Shelf** | **Library Brass-Paper Picture & Reading Lamp** (`picture-hood`) | Stepped wall bracket mounted above the bookcase `(1088, -18)` → curved swan-neck paper tube + decorative brace → wide horizontal trough reflector hood (`gap: 56`, 3-layer stepped valence, inner cream bounce liner, twin warm bulbs) | Aims from `(986, -12)` onto the four certificate binders on the upper shelf and the open book stage `(772, 214)`, `spread: 245` | **Beat 1 (`title`)**: lamp nods `-6deg → 0deg` as the binders settle and pulse out; casts a warm reading cone over both the shelf spines and the 3D opening `CertBook`s |
| `06` `#contact` **The Mail Tray** | **Classic Banker's Study Lamp** (`banker`) | Tiered square paper plinth on the desk corner `(1500, 424)` → twin brass-paper uprights → gimbal pivots → iconic folded cased-paper hood (sage/oxide outer cowl, bright warm inner lining, pull-chain with paper bead) | Aims from `(1424, 244)` down-left onto the letter tray and the envelope in Rifqi's hands `(1120, 435)`, `spread: 230` | **Beat 2 (`card`)**: illuminates the envelope as the flap folds open and Rifqi hands the card out; interactive `DeskLamp` hit area with pulsing tag and View Transition theme switch |

---

## 2. Brand Identity & Art Direction

### 2.1 Concept: *The Paper Studio*

Rifqi is a **craft-minded Software Engineer (Enterprise .NET/C#/SQL & Fullstack Web)**. The site is **his office, cut, folded and layered from paper inside a deep shadow box**, built with the same precision he applies to enterprise systems. The visitor does not read a page with a picture on top; they **walk through the studio**. Each section is a **station**: one corner of the same office. From v3 each station is a **fullscreen chapter**: the station fills the screen while its information arrives in small paper **beats**, and the camera hands off to the next corner along the office plan (§4).

- **One world:** every station shares the office plan (wall colour, floor line, skirting height, light), and handoffs follow that plan (§4.3), so scrolling *is* turning to the next corner of one room, not visiting six websites.
- **Paper behaves like paper:** information slides, drops, rises, unfolds and comes out of the objects it belongs to; the figure moves in stop-motion. Nothing glows, bounces or floats.
- **One character:** the paper figurine of Rifqi appears at every station, doing that section's job.
- **Real controls inside the world:** folder tabs, project frames, binders and the lamp are real HTML controls that sit exactly on their paper objects.
- **Editorial discipline:** an intentional, architectural paper studio. Never a SaaS landing page, neon HUD, glass dashboard, cartoon room, or generic paper landscape.

### 2.2 Stations (the visitor's walk through the studio)

| # | Section | Station | Scene, back → front | Figurine | Real content on |
| --- | --- | --- | --- | --- | --- |
| `01` | `#home` | **The Desk** — front view through the open shadow box | Jakarta skyline in 3 paper planes outside the window → window frame → wall, shelf with `.NET` `SQL` `C#` binders, pinboard → lamp, speaker → desk, laptop, notebook → figurine → mug, plant → chair back → frame lip | *v3.13 (owner):* life size, standing on the floor in front of the drawers (about 606 units against a 260-unit desk), turned a little toward the desk, near hand resting on the desk top by the laptop (pose `lean`; 3D on capable desktops). Until v3.12 he sat on the notebook, a doll on the desk | Hero text beside/above; live `LaptopScreenUI` on the glass; lamp = theme switch; speaker = sound switch (v3.13) |
| `02` | `#about` | **The Pinboard** — cork board on the wall by the window | Wall → cork board (stacked edge) → pinned sheets at 2–3 depths → pins, one string-free cluster | Bust poster pinned as a "photo" card; full figure pinning a card at the board's edge | Dossier sheet + four index cards pinned to the board |
| `03` | `#experience` | **The Filing Cabinet** — top drawer pulled open, seen from slightly above | Wall → cabinet body → drawer walls → hanging folders (one per role, ordered by year) → drawer front with label holder | Leaning on the cabinet, holding a folder | Each folder = one role, whose sheet comes out of it (v3.5; the `Work` / `Organization` tabs and ledger rows are gone, §4.5 `03`) |
| `04` | `#services` | **The Drafting Table** — angled board under the lamp | Wall → board (tilted plane) → blueprint sheet → ruler, set square, pencil → board edge | Drawing with a pencil | Capability board on the blueprint sheet |
| `04` | `#projects` | **The Shadow-Box Gallery** — wall of small framed shadow boxes | Wall → frames → inside each frame: backing, 3–5 domain sheets from that project's data, the paper laptop with the real screenshot | Hanging a frame | Each frame is a `ProjectCard`; focus or hover separates its layers (depth reveal); opens the case study |
| `05` | `#certificates` | **The Archive Shelf** — binders and boxes on a shelf | Wall → shelf back → binders (one per category, spine label + count from data) → shelf edge | Pulling a binder out | Each binder is a folio control; opening it pulls the binder forward and reveals the rows |
| `06` | `#contact` | **The Mail Tray** — desk corner by the window at the end of the day | Window at golden hour (light) / night (dark) → wall → desk corner → letter tray → envelope, letterpress card, stamp | Sealing an envelope | Letterpress card + correspondence-sheet form; postmark only after a real 2xx |
| — | Footer | **The back of the frame** — kraft backing board | Kraft board, hanging wire, a colophon label | — | Colophon strip |
| — | 404 | **The Empty Drawer** | Open drawer, nothing inside | Peering in | One line + link back to the desk |

Every station composition reserves a **reading lane** (the empty wall third named in §4.5) where beat sheets hold, so text never sits on busy art. Scenes are compositions of the shared prop set (§2.5). A station MUST NOT introduce a prop that has no compositional reason or no tie to Rifqi's data.

### 2.3 Light Story & Station Lamp Architecture (v3.25)

Exactly **one light source per theme**. Every 2D shadow and 3D light follows it; `paper-kit` reads it from tokens (§5.6), never from hand-tuned offsets.

| Theme | Name | Source | Shadow direction | Station arc |
| --- | --- | --- | --- | --- |
| Light | **Workday** | Sun through the window, upper-left | Falls to bottom-right (`+x`, `+y`) | The sun moves through one workday as the visitor walks: `01` morning (cool-warm, medium shadows) → `02`–`04` midday (short, crisp shadows) → `05` afternoon → `06` golden hour (long, warm shadows). Set per station with `--light-len` and `--light-warmth` |
| Dark | **Lamp-On Night** | Each station's paper lamp, upper-right | Falls to bottom-left (`−x`, `+y`) | Constant: night-blue windows, a multi-layered warm paper beam and pool under each station's lamp (`--glow-opacity`) |

**Multi-Layered 2D/3D Papercraft Lamp Standard (`scenes/lamp.tsx`):**
Every station has a physical paper lamp fixture tailored to its architecture (§1.11 Round 5b). To create a strong 3D illusion from 2D paper layers without violating the 14-layer station budget (§9.2):
1. **Two depth-separated scene layers per station** (`lamp` at `z: -60 … -10`, `lamp-light` at `z: +10`), so pointer look (`--k`) and tilt handoffs produce real parallax between the fixture, the target surface, and the light volume in front.
2. **6–9 internal stacked paper planes (`gap: 10 → 64`) inside the fixture layer**:
   - **Mount & base (`k.stack` / `k.sheet`)**: multi-layer stepped plinth, wall pattera, C-clamp with thumbscrew, or ceiling track adapter.
   - **Articulated arm**: twin parallel pantograph bars, curved gooseneck, or U-yoke bracket with paper tension springs, cable clips, and layered pivot discs (`gap: 44–54`).
   - **3D-illusion Lamp Head**: built from at least four distinct depth sheets — (a) rear neck collar / heat-vent fin (`gap: 42`), (b) outer hood/cowl (`gap: 58`, `edge: 4.5`), (c) side fold facet (`--paper-fold` oriented by `--light-x`), (d) recessed inner reflector wall (`--ill-page` / `--ill-sun`, `gap: 8`), and (e) protruding warm bulb core (`--ill-bulb`) with die-cut cross-baffle louvers or barn-door flaps (`gap: 64`).
3. **Volumetric perspective light beam, dust motes & fireflies (`lamp-light`, `z: 10`, v3.26)**:
   - **Perspective surface termination (`plane: 'floor' | 'wall'`, `surfaceY`)**: horizontal targets (`01` desk top, `03` open drawer mouth, `04b` floor beneath Rifqi's ladder at `y: 602`, `05` upper shelf surface, `06` desk surface) intersect the left and right cone rays with `y = surfaceY` (`projectToY`), so the light cone never shoots past the desk or floats its pool in mid-air; vertical/angled boards (`02` pinboard, `04` drafting board) terminate into a soft radial surface wash.
   - **Soft Gaussian refraction & bulb bloom**: 3-tier curved-base cones (`url(#pk-blur-3)` outer penumbra, `url(#pk-blur-2)` mid scatter cone and inner core ray) + warm radial bulb bloom at the hood mouth (`faceMid`) + 2-tier radial surface pool at `poolAt`.
   - **Ambient dust motes & fireflies**: 14 deterministic dust specks (`.lamp-mote`, `lamp-mote-drift`) floating inside the light cone, and 5 glowing fireflies (`.lamp-firefly`, `lamp-firefly-orbit`) with warm radial halos orbiting gently around the lamp and upper beam (paused under `prefers-reduced-motion`).
4. **Synchronized Beat Choreography & Interactive Theme Switch**:
   - Each chapter's opening beat (`title`) cues a synchronized swing of both `lamp` and `lamp-light` around the exact pivot (`origin` in `%` of each layer's cropped `box`), so the beam never detaches from the lamp head.
   - Every station renders an interactive `DeskLamp` hit area over its fixture (`pointerOnly` on chapter stages `02`–`06`), allowing the visitor to toggle Day/Night theme from any section's lamp with a radial View Transition from the click point and a springy nod (`data-lamp-tap`).

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
- **Forbidden materials:** glossy plastic, chrome, glass/`backdrop-blur`, neon glow, photoreal skin shaders, random glossy 3D toys. *v3.11 owner exception:* the scrim behind the open EQbot chat blurs and darkens the page (`backdrop-filter` in CSS, never the Tailwind class; no panel sits on frosted content; none under `prefers-reduced-transparency`).
- **Readability first:** body text and controls sit on clean content sheets (`bg-raised`), placed in front of the scene, never on busy art. A sheet over a scene casts a real paper shadow onto it (§5.4).
- **Never obstructive:** no splash screen, no forced intro, no gated content. *v3.11 owner exception:* a two-page welcome tour (`WelcomeTour`, `PaperDialog sm`; the second page `md` from v3.13) opens once per browser on the first visit, 1.2 s after load; it is skippable, closes on Escape or the backdrop, and never returns (local storage). Automation does not see it unless `?welcome` is in the address. The page is fully usable without WebGL, without scroll-driven animation support, and with JS slow or off.

### 2.7 Character Specification — Rifqi Paper Figurine

Derived from the owner's turnaround reference (front, ¾, side, back, ¾-back, plus head close-ups).

| Feature | Reference | Paper translation |
| --- | --- | --- |
| Build & pose | Average athletic build, relaxed standing pose, arms down | ~4.5 heads tall paper puppet (flat cut-out sheets on joints, `figurine-parts.ts`); hero pose (v3.13) `lean`: standing life size beside the desk, near hand on the desk top |
| Hair | Black tight curls on top, low taper fade on sides and back | **Quilled paper curls** (coiled paper strips) on top; short flat-cut paper planes for the fade |
| Face | Light warm skin (v3.9, owner), white almond eyes (`--ill-eye`, white in both themes, v3.10) with a dark pupil and a white glint, straight brows, calm slight smile | Flat-shaded planes; eyes as white almond cut-outs with a lash strip, a round pupil and a glint dot (v3.9, owner); brows as thin paper strips, mouth as a single subtle fold. No realistic skin, no open mouth, no teeth |
| Top | Fitted black crew-neck t-shirt | Charcoal cardstock (`--ill-shirt`), never pure black |
| Bottom | Medium-blue faded straight-fit denim | Two-tone denim paper (`--ill-denim` + `--ill-denim-fade` on thighs and knees) |
| Shoes | Grey running sneakers, white midsole | Grey paper upper + off-white sole. **No brand marks** |
| Station poses | — | Static posters from `RifqiFigurine crop="wide"` and `figurine-parts.ts`: `pin` (About, arm up to the cork board), `folder` (Experience, arm over the drawer), `draw` (Services, hand on the board), `hang` (Projects, both arms up on the ladder), `binder` (Certificates, reaching to the shelf), `seal` (Contact, both hands at the envelope), `peer` (404, looking into the empty drawer). v3 adds the stop-motion partners `reach` (arm out, handing a sheet) and `hand` (holding a card out to the viewer) |

Rules:

- One character identity everywhere, drawn from one set of parts (`figurine-parts.ts`): Hero (3D sheets or poster), every station pose (§2.2), About bust, EQbot avatar (head crop with expression parts), 404.
- Station poses (`pin`, `folder`, `draw`, `hang`, `binder`, `seal`, `peer`, `reach`, `hand`) are static server-rendered posters with the full paper material (§2.4). At a station they change in **stop-motion**: 2–4 pose layers per chapter swapped by `opacity` at beat boundaries (§10.2). The 3D puppet animates only in `01`.
- Never photoreal, never uncanny. Flat paper sheets with real thickness.
- Non-blocking: no cursor-chasing, no walking across text, no gating navigation. *Owner exception (v3.9):* in 2D views the pupils (`look` parts, `.fig-look`) follow the pointer by up to 2.6 × 1.5 poster units (`FigureGaze`, fine pointer only, off under reduced motion); the figure itself never moves toward the pointer. In 2D the eyes blink every 5.6 s and station figures breathe (1 % lift), CSS only. Motion is limited to the clips in §10.2, all on demand: one wave per session, look at the laptop, a glance at the lamp on theme change, a thinking pose while EQbot is open, and a 120 ms blink every 4–7 s only while the stage is on screen.
- The reference photos are personal data. They MUST NOT be committed to `public/` or the repo; keep them in private storage.
- *v3.6:* the owner's published portrait (`public/assets/me.png`, the About photo of v1 on `main`) is not a reference photo; the owner asked for it on the About board. It is the only photograph of the owner on the site, never a source for the figurine.

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
| Motion | Counters animating from 0; shimmer borders; hover `scale`/3D tilt; floating loops; staggered fade on every element; parallax on text; text moving while it is read; beat origins picked for "variety" instead of from the paper's source (§4.1) |
| Copy | "Hi, I'm X 👋"; "Let's build something amazing together"; "passionate", "cutting-edge", "seamless", "leverage", "elevate", "unleash"; emoji in headings; rotators cycling buzzwords |
| Components | Unmodified shadcn/ui or template blocks; Lottie characters; stock illustrations (unDraw, Storyset, …); AI-generated images |
| Paper-craft clichés | Generic paper landscapes unrelated to Rifqi (mountains, pine forests, swirl clouds, hot-air balloons, winding rivers); swirl-cloud frames; teal-only monochrome; the "AI papercraft render" finish (plastic sheen, mushy fibre, melted details, nonsense text); isometric office asset packs; stock paper-cut vectors; random rotations to look "handmade" |
| Fake depth | Large blurred `box-shadow` on UI cards as decoration; shadows that ignore the light model; parallax on text; depth without a light-consistent cast shadow; full-stage transparent layers stacked to fake depth |
| Template motion | Preloader counters; cursor-follower blobs, custom cursors, magnetic buttons; split-text letter or word reveals; scroll-snap sections; horizontal scroll-jacked galleries; marquee text; generic "scrollytelling" kits (GSAP ScrollTrigger demos, Lenis smooth scroll, fade-up-on-scroll on every block); full-bleed hero video or Lottie stand-ins for the paper scene |
| Icons | Mixing icon libraries; emoji as icons; filled + outlined icons mixed |

### 3.3 Authenticity Tests (every new component, scene and beat MUST pass all eight)

1. **Swap test** — If the name were replaced with another developer's, would the component still make sense unchanged? Then it is generic: tie it to Rifqi's real data, stack, or desk.
2. **Material test** — Can you point to the paper property it shows (cut edge, fold, layer offset, grain, tape)? If not, it is "flat UI".
3. **Light test** — Do its shadows follow `--light-x` for the current theme?
4. **Fact test** — Is every number, company, link, and claim traceable to `src/data/portfolio.ts`? Nothing invented.
5. **Purpose test** — Remove it. If nothing is lost for the visitor, delete it.
6. **Depth test** — Can you name every layer's depth band (§2.5), and does its cast shadow grow with its gap and follow the light? If not, it is a sticker, not paper.
7. **Station test** — Does the scene's subject come from Rifqi's real work, data or office (§2.2)? A pretty object with no tie to him fails, however good it looks.
8. **Choreography test** — For every beat: can you name its origin (§4.1) and say where that paper physically comes from in the scene? Does the scene act for it? Does its text hold still? If not, it is a template fade.

### 3.4 Copy Voice

- Plain, specific, first person. Name systems, industries, and stacks (".NET 8 Web API for a telecom tower inventory" beats "scalable solutions").
- Short sentences. No hype adjectives. No exclamation marks in UI.
- EN and ID written as equals; ID is never a machine translation left unreviewed.

---

## 4. Section-by-Section UX Blueprint & Visitor Journey — *Walkthrough*

The following MUST all match exactly: render order, `data/sections.ts` order, StudioRail order and chapter order.

`01 #home` → `02 #about` → `03 #experience` → `04 #services` (+ `#projects`) → `05 #certificates` → `06 #contact` → footer.

### 4.1 The Model: Chapters, Stages, Beats, Acts, Handoffs

| Term | What it is | Rule |
| --- | --- | --- |
| **Chapter** | One section as a scroll track (`section.chapter`, its height = its beats) | Self-contained: its own stage, beats and timeline (`view-timeline: --ch-<id>`). A chapter never reads another chapter's timeline |
| **Stage** | The station's scene, pinned fullscreen while its chapter scrolls (`position: sticky; top: 0; height: 100svh`) | `aria-hidden`; ≤ 14 layers; framed by the shadow-box lip on the viewport edges; composed state = the authored v2 station, re-framed to the viewport |
| **Beat** | One small piece of information on its own paper sheet, in document flow, scrolling over the stage | ≤ 1 idea, ≤ ~60 words or one control group; has an **origin**, a **hold** and an **exit**; never moves while it is meant to be read |
| **Act** | What the scene does for a beat (drawer slides out, folder rises, binder is pulled, lamp swings, envelope opens, figure changes pose) | Bound to the beat's own view timeline; compositor-only (`transform`, `opacity`) on stage layers |
| **Handoff** | The camera move from one chapter to the next | Direction comes from the office plan (§4.3); the outgoing stage leaves one way while the incoming stage arrives from the other, both scrubbed by scroll |

**Beat origins (the only five):**

| Origin | Paper meaning | Typical use |
| --- | --- | --- |
| **Drop** (from above) | A sheet lowered onto the board, pinned or clipped | Chapter titles, pinned cards, tracing overlays |
| **Rise** (from below) | A sheet pushed up from the desk or tray edge | Forms, ledgers, long lists |
| **Slide** (from the side) | A sheet slid across the desk or handed in from where the figure stands | Detail sheets, the figure's hand-offs |
| **Emerge** (from an object) | The paper comes out of the scene object it is about, from behind its front edge | Folder → role sheet, binder → certificate list, envelope → card, frame → case study, notebook → metric tickets |
| **Unfold** (in place) | A folded sheet opens along its crease | Dossier, case-study sheet, capability board |

Origins are chosen by **what the paper is and where it comes from in the scene**, never for variety. Two consecutive beats in one chapter MAY share an origin.

### 4.2 Journey at a Glance (desktop)

| Scroll | Chapter | Visitor sees | Visitor does |
| --- | --- | --- | --- |
| 0 (load) | `01` Desk | Fullscreen desk at morning light; name, role, value, CTAs on the title sheet; the figure waves once | Reads, clicks **View projects** / **Download CV**, or scrolls |
| 0–220 svh | `01` | Metric tickets emerge from the notebook; the camera pushes in to the laptop; the screen UI becomes the focus | Clicks the lamp (theme) or the screen buttons |
| Handoff | `01 → 02` | **Pan right** along the wall to the pinboard | — |
| ~3–6 screens | `02` Pinboard | Title drops and pins; the dossier unfolds out of the photo card; four index cards are pinned one by one by the figure | Reads bio, education, industries; **Download CV** |
| Handoff | `02 → 03` | **Tilt down** to the filing cabinet below the board | — |
| ~6–10 screens | `03` Cabinet | The drawer slides out; the newest folder rises and opens into the current role; the remaining folders fan up and the ledger rises | Switches Work / Organization, opens any role |
| Handoff | `03 → 04` | **Tilt up and pan** to the drafting table under the lamp | — |
| ~10–13 screens | `04` Drafting | Cover sheet slides off the blueprint; four tracing overlays (Backend, Data, Frontend, Tooling) drop onto it | Opens *Additional skills* |
| Handoff | `04 → 04b` | **Pan right** to the gallery wall | — |
| ~13–17 screens | `04b` Gallery | Frames are hung one by one; each project frame is a real card | Opens a case study (frame → sheet morph), *View all projects* |
| Handoff | `04b → 05` | **Dolly out and pan** to the archive shelf | — |
| ~17–20 screens | `05` Archive | Binders are pulled forward one by one with their counts | Opens a binder; the list emerges |
| Handoff | `05 → 06` | **Pan right** back to the window, golden hour | — |
| ~20–23 screens | `06` Mail | Letterhead drops; the card slides out of the envelope; the correspondence sheet rises from the tray | Copies email, sends a message (postmark after a real 2xx) |
| Closing | `06 → footer` | **Turn-over**: the whole shadow box turns to show its kraft back | Footer links, language, theme |

### 4.3 The Office Plan and the Handoff Map

The office is one room seen from its centre. The camera walks it clockwise, so every handoff has a physical reason.

```
                 north wall
   [06 Mail Tray]   [window]   [01 Desk]   [02 Pinboard]
                                            [03 Cabinet] (below the pinboard)
   west wall                                 east wall
   [05 Archive]   [04b Gallery wall]   [04 Drafting Table]
                 south wall
```

| Handoff | Camera move | Outgoing stage | Incoming stage | Range |
| --- | --- | --- | --- | --- |
| `01 → 02` | **Pan right** | leaves to the left (`translateX` 0 → −100 vw) | arrives from the right | `exit` of `01` = `entry` of `02` (100 svh, §9.7) |
| `02 → 03` | **Tilt down** | moves up (natural scroll, no counter-transform) | rises from below | same 100 svh |
| `03 → 04` | **Tilt up** | sinks (`translateY` → +200 svh against the natural −100) | drops in from above | same. W2: a diagonal tilt-and-pan left two empty viewport corners between the stages, so the move is vertical only |
| `04 → 04b` | **Pan right** | left | from the right | same |
| `04b → 05` | **Dolly out + pan** | pans left while its scene (the `.stage-canvas`, not the stage box) pulls back to 0.86 | pans in from the right while its scene settles 1.12 → 1 | same. Scaling the stage box itself left bare page around it |
| `05 → 06` | **Pan right** (to the window) | left | from the right; the light arc warms to golden hour during the move | same |
| `06 → footer` | **Turn-over** | the frame turns edge-on (`perspective(1600px) rotateY(0 → −90°)`, held in place) while the footer, which *is* its kraft back, rises over it | — | `exit 0% → 50%` of `06` (the footer is shorter than a viewport, so the full exit range is never reached) |

The `01 → 02` move lives in `scene.css` (the hero is not a chapter: its controls are live HTML): over the hero's `exit` range it holds still, pushes in to the laptop (`scale 1.14`) while the title column steps aside over the first 40 %, then pans left; only at ≥ 1280 × 800, where the hero is one screen tall. During a handoff both stages are visible. The last beat of a chapter exits during the first 25 % of its handoff (its `exit 0% → 25%` range starts where the chapter's `exit` range starts); no other sheet moves during a handoff.

### 4.4 Beat Anatomy (every beat follows it)

*v3.3 — cued paper (§1.10).* Scroll position decides **which** beat is on; the sheet then plays its whole flight **in time**. Text never travels with the wheel.

1. **Deck and track** — a chapter's pinned sheets live in `div.beat-deck`, one sticky `100svh` layer, in reading order. Each pinned beat also owns an empty `div.beat-track` of `40svh + hold` (after a `35svh` lead-in; a `70svh` tail ends the deck). `ChapterCue` (an `IntersectionObserver`) turns a beat on while its track is under the viewport's middle line.
2. **Sheet** — the paper (`.paper-leaf`: cardstock tile under the sheet tone, lit top edge, `--sheet-shadow`, one fold at most), placed absolutely in the stage's **reading lane** at `--beat-top`, the empty wall area each station composition reserves (left or right third, §4.5). Mobile: full width in flow below the split stage.
3. **State** — `data-state` = `before | in | after`, `data-dir` = `fwd | back | none` on the beat; `data-beat` (the active id) and `data-reached` (ids reached) on the chapter. `none` = set without playing (page load, or a beat jumped over).
4. **Entrance** — the origin's flight (`--dur-leaf-in`, `--ease-leaf`): the sheet bends about its leading edge, overshoots a little and lies flat (`transform: none`). Back from the next beat: the exit played in reverse.
5. **Hold** — fully composed and still for as long as its track is under the line; scrolling inside the track moves nothing.
6. **Exit** — `--dur-leaf-out`: lifted by its near edge and carried up and off (slides go back the way they came). Back to before: the entrance played in reverse.
7. **Act** — the scene's change for this beat, a transition (`--dur-act`) keyed to `data-reached` / `data-beat`, so the object moves as the sheet flies; poses swap in time (`--dur-pose` per swap) while the beat is on; sub-steps land one after another once the sheet has settled (`--gap-step`).
8. **Emerge occluder** — for Emerge beats only, a cut-out copy of the object (envelope, drawer front) sits above the sheet for the first 60 % of its entrance, so the paper appears to come out from behind it.
9. **Safety** — keyboard focus into an off sheet cues it (track scrolled under the line) and composes it at once; off sheets stay in the accessibility tree; in the fallback layouts the beat is a plain sheet.
10. **Long beats** (`hold: 'flow'`) are not pinned: they scroll as normal pages after the deck and rise off the tray once, the first time they come into view (`data-shown`).

### 4.5 Chapter Specifications

Hold values are in `svh`. "Lane" is the reading lane on desktop.

#### `01` `#home` — The Desk (track ≈ 220 svh, lane left)

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Title (in HTML at load, **never animated in**) | Eyebrow `01 — Software Engineer`, `h1` name (LCP), static role line with caret, value ≤ 2 lines, **View projects**, **Download CV** | — | The 3D figure waves once (capable desktops); the poster otherwise |
| 2 Proof | The four metric tickets (`5`, `100+`, `3+`, `30+`) | In the title column in the server HTML. *W3:* at ≥ 1280 × 800 they come out of the notebook on the desk once, on load (`ticket-emerge`, `--dur-leaf-in`, 110 ms apart), not on scroll: they are first-screen facts | — (the notebook cover does not lift: the hero desk is not a chapter stage) |
| 3 Screen | `LaptopScreenUI`: current role and company, core stack, **Open projects**, **Ask EQbot** | — (it lives on the glass) | Camera pushes in to the laptop (hero push-in, `z` +160); the Front band drops away; the title sheet exits left |

Clicks: lamp = theme (View Transition from the bulb), laptop hover/focus = figure looks at it.

#### `02` `#about` — The Pinboard (595 svh as built, lane left of the board)

*v3.6, owner request:* the owner's photograph (`public/assets/me.png`, the v1 About photo) replaces the bust on the board; it comes forward beside the bio and goes back; every fact on the board comes forward in turn. *v3.25:* a Gallery Gooseneck Barn-Door Lamp (`barn-door`) mounted above the right side of the board swings its multi-layer hood and 3-tier beam onto the cork board on the title beat and acts as a theme switch.

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Title | Eyebrow, `h2` | Drop, lands on a pin | Barn-door lamp head and 3-tier light pool swing onto the cork board (`rotate(-7deg)` → `none`) |
| 2 Dossier | Bio paragraphs, **Download CV**, **Get in touch** | Unfold | The pinned print (`photo` layer, HTML `.pin-print`) comes off the board to stand beside the bio (act `out`: moved only while the dossier is on, so it is pinned back when the visitor scrolls on) |
| 3 … 6 Index cards | One sheet per `aboutHighlights` entry: *Pinned 0n / 04*, icon, `h3`, description (`grid` group, v3.19) | Emerge off that card on the board (`PIN_CARDS`; occluder `[]`, nothing is in front of the board) | That card pales to 20 % once its sheet is out (act `off`, property `opacity`); stop-motion `pin` ↔ `reach` once per card |
| 7 Tidy (v3.20) | Short closing note | Rise | Releases the `grid` group: the four sheets fold small and fly back to their cards on the board |

Folio (< 768 px): the photograph is printed at the top of the dossier (`md:hidden`), as on `main`.

#### `03` `#experience` — The Filing Cabinet (805 svh as built, a record chapter §4.6, lane left over the kraft boxes)

*v3.5, owner request:* every role comes out of its own folder with the same flight; the ledger list is gone. *v3.19–v3.23:* each role sheet folds and pins to the career board when the next role arrives; the closing `board` beat zooms in on the board and runs a comet of light along the Work and Organization paths. *v3.25:* an Industrial Articulated Clamp Lamp (`clamp`) mounted above the cabinet dips its multi-layered bell hood and 3-tier spotlight beam into the open top drawer as the drawer slides out.

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Title | Eyebrow *Files*, `h2`, lede with the role counts, total work experience | Rise | The top drawer slides out toward the camera; folders show their year tabs; the industrial clamp lamp and its 3-tier beam dip (`rotate(-8deg)` → `none`) into the open drawer |
| 2 … 7 Work roles | One sheet per `workExperience` entry, newest first: *Work · 0n/06*, role, company, place, highlighted `RoleDates`, short description, **Open the file** | Emerge from that role's folder (`folderMouth(n, i)`: under its tab, up past the drawer front; occluder `drawer-front`) | That folder lifts (`translateY(−58px)`) while its beat is on (`#experience[data-beat]`, station CSS); leaving folds and pins it to the career board |
| 8 … 9 Organization roles | The same sheet for each `organizationExperience` entry | Emerge from its folder | Reaching the first one swaps the drawer's folder set to the organisation folders (`data-reached`, `scene.css`); its folder lifts |
| 10 Career board | Closing summary sheet | Rise | Camera zooms into the career board; comet light runs each path from START to NOW and sets off a firework; clicking any pin peeks its card back into the lane (v3.23) |

Clicks: **Open the file** opens the full entry (photo, what was shipped, logo, stack) in the standard paper dialog (`ExperienceFile`, `PaperDialog` §7); the sheet itself stays short enough to pin. *v3.6, owner request:* each role sheet carries its photograph from the v1 data (`entry.image`: `phr-momen`, `brin-momen`, `javan`, `fif`, `gdsc`, …; a `.png` is a logo and sits on paper) taped to its corner (`.role-photo`). Folio (< 768 px): the same sheets as plain blocks.

#### `04` `#services` — The Drafting Table (665 svh + tools as built, a record run §4.6, lane right)

*v3.6, owner request:* the services come off the blueprint as a pile of sheets, and the front sheet is swapped to the back in turn. The tabs are gone. *v3.25:* the Drafting Board Swing-Arm Study Lamp (`drafting`) is upgraded to a multi-layered pantograph fixture with tension springs, asymmetric visor hood, recessed diffuser, 3-tier directional beam, and interactive `DeskLamp` switch.

*v3.9, owner request (camera):* while any `svc-*` beat is on, the camera pushes in: `.stage-canvas` scales by `--svc-z` (1.5) about the board's centre (world 850, 304) and translates it to (50 cqw, 50 svh + 2 rem); the written service uses the same mapping, so it stays on the board. The fit (§9.1) guarantees 1.5 × the board fits. Leaving the service beats zooms back out (1.1 s, `--ease-paper`). *v3.11 (owner: Services broke on other ratios):* the written services are `.stage-sheet`s, so `ChapterFit` no longer measures their tilted box; before, on wide-short screens (1366 × 768, 1920 × 1080, 21:9) that box passed 70 % of the viewport and the whole chapter fell back to the stacked studio. The written text may grow to 36 px on very large screens.

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Title | Eyebrow *Blueprint*, `h2`, lede | Drop | Pantograph drafting lamp head and 3-tier light pool swing toward the board (`rotate(9deg)` → `none`) |
| 2 Core stack | Backend, Data, Interface as three tracing-paper overlays (`.tracing`, 3 sub-steps) | Drop | The cover sheet slides off the blueprint (act `off`); stop-motion `draw` ↔ `reach` |
| 3 … 8 Service blueprints | One `.blueprint-leaf` sheet per service, Development then Interface design: area, *0n / 06*, `h3`, body, three points | Drop (first); then a `stack` group | All six lie in one pile, the top three visible, stepping up and back (`--d`). Each beat **tucks** the front sheet: lifted off the pile, then slid under it; scrolling back brings it out from under. Stop-motion `draw` ↔ `reach` once per sheet. *v3.7, the stage does it too:* a pile of six blueprints (`plans` layer, `drafting/plans.tsx`) lands on the board at the first service; each sheet carries its own drawing in the board's perspective (app window and gears, database cylinders, dashboard, desktop and phone wireframes, linked prototype screens, monogram and swatches); each beat tucks the front sheet under the pile on the board, in step with the HTML pile, and the next drawing **inks itself in** (stroke draw, `pathLength` 1, then fills) *v3.8, owner request ("the text straight on the board"):* in the theatre each service is **written on the front blueprint**: the sheet loses its paper and lies in the board's plane (world 476 … 1224 at the board's foot, `perspective(1312) rotateX(30deg)` about that edge maps it onto the board's corners), its text on the left of the blueprint in page white, the drawing at 42 % on the right; it is wiped in once the pile has tucked the last sheet under. The services are no longer a `stack` group; the camera is closer on the board (theatre 1640 × 1025) and the set square sits on the board's edge. Outside the theatre they stay blueprint sheets |
| 9 Tools | Tooling, **Additional skills** (dialog), design tools, Figma workspace | Rise, in flow | — |

#### `04b` `#projects` — The Shadow-Box Gallery (395 svh + archive as built, lane none for the wire; its own `section`, after `#services`)

*v3.6, owner request:* the projects hang as cards on a wire that moves sideways like a hung gallery. *v3.9:* eight featured projects (MejaScalp and BukuDompet first), four `wire-*` segments. *v3.25:* a Ceiling Track Theatrical Spotlight (`track-can`) with overhead track rail, U-yoke, deep cylinder barrel, glare louvers and lens ring swings onto Rifqi's character on the ladder on the title beat and is an interactive theme switch.

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Title | Eyebrow `04b`, `h2` *Selected work*, lede | Rise | The new frame is lifted onto the rail; track spotlight and 3-tier beam pan onto Rifqi's character (`rotate(-6deg)` → `none`); stop-motion `hang` ↔ `reach` |
| 2 … 5 The wire | The eight featured projects, two `ProjectCard`s per segment, each hung from the wire by a string and a clip (`.rail-seg`, `.rail-card`) | A `rail` group | The segments sit side by side on one wire (`--x`); each beat slides the wire sideways, **in time**, to the next pair, and the pair swings once on its clips. Neighbouring segments show at the edges, at 35 %. Before the group the wire waits to the right, after it to the left. *v3.7, the stage is the wire:* the picture rail carries the projects as framed photos (`GalleryStation` `hung`), two per segment, and slides with the cards (one shared scale, `--ws`: a pair 2 × 230 world units apart, pairs 980 apart); the pair in front swings on its nails; each card hangs under its frame as the label (title, kind, stack, case study; the screenshot is in the case study). Stop-motion `hang` ↔ `reach` once per segment |
| 6 Archive | **Open the archive** (dialog), filters and search inside | Rise, in flow | — |

The wire moves on vertical scroll as a cued camera move; it is not a horizontal scroller (§10.2, §3). *v3.8, owner request ("can be swiped sideways and scrolled down"):* it also moves sideways: a horizontal drag or swipe on the cards (`touch-action: pan-y`; a drag never opens a card), a trackpad swipe or shift + wheel, `←`/`→` on a focused card, and the round **‹ ›** buttons beside the pair (`RailNav`); each scrolls the page to that segment's track, so the cue stays the one source of truth. The frames hold the **project photos** (the project `image` through the Next image optimiser as an SVG `<image>`, a phone screenshot shows its top), not the motifs. Clicks: a card opens its case study with the **frame → sheet morph**; cards reach the one `ProjectShelf` through the `shelf:open` window event.

#### `05` `#certificates` — The Archive Shelf (475 svh + folios as built, lane right)

*v3.25:* a Library Brass-Paper Picture & Reading Lamp (`picture-hood`) with stepped wall bracket, curved swan-neck arm, wide 3-layer trough reflector hood and twin warm bulbs nods onto the upper shelf binders and open books on the title beat and acts as a theme switch.

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Title | Eyebrow, `h2`, lede | Rise | The binders settle onto their shelf; library picture lamp and 3-tier reading beam nod onto the books (`rotate(-6deg)` → `none`); *W3:* then each binder is pulled half out and pushed back, left to right (act mode `pulse`, 260 ms apart) |
| 2–5 Books (v3.11, theatre) | One book per category: the left page (the cover's back) has the book number, the category and its count, then the first half of the certificates; the right page the rest and *Scroll on*. Each certificate is a link (title, two-line description, arrow) | The book flies from its binder to the middle of the stage, closed, then the cover turns on the spine (0.85 s); leaving, the cover closes and the book flies back and fades onto the shelf (1 s); the next book waits 0.85 s | Its binder fades off the shelf while the book is out (act `opacity`, `out`) |
| 6 Folios (stacked, folio) | The four category `Folio` controls with counts, in flow (an open folio grows; a pinned sheet would outgrow the viewport). Hidden in the theatre, where the books replace them | Rise, in flow | Opening a folio pulls its binder (existing `:has()` rule; switched off in the theatre) |

Clicks: opening a binder makes its list **emerge** from the binder (the existing binder-tilt rule + the sheet's open transition).

#### `06` `#contact` — The Mail Tray (225 svh + form + footer turn-over as built, lane left)

*v3.25:* the Mail Tray lamp is upgraded to a multi-layered Classic Banker's Study Lamp (`banker`) with stepped plinth, twin uprights, folded cased-paper hood, pull-chain bead, and 3-tier beam onto the letter tray and envelope.

| Beat | Content | Origin | Act |
| --- | --- | --- | --- |
| 1 Letterhead | Eyebrow, `h2`, one line | Drop | Banker's lamp head and 3-tier beam settle onto the letter tray (`rotate(6deg)` → `none`); golden-hour light (light theme) / lamp (dark) |
| 2 Card | Letterpress card: email + copy, LinkedIn, GitHub, WhatsApp, Jakarta | Emerge from the envelope (occluder: the `letters` layer) | The flap folds open (`scale` 1 → −1 on its top edge, in the occluder copy too); the tray slides forward; *W3:* stop-motion `seal` → `hand`, held for the beat (`end: 'alt'`) |
| 3 Form | Correspondence sheet: name, email, message, honeypot | Rise, in flow | — |

Send: sending → the postmark lands on the envelope and the sheet only after a real 2xx; failed → oxide error, retry, direct email. Never a fake success.

#### Footer — The Back of the Frame

Reached by the **turn-over** handoff: the shadow box turns to its kraft back (staples, D-rings, wire). The footer content sits on the kraft label: name, section links, language and theme, year, "Built with". In the fallbacks the footer is the static `FrameBack` strip.

*v3.10 layout (owner: "more professional"):* under the kraft strip, on ink: (1) a call to action — the availability with a live dot, a serif line, **Write to me** and **Download CV**; (2) four columns — studio (lockup, one line, city), index (`pageSections`), contact (email, phone, LinkedIn, GitHub, WhatsApp, each with an icon box), studio settings (theme, language) and the colophon; (3) a legal bar — year and name, *Back to top*. *v3.12 (owner):* the settings and colophon column is gone (theme, sound and language live in the navbar); three columns remain.

#### StudioRail, chapter bar & EQbot

- **StudioRail (≥ 1440 px):** vertical paper index `01`–`06` with the active chapter marked (`IntersectionObserver` on chapters, no scroll listeners). Each index is a link to the chapter start.
- **Chapter bar (< 1024 px):** a thin paper strip under the navbar: `03 / 06 · Experience` and a *Next* link. No progress animation beyond the existing hairline.
- **Skip chapter:** a visually hidden, focusable link at the start of every chapter ("Skip to Experience").
- **EQbotCompanion (v3.9, owner):** still scripted and factual, opened from the bottom-right launcher. Open, it is a wide panel: the chat (31 rem) on the right, a paper scrim over the page (click closes to the tab), and at ≥ 900 px the host, Rifqi's full figure, standing beside the chat on the left. He waves on the greeting, holds `think` with a thought bubble while the answer is typed, and opens his hand toward the chat (`explain` pose) when it lands; each answer pops out from his side as a speech bubble with a tail toward him. Choices are paper chips. Under 900 px the chat stays alone. Reduced motion: no hops, pops or sways.
- **Lamps (v3.10, owner):** the Mail Tray lamp (`06`, desktop) is a theme switch like the desk lamp (`DeskLamp`, `.mail-lamp`). Until a lamp is used once this visit (session storage), it carries a pulsing ring on its head and a taped tag *Tap the lamp* / *Ketuk lampunya*; a tap makes the lamp nod on its base (`data-lamp-tap`).
- **Papercraft micro-interactions (v3.10, owner):** `StagePoke` hit-tests the scene layers under a fine pointer (layers never take the pointer, §9.2): an object-sized layer lifts (`data-hover`, `scale` 1.025), a click on empty stage wobbles it (`data-poke`) or makes the figure hop, with a `pop`. Wall, floor, sky, window, desk, board and other large layers are never touched. Individual `scale` / `rotate` transitions only, so handoff transforms, scroll-driven animations and the pointer look are untouched. Ambient: the pinboard plant sways. Off under reduced motion and for coarse pointers.
- **Poke splash (v3.11, owner; v3.12 smaller):** a click on the figure (any `figure*` layer, at any zoom) makes it hop and says *Ouch!* at the click point: the word in accent italic with a paper-coloured outline (no card behind it), nine accent droplets and four short ink dashes flying out; under 1 s, a synthesised `ouch` cue (a paper thwack and a short yelp); decorative, off under reduced motion.
- **Wayfinding hint (v3.10, owner):** after 13 s without scroll, click or key, `SectionHints` shows where the visitor is and what comes next (*03 / 06 Experience · scroll on to 04 Services*); repeats after every long pause.
- **Section hints (v3.9, owner):** `SectionHints` raises a paper tag with a small animated drawing at the bottom centre when the visitor pauses in a section not hinted yet this visit (session storage): a mouse wheel (fine pointer), a finger swiping up (touch), a hand dragging the wire (`04b` theatre), a tap (folios, folio projects), a pencil (contact). It leaves on scroll, click, key or after 5.2 s, never covers a dialog, and is `role="status"`.

#### 404 — The Empty Drawer

A single short chapter without a track: the drawer slides out empty (one act, on load, ≤ 600 ms, skipped under reduced motion), the figure peers in (`peer`), one line of copy, a link back to the desk.

### 4.6 Track Budget

| Limit | Desktop | Mobile (split stage) |
| --- | --- | --- |
| Hold per beat | 30–60 svh; each pinned beat's track is `40 + hold` svh (v3.3: sheets no longer ride the scroll, so the old 100 svh rise is gone) | content height |
| Sub-step inside a beat | ≥ 10 svh | collapsed: the group arrives as one |
| Chapter track (excluding in-flow lists) | ≤ 600 svh, measured as `35` (lead-in) `+ Σ (40 + hold)` per pinned beat `+ 70` (tail); the validator in `chapter/spec.ts` enforces it | content height |
| Record chapter (v3.5) | A chapter whose beats are one entry each, replacing an in-flow list (`records: true`; today `03` Experience): ≤ 880 svh (v3.19; was 800 before the career board's closing beat), and every entry holds exactly 30 svh. The validator enforces both | content height |
| Whole page (excluding in-flow lists) | ≤ 3,000 svh (v3.20; was 2,900 before the About `tidy` beat; v3.5: was 2,400 before `03` turned its ledger into nine pinned beats; as built ≈ 2,820) | ≤ 1,600 svh |
| Handoff | exactly 100 svh | exactly 100 svh |

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
| `--ill-eye` | `#FBF8F2` | `#E6DFD2` | The figure's eye white and glint (v3.10: `page` turned the eyes dark at night) |
| `--ill-skin` / `--ill-skin-shade` | `#E9C4A3` / `#CF9F7F` | `#C39878` / `#A37A5E` | Figurine face, arms (lighter, v3.9 owner) |
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
| `--scrim-paper` | flat `--color-paper` at 78 % (light) / `--color-raised` at 82 % (dark); never blurred | Tablet reading lane over the stage (§8) |
| `--beat-top` | `clamp(5rem, 14svh, 9rem)` desktop; `calc(46svh + 0.75rem)` split stage | Sticky top of beat sheets (§4.4) |
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

The chapter stage sits in `--z-scene-*`; beat sheets and occluders sit in `--z-content-ui`; the occluder is the sheet's sibling, painted after it. Inside a `ShadowBox`, layers are ordered by depth (DOM order from far to near, each with its `--k`, §9.2), not z-index; the whole scene sits in `--z-scene-*` and content sheets in `--z-content-ui`.

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
| `PaperDialog` | `ui/PaperDialog.tsx` | native `<dialog>`; **the one modal (v3.6 standard)**: header = mono accent eyebrow, serif title (labels the dialog), lede, 44 px close; body = the only scrolling part (focusable); optional footer of actions; sizes `sm` 36 rem, `md` 52 rem, `lg` 72 rem, `drawer` full screen; the sheet is a `paper-leaf` with a folded corner | open, closing | `showModal()`, `Escape` closes, focus restored to the trigger, backdrop click closes, `::backdrop` = ink at 45 %; unfolds from its top edge (`pd-unfold`, `--dur-leaf-in`), still under reduced motion. No dialog builds its own header or close button |
| `Stamp` | `.stamp`, `.postmark` | `span` | — | Stamped index / postmark |
| `Tag` | `ui/Tag.tsx` | `li` | — | Mono 12 px, `border-line`, square |
| `SectionTitle` | `ui/SectionTitle.tsx` | `header` with `h2` | — | Eyebrow + title + optional lede |
| `Field` | inside `sections/ContactForm.tsx` | `label` + `input`/`textarea` | rest, focus, invalid, disabled | Error text linked via `aria-describedby`; first invalid field takes focus |
| `Folio` | `.folio` on `<details>` | `details`/`summary` | closed, open | Ledger rows and certificate folders: native expanded state, no JS |
| `ShadowBox` | `scenes/ShadowBox.tsx` | `div` (`aria-hidden` art + HTML slots) | static, looking (`.is-looking`), unfolding, dolly | Client leaf: size container (`container-type: inline-size`) and pointer look; hosts one `PaperScene`; `after` slot renders over the frame on desktop and below it on mobile (laptop screen card). `light` prop writes `data-light` (workday arc, §2.3). No `content-visibility` (see §9.2 Off-screen) |
| `PaperScene` / `SceneLayer` | `scenes/PaperScene.tsx` | `div` tree (§9.2) | at rest (= fallback), looking, scroll push | Viewport, frame and 8–14 layers at depth `k`; `frameVars`, `depthFactor`; layer art from `paper-kit`, shipped as static markup via `svgString` (§9.6); `StaticArt` does the same for server-made HTML layers; Server Component |
| `DeskStation` | `scenes/desk/DeskStation.tsx` | `ShadowBox` + `PaperScene` | — | The Desk (§4.5 `01`): 14 layers, landscape mobile crop, `DeskLamp` and `FigurineSlot` at z = 0, `LaptopScreenUI` in `after` |
| `Station` | `scenes/Station.tsx` | `ShadowBox` + `PaperScene` + `<style>` | — | One office station: layers, frames, workday light and the `:has()` state rules from `stateCss`. In v3 it is the stage of a `Chapter` (fit `cover`) and, unchanged, the stacked-studio box |
| `office` helpers | `scenes/office.tsx` | — | — | The shared room: `STRIP` (1600 × 640), `SKIRT_Y`, `FLOOR_Y`, `windowLayers` (day/dusk), `windowHole`, `wallLayer`, `floorLayer`, `figureLayer` (station pose at a world rect), `stateCss` (HTML control → `[data-obj]` transform, no JS) |
| Stations | `scenes/{pinboard,cabinet,drafting,gallery,archive,mail}/` | `Station` | folder lift, binder tilt, postmark | Pinboard (About), Filing Cabinet (Experience and the 404 Empty Drawer), Drafting Table (Services), Shadow-Box Gallery (Projects), Archive Shelf (Certificates), Mail Tray (Contact). Content sheets (`.station-sheet`) overlap each scene's lower edge |
| `ProjectShadowBox` | `scenes/ProjectShadowBox.tsx` | inside the project `article` (one stretched link) | rest, depth reveal (hover/focus) | Two motif layers (`gallery/motifs.tsx`, from `project.motif`, serialised server-side), cast shadow, taped laptop or phone with the screenshot, frame lip |
| `FrameBack` | `scenes/FrameBack.tsx` | `svg` | — | Footer: the kraft back of the frame with staples, D-rings and wire |
| `Chapter` | `scenes/chapter/Chapter.tsx` | `section.chapter` | theatre, split, stacked (`data-stacked`) | Server Component that renders the stage, beat wrappers, skip link, handoff spacer and one generated `<style>` from the station's `beats.ts` (§9.7); the only client part is the `ResizeObserver` stacked test (`ChapterFit`, client leaf) |
| `Beat` | `scenes/chapter/Beat.tsx` | `div.beat` > `article.beat-sheet` | entering, holding, exiting, composed (keyboard focus, `:target`) | One piece of information; origin, hold, optional occluder; content passed as children from the section |
| `ChapterIndex` | `shared/StudioRail.tsx` + `shared/ChapterBar.tsx` | `nav` | active chapter | StudioRail (≥ 1440 px) and chapter bar (< 1024 px) share one `IntersectionObserver` |
| `LaptopScreenUI` | `scene/LaptopScreenUI.tsx` | `section aria-label` | — | Client leaf; positioned by `--screen-*` |
| `DeskLamp` | `scene/DeskLamp.tsx` | `button` | on / off | Transparent theme switch over a station's `lamp` layer (art in the layer, hit area at z = 0; `pointerOnly` on chapter stages `02`–`06`) |
| `lampLayers` | `scenes/lamp.tsx` | `SceneLayer[]` | rest, cued swing, nod | Multi-layered 2D/3D papercraft lamp builder (`architect`, `barn-door`, `clamp`, `drafting`, `track-can`, `picture-hood`, `banker`): 6–9 stacked paper planes (`k.stack` base, articulated twin bars/springs, 4-plane head with inner reflector and baffles) + 3-tier directional beam and target pool (§1.11, §2.3) |
| `FigurineSlot` | `scene/FigurineSlot.tsx` | `div role="img"` | poster, 3D, failed | Poster first, then the capability-gated canvas fades in over it |
| `PaperDeskCanvas` | `scene/PaperDeskCanvas.tsx` | R3F `<Canvas>` | loading, ready, failed | Dynamic, `ssr: false`; model in `scene/figurine-model.tsx` |
| `RifqiFigurine` | `scene/RifqiFigurine.tsx` | inline `svg` | — | The poster and fallback, same framing as the canvas |

`lucide-react` is the only icon library (stroke width `1.5`). Brand glyphs (GitHub, LinkedIn, WhatsApp) are local SVG components in `src/components/icons/`, sourced from Simple Icons (CC0).

---

## 8. Responsive Rules

| Layout | When | Strategy |
| --- | --- | --- |
| **Theatre** (desktop) | ≥ 1024 px wide, ≥ 561 px tall, scroll-driven support, motion allowed | Fullscreen sticky stage, beats in the reading lane (a 36–42 % column on the station's empty side, max 34 rem), handoffs, acts, stop-motion poses, pointer look (fine pointer), R3F puppet in `01` if the capability gate passes, StudioRail at ≥ 1440 px |
| **Theatre** (tablet) | 768–1023 px | Same, but the lane is 52–58 % wide and sits over a darkened (`--scrim-paper`, a flat paper tint, never blur) third of the stage; no pointer look; poster figurine |
| **Pocket studio** (mobile, v3.14) | < 768 px, always | *Owner request (2026-11-24): a mobile experience as deliberate as the desktop one; replaces the v3.6 Folio.* No pinned stage, no scroll-jacking, no WebGL, no figurine 3D, no scroll-snap (§3.2). Each chapter opens with its station's mobile window (`--aspect-m` frame) **in flow**; the first sheet overlaps the window's lower lip. Sheets are paper leaves again, **cued once** as they come up (`data-shown`, `m-rise`); the window unfolds and its layers drift at their own depths on a native view timeline (`m-window`, `m-depth`; `@supports` + no-preference only). Long lists become **trays that swipe sideways** (free native scroll, the next card peeking in, the middle card in front by a native inline view timeline `m-focus`): `02` index cards, `03` role folders, `04` blueprints, the core stack and the tools, `04b` the gallery wire; titles and lead-ins stay as sticky rows above a tray. Footer contacts become icon buttons. Hero: CTAs before tickets, desk window peeks under the tickets. Touch targets ≥ 44 px; chapter bar under the navbar; no horizontal overflow at 320 px. Same markup, chosen in CSS (`chapter.css`). |
| **Stacked studio** (fallback) | Reduced motion, **or** no scroll-driven support, **or** `max-height: 560px`, **or** a beat sheet taller than `70svh` (large text zoom) | The v2.2 layout: each station as a framed box (desktop or mobile frame), sheets stacked in flow, no pin, no hold spacers, no handoffs, scenes in their composed state. Every control and fact unchanged |

- One component per chapter, made responsive with CSS. **No separate `mobile/*` tree and no `if (!mounted)` blank render.**
- Layout is chosen in CSS (`@media`, `@supports`, container queries), never by swapping components after mount. The one exception is the "sheet taller than 70 svh" test, which `Chapter` measures once after mount with `ResizeObserver` and marks with `data-stacked` on the chapter.
- No horizontal overflow at 320 px. `svh` (not `vh`) for every stage and hold, so mobile browser chrome never resizes the stage mid-scroll.

---

## 9. Hybrid 2D + 3D Rendering Architecture

**Hybrid means:** many 2D paper layers placed at real depths and projected through one analytic camera (every station, no WebGL needed), plus one WebGL paper puppet (the hero figure on capable desktops). The illusion of a 3D world comes from depth, light and camera movement over 2D sheets, not from meshes.

### 9.1 Scene Coordinates

- Every station is authored in a **1600 × 1000 world** (scene units). Each station declares two frames into that world: `desktop` (default `0 0 1600 1000`) and `mobile` (a crop rect art-directed per station; it need not be portrait — the Desk uses the landscape crop `150 60 1350 940` so the laptop stays legible, and the screen card follows below the box). Each layer's `viewBox` is its own cropped box in world units.
- HTML that sits on paper objects (laptop screen, lamp button, folder tabs, frames, binders) is positioned with `frameVars(rect, frames)` (`scenes/PaperScene.tsx`): `--l/--t/--w/--h` in % of the desktop frame and `--lm/--tm/--wm/--hm` for the mobile frame, so HTML and art never drift. Rects live next to the station's layer list (`scene/stage-geometry.ts` for the Desk).
- **Stage fit (v3):** a chapter stage shows the station's frame with `cover` fit into the viewport: the frame's **safe rect** (the objects that act, plus the reading lane) MUST stay visible from 4:3 to 21:9 desktop and in the split stage on mobile; art beyond it is bleed. Each station declares `safe` next to its frames, and `/papercraft` previews 4:3, 16:9, 21:9 and 390 × 46 svh.
- **Stage fit (v3.8, owner: "a slightly different ratio gives a different experience"):** pure `cover` cropped the safe objects on screens wider or taller than the theatre (the lamp and the board at 1790 × 736). The fit is now `--s = min(cover(theatre), contain(safe))` and the camera centre slides from the theatre's centre toward the safe rect only as far as needed (`chapter.css`, `--s`, `--cxs`, `--cys`). Every chapter has a **safe rect** (`ChapterSpec.safe`; default `safeOf`: the theatre without 8 % at each side, world y −40 … 650, from above the furniture to under the skirting); the navbar's band (`--nav-band`, 4 rem) does not count as view, and the view never shows more than 150 world units of floor under the safe rect (tall screens get wall, not floor). Wall and floor bleed for it (`office.tsx` `extent`). Everything placed in world coordinates over the stage (emerge flights, the gallery labels, the services written on the board) reads the same `--s`/`--cxs`/`--cys`. Checked at 1024 × 768, 1280 × 1024, 1440 × 900, 1790 × 736 and 2560 × 1080.
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
- **Off-screen:** no `content-visibility` on scenes for now. Tried in R2 on `ShadowBox`: the placeholder sizes still moved in-page anchors (`#projects` landed 452 px off), so it was removed. Revisit in R4 with exact `contain-intrinsic-size` per frame.
- **Shadows and filters are baked:** cast shadows are SVG blur filters inside the layer (rasterized once with the layer). Layer content never changes during camera motion. Light changes (theme, station arc) swap tokens, which repaints once.
- **Pointer look (desktop, fine pointer):** `useParallaxStage` writes `--px`/`--py` on the scene inside one `requestAnimationFrame`; each layer's `translate` is `calc(var(--px) * var(--k) * -9cqw) calc(var(--py) * var(--k) * -5cqw)`. Depth does the rest. No React state in pointer or scroll handlers.
- **Scroll dolly, unfold, acts and handoffs:** CSS scroll-driven animations on named chapter and beat timelines (§9.7); `scroll(root)` is no longer used. Never on whole sections, and never with `fill-mode: both` on a tall element: an active animation keeps its element as one composited layer for good (R2 measured 150–600 ms frames from a section-wide settle). Design the R3 unfold so the animated element is station-sized and the animation goes inactive after its range, inside `@supports (animation-timeline: view())`. Without support, scenes render in their final composed state. No JS scroll listeners.
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

The v1 per-asset byte caps (40 KB per SVG layer, 30 KB mobile stage, 12 KB fibre, 120 KB raster layer, triangle caps) are **removed for paper-craft 2D and 3D art and textures**: they pushed the art toward primitives (§1.7.0, cause 7). Quality of the paper world wins; the visitor experience is protected by gates on what the visitor feels, not by file sizes:

| Gate | Limit | Enforced by |
| --- | --- | --- |
| LCP (mobile 4G, mid-range) | ≤ 2.5 s | Hero text first in HTML; `h1` is the LCP; Lighthouse + trace |
| CLS | ≤ 0.1 | Fixed aspect ratio on every `ShadowBox`, canvas, poster, image |
| INP | ≤ 200 ms | No state in pointer/scroll loops; native dialogs |
| Scroll smoothness (desktop, mid-range) | No long animation frame > 50 ms while scrolling the full page; median ≥ 55 fps | `e2e/perf.spec.ts` (Long Animation Frames API) |
| Scroll smoothness (mobile emulation, 4× CPU) | No long animation frame > 100 ms while scrolling | Same spec, mobile project |
| First-load JS for `/` (code, not art) | ≤ 220 KB gzip of module scripts | `@next/bundle-analyzer`; art never enters client JS (scenes are Server Components) |

Delivery rules that keep heavy art off the critical path:
- The Desk scene is inline in the server HTML; station scenes below the fold are server-rendered too.
- **Static art is never hydrated.** Layer art and server-made HTML art (station figures) are serialised with `svgString` and placed with `dangerouslySetInnerHTML` (`PaperScene`, `StaticArt`, motifs, `FrameBack`). Rendered as React elements, thousands of `<use>`/`<path>` nodes were hydrated and cost long frames. Client leaves keep JSX (`FigurineSlot`, `DeskLamp`, `LaptopScreenUI`).
- **RSC payload:** App Router repeats server markup in the inline RSC payload, so the HTML is roughly double the visible markup (R2: 1.45 MB raw / 218 KB gzip for `/`). Recorded as information; reducing it is R4 scope.
- Texture tiles are referenced from CSS/SVG patterns with `image-set()` (AVIF, WebP); below-fold project screenshots use `loading="lazy"` with explicit dimensions.
- HTML is served compressed (Vercel default brotli). Record the compressed HTML size, texture sizes and layer counts in each handoff (§17.2) as information, not as gates.

Naming: lowercase kebab-case with a domain prefix in `public/assets/papercraft/` (`tex-…`, `desk-…`, `prop-…`, `rifqi-…`). No spaces, no `final2`, no `copy`. Every file in `public/` MUST be referenced by code or data; orphans are deleted.

### 9.7 Chapter Theatre — the scroll architecture (v3)

```
main  (timeline-scope: every --ch-* and --b-* name used across siblings)
└─ section.chapter#about           view-timeline: --ch-about; height = its beats
   ├─ a.skip-chapter               visually hidden until focused
   ├─ div.stage                    position: sticky; top: 0; height: 100svh; margin-bottom: -100svh
   │  │                            content-visibility: auto; contain-intrinsic-size: auto 100svh
   │  └─ PaperScene (fit: cover)   the station's layers re-framed to the viewport (§9.1)
   ├─ div.stage-front?             Emerge beats only: occluder copies above the sheets
   └─ div.flow                     margin-top: -100svh
      ├─ div.beat-pins
      │  ├─ div.beat-deck          position: sticky; top: 0; height: 100svh — every pinned sheet,
      │  │  └─ div.beat × n          in reading order, absolutely placed in the lane (v3.3)
      │  │     └─ div.beat-sheet   the real content; data-state / data-dir from ChapterCue
      │  ├─ div.beat-lead          35svh
      │  ├─ div.beat-track × n     40svh + hold each: scroll length only, aria-hidden
      │  └─ div.beat-tail          70svh
      └─ div.beat[data-flow] × m   long sheets in normal flow
```

*v3.3:* the diagram above replaces the W1–W2 layout of sticky sheets in per-beat wrappers with beat view timelines (§1.10). The chapter view timeline and its handoffs are unchanged.

**Timelines.** Every chapter names its own view timeline on the (non-sticky) section. Handoffs use the `entry` and `exit` ranges, each exactly one viewport of scroll for a chapter taller than the viewport (W1 measured: `entry-crossing` / `exit-crossing` span the chapter's whole height instead, so they are not used):
- the incoming stage animates over `entry 0% → 100%` of its chapter;
- the outgoing stage animates over `exit 0% → 100%` of its chapter.

Because the section's edge travels exactly `100svh` in each range, a stage that should *look still* while it slides sideways counter-translates the natural scroll. For example, the incoming pan keyframe goes from `translate(100vw, -100svh)` to `translate(0, 0)`, and the outgoing pan from `translate(0, 0)` to `translate(-100vw, 100svh)`. A tilt omits the vertical counter-term, so the natural scroll *is* the move.

**Acts.** *v3.3:* acts are cued, not scrubbed: a transition on the actor, keyed to the chapter's `data-reached` (mode `in` / `off`) or `data-beat` (mode `out`). (W1–W2 read the beat timelines through `timeline-scope`.) Acts animate the layer's child (`[data-layer] > *`), never the layer itself, so they compose with the handoff transform on the layer and the pointer look's `translate`; objects inside a layer animate `translate`, so they compose with `stateCss` transforms. `transform` (and `opacity` for pose swaps) only, on layers the station marks as actors (`actor: true` in its layer list; ≤ 12 actors per station).

**Data, not hand-written CSS.** Each station exports `beats.ts`:

```ts
{
  chapter: 'experience',
  lane: 'right',
  beats: [
    {
      id: 'title',
      hold: 40,
      origin: 'rise',
      acts: [{ actor: 'drawer', to: 'translate(0, 6%) scale(1.04)' }],
      pose: 'folder',
    },
    {
      id: 'current',
      hold: 60,
      origin: { emerge: 'folder-0' },
      acts: [{ actor: 'folder-0', to: 'translateY(-34px)' }],
    },
    {
      id: 'ledger',
      hold: 'flow',
      origin: 'rise',
    },
  ],
  handoffIn: 'tilt-down',
}
```

`Chapter` turns it into the section, the wrappers and one `<style>` block (like `stateCss`, §7). Hand-written keyframes per beat are not allowed.

**Rules.**
- **No JS on the scroll path.** No scroll or wheel listeners, no `requestAnimationFrame` loops driven by scroll, no scroll libraries (GSAP ScrollTrigger, Lenis, Locomotive). `IntersectionObserver` is allowed only for the active-chapter index (StudioRail, chapter bar), the figurine's on-screen check and, from v3.3, **`ChapterCue`**: one observer per chapter on its tracks (desktop) or sheets (split stage), plus a one-shot observer that marks flow sheets `data-shown`. Its callbacks fire on threshold crossings only and set attributes; CSS does the motion.
- **Only station-sized things animate.** The stage (100 svh), its layers, beat sheets and occluders. Never a chapter, a section, `main` or anything taller than `100svh` (R2 lesson, §9.2).
- **Two clocks.** The camera (handoffs, tilt-down layer parallax, the hero push-in) is scroll-driven and ends with its ranges. The paper (sheets, sub-steps, acts, poses, occluders) is cued and timed (§10.1 `--dur-leaf-*`), with `fill-mode: both`; `-r` twin keyframes restart a flight when its direction flips. A stage that is off screen is skipped by `content-visibility` (its size is fixed, so anchors are unaffected).
- **At most 2 stages live** (during a handoff) and **≤ 28 animated layers** at once.
- **Text holds still.** A sheet's transform is identity once its flight ends and for as long as its beat is on; the wheel never moves it. No parallax on text, ever.
- **Composed state is the fallback.** Without `@supports (animation-timeline: view())`, under reduced motion, or below the stacked-studio thresholds (§8), chapters render the v2.2 layout: the station as a framed box (its desktop or mobile frame), then the beat sheets stacked, no pin, no hold spacers, no handoffs.
- **Prototype first.** W1 (§16.3) MUST prove `entry` / `exit` counter-translation, sticky beats inside a sticky stage's chapter, `timeline-scope` acts and the scroll gates on two chapters before any other chapter is converted. If a mechanism fails in a target browser (Chrome, Edge, Safari 26), the rule here is amended with the measured alternative before W2.

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
| `--ease-leaf` | `cubic-bezier(0.3, 0.72, 0.28, 1)` | Beat flights (each keyframe segment) |
| `--dur-leaf-in` / `--dur-leaf-out` | `760ms` / `520ms` | A cued sheet landing / being lifted off |
| `--dur-act` | `900ms` | A cued scene act |
| `--dur-pose` | `420ms` | One stop-motion swap |
| `--dur-step` / `--gap-step` | `520ms` / `170ms` | A sub-step landing / the gap between sub-steps |
| `--dur-morph` | `520ms` | Frame → sheet morph |

### 10.2 Signature Moves, Allowed & Forbidden Motion

The paper world's motion vocabulary is listed below. Use these moves and invent nothing else. A new move needs a §1 scoring entry and a §19 record.

| Family | Move | What happens | Trigger | Implementation |
| --- | --- | --- | --- | --- |
| **Handoff** | Pan, Tilt, Dolly, Turn-over | The camera moves to the next station along the office plan (§4.3) | Scroll, 100 svh | Stage `transform` on the chapter's `entry` / `exit` ranges (§9.7) |
| **Beat origin** | Drop, Rise, Slide, Emerge, Unfold | A beat's sheet arrives the way that paper would (§4.1), bending about its leading edge and settling flat | Cue (scroll position picks the beat), then time (`--dur-leaf-in`) | Sheet `transform` + `opacity`, curvature shade `opacity`; Emerge adds an occluder |
| **Act** | Drawer out, folder rise, binder pull, envelope open, cover slide, lamp swing, tray forward | The scene object a beat is about moves with its sheet | Cue (`data-reached` / `data-beat`), `--dur-act`; optional `delay` for acts that follow one another | Actor `transform` / `translate` / `scale` transition (modes `in`, `out`, `off`), or one keyframe there and back (`pulse`) |
| **Stop-motion pose** | Figure pose swap | The figure jumps between 2–4 posed posters per chapter, like stop-motion paper animation | Cue, then time (`--dur-pose` per swap) | Pose layers stacked; `opacity` swapped with `step-end`. **No tweened 2D joints** (SVG joint transforms repaint) |
| **Camera** | **Unfold into depth** | A stage's layers start flattened and separate to their `z` as its chapter arrives | Handoff incoming range | Per-layer `transform`, then still |
| **Camera** | **Camera dolly** | During a long hold the camera drifts slightly (`x` ±30, `z` 0 → +80) | Scroll, chapter `contain` range | Layer `translate` by `--k` (§9.2); never moves a sheet |
| **Camera** | **Hero push-in** | Camera moves to the laptop while the title sheet exits | `01` beat 3 | As above |
| **Camera** | **Pointer look** | Camera follows the pointer by ±12 / ±8 px | `pointermove`, fine pointer, theatre only | `--px` / `--py` (§9.2) |
| **Object** | **Depth reveal** | An object's inner layers separate (`z` × 1.6) and its shadow grows | Hover **and** `:focus-visible` / open | `transform` transition, `--dur-depth` |
| **Click** | **Frame → sheet morph** | A project frame grows into its case-study sheet | Click | View Transition: the frame's `.psb` and the open `.case-dialog` share `case-sheet` (never both at once); `PaperDialog` opens in a layout effect so the new state holds the dialog; `--dur-morph`; skipped under reduced motion or without the API |
| **Click** | **Lamp theme switch** | The new theme grows as a circle from the lamp bulb | Lamp or navbar toggle | View Transition + `clip-path`, `--dur-theme` |
| **Click** | **Postmark** | Stamp lands once | Real 2xx from the contact action | One keyframe, once |
| **Figure** | **Figurine clips** (3D, `01` only) | Wave once per session, look at the laptop, glance at the lamp, think while EQbot is open, blink every 4–7 s while on screen | On demand (§2.7) | `figurine-clips.ts`, demand frames |

**Timing.**
- *v3.3:* the camera is scroll-linked (scroll position is its clock); the paper is cued and timed. Both reverse when the visitor scrolls back: the camera because it is scrubbed, the paper because the cue plays the flight backwards.
- Entrances: `--dur-leaf-in`, `--ease-leaf`, ending flat. Exits: `--dur-leaf-out`.
- Acts start with their sheet (`--dur-act`).
- Click-triggered moves use the duration tokens (§10.1).

**Forbidden:**
- Splash, loading or preloader screens (including "0 → 100 %" counters).
- **Scroll hijacking**: wheel or touch interception, Lenis or any smooth-scroll override, JS scroll animation libraries, programmatic scrolling except anchor and skip links and, from v3.3, bringing a keyboard-focused off sheet's track under the cue line (§4.4). *Owner exception (v3.8):* on the gallery wire (§4.5 `04b`) a horizontal drag, swipe, trackpad swipe or arrow key, and the wire's arrow buttons, scroll the page to the next or previous segment's track (`RailNav`); vertical wheel and touch are never intercepted.
- `scroll-snap`.
- Horizontal scroll-jacked galleries (a handoff pan is a camera move over vertical scroll, not a horizontal scroller). The gallery wire's sideways moves (v3.8) are not one: they only pick the segment, by scrolling to its track.
- Pinning by any means other than `position: sticky` on the chapter stage, the stage front and the beat deck.
- Text that moves during its hold; parallax on text.
- Continuous loops on props (the blink is the only repeating motion).
- Physics engines; falling or flying cards with rotation spins; 3D tilt on cards.
- Cursor-follower blobs, magnetic buttons, custom cursors.
- Letter-by-letter or word-by-word split-text reveals.
- Staggered fades on individual elements (a beat moves as one sheet; sub-steps are whole cards).
- Marquee text; particles, aurora, shimmer.
- `transition: all`.
- Animating layout properties, `filter`, `clip-path` on large elements, or registered custom properties.
- Animating anything taller than `100svh`.

**Reduced motion (`prefers-reduced-motion: reduce`)** gives the stacked studio (§8):
- no pin, no holds, no handoffs, no acts, no dolly, no pointer look;
- poses show the beat-1 pose;
- depth reveal becomes a shadow and outline change without movement;
- the theme switch is instant;
- dialogs fade ≤ 100 ms;
- the figurine stays as the poster.

Every feature still works.

**Tooling:**
- CSS first: scroll-driven animations, transitions and View Transitions.
- `motion` (`motion/react`) only for mount/unmount presence (dialog content, tab panels, EQbot sheet), loaded with `LazyMotion` + `domAnimation`.
- No scroll-timeline polyfill.

### 10.3 Sound (v3.5, owner request)

The studio may be heard: paper sounds for what the paper does, and a quiet backsound. Sound is an addition to the walk, never a carrier of information: every sound has a visible event, and nothing depends on hearing it.

| Rule | |
| --- | --- |
| Default | **Off.** One switch, `SoundToggle` (navbar group at ≥ 640 px, labelled button in the mobile menu), `aria-pressed`, label *Sound and music* / *Suara dan musik*. The choice is kept in `localStorage` (`studio-sound`); a remembered *on* starts at the visit's first click or key press (browsers allow audio only inside a gesture). Nothing ever plays on load (WCAG 1.4.2). *v3.13 (owner):* two more ways to the same switch, both still asking first: the paper speaker on the hero desk (`DeskSpeaker`, a `.scene-hit` over the speaker layer; the cone pumps and paper waves ripple while sound is on; a ring and a *Tap for sound* tag until it is used once this visit), and a sound slip with a *Turn sound on* button on the welcome page. |
| Source | **Synthesised, no audio files** (`lib/sound/engine.ts`, Web Audio API): paper is filtered noise, the drawer a low rumble and a stop, a tap a short click, the backsound (v3.9, owner: "energetic") a 112 BPM groove over D – A – Bm – G: paper kick, clap, shaker hats, a filtered saw bass, a kalimba arpeggio and a bright pad that ducks under the kick, with four lighter bars every twenty, scheduled with a 150 ms look-ahead, through one small room delay. No downloads, no samples, no AI-generated audio (§2.7). |
| Cost | The engine is imported only when sound turns on (≈ 2 KB gzip); first-load JS is unchanged. One `AudioContext`, suspended when sound is off or the tab is hidden. |
| Cues | `studio:cue` from `ChapterCue` (sheet on → `leaf-in`, lifted off → `leaf-out`; the Experience title → `drawer`); a click on a control → `tap`, or the cue named by `data-sound` (`lamp` on every theme switch, `none` on the sound switch); a dialog opening / closing (`toggle`) → `unfold` / `fold`. v3.9: a chapter title arriving → `whoosh` + `chime`; the Services push-in (`svc-0`) → `zoom`; a wire move → `swish`; an EQbot answer → `pop`. |
| Level | Effects quiet (peak ≈ −12 dBFS after the compressor), backsound lower still; music fades in over 2 s and out over 1.2 s. |
| Forbidden | Autoplay; a sound without a visible event; a sound on every scroll frame (cues fire on beat changes only); hover sounds; voice; audio files fetched before the visitor turns sound on. |

---

## 11. Technology Stack Decision

### 11.1 Scored Choices

| Concern | Options considered | Chosen | Why |
| --- | --- | --- | --- |
| Framework | Stay on Next 14 · **Next 16** · Astro | **Next.js 16** (App Router, Turbopack) | Server Components for static paper layers, React 19 support required by R3F 9, Server Actions for the form, first-class on Vercel |
| UI runtime | **React 19** | React 19 | Native `<dialog>` refs, `useActionState`, needed by R3F 9 / drei 10 |
| Styling | Tailwind 3 · **Tailwind 4** · CSS Modules | **Tailwind CSS 4** | CSS-first `@theme` makes tokens the single source; no 100-line JS config of remapped palettes |
| Depth engine (2D layers in 3D) | **CSS 3D transforms + scroll-driven animations** · three.js planes for every scene · GSAP ScrollTrigger · Spline | **CSS 3D + scroll-driven CSS** | Server-rendered, accessible, works without WebGL and on mobile, compositor-only motion, zero runtime cost; three.js scenes fail perf/a11y (§1.7.2 D) |
| Paper material | **`paper-kit` (local, server-only)** · hand-drawn shadows per shape · raster renders | **`paper-kit`** | One consistent material model for every sheet; deterministic; no client JS |
| 3D character | **R3F 9** · `<model-viewer>` · Spline | **R3F** | Control over demand rendering, poster parity. Spline rejected: heavy runtime, external hosting, low control |
| Theme transition | **View Transitions API** · overlay wipe | **View Transitions** | Native, compositor-driven, falls back to an instant switch |
| Motion | **CSS + scroll-driven CSS + `motion`** · GSAP ScrollTrigger · Lenis · `motion` `scroll()` for everything | **CSS first, `motion` for presence** | No scroll hijacking; scroll-driven CSS runs off the main thread and costs no JS. Re-scored for v3 against GSAP ScrollTrigger (pins via JS, main-thread scrub, extra runtime, template look) and `motion` `scroll()` (wider support but JS on the scroll path): CSS wins on perf, risk and authenticity. Browsers without scroll-driven support get the stacked studio |
| Scroll architecture (v3) | **Chapter Theatre: sticky stage + in-flow beats + named timelines** · one fixed global stage · absolutely placed beats in a pinned box | **Chapter Theatre** | Self-contained chapters, text in flow (zoom, find, anchors), only two stages live (§1.4, §9.7) |
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
    scenes/chapter/       Chapter, Beat, ChapterFit (client leaf), beat CSS generator
    scenes/               ShadowBox, PaperScene (SceneLayer type, frameVars, depthFactor, StaticArt), Station, office (shared room),
                          ProjectShadowBox, FrameBack,
                          desk/DeskStation.tsx, pinboard/ cabinet/ drafting/ gallery/ archive/ mail/ (layers, frames, safe rect, HTML rects, beats.ts)
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
  lib/paper-kit/          paperKit (sheet, stack), PaperDefs, cut, air, edgeOf, shape helpers, svgString (server-only)
  styles/                 tokens.css, z-index.css, design-system.css, scene.css, paper.css
  types/index.ts
```

- `"use client"` only at interactive leaves (stage, tabs, dialogs, contact form, EQbot, Navbar). Every section is a Server Component.
- **Client leaves never import `data/portfolio.ts`.** The server section shapes the data and passes it as props (`heroScreen()`, `ShelfProject`). The one exception is `AdditionalSkillsDialog`, which loads with `next/dynamic` on first open.
- EQbot loads after hydration through `EqbotLoader` (`next/dynamic`, `ssr: false`).
- First-load JS budget for `/`: **≤ 220 KB gzip** of module scripts (the `nomodule` polyfill is excluded). Measured 160.6 KB after P4; 201 KB after R2 (every `.js` referenced by `/`, gzip -9). Find the growth before R3 adds code.
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
| Scroll smoothness | No long animation frame > 50 ms (desktop) / > 100 ms (mobile, 4× CPU) while scrolling the page, **including every handoff** | `e2e/perf.spec.ts` (§9.6) |

### 14.2 Accessibility (WCAG 2.2 AA)

- Skip link to `#main` as the first focusable element.
- One `h1` (hero name) → `h2` per section → `h3` per card.
- Native `<button>`/`<a>` only; visible `outline: 2px solid var(--color-accent); outline-offset: 3px` on `:focus-visible`.
- Decorative layers: `aria-hidden="true"`; informative images have descriptive `alt`.
- Dialogs: native `<dialog>` modal, `Escape` closes, focus returns to the trigger. Mobile menu traps focus.
- Target size ≥ 24 px everywhere and ≥ 44 px on touch layouts.
- Theme and language toggles expose their state (`aria-pressed`, `lang` attributes).
- **Chapters (v3):** reading order = DOM order = beat order; the stage is `aria-hidden`; every chapter starts with a *Skip to …* link; `:focus-within` and `:target` force a beat's composed state; anchors land on the chapter start; find-in-page finds every fact in the stacked studio and on the split stage (in the desktop theatre an off pinned sheet is a known limitation, §1.10); 200 % zoom and 320 px width reach the stacked studio with nothing clipped (WCAG 1.4.10).
- Motion is never the only carrier of meaning: a beat's content is complete without its entrance, and acts repeat nothing the sheet does not say.

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
| Choreography | Same script, from v3: every `beats.ts` validates (origin ∈ the five, hold 30–60 or `flow`, ≤ 12 actors per station, ≤ 4 poses per chapter, chapter and page track caps of §4.6, `handoffIn` matches §4.3); no `scroll`/`wheel` listeners; no scroll libraries in `package.json`; no keyframes on `section`, `main` or `.chapter`; every Emerge beat has an occluder | ✅ |
| Data integrity | Same script: asset paths exist, certificate counts match, EN/ID pairs non-empty | ✅ |
| E2E + a11y | `npm run test:e2e` (`playwright.config.ts`, specs in `e2e/`): projects `desktop-light`/`desktop-dark` at 1440 px, `mobile-light`/`mobile-dark` at 390 px, `fallback` (reduced motion, `--disable-webgl --disable-3d-apis`); section order, anchors, keyboard tabs/dialogs/menu trap, contact validation, language switch, 404, axe (`@axe-core/playwright`, WCAG 2.2 AA) with zero serious/critical issues | ✅ |
| Scroll performance | `e2e/perf.spec.ts`: scripted full-page scroll; Long Animation Frames on desktop and mobile emulation (§9.6) | ✅ (from W1) |
| Choreography e2e | `e2e/chapters.spec.ts`: at each beat's hold the sheet is visible, unclipped and untransformed; tabbing into any beat shows it composed; anchors land on chapter starts; reduced motion, `max-height: 560px` and no-support emulation give the stacked studio with every fact | ✅ (from W2) |
| Performance | Lighthouse CI (`lighthouserc.json`, `npx -y @lhci/cli@0.15.1 autorun`; locally set `CHROME_PATH`): mobile, 3 runs — Performance ≥ 90, Accessibility = 100, Best Practices ≥ 90, SEO ≥ 90, LCP ≤ 2.5 s, CLS ≤ 0.1. Runs against `next start` in CI until a Vercel preview URL is wired | ⚠️ warn |

All checks run in GitHub Actions (`.github/workflows/ci.yml`) on every pull request: `verify` (lint, types, design rules, build) → `e2e` (blocks merge) and `lighthouse` (`continue-on-error`).

Do not put `content-visibility: auto` on sections or chapters: placeholder heights make in-page anchors land in the wrong place (`e2e/interaction.spec.ts` guards this). It is allowed only on elements whose size is fixed: the chapter stage (`100svh`, §9.7) and, once W4 sets exact `contain-intrinsic-size`, stacked-studio boxes.

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
| **R2 — Stations** — *built 2026-11-23, awaiting owner review* | Pinboard, Filing Cabinet, Drafting Table, Shadow-Box Gallery (`ProjectShadowBox`, `project.motif` data), Archive Shelf, Mail Tray, back-of-frame footer, Empty Drawer 404; station figurine poses (`pin`, `folder`, `draw`, `hang`, `binder`, `seal`) | Every station passes §3.3 (all seven tests); content sheets carry every fact; axe clean |
| **R3 — Motion** *(superseded by v3 W1–W3)* | Unfold into depth, camera dolly, hero push-in, depth reveal, lamp View Transition, workday light arc | Reduced-motion final states verified; `e2e/perf.spec.ts` scroll gates pass on desktop and mobile emulation |
| **R4 — Mobile & performance hardening** *(superseded by v3 W4)* | Portrait frames tuned per station, layer merges to ≤ 8 on mobile, `content-visibility` on scenes, texture `image-set`, trace review | Gates in §9.6 on a real mid-range Android over 4G; no horizontal overflow at 390 px |
| **R5 — QA & launch** *(superseded by v3 W5)* | Full Playwright + axe, Lighthouse, EN/ID copy, owner review on the Vercel preview | DoD (§17.3) fully checked |

### 16.3 v3 — *Walkthrough*

R1–R2 stay as built: their stations become the stages and the stacked-studio fallback. R3–R5 are replaced by W1–W5. Order matters: W1 proves the mechanism on two chapters before anything else is converted.

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| **W1 — Theatre proof** — *built 2026-11-23, awaiting owner review* | `Chapter`, `Beat`, beat CSS generator, `beats.ts` schema; chapters `02` Pinboard and `03` Cabinet converted (stage, lane, beats, acts, the `02 → 03` tilt handoff, one Emerge with occluder, one stop-motion swap); stacked-studio fallback; `e2e/perf.spec.ts` | Mechanisms of §9.7 verified in Chrome, Edge and Safari 26; scroll gates pass at 1440 px and 390 px (4× CPU); owner review of the feel on `/papercraft` and `/` |
| **W2 — All chapters** — *built 2026-11-23, awaiting owner review* | `01` (hero push-in, ticket Emerge), `04`, `04b`, `05`, `06`, every handoff of §4.3 including the footer turn-over; station `safe` rects and reading lanes; `e2e/chapters.spec.ts` | Every beat passes the eight tests (§3.3); every fact in flow HTML; track caps met |
| **W3 — Paper acts & poses** — *built 2026-11-23 with v3.3 cued paper, awaiting owner review* | All acts, occluders and the `reach` / `hand` poses; frame → sheet morph; lamp swing; tray and envelope | Owner review per chapter; poster ↔ 3D gate still ≤ 2 % |
| **W4 — Mobile & hardening** — *built 2026-11-23 (v3.4); §9.6 gates on real Android and the RSC payload proposal await the owner* | Split stage tuned per station, chapter bar, `data-stacked` test, `content-visibility` on stages, RSC payload and first-load JS reduction (§9.6), texture `image-set` | §9.6 gates on a real mid-range Android over 4G; no overflow at 320 px; 200 % zoom check |
| **W5 — QA & launch** — *local QA done 2026-11-23 (v3.5); Lighthouse CLI, the Vercel preview and the owner review need the owner* | Full Playwright + axe, Lighthouse, EN/ID copy, owner review on the Vercel preview | DoD (§17.3) fully checked |

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

### 17.3 Definition of Done (v3)

- [ ] *(owner review)* Reads as *The Paper Studio — Walkthrough*: a fullscreen paper office the visitor walks through, where information arrives as paper beats and every scene hands off to the next along the office plan.
- [ ] Every chapter follows §4.4–§4.6: beats with a named origin, still text during holds, acts that lead their sheet, handoffs from §4.3, track caps met.
- [ ] Every sheet has the five material parts (§2.4); every scene has 8–14 layers in named depth bands (§2.5) and passes the Depth and Station tests.
- [ ] Passes the eight authenticity tests (§3.3) and contains no banned pattern (§3.2).
- [ ] Tokens only; light and dark verified; shadows, rims and falloff follow the light tokens, including the workday arc.
- [ ] EN/ID parity and `portfolio.ts` integrity preserved; no invented facts; every fact is in HTML content sheets, not only in art.
- [ ] Hero renders without a splash; the `h1` is the LCP; 3D is lazy, capability-gated, with a pixel-matched poster.
- [ ] Motion is compositor-only and scroll-linked moves need no JS; reduced motion, no scroll-driven support, short screens and 200 % zoom all give the stacked studio with every fact and control.
- [ ] Experience gates in §9.6 pass (LCP, CLS, INP, scroll smoothness, first-load JS).
- [ ] Keyboard, focus rings, semantics and ARIA verified; depth reveals work on focus; axe clean; no horizontal overflow at 390 px.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run check:design`, and Playwright pass.

---

## 18. Glossary

- **Slide-over** — v2 term for the About sheet scrolling over the sticky hero; replaced by the `01 → 02` handoff.
- **Cut edge** — the 1 px seam plus offset recess edge that makes a surface read as cut paper.
- **Capability gate** — runtime check deciding whether the R3F figurine may load.
- **Poster** — the static image of the figurine rendered from the same camera as the 3D view.
- **Station** — one section's corner of the paper office, shown in its own shadow box (§2.2).
- **Shadow box** — the framed, deep paper diorama that holds a station's scene.
- **Depth band** — Far, Back, Mid, Front, Frame: the `z` ranges every layer belongs to (§2.5).
- **Unfold into depth** — a station's layers separating from flat to full depth as it enters (§10.2).
- **Camera dolly** — scroll-linked camera movement inside a station's 3D space.
- **Chapter / Stage / Beat / Act / Handoff** — the v3 scroll model (§4.1).
- **Reading lane** — the empty part of a station composition where beat sheets hold (§4.5, §8).
- **Occluder** — a cut-out copy of an object's front edge drawn over an emerging sheet (§4.4).
- **Stacked studio** — the v2.2 layout, used as the fallback (§8).
- **Split stage** — the mobile theatre: stage pinned in the top 46 svh, beats below (§8).
- **Stop-motion pose** — a figure pose swapped by opacity at a beat boundary (§10.2).
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
| 2026-11-23 | **v2.2 — R2 built.** Six office stations on one shared room (`scenes/office.tsx`: 1600 × 640 strips, window with day/dusk sky, wall, floor, figure layer) through `Station`: Pinboard (About), Filing Cabinet (Experience; folders follow the work/organisation tab and lift with the open ledger row via `:has()`), Drafting Table (Services), Shadow-Box Gallery (Projects; `ProjectShadowBox` with `project.motif` layers), Archive Shelf (Certificates; binders tilt with the open folio), Mail Tray (Contact; postmark after a real send). `FrameBack` footer, Empty Drawer 404 (cabinet with `peer` pose). Figurine poses `pin`, `folder`, `draw`, `hang`, `binder`, `seal`. Workday light via `ShadowBox light` (midday → afternoon → golden). `paper-kit` sheets emit compact classes (`pk-*`, `--x/--y`, day/night via `--pk-fall-ref/--pk-rim-ref`). Performance fixes: static art serialised with `svgString` (no hydration), section-wide scroll settle removed (permanent giant layers), `content-visibility` on scenes removed (anchor drift). Results: lint, types, `check:design`, build green; Playwright 103 passed / 12 skipped; 390 px at 4× CPU LCP 1.16 s, CLS 0, 3 long frames (max 110 ms); 1440 px LCP 0.61 s, CLS 0, 3 long frames (max 80 ms), so the 50 ms desktop gate is not met yet; the remainder comes from the sticky-hero push overlap and is R3/R4 scope. HTML 1.45 MB raw / 218 KB gzip. First-load JS 201 KB gzip. |
| 2026-11-23 | **v3.0 — *Walkthrough*.** Owner feedback on R2: keep the look, but make the paper craft fullscreen; information should arrive on scroll from below, the side, above or out of the paper objects, in smaller pieces; scenes should hand off with the current assets leaving one way and the next arriving from another; the 2D/3D paper world fully animated by scroll and click. New §1 (diagnosis of v2.2, rubric v3 with Scroll choreography, 7 directions, 4 refinements, persona stress test; Chapter Theatre D4′ wins with 90.75; v2.2 rescored 75.0); v2 record kept as §1.7 history. New §4 (chapters, stages, beats, acts, handoffs; five beat origins; office plan and handoff map; beat anatomy; beat sheets for every chapter; track budget). New §8 (theatre, split stage, stacked studio). New §9.7 (chapter theatre architecture: named timelines, crossing-range counter-translation, `timeline-scope` acts, `beats.ts` data, rules). §10.2 rewritten (move families, stop-motion poses; pinning only through chapter stages; scroll libraries, text motion during holds and animating anything taller than `100svh` forbidden). §3.3 adds the Choreography test. Tokens `--scrim-paper`, `--beat-top`; poses `reach`, `hand`; components `Chapter`, `Beat`, `ChapterIndex`; guardrails for `beats.ts`, scroll listeners and chapter e2e; roadmap W1–W5 replaces R3–R5; DoD v3. No code changed in this revision. |
| 2026-11-23 | **v3.1 — W1 built.** `scenes/chapter/` (`spec.ts` types + `validateChapter`, `chapter-css.ts` generator, `Chapter` / `Beat`, client `ChapterFit` that sets `data-stacked` when a pinned sheet is taller than 70 % of the viewport), `styles/chapter.css` (stacked studio by default; theatre inside `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference` + `min-height: 561px`; split stage under 768 px), `pinboard/beats.ts` and `cabinet/beats.ts`; About and Experience converted; pose `reach`; stations take `wide` and `only` (front copy for the occluder). Measured and amended: handoffs use `entry` / `exit`, not the crossing ranges (§9.7); pinned-sheet entrances fill `forwards` only; sub-steps run from 60 % of the sheet's arrival to the end of its hold; the track cap is the measured formula (§4.6); `03` reads in the left lane. Mechanisms verified in Chrome and Edge; composition checked in Chrome at 1440 × 900 (light, dark), 390 × 844 split stage and reduced motion (stacked studio). Safari 26 not verified (WebKit not installed here). Pointer look does not reach the stage inside the theatre (the beat flow covers it): open for W3. Gates: types, lint, `check:design`, build green; Playwright 103 passed / 12 skipped after one re-run (two desktop-dark timeouts under parallel load passed on retry). `e2e/perf.spec.ts` added; it is not green on this machine: one unattributed long frame per run near the page end (116 ms desktop, 160 ms at 4× CPU), and an A/B with every chapter animation switched off showed the same frames, so W1 adds none; the gate needs a run on real hardware. |
| 2026-11-23 | **v3.2 — W2 built.** Every section is a chapter: `04` Drafting Table (`drafting/beats.ts`; cover sheet + `figure-alt`), `04b` Gallery as its own `section#projects` (`gallery/beats.ts`), `05` Archive Shelf, `06` Mail Tray (`mail/beats.ts`, Emerge from the envelope); stations take `wide` / `only`. Generator: stage moves `tilt-up`, `dolly-out` (canvas scale), `turn-over`; act mode `off`. Hero `01 → 02` push-in + pan in `scene.css` (sticky hero and its scroll push removed). Found and fixed while verifying: the global `section { background }` hid the outgoing stage during handoffs (theatre chapters are now transparent and `isolation: isolate`); the footer sat under the last stage (`z-content-ui`); lane-right sheets kept their desktop offset on mobile; a diagonal tilt left empty corners (now vertical); clicking a control in a moving sheet missed (focus rule is keyboard-only now); `main` clips horizontal overflow during pans. Deferred to W3 and recorded in §4.5: hero ticket Emerge, frames hung two at a time, binders pulled one by one, envelope flap and `hand` pose. Gates: types, lint, `check:design`, build green; Playwright 113 passed / 16 skipped, including the new `e2e/chapters.spec.ts` (every pinned beat composed mid-hold at `--beat-top`, no overflow entering any chapter, stacked studio under reduced motion). `e2e/perf.spec.ts` still fails on this machine (long frames up to ~550 ms); with every chapter and hero animation switched off the same run showed frames up to 750 ms, so this machine cannot judge the gate; it needs real hardware. Safari 26 still unverified. |
| 2026-11-23 | **v3.3 — Cued paper + W3.** Owner feedback on W2: sheets read as stiff cards, and they are hard to read because they follow the scroll. Decision record §1.10 (C3 cue + deck, 92.0; P2 cardstock leaf; F1 flex in flight). Built: `ChapterCue` (one `IntersectionObserver` per chapter; `data-state` / `data-dir` / `data-beat` / `data-reached` / `data-shown`), `Chapter` renders pinned sheets into a sticky `.beat-deck` with empty `.beat-track`s, the theatre needs `[data-cue]` (no JS = stacked studio); `chapter-css.ts` writes time-based flights per origin (bend about the leading edge, overshoot, flat), reverse twins for scrolling back, cued acts (transitions, new mode `pulse`, `delay`, `origin`) and timed poses (`end: 'alt'`); `.paper-leaf` (cardstock tile under a 78 % veil, `--leaf-lip`, curvature shade on `::before`); motion tokens `--ease-leaf`, `--dur-leaf-in/out`, `--dur-act`, `--dur-pose`, `--dur-step`, `--gap-step`, `--dur-morph`. Track budget is now `35 + Σ(40 + hold) + 70`. Rules amended: §4.4 (beat anatomy), §4.6, §9.7 (diagram, *No JS on the scroll path* now admits `ChapterCue`, *Two clocks*, *Text holds still*), §10.2 (triggers, timing, programmatic scroll for keyboard focus, pinning). W3: hero tickets emerge from the notebook on load; drafting light pool swings with the lamp; gallery frames hung two at a time; archive binders pulled one by one; mail flap opens and the figure holds the card out (new pose `hand`); frame → sheet morph for the case study. Found and fixed while verifying: the W2 focus rule switched a showing sheet's animation off and on when focus moved from a text field to a button, replaying its entrance between press and release (the contact form never submitted); the rule now only composes sheets that are off. Known limitation: find-in-page into an off pinned sheet (§1.10, W4). Gates: types, lint, `check:design`, build green; Playwright 113 passed / 14 skipped (excluding perf; `chapters.spec` now checks every pinned sheet is cued, flat, at `--beat-top`, still while the wheel moves inside its track, and alone on the deck); the axe case-study test waits for the morph to end. `e2e/perf.spec.ts` still fails on this machine (desktop long frames over 50 ms, as in W2 where it failed with every animation off too): it needs real hardware. Safari 26 still unverified. |
| 2026-11-23 | **v3.4 — W4 built (mobile & hardening).** Chapter bar below 1024 px (`shared/ChapterBar`: current chapter with `aria-current`, a 44 px link to the next one, a scroll-driven reading hairline; hidden on the hero; `--chrome-h` = 4 rem, 6.75 rem below 1024 px; `section[id]` scroll margin follows it). `04b Projects` is in `pageSections` (index, navbar, bar). Split stage sticks under the chrome (`top: var(--chrome-h)`, 46 svh). `content-visibility: auto` + `contain-intrinsic-size: auto 100svh` on `.stage` / `.stage-front` inside the theatre only (checked at 1440 × 900: every handoff paints both stages, nothing skipped). Cardstock texture served through `image-set` (AVIF 47.8 KB, WebP 74 KB fallback). Find-in-page: `beforematch` rejected (§1.10). **Measured, not reduced:** first-load JS 203 KB gzip (gate 220, met); HTML 1.75 MB raw / 243 KB gzip; inline RSC payload 825–956 K characters, almost all station art serialised twice (HTML and RSC text rows). Cutting it means moving station art to static files loaded per chapter, which conflicts with §9.6 *station scenes server-rendered* and would leave the stacked studio without art when a file fails; **proposed to the owner, not built.** Tests: `chapters.spec` adds text zoom 200 % → `data-stacked`, page zoom 200 % (720 × 450) → stacked with no overflow, no overflow at 320 px along the whole walk, the chapter bar; `helpers.toReadingWindow` scrolls a control below the split stage and waits for its sheet's entrance before a tap (Playwright stops scrolling as soon as a control is anywhere in the viewport, which on mobile is under the stage). Gates: types, lint, `check:design`, build green; Playwright 124 passed / 18 skipped excluding perf (one figurine idle test timed out under six workers and passed 6/6 serially); `contact.spec` 48/48 over three repeats. Not measurable here: §9.6 gates on a real mid-range Android over 4G, `perf.spec` (fails on this machine since W2), Safari 26. |
| 2026-11-23 | **v3.5 — Experience files + sound (owner request).** `03` Experience: the ledger list and its `Work` / `Organization` tabs are gone; every role is a pinned beat whose sheet emerges from its own folder (`folderMouth(n, i)` in `CabinetStation`, occluder `drawer-front`), the folder lifting while its beat is on; reaching the organisation roles swaps the drawer's folder set; **Open the file** opens the full entry as a paper dialog (`ExperienceFile`). New *record chapter* budget (§4.6): `records: true`, ≤ 800 svh, entries hold 30 svh (Experience is 735 svh); whole-page cap 2,400 → 2,900 svh. Sound (§10.3): off by default, one `SoundToggle`, everything synthesised with Web Audio (no audio files), engine loaded only on demand (≈ 2 KB), cues from `studio:cue` (new event from `ChapterCue`), control clicks (`data-sound`) and dialog `toggle`. Found and fixed while verifying: an incoming `tilt-up` stage (Services) was filled backwards to −200 svh and showed through two viewports before its chapter arrived (seen as a seam in the W4 handoff check); stage `in` moves now fill `forwards` only, with a new `chapters.spec` test that no other chapter is visible mid-track. Tests: tabs/ledger tests replaced (every role has its own beat and folder; a role file opens from the keyboard and returns focus); EQbot anchor `experience-tabs` → `experience-files`; Playwright runs three workers locally (six overloaded the single `next start`). Gates: types, lint, `check:design`, build green; Playwright 127 passed / 20 skipped excluding perf; first-load JS unchanged (sound engine is a separate 1.7 KB chunk). |
| 2026-11-23 | **W5 — local QA (v3.5).** Full Playwright + axe green (127 passed / 20 skipped excluding perf). EN/ID copy for the new Experience files and the sound switch reviewed (natural Indonesian: *Berkas*, *Buka berkas*, *Suara dan musik*); role sheets are labelled by their bilingual heading (`aria-labelledby`), not an English-only `aria-label`. Vitals measured in Chrome through CDP (the Lighthouse CLI is not installed here and installing it needs the owner's approval): mobile 390 × 844 at 4× CPU and ~9 Mbps / 150 ms: LCP 2.05 s (gate 2.5), CLS 0.001 across a full wheel walk, long tasks while walking up to 317 ms (9 over 50 ms; the 100 ms mobile gate is not met in emulation on this machine, which in W2 also showed 550–750 ms frames with every animation off); desktop 1440 × 900: LCP 0.94 s, CLS 0, no long task over 50 ms during the walk. Open for the owner: Lighthouse run, deploy to a Vercel preview, review on a real mid-range Android over 4G (§9.6), Safari 26, the RSC-payload proposal (v3.4). |
| 2026-11-23 | **W5 — Lighthouse (owner approved the install).** `@lhci/cli` 0.15.1 is a devDependency (same pin as CI) with `npm run lighthouse` (`lighthouserc.json`, mobile, simulated throttling, 3 runs; reports in the ignored `.lighthouseci/`). Production dependencies: 0 vulnerabilities (the 19 npm reports are dev tooling). First run: Accessibility 0.99 from `heading-order` (shelf project cards were `h4` straight under the chapter `h2` since `04b` became its own chapter); fixed with `ProjectCard level` (h3 on the shelf, h4 in the archive). Result: **Accessibility 1.00, Best Practices 1.00, SEO 1.00; Performance 0.45–0.59, LCP 6.4–6.9 s simulated, TBT 0.67–2.35 s, CLS 0** (v1.5 was 0.87–0.88, last measured before v2). Diagnosis, not yet acted on: LCP is 91 % render delay; the LCP element is the cardstock tile `<image>` inside the SVG art, not the hero `h1` (§9.6 expects the `h1`); main-thread work 8.7 s, mostly *other* (4.5 s) and style/layout (2.2 s), with one ~2.5 s unattributed task; DOM 7,865 elements. The §9.6 LCP gate is not met under Lighthouse's simulated slow 4G, while the CDP measurement (4× CPU, ~9 Mbps) gave 2.05 s; both need confirming on a real mid-range Android. |
| 2026-11-23 | **W5 — load work (v3.5, owner: "fix it").** Traced with CDP at 4× CPU (412 × 823), with invalidation tracking. Fixed: (1) `LanguageProvider` wrote `<html lang>` on hydration even though the value was unchanged, and Blink then restyled all 6,594 elements for `:lang()` (one 951 ms recalc); it now writes only when the language really changes. (2) `ChapterFit` read `offsetHeight` on mount, and `ChapterCue` read rects between its own writes, which forced a synchronous style and layout per chapter; heights now come from `ResizeObserver`, and the cue's starting state comes from each `IntersectionObserver`'s first report. (3) `.scene-lazy` (`content-visibility: auto`) on station viewports outside the theatre. (4) The cardstock tile is preloaded (`fetchPriority: high`), and the grain pattern is drawn at 128 px under `patternTransform="scale(2)"`, so the LCP element is the hero text, not the tile. (5) An inline script in `Chapter` sets `data-cue` while the HTML is parsed, so the page is not laid out first as the stacked studio and then again as the theatre (without JS it never runs). Trace before → after, at 4× CPU: style + layout 3.9–5.1 s → 2.3 s; forced recalcs 428–1,048 ms → 90 ms; largest single recalc 560–1,539 ms → 191 ms. **Lighthouse could not confirm the gain here:** the machine was under ~37 % background load (another dev server, Visual Studio), and runs spread widely (simulated Performance 0.35–0.46, TBT 2.2–11.5 s for the same build; devtools-throttled LCP 3.3–9.2 s). Accessibility, Best Practices and SEO stay 1.00, CLS 0. The scores need a quiet machine or PageSpeed Insights on the Vercel preview. What remains is structural: about 7,900 DOM elements of SVG art and the RSC payload (the v3.4 proposal). Gates: types, lint, `check:design`, build green; Playwright 127 passed / 22 skipped; `perf.spec` fails as it has since W2 on this machine. |
| 2026-11-23 | **v3.6 — owner feedback (six requests).** (1) **Folio under 768 px**: the theatre now starts at 768 px (`chapter-css.ts` `THEATRE`, `chapter.css`); below it every chapter is the v1 page of `main` (no stage, no figurine, plain sections and ruled cards); the split stage is gone (§8). (2) **About**: the owner's photograph (`me.png`, restored from `main`) is pinned to the board as an HTML print; it comes forward beside the bio during the dossier and goes back; the four index cards come forward one by one as Emerge sheets off their card, which pales (new act property `opacity`; Emerge may take `occluder: []`) (§4.5 `02`). (3) **Experience**: every role sheet carries its v1 photograph taped to its corner and in its file (§4.5 `03`). (4) **One modal standard**: `PaperDialog` owns header, body, footer, sizes and motion; the file, case study, additional skills and archive dialogs use it (§7). (5) **Services**: a pile of six blueprint sheets, the front one tucked under the pile on each beat (new `stack` group) (§4.5 `04`). (6) **Projects**: the featured projects hang two per segment on one wire that slides sideways on each beat (new `rail` group) (§4.5 `04b`). Groups (`ChapterSpec.groups`, §4.4): consecutive beats holding 30 svh that share one composition; `Chapter` marks their beats `data-group`; `validateChapter` checks them; a pile is a record run (800 svh cap). Conflicts reported before coding and decided by the owner: mobile as one component with CSS (not the `mobile/*` tree), `me.png` (not `Profile.webp`), the wire moved by vertical scroll (not a swipe row). Tests: `chapters.spec` counts one sheet or one group on the deck, new folio test (no stage under 768 px, photograph loaded); `a11y` dialog bodies are focusable. Gates: types, lint, `check:design`, build green; Playwright 129 passed / 24 skipped; only `perf.spec` fails, as it has on this machine since W2 (mobile now one frame of ~120 ms). Checked by eye in Chrome at 1440 × 900 (About dossier and cards, the services pile, the wire, the file and case-study dialogs) and at 390 × 844 (folio); not checked: dark theme screenshots of the new parts, tablet 768–1023 px, Safari. |
| 2026-11-23 | **v3.7 — the illustration moves (owner: "points 5 and 6 do not yet animate the illustration").** **Services** (§4.5 `04`): the drafting board gets a pile of six service blueprints (`plans` HTML layer of six SVG sheets, `drafting/plans.tsx`, board geometry moved to `drafting/board.ts`); per `svc-*` beat the station CSS sets each sheet's depth, tucks the front sheet under the pile (lift to the left, slide under; `plan-tuck` / `plan-untuck` keyframes, z-index animated) and inks the new drawing in. **Projects** (§4.5 `04b`): the picture rail carries the six featured projects as framed motifs and slides sideways with the wire of cards; the pair in front swings; the cards hang under their frames as labels (no screenshot in the theatre), sized from the rail's world numbers so both move as one; neighbours dim to 35 %; `wire-*` beats swap `hang` ↔ `reach`. Layers: drafting 14 (at the cap), gallery unchanged. Under reduced motion, in the folio and in the stacked studio none of this runs (theatre-only layer; station CSS gated on the theatre query). Test: `chapters.spec` lets the gallery labels sit under the frames instead of at `--beat-top`. Gates: types, lint, `check:design`, build green; `chapters.spec` 26 passed / 10 skipped; full run 127 passed / 24 skipped, `perf.spec` fails as before. Checked by eye in Chrome at 1440 × 900 (each service drawing, a tuck mid-way, the rail at title and at each segment, mid-slide); not checked: dark theme, tablet 768–1023 px, Safari, other aspect ratios for the label/frame alignment. |
| 2026-11-24 | **v3.8 — owner feedback (three requests).** (1) **Gallery**: the frames on the rail hold the project photos; the wire moves sideways too (drag, swipe, trackpad, keys, ‹ › buttons; `RailNav`), each move scrolls to the segment's track (§4.5 `04b`; owner exception to §10.2). (2) **Stage fit by ratio**: `min(cover(theatre), contain(safe))` with a sliding camera centre, a safe rect per chapter, the navbar band and a floor limit; wall and floor bleed wider (§9.1). (3) **Services on the board**: each service is written on the front blueprint in the board's perspective, beside its drawing (§4.5 `04`). Conflicts with §10.2 (sideways input) and §4.5 `04` (text on sheets) reported in chat; the owner's request decides. Tests: `chapters.spec` new test (a drag moves the wire one segment and opens nothing; the ‹ button moves it back); board-written sheets are exempt from "lies flat". Gates: types, lint, `check:design`, build green; Playwright 131 passed / 26 skipped, only `perf.spec` fails, as before. Checked by eye in Chrome at 1024 × 768, 1280 × 1024, 1440 × 900, 1790 × 736, 2560 × 1080; not checked: dark theme, real touch devices, Safari. |
| 2026-11-24 | **v3.9 — owner feedback (ten requests).** (1) **Services camera**: while a service is on, the stage scales 1.5 × about the board's centre and slides it under the navbar; the written service follows the same mapping (`--svc-z`, §4.5 `04`). (2–4) **Figure**: white almond eyes with a dark pupil and glint, lighter skin tokens, pupils follow the pointer in 2D (`FigureGaze`; owner exception to §2.7 / §3.2). (5) **Projects**: MejaScalp (AI crypto scalping assistant) and BukuDompet (family money journal) added and featured; the wire has four segments; slides from the owner's decks (webp); TBG's role carries two of the owner's work photos (`Experience.photos`). (6) **Experience file**: the tools with their logos sit under the description. (7) **Sound**: an energetic generated groove and five new cues. (8) **Section hints**. (9) **EQbot** as a wide panel with the host figure (new pose `explain`). (10) **Livelier puppet**: blink and breathing in 2D, host hops and sways, bubbles pop. Conflicts with §2.7 (face, skin, pointer), §3.2 (cursor followers) and the EQbot spec reported in chat; the owner's request decides. `Logo-TBG.png` removed (orphan after the photo swap). |
| 2026-11-24 | **v3.10 — owner feedback (six requests).** (1) **About photo**: `PhotoPrint` — a terracotta card cut larger behind the white print, two strips of washi tape, an italic name with role and city, a dashed date stamp; a sheen crosses the photo when the dossier brings it forward; the folio uses the same print. (2) **Eyes at night**: new token `--ill-eye` (the eye white used `--ill-page`, which is dark in the dark theme). (3) **Lamp hint** and (4) **Mail Tray lamp** as a theme switch (§4.5 `06`). (5) **Micro-interactions**: `StagePoke` lift / wobble / hop, plant sway, and the wayfinding hint. (6) **Footer**: call to action with availability and two actions, then studio / index / contact / settings columns, then a legal bar with *Back to top*. |
| 2026-11-24 | **v3.11 — owner feedback (five requests).** (1) **Services on every ratio**: the written services were measured by `ChapterFit` as pinned sheets; their tilted box (443 world units × zoom) passed 70 % of the viewport on wide-short screens, so the whole chapter dropped to the stacked studio. They are now `.stage-sheet`s, sized by the stage fit only; checked at 1024 × 768, 1280 × 1024, 1366 × 768, 1440 × 900/1200, 1790 × 736, 1920 × 1080, 2560 × 1080. (2) **Certificate books** (§4.5 `05`): four book beats in the theatre, each a book that flies off its binder, opens, lists its certificates as links and goes back; the folios stay for the stacked studio and the folio page; a `swish` and a page cue. (3) **Ouch!** splash on the figure (`StagePoke`, figure layers ignore the area cap). (4) **Welcome tour** on the first visit (owner exception to *Never obstructive*). (5) **EQbot scrim** blurred and darker (owner exception to *no glass*). Tests: `chapters.spec` knows the books (180 s walk), `interaction.spec` has the books, the welcome tour, and the folios on mobile. |
| 2026-11-24 | **v3.12 — owner feedback (nine requests).** (1) **Ouch!** without its burst card: a small spatter and a new `ouch` sound. (2) **Photo print**: the `2026` stamp is an *Available* tag with a lamp that blinks slowly (3.6 s, `--color-sage`). (3) **Role file**: `PaperDialog` takes a `mark`, the company logo at the far left of the header (initials when there is no logo). (4) **Case study**: the screens come first and stay modest (16:10, at most 46 rem wide and 44 svh tall), then the stack, then the overview. (5) **Books**: the pages carry the cardstock grain, the curve of an open page (gutter shade, highlight, fore-edge shade), a block of page edges, a corner that curls further under the pointer; the cover overshoots and settles, the right page lifts with it, and gives a little under the pointer. (6) **Footer**: settings and colophon removed. (7) **Any desktop ratio**: (a) the root type grows on large screens with the smaller of 0.84 vw and 1.5 vh, between 100 % and 137.5 % of the visitor's size, so sheets, lanes, navbar and dialogs scale with the stage (Tailwind `text-[Npx]` became rem); (b) `ChapterFit` raises the deck under the navbar (`--beat-top-fit`) before it falls back to the stacked studio, so Experience and Contact stay in the theatre at 1024 × 768 and 1280 × 720; (c) the Services push-in is 1.3 × up to 17:10 and 1.15 × up to 7:5, so the figure stays in the shot; (d) the hero is two columns and hands off from 1024 × 680, and widens past 1680 px; (e) the books grow to 60 rem. Checked at 1024 × 768, 1280 × 720, 1440 × 900, 1920 × 1200, 2560 × 1080, 3440 × 1440. (8) **Figure**: the neck never sorts in front of the head (`placeParts`; the `draw` pose pitched the head back past it). (9) **EQbot**: the choices are one row that scrolls sideways, so the conversation gets the height. |
| 2026-11-24 | **v3.13 — owner feedback (four requests).** (1) **Role file header**: the logo mark is exactly as tall as the header, a square panel flush with its top, bottom and left edges (`.pd-mark`, negative margins from the header padding variables). (2) **Welcome tour, page 2**: a cut-paper shadow box replaces the flat drawing. The paper me swipes his near hand up and down slowly in five stop-motion frames (new poses `swipe-0`…`swipe-4`, `SWIPE_POSES`); beside him a browser card scrolls its chapter sheets, its thumb runs down the rail, a sheet rises and a book opens, all keyed to one progress `--p` written by a single rAF loop (7.6 s: rest, up, hold, down); a paper arrow tag turns with the gesture; cardstock grain and paper drop shadows; reduced motion shows one frame halfway up. The page is `PaperDialog md`. (3) **Sound hint**: a paper speaker on the hero desk is a sound switch (`DeskSpeaker`, `SPEAKER` rect; the mug moved left), and the welcome page has a sound slip with the switch (§10.3). (4) **Life-size hero figure**: he stands on the floor beside the desk (pose `lean`, `FIGURINE` 448 × 714 at 1.4 : 1, `STAGE_FRAME` 320 × 510 so the greeting wave fits, `GROUND` contact shadow); the poster and the 3D view share the frame and `BASE_POSE`, so they still match. |
| 2026-11-24 | **v3.14 — Pocket studio (owner: redesign the mobile experience).** Replaces the v3.6 Folio under 768 px (§8): station windows return in flow, paper leaves with a cued rise, depth drift and unfold on native view timelines, piled index cards and blueprints, a sideways gallery wire, a hero that puts the CTAs before the tickets. `chapter.css` only, plus two hooks in `Hero.tsx` (`hero-tickets`, `hero-cta`). No new dependency, no snapping, no JS beyond the existing `ChapterCue`. `e2e/chapters.spec.ts` mobile tests updated. |
| 2026-11-25 | **v3.15 — Pocket studio, denser.** Owner: sections too long on a phone. `02`/`03`/`04` trays swipe sideways (replacing the v3.14 sticky piles), core stack and tools trays, two-column contact links, clamped certificate text, icon-only footer contacts; the cards play their rise when swiped into view (`ChapterCue` no longer marks a card waiting off to the side as shown). Page height 18,803 → ~10,950 px at 390 px. CSS only, plus `footer-cols` / `footer-reach` hooks in `Footer.tsx`. |
| 2026-11-25 | **v3.16 — owner feedback (four requests).** (1) **Availability tag** on the photo print: a ticket with a sage edge set inside the photograph's lower left, never under 11 px (`.pin-print-stamp`). (2) **Tray progress and hint** (mobile): a hairline track with an accent fill on a native scroll timeline under every tray, and one nudge when a tray first comes up (`data-hint`, `ChapterCue`); the gallery wire is a grid like the other trays. (3) **Career path** (`03`, mobile): `CareerPath`, a paper road with one milestone per role; swiping the folders draws the road, lights each milestone and walks a pin along it (scroll timeline + `offset-path`). (4) **Project cards**: the screenshot sits whole inside the paper laptop (`object-contain`, no crop) and every project has a shadow-box motif (`motifFor`: own, else design / tools / play / system, four new motifs). |
| 2026-11-25 | **v3.17 — fixes (owner: three bugs).** (1) The photo print lost its frame rules to an edit slip (text spilled outside the photo on the pinboard); restored, and the availability tag scales with the small stage print. (2) `04b` mobile: the gallery title and archive button were grid items in the wire's row, pushing the last card (Sportainment) onto a second row; they are now sticky rows above and below the wire, and each card carries its own length of wire. (3) Dialog header on a phone: a 3 rem mark tile, a 1.25 rem title, a two-line lede (`paper.css`). |
| 2026-11-25 | **v3.18 — owner feedback (three requests).** (1) **Blurry role photos**: the sources are sharp (900–1500 px); the file's photos asked for `sizes` of 40 vw / 360 px, so a phone received a 384 px file for a 516 px slot, at quality 75. `RolePhoto` takes its own `sizes` (card 30 vw; file 88 vw on a phone), quality 90 (`images.qualities: [75, 90]`, required by Next 16), and the header logo is requested at 160 px; the file's photos sit two across on a phone. (2) **Role card hierarchy** (`03`): title, company, place, then a highlighted date band (`RoleDates`: month in accent, year in ink, arrow, end or a lamp for "now", and the duration); the year stamp and the period line are gone. (3) **Mobile menu**: the panel unrolls (grid 0fr → 1fr), links are set down in turn, the page dims below the bar, the hamburger turns into the cross; closed it is `inert` and hidden. |
| 2026-11-25 | **v3.19 — desktop (owner: three requests).** (1) **Services**: the pencil on the blueprint is removed (`tools` layer). (2) **About**: the four index cards no longer replace one another; a new `grid` group (`chapter-css.ts`) lays them in a two-column grid in the lane, each arriving from its card on the board and staying, the board's card staying pale (`off`); the lane is 31 rem so the grid clears the board. (3) **Experience, the career board**: the cabinet and figure move right (`EXP_SHIFT`, `board.ts`) for a board on the wall between the lane and the drawer. Per role: scroll 1 the drawer opens; the file comes out of its folder into the lane; at the next beat it is folded, shrunk and pinned (`BeatSpec.exit.pin`, a company-logo disc with a push-pin head and its year) while the next file comes out; a thread draws between pins, the path snaking down the board (3 per row); a closing `board` beat zooms in on the board, and leaving zooms out into the handoff to `04`. Pins and threads are CSS state on `data-reached` in the theatre only; every other layout shows the finished board. The lane is 24 rem on this chapter. Record-chapter track cap 800 → 880 svh (as built 805 svh; page ≈ 2,890 svh of 2,900). Phones: the board's note beat is hidden; the stage window shows the board with every pin. |
| 2026-11-25 | **v3.20 — owner feedback (three requests).** (1) **About**: a closing `tidy` beat after the fourth card; the `grid` group takes a `release` beat, and when it is reached the four sheets fold small and fly back to their own cards on the board one after another (`BeatSpec.exit`, the pin mechanism of v3.19), the cards on the board turning bright again; the dossier holds 30 svh to keep the chapter at 595 svh. (2) **Experience layout**: the figure stands beside the cabinet (`C.x + 445`), no longer in front of its open drawer, and on the floor line (y + 30). (3) **Experience, two paths**: work and organisation roles are separate paths on the board (labels *Work path* / *Organization path*, a rule between them); each runs from its START (oldest role) to its end, a **START** badge on the oldest pin and a **NOW** badge (a lamp) on every role still going; the files arrive newest first, so each path is drawn backwards, and the closing beat zooms in and walks a marker along each path from START to NOW (`offset-path`). Page track cap 2,900 → 3,000 svh. |
| 2026-11-25 | **v3.21 — career board (owner: five requests).** (1) *Why START and NOW sat side by side*: Freelance is both the oldest work role and still going, so its one pin carried both badges. NOW now marks only the newest role of a path, and only when it is still going, so a pin carries at most one badge. (2) **Both paths climb**: START at the bottom, the newest role at the top (work: a serpentine of two columns, rows bottom to top; organisation: one column on the right, divided by a dotted rule; `board.ts` `ZONES`). (3) **The walker is gone**; at the closing beat the light runs each path from START: each pin's ring and push-pin head glow in turn (`career-glow`, `career-head`), the thread before it lights, and when the light reaches the current role its pin throws a small two-ring firework with a flash (`career-spark`, `career-flash`). (4) **A pin opens its role file** (`CareerPinClicks`: it presses the role sheet's *Open the file* button, so the dialog, focus return and keyboard path are the existing ones); pins are mouse-only stage art and pointer-active only once pinned. (5) **Backsound louder**: music bus 0.5 → 1.2 and master 0.9 → 1.0 (≈ +8 dB over the compressor), sound effects held at their level. |
| 2026-11-25 | **v3.22 — owner feedback (three requests).** (1) **Doubled backsound.** Cause: the room echo was 0.23 s, off the beat grid (a sixteenth is 0.134 s), and the whole music bus fed it, so every kick, clap and hat came back as a second hit; v3.21's louder bus made it plain. Now the echo is an eighth note (`60 / BPM / 2`), only the pad and the arpeggio go to the room (kick, clap, hats and bass are dry), and the feedback is 0.28. Guards so it cannot return: `createEngine` disposes any earlier engine first (`window.__studioEngine`; a hot reload or remount can no longer run a second groove), `dispose()` stops the clock, the LFO and the context, and `start()` is one promise (the first gesture and the sound switch cannot start it twice). (2) **Board sounds**: `pin` (a tack and a thud, when a file is pinned, after its `fold`), `glint` (a bell for each pin the light reaches, one step up a D major pentatonic scale per pin), `whistle` and `burst` (the rocket and the firework); the closing beat reads its times from the CSS (`--lit` on each pin, `--t` on the firework), so sound and picture cannot drift apart. (3) **Light and firework redone**: a comet runs each path from START to NOW (a dashed copy of the path with its dash animated: a soft tail and a bright head), each pin's ring and push-pin head glow as it passes, then a rocket rises from the current role and bursts into two rings of streaks, falling embers and a flash; the parts stay hidden until their delay. |
| 2026-11-25 | **v3.23 — pins bring the cards back (owner).** At the closing beat (every pin up, the camera on the board) a click on a pin no longer opens the dialog: it brings that role's sheet back into the lane as a card, folded out of its pin (the exit flight played backwards, `b-experience-<id>-out-r`), without replaying the path (the chapter's `data-beat` and `data-reached` do not change; the state is `data-peek` / `data-peek-out` on the chapter, `CareerPinClicks`). Another pin swaps the card; the same pin, a click on the stage or Escape puts it away (the flight forwards); scrolling on or back drops it. All eight cards can be opened this way, one after another. The card's *Open the file* button opens the full entry as before. Before the last beat, and on a phone, a pin click still opens the file directly. |
| 2026-11-25 | **v3.24 — night paper and spot lamps (owner).** (1)+(2) **Paper is never black at night**: `--ill-page` (pins, cards, prints, map sheet, the stage's paper) is a dim warm off-white (`#dcd1b4`), `--ill-envelope` likewise; every paper surface (`.paper-leaf`, `.pd-sheet`, `.paper-card`, `.paper-sheet`, `.ticket`, `.role-photo`, `.pin-print`, `.career-pins`, `.book`) re-declares the ink / muted / line / paper / accent tokens (and the `--color-*` copies) for its own subtree in `tokens.css`, so text on it is dark ink on cream; blueprint sheets and the drafting tracing paper are excluded and keep the night tokens. (3) **Spot lamps** (`scenes/lamp.tsx`, `lampLayers`): like the Services lamp, hung on the wall at the upper right (the night light falls from there) with the head's open face turned to the subject and the beam fanning from that face (a gradient, brightest at the face, two cones and a pool; faded in with `--glow-opacity`, night only): over the About board, the Experience open drawer, my figure in Projects, the binders (books) in Certificates. By day each is only an object. |
| 2026-11-26 | **v3.25 — station-tailored multi-layered 2D/3D papercraft lamps & beam choreography (owner).** Round 5 decision record (§1.11, winner L5 at 94.50 / 100) and §2.3 lamp standard: replaced the generic stick-lamp helper and flat inline polygons with seven station-specific multi-layered paper fixtures in `scenes/lamp.tsx` (`architect` on `01` Desk, `barn-door` gallery gooseneck on `02` Pinboard, `clamp` industrial boom lamp on `03` Filing Cabinet, `drafting` pantograph study lamp on `04` Drafting Table, `track-can` ceiling spotlight with glare louvers on `04b` Shadow-Box Gallery, `picture-hood` library brass-paper trough lamp on `05` Archive Shelf, and `banker` cased-paper study lamp with pull chain on `06` Mail Tray). Each fixture is built from 6–9 stacked 2D paper planes at progressive `gap` depths (`k.stack` base/mount, twin parallel bars with tension springs and cable clips, 4-plane head with rear collar/vent fin, outer hood, `--paper-fold` side facet, recessed inner reflector wall, protruding warm bulb core and die-cut cross-baffle/barn-door flaps) paired with a 3-tier directional paper beam (`outer penumbra`, `mid fold cone`, `inner core ray`) and 3-tier concentric target pool strictly aligned to the `head → aim` vector. Every chapter's opening beat cues a synchronized swing of `lamp` and `lamp-light` around the exact pivot (`origin`), and every station renders a `DeskLamp` hit area so any lamp in the studio can toggle the Day/Night theme. |
| 2026-11-26 | **v3.26 — realistic perspective light refraction, floor termination in Selected Work, floating dust motes & fireflies (owner).** (1) **Perspective surface termination (`plane`, `surfaceY`, `projectToY`)**: fixed the tilted triangle cutoffs and mid-air elliptical rings seen in v3.25 — horizontal targets (`01` desk top `y: 654`, `03` open drawer `y: 342`, `04b` gallery floor below the character's ladder `y: 602`, `05` upper shelf `y: 298`, `06` mail desk top `y: 434`) intersect both beam rays with the horizontal plane so the light cone lands flat on the surface and casts a perspective-foreshortened radial pool; vertical/angled boards (`02`, `04`) use a soft radial wall wash; removed `.dark .lamp-head { rotate(-6deg) }` so the head aperture never desyncs from the beam cone. (2) **Realistic light refraction & falloff**: curved quadratic cone bases (`conePath`) softened with `PaperDefs` Gaussian blur filters (`pk-blur-3`, `pk-blur-2`), multi-stop inverse-square gradients (`--ill-page` hot core → `--ill-bulb` warm scatter), and an aperture bulb bloom halo. (3) **Floating dust motes & fireflies**: 14 seeded dust motes (`.lamp-mote`) drifting inside each light beam and 5 glowing fireflies (`.lamp-firefly`) with radial halos orbiting gently around each lamp (`scene.css`, paused under `prefers-reduced-motion`). |
| 2026-11-26 | **v3.27 — folder year ink fix, no black sections inside paper sheets, darker lamp-refracted night paper (owner).** (1) **Scene paper ink tokens (`--ill-page-ink`, `--ill-page-muted`, `--ill-page-accent`)**: SVG text and rules drawn on `--ill-page` inside the stage (`03` filing cabinet folder year labels and `03` drawer badge, `03` career board grid/routes, `05` archive binder spine labels and counts, `01` desk drawer labels, `02` pinboard calendar/card lines, `04` cover sheet lines, `06` letterpress lines and postmark, `FrameBack` label) used `--color-ink`/`--color-muted`, which turn light at night; they now use `--ill-page-ink` (`#241d15`), `--ill-page-muted` (`#5c5040`), and `--ill-page-accent` (`#8c3728`) so ink on stage paper is always dark and crisp. (2) **No black sections inside paper sheets**: removed the `.dark :is(.blueprint-leaf, .tracing)` dark-token override in `tokens.css` (which turned the `04` Core stack `.tracing` cards and `SkillChip`s black inside the cream sheet, as well as stacked/mobile `.blueprint-leaf` cards) and added `.index-card`, `.laptop-screen`, `.eqbot-panel`, `.eqbot-tab`, `.eqbot-notice`, `.eqbot-thought`, and `.section-hint` to the night-paper rule (excluding only `.svc-sheet`, which writes directly onto the dark drafting board in the theatre). (3) **Darker warm lamp-refracted night paper**: deepened `--ill-page` to `#c9b995` and the night-paper subtree tokens (`--rgb-paper: 204 189 156`, `--rgb-raised: 194 178 144`, `--rgb-recess: 176 160 126`) with a warm upper-right lamp-refraction gradient and ambient inner glow on `.dark .paper-leaf` (`chapter.css`). |
| 2026-11-26 | **v3.28 — dark-mode blueprint board contrast & hero lamp light in front of laptop profile card (owner).** (1) **Dark-mode blueprint board contrast (`#services`)**: in `.dark`, `--rgb-blueprint` was `127 161 184` (a light pastel blue intended for text), which made the drafting board's blueprint sheets (`fill: var(--color-blueprint)`) pale blue at night while `.svc-sheet` text and `.plan .ink` lines used `--ill-page` (`#c9b995`, darkened in v3.27), resulting in muddy tan-on-pale-blue contrast. Set `.dark { --rgb-blueprint: 49 77 97 }` (deep architectural Prussian blueprint stock `#314d61`, matching light mode's depth) and added `--ill-blueprint-ink` (`#fbf8f2` day / `#f7f2e7` night) for `.svc-sheet` text, `.plan .ink` drawings, and the blueprint grid/tables. (2) **Hero lamp light in front of the laptop profile card (`#home`)**: on desktop, `LaptopScreenUI` was rendered in `ShadowBox`'s `after` slot with `z-scene-mid` (`z-index: 20`), painting over all `.scene-layer`s (including `lamp-light` at `z: 10`), so the lamp beam was clipped behind the right edge of the laptop profile card. Moved the desktop `LaptopScreenUI` inside the `laptop` scene layer (`z: 0`, `html` slot at `SCREEN` bounds within the laptop box) so `lamp-light` (`z: 10`), its floating dust motes and fireflies paint naturally in front of the laptop screen while the screen buttons remain interactive (`pointer-events-auto`); mobile (`< 768px`) keeps the compact card in `after` (`md:hidden`). |
| 2026-11-26 | **v3.29 — first-person conversational chat redesign & playful greeting choreography (owner).** (1) **First-person voice (`src/components/shared/eqbot-script.ts`)**: rewrote every node, greeting, choice chip, and room walkthrough in natural, everyday first-person Indonesian (`Aku...`) and simple conversational English (`I...`), where Rifqi speaks directly to the visitor through his cut-paper twin (`Rifqi · Paper Guide` / `Rifqi · Pemandu Kertas`). (2) **Updated portfolio knowledge**: aligned all dialogue with the v3.28 studio rooms and latest shipped projects — Room 01 Desk (architect lamp day/night toggle, desk speaker, 4 metric tickets, 2-page PDF CV download), Room 02 Pinboard (IT Del Informatics GPA 3.39, blinking `Available` photo print, 5 industries served, MSIB & freelance), Room 03 Filing Cabinet & Career Board (6 work folders including Tower Bersama monolith-to-8-apps + 3 dashboards and Pertamina Hulu Rokan ISEA 7 modules, 2 organization folders, glowing Career Board pins with comet light and fireworks), Room 04 Drafting Table (core `.NET` + `SQL Server` stack and 6 cyanotype service blueprints), Room 04b Shadow-Box Gallery (8 hanging projects led by `MejaScalp` AI crypto scalping assistant and `BukuDompet` family money journal with 49 learning games, plus the 24-project Archive Drawer), Room 05 Certificate Shelf (13 certificates bound into 4 3D hardcover books), Room 06 Mail Tray (direct email, WhatsApp, and postmarked letter form), plus tailored quick-start paths (`start-hire`, `start-craft`, `start-past`) and meta Easter eggs. (3) **Playful opening greeting & animation (`EqbotCompanion.tsx`, `design-system.css`)**: opening the chat triggers a two-bubble personal welcome (greeting + role introduction) accompanied by a multi-beat stop-motion greeting sequence on the host figurine (`wave` → `explain` with a wink → `wave` with a smile, `data-act="greet"` bounce, avatar wiggle, and a floating cut-paper greeting badge `.eqbot-greet-pop` with diamond sparkles). |
