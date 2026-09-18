/**
 * Assembles the deployable static bundle into ./public.
 *
 * The site is authored at the repository root (index.html + assets/) so it can
 * still be served as plain files with no build step. Static hosts such as
 * Vercel, however, expect the build output in a dedicated directory — by
 * default one named "public". This script copies the shipping files there,
 * which is why `public/` is gitignored and rebuilt on every `npm run build`.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public');

/* Exactly what ships to the CDN — nothing else from the repo. */
const ENTRIES = ['index.html', 'assets'];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const entry of ENTRIES) {
  const from = resolve(root, entry);
  if (!existsSync(from)) {
    console.error(`build-static: missing required file or directory "${entry}"`);
    process.exit(1);
  }
  cpSync(from, resolve(outDir, entry), { recursive: true });
}

console.log(`build-static: wrote ${ENTRIES.join(', ')} to ./public`);
