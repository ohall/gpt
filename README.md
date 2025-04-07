# Node GPT CLI
A powerful CLI tool for GPT prompts written in JavaScript, supporting both OpenAI and DeepInfra models.
Requires [Node.js 20+](https://nodejs.org/)

### Install 
```bash
npm i -g node-gpt-cli
```

### Configuration
The tool supports both OpenAI and DeepInfra models. On install, default parameters are written to `~/.node-gpt-config.json`. You can modify them there:

#### OpenAI Configuration
```json
{
  "url": "https://api.openai.com/v1/chat/completions",
  "model": "gpt-4-turbo-preview",
  "max_tokens": 1024,
  "temperature": 0.3,
  "top_p": 0.5,
  "frequency_penalty": 0,
  "presence_penalty": 0
}
```

#### DeepInfra Configuration
```json
{
  "url": "https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-70b-chat-hf",
  "model": "meta-llama/Llama-2-70b-chat-hf",
  "max_tokens": 1024,
  "temperature": 0.3,
  "top_p": 0.5
}
```

### API Keys
#### OpenAI
Create an OpenAI [API key](https://platform.openai.com/api-keys) and assign it to `OPENAI_API_KEY` environment variable:
```bash
export OPENAI_API_KEY=<YOUR-API-KEY>
```

#### DeepInfra
Create a DeepInfra [API key](https://deepinfra.com/dash/api_keys) and assign it to `DEEPINFRA_API_KEY` environment variable:
```bash
export DEEPINFRA_API_KEY=<YOUR-API-KEY>
```

### Usage
#### Basic Usage
```bash
gpt4 what is best in life?
```

#### Pipe in prompts
```bash
echo "what is my name?" | gpt4
```

#### Using Different Models
The tool will automatically use the appropriate API based on your configuration. To switch between providers:

1. Edit your config file:
```bash
nano ~/.node-gpt-config.json
```

2. Update the URL and model name:
   - For OpenAI: Use `https://api.openai.com/v1/chat/completions`
   - For DeepInfra: Use `https://api.deepinfra.com/v1/inference/<model-name>`

3. Set the appropriate API key environment variable

### Available Models

#### OpenAI Models
- `gpt-4-turbo-preview` (Fastest, recommended)
- `gpt-4`
- `gpt-3.5-turbo`

#### DeepInfra Models
- `meta-llama/Llama-2-70b-chat-hf`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`
- `google/gemma-7b-it`
- Many more available at [DeepInfra Models](https://deepinfra.com/models)

### Configuration Parameters
- `url`: API endpoint URL
- `model`: Model identifier
- `max_tokens`: Maximum response length (affects speed)
- `temperature`: Controls randomness (0 = focused, 1 = creative)
- `top_p`: Controls diversity (lower = faster)
- `frequency_penalty`: Reduces repetition (0 = faster)
- `presence_penalty`: Encourages new topics (0 = faster)

### Features
- Supports both OpenAI and DeepInfra APIs
- Fast response times with optimized settings
- Easy model switching
- Pipe support for integration with other tools
- Modern Node.js features and best practices

### Development
Run with debug logging:
```bash
DEBUG=true gpt4 "your prompt"
```

Test configuration:
```bash
npm run test
```