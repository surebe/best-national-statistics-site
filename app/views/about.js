// Sources & methods: where every figure comes from, how the headline
// measures are defined, and how to cite and reuse the numbers.
export function render() {
  return `
  <p class="page-kicker">About this site</p>
  <h1>Sources &amp; methods</h1>
  <p class="lede">A statistics site is only as good as its provenance. Every figure on DataNusa names the release it came from and the year it describes; this page lists those releases and defines the measures that need defining.</p>

  <section class="panel">
    <h2>The sources</h2>
    <table>
      <caption>Where the figures come from</caption>
      <thead><tr><th scope="col">Used for</th><th scope="col">Publisher</th><th scope="col">Release</th></tr></thead>
      <tbody>
        <tr><th scope="row">Population, provinces, age structure</th><td>Statistics Indonesia (BPS)</td><td>2020 Population Census; population projections to 2024</td></tr>
        <tr><th scope="row">GDP, growth, industries</th><td>Statistics Indonesia (BPS)</td><td>National accounts, annual 2024 and quarterly releases</td></tr>
        <tr><th scope="row">GDP in US dollars, GDP per person</th><td>World Bank</td><td>World Development Indicators, 2024</td></tr>
        <tr><th scope="row">Inflation</th><td>Statistics Indonesia (BPS)</td><td>Consumer price index, monthly to December 2024</td></tr>
        <tr><th scope="row">Jobs and unemployment</th><td>Statistics Indonesia (BPS)</td><td>National Labour Force Survey (Sakernas), February 2025</td></tr>
        <tr><th scope="row">Poverty</th><td>Statistics Indonesia (BPS)</td><td>National Socio-Economic Survey (Susenas), September 2024</td></tr>
        <tr><th scope="row">Trade</th><td>Statistics Indonesia (BPS)</td><td>Foreign trade statistics, annual 2024</td></tr>
        <tr><th scope="row">Internet use</th><td>APJII (ISP association)</td><td>Indonesia internet penetration survey, 2024</td></tr>
        <tr><th scope="row">Electrification</th><td>Ministry of Energy and Mineral Resources</td><td>Electrification ratio release, 2024</td></tr>
      </tbody>
    </table>
  </section>

  <section class="panel">
    <h2>Definitions worth knowing</h2>
    <h3>Open unemployment rate</h3>
    <p>The share of the labour force who are not working, are available for work and are looking — or preparing a business. It excludes students, homemakers and others outside the labour force, which is why it can look low next to the informality rate.</p>
    <h3>Poverty line</h3>
    <p>BPS sets the line from the cost of a basic food basket (2,100 kcal a day) plus essential non-food needs; it is recalculated for each province and for urban and rural areas separately, so the national rate is an average of local lines.</p>
    <h3>Real growth</h3>
    <p>GDP growth is measured at constant 2010 prices, so it counts more goods and services, not higher prices. Nominal GDP — the US$1.396 trillion headline — is at current prices and current exchange rates.</p>
    <h3>Mid-year population</h3>
    <p>The population at 30 June of the year named, projected from the 2020 census by adding births, subtracting deaths and accounting for migration between provinces and abroad.</p>
  </section>

  <section class="panel">
    <h2>Citing and reusing</h2>
    <p>Figures may be reused with their source named — for example, “Population 281.6 million (BPS projection, 2024), via DataNusa”. The underlying statistics belong to their publishers; this presentation, its text and its charts are DataNusa's own work, published under the MIT licence with the site's source.</p>
    <p>Corrections: when a publisher revises a figure, DataNusa updates the figure and its note. Nothing here is a forecast unless it is labelled one.</p>
  </section>`;
}
