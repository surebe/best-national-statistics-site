// DataNusa — every figure the site shows, each with its source and year.
// Sources are the public releases of Statistics Indonesia (BPS), the World Bank's
// World Development Indicators, Bank Indonesia and the surveys named inline.
// Values are the published ones; where a series is rounded for display the
// note says so. Nothing here is fetched: the file ships with the site.

export const META = {
  country: 'Republic of Indonesia',
  updated: 'Data as published to November 2026',
};

// Headline indicators for the overview KPI band.
// format: how the value is printed; delta: the change note under the value.
export const KPI = [
  { label: 'Population', value: '281.6', unit: 'million', note: 'Mid-year estimate', delta: '+1.1% on 2023', source: 'BPS population projection, 2024' },
  { label: 'Gross domestic product', value: 'US$1.396', unit: 'trillion', note: 'Current prices', delta: '5.03% real growth in 2024', source: 'World Bank WDI, 2024; BPS, 2024' },
  { label: 'GDP per person', value: 'US$4,960', unit: '', note: 'Current prices', delta: 'US$4,627 in 2022', source: 'World Bank WDI, 2024' },
  { label: 'Inflation', value: '1.57', unit: '% a year', note: 'December, year on year', delta: 'Down from 2.61% a year earlier', source: 'BPS consumer prices, Dec 2024' },
  { label: 'Unemployment', value: '4.76', unit: '%', note: 'Open unemployment rate', delta: '7.99 million people', source: 'BPS labour force survey, Feb 2025' },
  { label: 'Poverty', value: '8.57', unit: '%', note: 'Share below the poverty line', delta: '23.85 million people', source: 'BPS, September 2024' },
];

export const POPULATION_TREND = {
  title: 'Population, 2015–2024',
  unit: 'million people',
  source: 'BPS: 2020 census and mid-year estimates',
  points: [
    ['2015', 255.5], ['2016', 258.7], ['2017', 261.9], ['2018', 265.0], ['2019', 268.1],
    ['2020', 270.2], ['2021', 272.7], ['2022', 275.8], ['2023', 278.7], ['2024', 281.6],
  ],
};

// Age and sex structure, five-year groups, per cent of the total population.
// Male and female shares are the group's two halves (they sum to the group).
export const PYRAMID = {
  title: 'Age and sex structure, 2024',
  source: 'BPS population projection by age group, 2024 (shares rounded)',
  groups: [
    ['0–4', 4.2, 4.0], ['5–9', 4.4, 4.2], ['10–14', 4.4, 4.2], ['15–19', 4.3, 4.1],
    ['20–24', 4.3, 4.0], ['25–29', 4.2, 3.9], ['30–34', 4.0, 3.8], ['35–39', 3.8, 3.6],
    ['40–44', 3.5, 3.4], ['45–49', 3.1, 3.1], ['50–54', 2.7, 2.7], ['55–59', 2.2, 2.3],
    ['60–64', 1.8, 1.9], ['65–69', 1.4, 1.5], ['70–74', 1.0, 1.1], ['75+', 1.2, 1.6],
  ],
};

export const POPULATION_FACTS = [
  { label: 'Median age', value: '30.5 years', source: 'BPS / UN estimates, 2024' },
  { label: 'Life expectancy at birth', value: '72.4 years', source: 'BPS, 2024' },
  { label: 'Share aged 0–14', value: '25.4%', source: 'BPS projection, 2024' },
  { label: 'Share aged 65 and over', value: '7.0%', source: 'BPS projection, 2024' },
  { label: 'Urban share', value: '58.6%', source: 'BPS, 2024' },
  { label: 'Population density', value: '148 people per km²', source: 'BPS, 2024' },
  { label: 'Largest city (Jakarta)', value: '10.6 million', source: 'BPS, 2024' },
  { label: 'Named islands', value: '17,000+', source: 'Geospatial Information Agency' },
];

export const GDP_GROWTH = {
  title: 'Real GDP growth, 2015–2024',
  unit: '% a year',
  source: 'BPS national accounts',
  points: [
    ['2015', 4.88], ['2016', 5.03], ['2017', 5.07], ['2018', 5.17], ['2019', 5.02],
    ['2020', -2.07], ['2021', 3.70], ['2022', 5.31], ['2023', 5.05], ['2024', 5.03],
  ],
};

