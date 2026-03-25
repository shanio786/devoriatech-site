import { config } from 'dotenv';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '.env') });

console.log('[server] Starting - NODE_ENV:', process.env.NODE_ENV);
console.log('[server] DATABASE_URL set:', !!process.env.DATABASE_URL);
console.log('[server] dist exists:', existsSync(join(__dirname, 'dist', 'index.cjs')));

import('./dist/index.cjs').catch(err => {
  console.error('[server] Fatal error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
