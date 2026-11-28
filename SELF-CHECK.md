# Self-check — DataNusa MAX-PUSH pass, 28 Nov 2026

Graded against the competition's judging criteria, in the judge's order.
"Kuat" = strong, "lemah" = weak. This pass targets the one criterion the
previous pass (commit 5432a3e) flagged as having the most headroom —
look & originality: "distinctive now, but the layout is still a
conventional dashboard grid". The grid is what this pass removes.

## What changed

- **Masthead**: the dark app bar is now a newspaper nameplate — serif
  DataNusa plate with the kawung motif faintly behind it, a dateline
  strip ("Republic of Indonesia · Data as published to November 2026 ·
  Every figure with its source and year") between hairline rules, and
  the navigation as a ruled small-caps row with an amber underline on
  the current section. It tops every page, phone included.
- **Sections**: every boxed card/panel is gone. Sections are broadsheet
  sections — a thick ink rule, a serif head, content on the paper.
  Controls are square and ink-ruled instead of pill-shaped.
- **Cover (Overview)**: a front page. One-line serif headline, a
  standfirst with a drop cap, then an asymmetric lead: the giant
  281,603,800 story-figure with its note set in two newspaper columns
  and the population chart beneath it in a wide column; in a ruled rail
  beside it, the six headline indicators as an index (label, serif
  figure, change, source — all six visible in the first screen) and an
  "In this edition" contents list where the card grid used to be.
- **Population**: a lead story-stat row (30.5 years, the median age) and
  the age pyramid promoted to the page's feature panel, above the trend.
- **Economy**: a lead story-stat row (5.03% real GDP growth, 2024) above
  the fact band; the band itself is now a ruled strip, not four boxes.
- **Facts everywhere** (society, population, economy, jobs) are ruled
  "in brief" entries with serif figures — hairlines, not cards.
- No figure changed. Two captions were extended with text the site
  already stands behind (the mid-year estimate's method, from the
  Sources page's own definition; the median-age caption kept to what
  the pyramid itself shows). Nothing was invented.

## 1. A working national statistics site, as shown in the screenshots — KUAT

Unchanged in substance from 5432a3e and re-verified end to end: a
26-check puppeteer QA drove all five routes and every control — the
economy Growth / Inflation / Trade switch (all three series), the
pyramid Chart/Table toggle (16-row table), the regions search ("bali"
→ 1 result), sort (name → Aceh first) and province selection (detail
panel opens Bali), the sources table — with zero console errors and
zero page errors, and no horizontal overflow at 390 px on any route.
The screenshots show the same pages the outline describes.

## 2. Content & usefulness: specific figures, each with source and year — KUAT

Unchanged: every figure still carries its source and year (BPS, World
Bank WDI, Bank Indonesia); no number was added, removed or altered in
this pass. The honest limits from the previous pass stand (16 of 38
provinces listed, stated on the page; society indicators inside
Overview/Sources rather than a sixth section).

## 3. Ease of use — KUAT

Better than 5432a3e on the cover: the first screen now holds the
headline, the lead figure, all six headline indicators and the
contents of the edition — the previous cover showed the six indicators
as cards but no map of the site. Navigation is the same five labelled
links, now in the nameplate's ruled row; the phone layout was verified
at 390 px with no horizontal overflow on all four checked routes.

## 4. Look & originality — KUAT (was SEDANG–KUAT; the flagged headroom, now spent)

Before: serif type and a motif over "a clean, conventional dashboard
grid" — hero card, 3×2 KPI card grid, boxed chart panels, pill toggles.
After: there is no dashboard grid left on any judge-facing page. The
composition is editorial — nameplate and dateline, thick-ruled
sections, an asymmetric front page with one dominant story-figure,
two-column standfirst text, a ruled index rail, story-stat lead rows on
Population and Economy, ruled fact bands. The identity (deep teal /
amber / cream, serif display, kawung motif) is carried through all of
it, and the cover is unmistakably a designed front page rather than an
admin dashboard.
Honest residual: the visual language is typographic — type, rules and
whitespace — with no photography or illustration, and the charts are
the same hand-rolled SVG as before; a rival with bespoke artwork
could still out-craft it on imagery. Within what this site's own
system can reach, the layout criterion is now the design's strongest
feature instead of its weakest.

## 5. Speed & structure — KUAT (marginally heavier, stated plainly)

First load (the dossier's Totals line): 3 files, 5,597 bytes gzip-9
(17,279 raw) — 707 bytes more than 5432a3e's 4,890, the cost of the
nameplate/dateline markup and the larger stylesheet. Whole app: 10
files, 56,222 bytes. Still no framework, no webfonts, no build step;
views load lazily by literal import(); source stays one job per file.

## 6. Screenshot quality — KUAT

Four real, unedited renders, each within spec (≤256 KiB, long side
≤1280, short side ≥360): 1-overview.jpg 148,383 B (the front page: all
six indicators and the lead chart's head in frame), 2-population.jpg
78,609 B (the pyramid as the feature panel, scrolled to its rule),
3-economy.jpg 107,313 B (story-stat, ruled fact band, growth chart),
4-regions-phone.jpg 61,811 B (phone front: nameplate, search and sort,
province list with serif figures). Composition checked by eye, shot by
shot, against the 5432a3e set.

## Verification performed

- Puppeteer QA over all routes and controls: 26/26 pass, 0 errors.
- main.ts run twice into two output dirs: dossier.json byte-identical
  (same sha256), full output trees identical.
- Kit check (worktree, standing transcripts): 14 passed, 0 failed.
  With those transcripts the authorship accounting reads 66.7%
  authored / 32.9% unwritten — inside both caps; the finisher's
  re-bundle adds this session's transcripts.
- Every screenshot measured for size and dimensions against the kit spec.

## Verdict vs 5432a3e

This version beats 5432a3e on the judge's evidence: criterion 4
clearly (the conventional grid — the previous pass's own stated
ceiling — is gone from every page the judge sees), criterion 3 (the
whole edition is mapped on the cover's first screen) and criterion 6
(the cover is a composed front page). Criteria 1 and 2 tie in
substance, fully re-verified; criterion 5 is 707 gzip bytes heavier
and still among the smallest possible loads. Recommendation: this is
the version to submit in place of 5432a3e.
