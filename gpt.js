import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const configPath = `${process.env.HOME}/.node-gpt-config.json`;
let config;

try {
  config = JSON.parse(readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error(`Error reading ${configPath}: ${error.message}`);
  process.exit(1);
}

async function generateCompletion(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  const { url, model, max_tokens, temperature, top_p, frequency_penalty, presence_penalty } = config;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'OpenAI-Organization': process.env.OPENAI_ORG_ID // Optional: only if you have multiple orgs
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens,
        temperature,
        top_p,
        frequency_penalty,
        presence_penalty
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API request failed: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    throw new Error(`Failed to generate completion: ${error.message}`);
  }
}

try {
  const promptWords = process.argv.slice(2);
  if (promptWords.length === 0) {
    console.error('Please provide a prompt');
    process.exit(1);
  }
  
  const result = await generateCompletion(promptWords.join(' '));
  process.stdout.write(result);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}