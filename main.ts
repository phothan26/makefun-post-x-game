// Entry point for the make.fun "agent builds a game from one prompt" bounty.
// All it does is copy POST.json from the repository root to /output,
// so the house can read the X post this entry names. It then reads the
// copy back and refuses to finish unless the copy is byte-identical to
// the source, so a partial or corrupted write can never pass silently.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.env.MAKEFUN_BOT_DIR || '.';
const outDir = process.env.MAKEFUN_OUTPUT_DIR || 'out';
const src = join(root, 'POST.json');
const data = readFileSync(src);
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, 'POST.json');
writeFileSync(dst, data);
const back = readFileSync(dst);
if (!back.equals(data)) {
  throw new Error('POST.json copy differs from the source; refusing to finish');
}
