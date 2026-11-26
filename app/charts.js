// DataNusa charts — small hand-rolled SVG charts (line, bars, grouped bars,
// population pyramid, horizontal share bars). No library, no network: each
// chart is a string of SVG the views drop into the page. Every chart carries
// a text alternative: an aria-label summary plus a <details> data table the
// views render from the same numbers, so the figures are never image-only.

const NS = 'http://www.w3.org/2000/svg';

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function scale(domainMin, domainMax, rangeMin, rangeMax) {
  const span = domainMax - domainMin || 1;
  return (v) => rangeMin + ((v - domainMin) / span) * (rangeMax - rangeMin);
}

// A line chart with dots, hover tooltips (native <title>), a zero line when
// the series crosses zero, and first/last value labels.
export function lineChart({ points, unit, colour = '#0e6b5c', height = 220, fmt = (v) => v }) {
  const w = 640, h = height, padL = 44, padR = 14, padT = 14, padB = 26;
  const values = points.map((p) => p[1]);
  let min = Math.min(...values, 0), max = Math.max(...values, 0);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.12; min -= pad; max += pad;
  const x = scale(0, points.length - 1, padL, w - padR);
  const y = scale(min, max, h - padB, padT);
  const ticks = [min + pad, (min + max) / 2, max - pad];
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(points.map((p) => `${p[0]}: ${fmt(p[1])}${unit ? ' ' + unit : ''}`).join('; '))}">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" class="grid"/><text x="${padL - 6}" y="${y(t) + 4}" class="tick" text-anchor="end">${esc(fmt(Math.round(t * 100) / 100))}</text>`;
  }
  if (min < 0 && max > 0) s += `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" class="zero"/>`;
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  s += `<path d="${path}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linejoin="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${x(i)}" cy="${y(p[1])}" r="4" fill="${colour}"><title>${esc(p[0])}: ${esc(fmt(p[1]))}${unit ? ' ' + esc(unit) : ''}</title></circle>`;
    if (i % 2 === 0 || i === points.length - 1) s += `<text x="${x(i)}" y="${h - 8}" class="tick" text-anchor="middle">${esc(p[0])}</text>`;
  });
  const last = points[points.length - 1];
  s += `<text x="${x(points.length - 1)}" y="${y(last[1]) - 10}" class="lastval" text-anchor="end">${esc(fmt(last[1]))}${unit ? ' ' + esc(unit) : ''}</text>`;
  return s + '</svg>';
}

// Vertical bars, one per point; negative values drop below the zero line.
export function barChart({ points, unit, colour = '#0e6b5c', negColour = '#b3402a', height = 220, fmt = (v) => v }) {
  const w = 640, h = height, padL = 44, padR = 10, padT = 16, padB = 26;
  const values = points.map((p) => p[1]);
  let min = Math.min(...values, 0), max = Math.max(...values, 0);
  const pad = (max - min || 1) * 0.12; min -= min < 0 ? pad : 0; max += pad;
  const y = scale(min, max, h - padB, padT);
  const slot = (w - padL - padR) / points.length;
  const bw = Math.min(44, slot * 0.62);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(points.map((p) => `${p[0]}: ${fmt(p[1])}${unit ? ' ' + unit : ''}`).join('; '))}">`;
  s += `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" class="zero"/>`;
  points.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(p[1], 0)), bot = y(Math.min(p[1], 0));
    s += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(1, bot - top).toFixed(1)}" rx="3" fill="${p[1] < 0 ? negColour : colour}"><title>${esc(p[0])}: ${esc(fmt(p[1]))}${unit ? ' ' + esc(unit) : ''}</title></rect>`;
    s += `<text x="${cx}" y="${h - 8}" class="tick" text-anchor="middle">${esc(p[0])}</text>`;
    s += `<text x="${cx}" y="${(p[1] < 0 ? bot + 14 : top - 5).toFixed(1)}" class="barval" text-anchor="middle">${esc(fmt(p[1]))}</text>`;
  });
  return s + '</svg>';
}

