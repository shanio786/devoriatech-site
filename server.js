import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('[server] Starting - NODE_ENV:', process.env.NODE_ENV);
console.log('[server] DATABASE_URL set:', !!process.env.DATABASE_URL);
console.log('[server] dist exists:', existsSync(join(__dirname, 'dist', 'index.cjs')));
console.log('[server] node_modules exists:', existsSync(join(__dirname, 'node_modules', 'express')));

import('./dist/index.cjs').catch(err => {
  console.error('[server] Fatal error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
