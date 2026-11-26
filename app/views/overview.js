// Overview: the front page. Hero with the population headline, the six
// headline indicators, the two signature charts, links into every section,
// society figures and the latest statistical releases.
import { KPI, POPULATION_TREND, GDP_GROWTH, SOCIAL, RELEASES } from '../data.js';
import { lineChart, barChart, dataTable } from '../charts.js';

export function render() {
  const kpis = KPI.map((k) => `
    <article class="kpi">
      <p class="k-label">${k.label}</p>
      <p class="k-value">${k.value}${k.unit ? ` <small>${k.unit}</small>` : ''}</p>
      <p class="k-note">${k.note}</p>
      <p class="k-delta">${k.delta}</p>
      <p class="k-src">${k.source}</p>
    </article>`).join('');

  const social = SOCIAL.map((s) => `
    <div class="fact">
      <p class="f-value">${s.value}</p>
      <p class="f-label">${s.label}</p>
      <p class="f-src">${s.note} — ${s.source}</p>
    </div>`).join('');

  const releases = RELEASES.map((r) => `
    <div class="release">
      <p class="r-date">${r.date}</p>
      <h3>${r.title}</h3>
      <p>${r.body} <span class="src" style="display:inline">${r.source}</span></p>
    </div>`).join('');

  return `
  <section class="hero">
    <p class="page-kicker">National statistics · Republic of Indonesia</p>
    <h1>A country of 281.6 million people, measured carefully.</h1>
    <p class="lede">DataNusa gathers Indonesia's official figures — people, prices, jobs, output and regions — in one place, each with the source and year it came from.</p>
    <div class="hero-big">
      <p class="hero-num">281,603,800 <small>people</small></p>
      <p class="hero-note">Mid-year population estimate for 2024, up 1.1% on 2023 — Indonesia is the world's fourth most populous country. Source: BPS population projection, 2024.</p>
    </div>
  </section>

  <section aria-label="Headline indicators">
    <div class="kpis">${kpis}</div>
  </section>

  <div class="grid-2">
    <section class="panel">
      <h2>${POPULATION_TREND.title}</h2>
      ${lineChart({ points: POPULATION_TREND.points, unit: 'million', fmt: (v) => v.toFixed(1) })}
      ${dataTable(POPULATION_TREND.title, ['Year', 'Population (million)'], POPULATION_TREND.points.map((p) => [p[0], p[1].toFixed(1)]))}
      <p class="src">${POPULATION_TREND.source}. The 2020 figure is the census count of 270.2 million.</p>
    </section>
    <section class="panel">
      <h2>${GDP_GROWTH.title}</h2>
      ${barChart({ points: GDP_GROWTH.points, unit: '%', fmt: (v) => v.toFixed(2) })}
      ${dataTable(GDP_GROWTH.title, ['Year', 'Growth (% a year)'], GDP_GROWTH.points.map((p) => [p[0], p[1].toFixed(2)]))}
      <p class="src">${GDP_GROWTH.source}. The 2020 bar is the pandemic contraction; growth has held between 5.0% and 5.3% since 2022.</p>
    </section>
  </div>

  <section aria-label="Explore the sections">
    <div class="cards">
      <a class="card-link" href="#/population"><h3>Population →</h3><p>How many Indonesians there are, their ages, and how the total has grown — with the full age pyramid.</p></a>
      <a class="card-link" href="#/economy"><h3>Economy →</h3><p>Growth, inflation, trade and what the economy makes, chart by chart, 2015 to today.</p></a>
      <a class="card-link" href="#/regions"><h3>Regions →</h3><p>The provinces compared: population, capitals and density — search, sort and open any province.</p></a>
    </div>
  </section>

  <section class="panel">
    <h2>Society at a glance</h2>
    <div class="facts">${social}</div>
    <p class="src">See the <a href="#/sources">Sources</a> page for how each figure is defined and where to find the original release.</p>
  </section>

  <section class="panel">
    <h2>Latest statistical releases</h2>
    ${releases}
  </section>`;
}
