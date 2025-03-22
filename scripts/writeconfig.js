#!/usr/bin/env node

import { writeFile } from 'fs/promises';

const data = {
  url: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-4-turbo-preview',
  max_tokens: 2048,
  temperature: 0.7,
  top_p: 0.9,
  frequency_penalty: 0.3,
  presence_penalty: 0.3
};

const filePath = `${process.env.HOME}/.node-gpt-config.json`;

try {
  await writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`Configuration successfully written to ${filePath}`);
} catch (error) {
  console.error(`Error writing configuration to ${filePath}: ${error.message}`);
  process.exit(1);
}