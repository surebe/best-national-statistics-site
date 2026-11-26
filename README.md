# DataNusa — Indonesia in Numbers

[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/surebe/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/surebe/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An entry for the make.fun bounty [“Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

DataNusa is a national statistics site for the Republic of Indonesia that runs entirely from its own static files — no build step, no network requests. Five sections, each reached by a link:

- **Overview** — the six headline indicators (population, GDP, GDP per person, inflation, unemployment, poverty), population and growth charts, society at a glance, and the latest statistical releases.
- **Population** — the 2015–2024 trend, a full age-and-sex pyramid with a chart/table switch, and the demographic facts.
- **Economy** — a working series switcher (growth / inflation / trade), the sector breakdown of GDP, and the jobs and prices stories.
- **Regions** — the sixteen most populous provinces with search, three sort orders, and a detail panel per province.
- **Sources** — every figure's publisher and release, definitions of the headline measures, and how to cite the numbers.

Every figure carries its source and year (Statistics Indonesia (BPS), the World Bank, Bank Indonesia and the surveys named on the Sources page). Every chart is hand-drawn SVG with a data-table alternative; every control on the site does what it says.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8080
node main.ts             # hands the entry in: copies app/ + screenshots/ to /output and writes dossier.json
```

Layout: `app/` the site (one file per job: `data.js` the figures, `charts.js` the chart drawing, `main.js` the router, `views/` one module per section), `screenshots/` the judged renders listed in `shots.json`, `vendor/makefun-frontend.ts` the kit's dossier library, unchanged.

Design notes: the first load is three files (shell, stylesheet, router) at about 4.3 KB gzipped; each section's view module loads lazily when its link is opened. Type is the visitor's system stack — no webfonts — and every chart is inline SVG with a data-table alternative, so the site works the same on a phone with no signal as on a desktop.

MIT licence — see `LICENSE`. The statistics belong to their publishers; the presentation, text and charts are this repository's own work.
