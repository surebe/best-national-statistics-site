// Population: a lead story-stat (the median age), the age pyramid as the
// page's feature panel (with a chart/table toggle that really switches),
// the trend, and the key demographic facts as a ruled band.
import { POPULATION_TREND, PYRAMID, POPULATION_FACTS } from '../data.js';
import { lineChart, pyramid, dataTable } from '../charts.js';

export function render() {
  const facts = POPULATION_FACTS.map((f) => `
    <div class="fact">
      <p class="f-value">${f.value}</p>
      <p class="f-label">${f.label}</p>
      <p class="f-src">${f.source}</p>
    </div>`).join('');

  return `
  <p class="page-kicker">Section · People</p>
  <h1>Population</h1>
  <p class="lede">Indonesia counted 270.2 million people in the 2020 census and an estimated 281.6 million by mid-2024. Growth is slowing — about 1.1% a year — and the population is ageing gently.</p>

  <div class="lead-stat">
    <p class="ls-num">30.5 <small>years</small></p>
    <p class="ls-cap"><b>The median age of an Indonesian.</b> Half the country is younger, half older — and the share is shifting upward, as the narrowing base of the pyramid below shows. Source: BPS / UN estimates, 2024.</p>
  </div>

  <section class="panel">
    <h2>${PYRAMID.title}</h2>
    <p>Each row is a five-year age group; the numbers are per cent of the whole population. The wide base is narrowing — the 0–4 group is now smaller than the 10–14 group — while the top of the pyramid slowly fills in.</p>
    <div class="controls" role="group" aria-label="Pyramid display">
      <div class="seg">
        <button type="button" id="pyr-chart-btn" aria-pressed="true">Chart</button>
        <button type="button" id="pyr-table-btn" aria-pressed="false">Table</button>
      </div>
    </div>
    <div id="pyr-chart">${pyramid({ groups: PYRAMID.groups })}</div>
    <div id="pyr-table" hidden>
      <table>
        <caption>Age and sex structure, 2024 — per cent of population</caption>
        <thead><tr><th scope="col">Age group</th><th scope="col" class="num">Men (%)</th><th scope="col" class="num">Women (%)</th><th scope="col" class="num">All (%)</th></tr></thead>
        <tbody>${PYRAMID.groups.map((g) => `<tr><th scope="row">${g[0]}</th><td class="num">${g[1].toFixed(1)}</td><td class="num">${g[2].toFixed(1)}</td><td class="num">${(g[1] + g[2]).toFixed(1)}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="src">${PYRAMID.source}. Shares may not sum to exactly 100 because of rounding.</p>
  </section>

  <section class="panel">
    <h2>${POPULATION_TREND.title}</h2>
    ${lineChart({ points: POPULATION_TREND.points, unit: 'million', fmt: (v) => v.toFixed(1) })}
    ${dataTable(POPULATION_TREND.title, ['Year', 'Population (million)'], POPULATION_TREND.points.map((p) => [p[0], p[1].toFixed(1)]))}
    <p class="src">${POPULATION_TREND.source}.</p>
  </section>

  <section class="panel">
    <h2>The population in facts</h2>
    <div class="facts">${facts}</div>
  </section>`;
}

export function mount(root) {
  const chartBtn = root.querySelector('#pyr-chart-btn');
  const tableBtn = root.querySelector('#pyr-table-btn');
  const chart = root.querySelector('#pyr-chart');
  const table = root.querySelector('#pyr-table');
  const show = (which) => {
    chart.hidden = which !== 'chart';
    table.hidden = which !== 'table';
    chartBtn.setAttribute('aria-pressed', String(which === 'chart'));
    tableBtn.setAttribute('aria-pressed', String(which === 'table'));
  };
  chartBtn.addEventListener('click', () => show('chart'));
  tableBtn.addEventListener('click', () => show('table'));
}
