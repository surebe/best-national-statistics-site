// Regions: the provinces compared. A searchable, sortable list; opening a
// province fills the detail panel beside it. All controls work on the
// PROVINCES data in data.js.
import { PROVINCES } from '../data.js';

function detail(p) {
  const share = ((p.population / 281.6) * 100).toFixed(1);
  return `
    <h2 style="margin-bottom:2px">${p.name}</h2>
    <p style="margin:0;color:var(--ink-2)">${p.island} · capital ${p.capital}</p>
    <p class="big">${p.population.toFixed(1)}<span style="font-size:18px;font-weight:600"> million people</span></p>
    <dl>
      <dt>Share of Indonesia</dt><dd>${share}% of the national population</dd>
      <dt>Density</dt><dd>about ${p.density.toLocaleString('en-US')} people per km²</dd>
      <dt>Compared with</dt><dd>${p.population >= 10 ? 'one of the six provinces over 10 million' : p.population >= 5 ? 'a mid-sized province — bigger than New Zealand' : 'a smaller province — about the size of Ireland' }</dd>
    </dl>
    <p class="src">BPS mid-year provincial estimates, 2024 (population); density rounded.</p>`;
}

export function render() {
  return `
  <p class="page-kicker">Section · The 38 provinces</p>
  <h1>Regions</h1>
  <p class="lede">Indonesia is governed as 38 provinces across five main island groups. Java holds three of the four largest — and about 56% of all Indonesians on 7% of the land. The sixteen most populous provinces are listed here; together they hold 86% of the population.</p>

  <div class="controls">
    <label class="ctl">Search <input type="search" id="prov-q" placeholder="Province or capital…" aria-label="Search provinces"></label>
    <label class="ctl">Sort by
      <select id="prov-sort" aria-label="Sort provinces">
        <option value="population">Population, largest first</option>
        <option value="density">Density, highest first</option>
        <option value="name">Name, A–Z</option>
      </select>
    </label>
  </div>

  <div class="regions-layout">
    <section class="panel" style="margin-top:6px">
      <ul class="prov-list" id="prov-list"></ul>
      <p class="src" id="prov-count"></p>
    </section>
    <aside class="panel prov-detail" id="prov-detail" aria-live="polite"></aside>
  </div>`;
}

export function mount(root) {
  const list = root.querySelector('#prov-list');
  const panel = root.querySelector('#prov-detail');
  const count = root.querySelector('#prov-count');
  const q = root.querySelector('#prov-q');
  const sort = root.querySelector('#prov-sort');
  let selected = 'West Java';

  function draw() {
    const needle = q.value.trim().toLowerCase();
    let rows = PROVINCES.filter((p) => !needle || p.name.toLowerCase().includes(needle) || p.capital.toLowerCase().includes(needle) || p.island.toLowerCase().includes(needle));
    rows = [...rows].sort((a, b) => (sort.value === 'name' ? a.name.localeCompare(b.name) : b[sort.value] - a[sort.value]));
    list.innerHTML = rows.map((p) => `
      <li><button type="button" data-name="${p.name}" aria-current="${p.name === selected}">
        <span>${p.name} <span style="color:var(--ink-2);font-weight:400">· ${p.island}</span></span>
        <span class="p-pop">${p.population.toFixed(1)} million</span>
      </button></li>`).join('');
    count.textContent = rows.length
      ? `Showing ${rows.length} of ${PROVINCES.length} listed provinces. Source: BPS mid-year estimates, 2024.`
      : 'No province matches that search.';
    list.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', () => {
      selected = btn.dataset.name;
      panel.innerHTML = detail(PROVINCES.find((p) => p.name === selected));
      list.querySelectorAll('button').forEach((b) => b.setAttribute('aria-current', String(b.dataset.name === selected)));
    }));
  }

  panel.innerHTML = detail(PROVINCES.find((p) => p.name === selected));
  q.addEventListener('input', draw);
  sort.addEventListener('change', draw);
  draw();
}
