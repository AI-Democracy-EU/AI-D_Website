import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const modulesDir = path.join(process.cwd(), 'public', 'modules');
const manifestPath = path.join(process.cwd(), 'src', 'data', 'module-assets.json');

const entries = await readdir(modulesDir, { withFileTypes: true });
const moduleAssets = entries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .sort((first, second) => first.localeCompare(second));

await writeFile(manifestPath, `${JSON.stringify(moduleAssets, null, 2)}\n`);
