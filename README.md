# Node GPT CLI
A powerful CLI tool for GPT-4 prompts written in JavaScript.
Requires [Node.js 20+](https://nodejs.org/)

### Install 
```bash
npm i -g node-gpt-cli
```

### Add your API key 
Create an OpenAI [API key](https://platform.openai.com/api-keys) and assign it to `OPENAI_API_KEY` environment variable:
```bash
export OPENAI_API_KEY=<YOUR-API-KEY>
```

Optional: If you have multiple organizations, you can set your organization ID:
```bash
export OPENAI_ORG_ID=<YOUR-ORG-ID>
```

### Pass prompts to it
```bash
gpt3 what is best in life?
```

### Pipe in prompts
```bash
echo "what is my name?" | gpt3
```

### Configuration
On install, default parameters are written to `~/.node-gpt-config.json`. You can modify them there:
```json
{
  "url": "https://api.openai.com/v1/chat/completions",
  "model": "gpt-4-turbo-preview",
  "max_tokens": 2048,
  "temperature": 0,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}
```

#### Configuration Parameters
- `model`: The GPT model to use (currently set to GPT-4 Turbo for faster, more capable responses)
- `max_tokens`: Maximum number of tokens in the response
- `temperature`: Controls randomness (0 = more focused, 1 = more creative)
- `top_p`: Controls diversity via nucleus sampling
- `frequency_penalty`: Reduces likelihood of repeating the same information
- `presence_penalty`: Encourages the model to talk about new topics

### Features
- Uses the latest GPT-4 Turbo model
- Native ESM support
- Improved error handling and validation
- Support for organization ID
- Modern Node.js features and best practices