export const INFLATION = {
  title: 'Inflation, December on December, 2015–2024',
  unit: '% a year',
  source: 'BPS consumer price index',
  points: [
    ['2015', 3.35], ['2016', 3.02], ['2017', 3.61], ['2018', 3.13], ['2019', 2.72],
    ['2020', 1.68], ['2021', 1.87], ['2022', 5.51], ['2023', 2.61], ['2024', 1.57],
  ],
};

export const TRADE = {
  title: 'Goods trade, 2020–2024',
  unit: 'US$ billion',
  source: 'BPS foreign trade statistics',
  years: ['2020', '2021', '2022', '2023', '2024'],
  exports: [163.2, 231.6, 291.9, 258.8, 264.7],
  imports: [141.6, 196.2, 237.4, 221.9, 233.7],
};

export const GDP_SECTORS = {
  title: 'What the economy makes — share of GDP, 2024',
  source: 'BPS national accounts, 2024 (shares rounded)',
  parts: [
    ['Manufacturing', 19.0], ['Wholesale & retail trade', 13.0], ['Agriculture & forestry', 12.6],
    ['Construction', 10.0], ['Mining & quarrying', 8.9], ['Transport & storage', 6.1],
    ['Finance & insurance', 4.2], ['Information & communication', 4.1], ['All other industries', 22.1],
  ],
};

export const SOCIAL = [
  { label: 'Human development index', value: '74.20', note: 'On BPS’s 0–100 scale', source: 'BPS, 2024' },
  { label: 'Literacy, age 15 and over', value: '96.5%', note: 'Can read and write a simple sentence', source: 'BPS Susenas, 2023' },
  { label: 'People online', value: '79.5%', note: 'Share of the population using the internet', source: 'APJII penetration survey, 2024' },
  { label: 'Electrification', value: '99.8%', note: 'Households reached by the grid or off-grid supply', source: 'Ministry of Energy (ESDM), 2024' },
];

// The sixteen most populous of Indonesia's 38 provinces, plus the capital.
// density: people per km², 2024 estimate (rounded).
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', island: 'Java', population: 49.9, density: 1410 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', population: 41.8, density: 875 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', population: 38.3, density: 1170 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', population: 15.6, density: 214 },
  { name: 'Banten', capital: 'Serang', island: 'Java', population: 12.4, density: 1285 },
  { name: 'Jakarta', capital: '— (capital city)', island: 'Java', population: 10.6, density: 15900 },
  { name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', population: 9.5, density: 204 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', population: 9.4, density: 270 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', population: 8.8, density: 96 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', population: 6.7, density: 77 },
  { name: 'West Kalimantan', capital: 'Pontianak', island: 'Kalimantan', population: 5.9, density: 40 },
  { name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', population: 5.8, density: 138 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', island: 'Lesser Sundas', population: 5.6, density: 277 },
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', population: 5.6, density: 98 },
  { name: 'Bali', capital: 'Denpasar', island: 'Lesser Sundas', population: 4.3, density: 745 },
  { name: 'East Kalimantan', capital: 'Samarinda', island: 'Kalimantan', population: 3.9, density: 31 },
];

export const RELEASES = [
  { date: '3 November 2026', title: 'Inflation and consumer prices, October 2026', body: 'Monthly consumer price release: headline inflation, food and administered prices, by city.', source: 'BPS monthly release' },
  { date: '5 November 2026', title: 'Economic growth, third quarter 2026', body: 'Quarterly GDP by industry and by spending component, with the revised second quarter.', source: 'BPS quarterly release' },
  { date: '7 November 2026', title: 'Labour force situation, August 2026', body: 'Employment, unemployment and wages from the August labour force survey (Sakernas).', source: 'BPS Sakernas' },
  { date: '17 November 2026', title: 'Exports, imports and the trade balance, October 2026', body: 'Goods trade by commodity and partner country, oil and gas shown separately.', source: 'BPS monthly release' },
];
