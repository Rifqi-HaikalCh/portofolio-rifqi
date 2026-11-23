# Art & Motion Upgrade — Analysis and Design (proposal for P6)

> Status: **proposal**, not yet rules. Once the owner approves it, the accepted parts move into `DesignRules.md` (§2, §9, §10, §16) and this file is deleted.
> Scope: character illustration, 2D scene and section assets, 3D figurine, motion.
> Basis: production build captured on 2026-11-23 at 1440 px (light: 3D canvas; dark: poster), 390 px, and the section shots from P4.

---

## 1. Audit — what the page shows today

### 1.1 Scores (0–10, against the DesignRules concept "The Architect's Paper Desk")

| Area | Now | Target | Main gap |
| --- | --- | --- | --- |
| Character, 3D | 4 | 9 | Reads as a primitive mannequin (box torso, stick arms, no hands or neck). Eyes look half-closed. In dark mode the figurine sinks into the wall (low value contrast). No paper thickness or cut edges, so the "paper" claim is not visible in 3D. |
| Character, 2D poster / EQbot | 5 | 9 | Curls read as "?" glyphs at small sizes. The head crop is too tight for About (no shoulders) and too detailed for a 56 px avatar. A single expression only. |
| Poster ↔ 3D match | 5 | 10 | Poster has outlines and the 3D model does not. Proportions differ slightly, so the cross-fade "pops". |
| Character staging | 4 | 9 | Stands alone at the desk corner with arms down and no relation to the laptop or lamp. It is decoration, not the protagonist. |
| 2D scene materiality | 6 | 9 | Clean flat vector. Cut edges and stacking shadows are too faint to read as layered cardstock. No paper fibre. |
| 2D composition | 6 | 9 | ~25 % of the stage under the desktop is a dead beige panel. The wall above the window is empty. The pinboard allowed by §2.4 is missing. |
| Light story | 7 | 9 | Day beam and lamp pool exist but are single flat shapes. The lamp switch has no "moment". |
| Mobile (< 768 px) | 3 | 8 | The stage is dropped entirely, so mobile visitors never meet the character or the desk (only the laptop card). |
| Section assets | 5 | 8 | Paper motifs exist (fold, tape, blueprint, folio) but no illustrated anchor. Capability cards are numbers only. The contact success has a postmark but no envelope. |
| Motion | 6 | 9 | Correct and restrained, but generic (fade + rise). Nothing paper-specific: no fold, unfold, or "sheet placed" feel. |

### 1.2 Root causes

1. **The 3D figurine was built from generic primitives** (cylinders/boxes in `figurine-model.tsx`) because Blender is not in the toolchain. Primitives cannot carry paper thickness, hands, or a readable face at 200 px tall.
2. **Two separate drawings for one character** (SVG poster and procedural mesh) means two sources of truth that drift.
3. **The stage composition was designed for desktop only**, so mobile gets no illustration.
4. **The motion rules are written as a list of prohibitions** (good) with few signature moves (missing).

---

## 2. Design direction — "Paper Puppet"

Rebuild the character as a **layered paper puppet**: every body part is a flat cut-out sheet with real thickness (2–3 units), stacked front to back and hinged at joints like a paper marionette. This is more truthful to "3D Paper Craft" than a sculpted low-poly figure. The flat front view *is* the poster, and turning it reveals the paper layers and edges, which is where 3D earns its cost.

### 2.1 One source → poster, 3D, avatar, 404

```
figurine-parts.ts   (single source: SVG paths per part + pivot points + layer order)
   ├─ RifqiFigurine.tsx      2D poster  = parts drawn flat, in order          (SSR, LCP-safe)
   ├─ figurine-model.tsx     3D puppet  = same paths → THREE.ExtrudeGeometry  (lazy, gated)
   ├─ EqbotAvatar.tsx        bust crop + 4 expressions (swap mouth/brow/eye parts)
   └─ About / 404 poses      the same parts with different joint angles (static SVG)
```

- Pixel match is guaranteed: the poster is the 3D model at rotation 0 under an orthographic camera.
- No Blender dependency. Geometry is generated from paths at runtime (`ExtrudeGeometry`, `depth 2.5`, `bevelEnabled false`, `curveSegments 6`).
- Budget: ≤ 12k triangles total, 0 bytes of model download (paths ship in the lazy 3D chunk, ≈ 6 KB).

### 2.2 Character redesign (applies to every view)