// Grouped bars for exports vs imports.
export function groupedBars({ years, exports, imports, unit, height = 240 }) {
  const w = 640, h = height, padL = 44, padR = 10, padT = 16, padB = 40;
  const max = Math.max(...exports, ...imports) * 1.15;
  const y = scale(0, max, h - padB, padT);
  const slot = (w - padL - padR) / years.length;
  const bw = Math.min(26, slot * 0.3);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(years.map((yr, i) => `${yr}: exports ${exports[i]}, imports ${imports[i]} ${unit}`).join('; '))}">`;
  s += `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" class="zero"/>`;
  years.forEach((yr, i) => {
    const cx = padL + slot * i + slot / 2;
    s += `<rect x="${(cx - bw - 2).toFixed(1)}" y="${y(exports[i]).toFixed(1)}" width="${bw}" height="${(y(0) - y(exports[i])).toFixed(1)}" rx="3" fill="#0e6b5c"><title>${esc(yr)} exports: US$${exports[i]} billion</title></rect>`;
    s += `<rect x="${(cx + 2).toFixed(1)}" y="${y(imports[i]).toFixed(1)}" width="${bw}" height="${(y(0) - y(imports[i])).toFixed(1)}" rx="3" fill="#e8a33d"><title>${esc(yr)} imports: US$${imports[i]} billion</title></rect>`;
    s += `<text x="${cx}" y="${h - 24}" class="tick" text-anchor="middle">${esc(yr)}</text>`;
  });
  s += `<rect x="${padL}" y="${h - 14}" width="10" height="10" fill="#0e6b5c"/><text x="${padL + 15}" y="${h - 5}" class="tick">Exports</text>`;
  s += `<rect x="${padL + 90}" y="${h - 14}" width="10" height="10" fill="#e8a33d"/><text x="${padL + 105}" y="${h - 5}" class="tick">Imports</text>`;
  return s + '</svg>';
}

// Population pyramid: male bars left, female right, one row per age group.
export function pyramid({ groups, height = 430 }) {
  const w = 640, h = height, mid = w / 2, padT = 8, padB = 8;
  const rowH = (h - padT - padB) / groups.length;
  const max = Math.max(...groups.flatMap((g) => [g[1], g[2]])) * 1.08;
  const x = scale(0, max, 0, mid - 46);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(groups.map((g) => `Age ${g[0]}: men ${g[1]} per cent, women ${g[2]} per cent`).join('; '))}">`;
  groups.forEach((g, i) => {
    const yy = padT + i * rowH;
    s += `<rect x="${(mid - 34 - x(g[1])).toFixed(1)}" y="${(yy + 1.5).toFixed(1)}" width="${x(g[1]).toFixed(1)}" height="${(rowH - 3).toFixed(1)}" rx="2" fill="#0e6b5c"><title>Age ${esc(g[0])}, men: ${g[1]}%</title></rect>`;
    s += `<rect x="${(mid + 34).toFixed(1)}" y="${(yy + 1.5).toFixed(1)}" width="${x(g[2]).toFixed(1)}" height="${(rowH - 3).toFixed(1)}" rx="2" fill="#e8a33d"><title>Age ${esc(g[0])}, women: ${g[2]}%</title></rect>`;
    s += `<text x="${mid}" y="${(yy + rowH / 2 + 4).toFixed(1)}" class="tick" text-anchor="middle">${esc(g[0])}</text>`;
    s += `<text x="${(mid - 40 - x(g[1])).toFixed(1)}" y="${(yy + rowH / 2 + 4).toFixed(1)}" class="barval" text-anchor="end">${g[1]}</text>`;
    s += `<text x="${(mid + 40 + x(g[2])).toFixed(1)}" y="${(yy + rowH / 2 + 4).toFixed(1)}" class="barval">${g[2]}</text>`;
  });
  s += `<text x="${mid - 40}" y="${h - 0}" class="tick" text-anchor="end">← Men (%)</text><text x="${mid + 40}" y="${h - 0}" class="tick">Women (%) →</text>`;
  return s + '</svg>';
}

// Horizontal share bars for the sector breakdown.
export function shareBars({ parts, height = 300 }) {
  const w = 640, h = height, padL = 168, padR = 52, padT = 4, padB = 4;
  const rowH = (h - padT - padB) / parts.length;
  const max = Math.max(...parts.map((p) => p[1]));
  const x = scale(0, max, padL, w - padR);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(parts.map((p) => `${p[0]}: ${p[1]} per cent`).join('; '))}">`;
  parts.forEach((p, i) => {
    const yy = padT + i * rowH;
    s += `<text x="${padL - 8}" y="${(yy + rowH / 2 + 4).toFixed(1)}" class="tick" text-anchor="end">${esc(p[0])}</text>`;
    s += `<rect x="${padL}" y="${(yy + 2).toFixed(1)}" width="${(x(p[1]) - padL).toFixed(1)}" height="${(rowH - 5).toFixed(1)}" rx="3" fill="#0e6b5c"><title>${esc(p[0])}: ${p[1]}% of GDP</title></rect>`;
    s += `<text x="${(x(p[1]) + 6).toFixed(1)}" y="${(yy + rowH / 2 + 4).toFixed(1)}" class="barval">${p[1].toFixed(1)}%</text>`;
  });
  return s + '</svg>';
}

// A <details> element holding the chart's numbers as a real table — the
// accessible, printable form of every chart on the site.
export function dataTable(caption, head, rows) {
  const th = head.map((c) => `<th scope="col">${esc(c)}</th>`).join('');
  const tr = rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('');
  return `<details class="data-table"><summary>See the numbers as a table</summary><table><caption>${esc(caption)}</caption><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></details>`;
}
