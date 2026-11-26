// DataNusa entry program (Node 22, standard library only).
//
// The site itself is this directory's app/ folder: plain static files a
// browser opens at app/index.html (ES modules and CSS, no build step), and
// nothing it runs, styles or shows loads over the network. This program
// hands the entry in: it copies app/ and screenshots/ from beside this file
// to /output and writes /output/dossier.json — the summary the judge reads
// (the screenshots, the first load's files and bytes, and the source) —
// with the vendored make.fun library, which must stay byte-for-byte the
// kit's own: the scorer requires dossier.json to be exactly what its copy
// of buildDossier writes.
//
// Run it the way the grader does, or locally with an output directory:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the site itself while developing with `node serve.ts`.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps, passed to buildDossier so an entry the scorer
// would refuse is refused here first: at most 4 screenshots of 256 KiB,
// at most 993 files and directories and 16 MiB under app/.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