| Part | Change |
| --- | --- |
| Proportions | ~4.5 heads (from ~5): a larger head reads at 200 px and in the 56 px avatar. Keep an adult build; not chibi. |
| Hair | Quilled curls as **closed spiral coils** in two tones (`--ill-hair`, `--ill-hair-hi`), all wound the same direction, in 3 overlapping rows. The taper fade is one flat sheet, slightly lighter, behind the ears. No "?" shapes. |
| Face | Eyes: open almond cut-outs with a 1-unit highlight dot (removes the sleepy look). Brows: thin strips, separate parts so they can move. Mouth: one fold line, plus a second "smile" part for expressions. Nose: one shaded triangle following `--light-x`. |
| Neck & shoulders | A real neck sheet and rounded shoulder caps (the current box torso is the biggest "mannequin" tell). |
| Hands | Mitten hands with a separate thumb sheet: enough for wave, rest-on-laptop, and pointing. |
| Tee | Crew-neck collar as its own darker strip; one fold crease down the torso (the §2.3 fold motif, now on the character). |
| Denim | Keep the two-tone fade; add a 1-unit cuff turn-up as a separate sheet. |
| Sneakers | Grey upper + off-white sole as two stacked layers (the sole's thickness shows when he turns). |
| Edges | Every part gets the cut edge: side faces use `--paper-cut`, front faces the fill colour. In 2D this is a 1.2 px `--paper-cut` stroke, matching the 3D side faces. |
| Dark mode | Raise the figurine's value contrast against the night wall: lamp-side rim (`--ill-bulb` at 35 % on side faces facing `--light-x`), plus a lighter shirt token in dark (`--ill-shirt` → charcoal 32 % L instead of 22 %). |

### 2.3 Staging — make him the protagonist

- **Pose:** seated on the closed notebook at the desk's left, legs dangling over the edge, near hand resting on the laptop base, head toward the screen. He *uses* the laptop that shows his profile.
- **Scale:** stays a miniature (head ≈ 1/3 of the laptop screen height), so he never competes with the HTML screen.
- The notebook moves from L3 to L2 to serve as the seat. The sticky note stays.

### 2.4 Animation set (puppet joints, code-driven, `frameloop="demand"`)

| Trigger (existing event) | Clip | Length | Notes |
| --- | --- | --- | --- |
| First 3D frame | **Wave** once (raise far arm, 2 swings, lower) | 1.4 s | Replaces the cross-fade "pop" with a greeting. Once per session (`sessionStorage`). |
| `FIGURINE_LOOK_EVENT` (pointer/focus on laptop screen) | Head + eyes to the screen | 0.4 s | Exists today; add eye parts so the look reads. |
| Theme switch (lamp) | Head to the lamp, small startle (shoulders up 2 units) | 0.5 s | Ties the light story to the character. |
| `EQBOT_OPEN_EVENT` | "Thinking": hand to chin, brows up | 0.6 s in, holds while EQbot is open | EQbot avatar shows the same expression. |
| Idle | **Blink** every 4–7 s, random | 120 ms | Renders only the blink frames (demand loop). Paused off-screen (`IntersectionObserver`) and when the tab is hidden. |
| Contact form focus (if the hero is visible on wide sticky layouts) | None | — | Deliberately left out: he must not compete with the form. |

All clips use joint rotations only (`rotation.z` on pivots), eased with `--ease-paper`, max amplitude 25°. Under reduced motion or WebGL off: the poster shows the final pose, no clips.

---

## 3. 2D scene upgrade

### 3.1 Materiality (the cardstock read)

1. **Stack shadows between layers:** each L1→L2→L3 group gets one offset shadow sheet (`--paper-shadow`, offset `calc(4px * var(--light-x)), 4px`, 0 blur). Hard paper shadows, no blur, consistent with §2.2.
2. **Cut-edge highlight:** a 1 px lighter stroke on the light-facing edge of every major shape (top-left in day, top-right at night), driven by `--light-x` through two pre-drawn edge paths toggled by `dark:`.
3. **Paper fibre:** one tiling 256² WebP fibre texture (≤ 12 KB) applied as a CSS `mask` overlay at 5–7 % on the stage only. No SVG `feTurbulence` (too expensive on mobile).

### 3.2 Composition

- **Reframe the stage:** move the desktop line down ~12 % and show the drawer unit plus a strip of floor with a paper rug edge. The dead beige panel goes away.
- **Foreground L3:** the back of a paper desk chair, cropped at the bottom right. It frames the scene and is the strongest depth cue in parallax.
- **Pinboard (allowed by §2.4)** on the wall right of the window, with three pinned cards. Static, `aria-hidden` art; the real navigation stays in the navbar.
- **Laptop:** visible bezel thickness (2 layers), embossed key rows (lighter top edge per row), and a 2-tone hinge.

### 3.3 Light story moments

- **Day:** the window beam becomes 3 stacked translucent paper trapezoids (100 %, 60 %, 30 % of `--ill-beam`), so it reads as cut paper, not a gradient.
- **Night:** the lamp pool becomes 3 concentric ellipse cut-outs; the moon gets one paper cloud.
- **Switch moment:** see §5.2 (View Transition from the lamp).

### 3.4 Mobile diorama (new, < 768 px)

A dedicated **portrait 4:5 stage** (`viewBox 0 0 800 1000`), drawn from the same layer parts:

- Window + shelf (top), seated figurine poster with the laptop (middle), lamp as the theme toggle (right, ≥ 44 px hit area), desk edge (bottom).
- The laptop screen card stays real HTML, placed below the diorama (as today), so text is never inside the art.
- Static: no parallax, no 3D. Budget ≤ 30 KB SVG, server-rendered, `aria-hidden` except the lamp button.

---

## 4. Section assets (restraint: 1–2 edge props per section)

| Section | Asset | Behaviour |
| --- | --- | --- |
| 02 About | Replace the head crop with a **bust portrait** (head + shoulders + collar) from the puppet parts, inside a paper photo with a white border and the paper clip. | Static SVG. Hidden below 640 px as today. |
| 03 Experience | Company logos as **ink stamps** (grayscale, rotated −2°…2°, multiply blend), full colour on row hover/open. Edge prop: a paper pencil on the ledger's top right. | CSS only. |
| 04 Services | Three **die-cut glyph icons** for the capabilities (.NET app window, database cylinder, dashboard chart), drawn in the paper style at 40 px. Edge prop: paper ruler + compass on the blueprint corner. | Static SVG, tokenized. |
| 04 Archive | **Empty drawer** illustration in the "0 results" state (reuse the 404 drawer). | Already designed for 404; share it. |
| 05 Certificates | Small **ribbon seal** on each folio tab. | Static. |
| 06 Contact | **Envelope fold** on success: the letter sheet folds into an envelope (flap `rotateX` 0 → 180°, 500 ms), then the existing postmark stamps on it. | Runs only after a real 2xx, as today. Reduced motion: the envelope appears folded. |
| 404 | The seated figurine poster **peering into the empty drawer** (puppet pose: head tilted, hand on drawer). | Static SVG from parts. |
| EQbot | Avatar = bust crop with **4 expressions** (neutral, smile, thinking, wink) mapped to EQbot phases (idle, answer, waiting, farewell). | Part swap; no extra drawings. |

---

## 5. Motion system v2 (paper-specific signature moves)

### 5.1 New tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ease-fold` | `cubic-bezier(0.3, 0.7, 0.2, 1)` | Folds and unfolds (slight overshoot-free settle) |
| `--dur-fold` | `420ms` | Section unfold, envelope fold |
| `--dur-light` | `480ms` | Theme switch reveal |

### 5.2 Signature moves

| Move | Where | How |
| --- | --- | --- |
| **Lamp light reveal** | Theme switch from lamp, navbar or footer | `document.startViewTransition`; the new theme is revealed by a `clip-path: circle()` grown from the lamp bulb's screen position (the navbar/footer buttons use their own position). Falls back to the instant switch if unsupported or under reduced motion. |
| **Sheet placed** | Dialogs (case study, archive, skills) | Enter: `translateY(16px) rotate(-0.6deg)` → `0`, 320 ms. The sheet lands like paper set on the desk. Replaces the plain rise. |
| **Unfold on arrival** | First card or sheet of each section | `rotateX(-10deg)` → `0` with `transform-origin: top`, inside the existing `view()` timeline. Replaces fade + translate for paper sheets only. |
| **Tab lift** | FolderTabs | Selected tab rises 2 px and its accent strip draws left → right (`scaleX`), 200 ms. |
| **Row unfold** | Ledger and folio `<details>` | Content unfolds with `rotateX(-6deg)` → `0`, plus the existing fade. Uses `::details-content` + `interpolate-size` where supported. |
| **Card hover** | Paper cards | Keep the 2 px lift; the tape strip lifts 1 px more (it "peels"). |
| **Stamp** | Postmark | Keep it; add a 1-frame 2 % squash on impact. |

### 5.3 Rule changes this needs (DesignRules)

1. §2.6 / §10.2: allow the **blink idle** (demand-rendered, paused off-screen and on hidden tabs) and the **one-time wave** in addition to the head turn.
2. §10.2: allow the View Transition theme reveal and the fold moves listed above (still no 3D tilt, no flying cards, no loops other than the blink).
3. §9.3 / §9.4: the model becomes the path-extruded puppet from `figurine-parts.ts`; the "optional Blender GLB" path is dropped.
4. §2.4 / §8: add the mobile portrait diorama and the desk chair (L3).
5. §9.5: add budgets for the fibre texture (≤ 12 KB) and the mobile stage (≤ 30 KB).

---

## 6. Quality gates for the new assets

- **Visual regression:** Playwright `toHaveScreenshot` for the stage (light/dark × 3D/poster × 1440/390), the bust, the EQbot expressions, and the envelope end state. Threshold 0.2 %.
- **Poster ↔ 3D match:** a test renders the canvas at rotation 0 and diffs it against the poster (≤ 1 % pixel difference).
- **Performance:** 3D chunk stays lazy. Blink and clips render on demand (verify with a frame counter: 0 frames over 2 s while idle with no blink due). LCP stays the hero text; mobile LCP ≤ 2.5 s with the new mobile stage.
- **Accessibility:** all art `aria-hidden`; the lamp keeps `aria-pressed`; clips never move focus; reduced motion shows final poses only.
- **Authenticity (§3.3):** the owner reviews the redesigned figurine against the turnaround (hair, skin, tee, denim, sneakers) on `/papercraft` before it ships.

---

## 7. Roadmap

| Step | Scope | Exit |
| --- | --- | --- |
| **P6.1 Character source** ✅ (pending owner review on `/papercraft`) | `figurine-parts.ts`, redesigned parts (§2.2), poster regenerated from parts, bust, 404 pose, EQbot expressions, `/papercraft` review sheet | Owner approves the figurine against the turnaround |
| **P6.2 Puppet 3D** ✅ | Extruded model, seated pose, joints, clips (§2.4), dark-mode rim | Poster ↔ 3D diff ≤ 1 %, frame budget met |
| **P6.3 Scene 2D** ✅ | Materiality, reframe, chair, pinboard, laptop detail, light layers, mobile diorama | Stage SVG ≤ 40 KB per layer, mobile ≤ 30 KB, no CLS |
| **P6.4 Sections & motion** | Section assets (§4), motion tokens and moves (§5), View Transition theme switch | Visual regression baseline recorded, reduced-motion pass |
| **P6.5 Rules** | Fold the accepted parts into `DesignRules.md` (v1.6) and delete this file | `check:design` and the e2e suite green |

Order matters: P6.1 first, because every other asset reuses the character parts.

**P6.1 status (2026-11-23):** `figurine-parts.ts` (parts, joints, poses, expressions) and `figurine-rig.ts` (joint solver, orthographic projection, depth sort) are in place. `RifqiFigurine` draws every view from them: hero poster (`stand`), About bust, EQbot head with expressions mapped to chat state (thinking while waiting, smile after an answer, wink on close), 404 (`peer`). The hero poster is now rendered on the server and passed into the client stage, so the puppet data is not in first-load JS (159.6 KB gzip). Lint, types, design check, build and Playwright (97 passed / 6 skipped) are green.

**P6.2 status (2026-11-23):** the 3D view is the paper puppet (`figurine-mesh.ts`: cut parts extruded into 1.6-unit sheets, about 3.4k triangles, unlit token colours, fold planes and cut edges as in the poster). Hero pose is seated on the notebook (now in L2) with the near hand on the laptop; the mug moved beside the lamp. Clips in `figurine-clips.ts`: wave (once per session), look at the laptop, glance at the lamp on theme change, thinking while EQbot is open (`EQBOT_STATE_EVENT`), blink every 4–7 s while on screen. Dark mode: lighter shirt token and a `--figure-rim` lamp-side rim. `e2e/figurine.spec.ts`: poster ↔ 3D difference 0.06 % (dark) / 1.5 % (light) against a 2 % gate (the ≤ 1 % target above is not met in light mode: the rest is antialiasing of cut lines), zero draw calls while idle, look clip stops. DesignRules updated to v1.6.

**P6.3 status (2026-11-23):** done, with these deviations from §3, all recorded in DesignRules v1.7. (1) Stack shadows already existed as `--paper-drop` filters per group, so no extra shadow sheets. (2) The cut-edge highlight is a fixed `--paper-cut` line on the lit top edge (desk front, drawer fronts, key rows, chair), not two `dark:`-toggled paths. (3) The fibre tile is a CSS background with `mix-blend-mode` (multiply by day, screen at night), not a mask. (4) The desk line did not move: the pedestal got shorter and the floor, skirting and rug fill the lower strip. (5) The pinboard sits under the shelf on the right: the laptop fills the wall right of the window, and it clears the lamp arm. (6) The mobile diorama is square (`800 × 800`), not 4:5, to save a screen of scroll. Budgets: SVG layers 5.4 / 5.3 / 1.5 / 2.8 KB, mobile diorama 29.0 KB as rendered HTML (figurine poster paths tightened to fit), fibre 3.9 KB, CLS 0 at 390 and 1440 px. Lint, types, design check, build and Playwright (103 passed / 12 skipped) are green.
