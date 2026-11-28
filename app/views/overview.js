// Overview: the front page, composed like a broadsheet's data page — a
// headline and standfirst, then an asymmetric lead: the population story
// with its chart in a wide column, and in a ruled rail beside it the
// headline indicators as an index and the edition's contents. Below the
// fold, growth and society side by side, then the latest releases.
import { KPI, POPULATION_TREND, GDP_GROWTH, SOCIAL, RELEASES } from '../data.js';
import { lineChart, barChart, dataTable } from '../charts.js';

export function render() {
  const index = KPI.map((k) => `
    <div class="idx-item">
      <div class="idx-top">
        <span class="idx-label">${k.label}</span>
        <span class="idx-value">${k.value}${k.unit ? ` <small>${k.unit}</small>` : ''}</span>
      </div>
      <p class="idx-note">${k.note} · <b>${k.delta}</b></p>
      <p class="idx-src">${k.source}</p>
    </div>`).join('');

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
  <p class="page-kicker">National statistics · Republic of Indonesia</p>
  <h1 class="front-title">A country of 281.6 million people, measured carefully.</h1>
  <p class="lede drop">DataNusa gathers Indonesia's official figures — people, prices, jobs, output and regions — in one place, each with the source and year it came from.</p>

  <div class="lead-grid">
    <div class="lead-main">
      <p class="lead-num">281,603,800 <small>people</small></p>
      <p class="lead-note cols-2">Mid-year population estimate for 2024, up 1.1% on 2023 — Indonesia is the world's fourth most populous country. The count comes from the 2020 census, carried forward by births, deaths and migration. Source: BPS population projection, 2024.</p>
      <div class="strip">
        <p><strong>4th</strong> most populous country in the world</p>
        <p><strong>38</strong> provinces across five island groups</p>
        <p><strong>17,000+</strong> named islands</p>
      </div>
      <section class="panel">
        <h2>${POPULATION_TREND.title}</h2>
        ${lineChart({ points: POPULATION_TREND.points, unit: 'million', fmt: (v) => v.toFixed(1) })}
        ${dataTable(POPULATION_TREND.title, ['Year', 'Population (million)'], POPULATION_TREND.points.map((p) => [p[0], p[1].toFixed(1)]))}
        <p class="src">${POPULATION_TREND.source}. The 2020 figure is the census count of 270.2 million.</p>
      </section>
    </div>

    <aside class="rail" aria-label="Headline indicators and contents">
      <h2 class="rail-head">Headline indicators</h2>
      <div class="idx">${index}</div>
      <h2 class="rail-head mt">In this edition</h2>
      <nav class="contents">
        <a href="#/population"><span class="c-name">Population <span class="arr">→</span></span><p>How many Indonesians there are, their ages, and how the total has grown — with the full age pyramid.</p></a>
        <a href="#/economy"><span class="c-name">Economy <span class="arr">→</span></span><p>Growth, inflation, trade and what the economy makes, chart by chart, 2015 to today.</p></a>
        <a href="#/regions"><span class="c-name">Regions <span class="arr">→</span></span><p>The provinces compared: population, capitals and density — search, sort and open any province.</p></a>
        <a href="#/sources"><span class="c-name">Sources &amp; methods <span class="arr">→</span></span><p>Where every figure comes from, and how the headline measures are defined.</p></a>
      </nav>
    </aside>
  </div>

  <div class="grid-2">
    <section class="panel">
      <h2>${GDP_GROWTH.title}</h2>
      ${barChart({ points: GDP_GROWTH.points, unit: '%', fmt: (v) => v.toFixed(2) })}
      ${dataTable(GDP_GROWTH.title, ['Year', 'Growth (% a year)'], GDP_GROWTH.points.map((p) => [p[0], p[1].toFixed(2)]))}
      <p class="src">${GDP_GROWTH.source}. The 2020 bar is the pandemic contraction; growth has held between 5.0% and 5.3% since 2022.</p>
    </section>
    <section class="panel">
      <h2>Society at a glance</h2>
      <div class="facts two">${social}</div>
      <p class="src">See the <a href="#/sources">Sources</a> page for how each figure is defined and where to find the original release.</p>
    </section>
  </div>

  <section class="panel">
    <h2>Latest statistical releases</h2>
    ${releases}
  </section>`;
}
