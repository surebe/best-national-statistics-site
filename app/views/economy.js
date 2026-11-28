// Economy: one chart panel whose series switcher really switches (growth,
// inflation, trade), plus the sector breakdown and the labour headline.
import { GDP_GROWTH, INFLATION, TRADE, GDP_SECTORS, KPI } from '../data.js';
import { barChart, lineChart, groupedBars, shareBars, dataTable } from '../charts.js';

const SERIES = {
  growth: {
    label: 'Growth',
    html: () => `
      <h2>${GDP_GROWTH.title}</h2>
      ${barChart({ points: GDP_GROWTH.points, unit: '%', fmt: (v) => v.toFixed(2) })}
      ${dataTable(GDP_GROWTH.title, ['Year', 'Growth (% a year)'], GDP_GROWTH.points.map((p) => [p[0], p[1].toFixed(2)]))}
      <p>Indonesia's economy shrank once in a decade — 2.07% in the pandemic year 2020 — and has grown at about 5% a year since, among the fastest rates in the G20.</p>
      <p class="src">${GDP_GROWTH.source}.</p>`,
  },
  inflation: {
    label: 'Inflation',
    html: () => `
      <h2>${INFLATION.title}</h2>
      ${lineChart({ points: INFLATION.points, unit: '%', colour: '#b3402a', fmt: (v) => v.toFixed(2) })}
      ${dataTable(INFLATION.title, ['Year', 'Inflation (% a year)'], INFLATION.points.map((p) => [p[0], p[1].toFixed(2)]))}
      <p>Prices rose fastest in 2022 (5.51%), when fuel prices were adjusted, and slowest in 2024: 1.57% in December, inside Bank Indonesia's 2.5% ± 1% target band.</p>
      <p class="src">${INFLATION.source}; target band: Bank Indonesia, 2024.</p>`,
  },
  trade: {
    label: 'Trade',
    html: () => `
      <h2>${TRADE.title}</h2>
      ${groupedBars({ years: TRADE.years, exports: TRADE.exports, imports: TRADE.imports, unit: 'US$ billion' })}
      ${dataTable(TRADE.title, ['Year', 'Exports (US$ bn)', 'Imports (US$ bn)', 'Balance (US$ bn)'], TRADE.years.map((y, i) => [y, TRADE.exports[i].toFixed(1), TRADE.imports[i].toFixed(1), (TRADE.exports[i] - TRADE.imports[i]).toFixed(1)]))}
      <p>Indonesia has run a goods trade surplus every year since 2020 — US$31.0 billion in 2024 — on coal, palm oil, nickel and steel exports.</p>
      <p class="src">${TRADE.source}.</p>`,
  },
};

export function render() {
  const jobs = KPI[4];
  const lastGrowth = GDP_GROWTH.points[GDP_GROWTH.points.length - 1];
  const balance = (TRADE.exports[TRADE.exports.length - 1] - TRADE.imports[TRADE.imports.length - 1]).toFixed(1);
  const econFacts = [
    { value: KPI[2].value, label: `GDP per person, ${KPI[2].note.toLowerCase()}`, src: KPI[2].source },
    { value: `US$${balance} billion`, label: 'Goods trade surplus, 2024', src: TRADE.source },
    { value: `${GDP_SECTORS.parts[0][1].toFixed(1)}%`, label: 'Manufacturing share of GDP, 2024', src: GDP_SECTORS.source },
    { value: 'About 145 million', label: 'People in the labour force', src: 'BPS labour force survey (Sakernas), February 2025' },
  ];
  const facts = econFacts.map((f) => `
    <div class="fact">
      <p class="f-value">${f.value}</p>
      <p class="f-label">${f.label}</p>
      <p class="f-src">${f.src}</p>
    </div>`).join('');
  return `
  <p class="page-kicker">Section · Output, prices, trade</p>
  <h1>Economy</h1>
  <p class="lede">A US$1.396 trillion economy growing at about 5% a year, with inflation back under 2% and a trade surplus in its fifth year. Switch the chart to see each story.</p>

  <div class="lead-stat">
    <p class="ls-num">${lastGrowth[1].toFixed(2)}<small>%</small></p>
    <p class="ls-cap"><b>Real GDP growth in ${lastGrowth[0]}.</b> The economy has grown at about 5% a year since the pandemic contraction of 2020 — among the fastest rates in the G20. Source: ${GDP_GROWTH.source}.</p>
  </div>

  <div class="facts">${facts}</div>

  <section class="panel">
    <div class="controls" role="group" aria-label="Choose a series">
      <div class="seg" id="series-seg">
        ${Object.entries(SERIES).map(([key, s], i) => `<button type="button" data-series="${key}" aria-pressed="${i === 0}">${s.label}</button>`).join('')}
      </div>
    </div>
    <div id="series-body">${SERIES.growth.html()}</div>
  </section>

  <div class="grid-2">
    <section class="panel">
      <h2>${GDP_SECTORS.title}</h2>
      ${shareBars({ parts: GDP_SECTORS.parts })}
      ${dataTable(GDP_SECTORS.title, ['Industry', 'Share of GDP (%)'], GDP_SECTORS.parts.map((p) => [p[0], p[1].toFixed(1)]))}
      <p class="src">${GDP_SECTORS.source}.</p>
    </section>
    <section class="panel">
      <h2>Jobs</h2>
      <div class="fact" style="margin-bottom:12px">
        <p class="f-value">${jobs.value}%</p>
        <p class="f-label">Open unemployment — ${jobs.delta}</p>
        <p class="f-src">${jobs.source}</p>
      </div>
      <p>About 145 million Indonesians are in the labour force. Most work is informal — roughly six in ten workers — which is why the headline unemployment rate, low by international standards, is read alongside informality and underemployment figures in the full Sakernas release.</p>
      <p class="src">BPS labour force survey (Sakernas), February 2025.</p>
      <h3 style="margin-top:18px">Prices</h3>
      <p>December 2024 inflation of 1.57% was the lowest year-end reading in the series on this page — food prices were calm and administered prices unchanged through the year.</p>
      <p class="src">BPS consumer price index, December 2024.</p>
    </section>
  </div>`;
}

export function mount(root) {
  const body = root.querySelector('#series-body');
  root.querySelectorAll('#series-seg button').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('#series-seg button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      body.innerHTML = SERIES[btn.dataset.series].html();
    });
  });
}
