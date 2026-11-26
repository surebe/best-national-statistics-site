// DataNusa router. One page, five views, hash routes so every section is
// reached by a real link and the back button works. The views load lazily
// with import(): the first load is this file, the stylesheet and the shell;
// each section's code arrives only when a visitor opens that section.

const app = document.getElementById('app');

const ROUTES = {
  '/': { name: 'overview', title: 'Overview — DataNusa', load: () => import('./views/overview.js') },
  '/population': { name: 'population', title: 'Population — DataNusa', load: () => import('./views/population.js') },
  '/economy': { name: 'economy', title: 'Economy — DataNusa', load: () => import('./views/economy.js') },
  '/regions': { name: 'regions', title: 'Regions — DataNusa', load: () => import('./views/regions.js') },
  '/sources': { name: 'sources', title: 'Sources & methods — DataNusa', load: () => import('./views/about.js') },
};

function path() {
  const h = location.hash.replace(/^#/, '');
  return ROUTES[h] ? h : '/';
}

async function render() {
  const route = ROUTES[path()];
  document.title = route.title;
  document.querySelectorAll('.main-nav a').forEach((a) => {
    if (a.dataset.route === route.name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const view = await route.load();
  app.innerHTML = view.render();
  if (view.mount) view.mount(app);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
