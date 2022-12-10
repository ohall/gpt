#!/usr/bin/env node
const { spawnSync } = require("child_process");
const { resolve } = require("path");
const argArray =  process.argv.slice(2)
const pipedArg = !process.stdin.isTTY;

if (parseFloat(process.versions.node) < 18 ){
  console.log('Node 18+ required.');
  process.exit(1);
}

if(!pipedArg && !argArray.length){
  console.log('Prompt required.');
  process.exit(1);
}

const cmd = `${pipedArg?'xargs':''} node --no-warnings ${resolve(__dirname, 'gpt.js')} ${argArray.join(' ')}`;
spawnSync(cmd, { stdio: 'inherit', shell: true });
