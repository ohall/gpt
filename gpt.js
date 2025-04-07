import { readFileSync } from 'fs';
import OpenAI from 'openai';

const configPath = `${process.env.HOME}/.node-gpt-config.json`;
let config;

try {
  config = JSON.parse(readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error(`Error reading ${configPath}: ${error.message}`);
  process.exit(1);
}

const openai = setupOpenAIClient();

function setupOpenAIClient() {
  // Check for API key in environment variables
  const openaiKey = process.env.OPENAI_API_KEY;
  const deepinfraKey = process.env.DEEPINFRA_API_KEY;
  let { baseURL, apiKey, organization } = config;

  if (openaiKey || deepinfraKey) {
    apiKey = deepinfraKey || openaiKey;
  }

  if (!baseURL) {
    throw new Error('No API URL configured. Please run the installation script again.');
  }

  const isOpenAI = baseURL.includes('openai.com');
  const isDeepInfra = baseURL.includes('deepinfra.com');

  if ((isOpenAI && !openaiKey && !config.apiKey) || (isDeepInfra && !deepinfraKey && !config.apiKey)) {
    const provider = isOpenAI ? 'OpenAI' : 'DeepInfra';
    const envVar = isOpenAI ? 'OPENAI_API_KEY' : 'DEEPINFRA_API_KEY';
    throw new Error(`${provider} API key not found. Set ${envVar} environment variable or update your config.`);
  }

  return new OpenAI({apiKey, baseURL, organization});
}

async function generateCompletion(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  try {
    const { model, max_tokens, temperature, top_p, frequency_penalty, presence_penalty, stream } = config;  
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model,
      max_tokens,
      temperature,
      top_p,
      frequency_penalty,
      presence_penalty,
      stream,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to generate completion: ${error}`);
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