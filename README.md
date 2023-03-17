# Node gpt3 CLI
A very simple cli tool for gpt3 prompts written in javascript.
Requires [Node 18+](https://nodejs.org/en/blog/announcements/v18-release-announce/)

### Install 
```npm i -g node-gpt-cli```

### Add your API key 

Create OpenAI [API key](https://platform.openai.com/account/api-keys) and assign it to `OPENAI_API_KEY` environment variable

```OPENAI_API_KEY=<KEY>```

### Pass prompts to it
```gpt3 what is best in life?```

### Pipe in prompts
```echo "what is my name?" | gpt3 ```

### Parameter configs
On install, default parmeters are written to `~/.node-gpt-config.json`.  You can modify them there.   
```
model: 'text-davinci-003',
max_tokens: 2048,
temperature: 0  
```
