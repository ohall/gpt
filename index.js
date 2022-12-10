#!/usr/bin/env node
const { spawnSync } = require("child_process");
const { resolve } = require("path");

const cmd = `node --no-warnings ${resolve(__dirname, 'gpt.js')} ${process.argv.slice(2).join(' ')}`;
spawnSync(cmd, { stdio: 'inherit', shell: true });
