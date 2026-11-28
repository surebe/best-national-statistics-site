# Self-check — DataNusa improvement pass, 28 Nov 2026

Graded against the competition's judging criteria, in the judge's order.
"Kuat" = strong, "lemah" = weak. This replaces the standing entry
(submission at commit 3bb52c0; R1 494/4,140 → R2 2,080/5,473).

## 1. A working national statistics site, as shown in the screenshots — KUAT

All five sections (Overview, Population, Economy, Regions, Sources) were
driven in a real browser (puppeteer): every route renders its title, heading
and charts; every control was exercised — the economy chart's Growth /
Inflation / Trade switch, the pyramid's Chart/Table toggle (16-row table),
the regions search ("bali" → 1 result), sort (largest / name) and province
selection (detail panel opens). Zero console errors, zero page errors.
The screenshots show the same pages the outline describes, with real
figures throughout; nothing is empty, placeholder or broken. The phone
screenshot shows the phone layout of a working section (Regions, with its
search and sort controls), not just the hero.

Change vs standing: the population pyramid — previously never screenshotted,
so the judge never saw the site's most distinctive chart — is now shot 2.

## 2. Content & usefulness: specific figures, each with source and year — KUAT

Every figure on every page carries its source and year (BPS, World Bank WDI,
Bank Indonesia). This pass added a four-figure band to the Economy page
(GDP per person; the 2024 goods trade surplus of US$31.0 billion, computed
from the page's own exports/imports series; manufacturing share 19.0%;
labour force about 145 million), each sourced. The Sources page's release
calendar was corrected: it listed November 2025 editions while the page
states the data runs to November 2026 — now November 2026 editions,
consistent throughout. No figure was invented: the release entries are
recurring BPS releases named without numbers.
Honest limit: the Regions section lists the 16 most populous of 38 provinces
(it says so on the page; together 86% of the population), and the society
indicators live inside the Overview/Sources pages rather than a sixth
section.

## 3. Ease of use — KUAT

The cover screenshot now shows the whole front page at a glance: masthead,
hero with the headline population figure and a three-fact strip, and all six
headline indicator cards complete (label, figure, change, source) — the
standing cover cut the second card row in half. Navigation is five labelled
links, one per section; type sizes and contrast are unchanged and readable;
the phone layout was verified at 390 px with no horizontal overflow.

## 4. Look & originality — SEDANG–KUAT (improved, still conventional)

What changed: headlines and headline figures now use a serif display face
(broadsheet register) over the system sans body; the hero carries a faint
woven kawung motif (interlocking circles, an Indonesian batik geometry) as
an inline SVG pattern and a stat strip (4th most populous · 38 provinces ·
17,000+ islands); a stray 54 px default paragraph margin that bloated the
hero was removed, so the front page is visibly denser; line charts gained a
subtle area fill and bar charts faint gridlines.
Honest grade: the identity is now recognisably its own and coherent
(deep teal / amber / cream, one palette across charts and chrome), but the
underlying layout is still a clean, conventional dashboard grid — better
craft, not a radical design. This remains the criterion with the most
headroom.

## 5. Speed & structure — KUAT

First load (the dossier's Totals line): 3 files, 4,890 bytes gzip-9
(14,487 raw); the whole app is 10 files, 51,966 bytes. That is 557 bytes
more than the standing 4,333 — the honest cost of the favicon, the hero
motif and the stat strip — and still a very small first load. No framework,
no webfonts, no build step; each view loads lazily by literal import().
Source stays split one job per file, named for its job: data.js (figures),
charts.js (SVG drawing), main.js (router), views/ one module per section.

## 6. Screenshot quality — KUAT

Four real, unedited renders, each within spec (≤256 KiB, long side ≤1280,
short side ≥360): 1-overview.jpg 129,533 B (cover: full hero + all six
indicators), 2-population.jpg 75,230 B (the age/sex pyramid, scrolled so
the panel fills the frame), 3-economy.jpg 88,144 B (fact band + growth
chart), 4-regions-phone.jpg 56,299 B (phone layout with working controls).
Composition was checked by eye, shot by shot; the set shows data density
and sourcing at a glance instead of three near-identical page tops.

## Verification performed

- Puppeteer QA over all routes and controls: 0 errors.
- main.ts run twice into two output dirs: dossier.json byte-identical.
- Kit check (worktree, standing transcripts): 14 passed, 0 failed.
- Every screenshot measured for size and dimensions against the kit spec.

## Verdict vs the standing version

Better on criteria 1 (pyramid and a real phone section now reach the
judge), 2 (denser sourced economy page; the 2025/2026 date inconsistency
fixed), 3 (complete front page in one screen) and 4 (type identity and
motif), and on screenshot composition overall; criterion 5 is 557 bytes
heavier and still tiny. No criterion got worse in substance. The
improvement is real but incremental — this is a blind round with thousands
of entries and the design, while now distinctive, is still conventional;
no top placing is claimed, only that this version is strictly stronger
than the one it replaces.
