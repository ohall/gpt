#!/usr/bin/env node
import { spawnSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const argArray = process.argv.slice(2);
const pipedArg = !process.stdin.isTTY;

if (parseFloat(process.versions.node) < 20) {
  console.log('Node 20+ required.');
  process.exit(1);
}

if (!pipedArg && !argArray.length) {
  console.log('Prompt required.');
  process.exit(1);
}

const cmd = `${pipedArg ? 'xargs' : ''} node --no-warnings ${resolve(__dirname, 'gpt.js')} ${argArray.join(' ')}`;
spawnSync(cmd, { stdio: 'inherit', shell: true });
